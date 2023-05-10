// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
const Parser = require('rss-parser');
const parser = new Parser();

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const feed = await parser.parseURL(
    'https://calstatela.joinhandshake.com/external_feeds/13885/public.rss?token=p75-vOp36nyfxpcaxPFmrwZGaM6BDLJ7EvG9Qo30CKGdNAttmYqD-Q',
  );
  res.status(200).json(feed);
}
