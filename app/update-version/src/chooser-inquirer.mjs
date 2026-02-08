import select from '@inquirer/select';
import input from '@inquirer/input';
import * as fs from 'fs';
import { params } from './params.mjs';

export async function chooser() {
  const choices = [
    { name: 'Aggiorna Major version', value: 'major' },
    { name: 'Aggiorna Minor version', value: 'minor' },
    { name: 'Aggiorna Patch version', value: 'patch' }
  ];

  // Se il file di log non esiste, proponi l'inizializzazione
  if (!fs.existsSync(params.logFile)) {
    choices.unshift({
      name: `Inizializza Changelog (v${params.oldSemver})`,
      value: 'init'
    });
  }

  choices.push({ name: 'Annulla', value: null });

  const answer = await select({
    message: 'Cosa vuoi aggiornare?',
    choices: choices
  });

  params.addLog = params.toLog.indexOf(answer) !== -1 || answer === 'init';

  if (answer && params.addLog) {
    const descr = await input({
      message: 'Descrizione (opzionale): ',
      default: answer === 'init'
        ? 'Setup'
        : answer === 'patch'
          ? 'Fix'
          : ''
    });
    params.logRow.descr = descr.trim() || null;
  }

  return answer;
}
