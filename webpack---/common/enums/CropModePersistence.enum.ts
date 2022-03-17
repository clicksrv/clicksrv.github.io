var CropModePersistence;
(function (CropModePersistence) {
    CropModePersistence[CropModePersistence["Default"] = -1] = "Default";
    CropModePersistence[CropModePersistence["Disabled"] = 0] = "Disabled";
    CropModePersistence[CropModePersistence["UntilPageReload"] = 1] = "UntilPageReload";
    CropModePersistence[CropModePersistence["CurrentSession"] = 2] = "CurrentSession";
    CropModePersistence[CropModePersistence["Forever"] = 3] = "Forever";
})(CropModePersistence || (CropModePersistence = {}));
export default CropModePersistence;
