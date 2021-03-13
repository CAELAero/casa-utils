import { AirframeType } from './airframe-type';
import { CertificationCategoryType } from './certification-category-type';
import { EngineType } from './engine-type';
import { FuelType } from './fuel-type';
import { LandingGearType } from './landing-gear-type';
import { RegistrationType } from './registration-type';
/**
 * Internal reverse enum mapper since TS doesn't like using the string
 * value for lookups, so we abstract it away using reverse maps.
 *
 * @internal
 */
export declare class EnumMapper {
    private reverseRegMap;
    private reverseGearMap;
    private reverseAirframeMap;
    private reverseCategoryMap;
    private reverseEngineMap;
    private reverseFuelMap;
    constructor();
    lookupRegistration(raw: string): RegistrationType;
    lookupLandingGear(raw: string): LandingGearType;
    lookupAirframe(raw: string): AirframeType;
    lookupCertificationCategory(raw: string): CertificationCategoryType;
    lookupEngine(raw: string): EngineType;
    lookupFuel(raw: string): FuelType;
}
//# sourceMappingURL=enum-mapper.d.ts.map