/*
 * Copyright (c) 2020, Justin Couch
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { RegistrationBaseData } from './registration-base-data';

import { SimpleDate } from './simple-date';

/**
 * Represents a change in registration of an aircraft - either an addition or
 * return to the register after being deregistered. A smaller subset of the basic
 * registration as it doesn't care about engines etc.
 */
export class MarkChangeData extends RegistrationBaseData {

    /** Effective Date of deregistration */
    effectiveDate: SimpleDate;

    /** The old registration mark prior to this one, including VH- prefix */
    oldMark: string;
}
