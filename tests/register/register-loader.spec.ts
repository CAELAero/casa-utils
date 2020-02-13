/*
 * Copyright (c) 2020, Justin Couch
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { RegisterLoader } from '../../src/register/register-loader';

describe("Basic Construction", () => {
    it("can construct the class", () => {
        expect(new RegisterLoader()).toBeTruthy();
    });
});
