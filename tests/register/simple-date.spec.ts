/*
 * Copyright (c) 2020, Justin Couch
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SimpleDate } from '../../src/register/simple-date';

describe("Basic Construction", () => {
    it("Can construct the class", () => {
        const expected_day = 2;
        const expected_month = 11;
        const expected_year = 1992;

        let result = new SimpleDate(expected_day, expected_month, expected_year);
        expect(result.day).toBe(expected_day);
        expect(result.month).toBe(expected_month);
        expect(result.year).toBe(expected_year);
    });
});

describe("Date parsing", () => {
    it("Can parse \"03 December 1995\"", () => {
        let result = SimpleDate.parse("03 December 1995");

        expect(result).toBeTruthy();
        expect(result.day).toBe(3);
        expect(result.month).toBe(12);
        expect(result.year).toBe(1995);
    });

    it("Can parse \"03/12/1995\"", () => {
        let result = SimpleDate.parse("03/12/1995");

        expect(result).toBeTruthy();
        expect(result.day).toBe(3);
        expect(result.month).toBe(12);
        expect(result.year).toBe(1995);
    });

    it("Can print the ISO date format correctly", () => {
        const year = 2034;
        const month = 11;
        const day = 15;

        const expected = `${year}-${month}-${day}`;

        const d = new SimpleDate(day, month, year);
        let result = d.toISOString();

        expect(result).toEqual(expected);

    });

    it("Can print the ISO date format correctly with zero padding", () => {
        const year = 2034;
        const month = 4;
        const day = 5;

        const expected = `${year}-0${month}-0${day}`;

        const d = new SimpleDate(day, month, year);
        let result = d.toISOString();

        expect(result).toEqual(expected);
    });
});

describe("Handles bad data", () => {
    it("Generates undefined for undefined input", () => {
        expect(SimpleDate.parse(undefined)).toBeUndefined();
    });

    it("Generates undefined for null input", () => {
        expect(SimpleDate.parse(null)).toBeUndefined();
    });

    it("Generates undefined for zero length string input", () => {
        expect(SimpleDate.parse("")).toBeUndefined();
    });

    it("Generates undefined for empty string input", () => {
        expect(SimpleDate.parse("    ")).toBeUndefined();
    });
});
