import { RegistrationBaseData } from './registration-base-data';
import { SimpleDate } from './simple-date';
/**
 * Represents a change in registration of an aircraft - either an addition or
 * return to the register after being deregistered. A smaller subset of the basic
 * registration as it doesn't care about engines etc.
 */
export declare class RegistrationChangeData extends RegistrationBaseData {
    /** True if this is a new registration, false if this is a return */
    isNewRegistration: boolean;
    /** Effective Date of deregistration */
    effectiveDate: SimpleDate;
}
//# sourceMappingURL=registration-change-data.d.ts.map