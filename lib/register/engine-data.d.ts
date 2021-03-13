import { EngineType } from './engine-type';
import { FuelType } from './fuel-type';
export declare class EngineData {
    manufacturer: string;
    engineType: EngineType;
    model: string;
    fuelType: FuelType;
    static create(manufacturer: string, type: EngineType, model: string, fuel: FuelType): EngineData;
}
//# sourceMappingURL=engine-data.d.ts.map