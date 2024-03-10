import select from '@inquirer/select';
import input from '@inquirer/input';
import { params } from './params.mjs';


// TODO aggiornare inquirer

// https://github.com/SBoudrias/Inquirer.js#inquirer
export async function chooser() {

  let choices_array;

  if(params.preRelease === false) {
    choices_array = [
      {
        name: 'Aggiorna la patch version',
        value: 'patch',
      },
      {
        name: 'Aggiorna la minor version',
        value: 'minor',
      },
      {
        name: 'Aggiorna la major version',
        value: 'major',
      },
      {
        name: 'Aggiorna la minor version + pre-release',
        value: 'minor+pre',
      },
      {
        name: 'Aggiorna la major version + pre-release',
        value: 'major+pre',
      },
      {
        name: 'Annulla',
        value: null,
      }
    ];


  } else {
    choices_array = [
      {
        name: `Aggiorna la pre-release attuale (${params.preRelease})`,
        value: 'upd-prerelease'
      },
      {
        name: 'Rimuovi pre-release',
        value: 'remove-prerelease'
      }
    ].concat(
      params.preRealeaseTags.filter(tag =>
        tag !== params.preRelease && params.preRealeaseTags.indexOf(tag) > params.preRealeaseTags.indexOf(params.preRelease )
      )
        .map(tag => {
          return {
            name: `Passa alla pre-release “${tag}”`,
            value: `switch-prerelease-${tag}`
          };
        })
    );
  }

  if( params.startProj ) {
    choices_array.unshift({
      name: `Crea file changelog con la versione attuale (${params.oldVersion})`,
      value: 'start-proj'
    });
  }

  return await (async() => {

    if(params.cfg.patchOnly) {

      return {
        mode: params.preRelease === false? 'patch' : 'upd-prerelease'
      };

    } else {

      return await select({
        type: 'list',
        default: 0,
        name: 'mode',
        message: 'Aggiorna:',
        choices: choices_array
      })
        .then( answer => {

          if(/\+pre$/.test(answer)) {

            return (async () => {

              return await select({
                type: 'list',
                name: 'tag',
                message: 'Pre-release tag:',
                default: 3,
                choices: params.preRealeaseTags.map(tag => {
                  return {
                    name: tag,
                    value: tag
                  };
                })
                  .concat([
                    {
                      name: 'Annulla',
                      value: null,
                    }
                  ])
              })
                .then((answerTag) => {

                  if(answerTag !== null) {

                    answer = 'add-pre|' + answer.replace('+pre', `|${answerTag}`);
                  } else {
                    answer = null;
                  }
                  return answer;

                });
            })();

          } else {
            return answer;
          }
        });

    } // end else if patchOnly

  })()
    .then( answer => {


      if(answer !== null) {

        if(!params.cfg.skipDescrPrompt) {

          return (async () => {

            return await input({
              message: 'Descrizione: ',
              default() {
                return params.cfg.defaultDescr;
              }
            })
              .then((descr) => {
                params.log_item.descr = descr.trim() || null;
                return answer;
              });

          })();

        } else {
          return answer;
        }

      } else {
        return null;
      }
    });
}
