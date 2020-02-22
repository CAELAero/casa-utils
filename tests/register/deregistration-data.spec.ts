/*
 * Copyright (c) 2020, Justin Couch
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { DeregistrationData } from '../../src/register/deregistration-data';

describe("Basic Construction", () => {
    it("Can construct the empty class", () => {
        expect(new DeregistrationData()).toBeTruthy();
    });
});
