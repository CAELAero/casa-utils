/*
 * Copyright (c) 2020, Justin Couch
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Address } from '../../src/register/address';
import { OwnerData } from '../../src/register/owner-data';
import { SimpleDate } from '../../src/register/simple-date';

describe("Basic Construction", () => {
    it("Can construct the empty class", () => {
        expect(new OwnerData()).toBeTruthy();
    });

    it("Can construct the class from the factory", () => {
        const expectedAddress = new Address();
        const expectedDate = new SimpleDate(1, 1, 1995);
        const expectedName = "Tom Jones";

        let result = OwnerData.create(expectedName, expectedAddress, expectedDate);

        expect(result).toBeTruthy();
        expect(result.name).toBe(expectedName);
        expect(result.address).toBe(expectedAddress);
        expect(result.commencementDate).toBe(expectedDate);
    });

});
