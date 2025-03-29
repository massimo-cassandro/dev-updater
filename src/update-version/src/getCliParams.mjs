export function getCliParams() {
  const cli_cfg = {};
  let config_file = null;
  process.argv.forEach(param => {

    if(/^--config/.test(param)) {
      config_file = param.split('=')[1].trim();
    }

    if(/^--twig-vars-file/.test(param)) {
      [, cli_cfg.twigVarsFile] = param.split('=');
    }

    if(/^--html-files/.test(param)) {
      [, cli_cfg.htmlFiles] = param.split('=');
      cli_cfg.htmlFiles = cli_cfg.htmlFiles.split(',');
    }

    if(/^--json-files/.test(param)) {
      [, parsedCfg.jsonFiles] = param.split('=');
      cli_cfg.jsonFiles = cli_cfg.jsonFiles.split(',');
    }

    if(/^--default-descr=(.*?)$/.test(param)) {
      [, cli_cfg.defaultDescr] = param.split('=');
    }

    if(/^--skip-descr-prompt=(.*?)$/.test(param)) {
      cli_cfg.skipDescrPrompt = true;
    }

    if(/^--patch-only=(.*?)$/.test(param)) {
      cli_cfg.patchOnly = true;
    }

    if(/^--package-json-file=(.*?)$/.test(param)) {
      [, cli_cfg.packageJsonFile] = param.split('=');
    }

    if(/^--log-file=(.*?)$/.test(param)) {
      [, cli_cfg.logFile] = param.split('=');
    }

  });

  return [
    config_file,
    cli_cfg
  ];
}
