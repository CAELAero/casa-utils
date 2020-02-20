/*
 * Copyright (c) 2020, Justin Couch
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { EngineType } from './engine-type';
import { FuelType } from './fuel-type';

export class EngineData {
  manufacturer: string;
  engineType: EngineType;
  model: string;
  fuelType: FuelType;

  public static create(manufacturer: string, type: EngineType, model: string, fuel: FuelType): EngineData {
    const retval = new EngineData();
    retval.manufacturer = manufacturer;
    retval.engineType = type;
    retval.model = model;
    retval.fuelType = fuel;

    return retval;
  }
}
