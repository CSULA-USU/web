import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const { org = 'usu' } = req.query;
  const tokens = {
    usu: process.env.IG_TOKEN_USU,
    graffix: process.env.IG_TOKEN_GRAFFIX,
  };
  const token = tokens[org as keyof typeof tokens];
  const URL = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,username,timestamp,thumbnail_url,permalink&access_token=${token}`;
  const response = await (await axios.get(URL)).data;
  res.status(200).json({ data: response });
}
