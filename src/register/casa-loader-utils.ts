/*
 * Copyright (c) 2020, Justin Couch
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Readable } from 'stream';

import { ParsingOptions, readFile, read, WorkBook } from 'xlsx';

import { CertificationCategoryType } from './certification-category-type';
import { EnumMapper } from './enum-mapper';
import { SimpleDate } from './simple-date';

/**
 * Loader for the CASA aircraft register files. These are CSV files with the
 * column format defined here:
 * https://www.casa.gov.au/standard-page/data-files-field-definitions
 *
 * @internal
 */
export class CASALoaderUtils {
    static parseString(src: any): string {
        const src_type = typeof src;

        if (src_type === 'string' || src_type === 'number') {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
            return src ? src.toString().trim() : undefined;
        } else {
            return undefined;
        }
    }

    static parseDate(isoDate: string): SimpleDate {
        let retval = null;

        if (isoDate) {
            // special case handling for non-US dates where things are done properly - day/month/year. Anything
            // else is parsed correctly by the stock Date object. I could use a real date parsing library 
            // here, but keeping things to a minimum for dependencies and it is the only proper case that 
            // needs to be dealt with outside, so do this inline.
            if (isoDate.indexOf('/') !== -1) {
                const parts = isoDate.split('/');

                const day = parseInt(parts[0], 10);
                const month = parseInt(parts[1], 10);
                const year = parseInt(parts[2], 10);

                retval = new SimpleDate(day, month, year);
            } else {
                const js_date: Date = new Date(isoDate);

                retval = new SimpleDate(js_date.getDate(), js_date.getMonth() + 1, js_date.getFullYear());    
            }
        }

        return retval;
    }

    static parseCertCategories(mapper: EnumMapper, raw: string): CertificationCategoryType[] {
        if (!raw) {
            return undefined;
        }

        const retval: CertificationCategoryType[] = [];
        raw = raw.trim();

        // General format is "Active (type1; type2;...)". Strip the leading and brackets.
        if (raw.startsWith('Active ')) {
            const bracket_data = raw.substring(8, raw.length - 1);
            const parts = bracket_data.split(';');

            parts.forEach((t) => {
                retval.push(mapper.lookupCertificationCategory(t));
            });
        } else {
            retval.push(mapper.lookupCertificationCategory(raw));
        }

        return retval;
    }

    static async readInput(
        source: string | Readable | ReadableStream | Blob,
        isExcel: boolean = false,
    ): Promise<WorkBook> {
        // Need to force raw parsing here since it will mess up the registration dates,
        // which are in internation style dd/mm/yyyy and it converts to american style.
        const options: ParsingOptions = {};

        if (isExcel) {
            options.cellDates = false;
        } else {
            options.raw = true;
        }

        if (typeof source === 'string') {
            return readFile(source, options);
        } else if (source instanceof Readable) {
            // ReadableStream is a derived type of Readable, so we're good here
            return CASALoaderUtils.readStream(source, options);
        } else if (source instanceof ReadableStream) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
            const readable = new Readable().wrap(source as any);
            return CASALoaderUtils.readStream(readable, options);
        } else if (source instanceof Blob) {
            const blob_stream = source.stream();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
            const readable = new Readable().wrap(blob_stream as any);
            return CASALoaderUtils.readStream(readable, options);
        } else {
            throw new Error('Unhandled type of input source');
        }
    }

    private static async readStream(stream: Readable, options: ParsingOptions): Promise<WorkBook> {
        const buffers: Uint8Array[] = [];
        options.type = 'buffer';

        const reader = new Promise<WorkBook>((resolve, reject) => {
            stream.on('data', (data) => {
                if (data instanceof Uint8Array) {
                    buffers.push(data);
                }
            });
            stream.on('end', () => resolve(read(Buffer.concat(buffers), options)));
            stream.on('error', reject);
        });

        return reader;
    }
}
