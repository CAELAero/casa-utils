/*
 * Copyright (c) 2020, Justin Couch
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ParsingOptions, readFile, WorkBook, utils, SSF } from 'xlsx';

import { Address } from './address';
import { CASALoaderUtils } from './casa-loader-utils';
import { MarkChangeData } from './mark-change-data';
import { EnumMapper } from './enum-mapper';
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
    public static listAllMarkChanges(source: string): MarkChangeData[] {
        if (!source) {
            throw new Error('No source given to parse');
        }

        // Need to force raw parsing here since it will mess up the registration dates,
        // which are in internation style dd/mm/yyyy and it converts to american style.
        const options = {
            raw: true,
        };

        const workbook: WorkBook = readFile(source, options);
        const loaded_data = workbook.Sheets[workbook.SheetNames[0]];

        // Could we find the data? undefined or null here if not. Throw error
        const sheet_data: any[][] = utils.sheet_to_json(loaded_data, {
            header: 1,
            blankrows: false,
            range: 1,
        });

        const retval: MarkChangeData[] = [];

        sheet_data.forEach(row => {
            try {
                const entry = new MarkChangeData();

                entry.mark = 'VH-' + row[0];
                entry.manufacturer = CASALoaderUtils.parseString(row[1]);
                entry.model = CASALoaderUtils.parseString(row[2]);
                entry.serialNumber = CASALoaderUtils.parseString(row[3]);

                entry.effectiveDate = SimpleDate.parse(row[4]);
                entry.oldMark = 'VH-' + row[5];

                const holder_postcode = row[11] ? row[11].toString().padStart(4, '0') : null;
                const holder_add = Address.create2Line(
                    CASALoaderUtils.parseString(row[7]),
                    CASALoaderUtils.parseString(row[8]),
                    CASALoaderUtils.parseString(row[9]),
                    CASALoaderUtils.parseString(row[10]),
                    holder_postcode,
                    CASALoaderUtils.parseString(row[12]),
                );

                entry.registeredHolder = OwnerData.create(row[6], holder_add, null);

                const operator_postcode = row[18] ? row[18].toString().padStart(4, '0') : null;
                const operator_add = Address.create2Line(
                    CASALoaderUtils.parseString(row[14]),
                    CASALoaderUtils.parseString(row[15]),
                    CASALoaderUtils.parseString(row[16]),
                    CASALoaderUtils.parseString(row[17]),
                    operator_postcode,
                    CASALoaderUtils.parseString(row[19]),
                );

                entry.registeredOperator = OwnerData.create(row[13], operator_add, null);

                retval.push(entry);
            } catch (error) {
                // Should never get here since the above parsing is quite forgiving. Likely this is due
                // to a stream or other interrupt error.
                console.error(`Error reading row ${row} due to ${error.message}`, error);
            }
        });

        return retval;
    }
}
