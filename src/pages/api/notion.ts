import type { NextApiResponse } from 'next';
const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NOTION_GRDB_API_KEY });

export default async function handler(_req: any, res: NextApiResponse<any>) {
  const databaseId = 'db271c187a834f21b054560172689260';
  let accumulatedFeed: any = [];

  const getMoreFeed = async (hasMore: boolean, startCursor?: string) => {
    if (hasMore) {
      try {
        const moreFeed = await notion.databases.query({
          database_id: databaseId,
          start_cursor: `${startCursor}`,
        });
        // Process moreFeed data as needed
        accumulatedFeed = accumulatedFeed.concat(moreFeed.results);
        if (moreFeed.has_more) {
          getMoreFeed(moreFeed.has_more, moreFeed.next_cursor);
        }
      } catch (error) {
        console.error(
          'Error fetching has more graphics request data from Notion',
          error,
        );
        res.status(500).json({
          error: 'Internal Server Error within more graphics request feed',
        });
      }
    }
  };

  try {
    const requestFeed = await notion.databases.query({
      database_id: databaseId,
    });
    accumulatedFeed = accumulatedFeed.concat(requestFeed.results);

    // Use getMoreFeed function
    await getMoreFeed(requestFeed.has_more, requestFeed.next_cursor);

    res.status(200).json(accumulatedFeed);
  } catch (error) {
    console.error('Error fetching data from Notion:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
