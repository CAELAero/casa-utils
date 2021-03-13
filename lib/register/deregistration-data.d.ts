import { RegistrationBaseData } from './registration-base-data';
import { SimpleDate } from './simple-date';
/**
 * Represents a deregistration of a mark. A smaller subset of the basic
 * registration as it doesn't care about engines etc.
 */
export declare class DeregistrationData extends RegistrationBaseData {
    /** Effective Date of deregistration */
    effectiveDate: SimpleDate;
    /** The reason for deregistration */
    reason: string;
}
//# sourceMappingURL=deregistration-data.d.ts.map