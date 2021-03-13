/**
 * Represents a single date, without timezone. Used to avoid complications of
 * Javascript Date handling and browser/timezone issues.
 */
export declare class SimpleDate {
    private _day;
    private _month;
    private _year;
    constructor(d: number, m: number, y: number);
    get day(): number;
    get month(): number;
    get year(): number;
    static parse(raw: string): SimpleDate;
}
//# sourceMappingURL=simple-date.d.ts.map