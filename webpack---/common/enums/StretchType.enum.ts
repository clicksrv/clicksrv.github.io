var StretchType;
(function (StretchType) {
    StretchType[StretchType["NoStretch"] = 0] = "NoStretch";
    StretchType[StretchType["Basic"] = 1] = "Basic";
    StretchType[StretchType["Hybrid"] = 2] = "Hybrid";
    StretchType[StretchType["Conditional"] = 3] = "Conditional";
    StretchType[StretchType["Fixed"] = 4] = "Fixed";
    StretchType[StretchType["FixedSource"] = 5] = "FixedSource";
    StretchType[StretchType["Default"] = -1] = "Default";
})(StretchType || (StretchType = {}));
;
export default StretchType;
