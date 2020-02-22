/*
 * Copyright (c) 2020, Justin Couch
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Address } from './address';
import { SimpleDate } from './simple-date';

export class OwnerData {
    address: Address;
    name: string;
    commencementDate: SimpleDate;

    public static create(name: string, address: Address, date: SimpleDate): OwnerData {
        const retval = new OwnerData();
        retval.name = name;
        retval.address = address;
        retval.commencementDate = date;

        return retval;
    }
}
