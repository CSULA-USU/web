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
    'https://csuaoa.org/?feed=job_feed&job_types&search_location&job_categories=los-angeles&search_keywords',
  );
  res.status(200).json(feed);
}
