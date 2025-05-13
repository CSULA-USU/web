import type { NextApiRequest, NextApiResponse } from 'next';
import { parseAndExtractFormData } from 'lib/formidable/formidable-helper';
import { createNotionPage } from './notion/notion-helper';

export const config = {
  api: {
    bodyParser: false,
  },
};

const NAMETAG_DB_ID = process.env.NOTION_NAMETAG_DB_ID as string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { submissionID, parsedRequest } = await parseAndExtractFormData(req);

    console.log(
      '-------------- this is parsed request within nametag --------------',
      parsedRequest,
    );
    console.log(
      '-------------- this is submissionID within nametag --------------',
      submissionID,
    );
    // Extract fields from the parsed JSON

    const properties = {
      Name: {
        type: 'title',
        title: [
          {
            type: 'text',
            text: { content: 'John Doe' },
          },
        ],
      },
      Email: {
        type: 'email',
        email: 'johndoe@example.com',
      },
    };

    const response = await createNotionPage(NAMETAG_DB_ID, properties);
    res.status(200).json({ success: true, id: response.id });
  } catch (error) {
    console.error('Error in API handler:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
