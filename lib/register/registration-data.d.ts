import { RegistrationBaseData } from './registration-base-data';
import { EngineData } from './engine-data';
import { RegistrationType } from './registration-type';
import { LandingGearType } from './landing-gear-type';
import { AirframeType } from './airframe-type';
import { CertificationCategoryType } from './certification-category-type';
import { SimpleDate } from './simple-date';
/**
 * Represents all the known data about a single registration entry.
 */
export declare class RegistrationData extends RegistrationBaseData {
    /**
     * Country of origin of the manufacturer. This is where the manufacturer resides, but may
     * not represent the actual country where the aircraft was assembled.
     */
    manufacturerCountry: string;
    /** The year the airframe was manufactured in. Set to 0 if the raw data has an error or is not provided.  */
    manufactureYear: number;
    /** The airframe type, as defined by the manufacturer. Often no defined. */
    type: string;
    /** Maximum take off weight, in kg. Set to 0 if the raw data has an error or is not provided. */
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
//# sourceMappingURL=registration-data.d.ts.map