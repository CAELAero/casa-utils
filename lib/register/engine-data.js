export class EngineData {
    static create(manufacturer, type, model, fuel) {
        const retval = new EngineData();
        retval.manufacturer = manufacturer;
        retval.engineType = type;
        retval.model = model;
        retval.fuelType = fuel;
        return retval;
    }
}
//# sourceMappingURL=engine-data.js.map