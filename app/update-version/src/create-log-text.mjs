import { params } from './params.mjs';

export function createLogText() {


  if (params.markdownLog) {

    const dateStr = params.logRow.date.toLocaleString(params.locale, {
      year: 'numeric', month: 'short', day: '2-digit'
    });
    params.logRow.fullText = `* ${params.logRow.vers} (${dateStr})${params.logRow.descr ? ' - ' + params.logRow.descr : ''}`;

    if(params.updateMode === 'init') {
      params.logRow.fullText = '# Changelog\n\n' + params.logRow.fullText;
    }

  } else {

    const dateStr = params.logRow.date.toISOString();
    params.logRow.fullText = `${dateStr} | ${(' '.repeat(16) + params.logRow.vers).slice(-16)} | ${params.logRow.descr || ''}`;

  }



}


