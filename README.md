
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
import { RegistrationData, CASARegisterLoader } from '@cael-aero/casa-utils';

let data:RegistrationData[] = CASARegisterLoader.listAllRegistrations('somefile.xls');
```

## API Examples

TBD

## License

This source code is licensed under the BSD-style license found in the
LICENSE file in the root directory of this source tree. 

## Related Projects

[GFA Utils](https://github.com/CAELAero/gfa-utils) for Gliding Federation of Australia Data
