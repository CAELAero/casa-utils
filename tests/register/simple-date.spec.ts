/*
 * Copyright (c) 2020, Justin Couch
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SimpleDate } from '../../src/register/simple-date';

describe("Basic Construction", () => {
    it("can construct the class", () => {
        const expected_day = 2;
        const expected_month = 11;
        const expected_year = 1992;

        let result = new SimpleDate(expected_day, expected_month, expected_year);
        expect(result.day).toBe(expected_day);
        expect(result.month).toBe(expected_month);
        expect(result.year).toBe(expected_year);
    });
});
