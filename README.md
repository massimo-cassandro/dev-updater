# Dev updaters

Utilità per lo sviluppo

## Update packages

Esegue `npm update` per tutti i packeges installati all'interno di `node_modules/@massimo-cassandro`.

Utilizzo:

```bash
npx upd@m
```


## Update Version

Legge la versione registrata in `package.json` e la aggiorna. Opzionalmente aggiorna anche altri file legati al numero di versione.

Ogni aggiornamento aggiunge una riga al file `changelog.txt` posizionato sulla root del progetto. Ogni riga contiene la data, la versione aggiornata  e opzionalmente un testo descrittivo.

Il numero di versione aggiornato e il testo descrittivo vengono copiati nella clipboard per velocizzare l'inserimento dei commenti dell'eventuale commit successivo. 

A partire dalla versione 1.9.x sono gestite anche le versioni di pre-release `alpha`, `beta` e `rc` (es. `1.0.0-rc.1`). Se viene scelto di aggiungere un tag di pre-release si potrà scegliere di associarlo alla *major* o alla *minor version*, mentre la *patch version* viene impostata a `0`.

Se un tag pre-release viene rilevato nella versione corrente, si può scegliere, se aggiornarlo, cambiarlo con altro tag (resettando la versione pre-release a `0`) o eliminarlo del tutto.

Utilizzo:

```bash
npx update-version --config=./dev-utilities.config.mjs
```

Il comando può essere eseguito anche senza installare il package:

```
npx --package=@massimo-cassandro/dev-utilities update-version
```

In cui  `--config=<path>` indica il percorso al file `.mjs` di configurazione generale (vedi sotto). Il file deve esportare un oggetto con la proprietà `updateVersion`. Se il path non viene specificato, il percorso di default è `./dev-utilities.config.mjs`.

Se il file non viene trovato, vengono utilizzate le impostazioni di default.


Esempio di file di configurazione (file `dev-utilities.config.mjs`):

```javascript

const config = {
  /*
    Configurazione per `update-version`
    Nessun parametro è obbligatorio
  */
  updateVersion: {
    twigVarsFile     : null,   // default null
    htmlFiles        : null,   // default null
    skipDescrPrompt  : false,  // default false
    patchOnly        : false,  // default false
    defaultDescr     : null    // default null
  }
};

export default config;
```


Nel dettaglio:

```javascript
const config = {
  updateVersion: {
     
    /*
      percorso al file twig che contiene l'array di variabili globali  `glob_vars` che contiene a sua volta l'elemento `vers` che viene impostato col valore assegnato alla proprietà `version` di `packege.json`
      (default null)
    */
    twigVarsFile: 'path/to/file/config.html.twig',

    /*
      cerca la stringa `(?|&)(_|v)=1.2.3(-\d+)` associata ai tag che richiamano file js o css all'interno dei file html specificati e aggiorna il numero di versione
      (default null)
    */
    htmlFiles: ['path/to/html_file1.html', 'path/to/html_file2', ...],
    
    /*
      array di percorsi di file json da aggiornare con un ogetto di questo tipo:
      `{"d": "<dataiso>", "v": "<versione>"}`
    */
    jsonFiles: ['path/to/file1.json', 'path/to/file2.json', ...],

    /*
      testo descrittivo di default mostrato tra le opzioni di aggiornamento
      (default null)
    */
    defaultDescr: 'text',

    /*
      se impostato su `true` non viene mostrato il prompt con la richiesta del testo descrittivo (default false). 
      Questa impostazione può essere sovrascritta dalla presenza del parametro CLI `--skip-descr-prompt`
    */
    skipDescrPrompt: true | false,

    /*
      fa in modo che sia aggiornata direttamente la patch  version saltando l'opzione di scelta relativa (default false). 
      Questa impostazione può essere sovrascritta dalla presenza del parametro CLI `--patch-only`
    */
    patchOnly: true | false

  }
}
```

Tutti parametri sono opzionali

### Parametri CLI
Opzionalmente, alcuni parametri possono essere definiti direttamente via CLI:

```bash
npx update-version \ 
  --html-files=path/to/html_file1.html,path/to/html_file2.html,... \
  --json-files=path/to/file1.json,path/to/file2.json,... \
  --twig-vars-file=path/to/file/config.html.twig \
  --default-descr=text \
  --skip-descr-prompt \
  --patch-only
```

I parametri 

* `--twig-vars-file`
* `--html-files`
* `--default-descr`

vengono ignorati se il parametro `--config` è presente, mentre i parametri 

* `--patch-only`
* `--skip-descr-prompt`

se presenti, prevalgono sulle eventuali impostazioni presenti nel file di configurazione


## Utilizzo nella sezione script del file `package.json`

```json
{
  "scripts": {
     "update-version": "npx update-version --config=./dev-utilities.config.mjs",
     "upd@m": "npx upd@m"
  }
}
```
