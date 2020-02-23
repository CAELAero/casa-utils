/*
 * Copyright (c) 2020, Justin Couch
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CASAMarkChangeLoader } from '../../src/register/mark-change-loader';
import { MarkChangeData } from '../../src/register/mark-change-data';
import { SimpleDate } from '../../src/register/simple-date';

describe('Erroneous input handling', () => {
    it('generates an error if no file given', () => {
        expect(() => { CASAMarkChangeLoader.listAllMarkChanges(null); }).toThrow();
    });

    it('generates an error if file does not exist', () => {
        expect(() => { CASAMarkChangeLoader.listAllMarkChanges("randompath.xls"); }).toThrowError();
    });
});

describe("Loads correct data", () => {
    it('Handles an empty file', () => {
        let result:MarkChangeData[] = CASAMarkChangeLoader.listAllMarkChanges("tests/register/data/mark_change/empty_data.csv");

        expect(result).toBeTruthy();
        expect(result.length).toBe(0);
    });

    it("Handles a single row of correct data", () => {
        let result:MarkChangeData[] = CASAMarkChangeLoader.listAllMarkChanges("tests/register/data/mark_change/single_row_basic.csv");

        expect(result).toBeTruthy();
        expect(result.length).toBe(1);

        let entry = result[0];

        expect(entry.mark).toBe("VH-AKH");
        expect(entry.oldMark).toBe("VH-DTU");
        expect(entry.manufacturer).toBe("BEECH AIRCRAFT CORP");
        expect(entry.model).toBe("58");
        expect(entry.serialNumber).toBe("TH-972");
        expect(entry.effectiveDate).toEqual(new SimpleDate(15,9,2015));

        expect(entry.registeredHolder).toBeDefined();
        expect(entry.registeredHolder.name).toBe("HUNT AEROSPACE PTY LTD");
        expect(entry.registeredHolder.address).toBeDefined();
        expect(entry.registeredHolder.address.line1).toBe("PO Box 1960");
        expect(entry.registeredHolder.address.line2).toBeFalsy();
        expect(entry.registeredHolder.address.suburb).toBe("COOLALINGA");
        expect(entry.registeredHolder.address.state).toBe("NT");
        expect(entry.registeredHolder.address.postcode).toBe("0839");
        expect(entry.registeredHolder.address.country).toBe("Australia");
        expect(entry.registeredHolder.commencementDate).toBeFalsy();

        expect(entry.registeredOperator).toBeDefined();
        expect(entry.registeredOperator.name).toBe("AIR FRONTIER PTY LTD");
        expect(entry.registeredOperator.address).toBeDefined();
        expect(entry.registeredOperator.address.line1).toBe("PO Box 1777");
        expect(entry.registeredOperator.address.line2).toBeFalsy();
        expect(entry.registeredOperator.address.suburb).toBe("COOLALINGA");
        expect(entry.registeredOperator.address.state).toBe("NT");
        expect(entry.registeredOperator.address.postcode).toBe("0839");
        expect(entry.registeredOperator.address.country).toBe("Australia");
        expect(entry.registeredOperator.commencementDate).toBeFalsy();
    });

    it("Handles a multiple mark_change of the same mark", () => {
        let result:MarkChangeData[] = CASAMarkChangeLoader.listAllMarkChanges("tests/register/data/mark_change/multi_row_same_mark.csv");

        expect(result).toBeTruthy();
        expect(result.length).toBe(2);

        expect(result[0].mark).toBe("VH-BAA");
        expect(result[0].manufacturer).toBe("ROBINSON");
        expect(result[0].model).toBe("R22 BETA");
        expect(result[0].serialNumber).toBe("2989");
        expect(result[0].effectiveDate).toEqual(new SimpleDate(27,4,2000));
        expect(result[0].oldMark).toBe("VH-HHL");

        expect(result[1].mark).toBe("VH-BAA");
        expect(result[1].manufacturer).toBe("EUROCOPTER FRANCE");
        expect(result[1].model).toBe("AS.350BA");
        expect(result[1].serialNumber).toBe("2015");
        expect(result[1].effectiveDate).toEqual(new SimpleDate(26,10,2006));
        expect(result[1].oldMark).toBe("VH-RLU");
    });
});

describe("Handles bad data", () => {
    it("Foreign addresses miss data", () => {
        let result:MarkChangeData[] = CASAMarkChangeLoader.listAllMarkChanges("tests/register/data/mark_change/single_row_foreign_address.csv");

        expect(result).toBeTruthy();
        expect(result.length).toBe(1);

        let entry = result[0];

        expect(entry.mark).toBe("VH-FSE");
        expect(entry.oldMark).toBe("VH-LQF");
        expect(entry.manufacturer).toBe("SOCATA");
        expect(entry.model).toBe("TB-20");
        expect(entry.serialNumber).toBe("1047");
        expect(entry.effectiveDate).toEqual(new SimpleDate(1,5,2001));

        expect(entry.registeredHolder).toBeDefined();
        expect(entry.registeredHolder.name).toBe("MR FANTON WING CHEUNG CHUCK");
        expect(entry.registeredHolder.address).toBeDefined();
        expect(entry.registeredHolder.address.line1).toBe("1 HOLT ROAD,");
        expect(entry.registeredHolder.address.line2).toBeFalsy();
        expect(entry.registeredHolder.address.suburb).toBe("#11-07");
        expect(entry.registeredHolder.address.state).toBe("SINGAPORE");
        expect(entry.registeredHolder.address.postcode).toBe("249441");
        expect(entry.registeredHolder.address.country).toBeFalsy();
        expect(entry.registeredHolder.commencementDate).toBeFalsy();

        expect(entry.registeredOperator).toBeDefined();
        expect(entry.registeredOperator.name).toBeFalsy();
        expect(entry.registeredOperator.address).toBeDefined();
        expect(entry.registeredOperator.address.line1).toBeFalsy();
        expect(entry.registeredOperator.address.line2).toBeFalsy();
        expect(entry.registeredOperator.address.suburb).toBeFalsy();
        expect(entry.registeredOperator.address.state).toBeFalsy();
        expect(entry.registeredOperator.address.postcode).toBeFalsy();
        expect(entry.registeredOperator.address.country).toBeFalsy();
    });

    it("No addresses provided error", () => {
        let result:MarkChangeData[] = CASAMarkChangeLoader.listAllMarkChanges("tests/register/data/mark_change/single_row_missing_address.csv");

        expect(result).toBeTruthy();
        expect(result.length).toBe(1);

        let entry = result[0];

        // Only bother to test the known error as we assume the rest passed in the other
        // happy path tests.
        expect(entry.registeredHolder).toBeDefined();
        expect(entry.registeredHolder.name).toBe("CAPITEQ LIMITED T/A AIRNORTH REGIONAL");
        expect(entry.registeredHolder.address).toBeDefined();
        expect(entry.registeredHolder.address.line1).toBe("PO BOX 39548");
        expect(entry.registeredHolder.address.line2).toBeFalsy();
        expect(entry.registeredHolder.address.suburb).toBe("WINNELLIE");
        expect(entry.registeredHolder.address.state).toBe("NT");
        expect(entry.registeredHolder.address.postcode).toBe("0821");
        expect(entry.registeredHolder.address.country).toBeFalsy();
        expect(entry.registeredHolder.commencementDate).toBeFalsy();

        expect(entry.registeredOperator).toBeDefined();
        expect(entry.registeredOperator.name).toBeFalsy();
        expect(entry.registeredOperator.address).toBeDefined();
        expect(entry.registeredOperator.address.line1).toBeFalsy();
        expect(entry.registeredOperator.address.line2).toBeFalsy();
        expect(entry.registeredOperator.address.suburb).toBeFalsy();
        expect(entry.registeredOperator.address.state).toBeFalsy();
        expect(entry.registeredOperator.address.postcode).toBeFalsy();
        expect(entry.registeredOperator.address.country).toBeFalsy();
    });
});

/** Normally skipped so that we don't take forever on the tests and this doesn't add any value */
describe.skip("Load full file", () => {
    it("Can load the whole dataset ", () => {
        let result:MarkChangeData[] = CASAMarkChangeLoader.listAllMarkChanges("tests/register/data/mark_change/change_of_marks_since_2000.csv");

        expect(result).toBeTruthy();
        expect(result.length).toBe(1444);
    });
});
