import { params } from './params.mjs';

/*
  versionArray = [major, minor, patch, pre-relase-tag, pre-release-vers]
                    0      1      2          3                4           <== idx

  `pre-relase-tag` e `pre-release-vers` possono non essere presenti
  `pre-relase-tag` è uno dei valori di `params.preRealeaseTags`
  tutti gli elementi sono numeri tranne `pre-relase-tag`
*/

export function updateVersion(mode) {


  if(mode === 'major') {
    params.versionArray[0]++;
    params.versionArray[1] = 0;
    params.versionArray[2] = 0;

  } else if(mode === 'minor') {
    params.versionArray[1]++;
    params.versionArray[2] = 0;

  } else if( mode === 'patch') {
    params.versionArray[2]++;

  } else if( mode === 'upd-prerelease') {
    params.versionArray[4]++;

  } else if( mode === 'remove-prerelease') {
    params.versionArray = params.versionArray.slice(0,3);

  } else if (/^switch-prerelease-/.test(mode)) { // switch-prerelease-${tag}
    params.versionArray[3] = mode.replace(/^switch-prerelease-/, '');
    params.versionArray[4] = 1;

  } else if (/^add-pre\|(major|minor)\|/.test(mode)) { // add-pre|major|${tag} / add-pre|minor|${tag}

    const [,version, tag] = mode.split('|');

    if(version === 'major') {
      params.versionArray[0]++;
      params.versionArray[1] = 0;
      params.versionArray[2] = 0;

    } else if(version === 'minor') {
      params.versionArray[1]++;
      params.versionArray[2] = 0;
    }

    params.versionArray.push(tag, 1);

  } /* else if(mode === 'start-proj') {
    // nessuna modifica
  } */

  params.newVersion = params.versionArray.slice(0,3).join('.') +
    (params.versionArray.length > 3? `-${params.versionArray.slice(3).join('.')}` : '');


}
