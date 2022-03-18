/*
 * Copyright (c) 2020, Justin Couch
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as fs from 'fs';

import { CASALoaderUtils } from '../../src/register/casa-loader-utils';

describe("String parsing", () => {
    it("Returns undefined for non-string data", () => {
        expect(CASALoaderUtils.parseString(1234)).toBe("1234");
        expect(CASALoaderUtils.parseString(undefined)).toBeUndefined();
        expect(CASALoaderUtils.parseString("abc")).toBe("abc");
    });
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
