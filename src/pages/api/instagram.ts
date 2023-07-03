import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Departments } from 'types';
import { fetchTokens } from 'api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const { org = 'usu' } = req.query;

  let IG_TOKEN_USU = '';
  let IG_TOKEN_GRAFFIX = '';
  let IG_TOKEN_CSI = '';
  await fetchTokens()
    .then((response) => {
      response.map((item: any) => {
        switch (item.name) {
          case 'IG_TOKEN_USU':
            IG_TOKEN_USU = item.token;
            break;
          case 'IG_TOKEN_GRAFFIX':
            IG_TOKEN_GRAFFIX = item.token;
            break;
          case 'IG_TOKEN_CSI':
            IG_TOKEN_CSI = item.token;
            break;
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });

  if (!IG_TOKEN_USU || !IG_TOKEN_GRAFFIX) {
    throw new Error('One or more Instagram auth tokens may be missing');
  }

  /*eslint no-unused-vars: "off"*/
  const tokens: Pick<
    { [key in Departments]: string },
    'usu' | 'graffix' | 'csi'
  > = {
    usu: IG_TOKEN_USU,
    graffix: IG_TOKEN_GRAFFIX,
    csi: IG_TOKEN_CSI,
  };
  const token = tokens[org as keyof typeof tokens];
  const URL = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,username,timestamp,thumbnail_url,permalink&access_token=${token}`;
  const response = await (await axios.get(URL)).data;
  res.status(200).json({ data: response });
}
