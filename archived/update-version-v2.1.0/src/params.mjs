/* eslint-env node */
/* eslint-disable no-console */

export const params = {

  // defaults configurazione
  cfgDefaults: {
    twigVarsFile     : null,
    htmlFiles        : null,
    jsonFiles        : null,
    skipDescrPrompt  : false,
    patchOnly        : false,
    defaultDescr     : null,
    logFile          : './changelog.txt',
    packageJsonFile  : './package.json',
  },

  preRealeaseTags: ['alpha', 'beta', 'rc'],

  log_item: {
    vers: null,
    date: new Date().toISOString(),
    descr: null
  },

  // parametri elaborati
  cfg                 : {}, // oggetto config elaborato
  packageJsonContent  : {}, // viene impostato con l'oggetto ricavato da package.json
  preRelease          : false, // se prerelease viene impostato con il valore del tag relativo
  oldVersion          : null, // versione originale
  versionArray        : [], // array con i componenti della versione
  newVersion          : null // versione aggiornata
};
