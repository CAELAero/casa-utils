/*
 * Copyright (c) 2020, Justin Couch
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Address, AirframeType, CertificationCategoryType } from '../src/index';
import { DeregistrationData ,CASADeregistrationLoader } from '../src/index';
import { EngineData, EngineType, FuelType } from '../src/index';
import { HolderOrOperatorChangeData, CASAHolderOrOperatorChangeLoader } from '../src/index';
import { LandingGearType, OwnerData } from '../src/index';
import { MarkChangeData, CASAMarkChangeLoader } from '../src/index';
import { RegistrationBaseData,  RegistrationChangeData, CASARegistrationChangeLoader } from '../src/index';
import { RegistrationData, CASARegistrationLoader } from '../src/index';
import { RegistrationType, SimpleDate } from '../src/index';

describe('Module export tests', () => {
    it('exports all files correctly', () => {
        expect(Address).toBeTruthy();
        expect(AirframeType).toBeTruthy();
        expect(CertificationCategoryType).toBeTruthy();
        expect(DeregistrationData).toBeTruthy();
        expect(CASADeregistrationLoader).toBeTruthy();
        expect(EngineData).toBeTruthy();
        expect(EngineType).toBeTruthy();
        expect(FuelType).toBeTruthy();
        expect(HolderOrOperatorChangeData).toBeTruthy();
        expect(CASAHolderOrOperatorChangeLoader).toBeTruthy();
        expect(LandingGearType).toBeTruthy();
        expect(OwnerData).toBeTruthy();
        expect(MarkChangeData).toBeTruthy();
        expect(CASAMarkChangeLoader).toBeTruthy();
        expect(RegistrationBaseData).toBeTruthy();
        expect(RegistrationChangeData).toBeTruthy();
        expect(CASARegistrationChangeLoader).toBeTruthy();
        expect(RegistrationData).toBeTruthy();
        expect(CASARegistrationLoader).toBeTruthy();
        expect(RegistrationType).toBeTruthy();
        expect(SimpleDate).toBeTruthy();
    });
});
