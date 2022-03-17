var ExtensionMode;
(function (ExtensionMode) {
    ExtensionMode[ExtensionMode["AutoDisabled"] = -2] = "AutoDisabled";
    ExtensionMode[ExtensionMode["Disabled"] = -1] = "Disabled";
    ExtensionMode[ExtensionMode["Default"] = 0] = "Default";
    ExtensionMode[ExtensionMode["Whitelist"] = 1] = "Whitelist";
    ExtensionMode[ExtensionMode["Basic"] = 2] = "Basic";
    ExtensionMode[ExtensionMode["Enabled"] = 3] = "Enabled";
})(ExtensionMode || (ExtensionMode = {}));
;
export default ExtensionMode;
