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
export declare class CASALoaderUtils {
    static parseString(src: string): string;
    static parseDate(excelDate: number): SimpleDate;
    static parseCertCategories(mapper: EnumMapper, raw: string): CertificationCategoryType[];
}
//# sourceMappingURL=casa-loader-utils.d.ts.map