import StretchType from '../../../common/enums/StretchType.enum';
import BrowserDetect from '../../conf/BrowserDetect';
// računa vrednosti za transform-scale (x, y)
// transform: scale(x,y) se uporablja za raztegovanje videa, ne pa za približevanje
// calculates values for transform scale(x, y)
// transform: scale(x,y) is used for stretching, not zooming. 
class Stretcher {
    //#endregion
    // functions
    constructor(videoData) {
        this.conf = videoData;
        this.logger = videoData.logger;
        this.settings = videoData.settings;
        this.mode = this.settings.getDefaultStretchMode(window.location.hostname);
        this.fixedStretchRatio = undefined;
    }
    setStretchMode(stretchMode, fixedStretchRatio) {
        if (stretchMode === StretchType.Default) {
            this.mode = this.settings.getDefaultStretchMode(window.location.hostname);
        }
        else {
            if (stretchMode === StretchType.Fixed || stretchMode == StretchType.FixedSource) {
                this.fixedStretchRatio = fixedStretchRatio;
            }
            this.mode = stretchMode;
        }
    }
    applyConditionalStretch(stretchFactors, actualAr) {
        let playerAr = this.conf.player.aspectRatio;
        let videoAr = this.conf.aspectRatio;
        if (!actualAr) {
            actualAr = playerAr;
        }
        let newWidth = this.conf.video.offsetWidth * stretchFactors.xFactor;
        let newHeight = this.conf.video.offsetHeight * stretchFactors.yFactor;
        let actualWidth, actualHeight;
        // determine the dimensions of the video (sans black bars) after scaling
        if (actualAr < videoAr) {
            actualHeight = newHeight;
            actualWidth = newHeight * actualAr;
        }
        else {
            actualHeight = newWidth / actualAr;
            actualWidth = newWidth;
        }
        let minW = this.conf.player.dimensions.width * (1 - this.settings.active.stretch.conditionalDifferencePercent);
        let maxW = this.conf.player.dimensions.width * (1 + this.settings.active.stretch.conditionalDifferencePercent);
        let minH = this.conf.player.dimensions.height * (1 - this.settings.active.stretch.conditionalDifferencePercent);
        let maxH = this.conf.player.dimensions.height * (1 + this.settings.active.stretch.conditionalDifferencePercent);
        if (actualWidth >= minW && actualWidth <= maxW) {
            stretchFactors.xFactor *= this.conf.player.dimensions.width / actualWidth;
        }
        if (actualHeight >= minH && actualHeight <= maxH) {
            stretchFactors.yFactor *= this.conf.player.dimensions.height / actualHeight;
        }
    }
    calculateBasicStretch() {
        // video.videoWidth in video.videoHeight predstavljata velikost datoteke. 
        // velikost video datoteke je lahko drugačna kot velikost <video> elementa. 
        // Zaradi tega lahko pride do te situacije:
        //     * Ločljivost videa je 850x480 (videoWidth & videoHeight)
        //     * Velikost <video> značke je 1920x720. 
        // Znotraj te video značke bo video prikazan v 1280x720 pravokotniku. Raztegovanje
        // torej hočemo računati z uporabo vrednosti 1280 in 720. Teh vrednosti pa ne
        // poznamo. Torej jih moramo računati.
        //
        //
        // video.videoWidth and video.videoHeight describe the size of the video file.
        // Size of the video file can be different than the size of the <video> tag.
        // This can leave us with the following situation:
        //     * Video resolution is 850x480-ish (as reported by videoWidth and videoHeight)
        //     * Size of the <video> tag is 1920x720
        // The video will be displayed in a 1280x720 rectangle inside that <video> tag. 
        // This means we want to calculate stretching using those values, but we don't know
        // them. This means we have to calculate them.
        const streamAr = this.conf.aspectRatio;
        if (this.conf.player.dimensions.width > this.conf.player.dimensions.height * streamAr) {
            return {
                xFactor: this.conf.player.dimensions.width / (this.conf.player.dimensions.height * streamAr),
                yFactor: 1
            };
        }
        return {
            xFactor: 1,
            yFactor: this.conf.player.dimensions.height / (this.conf.player.dimensions.width / streamAr)
        };
    }
    applyStretchFixedSource(postCropStretchFactors) {
        const streamAr = this.conf.aspectRatio;
        const playerAr = this.conf.player.aspectRatio;
        const squeezeFactor = this.fixedStretchRatio / streamAr;
        // Whether squeezing happens on X or Y axis depends on whether required AR is wider or narrower than
        // the player, in which the video is displayed
        //     * we squeeze X axis, if target AR is narrower than player size
        //     * we squeeze Y axis, if target AR is wider than the player size
        this.logger.log('info', 'stretcher', `[Stretcher::applyStretchFixedSource] here's what we got:
postCropStretchFactors: x=${postCropStretchFactors.xFactor} y=${postCropStretchFactors.yFactor}
fixedStretchRatio:      ${this.fixedStretchRatio}
videoAr:                ${streamAr}
playerAr:               ${playerAr}
squeezeFactor:          ${squeezeFactor}`, '\nvideo', this.conf.video);
        postCropStretchFactors.xFactor *= squeezeFactor;
        this.logger.log('info', 'stretcher', `[Stretcher::applyStretchFixedSource] here's what we'll apply:\npostCropStretchFactors: x=${postCropStretchFactors.x} y=${postCropStretchFactors.y}`);
        return postCropStretchFactors;
    }
    calculateStretchFixed(actualAr) {
        return this.calculateStretch(actualAr, this.fixedStretchRatio);
    }
    getArCorrectionFactor() {
        let arCorrectionFactor = 1;
        arCorrectionFactor = this.conf.player.dimensions.width / this.conf.video.offsetWidth;
        return arCorrectionFactor;
    }
    calculateStretch(actualAr, playerArOverride) {
        const playerAr = playerArOverride || this.conf.player.aspectRatio;
        const streamAr = this.conf.aspectRatio;
        if (!actualAr) {
            actualAr = playerAr;
        }
        let stretchFactors = {
            xFactor: 1,
            yFactor: 1
        };
        if (playerAr >= streamAr) {
            // player adds PILLARBOX
            if (actualAr >= playerAr) {
                // VERIFIED WORKS
                // actual > player > video  — video is letterboxed
                // solution: horizontal stretch according to difference between video and player AR
                //           vertical stretch according to difference between actual AR and player AR
                stretchFactors.xFactor = playerAr / streamAr;
                stretchFactors.yFactor = actualAr / streamAr;
                this.logger.log('info', 'stretcher', "[Stretcher.js::calculateStretch] stretching strategy 1");
            }
            else if (actualAr >= streamAr) {
                // VERIFIED WORKS
                // player > actual > video — video is still letterboxed
                // we need vertical stretch to remove black bars in video
                // we need horizontal stretch to make video fit width
                stretchFactors.xFactor = playerAr / streamAr;
                stretchFactors.yFactor = actualAr / streamAr;
                this.logger.log('info', 'stretcher', "[Stretcher.js::calculateStretch] stretching strategy 2");
            }
            else {
                // NEEDS CHECKING
                // player > video > actual — double pillarbox
                stretchFactors.xFactor = actualAr / playerAr;
                stretchFactors.yFactor = 1;
                this.logger.log('info', 'stretcher', "[Stretcher.js::calculateStretch] stretching strategy 3");
            }
        }
        else {
            // player adds LETTERBOX
            if (actualAr < playerAr) {
                // NEEDS CHECKING
                // video > player > actual
                // video is PILLARBOXED
                stretchFactors.xFactor = actualAr / playerAr;
                stretchFactors.yFactor = streamAr / playerAr;
                this.logger.log('info', 'stretcher', "[Stretcher.js::calculateStretch] stretching strategy 4");
            }
            else if (actualAr < streamAr) {
                // NEEDS CHECKING 
                // video > actual > player
                // video is letterboxed by player
                // actual is pillarboxed by video
                stretchFactors.xFactor = actualAr / playerAr;
                stretchFactors.yFactor = actualAr / playerAr;
                this.logger.log('info', 'stretcher', "[Stretcher.js::calculateStretch] stretching strategy 5");
            }
            else {
                // VERIFIED CORRECT
                // actual > video > player
                // actual fits width. Letterboxed by both.
                stretchFactors.xFactor = 1;
                stretchFactors.yFactor = actualAr / playerAr;
                this.logger.log('info', 'stretcher', "[Stretcher.js::calculateStretch] stretching strategy 6");
            }
        }
        // const arCorrectionFactor = this.getArCorrectionFactor();
        // correct factors, unless we're trying to reset
        // stretchFactors.xFactor *= arCorrectionFactor;
        // stretchFactors.yFactor *= arCorrectionFactor;
        stretchFactors.arCorrectionFactor = this.getArCorrectionFactor();
        return stretchFactors;
    }
    /**
     * Ensure that <video> element is never both taller-ish and wider-ish than the screen, while in fullscreen
     * on Chromium-based browsers.
     *
     * Workaround for Chrome/Edge issue where zooming too much results in video being stretched incorrectly.
     *
     * Bug description — if the following are true:
     *   * user is using Chrome or Edge (but surprisingly not Opera)
     *   * user is using hardware acceleration
     *   * user is using a noVideo card
     *   * user is in full screen mode
     *   * the video is both roughly taller and roughly wider than the monitor
     * Then the video will do StretchType.Basic no matter what you put in `transform: scale(x,y)`.
     *
     * In practice, the issue appears slightly _before_ the last condition is met (video needs to be ~3434 px wide
     * in order for this bug to trigger on my 3440x1440 display).
     *
     * Because this issue happens regardless of how you upscale the video (doesn't matter if you use transform:scale
     * or width+height or anything else), the aspect ratio needs to be limited _before_ applying arCorrectionFactor
     * (note that arCorrectionFactor is usually <= 1, as it conpensates for zooming that height=[>100%] on <video>
     * style attribute does).
     */
    chromeBugMitigation(stretchFactors) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        if (BrowserDetect.anyChromium
            && (((_b = (_a = this.conf.player) === null || _a === void 0 ? void 0 : _a.dimensions) === null || _b === void 0 ? void 0 : _b.fullscreen) || !((_f = (_e = (_d = (_c = this.settings) === null || _c === void 0 ? void 0 : _c.active) === null || _d === void 0 ? void 0 : _d.mitigations) === null || _e === void 0 ? void 0 : _e.zoomLimit) === null || _f === void 0 ? void 0 : _f.fullscreenOnly))
            && ((_k = (_j = (_h = (_g = this.settings) === null || _g === void 0 ? void 0 : _g.active) === null || _h === void 0 ? void 0 : _h.mitigations) === null || _j === void 0 ? void 0 : _j.zoomLimit) === null || _k === void 0 ? void 0 : _k.enabled)) {
            const playerAr = this.conf.player.aspectRatio;
            const streamAr = this.conf.aspectRatio;
            let maxSafeAr;
            let arLimitFactor = (_q = (_p = (_o = (_m = (_l = this.settings) === null || _l === void 0 ? void 0 : _l.active) === null || _m === void 0 ? void 0 : _m.mitigations) === null || _o === void 0 ? void 0 : _o.zoomLimit) === null || _p === void 0 ? void 0 : _p.limit) !== null && _q !== void 0 ? _q : 0.997;
            if (playerAr >= (streamAr * 1.1)) {
                maxSafeAr = (window.innerWidth * arLimitFactor) / window.innerHeight;
            }
            else if (playerAr < (streamAr * 0.95)) {
                maxSafeAr = window.innerWidth / (window.innerHeight * arLimitFactor);
            }
            else {
                // in some cases, we tolerate minor stretch to avoid tiny black bars
                return;
            }
            const maxSafeStretchFactor = this.conf.resizer.scaler.calculateCropCore({
                xFactor: 1,
                yFactor: 1,
                arCorrectionFactor: stretchFactors.arCorrectionFactor
            }, maxSafeAr, streamAr, playerAr).xFactor;
            // console.info('Stretch factors before:', stretchFactors.xFactor, stretchFactors.yFactor, "max safe:", maxSafeStretchFactor, "max safe ar:", maxSafeAr);
            stretchFactors.xFactor = Math.min(stretchFactors.xFactor, maxSafeStretchFactor);
            stretchFactors.yFactor = Math.min(stretchFactors.yFactor, maxSafeStretchFactor);
            return stretchFactors;
        }
    }
}
export default Stretcher;
