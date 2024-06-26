/*
 * Copyright (c) 2020, Justin Couch
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { OwnerData } from './owner-data';

/**
 * Represents a deregistration of a mark. A smaller subset of the basic
 * registration as it doesn't care about engines etc.
 */
export abstract class RegistrationBaseData {
    /** The registration mark, including VH- prefix */
    mark: string;

    /** The name of the manufacturer of the airframe */
    manufacturer: string;

    /** The official model name of the aircraft */
    model: string;

    /** The serial number of the airframe */
    serialNumber: string;

    /**
     * Registered Operator details at the time of deregistration. Note that there will be no
     * commencement date for this change.
     */
    registeredOperator: OwnerData;

    /**
     * Registered Holder details at the time of deregistration. Note that there will be no
     * commencement date for this change.
     */
    registeredHolder: OwnerData;
}
