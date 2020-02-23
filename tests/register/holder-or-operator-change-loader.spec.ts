/*
 * Copyright (c) 2020, Justin Couch
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CASAHolderOrOperatorChangeLoader } from '../../src/register/holder-or-operator-change-loader';
import { HolderOrOperatorChangeData } from '../../src/register/holder-or-operator-change-data';
import { SimpleDate } from '../../src/register/simple-date';

describe('Erroneous input handling', () => {
    it('generates an error if no file given', () => {
        expect(() => { CASAHolderOrOperatorChangeLoader.listAllChanges(null); }).toThrow();
    });

    it('generates an error if file does not exist', () => {
        expect(() => { CASAHolderOrOperatorChangeLoader.listAllChanges("randompath.xls"); }).toThrowError();
    });
});

describe("Loads correct data", () => {
    it('Handles an empty file', () => {
        let result:HolderOrOperatorChangeData[] = CASAHolderOrOperatorChangeLoader.listAllChanges("tests/register/data/holder_or_operator_change/empty_data.csv");

        expect(result).toBeTruthy();
        expect(result.length).toBe(0);
    });

    it("Handles a single row of correct data", () => {
        let result:HolderOrOperatorChangeData[] = CASAHolderOrOperatorChangeLoader.listAllChanges("tests/register/data/holder_or_operator_change/single_row_basic.csv");

        expect(result).toBeTruthy();
        expect(result.length).toBe(1);

        let entry = result[0];

        expect(entry.mark).toBe("VH-AAD");
        expect(entry.manufacturer).toBe("PILATUS AIRCRAFT LTD");
        expect(entry.model).toBe("PC-12/47E");
        expect(entry.serialNumber).toBe("1068");
        expect(entry.effectiveDate).toEqual(new SimpleDate(13,3,2009));

        expect(entry.registeredHolder).toBeDefined();
        expect(entry.registeredHolder.name).toBe("CAPITAL FINANCE AUSTRALIA LIMITED");
        expect(entry.registeredHolder.address).toBeDefined();
        expect(entry.registeredHolder.address.line1).toBe("PO Box 7685");
        expect(entry.registeredHolder.address.line2).toBeFalsy();
        expect(entry.registeredHolder.address.suburb).toBe("BAULKHAM HILLS");
        expect(entry.registeredHolder.address.state).toBe("NSW");
        expect(entry.registeredHolder.address.postcode).toBe("2153");
        expect(entry.registeredHolder.address.country).toBe("Australia");
        expect(entry.registeredHolder.commencementDate).toEqual(new SimpleDate(13,3,2009));

        expect(entry.registeredOperator).toBeDefined();
        expect(entry.registeredOperator.name).toBe("WEST WING AVIATION PTY LTD");
        expect(entry.registeredOperator.address).toBeDefined();
        expect(entry.registeredOperator.address.line1).toBe("PO Box 5251");
        expect(entry.registeredOperator.address.line2).toBeFalsy();
        expect(entry.registeredOperator.address.suburb).toBe("TOWNSVILLE");
        expect(entry.registeredOperator.address.state).toBe("QLD");
        expect(entry.registeredOperator.address.postcode).toBe("4810");
        expect(entry.registeredOperator.address.country).toBe("Australia");
        expect(entry.registeredOperator.commencementDate).toEqual(new SimpleDate(13,3,2009));
    });

    it("Handles a multiple holder_or_operator_change of the same mark", () => {
        let result:HolderOrOperatorChangeData[] = CASAHolderOrOperatorChangeLoader.listAllChanges("tests/register/data/holder_or_operator_change/multi_row_same_mark.csv");

        expect(result).toBeTruthy();
        expect(result.length).toBe(2);

        expect(result[0].mark).toBe("VH-ABM");
        expect(result[0].manufacturer).toBe("ROBINSON HELICOPTER CO");
        expect(result[0].model).toBe("R22 BETA");
        expect(result[0].serialNumber).toBe("2465");
        expect(result[0].effectiveDate).toEqual(new SimpleDate(23,4,2007));

        expect(result[1].mark).toBe("VH-ABM");
        expect(result[1].manufacturer).toBe("ROBINSON HELICOPTER CO");
        expect(result[1].model).toBe("R22 BETA");
        expect(result[1].serialNumber).toBe("2465");
        expect(result[1].effectiveDate).toEqual(new SimpleDate(24,9,2019));
    });
});

describe("Handles bad data", () => {
    it("Foreign addresses miss data", () => {
        let result:HolderOrOperatorChangeData[] = CASAHolderOrOperatorChangeLoader.listAllChanges("tests/register/data/holder_or_operator_change/single_row_foreign_address.csv");

        expect(result).toBeTruthy();
        expect(result.length).toBe(1);

        let entry = result[0];

        expect(entry.mark).toBe("VH-AKJ");
        expect(entry.manufacturer).toBe("CESSNA");
        expect(entry.model).toBe("210J");
        expect(entry.serialNumber).toBe("21059123");
        expect(entry.effectiveDate).toEqual(new SimpleDate(24,3,2000));

        expect(entry.registeredHolder).toBeDefined();
        expect(entry.registeredHolder.name).toBe("MR GARRY DAVID HONOUR");
        expect(entry.registeredHolder.address).toBeDefined();
        expect(entry.registeredHolder.address.line1).toBe("7 SIGLAP RD/22-64 MANDARIN GDNS");
        expect(entry.registeredHolder.address.line2).toBeFalsy();
        expect(entry.registeredHolder.address.suburb).toBeFalsy();
        expect(entry.registeredHolder.address.state).toBe("SINGAPORE");
        expect(entry.registeredHolder.address.postcode).toBe("448909");
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
        let result:HolderOrOperatorChangeData[] = CASAHolderOrOperatorChangeLoader.listAllChanges("tests/register/data/holder_or_operator_change/single_row_missing_address.csv");

        expect(result).toBeTruthy();
        expect(result.length).toBe(1);

        let entry = result[0];

        // Only bother to test the known error as we assume the rest passed in the other
        // happy path tests.
        expect(entry.registeredHolder).toBeDefined();
        expect(entry.registeredHolder.name).toBe("MR ROSS NEVILLE SMITH");
        expect(entry.registeredHolder.address).toBeDefined();
        expect(entry.registeredHolder.address.line1).toBe("'LANYAP'");
        expect(entry.registeredHolder.address.line2).toBeFalsy();
        expect(entry.registeredHolder.address.suburb).toBe("ROLLESTON");
        expect(entry.registeredHolder.address.state).toBe("QLD");
        expect(entry.registeredHolder.address.postcode).toBe("4702");
        expect(entry.registeredHolder.address.country).toBeFalsy();

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
        let result:HolderOrOperatorChangeData[] = CASAHolderOrOperatorChangeLoader.listAllChanges("tests/register/data/holder_or_operator_change/rhro_change_since_2000.csv");

        expect(result).toBeTruthy();
        expect(result.length).toBe(28128);
    });
});
