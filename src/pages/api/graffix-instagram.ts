import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const URL = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,username,timestamp,permalink,thumbnail_url&access_token=${process.env.GRAFFIX_INSTAGRAM_AUTH_TOKEN}`;
  const response = await (await axios.get(URL)).data;
  res.status(200).json({ data: response });
};
