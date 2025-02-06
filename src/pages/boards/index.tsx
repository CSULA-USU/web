import { Page, ContentBoard } from 'modules';
import Head from 'next/head';
import { FluidContainer } from 'components';
import { ContentBoardColumnProps } from 'modules/ContentBoard/ContentBoardTypes';
export default function MeetingRooms() {
  const columnsData: ContentBoardColumnProps[] = [
    {
      color: 'red',
      columnTitle: 'In Progress',
      columnData: [
        {
          cellID: '1',
          cellTitle: 'Task 1',
          cellDescription: 'Hello World this is part of the description',
        },
        {
          cellID: '2',
          cellTitle: 'Task 2',
          cellDescription: 'Hello World this is part of the description',
        },
      ],
    },
    {
      color: 'orange',
      columnTitle: 'Not Started',
      columnData: [
        {
          cellID: '3',
          cellTitle: 'Task 3',
          cellDescription: 'Hello World this is part of the description',
        },
        { cellID: '4', cellTitle: 'Task 4' },
      ],
    },
    {
      color: 'yellow',
      columnTitle: 'Completed',
      columnData: [
        {
          cellID: '5',
          cellTitle: 'Task 5',
          cellDescription: 'Hello World this is part of the description',
        },
        {
          cellID: '6',
          cellTitle: 'Task 6',
          cellDescription: 'Hello World this is part of the description',
        },
      ],
    },
    {
      color: 'green',
      columnTitle: 'On Hold',
      columnData: [
        { cellID: '7', cellTitle: 'Task 7' },
        {
          cellID: '8',
          cellTitle: 'Task 8',
          cellDescription: 'Hello World this is part of the description',
        },
      ],
    },
    {
      color: 'blue',
      columnTitle: 'Cancelled',
      columnData: [
        { cellID: '9', cellTitle: 'Task 9', cellDescription: '' },
        { cellID: '10', cellTitle: 'Task 10', cellDescription: '' },
      ],
    },
  ];
  return (
    <Page>
      <Head>
        <title>U-SU Boards</title>
      </Head>
      <FluidContainer>
        <ContentBoard columns={columnsData} />
      </FluidContainer>
    </Page>
  );
}
