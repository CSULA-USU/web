import { notion } from './notion-client';

export async function createNotionPage(databaseId: string, properties: any) {
  const response = await notion.pages.create({
    parent: { database_id: databaseId },
    properties,
  });
  console.log('✅ Notion entry created:', response.id);
  return response;
}
