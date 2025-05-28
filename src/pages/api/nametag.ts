import type { NextApiRequest, NextApiResponse } from 'next';
import { parseAndExtractFormData } from 'lib/formidable/formidable-helper';
import { createNotionPage } from './notion/notion-helper';

export const config = {
  api: {
    bodyParser: false,
  },
};

const NAMETAG_DB_ID = process.env.NOTION_NAMETAG_DB_ID as string;
const NAMETAG_API_KEY = process.env.NOTION_NAMETAG_API_KEY as string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { parsedRequest } = await parseAndExtractFormData(req);

  // Extract fields from the parsed JSON
  const {
    q9_whatType: requestType,
    q12_whoIs12: whoFor,
    q1_workersFull: fullName,
    q4_chosenPronouns: pronouns,
    q2_jobTitle: jobTitle,
    q5_department: department,
    q13_dateNeeded13: dateNeeded,
    q24_notes: notes,
  } = parsedRequest;

  const formattedDateNeeded = dateNeeded
    ? `${dateNeeded.year}-${dateNeeded.month.padStart(
        2,
        '0',
      )}-${dateNeeded.day.padStart(2, '0')}`
    : '';

  const formattedFullName = `${fullName.first} ${fullName.last}`;

  const properties = {
    'Request Type': {
      type: 'rich_text',
      rich_text: [
        {
          type: 'text',
          text: {
            content: requestType,
          },
        },
      ],
    },
    Notes: {
      type: 'rich_text',
      rich_text: [
        {
          type: 'text',
          text: {
            content: notes,
            link: null,
          },
        },
      ],
    },
    'Job Title': {
      type: 'rich_text',
      rich_text: [
        {
          type: 'text',
          text: {
            content: jobTitle,
            link: null,
          },
        },
      ],
    },
    Department: {
      type: 'rich_text',
      rich_text: [
        {
          type: 'text',
          text: {
            content: department,
            link: null,
          },
        },
      ],
    },
    Classification: {
      type: 'rich_text',
      rich_text: [
        {
          type: 'text',
          text: {
            content: whoFor,
            link: null,
          },
        },
      ],
    },
    'Due Date': {
      type: 'date',
      date: {
        start: formattedDateNeeded,
        end: null,
        time_zone: null,
      },
    },
    Pronouns: {
      type: 'rich_text',
      rich_text: [
        {
          type: 'text',
          text: {
            content: pronouns,
            link: null,
          },
        },
      ],
    },
    Name: {
      type: 'title',
      title: [
        {
          type: 'text',
          text: {
            content: formattedFullName,
            link: null,
          },
        },
      ],
    },
  };

  try {
    const response = await createNotionPage(
      NAMETAG_DB_ID,
      properties,
      NAMETAG_API_KEY,
    );
    res.status(200).json({ success: true, id: response.id });
  } catch (error) {
    console.error('Error in API handler:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
