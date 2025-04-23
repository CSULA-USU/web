// src/pages/api/work-order.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_WORKORDER_API_KEY,
});

// Your Work Order Database ID
const WORKORDER_DB_ID = process.env.NOTION_WORKORDER_DB_ID as string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract fields from Jotform webhook payload
    const { urgency, description, categories, location, name, email } =
      req.body;

    // Convert comma-separated categories to multi-select format for Notion
    const formattedCategories = (categories || '')
      .split(',')
      .map((cat: string) => ({
        name: cat.trim(),
      }));

    // Create a new page in Notion
    const response = await notion.pages.create({
      parent: { database_id: WORKORDER_DB_ID },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: name || 'No name provided',
              },
            },
          ],
        },
        Email: {
          email: email || '',
        },
        Description: {
          rich_text: [
            {
              text: {
                content: description || '',
              },
            },
          ],
        },
        Urgency: {
          select: {
            name: urgency || 'Medium',
          },
        },
        Location: {
          rich_text: [
            {
              text: {
                content: location || '',
              },
            },
          ],
        },
        Categories: {
          multi_select: formattedCategories,
        },
      },
    });

    console.log('✅ Notion entry created:', response.id);
    res.status(200).json({ success: true, id: response.id });
  } catch (error) {
    console.error('❌ Notion error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
