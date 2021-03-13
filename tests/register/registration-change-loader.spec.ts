/*
 * Copyright (c) 2020, Justin Couch
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CASARegistrationChangeLoader } from '../../src/register/registration-change-loader';
import { RegistrationChangeData } from '../../src/register/registration-change-data';
import { SimpleDate } from '../../src/register/simple-date';

describe('Erroneous input handling', () => {
    it('generates an error if no file given', async () => {
        expect.assertions(1);

        try {
            await CASARegistrationChangeLoader.listAllRegistrationChanges(null);
        } catch(err) {
            expect(err).not.toBeNull();
        }
    });

    it('generates an error if file does not exist', async () => {
        expect.assertions(1);

        try {
            await CASARegistrationChangeLoader.listAllRegistrationChanges("randompath.xls");
        } catch(err) {
            expect(err).not.toBeNull();
        }
    });
});

describe("Loads correct data", () => {
    it('Handles an empty file', async () => {
        let result:RegistrationChangeData[] = await CASARegistrationChangeLoader.listAllRegistrationChanges("tests/register/data/adds_and_returns/empty_data.csv");

        expect(result).toBeTruthy();
        expect(result.length).toBe(0);
    });

    it("Handles a single row of correct adding a registration", async () => {
        let result:RegistrationChangeData[] = await CASARegistrationChangeLoader.listAllRegistrationChanges("tests/register/data/adds_and_returns/single_row_basic_add.csv");

        expect(result).toBeTruthy();
        expect(result.length).toBe(1);

        let entry = result[0];

        expect(entry.mark).toBe("VH-AAD");
        expect(entry.manufacturer).toBe("BELL HELICOPTER CO");
        expect(entry.model).toBe("206B");
        expect(entry.serialNumber).toBe("2112");
        expect(entry.effectiveDate).toEqual(new SimpleDate(17,12,2007));
        expect(entry.isNewRegistration).toBeTruthy();

        expect(entry.registeredHolder).toBeDefined();
        expect(entry.registeredHolder.name).toBe("CAPITAL FINANCE AUSTRALIA LIMITED");
        expect(entry.registeredHolder.address).toBeDefined();
        expect(entry.registeredHolder.address.line1).toBe("PO Box 7685");
        expect(entry.registeredHolder.address.line2).toBeFalsy();
        expect(entry.registeredHolder.address.suburb).toBe("BAULKHAM HILLS");
        expect(entry.registeredHolder.address.state).toBe("NSW");
        expect(entry.registeredHolder.address.postcode).toBe("2153");
        expect(entry.registeredHolder.address.country).toBe("Australia");
        expect(entry.registeredHolder.commencementDate).toBeFalsy();

        expect(entry.registeredOperator).toBeDefined();
        expect(entry.registeredOperator.name).toBe("CHN DEVELOPMENTS PTY LTD");
        expect(entry.registeredOperator.address).toBeDefined();
        expect(entry.registeredOperator.address.line1).toBe("10 Laurio Place");
        expect(entry.registeredOperator.address.line2).toBeFalsy();
        expect(entry.registeredOperator.address.suburb).toBe("MAYFIELD WEST");
        expect(entry.registeredOperator.address.state).toBe("NSW");
        expect(entry.registeredOperator.address.postcode).toBe("2304");
        expect(entry.registeredOperator.address.country).toBe("Australia");
        expect(entry.registeredOperator.commencementDate).toBeFalsy();
    });

    it("Handles a single row of correct returning registration", async () => {
        let result:RegistrationChangeData[] = await CASARegistrationChangeLoader.listAllRegistrationChanges("tests/register/data/adds_and_returns/single_row_basic_return.csv");

        expect(result).toBeTruthy();
        expect(result.length).toBe(1);

        let entry = result[0];

        expect(entry.mark).toBe("VH-AAC");
        expect(entry.manufacturer).toBe("PIPER");
        expect(entry.model).toBe("PA-22-108");
        expect(entry.serialNumber).toBe("229617");
        expect(entry.effectiveDate).toEqual(new SimpleDate(1,9,2005));
        expect(entry.isNewRegistration).toBeFalsy();

        expect(entry.registeredHolder).toBeDefined();
        expect(entry.registeredHolder.name).toBe("LEVITT, Graham");
        expect(entry.registeredHolder.address).toBeDefined();
        expect(entry.registeredHolder.address.line1).toBe("53 Yanderra Gr,");
        expect(entry.registeredHolder.address.line2).toBeFalsy();
        expect(entry.registeredHolder.address.suburb).toBe("CHERRYBROOK");
        expect(entry.registeredHolder.address.state).toBe("NSW");
        expect(entry.registeredHolder.address.postcode).toBe("2126");
        expect(entry.registeredHolder.address.country).toBe("AUSTRALIA");
        expect(entry.registeredHolder.commencementDate).toBeFalsy();

        expect(entry.registeredOperator).toBeDefined();
        expect(entry.registeredOperator.name).toBe("LEVITT, Graham");
        expect(entry.registeredOperator.address).toBeDefined();
        expect(entry.registeredOperator.address.line1).toBe("53 Yanderra Gr,");
        expect(entry.registeredOperator.address.line2).toBeFalsy();
        expect(entry.registeredOperator.address.suburb).toBe("CHERRYBROOK");
        expect(entry.registeredOperator.address.state).toBe("NSW");
        expect(entry.registeredOperator.address.postcode).toBe("2126");
        expect(entry.registeredOperator.address.country).toBe("AUSTRALIA");
        expect(entry.registeredOperator.commencementDate).toBeFalsy();
    });

    it("Handles a multiple adds_and_returns of the same mark", async () => {
        let result:RegistrationChangeData[] = await CASARegistrationChangeLoader.listAllRegistrationChanges("tests/register/data/adds_and_returns/multi_row_same_mark.csv");

        expect(result).toBeTruthy();
        expect(result.length).toBe(2);

        expect(result[0].mark).toBe("VH-ADC");
        expect(result[0].manufacturer).toBe("EUROCPTR");
        expect(result[0].model).toBe("EC120B");
        expect(result[0].serialNumber).toBe("1370");
        expect(result[0].effectiveDate).toEqual(new SimpleDate(19,7,2004));
        expect(result[0].isNewRegistration).toBeTruthy();

        expect(result[1].mark).toBe("VH-ADC");
        expect(result[1].manufacturer).toBe("ROBINSON HELICOPTER CO");
        expect(result[1].model).toBe("R44");
        expect(result[1].serialNumber).toBe("1977");
        expect(result[1].effectiveDate).toEqual(new SimpleDate(12,11,2009));
        expect(result[1].isNewRegistration).toBeTruthy();
    });
});

describe("Handles bad data", () => {
    it("Foreign addresses miss data", async () => {
        let result:RegistrationChangeData[] = await CASARegistrationChangeLoader.listAllRegistrationChanges("tests/register/data/adds_and_returns/single_row_foreign_address.csv");

        expect(result).toBeTruthy();
        expect(result.length).toBe(1);

        let entry = result[0];

        expect(entry.mark).toBe("VH-AAY");
        expect(entry.manufacturer).toBe("BOMBARDIER INC");
        expect(entry.model).toBe("DHC-8-315");
        expect(entry.serialNumber).toBe("549");
        expect(entry.effectiveDate).toEqual(new SimpleDate(4,1,2008));
        expect(entry.isNewRegistration).toBeTruthy();

        expect(entry.registeredHolder).toBeDefined();
        expect(entry.registeredHolder.name).toBe("TRAVIRA AIR, PT.");
        expect(entry.registeredHolder.address).toBeDefined();
        expect(entry.registeredHolder.address.line1).toBe("3rd Floor, Graha Paramita Jl Denpasar Raya Blok D2, Kav 8");
        expect(entry.registeredHolder.address.line2).toBeFalsy();
        expect(entry.registeredHolder.address.suburb).toBe("KUNINGAN, JAKARTA INDONESIA");
        expect(entry.registeredHolder.address.state).toBeFalsy();
        expect(entry.registeredHolder.address.postcode).toBe("12940");
        expect(entry.registeredHolder.address.country).toBe("Indonesia");
        expect(entry.registeredHolder.commencementDate).toBeFalsy();

        expect(entry.registeredOperator).toBeDefined();
        expect(entry.registeredOperator.name).toBe("BRODERICK, Darren Graham");
        expect(entry.registeredOperator.address).toBeDefined();
        expect(entry.registeredOperator.address.line1).toBe("1075 West Camp Road");
        expect(entry.registeredOperator.address.line2).toBeFalsy();
        expect(entry.registeredOperator.address.suburb).toBe("SELETAR AIRPORT");
        expect(entry.registeredOperator.address.state).toBe("SINGAPORE");
        expect(entry.registeredOperator.address.postcode).toBe("797800");
        expect(entry.registeredOperator.address.country).toBe("Singapore");
        expect(entry.registeredOperator.commencementDate).toBeFalsy();
    });

    it("No addresses provided error", async () => {
        let result:RegistrationChangeData[] = await CASARegistrationChangeLoader.listAllRegistrationChanges("tests/register/data/adds_and_returns/single_row_missing_address.csv");

        expect(result).toBeTruthy();
        expect(result.length).toBe(1);

        let entry = result[0];

        // Only bother to test the known error as we assume the rest passed in the other
        // happy path tests.
        expect(entry.registeredHolder).toBeDefined();
        expect(entry.registeredHolder.name).toBe("MR STEPHEN JOHN MCCARTHY");
        expect(entry.registeredHolder.address).toBeDefined();
        expect(entry.registeredHolder.address.line1).toBe("'TUGLOW VIEW'");
        expect(entry.registeredHolder.address.line2).toBeFalsy();
        expect(entry.registeredHolder.address.suburb).toBe("GINGKIN");
        expect(entry.registeredHolder.address.state).toBe("NSW");
        expect(entry.registeredHolder.address.postcode).toBe("2787");
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
    it("Can load the whole dataset ", async () => {
        let result:RegistrationChangeData[] = await CASARegistrationChangeLoader.listAllRegistrationChanges("tests/register/data/adds_and_returns/add_and_return_since_2000.csv");

        expect(result).toBeTruthy();
        expect(result.length).toBe(10033);
    });
});
