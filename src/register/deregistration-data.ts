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
 * Represents a deregistration of a mark. A smaller subset of the basic
 * registration as it doesn't care about engines etc.
 */
export class DeregistrationData extends RegistrationBaseData {
    /** Effective Date of deregistration */
    effectiveDate: SimpleDate;

    /** The reason for deregistration */
    reason: string;
}
