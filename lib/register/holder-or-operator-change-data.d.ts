import { RegistrationBaseData } from './registration-base-data';
import { SimpleDate } from './simple-date';
/**
 * Represents a change in either the Registered Holder or Registered Operator
 * of an aircraft. If a only one changes, then the other field is left as
 * undefined. That is, if the RO changes, but the RH does not, then
 * this.registeredOperator will have a value, but this.registeredHolder
 * will be undefined;
 */
export declare class HolderOrOperatorChangeData extends RegistrationBaseData {
    /** Effective Date of deregistration */
    effectiveDate: SimpleDate;
}
//# sourceMappingURL=holder-or-operator-change-data.d.ts.map