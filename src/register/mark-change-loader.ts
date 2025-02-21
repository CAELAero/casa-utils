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
import { MarkChangeData } from './mark-change-data';
import { OwnerData } from './owner-data';
import { SimpleDate } from './simple-date';

/**
 * Loader for the CASA aircraft register add and returning registrations.
 * These are CSV files with the column format defined here:
 * https://www.casa.gov.au/standard-page/data-files-field-definitions
 */
export class CASAMarkChangeLoader {
    /**
     * List all the registration change entries described by the source file.
     *
     * @param {string} source The path to the file to load. May be absolute or relative path
     * @return The entries found in the file, as parsed. If nothing is found, returns
     *   a zero length array
     */
    public static async listAllMarkChanges(
        source: string | Readable | ReadableStream | Blob,
    ): Promise<MarkChangeData[]> {
        if (!source) {
            throw new Error('No source given to parse');
        }

        const workbook: WorkBook = await CASALoaderUtils.readInput(source);
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

        const retval: MarkChangeData[] = [];

        sheet_data.forEach((row) => {
            try {
                const entry = new MarkChangeData();

                entry.mark = 'VH-' + (row[0] as string);
                entry.manufacturer = CASALoaderUtils.parseString(row[1]);
                entry.model = CASALoaderUtils.parseString(row[2]);
                entry.serialNumber = CASALoaderUtils.parseString(row[3]);

                entry.effectiveDate = SimpleDate.parse(row[4] as string);
                entry.oldMark = 'VH-' + (row[5] as string);

                const holder_postcode = row[11] ? String(row[11]).padStart(4, '0') : null;
                const holder_add = Address.create2Line(
                    CASALoaderUtils.parseString(row[7]),
                    CASALoaderUtils.parseString(row[8]),
                    CASALoaderUtils.parseString(row[9]),
                    CASALoaderUtils.parseString(row[10]),
                    holder_postcode,
                    CASALoaderUtils.parseString(row[12]),
                );

                entry.registeredHolder = OwnerData.create(row[6] as string, holder_add, null);

                const operator_postcode = row[18] ? String(row[18]).padStart(4, '0') : null;
                const operator_add = Address.create2Line(
                    CASALoaderUtils.parseString(row[14]),
                    CASALoaderUtils.parseString(row[15]),
                    CASALoaderUtils.parseString(row[16]),
                    CASALoaderUtils.parseString(row[17]),
                    operator_postcode,
                    CASALoaderUtils.parseString(row[19]),
                );

                entry.registeredOperator = OwnerData.create(row[13] as string, operator_add, null);

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
