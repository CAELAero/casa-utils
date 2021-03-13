/*
 * Copyright (c) 2020, Justin Couch
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { RegistrationBaseData } from './registration-base-data';
/**
 * Represents a change in either the Registered Holder or Registered Operator
 * of an aircraft. If a only one changes, then the other field is left as
 * undefined. That is, if the RO changes, but the RH does not, then
 * this.registeredOperator will have a value, but this.registeredHolder
 * will be undefined;
 */
export class HolderOrOperatorChangeData extends RegistrationBaseData {
}
//# sourceMappingURL=holder-or-operator-change-data.js.map