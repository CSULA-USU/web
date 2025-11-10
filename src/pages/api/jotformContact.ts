// pages/api/jotformContact.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { categoryMap } from 'types/CategoriesContact';

const CONTACT_API_KEY = process.env.CONTACT_JOTFORM_API_KEY!;
const CONTACT_FORM_ID = process.env.CONTACT_JOTFORM_FORM_ID!;
const JOTFORM_BASE_URL = 'https://api.jotform.com';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData = req.body;

    // Build Jotform API URL
    const jotformUrl = `${JOTFORM_BASE_URL}/form/${CONTACT_FORM_ID}/submissions?apiKey=${CONTACT_API_KEY}`;

    // Map your frontend fields -> Jotform field IDs
    const body = new URLSearchParams();
    body.append('submission[2][first]', formData.firstName || '');
    body.append('submission[2][last]', formData.lastInitial || '');
    body.append('submission[3]', formData.email || '');
    body.append('submission[4]', formData.subject || '');
    const readableCategory =
      categoryMap[formData.category] || formData.category;
    body.append('submission[5]', readableCategory);
    body.append('submission[6]', formData.message || '');

    // POST to Jotform
    const jotResponse = await fetch(jotformUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });

    const jotJson = await jotResponse.json();

    if (!jotResponse.ok) {
      return res.status(jotResponse.status).json({
        error: jotJson?.message || 'Jotform submission failed',
        jotform: jotJson,
      });
    }

    return res.status(200).json({ success: true, jotform: jotJson });
  } catch (error) {
    console.error('Error posting to Jotform:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
