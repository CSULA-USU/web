import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  console.log('!!!!Hello from vercel cron job!!!!');
  response.status(200).end('Hello Cron!');
}
