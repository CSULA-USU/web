import type { NextApiResponse } from 'next';
const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NOTION_GRDB_API_KEY });

export default async function handler(res: NextApiResponse) {
  const databaseId = 'db271c187a834f21b054560172689260';
  const requestFeed = await notion.databases.retrieve({
    database_id: databaseId,
  });
  res.status(200).json(requestFeed);
}
