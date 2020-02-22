/*
 * Copyright (c) 2020, Justin Couch
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { HolderOrOperatorChangeData } from '../../src/register/holder-or-operator-change-data';

describe("Basic Construction", () => {
    it("Can construct the empty class", () => {
        expect(new HolderOrOperatorChangeData()).toBeTruthy();
    });

    it("Default field values are correct", () => {
        let result = new HolderOrOperatorChangeData();

        expect(result.effectiveDate).toBeUndefined();
    });
});
