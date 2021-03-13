import { RegistrationChangeData } from './registration-change-data';
/**
 * Loader for the CASA aircraft register add and returning registrations.
 * These are CSV files with the column format defined here:
 * https://www.casa.gov.au/standard-page/data-files-field-definitions
 */
export declare class CASARegistrationChangeLoader {
    /**
     * List all the registration change entries described by the source file.
     *
     * @param {string} source The path to the file to load. May be absolute or relative path
     * @return The entries found in the file, as parsed. If nothing is found, returns
     *   a zero length array
     */
    static listAllRegistrationChanges(source: string): RegistrationChangeData[];
}
//# sourceMappingURL=registration-change-loader.d.ts.map