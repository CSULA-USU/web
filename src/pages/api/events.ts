import type { NextApiRequest, NextApiResponse } from 'next';
import { USU_GROUP_IDS } from 'utils/constants';

const GROUP_IDS = USU_GROUP_IDS.join(',');
const RSS_URL = `https://calstatela.campusgroups.com/rss_events?time_range=upcoming&group_ids=${GROUP_IDS}`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const response = await fetch(RSS_URL);
    if (!response.ok) {
      return res.status(502).json({ error: 'Failed to fetch events' });
    }
    const xml = await response.text();
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
    res.status(200).send(xml);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
}
