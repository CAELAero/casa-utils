/*
 * Copyright (c) 2020, Justin Couch
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { AirframeType } from "../../src/register/airframe-type";
import { CertificationCategoryType } from "../../src/register/certification-category-type";
import { EngineType } from '../../src/register/engine-type';
import { EnumMapper } from '../../src/register/enum-mapper';
import { FuelType } from '../../src/register/fuel-type';
import { RegistrationType } from '../../src/register/registration-type';
import { LandingGearType } from "../../src/register/landing-gear-type";

describe('Basic handling', () => {
    it('constructs a default class', () => {
        expect(new EnumMapper()).toBeTruthy();
    });
});

describe('RegistrationType handling', () => {
    it('Looks up the known types', () => {
        let mapper = new EnumMapper();

        Object.values(RegistrationType).forEach((type: RegistrationType) => {
            const test_key: string = type.toString();
            expect(mapper.lookupRegistration(test_key)).toBe(type);
        });
    });

    it("Maps unknown keys to UNKNOWN", () => {
        let mapper = new EnumMapper();

        expect(mapper.lookupRegistration("junk")).toBe(RegistrationType.UNKNOWN);
    });

    it("Maps null key to UNKNOWN", () => {
        let mapper = new EnumMapper();

        expect(mapper.lookupRegistration(null)).toBe(RegistrationType.UNKNOWN);
    });

    it("Maps undefined key to UNKNOWN", () => {
        let mapper = new EnumMapper();

        expect(mapper.lookupRegistration(undefined)).toBe(RegistrationType.UNKNOWN);
    });

    it("Maps key with leading space", () => {
        let mapper = new EnumMapper();

        expect(mapper.lookupRegistration(" Interim Registration")).toBe(RegistrationType.INTERIM);
    });

    it("Maps key with trailing space", () => {
        let mapper = new EnumMapper();

        expect(mapper.lookupRegistration("Interim Registration ")).toBe(RegistrationType.INTERIM);
    });
});

describe('AirframeType handling', () => {
    it('Looks up the known types', () => {
        let mapper = new EnumMapper();

        Object.values(AirframeType).forEach((type: AirframeType) => {
            const test_key: string = type.toString();
            expect(mapper.lookupAirframe(test_key)).toBe(type);
        });
    });

    it("Maps unknown keys to UNKNOWN", () => {
        let mapper = new EnumMapper();

        expect(mapper.lookupAirframe("junk")).toBe(AirframeType.UNKNOWN);
    });

    it("Maps null key to UNKNOWN", () => {
        let mapper = new EnumMapper();

        expect(mapper.lookupAirframe(null)).toBe(AirframeType.UNKNOWN);
    });

    it("Maps undefined key to UNKNOWN", () => {
        let mapper = new EnumMapper();

        expect(mapper.lookupAirframe(undefined)).toBe(AirframeType.UNKNOWN);
    });

    it("Maps key with leading space", () => {
        let mapper = new EnumMapper();

        expect(mapper.lookupAirframe(" Ornithopter")).toBe(AirframeType.ORNITHOPTER);
    });

    it("Maps key with trailing space", () => {
        let mapper = new EnumMapper();

        expect(mapper.lookupAirframe("Ornithopter ")).toBe(AirframeType.ORNITHOPTER);
    });
});

describe('LandingGearType handling', () => {
    it('Looks up the known types', () => {
        let mapper = new EnumMapper();

        Object.values(LandingGearType).forEach((type: LandingGearType) => {
            const test_key: string = type.toString();
            expect(mapper.lookupLandingGear(test_key)).toBe(type);
        });
    });

    it("Maps unknown keys to UNKNOWN", () => {
        let mapper = new EnumMapper();

        expect(mapper.lookupLandingGear("junk")).toBe(LandingGearType.UNKNOWN);
    });

    it("Maps null key to UNKNOWN", () => {
        let mapper = new EnumMapper();

        expect(mapper.lookupLandingGear(null)).toBe(LandingGearType.UNKNOWN);
    });

    it("Maps undefined key to UNKNOWN", () => {
        let mapper = new EnumMapper();

        expect(mapper.lookupLandingGear(undefined)).toBe(LandingGearType.UNKNOWN);
    });

    it("Maps key with leading space", () => {
        let mapper = new EnumMapper();

        expect(mapper.lookupLandingGear(" Skid")).toBe(LandingGearType.SKID);
    });

    it("Maps key with trailing space", () => {
        let mapper = new EnumMapper();

        expect(mapper.lookupLandingGear("Skid ")).toBe(LandingGearType.SKID);
    });
});

describe('CertificationCategoryType handling', () => {
    it('Looks up the known types', () => {
        let mapper = new EnumMapper();

        Object.values(CertificationCategoryType).forEach((type: CertificationCategoryType) => {
            const test_key: string = type.toString();
            expect(mapper.lookupCertificationCategory(test_key)).toBe(type);
        });
    });

    it("Maps unknown keys to UNKNOWN", () => {
        let mapper = new EnumMapper();

        expect(mapper.lookupCertificationCategory("junk")).toBe(CertificationCategoryType.UNKNOWN);
    });

    it("Maps null key to UNKNOWN", () => {
        let mapper = new EnumMapper();

        expect(mapper.lookupCertificationCategory(null)).toBe(CertificationCategoryType.UNKNOWN);
    });

    it("Maps undefined key to UNKNOWN", () => {
        let mapper = new EnumMapper();

        expect(mapper.lookupCertificationCategory(undefined)).toBe(CertificationCategoryType.UNKNOWN);
    });

    it("Maps key with leading space", () => {
        let mapper = new EnumMapper();

        expect(mapper.lookupCertificationCategory(" Acrobatic")).toBe(CertificationCategoryType.ACROBATIC);
    });

    it("Maps key with trailing space", () => {
        let mapper = new EnumMapper();

        expect(mapper.lookupCertificationCategory("Acrobatic ")).toBe(CertificationCategoryType.ACROBATIC);
    });
});

describe('FuelType handling', () => {
    it('Looks up the known types', () => {
        let mapper = new EnumMapper();

        Object.values(FuelType).forEach((type: FuelType) => {
            const test_key: string = type.toString();
            expect(mapper.lookupFuel(test_key)).toBe(type);
        });
    });

    it("Maps unknown keys to UNKNOWN", () => {
        let mapper = new EnumMapper();

        expect(mapper.lookupFuel("junk")).toBe(FuelType.UNKNOWN);
    });

    it("Maps null key to UNKNOWN", () => {
        let mapper = new EnumMapper();

        expect(mapper.lookupFuel(null)).toBe(FuelType.UNKNOWN);
    });

    it("Maps undefined key to UNKNOWN", () => {
        let mapper = new EnumMapper();

        expect(mapper.lookupFuel(undefined)).toBe(FuelType.UNKNOWN);
    });

    it("Maps key with leading space", () => {
        let mapper = new EnumMapper();

        expect(mapper.lookupFuel(" Gasoline")).toBe(FuelType.GASOLINE);
    });

    it("Maps key with trailing space", () => {
        let mapper = new EnumMapper();

        expect(mapper.lookupFuel("Gasoline ")).toBe(FuelType.GASOLINE);
    });
});

describe('EngineType handling', () => {
    it('Looks up the known types', () => {
        let mapper = new EnumMapper();

        Object.values(EngineType).forEach((type: EngineType) => {
            const test_key: string = type.toString();
            expect(mapper.lookupEngine(test_key)).toBe(type);
        });
    });

    it("Maps unknown keys to UNKNOWN", () => {
        let mapper = new EnumMapper();

        expect(mapper.lookupEngine("junk")).toBe(EngineType.UNKNOWN);
    });

    it("Maps null key to UNKNOWN", () => {
        let mapper = new EnumMapper();

        expect(mapper.lookupEngine(null)).toBe(EngineType.UNKNOWN);
    });

    it("Maps undefined key to UNKNOWN", () => {
        let mapper = new EnumMapper();

        expect(mapper.lookupEngine(undefined)).toBe(EngineType.UNKNOWN);
    });

    it("Maps key with leading space", () => {
        let mapper = new EnumMapper();

        expect(mapper.lookupEngine(" Piston")).toBe(EngineType.PISTON);
    });

    it("Maps key with trailing space", () => {
        let mapper = new EnumMapper();

        expect(mapper.lookupEngine("Piston ")).toBe(EngineType.PISTON);
    });
});

