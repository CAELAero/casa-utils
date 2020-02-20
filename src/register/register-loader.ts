/*
 * Copyright (c) 2020, Justin Couch
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ParsingOptions, readFile, WorkBook, utils, SSF } from 'xlsx';

import { RegistrationData } from './registration-data';
import { RegistrationType } from './registration-type';
import { CertificationCategoryType } from './certification-category-type';
import { Address } from './address';
import { OwnerData } from './owner-data';
import { EngineData } from './engine-data';
import { EnumMapper } from './enum-mapper';
import { SimpleDate } from './simple-date';

/**
 * Loader for the CASA aircraft register files. These are CSV files with the
 * column format defined here:
 * https://www.casa.gov.au/standard-page/data-files-field-definitions
 */
export class CASARegisterLoader {
  /**
   * List all the registration entries described by the source file.
   *
   * @param {string} source The path to the file to load. May be absolute or relative path
   * @return The entries found in the file, as parsed.
   */
  public static listAllRegistrations(source: string): RegistrationData[] {
    if (!source) {
      throw new Error('No source given to parse');
    }

    const options = {
      cellDates: false,
    };

    const workbook: WorkBook = readFile(source, options);
    const loaded_data = workbook.Sheets[workbook.SheetNames[0]];

    // Could we find the data? undefined or null here if not. Throw error
    const sheet_data: any[][] = utils.sheet_to_json(loaded_data, {
      header: 1,
      blankrows: false,
      range: 1,
    });

    const retval: RegistrationData[] = [];
    const enum_mapper = new EnumMapper();

    sheet_data.forEach(row => {
      try {
        const entry = new RegistrationData();

        entry.mark = 'VH-' + row[0];
        entry.manufacturer = row[1];
        entry.manufacturerCountry = row[37];
        entry.manufactureYear = parseInt(row[38], 10) || 0;

        entry.type = row[2];
        entry.model = row[3];
        entry.serialNumber = row[4].toString();
        entry.mtow = parseInt(row[5], 10) || 0;
        entry.engineCount = parseInt(row[6], 10) || 0;

        if (entry.engineCount > 0) {
          const eng_data = EngineData.create(row[7], row[8], row[9].toString(), row[10]);
          entry.engine = eng_data;
        }

        entry.registrationType = enum_mapper.lookupRegistration(row[11]);
        entry.registrationSuspended = row[40] === 'Suspended';

        entry.firstRegisteredDate = CASARegisterLoader.parseDate(row[28]);
        entry.registrationExpiryDate = CASARegisterLoader.parseDate(row[29]);

        entry.landingGear = enum_mapper.lookupLandingGear(row[29]);
        entry.airframeType = enum_mapper.lookupAirframe(row[30]);

        if (row[34] !== 'AIRCRAFT NOT FITTED WITH PROPELLER') {
          entry.propellerManufacturer = row[34].trim();
        }

        if (row[35] !== 'NOT APPLICABLE') {
          entry.propellerModel = row[35].trim();
        }

        entry.typeCertificateNumber = row[36];

        const holder_postcode = row[17] ? row[17].toString().padStart(4, '0') : null;
        const holder_add = Address.create2Line(
          row[13].trim(),
          row[14],
          row[15].trim(),
          row[16].trim(),
          holder_postcode,
          row[18].trim(),
        );
        const holder_date = CASARegisterLoader.parseDate(row[19]);

        entry.registeredHolder = OwnerData.create(row[12], holder_add, holder_date);

        const operator_postcode = row[25] ? row[25].toString().padStart(4, '0') : null;
        const operator_add = Address.create2Line(
          row[21].trim(),
          row[22],
          row[23].trim(),
          row[24].trim(),
          operator_postcode,
          row[26].trim(),
        );
        const operator_date = CASARegisterLoader.parseDate(row[27]);

        entry.registeredOperator = OwnerData.create(row[20], operator_add, operator_date);

        entry.standardCoA = CASARegisterLoader.parseCertCategories(enum_mapper, row[31]);
        entry.specialCoA = CASARegisterLoader.parseCertCategories(enum_mapper, row[32]);

        retval.push(entry);
      } catch (error) {
        // Should never get here since the above parsing is quite forgiving. Likely this is due
        // to a stream or other interrupt error.
        console.error(`Error reading row ${row} due to ${error.message}`, error);
      }
    });

    return retval;
  }

  private static parseDate(excelDate: number): SimpleDate {
    let retval = null;

    if (excelDate) {
      const date_data = SSF.parse_date_code(excelDate);

      retval = new SimpleDate(date_data.d, date_data.m, date_data.y);
    }

    return retval;
  }

  private static parseCertCategories(mapper: EnumMapper, raw: string): CertificationCategoryType[] {
    if (!raw) {
      return undefined;
    }

    const retval: CertificationCategoryType[] = [];

    // General format is "Active (type1; type2;...)". Strip the leading and brackets.
    if (raw.startsWith('Active ')) {
      const bracket_data = raw.substring(8, raw.length - 1);
      const parts = bracket_data.split(';');

      parts.forEach(t => {
        retval.push(mapper.lookupCertificationCategory(t));
      });
    }

    return retval;
  }
}
