/*
 * Copyright (c) 2020, Justin Couch
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as fs from 'fs';

import { CASALoaderUtils } from '../../src/register/casa-loader-utils';
import { SimpleDate } from '../../src/register/simple-date';

describe("String parsing", () => {
    it("Returns undefined for non-string data", () => {
        expect(CASALoaderUtils.parseString(1234)).toBe("1234");
        expect(CASALoaderUtils.parseString(undefined)).toBeUndefined();
        expect(CASALoaderUtils.parseString("abc")).toBe("abc");
    });
});

describe("Date Parsing", () => {
    it("Parses correctly formatted dates", () => {
        const date_obj: SimpleDate = CASALoaderUtils.parseDate('2000-10-13');

        expect(date_obj.year).toBe(2000);
        expect(date_obj.month).toBe(10);
        expect(date_obj.day).toBe(13);
    }),
    it("Parses values <10 correctly", () => {
        const date_obj: SimpleDate = CASALoaderUtils.parseDate('2000-03-08');

        expect(date_obj.year).toBe(2000);
        expect(date_obj.month).toBe(3);
        expect(date_obj.day).toBe(8);
    }),
    it("Handles missing zeroes", () => {
        const date_obj: SimpleDate = CASALoaderUtils.parseDate('2000-3-8');

        expect(date_obj.year).toBe(2000);
        expect(date_obj.month).toBe(3);
        expect(date_obj.day).toBe(8);
    })
});

describe("Async Stream Loading", () => {
    it("Handles a readable as source", async () => {
        // Same test as the single row test, but we're going to load it ourselves as
        // a file to generate the ReadableStream, then pass that to the loader. We do
        // just a basic sanity test
        const stream = fs.createReadStream("tests/register/data/deregistration/empty_data.csv");
        let result = await CASALoaderUtils.readInput(stream);

        expect(result).toBeDefined();
    });

    // Seems to be no way to create a test for Blob/File or ReadableStream.
});
