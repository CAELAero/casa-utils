/*
 * Copyright (c) 2020, Justin Couch
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SSF } from 'xlsx';

import { Address } from './address';
import { CertificationCategoryType } from './certification-category-type';
import { EnumMapper } from './enum-mapper';
import { OwnerData } from './owner-data';
import { SimpleDate } from './simple-date';

/**
 * Loader for the CASA aircraft register files. These are CSV files with the
 * column format defined here:
 * https://www.casa.gov.au/standard-page/data-files-field-definitions
 *
 * @internal
 */
export class CASALoaderUtils {
    static parseString(src: string): string {
        return src ? src.toString().trim() : undefined;
    }

    static parseDate(excelDate: number): SimpleDate {
        let retval = null;

        if (excelDate) {
            const date_data = SSF.parse_date_code(excelDate);
            // Adjust for daylight saving time processing when we are not currently in
            // DST in real time running this code. It will parse the dates as 11pm the
            // day before leaving the dates off by one.
            //
            // TODO: This will still have an error when it is on the month boundary
            //  - it will have the previous month and one too many days for that month.
            // Need a better solution here.
            const dom = (date_data.H == 23) ? date_data.d + 1 : date_data.d;

            retval = new SimpleDate(dom, date_data.m, date_data.y);
        }

        return retval;
    }

    static parseCertCategories(mapper: EnumMapper, raw: string, fname: string): CertificationCategoryType[] {
        if (!raw) {
            return undefined;
        }

        const retval: CertificationCategoryType[] = [];
        raw = raw.trim();

        // General format is "Active (type1; type2;...)". Strip the leading and brackets.
        if (raw.startsWith('Active ')) {
            const bracket_data = raw.substring(8, raw.length - 1);
            const parts = bracket_data.split(';');

            parts.forEach(t => {
                retval.push(mapper.lookupCertificationCategory(t));
            });
        } else {
            retval.push(mapper.lookupCertificationCategory(raw));
        }

        return retval;
    }
}
