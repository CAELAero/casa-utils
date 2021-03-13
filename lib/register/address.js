/*
 * Copyright (c) 2020, Justin Couch
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
export class Address {
    static create1Line(line1, suburb, state, postcode, country) {
        const retval = new Address();
        retval.line1 = line1;
        retval.suburb = suburb;
        retval.state = state;
        retval.postcode = postcode;
        retval.country = country;
        return retval;
    }
    static create2Line(line1, line2, suburb, state, postcode, country) {
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
//# sourceMappingURL=address.js.map