/*
 * Copyright (c) 2020, Justin Couch
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CASARegisterLoader } from '../../src/register/register-loader';
import { RegistrationData } from '../../src/register/registration-data';
import { CertificationCategoryType } from "../../src/register/certification-category-type";
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

        expect(entry.standardCoA).toBeDefined();
        expect(entry.standardCoA.length).toBe(2);
        expect(entry.standardCoA).toEqual(expect.arrayContaining([CertificationCategoryType.ACROBATIC, CertificationCategoryType.NORMAL]));

        expect(entry.specialCoA).toBeFalsy();
    });

    it("Handles a single non-powered glider", () => {
        let result:RegistrationData[] = CASARegisterLoader.listAllRegistrations("tests/register/data/single_row_glider_registration.csv");

        expect(result).toBeTruthy();
        expect(result.length).toBe(1);

        let entry = result[0];

        expect(entry.mark).toBe("VH-GLP");
        expect(entry.manufacturer).toBe("ROLLADEN-SCHNEIDER FLUGZEUGBAU GMBH");
        expect(entry.manufacturerCountry).toBe("Germany");
        expect(entry.manufactureYear).toBe(1997);
        expect(entry.type).toBeFalsy();
        expect(entry.model).toBe("LS6-C");
        expect(entry.serialNumber).toBe("6246");
        expect(entry.mtow).toBe(525);

        expect(entry.engineCount).toBe(0);
        expect(entry.engine).toBeFalsy();

        expect(entry.registrationType).toBe(RegistrationType.FULL);
        expect(entry.registrationSuspended).toBeFalsy();
        expect(entry.registrationExpiryDate).toBeFalsy();
        expect(entry.firstRegisteredDate).toEqual(new SimpleDate(18, 12, 1997));

        expect(entry.landingGear).toBe(LandingGearType.UNKNOWN);
        expect(entry.airframeType).toBe(AirframeType.GLIDER);

        expect(entry.propellerManufacturer).toBeFalsy();
        expect(entry.propellerModel).toBeFalsy();
        expect(entry.typeCertificateNumber).toBeFalsy();

        expect(entry.registeredHolder).toBeDefined();
        expect(entry.registeredHolder.name).toBe("COUCH, Justin Todd");
        expect(entry.registeredHolder.address).toBeDefined();
        expect(entry.registeredHolder.address.line1).toBe("14 Baldwin Way");
        expect(entry.registeredHolder.address.line2).toBeFalsy();
        expect(entry.registeredHolder.address.suburb).toBe("CURRANS HILL");
        expect(entry.registeredHolder.address.state).toBe("NSW");
        expect(entry.registeredHolder.address.postcode).toBe("2567");
        expect(entry.registeredHolder.address.country).toBe("Australia");
        expect(entry.registeredHolder.commencementDate).toEqual(new SimpleDate(20, 6, 2016));

        expect(entry.registeredOperator).toBeDefined();
        expect(entry.registeredOperator.name).toBe("COUCH, Justin Todd");
        expect(entry.registeredOperator.address).toBeDefined();
        expect(entry.registeredOperator.address.line1).toBe("14 Baldwin Way");
        expect(entry.registeredOperator.address.line2).toBeFalsy();
        expect(entry.registeredOperator.address.suburb).toBe("CURRANS HILL");
        expect(entry.registeredOperator.address.state).toBe("NSW");
        expect(entry.registeredOperator.address.postcode).toBe("2567");
        expect(entry.registeredOperator.address.country).toBe("Australia");
        expect(entry.registeredOperator.commencementDate).toEqual(new SimpleDate(20, 6, 2016));

        expect(entry.standardCoA).toBeFalsy();
        expect(entry.specialCoA).toBeFalsy();
    });

    it("Handles a single sustainer glider", () => {
        let result:RegistrationData[] = CASARegisterLoader.listAllRegistrations("tests/register/data/single_row_sustainer_glider.csv");

        expect(result).toBeTruthy();
        expect(result.length).toBe(1);

        let entry = result[0];

        expect(entry.mark).toBe("VH-GLQ");
        expect(entry.manufacturer).toBe("DG FLUGZEUGBAU GMBH");
        expect(entry.manufacturerCountry).toBe("Germany");
        expect(entry.manufactureYear).toBe(2009);
        expect(entry.type).toBeFalsy();
        expect(entry.model).toBe("LS 10");
        expect(entry.serialNumber).toBe("L10-019");
        expect(entry.mtow).toBe(540);

        expect(entry.engineCount).toBe(1);
        expect(entry.engine).toBeDefined();
        expect(entry.engine.manufacturer).toBe("SOLO KLEINMOTOREN GMBH");
        expect(entry.engine.engineType).toBe(EngineType.PISTON);
        expect(entry.engine.model).toBe("2350");
        expect(entry.engine.fuelType).toBe(FuelType.GASOLINE);

        expect(entry.registrationType).toBe(RegistrationType.FULL);
        expect(entry.registrationSuspended).toBeFalsy();
        expect(entry.registrationExpiryDate).toBeFalsy();
        expect(entry.firstRegisteredDate).toEqual(new SimpleDate(18, 11, 2009));

        expect(entry.landingGear).toBe(LandingGearType.UNKNOWN);
        expect(entry.airframeType).toBe(AirframeType.GLIDER_MOTOR);

        expect(entry.propellerManufacturer).toBe("METALIC VARIABLE PITCH PROPELLER - MANUFACT. & MODEL NOT IDENTIFIED");
        expect(entry.propellerModel).toBe("MOTOR GLIDER");
        expect(entry.typeCertificateNumber).toBeFalsy();


        expect(entry.registeredHolder).toBeDefined();
        expect(entry.registeredHolder.name).toBe("DURIEU, Brian Philip");
        expect(entry.registeredHolder.address).toBeDefined();
        expect(entry.registeredHolder.address.line1).toBe("316 Moore Park Road");
        expect(entry.registeredHolder.address.line2).toBeFalsy();
        expect(entry.registeredHolder.address.suburb).toBe("PADDINGTON");
        expect(entry.registeredHolder.address.state).toBe("NSW");
        expect(entry.registeredHolder.address.postcode).toBe("2021");
        expect(entry.registeredHolder.address.country).toBe("Australia");
        expect(entry.registeredHolder.commencementDate).toEqual(new SimpleDate(18, 11, 2009));

        expect(entry.registeredOperator).toBeDefined();
        expect(entry.registeredOperator.name).toBe("DURIEU, Brian Philip");
        expect(entry.registeredOperator.address).toBeDefined();
        expect(entry.registeredOperator.address.line1).toBe("316 Moore Park Road");
        expect(entry.registeredOperator.address.line2).toBeFalsy();
        expect(entry.registeredOperator.address.suburb).toBe("PADDINGTON");
        expect(entry.registeredOperator.address.state).toBe("NSW");
        expect(entry.registeredOperator.address.postcode).toBe("2021");
        expect(entry.registeredOperator.address.country).toBe("Australia");
        expect(entry.registeredOperator.commencementDate).toEqual(new SimpleDate(18, 11, 2009));

        expect(entry.standardCoA).toBeFalsy();
        expect(entry.specialCoA).toBeFalsy();
    });

    it("Handles a single helicopter", () => {
        let result:RegistrationData[] = CASARegisterLoader.listAllRegistrations("tests/register/data/single_row_helicopter.csv");

        expect(result).toBeTruthy();
        expect(result.length).toBe(1);

        let entry = result[0];

        expect(entry.mark).toBe("VH-ZZY");
        expect(entry.manufacturer).toBe("BELL HELICOPTER CO");
        expect(entry.manufacturerCountry).toBe("United States of America");
        expect(entry.manufactureYear).toBe(1972);
        expect(entry.type).toBeFalsy();
        expect(entry.model).toBe("206B (II)");
        expect(entry.serialNumber).toBe("761");
        expect(entry.mtow).toBe(1452);

        expect(entry.engineCount).toBe(1);
        expect(entry.engine).toBeDefined();
        expect(entry.engine.manufacturer).toBeFalsy();
        expect(entry.engine.engineType).toBe(EngineType.TURBOSHAFT);
        expect(entry.engine.model).toBe("250-C20B");
        expect(entry.engine.fuelType).toBe(FuelType.KEROSENE);

        expect(entry.registrationType).toBe(RegistrationType.FULL);
        expect(entry.registrationSuspended).toBeFalsy();
        expect(entry.registrationExpiryDate).toBeFalsy();
        expect(entry.firstRegisteredDate).toEqual(new SimpleDate(16, 3, 1989));

        expect(entry.landingGear).toBe(LandingGearType.UNKNOWN);
        expect(entry.airframeType).toBe(AirframeType.HELICOPTER);

        expect(entry.propellerManufacturer).toBeFalsy();
        expect(entry.propellerModel).toBeFalsy();
        expect(entry.typeCertificateNumber).toBe("H2SW");

        expect(entry.registeredHolder).toBeDefined();
        expect(entry.registeredHolder.name).toBe("HELICOPTER TRANSPORT & TRAINING PTY LIMITED");
        expect(entry.registeredHolder.address).toBeDefined();
        expect(entry.registeredHolder.address.line1).toBe("PO Box 227");
        expect(entry.registeredHolder.address.line2).toBeFalsy();
        expect(entry.registeredHolder.address.suburb).toBe("GEORGES HALL");
        expect(entry.registeredHolder.address.state).toBe("NSW");
        expect(entry.registeredHolder.address.postcode).toBe("2198");
        expect(entry.registeredHolder.address.country).toBe("Australia");
        expect(entry.registeredHolder.commencementDate).toEqual(new SimpleDate(21, 12, 2017));

        expect(entry.registeredOperator).toBeDefined();
        expect(entry.registeredOperator.name).toBe("HELICOPTER TRANSPORT & TRAINING PTY LIMITED");
        expect(entry.registeredOperator.address).toBeDefined();
        expect(entry.registeredOperator.address.line1).toBe("PO Box 227");
        expect(entry.registeredOperator.address.line2).toBeFalsy();
        expect(entry.registeredOperator.address.suburb).toBe("GEORGES HALL");
        expect(entry.registeredOperator.address.state).toBe("NSW");
        expect(entry.registeredOperator.address.postcode).toBe("2198");
        expect(entry.registeredOperator.address.country).toBe("Australia");
        expect(entry.registeredOperator.commencementDate).toEqual(new SimpleDate(21, 12, 2017));

        expect(entry.standardCoA).toBeDefined();
        expect(entry.standardCoA.length).toBe(1);
        expect(entry.standardCoA).toEqual(expect.arrayContaining([CertificationCategoryType.NORMAL]));
        expect(entry.specialCoA).toBeFalsy();
    });

    it("Handles a single balloon", () => {
        let result:RegistrationData[] = CASARegisterLoader.listAllRegistrations("tests/register/data/single_row_balloon.csv");

        expect(result).toBeTruthy();
        expect(result.length).toBe(1);

        let entry = result[0];

        expect(entry.mark).toBe("VH-DHE");
        expect(entry.manufacturer).toBe("KAVANAGH BALLOONS");
        expect(entry.manufacturerCountry).toBe("Australia");
        expect(entry.manufactureYear).toBe(2009);
        expect(entry.type).toBeFalsy();
        expect(entry.model).toBe("E-240");
        expect(entry.serialNumber).toBe("E240-398");
        expect(entry.mtow).toBe(1700);

        expect(entry.engineCount).toBe(0);
        expect(entry.engine).toBeFalsy();

        expect(entry.registrationType).toBe(RegistrationType.FULL);
        expect(entry.registrationSuspended).toBeFalsy();
        expect(entry.registrationExpiryDate).toBeFalsy();
        expect(entry.firstRegisteredDate).toEqual(new SimpleDate(5, 5, 2011));

        expect(entry.landingGear).toBe(LandingGearType.UNKNOWN);
        expect(entry.airframeType).toBe(AirframeType.BALLOON_MANNED);

        expect(entry.propellerManufacturer).toBeFalsy();
        expect(entry.propellerModel).toBeFalsy();
        expect(entry.typeCertificateNumber).toBe("VL504");

        expect(entry.registeredHolder).toBeDefined();
        expect(entry.registeredHolder.name).toBe("AIR VISTAS PTY LIMITED");
        expect(entry.registeredHolder.address).toBeDefined();
        expect(entry.registeredHolder.address.line1).toBe("PO Box 5361");
        expect(entry.registeredHolder.address.line2).toBeFalsy();
        expect(entry.registeredHolder.address.suburb).toBe("WOLLONGONG");
        expect(entry.registeredHolder.address.state).toBe("NSW");
        expect(entry.registeredHolder.address.postcode).toBe("2500");
        expect(entry.registeredHolder.address.country).toBe("Australia");
        expect(entry.registeredHolder.commencementDate).toEqual(new SimpleDate(25, 2, 2013));

        expect(entry.registeredOperator).toBeDefined();
        expect(entry.registeredOperator.name).toBe("AIR VISTAS PTY LIMITED");
        expect(entry.registeredOperator.address).toBeDefined();
        expect(entry.registeredOperator.address.line1).toBe("PO Box 5361");
        expect(entry.registeredOperator.address.line2).toBeFalsy();
        expect(entry.registeredOperator.address.suburb).toBe("WOLLONGONG");
        expect(entry.registeredOperator.address.state).toBe("NSW");
        expect(entry.registeredOperator.address.postcode).toBe("2500");
        expect(entry.registeredOperator.address.country).toBe("Australia");
        expect(entry.registeredOperator.commencementDate).toEqual(new SimpleDate(25, 2, 2013));

        expect(entry.standardCoA).toBeDefined();
        expect(entry.standardCoA.length).toBe(1);
        expect(entry.standardCoA).toEqual(expect.arrayContaining([CertificationCategoryType.BALLOON]));
        expect(entry.specialCoA).toBeFalsy();
    });
});

describe("Handles bad data", () => {
    it("No postcode in foreign countries", () => {
        let result:RegistrationData[] = CASARegisterLoader.listAllRegistrations("tests/register/data/single_row_foreign_address_no_postcode.csv");

        expect(result).toBeTruthy();
        expect(result.length).toBe(1);

        let entry = result[0];

        expect(entry.mark).toBe("VH-ZXD");
        expect(entry.manufacturer).toBe("LEONARDO S.P.A. HELICOPTERS");
        expect(entry.manufacturerCountry).toBe("Italy");
        expect(entry.manufactureYear).toBe(2016);
        expect(entry.type).toBeFalsy();
        expect(entry.model).toBe("AW139");
        expect(entry.serialNumber).toBe("31738");
        expect(entry.mtow).toBe(7000);

        expect(entry.engineCount).toBe(2);
        expect(entry.engine).toBeDefined();
        expect(entry.engine.manufacturer).toBe("PRATT & WHITNEY CANADA INC");
        expect(entry.engine.engineType).toBe(EngineType.TURBOSHAFT);
        expect(entry.engine.model).toBe("PT6C-67C");
        expect(entry.engine.fuelType).toBe(FuelType.KEROSENE);

        expect(entry.registrationType).toBe(RegistrationType.FULL);
        expect(entry.registrationSuspended).toBeFalsy();
        expect(entry.registrationExpiryDate).toBeFalsy();
        expect(entry.firstRegisteredDate).toEqual(new SimpleDate(13, 10, 2016));

        expect(entry.landingGear).toBe(LandingGearType.UNKNOWN);
        expect(entry.airframeType).toBe(AirframeType.HELICOPTER);

        expect(entry.propellerManufacturer).toBeFalsy();
        expect(entry.propellerModel).toBeFalsy();
        expect(entry.typeCertificateNumber).toBe("EASA.R.006");

        expect(entry.registeredHolder).toBeDefined();
        expect(entry.registeredHolder.name).toBe("LCIH AUSTRALIA TWO LIMITED");
        expect(entry.registeredHolder.address).toBeDefined();
        expect(entry.registeredHolder.address.line1).toBe("C/o Lease Corporation International Limited");
        expect(entry.registeredHolder.address.line2).toBe("IFSC 6 George's Dock");
        expect(entry.registeredHolder.address.suburb).toBe("DUBLIN");
        expect(entry.registeredHolder.address.state).toBe("Dublin 1");
        expect(entry.registeredHolder.address.postcode).toBeFalsy();
        expect(entry.registeredHolder.address.country).toBe("Ireland");
        expect(entry.registeredHolder.commencementDate).toEqual(new SimpleDate(13, 10, 2016));

        expect(entry.registeredOperator).toBeDefined();
        expect(entry.registeredOperator.name).toBe("NORTHERN NSW HELICOPTER RESCUE SERVICE LIMITED");
        expect(entry.registeredOperator.address).toBeDefined();
        expect(entry.registeredOperator.address.line1).toBe("PO Box 230");
        expect(entry.registeredOperator.address.line2).toBeFalsy();
        expect(entry.registeredOperator.address.suburb).toBe("NEW LAMBTON");
        expect(entry.registeredOperator.address.state).toBe("NSW");
        expect(entry.registeredOperator.address.postcode).toBe("2305");
        expect(entry.registeredOperator.address.country).toBe("Australia");
        expect(entry.registeredOperator.commencementDate).toEqual(new SimpleDate(13, 10, 2016));

        expect(entry.standardCoA).toBeDefined();
        expect(entry.standardCoA.length).toBe(1);
        expect(entry.standardCoA).toEqual(expect.arrayContaining([CertificationCategoryType.TRANSPORT]));
        expect(entry.specialCoA).toBeFalsy();
    });

    it("Skips errors as the default behaviour", () => {
        let result:RegistrationData[] = CASARegisterLoader.listAllRegistrations("tests/register/data/multi_row_with_error.csv");

        expect(result).toBeTruthy();
        expect(result.length).toBe(2);

        // Only bother to test the known error as we assume the rest passed in the other
        // happy path tests.
        expect(result[0].mtow).toBe(0);
        expect(result[0].mark).toBe("VH-DGI");
    });
});

/** Normally skipped so that we don't take forever on the tests. */
describe.skip("Load full file", () => {
    it("Can load the whole 2019 dataset ", () => {
        let result:RegistrationData[] = CASARegisterLoader.listAllRegistrations("tests/register/data/acrftreg_2019.csv");

        expect(result).toBeTruthy();
        expect(result.length).toBe(15685);
    });
});
