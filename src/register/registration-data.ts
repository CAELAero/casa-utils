/*
 * Copyright (c) 2020, Justin Couch
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { OwnerData } from "./owner-data";
import { EngineData } from "./engine-data";

import { RegistrationType } from "./registration-type";
import { LandingGearType } from "./landing-gear-type";
import { AirframeType } from "./airframe-type";
import { CertificationCategoryType } from "./certification-category-type";

import { SimpleDate } from "./simple-date";

export class RegistrationData {
    mark: string;
    manufacturer: string;
    manufacturerCountry: string;
    manufactureYear: number;

    type: string;
    model: string;
    serialNumber: string;

    /** Maximum take off weight, in kg */
    mtow: number;

    /** if aircraft has an engine, details here, otherwise undefined */
    engineCount: number;
    engine?: EngineData;

    registrationType: RegistrationType;
    registrationExpiryDate: SimpleDate;
    registrationSuspended: boolean;

    firstRegisteredDate: SimpleDate;

    registeredOperator: OwnerData;
    registeredHolder: OwnerData;

    landingGear: LandingGearType;
    airframeType: AirframeType;
    standardCoA: CertificationCategoryType[];
    specialCoA?: CertificationCategoryType[];

    propellerManufacturer: string;
    propellerModel: string;
    typeCertificateNumber: string;
}
