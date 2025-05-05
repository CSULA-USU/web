// src/pages/api/work-order.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';
import { Formidable } from 'formidable';

// Disables Next.js body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Init Notion client
const notion = new Client({
  auth: process.env.NOTION_WORKORDER_API_KEY,
});

// Your Work Order Database ID for Notion
const WORKORDER_DB_ID = process.env.NOTION_WORKORDER_DB_ID as string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new Formidable();

  form.parse(req, async (err, fields) => {
    if (err) {
      console.error('Error parsing form data:', err);
      return res.status(500).json({ error: 'Error parsing form data' });
    }

    // console.log(
    //   '==================== Parsed Fields: ====================',
    //   fields,
    // );

    // Extract the raw JSON from the "rawRequest" field
    const rawRequest = Array.isArray(fields.rawRequest)
      ? fields.rawRequest[0]
      : fields.rawRequest || '';

    const parsedSubmissionID = Array.isArray(fields.submissionID)
      ? fields.submissionID[0]
      : fields.submissionID || '';

    const parsedRequest = JSON.parse(rawRequest);

    // console.log('Parsed Jotform Payload:', parsedRequest);

    // Extract fields from the parsed JSON
    const {
      q3_location: location,
      q4_workOr: description,
      q11_requestedBy: name,
      q12_date: submissionDate,
      q13_email: email,
      q14_phoneNumber: phone,
      q15_category: categories,
      q16_bestStarting: startTime,
      q17_preferredCompletion: dueDate,
      q18_urgencyLevel: urgency,
      q20_department20: department,
      fileUpload: files,
    } = parsedRequest;

    // Convert categories to multi-select format for Notion
    const formattedCategories = (categories || []).map((cat: string) => ({
      name: cat.trim(),
    }));

    const formattedDueDate = dueDate
      ? `${dueDate.year}-${dueDate.month.padStart(
          2,
          '0',
        )}-${dueDate.day.padStart(2, '0')}`
      : '';

    const formattedFiles = files?.length
      ? files.map((url: string) => ({
          name: url.split('/').pop() || 'Uploaded File',
          type: 'external',
          external: { url },
        }))
      : [];

    const formattedPhone = phone ? phone.full : '';

    const formattedStartTime = startTime
      ? `${startTime.timeInput} ${startTime.ampm}`
      : // resolve gracefully if time is not provided
        '00:00 AM';

    const formattedSubmissionDate = submissionDate
      ? `${submissionDate.year}-${submissionDate.month.padStart(
          2,
          '0',
        )}-${submissionDate.day.padStart(2, '0')}`
      : // resolve gracefully if date is not provided
        '00000-00-00';

    // Create a new page in Notion
    try {
      const response = await notion.pages.create({
        parent: { database_id: WORKORDER_DB_ID },
        properties: {
          Location: {
            type: 'rich_text',
            rich_text: [
              {
                type: 'text',
                text: {
                  content: location,
                  link: null,
                },
                annotations: {
                  bold: false,
                  italic: false,
                  strikethrough: false,
                  underline: false,
                  code: false,
                  color: 'default',
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
                annotations: {
                  bold: false,
                  italic: false,
                  strikethrough: false,
                  underline: false,
                  code: false,
                  color: 'default',
                },
              },
            ],
          },
          'Best Work Time': {
            type: 'rich_text',
            rich_text: [
              {
                type: 'text',
                text: {
                  content: formattedStartTime,
                  link: null,
                },
                annotations: {
                  bold: false,
                  italic: false,
                  strikethrough: false,
                  underline: false,
                  code: false,
                  color: 'default',
                },
              },
            ],
          },
          'Submission Date': {
            type: 'date',
            date: {
              start: formattedSubmissionDate,
              end: null,
              time_zone: null,
            },
          },
          'Contact Email': {
            type: 'email',
            email: email,
          },
          'Contact Phone': {
            type: 'rich_text',
            rich_text: [
              {
                type: 'text',
                text: {
                  content: formattedPhone,
                  link: null,
                },
                annotations: {
                  bold: false,
                  italic: false,
                  strikethrough: false,
                  underline: false,
                  code: false,
                  color: 'default',
                },
              },
            ],
          },
          Type: {
            type: 'multi_select',
            multi_select: formattedCategories,
          },
          'Priority Level': {
            type: 'select',
            select: {
              name: urgency,
            },
          },
          Description: {
            type: 'rich_text',
            rich_text: [
              {
                type: 'text',
                text: {
                  content: description,
                  link: null,
                },
                annotations: {
                  bold: false,
                  italic: false,
                  strikethrough: false,
                  underline: false,
                  code: false,
                  color: 'default',
                },
              },
            ],
          },
          Attachments: {
            type: 'files',
            files: formattedFiles,
          },
          'Project Brief': {
            type: 'url',
            url: `https://www.jotform.com/submission/${parsedSubmissionID}`,
          },
          'Due Date': {
            type: 'date',
            date: {
              start: formattedDueDate,
              end: null,
              time_zone: null,
            },
          },
          'Requested By': {
            type: 'title',
            title: [
              {
                type: 'text',
                text: {
                  content: name,
                },
              },
            ],
          },
        },
      });

      console.log('✅ Notion entry created:', response.id);
      res.status(200).json({ success: true, id: response.id });
    } catch (error) {
      console.error('❌ Notion error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
}
