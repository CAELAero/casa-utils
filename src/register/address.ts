/*
 * Copyright (c) 2020, Justin Couch
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

export class Address {
    /** Street address, house/unit number and street type */
    line1: string;

    /** Optional second line of the address */
    line2?: string;

    /** Suburb/town of the address */
    suburb: string;

    /** State of the address */
    state: string;

    /** Postal or zip code */
    postcode: string;

    /** Full country name, not 2 letter code */
    country: string;

    public static create1Line(
        line1: string,
        suburb: string,
        state: string,
        postcode: string,
        country: string,
    ): Address {
        const retval = new Address();

        retval.line1 = line1;
        retval.suburb = suburb;
        retval.state = state;
        retval.postcode = postcode;
        retval.country = country;

        return retval;
    }

    public static create2Line(
        line1: string,
        line2: string,
        suburb: string,
        state: string,
        postcode: string,
        country: string,
    ): Address {
        const retval = new Address();

        retval.line1 = line1;
        retval.line2 = line2;
        retval.suburb = suburb;
        retval.state = state;
        retval.postcode = postcode;
        retval.country = country;

        return retval;
    }
}
