import { Client } from '@notionhq/client';

export async function createNotionPage(
  databaseId: string,
  properties: any,
  auth: string,
) {
  const notion = new Client({
    auth,
  });
  const response = await notion.pages.create({
    parent: { database_id: databaseId },
    properties,
  });
  console.log('✅ Notion entry created:', response.id);
  return response;
}
