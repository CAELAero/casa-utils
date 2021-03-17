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

    public toISOString(): string {
        const m = this._month < 10 ? `0${this._month}` : this._month;
        const d = this._day < 10 ? `0${this._day}` : this._day;

        return `${this._year}-${m}-${d}`;
    }

    public static parse(raw: string): SimpleDate {
        if (!raw || raw.trim().length === 0) {
            return undefined;
        }

        const parsed = moment(raw, ['DD/MM/YYYY', 'DD MMMM YYYY'], true).toObject();

        return new SimpleDate(parsed.date, parsed.months + 1, parsed.years);
    }
}
