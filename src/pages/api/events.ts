import type { NextApiRequest, NextApiResponse } from 'next';
import { USU_GROUP_IDS } from 'utils/constants';

const GROUP_IDS = USU_GROUP_IDS.join(',');
const RSS_URL = `https://calstatela.campusgroups.com/rss_events?time_range=upcoming&group_ids=${GROUP_IDS}`;

// CampusGroups normally takes about 3s (nearly all of it before the first
// byte), so 10s leaves wide headroom for a slow day while still failing a hung
// upstream promptly. Without a limit, a request that never answers holds the
// function open until the platform kills it, and the events section spins the
// whole time. The signal also covers reading the body, not just the headers.
const UPSTREAM_TIMEOUT_MS = 10_000;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const response = await fetch(RSS_URL, {
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
    if (!response.ok) {
      return res.status(502).json({ error: 'Failed to fetch events' });
    }
    const xml = await response.text();
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
    res.status(200).send(xml);
  } catch (error) {
    if (error instanceof DOMException && error.name === 'TimeoutError') {
      return res.status(504).json({ error: 'Events feed timed out' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}
