import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Departments } from 'types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const { org = 'usu' } = req.query;

  const { IG_TOKEN_USU, IG_TOKEN_GRAFFIX } = process.env;

  if (!IG_TOKEN_USU || !IG_TOKEN_GRAFFIX) {
    throw new Error('One or more Instagram auth tokens may be missing');
  }

  /*eslint no-unused-vars: "off"*/
  const tokens: Pick<{ [key in Departments]: string }, 'usu' | 'graffix'> = {
    usu: IG_TOKEN_USU,
    graffix: IG_TOKEN_GRAFFIX,
  };
  const token = tokens[org as keyof typeof tokens];
  const URL = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,username,timestamp,thumbnail_url,permalink&access_token=${token}`;
  const response = await (await axios.get(URL)).data;
  res.status(200).json({ data: response });
}
