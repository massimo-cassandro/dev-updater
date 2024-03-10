/* eslint-env node */
/* eslint-disable no-console */

import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';

export default async function (configFile, property) {

  configFile = path.resolve('./', configFile || './dev-utilities.config.mjs');
  // configFile = configFile || './dev-utilities.config.mjs';
  try {

    if(!fs.existsSync(configFile)) {
      throw `\n-------------\n${configFile} non trovato.\n--------------\n`;
    }

    const {default: cfg} = await import(configFile);

    if(!cfg[property]) {
      throw `Proprietà '${property}' non presente.`;
    }

    return cfg[property];

  } catch(e) {
    console.error( chalk.red( e ) ); // eslint-disable-line
    return false;
  }
}
