/* eslint-env node */
/* eslint-disable no-console */

import * as fs from 'fs';
import * as path from 'path';
// https://nodejs.org/api/util.html#utilstyletextformat-text-options
import { styleText } from 'node:util';

export default async function (configFile) {

  configFile = path.resolve('./', configFile || './dev-utilities.config.mjs');
  // configFile = configFile || './dev-utilities.config.mjs';
  try {

    if(!fs.existsSync(configFile)) {
      throw `\n-------------\n${configFile} non trovato.\n--------------\n`;
    }

    const {default: cfg} = await import(configFile);

    return cfg;

  } catch(e) {
    console.error( styleText(['red'], e ) );

    return false;
  }
}
