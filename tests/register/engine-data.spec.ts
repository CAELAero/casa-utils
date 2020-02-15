/*
 * Copyright (c) 2020, Justin Couch
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { EngineData } from '../../src/register/engine-data';
import { EngineType } from '../../src/register/engine-type';
import { FuelType } from '../../src/register/fuel-type';

describe("Basic Construction", () => {
    it("Can construct the empty class", () => {
        expect(new EngineData()).toBeTruthy();
    });

    it("Can construct the class from a factory", () => {
        const expectedManufacturer = "MyEngineCo";
        const expectedType = EngineType.PISTON;
        const expectedModel = "1200GTZ";
        const expectedFuel = FuelType.DIESEL;

        let result = EngineData.create(expectedManufacturer, expectedType, expectedModel, expectedFuel);

        expect(result).toBeTruthy();
        expect(result.manufacturer).toBe(expectedManufacturer);
        expect(result.engineType).toBe(expectedType);
        expect(result.model).toBe(expectedModel);
        expect(result.fuelType).toBe(expectedFuel);
    });
});
