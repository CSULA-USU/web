import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const { token } = req.query;
  const URL = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`;

  const response = await axios
    .get(URL)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return error;
    });

  res.status(200).json(response);
}
