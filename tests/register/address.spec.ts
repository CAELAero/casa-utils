/*
 * Copyright (c) 2020, Justin Couch
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Address } from '../../src/register/address';

describe("Basic Construction", () => {
    it("Can construct the empty class", () => {
        expect(new Address()).toBeTruthy();
    });

    it("Can construct the class from a factory method with no line 2", () => {
        const expectedLine1 = "124 1st Av";
        const expectedSuburb = "MyTown";
        const expectedState = "ABC";
        const expectedPostcode = "1234";
        const expectedCountry = "Australia";

        let result = Address.create1Line(expectedLine1, expectedSuburb, expectedState, expectedPostcode, expectedCountry);

        expect(result).toBeTruthy();
        expect(result.line1).toBe(expectedLine1);
        expect(result.suburb).toBe(expectedSuburb);
        expect(result.state).toBe(expectedState);
        expect(result.postcode).toBe(expectedPostcode);
        expect(result.country).toBe(expectedCountry);
        expect(result.line2).toBeUndefined();
    });

    it("Can construct the class from a factory method with line 2", () => {
        const expectedLine1 = "Unit 35";
        const expectedLine2 = "124 1st Av";
        const expectedSuburb = "MyTown";
        const expectedState = "ABC";
        const expectedPostcode = "1234";
        const expectedCountry = "Australia";

        let result = Address.create2Line(expectedLine1, expectedLine2, expectedSuburb, expectedState, expectedPostcode, expectedCountry);

        expect(result).toBeTruthy();
        expect(result.line1).toBe(expectedLine1);
        expect(result.suburb).toBe(expectedSuburb);
        expect(result.state).toBe(expectedState);
        expect(result.postcode).toBe(expectedPostcode);
        expect(result.country).toBe(expectedCountry);
        expect(result.line2).toBe(expectedLine2);
    });
});
