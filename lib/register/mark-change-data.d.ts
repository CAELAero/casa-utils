import { RegistrationBaseData } from './registration-base-data';
import { SimpleDate } from './simple-date';
/**
 * Represents a change in registration of an aircraft - either an addition or
 * return to the register after being deregistered. A smaller subset of the basic
 * registration as it doesn't care about engines etc.
 */
export declare class MarkChangeData extends RegistrationBaseData {
    /** Effective Date of deregistration */
    effectiveDate: SimpleDate;
    /** The old registration mark prior to this one, including VH- prefix */
    oldMark: string;
}
//# sourceMappingURL=mark-change-data.d.ts.map