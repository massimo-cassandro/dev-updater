
# Update Version

Legge la versione registrata in `package.json`, la aggiorna e mantine un file di log.

Ogni aggiornamento aggiunge una riga al file `changelog.md` posizionato sulla root del progetto. Ogni riga contiene la data, la versione aggiornata  e opzionalmente un testo descrittivo.

Il numero di versione aggiornato e il testo descrittivo vengono copiati nella clipboard per velocizzare l'inserimento dei commenti dell'eventuale commit successivo. 

Utilizzo:

```bash
npx update-version <opzioni>
```

Opzioni:

* `--pkg`: percorso del file `package.json` rispetto alla dir corrente (default: `./package.json`)
* `--log-file`: percorso del file di log rispetto alla dir corrente (default: `./changelog.md`). Se il nome del file termina con `.txt`, si assume che il tipo di log prescelto sia quello della versione precedente di `update-version`, in cui ogni riga è nella forma `timestamp | versione | descrizione`
* `--log-patch`: se presente, nel log vengono registrate anche le modifiche patch

### Breaking changes - Versione 3

* log in formato markdown
* eliminato il file di config, tutte le configurazioni ora vanno inserite via CLI
* Registra nel log solo le versioni minor e major e opzionalmente i patch, il resto rimane uguale. Non gestisce più  le prerelease 

### Conversione dal precedente formato

Utilizza lo script `convert-changelog.mjs` per convertire i changelog della verione precedente in formato markdown. Per l'uso vedi i commenti all'interno dello script.

