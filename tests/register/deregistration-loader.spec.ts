/*
 * Copyright (c) 2020, Justin Couch
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CASADeregistrationLoader } from '../../src/register/deregistration-loader';
import { DeregistrationData } from '../../src/register/deregistration-data';
import { SimpleDate } from '../../src/register/simple-date';

describe('Erroneous input handling', () => {
    it('generates an error if no file given', () => {
        expect(() => { CASADeregistrationLoader.listAllDeregistrations(null); }).toThrow();
    });

    it('generates an error if file does not exist', () => {
        expect(() => { CASADeregistrationLoader.listAllDeregistrations("randompath.xls"); }).toThrowError();
    });
});

describe("Loads correct data", () => {
    it('Handles an empty file', () => {
        let result:DeregistrationData[] = CASADeregistrationLoader.listAllDeregistrations("tests/register/data/deregistration/empty_data.csv");

        expect(result).toBeTruthy();
        expect(result.length).toBe(0);
    });

    it("Handles a single row of correct data", () => {
        let result:DeregistrationData[] = CASADeregistrationLoader.listAllDeregistrations("tests/register/data/deregistration/single_row_basic_deregistration.csv");

        expect(result).toBeTruthy();
        expect(result.length).toBe(1);

        let entry = result[0];

        expect(entry.mark).toBe("VH-AAM");
        expect(entry.manufacturer).toBe("DE HAVILLAND CANADA");
        expect(entry.model).toBe("DHC-2");
        expect(entry.serialNumber).toBe("1492");
        expect(entry.effectiveDate).toEqual(new SimpleDate(3,1,2020));
        expect(entry.reason).toBe("11.130 - Cancelled - Registration Holder Request - Exported to Canada");

        expect(entry.registeredHolder).toBeDefined();
        expect(entry.registeredHolder.name).toBe("SEAPLANE ASSETS PTY LIMITED");
        expect(entry.registeredHolder.address).toBeDefined();
        expect(entry.registeredHolder.address.line1).toBe("PO Box 30");
        expect(entry.registeredHolder.address.line2).toBeFalsy();
        expect(entry.registeredHolder.address.suburb).toBe("ROSE BAY");
        expect(entry.registeredHolder.address.state).toBe("NSW");
        expect(entry.registeredHolder.address.postcode).toBe("2029");
        expect(entry.registeredHolder.address.country).toBe("Australia");
        expect(entry.registeredHolder.commencementDate).toBeFalsy();

        expect(entry.registeredOperator).toBeDefined();
        expect(entry.registeredOperator.name).toBe("SYDNEY SEAPLANES PTY LTD");
        expect(entry.registeredOperator.address).toBeDefined();
        expect(entry.registeredOperator.address.line1).toBe("PO Box 30");
        expect(entry.registeredOperator.address.line2).toBeFalsy();
        expect(entry.registeredOperator.address.suburb).toBe("ROSE BAY");
        expect(entry.registeredOperator.address.state).toBe("NSW");
        expect(entry.registeredOperator.address.postcode).toBe("2029");
        expect(entry.registeredOperator.address.country).toBe("Australia");
        expect(entry.registeredOperator.commencementDate).toBeFalsy();
    });

    it("Handles a multiple deregistrations of the same mark", () => {
        let result:DeregistrationData[] = CASADeregistrationLoader.listAllDeregistrations("tests/register/data/deregistration/multi_row_same_mark.csv");

        expect(result).toBeTruthy();
        expect(result.length).toBe(2);

        expect(result[0].mark).toBe("VH-HCL");
        expect(result[0].manufacturer).toBe("ROBINSON HELICOPTER CO");
        expect(result[0].model).toBe("R44 II");
        expect(result[0].serialNumber).toBe("13294");
        expect(result[0].effectiveDate).toEqual(new SimpleDate(13,8,2012));
        expect(result[0].reason).toBe("11.130 - Cancelled - Registration Holder Request");

        expect(result[1].mark).toBe("VH-HCL");
        expect(result[1].manufacturer).toBe("ROBINSON HELICOPTER CO");
        expect(result[1].model).toBe("R44 II");
        expect(result[1].serialNumber).toBe("13486");
        expect(result[1].effectiveDate).toEqual(new SimpleDate(18,6,2014));
        expect(result[1].reason).toBe("11.130 - Cancelled - Registration Holder Request");
    });
});

describe("Handles bad data", () => {
    it("No addresses provided error", () => {
        let result:DeregistrationData[] = CASADeregistrationLoader.listAllDeregistrations("tests/register/data/deregistration/single_row_no_addresses.csv");

        expect(result).toBeTruthy();
        expect(result.length).toBe(1);

        let entry = result[0];

        // Only bother to test the known error as we assume the rest passed in the other
        // happy path tests.
        expect(entry.registeredHolder).toBeDefined();
        expect(entry.registeredHolder.name).toBe("SAYERS PLANT HIRE (ACT) PTY LIMITED");
        expect(entry.registeredHolder.address).toBeDefined();
        expect(entry.registeredHolder.address.line1).toBeFalsy();
        expect(entry.registeredHolder.address.line2).toBeFalsy();
        expect(entry.registeredHolder.address.suburb).toBeFalsy();
        expect(entry.registeredHolder.address.state).toBeFalsy();
        expect(entry.registeredHolder.address.postcode).toBeFalsy();
        expect(entry.registeredHolder.address.country).toBeFalsy();

        expect(entry.registeredOperator).toBeDefined();
        expect(entry.registeredOperator.name).toBe("SAYERS PLANT HIRE (ACT) PTY LIMITED");
        expect(entry.registeredOperator.address).toBeDefined();
        expect(entry.registeredOperator.address.line1).toBeFalsy();
        expect(entry.registeredOperator.address.line2).toBeFalsy();
        expect(entry.registeredOperator.address.suburb).toBeFalsy();
        expect(entry.registeredOperator.address.state).toBeFalsy();
        expect(entry.registeredOperator.address.postcode).toBeFalsy();
        expect(entry.registeredOperator.address.country).toBeFalsy();
    });

    it("No state error", () => {
        let result:DeregistrationData[] = CASADeregistrationLoader.listAllDeregistrations("tests/register/data/deregistration/single_row_uk_address.csv");

        expect(result).toBeTruthy();
        expect(result.length).toBe(1);

        let entry = result[0];

        // Only bother to test the known error as we assume the rest passed in the other
        // happy path tests.
        expect(entry.registeredHolder).toBeDefined();
        expect(entry.registeredHolder.name).toBe("HORNBLOWER, Ross Michael");
        expect(entry.registeredHolder.address).toBeDefined();
        expect(entry.registeredHolder.address.line1).toBe("18 Dorney Reach Road");
        expect(entry.registeredHolder.address.line2).toBeFalsy();
        expect(entry.registeredHolder.address.suburb).toBe("MAIDENHEAD");
        expect(entry.registeredHolder.address.state).toBeFalsy();
        expect(entry.registeredHolder.address.postcode).toBe("SL6 0DX");
        expect(entry.registeredHolder.address.country).toBe("United Kingdom");
    });

    it("Missing serial number", () => {
        let result:DeregistrationData[] = CASADeregistrationLoader.listAllDeregistrations("tests/register/data/deregistration/single_row_error.csv");

        expect(result).toBeTruthy();
        expect(result.length).toBe(1);

        let entry = result[0];

        // Only bother to test the known error as we assume the rest passed in the other
        // happy path tests.
        expect(entry.mark).toBe("VH-HEO");
        expect(entry.manufacturer).toBe("BELL HELICOPTER CO");
        expect(entry.model).toBe("206B (II)");
        expect(entry.serialNumber).toBeFalsy();
    });
});

/** Normally skipped so that we don't take forever on the tests and this doesn't add any value */
describe.skip("Load full file", () => {
    it("Can load the whole dataset ", () => {
        let result:DeregistrationData[] = CASADeregistrationLoader.listAllDeregistrations("tests/register/data/deregistration/casa_deregistrations_since_2000.csv");

        expect(result).toBeTruthy();
        expect(result.length).toBe(3502);
    });
});
