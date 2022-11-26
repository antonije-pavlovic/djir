/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const swaggerJson = require('../dist/src/docs/index');

fs.writeFileSync('swagger.json', JSON.stringify(swaggerJson.default), 'utf8');
