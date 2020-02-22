/*
 * Copyright (c) 2020, Justin Couch
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { RegistrationChangeData } from '../../src/register/registration-change-data';

describe("Basic Construction", () => {
    it("Can construct the empty class", () => {
        expect(new RegistrationChangeData()).toBeTruthy();
    });

    it("Default field values are correct", () => {
        let result = new RegistrationChangeData();

        expect(result.isNewRegistration).toBeFalsy();
        expect(result.effectiveDate).toBeUndefined();
    });
});
