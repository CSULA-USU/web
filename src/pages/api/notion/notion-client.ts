import { Client } from '@notionhq/client';

export const notion = new Client({
  auth: process.env.NOTION_WORKORDER_API_KEY, // Use the same API key for all integrations
});
