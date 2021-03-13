/*
 * Copyright (c) 2020, Justin Couch
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import moment from 'moment';
/**
 * Represents a single date, without timezone. Used to avoid complications of
 * Javascript Date handling and browser/timezone issues.
 */
export class SimpleDate {
    constructor(d, m, y) {
        this._day = d;
        this._month = m;
        this._year = y;
    }
    get day() {
        return this._day;
    }
    get month() {
        return this._month;
    }
    get year() {
        return this._year;
    }
    static parse(raw) {
        if (!raw || raw.trim().length === 0) {
            return undefined;
        }
        const parsed = moment(raw, ['DD/MM/YYYY', 'DD MMMM YYYY'], true).toObject();
        return new SimpleDate(parsed.date, parsed.months + 1, parsed.years);
    }
}
//# sourceMappingURL=simple-date.js.map