import * as fs from 'fs';
import { params } from './params.mjs';

export function updateLogFile() {

  if(params.logRow.fullText) {
    fs.appendFileSync(params.logFile, params.logRow.fullText + '\n');
  }
}
