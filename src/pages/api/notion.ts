import type { NextApiResponse } from 'next';
import { GraffixRequest } from 'types';
import { withAuth } from 'lib/authMiddleWare';
import { requireBackofficeDepartmentAccess } from 'lib/backoffice/requireBackofficeDepartmentAccess';

const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_GRDB_API_KEY });

async function handler(req: any, res: NextApiResponse<any>) {
  const { department_id } = req.query;
  const databaseId = 'db271c187a834f21b054560172689260';
  let accumulatedFeed: any[] = [];

  const auth = await requireBackofficeDepartmentAccess(req, res, {
    requestedDepartment: department_id,
    viewAllPolicy: { pageKey: 'graffixRequests', action: 'view', scope: '*' },
    viewOwnDepartmentPolicy: {
      pageKey: 'graffixRequests',
      action: 'view',
      scope: 'ownDepartment',
    },
  });

  if (!auth.ok) return;

  const getMoreFeed = async (hasMore: boolean, startCursor?: string) => {
    if (hasMore) {
      try {
        const moreFeed = await notion.databases.query({
          database_id: databaseId,
          start_cursor: `${startCursor}`,
        });

        accumulatedFeed = accumulatedFeed.concat(moreFeed.results);

        if (moreFeed.has_more) {
          await getMoreFeed(moreFeed.has_more, moreFeed.next_cursor);
        }
      } catch (error) {
        console.error(
          'Error fetching has more graphics request data from Notion',
          error,
        );

        res.status(500).json({
          error: 'Internal Server Error within more graphics request feed',
        });
      }
    }
  };

  const compressGraffixRequestObjects = (feed: any[]) => {
    const compressedGraffixRequestFeed: GraffixRequest[] = [];

    feed.forEach((graffixRequestObj) => {
      const graffixRequest: GraffixRequest = {
        id: graffixRequestObj?.id,
        title:
          graffixRequestObj?.properties?.Item?.title?.[0]?.plain_text ??
          'Untitled',
        departmentID:
          graffixRequestObj?.properties?.Department?.rich_text?.[0]
            ?.plain_text ?? 'Unknown',
        status:
          graffixRequestObj?.properties?.Status?.status?.name ?? undefined,
        submissionDate:
          graffixRequestObj?.properties?.['Submission Date']?.date?.start ??
          undefined,
        requestorName:
          graffixRequestObj?.properties?.Contact?.rich_text?.[0]?.plain_text ??
          undefined,
        digitalDeliveryDate:
          graffixRequestObj?.properties?.['Digital Delivery']?.formula?.date
            ?.start ?? undefined,
        sendToPrintDate:
          graffixRequestObj?.properties?.['Send to Print']?.formula?.date
            ?.start ?? undefined,
        printDeliveryDate:
          graffixRequestObj?.properties?.['Print Delivery']?.formula?.date
            ?.start ?? undefined,
        eventDate:
          graffixRequestObj?.properties?.['Event Date']?.date?.start ??
          undefined,
        projectBriefURL:
          graffixRequestObj?.properties?.['Project Brief']?.url ?? undefined,
      };

      compressedGraffixRequestFeed.push(graffixRequest);
    });

    return compressedGraffixRequestFeed;
  };

  try {
    const query = {
      database_id: databaseId,
      filter: {
        property: 'Department',
        rich_text: {
          equals: auth.requestedDepartment,
        },
      },
      sorts: [
        {
          property: 'title',
          direction: 'ascending',
        },
      ],
    };

    const requestFeed = await notion.databases.query(query);
    accumulatedFeed = accumulatedFeed.concat(requestFeed.results);

    await getMoreFeed(requestFeed.has_more, requestFeed.next_cursor);

    return res.status(200).json(compressGraffixRequestObjects(accumulatedFeed));
  } catch (error) {
    console.error('Error fetching data from Notion:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default withAuth(handler);
