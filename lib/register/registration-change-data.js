/*
 * Copyright (c) 2020, Justin Couch
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { RegistrationBaseData } from './registration-base-data';
/**
 * Represents a change in registration of an aircraft - either an addition or
 * return to the register after being deregistered. A smaller subset of the basic
 * registration as it doesn't care about engines etc.
 */
export class RegistrationChangeData extends RegistrationBaseData {
    constructor() {
        super(...arguments);
        /** True if this is a new registration, false if this is a return */
        this.isNewRegistration = false;
    }
}
//# sourceMappingURL=registration-change-data.js.map