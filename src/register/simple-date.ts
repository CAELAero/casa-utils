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
    private _day: number;
    private _month: number;
    private _year: number;

    constructor(d: number, m: number, y: number) {
        this._day = d;
        this._month = m;
        this._year = y;
    }

    get day(): number {
        return this._day;
    }

    get month(): number {
        return this._month;
    }

    get year(): number {
        return this._year;
    }

    public static parse(raw: string): SimpleDate {
        const parsed = moment(raw, 'DD MMMM YYYY', true).toObject();

        return new SimpleDate(parsed.date, parsed.months + 1, parsed.years);
    }
}
