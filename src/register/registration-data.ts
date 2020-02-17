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

/**
 * Represents all the known data about a single registration entry.
 */
export class RegistrationData {

    /** The registration mark, including VH- prefix */
    mark: string;

    /** The name of the manufacturer of the airframe */
    manufacturer: string;

    /**
     *Country of origin of the manufacturer. This is where the manufacturer resides, but may
     * not represent the actual country where the aircraft was assembled.
     */
    manufacturerCountry: string;

    /** The year the airframe was manufactured in */
    manufactureYear: number;

    /** The airframe type, as defined by the manufacturer. Often no defined. */
    type: string;

    /** The official model name of the aircraft */
    model: string;

    /** The serial number of the airframe */
    serialNumber: string;

    /** Maximum take off weight, in kg */
    mtow: number;

    /** if aircraft has an engine, details here, otherwise undefined */
    engineCount: number;

    /** Data relating to the engines. Not defined if the engine count is zero */
    engine?: EngineData;

    /** The type of registration - interim or full. This is not the category the aircraft is registered under */
    registrationType: RegistrationType;

    /** If the registration type is limited, such as Interim, then an expiry date is set, otherwise undefined */
    registrationExpiryDate: SimpleDate;

    /** True if the registration is currenty suspended. No reason given for the suspension */
    registrationSuspended: boolean;

    /** Date the aircraft was first officially registered in Australia. */
    firstRegisteredDate: SimpleDate;

    /** Registered Operator details */
    registeredOperator: OwnerData;

    /** Registered Holder details */
    registeredHolder: OwnerData;

    /** The type of landing gear the aircraft has. Often unknown */
    landingGear: LandingGearType;

    /** Type of airframe */
    airframeType: AirframeType;

    /** Details of the standard C of A that this airframe is registered under. May be more than one */
    standardCoA: CertificationCategoryType[];

    /** Details of the special C of As that this airframe is registered under. May be more than one */
    specialCoA?: CertificationCategoryType[];

    /**
     * Name of the propellor manufacturer, if known. Often is not known and substitute
     * text used, particularly in powered sailplanes
     */
    propellerManufacturer: string;

    /** Model of the propellor, if known */
    propellerModel: string;

    /** Internal CASA identifier of the type certificate issued, if known */
    typeCertificateNumber: string;
}
