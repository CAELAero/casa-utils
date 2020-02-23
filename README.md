
# CAEL Aero CASA Utils

> Utilities for interacting with [CASA](https://www.casa.gov.au/) files and systems. 

![npm type definitions](https://img.shields.io/npm/types/@cael-aero/casa-utils)
![node](https://img.shields.io/node/v/@cael-aero/casa-utils)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
![GitHub package.json version](https://img.shields.io/github/package-json/v/CAELAero/casa-utils)
[![Build Status](https://travis-ci.com/CAELAero/casa-utils.svg?branch=master)](https://travis-ci.com/CAELAero/casa-utils)
[![Coverage Status](https://coveralls.io/repos/github/CAELAero/casa-utils/badge.svg)](https://coveralls.io/github/CAELAero/casa-utils)

## Documentation

* Repository https://github.com/CAELAero/casa-utils
* API Documentation: https://caelaero.github.io/casa-utils/
* CASA Aircraft Register Data Files: https://www.casa.gov.au/aircraft/civil-aircraft-register/aircraft-register-data-files
* CASA Aircraft Register Update Data Files: https://www.casa.gov.au/standard-page/update-data-files
 
## Installation

```sh
npm install @cael-aero/casa-utils --save
yarn add @cael-aero/casa-utils
bower install @cael-aero/casa-utils --save
```                                      

## Usage

```javascript
var casaUtils = require('@cael-aero/casa-utils');
var data = casaUtils.listAllRegistrations('somefile.xls');
```

### TypeScript
```typescript
import { RegistrationData, CASARegistrationLoader } from '@cael-aero/casa-utils';

let data:RegistrationData[] = CASARegistrationLoader.listAllRegistrations('somefile.xls');
```

## API Examples

### Read Registration Data

Download the complete registration data file from here: https://www.casa.gov.au/aircraft/civil-aircraft-register/aircraft-register-data-files

```typescript
import { RegistrationData, CASARegistrationLoader } from '@cael-aero/casa-utils';

let data:RegistrationData[] = CASARegistrationLoader.listAllRegistrations('aircraftreg_2020.xls');
```

### Read Deregistration Data

Download the complete deregistation data file from here: https://www.casa.gov.au/standard-page/update-data-files 

```typescript
import { DeregistrationData, CASADeregistrationLoader } from '@cael-aero/casa-utils';

let data:DeregistrationData[] = CASADeregistrationLoader.listAllDeregistrations('somefile.csv');
```

### Read New and Returning Registration data

Download the complete adds and returns data file from here: https://www.casa.gov.au/standard-page/update-data-files 
 
```typescript
import { RegistrationChangeData, CASARegistrationChangeLoader } from '@cael-aero/casa-utils';

let data:RegistrationChangeData[] = CASARegistrationChangeLoader.listAllRegistrationChanges('somefile.csv');
```

### Read RH and RO changes

Download the complete registered holder or registered operation data file from here: https://www.casa.gov.au/standard-page/update-data-files 
 
```typescript
import { HolderOrOperatorChangeData, CASAHolderOrOperatorChangeLoader } from '@cael-aero/casa-utils';

let data:HolderOrOperatorChangeData[] = CASAHolderOrOperatorChangeLoader.listAllChanges('somefile.csv');
```

### Read registration mark changes to the register data

Download the complete registration mark data file from here: https://www.casa.gov.au/standard-page/update-data-files 
 
```typescript
import { MarkChangeData, CASAMarkChangeLoader } from '@cael-aero/casa-utils';

let data:MarkChangeData[] = CASAMarkChangeLoader.listAllMarkChanges('somefile.csv');
```

## License

This source code is licensed under the BSD-style license found in the
LICENSE file in the root directory of this source tree. 

## Related Projects

[GFA Utils](https://github.com/CAELAero/gfa-utils) for Gliding Federation of Australia Data
