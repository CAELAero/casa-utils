/*
 * Copyright (c) 2020, Justin Couch
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CASARegisterLoader } from '../../src/register/register-loader';
import { RegistrationData } from '../../src/register/registration-data';
import { EngineType } from '../../src/register/engine-type';
import { FuelType } from '../../src/register/fuel-type';
import { LandingGearType } from '../../src/register/landing-gear-type';
import { AirframeType } from '../../src/register/airframe-type';
import { RegistrationType } from '../../src/register/registration-type';
import { SimpleDate } from '../../src/register/simple-date';

describe('Erroneous input handling', () => {
    it('generates an error if no file given', () => {
        expect(() => { CASARegisterLoader.listAllRegistrations(null); }).toThrow();
    });

    it('generates an error if file does not exist', () => {
        expect(() => { CASARegisterLoader.listAllRegistrations("randompath.xls"); }).toThrowError();
    });
});

describe("Loads correct data", () => {
    it('Handles an empty file', () => {
        let result:RegistrationData[] = CASARegisterLoader.listAllRegistrations("tests/register/data/empty_data.csv");

        expect(result).toBeTruthy();
        expect(result.length).toBe(0);
    });

    it("Handles a single row of correct data", () => {
        let result:RegistrationData[] = CASARegisterLoader.listAllRegistrations("tests/register/data/single_row_current_registration.csv");

        expect(result).toBeTruthy();
        expect(result.length).toBe(1);

        let entry = result[0];

        expect(entry.mark).toBe("VH-ZZZ");
        expect(entry.manufacturer).toBe("PITTS AVIATION ENTERPRISES");
        expect(entry.manufacturerCountry).toBe("United States of America");
        expect(entry.manufactureYear).toBe(1983);
        expect(entry.type).toBeFalsy();
        expect(entry.model).toBe("S-2B");
        expect(entry.serialNumber).toBe("5005");
        expect(entry.mtow).toBe(771);

        expect(entry.engineCount).toBe(1);
        expect(entry.engine).toBeTruthy();
        expect(entry.engine.manufacturer).toBe("TEXTRON LYCOMING");
        expect(entry.engine.engineType).toBe(EngineType.PISTON);
        expect(entry.engine.model).toBe("AEIO-540");
        expect(entry.engine.fuelType).toBe(FuelType.GASOLINE);

        expect(entry.registrationType).toBe(RegistrationType.FULL);
        expect(entry.registrationSuspended).toBeFalsy();
        expect(entry.registrationExpiryDate).toBeFalsy();
        expect(entry.firstRegisteredDate).toEqual(new SimpleDate(4, 12, 1990));

        expect(entry.landingGear).toBe(LandingGearType.UNKNOWN);
        expect(entry.airframeType).toBe(AirframeType.POWER_AIRCRAFT);

        expect(entry.propellerManufacturer).toBe("HARTZELL PROPELLERS");
        expect(entry.propellerModel).toBe("HC-C2YR-4CF/FC8477A-4");
        expect(entry.typeCertificateNumber).toBeFalsy();

        expect(entry.registeredHolder).toBeDefined();
        expect(entry.registeredHolder.name).toBe("GOTTS, Caleb Norton");
        expect(entry.registeredHolder.address).toBeDefined();
        expect(entry.registeredHolder.address.line1).toBe("PO Box 855");
        expect(entry.registeredHolder.address.line2).toBeFalsy();
        expect(entry.registeredHolder.address.suburb).toBe("KARAMA");
        expect(entry.registeredHolder.address.state).toBe("NT");
        expect(entry.registeredHolder.address.postcode).toBe("0813");
        expect(entry.registeredHolder.address.country).toBe("Australia");
        expect(entry.registeredHolder.commencementDate).toEqual(new SimpleDate(15, 6, 2012));

        expect(entry.registeredOperator).toBeDefined();
        expect(entry.registeredOperator.name).toBe("GOTTS, Caleb Norton");
        expect(entry.registeredOperator.address).toBeDefined();
        expect(entry.registeredOperator.address.line1).toBe("PO Box 855");
        expect(entry.registeredOperator.address.line2).toBeFalsy();
        expect(entry.registeredOperator.address.suburb).toBe("KARAMA");
        expect(entry.registeredOperator.address.state).toBe("NT");
        expect(entry.registeredOperator.address.postcode).toBe("0813");
        expect(entry.registeredOperator.address.country).toBe("Australia");
        expect(entry.registeredOperator.commencementDate).toEqual(new SimpleDate(15, 6, 2012));
    });
});
