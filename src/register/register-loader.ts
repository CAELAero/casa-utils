/*
 * Copyright (c) 2020, Justin Couch
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ParsingOptions, readFile, WorkBook, utils, SSF } from 'xlsx';

import { RegistrationData } from "./registration-data";
import { RegistrationType } from "./registration-type";
import { EngineData } from "./engine-data";
import { EnumMapper } from "./enum-mapper";
import { SimpleDate } from "./simple-date";

/**
 * Loader for the CASA aircraft register files. These are CSV files with the
 * column format defined here:
 * https://www.casa.gov.au/standard-page/data-files-field-definitions
 */
export class CASARegisterLoader {
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
            let entry = new RegistrationData();

            entry.mark = "VH-" + row[0];
            entry.manufacturer = row[1];
            entry.manufacturerCountry = row[37];
            entry.manufactureYear = parseInt(row[38]);

            entry.type = row[2];
            entry.model = row[3];
            entry.serialNumber = row[4].toString();
            entry.mtow = parseInt(row[5]);
            entry.engineCount = parseInt(row[6]);

            if(entry.engineCount > 0) {
                let eng_data = EngineData.create(row[7], row[8], row[9], row[10]);
                entry.engine = eng_data;
            }

            entry.registrationType = enum_mapper.lookupRegistration(row[11]);
            entry.registrationSuspended = row[40] === "Suspended"

            entry.firstRegisteredDate = CASARegisterLoader.parseDate(row[28]);
            entry.registrationExpiryDate = CASARegisterLoader.parseDate(row[29]);

            entry.landingGear = enum_mapper.lookupLandingGear(row[29]);
            entry.airframeType = enum_mapper.lookupAirframe(row[30]);

            entry.propellerManufacturer = row[34];
            entry.propellerModel = row[35];
            entry.typeCertificateNumber = row[36];

            retval.push(entry);
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
}
