export declare class Address {
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
    static create1Line(line1: string, suburb: string, state: string, postcode: string, country: string): Address;
    static create2Line(line1: string, line2: string, suburb: string, state: string, postcode: string, country: string): Address;
}
//# sourceMappingURL=address.d.ts.map