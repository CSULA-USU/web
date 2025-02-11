import { useEffect, useState } from 'react';
import Head from 'next/head';
import { ContentBoard, Page } from 'modules';
import styled from 'styled-components';
import departments from 'data/departments.json';
import { useRouter } from 'next/router';
import { GraffixRequest } from 'types';
import {
  ContentBoardCellProps,
  ContentBoardColumnProps,
  KeyValueProps,
} from 'modules/ContentBoard/ContentBoardTypes';

const Loading = styled.div<{ visible: boolean }>`
  height: 100vh;
  width: 100vw;
  display: ${(p) => (p.visible ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  text-align: center;
  top: 0;
  background-color: rgba(255, 255, 255, 0.3);
  position: fixed;
  font-weight: 700;
  font-size: 36px;
`;

const contentBoardTemplate: any = {
  'Not Started': { color: 'grey', columnTitle: 'Not Started', columnData: [] },
  'In Progress': {
    color: 'orange',
    columnTitle: 'In Progress',
    columnData: [],
  },
  Approved: { color: 'purple', columnTitle: 'Approved', columnData: [] },
  'Send to Print': {
    color: 'blue',
    columnTitle: 'Send to Print',
    columnData: [],
  },
  'Waiting for Approval': {
    color: 'pink',
    columnTitle: 'Waiting for Approval',
    columnData: [],
  },
  'On Hold': { color: 'red', columnTitle: 'On Hold', columnData: [] },
  Complete: { color: 'green', columnTitle: 'Complete', columnData: [] },
  Cancelled: { color: 'brown', columnTitle: 'Cancelled', columnData: [] },
};

const createDeepCopy = (object: any) => {
  // Traditional spread operator {...obj} is a shallow copy. The nested values are still referenced.
  // Returns a deep copy.
  return JSON.parse(JSON.stringify(object));
};

export default function GraphicsRequests() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [department, setDepartment] = useState<string>('');

  const [graffixRequests, setGraffixRequests] = useState<
    GraffixRequest[] | undefined
  >(undefined);
  const [cellMap, setCellMap] = useState<KeyValueProps>({});

  const [contentBoardData, setContentBoardData] = useState<
    ContentBoardColumnProps[]
  >(createDeepCopy(Object.values(contentBoardTemplate)));

  const populateContentBoard = () => {
    if (!graffixRequests) return;

    let tempContentBoardData = createDeepCopy(contentBoardTemplate);
    graffixRequests.map((graffixRequest) => {
      if (
        graffixRequest?.status &&
        graffixRequest?.status in tempContentBoardData
      ) {
        const contentBoardCell: ContentBoardCellProps = {
          cellID: graffixRequest.id,
          cellTitle: graffixRequest.title,
        };
        tempContentBoardData[graffixRequest.status].columnData.push(
          contentBoardCell,
        );
      }
    });
    setContentBoardData(Object.values(tempContentBoardData));
  };

  const populateCellIDMap = () => {
    if (!graffixRequests) return;

    let tempMap: KeyValueProps = {};
    graffixRequests.map((graffixRequest) => {
      tempMap[graffixRequest?.id] = graffixRequest;
    });
    setCellMap(tempMap);
  };

  useEffect(() => {
    setContentBoardData(createDeepCopy(Object.values(contentBoardTemplate)));
    if (id == undefined) return;
    setLoading(true);
    setDepartment(departments.find((d) => d.id === id)?.title ?? '');

    const fetchGraffixRequestsFromNotion = async () => {
      await fetch(`/api/notion?department_id=${id}`)
        .then((res) => {
          if (!res.ok) {
            setLoading(false);
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          if (data != undefined && data.length > 0) {
            setGraffixRequests(data);
            setLoading(false);
          }
        })
        .catch(() => {
          console.log('Failed to fetch Graffix Requests.');
        });
    };
    fetchGraffixRequestsFromNotion();
  }, [id]);

  useEffect(() => {
    populateContentBoard();
    populateCellIDMap();
  }, [graffixRequests]);

  return (
    <Page>
      <Head>
        <title>Graphics Requests</title>
      </Head>
      <Loading visible={loading}>Loading...</Loading>

      <ContentBoard
        title={`Graffix Requests - ${department}`}
        columns={contentBoardData}
        cellMap={cellMap}
      />
    </Page>
  );
}
