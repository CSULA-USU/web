import type { NextApiResponse } from 'next';
const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NOTION_GRDB_API_KEY });

export default async function handler(_req: any, res: NextApiResponse<any>) {
  const databaseId = 'db271c187a834f21b054560172689260';
  try {
    const requestFeed = await notion.databases.query({
      database_id: databaseId,
    });
    res.status(200).json(requestFeed.results);
  } catch (error) {
    console.error('Error fetching data from Notion:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
