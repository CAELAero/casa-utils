import { DeregistrationData } from './deregistration-data';
/**
 * Loader for the CASA aircraft register files. These are CSV files with the
 * column format defined here:
 * https://www.casa.gov.au/standard-page/data-files-field-definitions
 */
export declare class CASADeregistrationLoader {
    /**
     * List all the deregistration entries described by the source file.
     *
     * @param {string} source The path to the file to load. May be absolute or relative path
     * @return The entries found in the file, as parsed. If nothing is found, returns
     *   a zero length array
     */
    static listAllDeregistrations(source: string): DeregistrationData[];
}
//# sourceMappingURL=deregistration-loader.d.ts.map