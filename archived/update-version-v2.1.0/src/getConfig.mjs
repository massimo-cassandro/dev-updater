/* eslint-env node */
/* eslint-disable no-console */

import * as fs from 'fs';
import * as path from 'path';
// https://nodejs.org/api/util.html#utilstyletextformat-text-options
import { styleText } from 'node:util';

// config file può essere una stringa nulla, in questo caso si usa il nome file di default
export default async function (configFile) {

  configFile = path.resolve('./', configFile || 'update-vers.config.mjs');

  // per compatibilità con le versioni precedenti
  if(!fs.existsSync(configFile)) {
    configFile = path.resolve('./', 'dev-utilities.config.mjs');
  }

  try {

    if(!fs.existsSync(configFile)) {
      throw '\n-------------\nFile di configurazione non trovato.\n--------------\n';
    }

    const {default: cfg} = await import(configFile);

    return cfg;

  } catch(e) {
    console.error( styleText(['red'], e ) );

    return false;
  }
}
