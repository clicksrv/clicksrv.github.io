import ExtensionMode from '../../../common/enums/ExtensionMode.enum';
import PlayerNotificationUi from '../uwui/PlayerNotificationUI';
import BrowserDetect from '../../conf/BrowserDetect';
import * as _ from 'lodash';
import { sleep } from '../../../common/js/utils';
if (process.env.CHANNEL !== 'stable') {
    console.info("Loading: PlayerData.js");
}
/* sprejme <video> tag (element) in seznam imen, ki se lahko pojavijo v razredih oz. id staršev.
// vrne dimenzije predvajalnika (širina, višina)
//
// Na youtube v theater mode je razširitev rahlo pokvarjena. Video tag ostane večji od predvajalnika, ko se zapusti
// celozaslonski način. Ta funkcija skuša to težavo rešiti tako, da poišče element predvajalnika, ki je zavit okoli videa.
//
// Funkcija izkorišča lastnost, da bi načeloma moral biti vsak zunanji element večji od notranjega. Najmanjši element od
// <video> značke pa do korena drevesa bi tako moral biti predvajalnik.
//
// Če je podan seznam imen, potem funkcija vrne dimenzije prvega elementa, ki v id oz. razredu vsebuje katerokoli ime iz seznama
//
// | EN |
//
// accepts <video> tag (element) and list of names that can appear in id or class
// returns player dimensions (width, height)
//
// Theater mode is mildly broken on youtube. <video> tag remains bigger than the player after leaving the fullscreen mode, and
// there's nothing we can do about that. This function aims to solve the problem by finding the player element that's wrapped around
// the <video> tag.
//
// In general, an outer tag should be bigger than the inner tag. Therefore the smallest element between <video> tag and the document
// root should be the player.
//
// If list of names is provided, the function returns dimensions of the first element that contains any name from the list in either
// id or class.
*/
class PlayerData {
    constructor(videoData) {
        //#endregion
        //#region flags
        this.invalid = false;
        this.periodicallyRefreshPlayerElement = false;
        this.halted = true;
        try {
            this.logger = videoData.logger;
            this.videoData = videoData;
            this.video = videoData.video;
            this.settings = videoData.settings;
            this.extensionMode = videoData.extensionMode;
            this.invalid = false;
            this.element = this.getPlayer();
            this.notificationService = new PlayerNotificationUi(this.element, this.settings);
            this.dimensions = undefined;
            this.overlayNode = undefined;
            this.periodicallyRefreshPlayerElement = false;
            try {
                this.periodicallyRefreshPlayerElement = this.settings.active.sites[window.location.hostname].DOM.player.periodicallyRefreshPlayerElement;
            }
            catch (e) {
                // no biggie — that means we don't have any special settings for this site.
            }
            // this happens when we don't find a matching player element
            if (!this.element) {
                this.invalid = true;
                return;
            }
            if (this.extensionMode === ExtensionMode.Enabled) {
                this.checkPlayerSizeChange();
            }
            this.startChangeDetection();
        }
        catch (e) {
            console.error('[Ultrawidify::PlayerData::ctor] There was an error setting up player data. You should be never seeing this message. Error:', e);
            this.invalid = true;
        }
    }
    //#endregion
    /**
     * Gets player aspect ratio. If in full screen, it returns screen aspect ratio unless settings say otherwise.
     */
    get aspectRatio() {
        var _a, _b;
        try {
            if (((_a = this.dimensions) === null || _a === void 0 ? void 0 : _a.fullscreen) && !((_b = this.settings.getSettingsForSite()) === null || _b === void 0 ? void 0 : _b.usePlayerArInFullscreen)) {
                return window.innerWidth / window.innerHeight;
            }
            return this.dimensions.width / this.dimensions.height;
        }
        catch (e) {
            console.error('cannot determine aspect ratio!', e);
            return 1;
        }
    }
    /**
     * Returns whether we're in fullscreen mode or not.
     */
    static isFullScreen() {
        const ihdiff = Math.abs(window.screen.height - window.innerHeight);
        const iwdiff = Math.abs(window.screen.width - window.innerWidth);
        // Chrome on linux on X on mixed PPI displays may return ever so slightly different values
        // for innerHeight vs screen.height abd innerWidth vs. screen.width, probably courtesy of
        // fractional scaling or something. This means we'll give ourself a few px of margin — the
        // window elements visible in not-fullscreen are usually double digit px tall
        return (ihdiff < 5 && iwdiff < 5);
    }
    onPlayerDimensionsChanged(mutationList, observer) {
        if (this === null || this === void 0 ? void 0 : this.checkPlayerSizeChange()) {
            this.videoData.resizer.restore();
        }
    }
    start() {
        this.startChangeDetection();
    }
    stop() {
        this.halted = true;
        this.stopChangeDetection();
    }
    destroy() {
        var _a;
        this.stopChangeDetection();
        this.destroyOverlay();
        (_a = this.notificationService) === null || _a === void 0 ? void 0 : _a.destroy();
    }
    startChangeDetection() {
        if (this.invalid) {
            return;
        }
        try {
            if (BrowserDetect.firefox) {
                this.observer = new ResizeObserver(_.debounce(// don't do this too much:
                this.onPlayerDimensionsChanged, 250, // do it once per this many ms
                {
                    leading: true,
                    trailing: true // do it after the timeout if we call this callback few more times
                }));
            }
            else {
                // Chrome for some reason insists that this.onPlayerDimensionsChanged is not a function
                // when it's not wrapped into an anonymous function
                this.observer = new ResizeObserver(_.debounce(// don't do this too much:
                (m, o) => this.onPlayerDimensionsChanged(m, o), 250, // do it once per this many ms
                {
                    leading: true,
                    trailing: true // do it after the timeout if we call this callback few more times
                }));
            }
            const observerConf = {
                attributes: true,
                // attributeFilter: ['style', 'class'],
                attributeOldValue: true,
            };
            this.observer.observe(this.element);
        }
        catch (e) {
            console.error("failed to set observer", e);
        }
        // legacy mode still exists, but acts as a fallback for observers and is triggered less
        // frequently in order to avoid too many pointless checks
        this.legacyChangeDetection();
    }
    async legacyChangeDetection() {
        while (!this.halted) {
            await sleep(1000);
            try {
                this.doPeriodicPlayerElementChangeCheck();
            }
            catch (e) {
                console.error('[PlayerData::legacycd] this message is pretty high on the list of messages you shouldn\'t see', e);
            }
        }
    }
    doPeriodicPlayerElementChangeCheck() {
        if (this.periodicallyRefreshPlayerElement) {
            this.forceDetectPlayerElementChange();
        }
    }
    stopChangeDetection() {
        this.observer.disconnect();
    }
    makeOverlay() {
        if (!this.overlayNode) {
            this.destroyOverlay();
        }
        let overlay = document.createElement('div');
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.zIndex = '1000000000';
        overlay.style.pointerEvents = 'none';
        this.overlayNode = overlay;
        this.element.appendChild(overlay);
    }
    destroyOverlay() {
        if (this.playerIdElement) {
            this.playerIdElement.remove();
            this.playerIdElement = undefined;
        }
        if (this.overlayNode) {
            this.overlayNode.remove();
            this.overlayNode = undefined;
        }
    }
    markPlayer(name, color) {
        if (!this.overlayNode) {
            this.makeOverlay();
        }
        if (this.playerIdElement) {
            this.playerIdElement.remove();
        }
        this.playerIdElement = document.createElement('div');
        this.playerIdElement.innerHTML = `<div style="background-color: ${color}; color: #fff; position: absolute; top: 0; left: 0">${name}</div>`;
        this.overlayNode.appendChild(this.playerIdElement);
    }
    unmarkPlayer() {
        this.logger.log('info', 'debug', "[PlayerData::unmarkPlayer] unmarking player!", { playerIdElement: this.playerIdElement });
        if (this.playerIdElement) {
            this.playerIdElement.innerHTML = '';
            this.playerIdElement.remove();
        }
        this.playerIdElement = undefined;
    }
    collectionHas(collection, element) {
        for (let i = 0, len = collection.length; i < len; i++) {
            if (collection[i] == element) {
                return true;
            }
        }
        return false;
    }
    updatePlayerDimensions(element) {
        var _a, _b, _c, _d, _e;
        const isFullScreen = PlayerData.isFullScreen();
        if (element.offsetWidth !== ((_a = this.dimensions) === null || _a === void 0 ? void 0 : _a.width)
            || element.offsetHeight !== ((_b = this.dimensions) === null || _b === void 0 ? void 0 : _b.height)
            || isFullScreen !== ((_c = this.dimensions) === null || _c === void 0 ? void 0 : _c.fullscreen)) {
            // update dimensions only if they've changed, _before_ we do a restore (not after)
            this.dimensions = {
                width: element.offsetWidth,
                height: element.offsetHeight,
                fullscreen: isFullScreen
            };
            // actually re-calculate zoom when player size changes, but only if videoData.resizer
            // is defined. Since resizer needs a PlayerData object to exist, videoData.resizer will
            // be undefined the first time this function will run.
            (_d = this.videoData.resizer) === null || _d === void 0 ? void 0 : _d.restore();
            // NOTE: it's possible that notificationService hasn't been initialized yet at this point.
            //       no biggie if it wasn't, we just won't replace the notification UI
            (_e = this.notificationService) === null || _e === void 0 ? void 0 : _e.replace(this.element);
        }
    }
    getPlayer() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        const host = window.location.hostname;
        let element = this.video.parentNode;
        const videoWidth = this.video.offsetWidth;
        const videoHeight = this.video.offsetHeight;
        const elementQ = [];
        const scorePenalty = 10;
        const sizePenaltyMultiplier = 0.1;
        let penaltyMultiplier = 0;
        let score;
        try {
            if (!element) {
                this.logger.log('info', 'debug', "[PlayerDetect::_pd_getPlayer] element is not valid, doing nothing.", element);
                if (this.element) {
                    const ths = this;
                }
                this.element = undefined;
                this.dimensions = undefined;
                return;
            }
            // log the entire hierarchy from <video> to root
            if (this.logger.canLog('playerDetect')) {
                const logObj = [];
                logObj.push(`window size: ${window.innerWidth} x ${window.innerHeight}`);
                let e = element;
                while (e) {
                    logObj.push({ offsetSize: { width: e.offsetWidth, height: e.offsetHeight }, clientSize: { width: e.clientWidth, height: e.clientHeight }, element: e });
                    e = e.parentNode;
                }
                this.logger.log('info', 'playerDetect', "\n\n[PlayerDetect::getPlayer()] element hierarchy (video->root)", logObj);
            }
            if ((_c = (_b = (_a = this.settings.active.sites[host]) === null || _a === void 0 ? void 0 : _a.DOM) === null || _b === void 0 ? void 0 : _b.player) === null || _c === void 0 ? void 0 : _c.manual) {
                if (((_f = (_e = (_d = this.settings.active.sites[host]) === null || _d === void 0 ? void 0 : _d.DOM) === null || _e === void 0 ? void 0 : _e.player) === null || _f === void 0 ? void 0 : _f.useRelativeAncestor)
                    && ((_j = (_h = (_g = this.settings.active.sites[host]) === null || _g === void 0 ? void 0 : _g.DOM) === null || _h === void 0 ? void 0 : _h.player) === null || _j === void 0 ? void 0 : _j.videoAncestor)) {
                    let parentsLeft = this.settings.active.sites[host].DOM.player.videoAncestor - 1;
                    while (parentsLeft-- > 0) {
                        element = element.parentNode;
                    }
                    if (element) {
                        this.updatePlayerDimensions(element);
                        return element;
                    }
                }
                else if ((_m = (_l = (_k = this.settings.active.sites[host]) === null || _k === void 0 ? void 0 : _k.DOM) === null || _l === void 0 ? void 0 : _l.player) === null || _m === void 0 ? void 0 : _m.querySelectors) {
                    const allSelectors = document.querySelectorAll(this.settings.active.sites[host].DOM.player.querySelectors);
                    // actually we'll also score this branch in a similar way we score the regular, auto branch
                    while (element) {
                        // Let's see how this works
                        if (this.collectionHas(allSelectors, element)) {
                            score = 100; // every matching element gets a baseline 100 points
                            // elements that match the size get a hefty bonus
                            if ((element.offsetWidth >= videoWidth && this.equalish(element.offsetHeight, videoHeight, 2))
                                || (element.offsetHeight >= videoHeight && this.equalish(element.offsetWidth, videoHeight, 2))) {
                                score += 75;
                            }
                            // elements farther away from the video get a penalty
                            score -= (scorePenalty) * 20;
                            // push the element on the queue/stack:
                            elementQ.push({
                                score: score,
                                element: element,
                            });
                        }
                        element = element.parentNode;
                    }
                    // log player candidates
                    this.logger.log('info', 'playerDetect', 'player detect via query selector: element queue and final element:', { queue: elementQ, bestCandidate: elementQ.length ? elementQ.sort((a, b) => b.score - a.score)[0].element : 'n/a' });
                    if (elementQ.length) {
                        // return element with biggest score
                        // if video player has not been found, proceed to automatic detection
                        const playerElement = elementQ.sort((a, b) => b.score - a.score)[0].element;
                        this.updatePlayerDimensions(playerElement);
                        return playerElement;
                    }
                }
            }
            // try to find element the old fashioned way
            while (element) {
                // odstranimo čudne elemente, ti bi pokvarili zadeve
                // remove weird elements, those would break our stuff
                if (element.offsetWidth == 0 || element.offsetHeight == 0) {
                    element = element.parentNode;
                    continue;
                }
                // element is player, if at least one of the sides is as long as the video
                // note that we can't make any additional assumptions with regards to player
                // size, since there are both cases where the other side is bigger _and_ cases
                // where other side is smaller than the video.
                // 
                // Don't bother thinking about this too much, as any "thinking" was quickly
                // corrected by bugs caused by various edge cases.
                if (this.equalish(element.offsetHeight, videoHeight, 5)
                    || this.equalish(element.offsetWidth, videoWidth, 5)) {
                    score = 1000;
                    // -------------------
                    //     PENALTIES
                    // -------------------
                    //
                    // Our ideal player will be as close to the video element, and it will als
                    // be as close to the size of the video.
                    // prefer elements closer to <video>
                    score -= scorePenalty * penaltyMultiplier++;
                    // the bigger the size difference between the video and the player,
                    // the more penalty we'll incur. Since we did some grace ith 
                    let playerSizePenalty = 1;
                    if (element.offsetHeight > (videoHeight + 5)) {
                        playerSizePenalty = (element.offsetWidth - videoHeight) * sizePenaltyMultiplier;
                    }
                    if (element.offsetWidth > (videoWidth + 5)) {
                        playerSizePenalty *= (element.offsetWidth - videoWidth) * sizePenaltyMultiplier;
                    }
                    score -= playerSizePenalty;
                    elementQ.push({
                        element: element,
                        score: score,
                    });
                }
                element = element.parentNode;
            }
            // log player candidates
            this.logger.log('info', 'playerDetect', 'player detect, auto/fallback: element queue and final element:', { queue: elementQ, bestCandidate: elementQ.length ? elementQ.sort((a, b) => b.score - a.score)[0].element : 'n/a' });
            if (elementQ.length) {
                // return element with biggest score
                const playerElement = elementQ.sort((a, b) => b.score - a.score)[0].element;
                this.updatePlayerDimensions(playerElement);
                return playerElement;
            }
            // if no candidates were found, something is obviously very, _very_ wrong.
            // we return nothing. Player will be marked as invalid and setup will stop.
            // VideoData should check for that before starting anything.
            this.logger.log('warn', 'debug', '[PlayerData::getPlayer] no matching player was found for video', this.video, 'Extension cannot work on this site.');
            return;
        }
        catch (e) {
            this.logger.log('crit', 'debug', '[PlayerData::getPlayer] something went wrong while detecting player:', e, 'Shutting down extension for this page');
        }
    }
    equalish(a, b, tolerance) {
        return a > b - tolerance && a < b + tolerance;
    }
    forceDetectPlayerElementChange() {
        // Player dimension changes get calculated every time updatePlayerDimensions is called (which happens
        // every time getPlayer() detects an element). If updatePlayerDimension detects dimensions were changed,
        // it will always re-apply current crop, rendering this function little more than a fancy alias for 
        // getPlayer().
        this.getPlayer();
    }
    forceRefreshPlayerElement() {
        this.getPlayer();
    }
    checkPlayerSizeChange() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        // this 'if' is just here for debugging — real code starts later. It's safe to collapse and
        // ignore the contents of this if (unless we need to change how logging works)
        if (this.logger.canLog('debug')) {
            if ((_a = this.dimensions) === null || _a === void 0 ? void 0 : _a.fullscreen) {
                if (!PlayerData.isFullScreen()) {
                    this.logger.log('info', 'debug', "[PlayerDetect] player size changed. reason: exited fullscreen");
                }
            }
            if (!this.element) {
                this.logger.log('info', 'playerDetect', "[PlayerDetect] player element isn't defined");
            }
            if (this.element &&
                (+((_b = this.dimensions) === null || _b === void 0 ? void 0 : _b.width) != +((_c = this.element) === null || _c === void 0 ? void 0 : _c.offsetWidth) ||
                    +((_d = this.dimensions) === null || _d === void 0 ? void 0 : _d.height) != +((_e = this.element) === null || _e === void 0 ? void 0 : _e.offsetHeight))) {
                this.logger.log('info', 'debug', "[PlayerDetect] player size changed. reason: dimension change. Old dimensions?", (_f = this.dimensions) === null || _f === void 0 ? void 0 : _f.width, (_g = this.dimensions) === null || _g === void 0 ? void 0 : _g.height, "new dimensions:", (_h = this.element) === null || _h === void 0 ? void 0 : _h.offsetWidth, (_j = this.element) === null || _j === void 0 ? void 0 : _j.offsetHeight);
            }
        }
        // if size doesn't match, update & return true
        if (((_k = this.dimensions) === null || _k === void 0 ? void 0 : _k.width) != this.element.offsetWidth
            || ((_l = this.dimensions) === null || _l === void 0 ? void 0 : _l.height) != this.element.offsetHeight) {
            const isFullScreen = PlayerData.isFullScreen();
            if (isFullScreen) {
                this.dimensions = {
                    width: window.innerWidth,
                    height: window.innerHeight,
                    fullscreen: true
                };
            }
            else {
                this.dimensions = {
                    width: this.element.offsetWidth,
                    height: this.element.offsetHeight,
                    fullscreen: isFullScreen
                };
            }
            return true;
        }
        return false;
    }
    checkFullscreenChange() {
        const isFs = PlayerData.isFullScreen();
        if (this.dimensions) {
            if (this.dimensions.fullscreen != isFs) {
                this.dimensions = {
                    fullscreen: isFs,
                    width: isFs ? screen.width : this.video.offsetWidth,
                    height: isFs ? screen.height : this.video.offsetHeight
                };
                return true;
            }
            return false;
        }
        this.logger.log('info', 'debug', "[PlayerData::checkFullscreenChange] this.dimensions is not defined. Assuming fs change happened and setting default values.");
        this.dimensions = {
            fullscreen: isFs,
            width: isFs ? screen.width : this.video.offsetWidth,
            height: isFs ? screen.height : this.video.offsetHeight
        };
        return true;
    }
    showNotification(notificationId) {
        var _a;
        (_a = this.notificationService) === null || _a === void 0 ? void 0 : _a.showNotification(notificationId);
    }
    /**
     * NOTE: this method needs to be deleted once Edge gets its shit together.
     */
    showEdgeNotification() {
        // if (BrowserDetect.isEdgeUA && !this.settings.active.mutedNotifications?.browserSpecific?.edge?.brokenDrm?.[window.hostname]) {
        //   this.ui = new PlayerUi(this.element, this.settings);
        // }
    }
}
if (process.env.CHANNEL !== 'stable') {
    console.info("PlayerData loaded");
}
export default PlayerData;
