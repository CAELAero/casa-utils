/*
 * Copyright (c) 2020, Justin Couch
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
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
}
