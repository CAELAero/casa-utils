/*
 * Copyright (c) 2020, Justin Couch
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Readable } from 'stream';

import { Sheet2JSONOpts, WorkBook, utils } from 'xlsx';

import { Address } from './address';
import { CASALoaderUtils } from './casa-loader-utils';
import { EngineData } from './engine-data';
import { EnumMapper } from './enum-mapper';
import { OwnerData } from './owner-data';
import { RegistrationData } from './registration-data';

/**
 * Loader for the CASA aircraft register files. These are CSV files with the
 * column format defined here:
 * https://www.casa.gov.au/standard-page/data-files-field-definitions
 */
export class CASARegistrationLoader {
    /**
     * List all the registration entries described by the source file.
     *
     * @param {string} source The path to the file to load. May be absolute or relative path
     * @return The entries found in the file, as parsed. If nothing is found, returns
     *   a zero length array
     */
    public static async listAllRegistrations(
        source: string | Readable | ReadableStream | Blob,
    ): Promise<RegistrationData[]> {
        if (!source) {
            throw new Error('No source given to parse');
        }

        const workbook: WorkBook = await CASALoaderUtils.readInput(source, true);
        const loaded_data = workbook.Sheets[workbook.SheetNames[0]];

        // Could we find the data? undefined or null here if not. Throw error
        const conv_opts: Sheet2JSONOpts = {
            header: 1,
            blankrows: false,
            range: 1,
            UTC: true,
            dateNF: 'yyyy-mm-dd',
            raw: false,
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sheet_data: any[][] = utils.sheet_to_json(loaded_data, conv_opts);

        const retval: RegistrationData[] = [];
        const enum_mapper = new EnumMapper();

        sheet_data.forEach((row) => {
            try {
                const entry = new RegistrationData();

                entry.mark = 'VH-' + (row[0] as string);
                entry.manufacturer = CASALoaderUtils.parseString(row[1]);
                entry.manufacturerCountry = CASALoaderUtils.parseString(row[37]);
                entry.manufactureYear = parseInt(row[38] as string, 10) || 0;

                entry.model = CASALoaderUtils.parseString(row[3]);
                entry.serialNumber = CASALoaderUtils.parseString(row[4]);
                entry.mtow = parseInt(row[5] as string, 10) || 0;
                entry.engineCount = parseInt(row[6] as string, 10) || 0;

                if (entry.engineCount > 0) {
                    const eng_type = enum_mapper.lookupEngine(row[8] as string);
                    const fuel_type = enum_mapper.lookupFuel(row[10] as string);

                    const eng_data = EngineData.create(row[7] as string, eng_type, String(row[9]), fuel_type);
                    entry.engine = eng_data;
                }

                entry.registrationType = enum_mapper.lookupRegistration(row[11] as string);
                entry.registrationSuspended = row[40] === 'Suspended';

                entry.firstRegisteredDate = CASALoaderUtils.parseDate(row[28] as string);
                entry.registrationExpiryDate = CASALoaderUtils.parseDate(row[29] as string);

                entry.landingGear = enum_mapper.lookupLandingGear(row[29] as string);
                entry.airframeType = enum_mapper.lookupAirframe(row[30] as string);

                if (row[34] && row[34] !== 'AIRCRAFT NOT FITTED WITH PROPELLER') {
                    entry.propellerManufacturer = String(row[34]).trim();
                }

                if (row[35] && row[35] !== 'NOT APPLICABLE') {
                    // ToString before trim here since we can occasionally get model numbers come through
                    // as just a plain number. The parser will treat that as a number. Trim() is then
                    // used in the case where we have a normal string, but with extra whitespace.
                    entry.propellerModel = String(row[35]).trim();
                }

                entry.typeCertificateNumber = row[36] as string;

                const holder_postcode = row[17] ? String(row[17]).padStart(4, '0') : null;
                const holder_add = Address.create2Line(
                    CASALoaderUtils.parseString(row[13]),
                    CASALoaderUtils.parseString(row[14]),
                    CASALoaderUtils.parseString(row[15]),
                    CASALoaderUtils.parseString(row[16]),
                    holder_postcode,
                    CASALoaderUtils.parseString(row[18]),
                );
                const holder_date = CASALoaderUtils.parseDate(row[19] as string);

                entry.registeredHolder = OwnerData.create(row[12] as string, holder_add, holder_date);

                const operator_postcode = row[25] ? String(row[25]).padStart(4, '0') : null;
                const operator_add = Address.create2Line(
                    CASALoaderUtils.parseString(row[21]),
                    CASALoaderUtils.parseString(row[22]),
                    CASALoaderUtils.parseString(row[23]),
                    CASALoaderUtils.parseString(row[24]),
                    operator_postcode,
                    CASALoaderUtils.parseString(row[26]),
                );
                const operator_date = CASALoaderUtils.parseDate(row[27] as string);

                entry.registeredOperator = OwnerData.create(row[20] as string, operator_add, operator_date);

                entry.standardCoA = CASALoaderUtils.parseCertCategories(enum_mapper, row[31] as string);
                entry.specialCoA = CASALoaderUtils.parseCertCategories(enum_mapper, row[32] as string);

                retval.push(entry);
            } catch (error) {
                // Should never get here since the above parsing is quite forgiving. Likely this is due
                // to a stream or other interrupt error.
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                const row_str = '[ ' + row.join(',') + ' ]';
                if (error instanceof Error) {
                    console.error(`Error reading row ${row_str} due to ${error.message}`, error);
                } else {
                    console.error(`Unexpected row error object found on row ${row_str}`, error);
                }
            }
        });

        return retval;
    }
}
