/*
 * Copyright (c) 2020, Justin Couch
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { AirframeType } from "./airframe-type";
import { CertificationCategoryType } from "./certification-category-type";
import { EngineType } from './engine-type';
import { FuelType } from './fuel-type';
import { LandingGearType } from "./landing-gear-type";
import { RegistrationType } from "./registration-type";

/**
 * Internal reverse enum mapper since TS doesn't like using the string
 * value for lookups, so we abstract it away using reverse maps.
 */
export class EnumMapper {
    private reverseRegMap = new Map<string, RegistrationType>();
    private reverseGearMap = new Map<string, LandingGearType>();
    private reverseAirframeMap = new Map<string, AirframeType>();
    private reverseCategoryMap = new Map<string, CertificationCategoryType>();
    private reverseEngineMap = new Map<string, EngineType>();
    private reverseFuelMap = new Map<string, FuelType>();

    constructor() {
        Object.values(RegistrationType).forEach((type: RegistrationType) => {
            const reg_key: string = type.toString();
            this.reverseRegMap.set(reg_key, type);
        });

        Object.values(LandingGearType).forEach((type: LandingGearType) => {
            const reg_key: string = type.toString();
            this.reverseGearMap.set(reg_key, type);
        });

        Object.values(AirframeType).forEach((type: AirframeType) => {
            const reg_key: string = type.toString();
            this.reverseAirframeMap.set(reg_key, type);
        });

        Object.values(CertificationCategoryType).forEach((type: CertificationCategoryType) => {
            const reg_key: string = type.toString();
            this.reverseCategoryMap.set(reg_key, type);
        });

        Object.values(EngineType).forEach((type: EngineType) => {
            const reg_key: string = type.toString();
            this.reverseEngineMap.set(reg_key, type);
        });

        Object.values(FuelType).forEach((type: FuelType) => {
            const reg_key: string = type.toString();
            this.reverseFuelMap.set(reg_key, type);
        });
    }

    public lookupRegistration(raw: string): RegistrationType {
        let retval = this.reverseRegMap.get(raw ? raw.trim(): "");

        return retval ? retval : RegistrationType.UNKNOWN;
    }

    public lookupLandingGear(raw: string): LandingGearType {
        let retval = this.reverseGearMap.get(raw ? raw.trim(): "");

        return retval ? retval : LandingGearType.UNKNOWN;
    }

    public lookupAirframe(raw: string): AirframeType {
        let retval = this.reverseAirframeMap.get(raw ? raw.trim(): "");

        return retval ? retval : AirframeType.UNKNOWN;
    }

    public lookupCertificationCategory(raw: string): CertificationCategoryType {
        let retval = this.reverseCategoryMap.get(raw ? raw.trim(): "");

        return retval ? retval : CertificationCategoryType.UNKNOWN;
    }

    public lookupEngine(raw: string): EngineType {
        let retval = this.reverseEngineMap.get(raw ? raw.trim(): "");

        return retval ? retval : EngineType.UNKNOWN;
    }

    public lookupFuel(raw: string): FuelType {
        let retval = this.reverseFuelMap.get(raw ? raw.trim(): "");

        return retval ? retval : FuelType.UNKNOWN;
    }

}
