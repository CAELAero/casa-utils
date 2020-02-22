/*
 * Copyright (c) 2020, Justin Couch
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { MarkChangeData } from '../../src/register/mark-change-data';

describe("Basic Construction", () => {
    it("Can construct the empty class", () => {
        expect(new MarkChangeData()).toBeTruthy();
    });

    it("Default field values are correct", () => {
        let result = new MarkChangeData();

        expect(result.oldMark).toBeFalsy();
        expect(result.effectiveDate).toBeUndefined();
    });
});
