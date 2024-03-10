/* eslint-env node */
/* eslint-disable no-console */

import * as fs from 'fs';
import chalk from 'chalk';

import { params } from './params.mjs';

export function updateFiles() {

  const log = console.log;

  // package.json
  params.packageJsonContent.version = params.newVersion;
  fs.writeFileSync(params.packageJsonFile, JSON.stringify(params.packageJsonContent, null, '  '));

  // file twig
  if(params.cfg.twigVarsFile) {

    let file_content = fs.readFileSync(params.cfg.twigVarsFile, 'utf8');
    file_content = file_content.replace(/vers *: '\d+\.\d+\.\d+(-.*?)?'/, `vers: '${params.newVersion}'`);
    fs.writeFileSync(params.cfg.twigVarsFile, file_content);
    log(chalk.dim(`\nAggiornamento file twig: ${params.cfg.twigVarsFile}`));
  }

  // file html
  if(params.cfg.htmlFiles) {
    params.cfg.htmlFiles.forEach(file => {
      let file_content = fs.readFileSync(file, 'utf8');
      file_content = file_content
        .replace(/(src|href)=("|')(.*?)\.(js|css)(\?|&)(_|v)=\d+\.\d+\.\d+(-(alpha|beta|rc)\.\d+)?/g, `$1=$2$3.$4$5$6=${params.newVersion}`);
      fs.writeFileSync(file, file_content);
      log(chalk.dim(`\nAggiornamento file html: ${file}`));
    });
  }

  // file json
  if(params.cfg.jsonFiles) {
    params.cfg.jsonFiles.forEach(file => {
      fs.writeFileSync(file, JSON.stringify({d: params.log_item.date, v: params.log_item.vers}));
      log(chalk.dim(`\nAggiornamento file JSON: ${file}`));
    });
  }

  // console
  const outputString = `│  👍 Versione aggiornata: ${params.oldVersion} → ${params.newVersion}  │`,
    frameLine = '─'.repeat(outputString.length - 2);

  log(chalk.yellow('\n┌' + frameLine + '┐'));
  log(chalk.yellow(outputString));
  log(chalk.yellow('└' + frameLine + '┘\n'));

}
