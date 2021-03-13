/*
 * Copyright (c) 2020, Justin Couch
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Readable } from 'stream';

import { WorkBook, utils } from 'xlsx';

import { Address } from './address';
import { CASALoaderUtils } from './casa-loader-utils';
import { HolderOrOperatorChangeData } from './holder-or-operator-change-data';
import { OwnerData } from './owner-data';
import { SimpleDate } from './simple-date';

/**
 * Loader for the CASA aircraft register add and returning registrations.
 * These are CSV files with the column format defined here:
 * https://www.casa.gov.au/standard-page/data-files-field-definitions
 */
export class CASAHolderOrOperatorChangeLoader {
    /**
     * List all the registration change entries described by the source file.
     *
     * @param {string} source The path to the file to load. May be absolute or relative path
     * @return The entries found in the file, as parsed. If nothing is found, returns
     *   a zero length array
     */
    public static async listAllChanges(
        source: string | Readable | ReadableStream | Blob,
    ): Promise<HolderOrOperatorChangeData[]> {
        if (!source) {
            throw new Error('No source given to parse');
        }

        const workbook: WorkBook = await CASALoaderUtils.readInput(source);
        const loaded_data = workbook.Sheets[workbook.SheetNames[0]];

        // Could we find the data? undefined or null here if not. Throw error
        const sheet_data: any[][] = utils.sheet_to_json(loaded_data, {
            header: 1,
            blankrows: false,
            range: 1,
        });

        const retval: HolderOrOperatorChangeData[] = [];

        sheet_data.forEach((row) => {
            try {
                const entry = new HolderOrOperatorChangeData();

                entry.mark = 'VH-' + (row[0] as string);
                entry.manufacturer = CASALoaderUtils.parseString(row[1]);
                entry.model = CASALoaderUtils.parseString(row[2]);
                entry.serialNumber = CASALoaderUtils.parseString(row[3]);

                entry.effectiveDate = SimpleDate.parse(row[4]);

                const holder_postcode = row[10] ? String(row[10]).padStart(4, '0') : null;
                const holder_add = Address.create2Line(
                    CASALoaderUtils.parseString(row[6]),
                    CASALoaderUtils.parseString(row[7]),
                    CASALoaderUtils.parseString(row[8]),
                    CASALoaderUtils.parseString(row[9]),
                    holder_postcode,
                    CASALoaderUtils.parseString(row[11]),
                );
                const holder_date = SimpleDate.parse(row[20]);

                entry.registeredHolder = OwnerData.create(row[5], holder_add, holder_date);

                const operator_postcode = row[17] ? String(row[17]).padStart(4, '0') : null;
                const operator_add = Address.create2Line(
                    CASALoaderUtils.parseString(row[13]),
                    CASALoaderUtils.parseString(row[14]),
                    CASALoaderUtils.parseString(row[15]),
                    CASALoaderUtils.parseString(row[16]),
                    operator_postcode,
                    CASALoaderUtils.parseString(row[18]),
                );
                const operator_date = SimpleDate.parse(row[21]);

                entry.registeredOperator = OwnerData.create(row[12], operator_add, operator_date);

                retval.push(entry);
            } catch (error) {
                // Should never get here since the above parsing is quite forgiving. Likely this is due
                // to a stream or other interrupt error.
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                console.error(`Error reading row ${row} due to ${error.message}`, error);
            }
        });

        return retval;
    }
}
