#!/usr/bin/env node

/* eslint-env node */
/* eslint-disable no-console */

// shell: npm info YOUR_PACKAGE version
import * as fs from 'fs';
import * as path from 'path';
import clipboard from 'clipboardy';
import { styleText } from 'node:util';

import getConfig from './src/getConfig.mjs';
import { getCliParams } from './src/getCliParams.mjs';
import { params } from './src/params.mjs';
import { updateLog } from './src/updateLog.mjs';
import { updateFiles } from './src/updateFiles.mjs';
import { updateVersion } from './src/updateVersion.mjs';
import { chooser } from './src/chooser-inquirer.mjs';


// https://nodejs.org/api/util.html#utilstyletextformat-text-options
// https://github.com/SBoudrias/Inquirer.js


// se true non scrive nulla ma restituisce in console l'oggetto dei parametri elaborati
const debug = false;

try {

  // =>> parametri CLI
  const [config_file, cli_cfg] = getCliParams();


  // =>> lettura e creazione oggetto di configurazione (params.cfg)
  let loadedCfg = {};

  if(config_file) {

    loadedCfg = await getConfig(config_file);

    if(loadedCfg === false) {
      throw 'Errore nella lettura del file di configurazione';
    }

    // risoluzione eventuali path presenti in loadedCfg e non presenti in cli_cfg
    ['packageJsonFile', 'logFile', 'twigVarsFile', 'htmlFiles', 'jsonFiles'].forEach(el => {
      if(params.cfg[el] && !cli_cfg[el]) {
        if(typeof loadedCfg[el] === 'string') {
          loadedCfg[el] = path.resolve(config_file, loadedCfg[el]);

        } else if(Array.isArray(loadedCfg[el])) {
          loadedCfg[el] = loadedCfg[el].map(file => {
            return path.resolve(config_file, file);
          });
        }
      }
    });
  }
  params.cfg = {...params.cfgDefaults, ...(loadedCfg?? {}), ...(cli_cfg?? {})};


  // =>> init

  // lettura versione e inizializzazione variabili
  params.preRelease = false;

  // avvio nuovo progetto (changelog.txt non presente):
  // viene aggiunta l'opzione di utiilizzare la versione package json corrente
  params.startProj = !fs.existsSync(params.cfg.logFile);

  // forzatura di alcune parametri per l'avvio di nuovi progetti
  if(params.startProj) {
    params.cfg.defaultDescr = 'Setup';
    params.cfg.skipDescrPrompt = false;
    params.cfg.patchOnly = false;
  }

  if(!fs.existsSync(params.cfg.packageJsonFile)) {
    throw `File '${params.cfg.packageJsonFile}' non trovato`;
  }

  let file_content = fs.readFileSync(params.cfg.packageJsonFile, 'utf8');
  params.packageJsonContent = JSON.parse(file_content);

  params.oldVersion = params.packageJsonContent.version?.toLowerCase();

  if(!params.oldVersion) {
    throw `Proprietà 'version' di '${params.cfg.packageJsonFile}' non presente`;
  } else {
    console.log( styleText(['white', 'dim'], `Versione package.json attuale: ${params.oldVersion}` ) );
  }

  if(params.preRealeaseTags.some(tag => params.oldVersion.indexOf(`-${tag}.`) !== -1 )) {

    const temp = params.oldVersion.split('-');
    params.versionArray = temp[0].split('.').map((i) => +i);
    params.versionArray = params.versionArray.concat(
      temp[1].split('.').map((i) => (isNaN(i) ? i : +i))
    );

    params.preRelease = params.versionArray[3];

  } else {
    params.versionArray = params.oldVersion.split('.').map(i => +i);
  }

  if((params.preRelease === false && params.versionArray.length > 3) ||
    (params.preRelease !== false && params.preRealeaseTags.indexOf(params.preRelease) === -1) // non dovrebbe essere necessario
  ) {
    throw 'Pre-release tag non mappato';
  }


  // =>> avvio

  (async () => {
    const choice = await chooser();
    if(debug) {
      console.log(`\n**********\n${choice}\n**********\n`);
    }
    if(choice) {

      updateVersion(choice);

      params.log_item.vers = params.newVersion;

      if(params.log_item.descr) {
        clipboard.writeSync('v.' + params.log_item.vers + ' - ' + params.log_item.descr);
      }

      if(debug) {
        delete params.packageJsonContent;
        console.log(params);

      } else {
        updateFiles();
        updateLog();
      }
    }
  })();


} catch (err) {
  console.log( styleText(['bgRed'], ` ${err} ` ));
}

