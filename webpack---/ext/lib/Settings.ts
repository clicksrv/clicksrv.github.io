import Debug from '../conf/Debug';
import ExtensionConf from '../conf/ExtensionConf';
import ExtensionMode from '../../common/enums/ExtensionMode.enum';
import ObjectCopy from './ObjectCopy';
import StretchType from '../../common/enums/StretchType.enum';
import VideoAlignmentType from '../../common/enums/VideoAlignmentType.enum';
import ExtensionConfPatch from '../conf/ExtConfPatches';
import CropModePersistence from '../../common/enums/CropModePersistence.enum';
import { browser } from 'webextension-polyfill-ts';
if (process.env.CHANNEL !== 'stable') {
    console.info("Loading Settings");
}
class Settings {
    //#endregion
    constructor(options) {
        var _a;
        //#region flags
        this.useSync = false;
        // Options: activeSettings, updateCallback, logger
        this.logger = options === null || options === void 0 ? void 0 : options.logger;
        this.onSettingsChanged = options === null || options === void 0 ? void 0 : options.onSettingsChanged;
        this.afterSettingsSaved = options === null || options === void 0 ? void 0 : options.afterSettingsSaved;
        this.active = (_a = options === null || options === void 0 ? void 0 : options.activeSettings) !== null && _a !== void 0 ? _a : undefined;
        this.default = ExtensionConf;
        this.default['version'] = this.getExtensionVersion();
        browser.storage.onChanged.addListener((changes, area) => { this.storageChangeListener(changes, area); });
    }
    storageChangeListener(changes, area) {
        var _a, _b, _c, _d;
        if (!changes.uwSettings) {
            return;
        }
        (_a = this.logger) === null || _a === void 0 ? void 0 : _a.log('info', 'settings', "[Settings::<storage/on change>] Settings have been changed outside of here. Updating active settings. Changes:", changes, "storage area:", area);
        // if (changes['uwSettings'] && changes['uwSettings'].newValue) {
        //   this.logger?.log('info', 'settings',"[Settings::<storage/on change>] new settings object:", JSON.parse(changes.uwSettings.newValue));
        // }
        const parsedSettings = JSON.parse(changes.uwSettings.newValue);
        this.setActive(parsedSettings);
        (_b = this.logger) === null || _b === void 0 ? void 0 : _b.log('info', 'debug', 'Does parsedSettings.preventReload exist?', parsedSettings.preventReload, "Does callback exist?", !!this.onSettingsChanged);
        if (!parsedSettings.preventReload && this.onSettingsChanged) {
            try {
                this.onSettingsChanged();
                (_c = this.logger) === null || _c === void 0 ? void 0 : _c.log('info', 'settings', '[Settings] Update callback finished.');
            }
            catch (e) {
                (_d = this.logger) === null || _d === void 0 ? void 0 : _d.log('error', 'settings', "[Settings] CALLING UPDATE CALLBACK FAILED. Reason:", e);
            }
        }
        if (this.afterSettingsSaved) {
            this.afterSettingsSaved();
        }
    }
    static getExtensionVersion() {
        return browser.runtime.getManifest().version;
    }
    getExtensionVersion() {
        return Settings.getExtensionVersion();
    }
    compareExtensionVersions(a, b) {
        let aa = a.split('.');
        let bb = b.split('.');
        if (+aa[0] !== +bb[0]) {
            // difference on first digit
            return +aa[0] - +bb[0];
        }
        if (+aa[1] !== +bb[1]) {
            // first digit same, difference on second digit
            return +aa[1] - +bb[1];
        }
        if (+aa[2] !== +bb[2]) {
            return +aa[2] - +bb[2];
            // first two digits the same, let's check the third digit
        }
        else {
            // fourth digit is optional. When not specified, 0 is implied
            // btw, ++(aa[3] || 0) - ++(bb[3] || 0) doesn't work
            // Since some things are easier if we actually have a value for
            // the fourth digit, we turn a possible undefined into a zero
            aa[3] = aa[3] === undefined ? 0 : aa[3];
            bb[3] = bb[3] === undefined ? 0 : bb[3];
            // also, the fourth digit can start with a letter. 
            // versions that start with a letter are ranked lower than 
            // versions x.x.x.0
            if ((isNaN(+aa[3]) && !isNaN(+bb[3]))
                || (!isNaN(+aa[3]) && isNaN(+bb[3]))) {
                return isNaN(+aa[3]) ? -1 : 1;
            }
            // at this point, either both version numbers are a NaN or 
            // both versions are a number.
            if (!isNaN(+aa[3])) {
                return +aa[3] - +bb[3];
            }
            // letters have their own hierarchy:
            // dev < a < b < rc
            let av = this.getPrereleaseVersionHierarchy(aa[3]);
            let bv = this.getPrereleaseVersionHierarchy(bb[3]);
            if (av !== bv) {
                return av - bv;
            }
            else {
                return +(aa[3].replace(/\D/g, '')) - +(bb[3].replace(/\D/g, ''));
            }
        }
    }
    getPrereleaseVersionHierarchy(version) {
        if (version.startsWith('dev')) {
            return 0;
        }
        if (version.startsWith('a')) {
            return 1;
        }
        if (version.startsWith('b')) {
            return 2;
        }
        return 3;
    }
    sortConfPatches(patchesIn) {
        return patchesIn.sort((a, b) => this.compareExtensionVersions(a.forVersion, b.forVersion));
    }
    findFirstNecessaryPatch(version, extconfPatches) {
        const sorted = this.sortConfPatches(extconfPatches);
        return sorted.findIndex(x => this.compareExtensionVersions(x.forVersion, version) > 0);
    }
    applySettingsPatches(oldVersion, patches) {
        var _a, _b, _c;
        let index = this.findFirstNecessaryPatch(oldVersion, patches);
        if (index === -1) {
            (_a = this.logger) === null || _a === void 0 ? void 0 : _a.log('info', 'settings', '[Settings::applySettingsPatches] There are no pending conf patches.');
            return;
        }
        // apply all remaining patches
        (_b = this.logger) === null || _b === void 0 ? void 0 : _b.log('info', 'settings', `[Settings::applySettingsPatches] There are ${patches.length - index} settings patches to apply`);
        while (index < patches.length) {
            const updateFn = patches[index].updateFn;
            delete patches[index].forVersion;
            delete patches[index].updateFn;
            if (Object.keys(patches[index]).length > 0) {
                ObjectCopy.overwrite(this.active, patches[index]);
            }
            if (updateFn) {
                try {
                    updateFn(this.active, this.getDefaultSettings());
                }
                catch (e) {
                    (_c = this.logger) === null || _c === void 0 ? void 0 : _c.log('error', 'settings', '[Settings::applySettingsPatches] Failed to execute update function. Keeping settings object as-is. Error:', e);
                }
            }
            index++;
        }
    }
    async init() {
        var _a, _b, _c, _d;
        const settings = await this.get();
        this.version = this.getExtensionVersion();
        //                 |—> on first setup, settings is undefined & settings.version is haram
        //                 |   since new installs ship with updates by default, no patching is
        //                 |   needed. In this case, we assume we're on the current version
        const oldVersion = (settings && settings.version) || this.version;
        if (settings) {
            (_a = this.logger) === null || _a === void 0 ? void 0 : _a.log('info', 'settings', "[Settings::init] Configuration fetched from storage:", settings, "\nlast saved with:", settings.version, "\ncurrent version:", this.version);
        }
        // if (Debug.flushStoredSettings) {
        //   this.logger?.log('info', 'settings', "%c[Settings::init] Debug.flushStoredSettings is true. Using default settings", "background: #d00; color: #ffd");
        //   Debug.flushStoredSettings = false; // don't do it again this session
        //   this.active = this.getDefaultSettings();
        //   this.active.version = this.version;
        //   this.set(this.active);
        //   return this.active;
        // }
        // if there's no settings saved, return default settings.
        if (!settings || (Object.keys(settings).length === 0 && settings.constructor === Object)) {
            (_b = this.logger) === null || _b === void 0 ? void 0 : _b.log('info', 'settings', '[Settings::init] settings don\'t exist. Using defaults.\n#keys:', settings ? Object.keys(settings).length : 0, '\nsettings:', settings);
            this.active = this.getDefaultSettings();
            this.active.version = this.version;
            await this.save();
            return this.active;
        }
        // if there's settings, set saved object as active settings
        this.active = settings;
        // if version number is undefined, we make it defined
        // this should only happen on first extension initialization
        if (!this.active.version) {
            this.active.version = this.version;
            await this.save();
            return this.active;
        }
        // check if extension has been updated. If not, return settings as they were retrieved
        if (this.active.version === this.version) {
            (_c = this.logger) === null || _c === void 0 ? void 0 : _c.log('info', 'settings', "[Settings::init] extension was saved with current version of ultrawidify. Returning object as-is.");
            return this.active;
        }
        // This means extension update happened.
        // btw fun fact — we can do version rollbacks, which might come in handy while testing
        this.active.version = this.version;
        // if extension has been updated, update existing settings with any options added in the
        // new version. In addition to that, we remove old keys that are no longer used.
        const patched = ObjectCopy.addNew(settings, this.default);
        (_d = this.logger) === null || _d === void 0 ? void 0 : _d.log('info', 'settings', "[Settings.init] Results from ObjectCopy.addNew()?", patched, "\n\nSettings from storage", settings, "\ndefault?", this.default);
        if (patched) {
            this.active = patched;
        }
        // in case settings in previous version contained a fucky wucky, we overwrite existing settings with a patch
        this.applySettingsPatches(oldVersion, ExtensionConfPatch);
        // set 'whatsNewChecked' flag to false when updating, always
        this.active.whatsNewChecked = false;
        // update settings version to current
        this.active.version = this.version;
        await this.save();
        return this.active;
    }
    async get() {
        var _a;
        let ret;
        ret = await browser.storage.local.get('uwSettings');
        (_a = this.logger) === null || _a === void 0 ? void 0 : _a.log('info', 'settings', 'Got settings:', ret && ret.uwSettings && JSON.parse(ret.uwSettings));
        try {
            return JSON.parse(ret.uwSettings);
        }
        catch (e) {
            return undefined;
        }
    }
    fixSitesSettings(sites) {
        for (const site in sites) {
            if (site === '@global') {
                continue;
            }
            if (sites[site].mode === undefined) {
                sites[site].mode = ExtensionMode.Default;
            }
            if (sites[site].autoar === undefined) {
                sites[site].autoar = ExtensionMode.Default;
            }
            if (sites[site].stretch === undefined) {
                sites[site].stretch = StretchType.Default;
            }
            if (sites[site].videoAlignment === undefined) {
                sites[site].videoAlignment = VideoAlignmentType.Default;
            }
            if (sites[site].keyboardShortcutsEnabled === undefined) {
                sites[site].keyboardShortcutsEnabled = ExtensionMode.Default;
            }
        }
    }
    async set(extensionConf, options) {
        var _a;
        if (!options || !options.forcePreserveVersion) {
            extensionConf.version = this.version;
        }
        this.fixSitesSettings(extensionConf.sites);
        (_a = this.logger) === null || _a === void 0 ? void 0 : _a.log('info', 'settings', "[Settings::set] setting new settings:", extensionConf);
        return browser.storage.local.set({ 'uwSettings': JSON.stringify(extensionConf) });
    }
    async setActive(activeSettings) {
        this.active = activeSettings;
    }
    async setProp(prop, value) {
        this.active[prop] = value;
    }
    async save(options) {
        if (Debug.debug && Debug.storage) {
            console.log("[Settings::save] Saving active settings:", this.active);
        }
        this.active.preventReload = undefined;
        await this.set(this.active, options);
    }
    async saveWithoutReload() {
        this.active.preventReload = true;
        await this.set(this.active);
    }
    async rollback() {
        this.active = await this.get();
    }
    getDefaultSettings() {
        return JSON.parse(JSON.stringify(this.default));
    }
    // -----------------------------------------
    // Nastavitve za posamezno stran
    // Config for a given page:
    // 
    // <hostname> : {
    //    status: <option>              // should extension work on this site?
    //    arStatus: <option>            // should we do autodetection on this site?
    //    statusEmbedded: <option>      // reserved for future... maybe
    // } 
    //  
    // Veljavne vrednosti za možnosti 
    // Valid values for options:
    //
    //     status, arStatus, statusEmbedded:
    //    
    //    * enabled     — always allow
    //    * basic       — only allow fullscreen
    //    * default     — allow if default is to allow, block if default is to block
    //    * disabled    — never allow
    getActionsForSite(site) {
        if (!site) {
            return this.active.actions;
        }
        if (this.active.sites[site] && this.active.sites[site].actions && this.active.sites[site].actions.length > 0) {
            return this.active.sites[site].actions;
        }
        return this.active.actions;
    }
    getSettingsForSite(site) {
        if (!site) {
            site = window.location.hostname;
        }
        return this.active.sites[site];
    }
    getExtensionMode(site) {
        var _a, _b;
        if (!site) {
            site = window.location.hostname;
            if (!site) {
                (_a = this.logger) === null || _a === void 0 ? void 0 : _a.log('info', 'settings', `[Settings::canStartExtension] window.location.hostname is null or undefined: ${window.location.hostname} \nactive settings:`, this.active);
                return ExtensionMode.Disabled;
            }
        }
        try {
            // if site-specific settings don't exist for the site, we use default mode:
            if (!this.active.sites[site]) {
                return this.getExtensionMode('@global');
            }
            if (this.active.sites[site].mode === ExtensionMode.Enabled) {
                return ExtensionMode.Enabled;
            }
            else if (this.active.sites[site].mode === ExtensionMode.Basic) {
                return ExtensionMode.Basic;
            }
            else if (this.active.sites[site].mode === ExtensionMode.Disabled) {
                return ExtensionMode.Disabled;
            }
            else {
                if (site !== '@global') {
                    return this.getExtensionMode('@global');
                }
                else {
                    return ExtensionMode.Disabled;
                }
            }
        }
        catch (e) {
            (_b = this.logger) === null || _b === void 0 ? void 0 : _b.log('error', 'settings', "[Settings.js::canStartExtension] Something went wrong — are settings defined/has init() been called?\n\nerror:", e, "\n\nSettings object:", this);
            return ExtensionMode.Disabled;
        }
    }
    canStartExtension(site) {
        var _a, _b;
        // returns 'true' if extension can be started on a given site. Returns false if we shouldn't run.
        if (!site) {
            site = window.location.hostname;
            if (!site) {
                (_a = this.logger) === null || _a === void 0 ? void 0 : _a.log('info', 'settings', `[Settings::canStartExtension] window.location.hostname is null or undefined: ${window.location.hostname} \nactive settings:`, this.active);
                return false;
            }
        }
        // if (Debug.debug) {
        //   // let's just temporarily disable debugging while recursively calling
        //   // this function to get extension status on current site without duplo
        //   // console logs (and without endless recursion)
        //   Debug.debug = false;
        //   const cse = this.canStartExtension(site);
        //   Debug.debug = true;
        // }
        try {
            // if site is not defined, we use default mode:
            if (!this.active.sites[site] || this.active.sites[site].mode === ExtensionMode.Default) {
                return this.active.sites['@global'].mode === ExtensionMode.Enabled;
            }
            if (this.active.sites['@global'].mode === ExtensionMode.Enabled) {
                return this.active.sites[site].mode !== ExtensionMode.Disabled;
            }
            else if (this.active.sites['@global'].mode === ExtensionMode.Whitelist) {
                return this.active.sites[site].mode === ExtensionMode.Enabled;
            }
            else {
                return false;
            }
        }
        catch (e) {
            (_b = this.logger) === null || _b === void 0 ? void 0 : _b.log('error', 'settings', "[Settings.js::canStartExtension] Something went wrong — are settings defined/has init() been called?\nSettings object:", this);
            return false;
        }
    }
    keyboardShortcutsEnabled(site) {
        var _a;
        if (!site) {
            site = window.location.hostname;
        }
        if (!site) {
            return false;
        }
        try {
            if (!this.active.sites[site]
                || this.active.sites[site].keyboardShortcutsEnabled === undefined
                || this.active.sites[site].keyboardShortcutsEnabled === ExtensionMode.Default) {
                return this.keyboardShortcutsEnabled('@global');
            }
            else {
                return this.active.sites[site].keyboardShortcutsEnabled === ExtensionMode.Enabled;
            }
        }
        catch (e) {
            (_a = this.logger) === null || _a === void 0 ? void 0 : _a.log('info', 'settings', "[Settings.js::keyboardDisabled] something went wrong:", e);
            return false;
        }
    }
    extensionEnabled() {
        return this.active.sites['@global'].mode !== ExtensionMode.Disabled;
    }
    extensionEnabledForSite(site) {
        return this.canStartExtension(site);
    }
    canStartAutoAr(site) {
        var _a, _b, _c, _d, _e, _f;
        // 'site' argument is only ever used when calling this function recursively for debugging
        if (!site) {
            site = window.location.hostname;
            if (!site) {
                (_a = this.logger) === null || _a === void 0 ? void 0 : _a.log('warn', ['settings', 'init', 'debug'], `[Settings::canStartAutoAr] No site — even window.location.hostname returned nothing!: ${window.location.hostname}`);
                return false;
            }
        }
        // if (Debug.debug) {
        // let's just temporarily disable debugging while recursively calling
        // this function to get extension status on current site without duplo
        // console logs (and without endless recursion)
        // Debug.debug = false;
        // const csar = this.canStartAutoAr(site);
        // Debug.debug = true;
        (_b = this.logger) === null || _b === void 0 ? void 0 : _b.log('info', ['settings', 'init', 'debug'], "[Settings::canStartAutoAr] ----------------\nCAN WE START AUTOAR ON SITE", site, "?\n\nsettings.active.sites[site]=", this.active.sites[site], "settings.active.sites[@global]=", this.active.sites['@global'], "\nAutoar mode (global)?", this.active.sites['@global'].autoar, `\nAutoar mode (${site})`, this.active.sites[site] ? this.active.sites[site].autoar : '<not defined>');
        // }
        // if site is not defined, we use default mode:    
        if (!this.active.sites[site]) {
            (_c = this.logger) === null || _c === void 0 ? void 0 : _c.log('info', ['settings', 'aard', 'init', 'debug'], "[Settings::canStartAutoAr] Settings not defined for this site, returning defaults.", site, this.active.sites[site], this.active.sites);
            return this.active.sites['@global'].autoar === ExtensionMode.Enabled;
        }
        if (this.active.sites['@global'].autoar === ExtensionMode.Enabled) {
            (_d = this.logger) === null || _d === void 0 ? void 0 : _d.log('info', ['settings', 'aard', 'init', 'debug'], `[Settings::canStartAutoAr] Aard is enabled by default. Extension can run unless disabled for this site.`, this.active.sites[site].autoar);
            return this.active.sites[site].autoar !== ExtensionMode.Disabled;
        }
        else if (this.active.sites['@global'].autoar === ExtensionMode.Whitelist) {
            (_e = this.logger) === null || _e === void 0 ? void 0 : _e.log('info', ['settings', 'init', 'debug'], "canStartAutoAr — can(not) start aard because extension is in whitelist mode, and this site is (not) equal to", ExtensionMode.Enabled);
            return this.active.sites[site].autoar === ExtensionMode.Enabled;
        }
        else {
            (_f = this.logger) === null || _f === void 0 ? void 0 : _f.log('info', ['settings', 'init', 'debug'], "canStartAutoAr — cannot start aard because extension is globally disabled");
            return false;
        }
    }
    getDefaultOption(option) {
        const allDefault = {
            mode: ExtensionMode.Default,
            autoar: ExtensionMode.Default,
            autoarFallback: ExtensionMode.Default,
            stretch: StretchType.Default,
            videoAlignment: VideoAlignmentType.Default,
        };
        if (!option || allDefault[option] === undefined) {
            return allDefault;
        }
        return allDefault[option];
    }
    getDefaultAr(site) {
        // site = this.getSiteSettings(site);
        // if (site.defaultAr) {
        //   return site.defaultAr;
        // }
        return this.active.miscSettings.defaultAr;
    }
    getDefaultStretchMode(site) {
        var _a, _b;
        if (site && ((_b = (_a = this.active.sites[site]) === null || _a === void 0 ? void 0 : _a.stretch) !== null && _b !== void 0 ? _b : StretchType.Default) !== StretchType.Default) {
            return this.active.sites[site].stretch;
        }
        return this.active.sites['@global'].stretch;
    }
    getDefaultCropPersistenceMode(site) {
        var _a, _b;
        if (site && ((_b = (_a = this.active.sites[site]) === null || _a === void 0 ? void 0 : _a.cropModePersistence) !== null && _b !== void 0 ? _b : StretchType.Default) !== StretchType.Default) {
            return this.active.sites[site].cropModePersistence;
        }
        // persistence mode thing is missing from settings by default
        return this.active.sites['@global'].cropModePersistence || CropModePersistence.Disabled;
    }
    getDefaultVideoAlignment(site) {
        var _a, _b;
        if (((_b = (_a = this.active.sites[site]) === null || _a === void 0 ? void 0 : _a.videoAlignment) !== null && _b !== void 0 ? _b : VideoAlignmentType.Default) !== VideoAlignmentType.Default) {
            return this.active.sites[site].videoAlignment;
        }
        return this.active.sites['@global'].videoAlignment;
    }
}
export default Settings;
if (process.env.CHANNEL !== 'stable') {
    console.info("Settings loaded");
}
