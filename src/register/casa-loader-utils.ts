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
 */
export class CASALoaderUtils {
    static parseString(src: string): string {
        return src ? src.toString().trim() : undefined;
    }

    static parseDate(excelDate: number): SimpleDate {
        let retval = null;

        if (excelDate) {
            const date_data = SSF.parse_date_code(excelDate);

            retval = new SimpleDate(date_data.d, date_data.m, date_data.y);
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
