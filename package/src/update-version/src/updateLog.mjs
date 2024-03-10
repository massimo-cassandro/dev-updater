/* eslint-env node */
/* eslint-disable no-console */

import * as fs from 'fs';
import { params } from './params.mjs';

export function updateLog() {

  let row = params.log_item.date + ' | ' +
    (' '.repeat(16) + params.log_item.vers).slice(-16) + ' | ' +
    (params.log_item.descr !== null? params.log_item.descr : '');

  fs.appendFileSync(params.logFile, row + '\n');
}
