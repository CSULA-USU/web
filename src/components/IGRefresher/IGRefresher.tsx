import { fetchToken, refreshInstagramToken, updateSupabaseToken } from 'api';

import * as schedule from 'node-schedule';

export const IGRefresher = () => {
  const tokens = [
    'IG_TOKEN_CSI',
    'IG_TOKEN_CLSRC',
    'IG_TOKEN_CCC',
    'IG_TOKEN_RECREATION',
    'IG_TOKEN_USU',
    'IG_TOKEN_GRAFFIX',
    'IG_TOKEN_APISRC',
    'IG_TOKEN_GSRC',
    'IG_TOKEN_PASRC',
  ];

  // schedule.scheduleJob('0 0 */55 * *', async () => {
  //    await fetchToken('IG_TOKEN_GRAFFIX')
  //     .then((data) => data[0].token)
  //     .then(async (oldToken) => {
  //       await refreshInstagramToken(oldToken)
  //         .then((newToken) => newToken.access_token)
  //         .then(async (newToken) => {
  //           await updateSupabaseToken(newToken, 'IG_TOKEN_GRAFFIX');
  //         });
  //     });
  // });

  //schedule test
  schedule.scheduleJob('*/1 * * * *', () => {
    tokens.map(async (tokenName) => {
      await fetchToken(tokenName)
        .then((data) => data[0].token)
        .then(async (oldToken) => {
          await refreshInstagramToken(oldToken)
            .then((newToken) => newToken.access_token)
            .then(async (newToken) => {
              await updateSupabaseToken(newToken, tokenName);
            });
        });
    });
  });
  return <></>;
};
