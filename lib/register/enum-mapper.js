/*
 * Copyright (c) 2020, Justin Couch
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
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
export class EnumMapper {
    constructor() {
        this.reverseRegMap = new Map();
        this.reverseGearMap = new Map();
        this.reverseAirframeMap = new Map();
        this.reverseCategoryMap = new Map();
        this.reverseEngineMap = new Map();
        this.reverseFuelMap = new Map();
        Object.values(RegistrationType).forEach((type) => {
            const reg_key = type.toString();
            this.reverseRegMap.set(reg_key, type);
        });
        Object.values(LandingGearType).forEach((type) => {
            const reg_key = type.toString();
            this.reverseGearMap.set(reg_key, type);
        });
        Object.values(AirframeType).forEach((type) => {
            const reg_key = type.toString();
            this.reverseAirframeMap.set(reg_key, type);
        });
        Object.values(CertificationCategoryType).forEach((type) => {
            const reg_key = type.toString();
            this.reverseCategoryMap.set(reg_key, type);
        });
        Object.values(EngineType).forEach((type) => {
            const reg_key = type.toString();
            this.reverseEngineMap.set(reg_key, type);
        });
        Object.values(FuelType).forEach((type) => {
            const reg_key = type.toString();
            this.reverseFuelMap.set(reg_key, type);
        });
    }
    lookupRegistration(raw) {
        const retval = this.reverseRegMap.get(raw ? raw.trim() : '');
        return retval ? retval : RegistrationType.UNKNOWN;
    }
    lookupLandingGear(raw) {
        const retval = this.reverseGearMap.get(raw ? raw.trim() : '');
        return retval ? retval : LandingGearType.UNKNOWN;
    }
    lookupAirframe(raw) {
        const retval = this.reverseAirframeMap.get(raw ? raw.trim() : '');
        return retval ? retval : AirframeType.UNKNOWN;
    }
    lookupCertificationCategory(raw) {
        const retval = this.reverseCategoryMap.get(raw ? raw.trim() : '');
        return retval ? retval : CertificationCategoryType.UNKNOWN;
    }
    lookupEngine(raw) {
        const retval = this.reverseEngineMap.get(raw ? raw.trim() : '');
        return retval ? retval : EngineType.UNKNOWN;
    }
    lookupFuel(raw) {
        const retval = this.reverseFuelMap.get(raw ? raw.trim() : '');
        return retval ? retval : FuelType.UNKNOWN;
    }
}
//# sourceMappingURL=enum-mapper.js.map