import { useEffect, useState } from 'react';
import Head from 'next/head';
import { ContentBoard, Page } from 'modules';
import styled from 'styled-components';
import { GraffixRequest } from 'types';
import {
  ContentBoardCellProps,
  ContentBoardColumnProps,
  KeyValueProps,
} from 'modules/ContentBoard/ContentBoardTypes';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import BackofficeShell from 'modules/Backoffice/BackofficeShell';

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
  Complete: { color: 'green', columnTitle: 'Complete', columnData: [] },
  'On Hold': { color: 'red', columnTitle: 'On Hold', columnData: [] },
  Cancelled: { color: 'brown', columnTitle: 'Cancelled', columnData: [] },
};

const createDeepCopy = (object: any) => {
  return JSON.parse(JSON.stringify(object));
};

export default function GraphicsRequests() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) router.push('/backoffice/signin');
  }, []);

  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('N/A');
  const [accessibleDepartment, setAccessibleDepartment] = useState('');

  const [graffixRequests, setGraffixRequests] = useState<
    GraffixRequest[] | undefined
  >(undefined);
  const [cellMap, setCellMap] = useState<KeyValueProps>({});

  const [contentBoardData, setContentBoardData] = useState<
    ContentBoardColumnProps[]
  >(createDeepCopy(Object.values(contentBoardTemplate)));

  useEffect(() => {
    const fetchDepartmentsUserHasAccessTo = async () => {
      await fetch('/api/user/department')
        .then((res) => {
          if (!res.ok) {
            throw new Error(
              `HTTP error! Status: ${res.status}. User does not belong to any department.`,
            );
          }
          return res.json();
        })
        .then((res) => {
          const user_department = res?.department?.toLowerCase();
          setAccessibleDepartment(user_department);
          setSelectedDepartment(
            user_department == 'all' ? 'csi' : user_department,
          );
        })
        .catch(() => {
          console.log('User does not belong to any department.');
          alert(
            "Sorry you aren't assigned to any departments currently. Please contact the Graffix Web team if this problem persists. Thank you",
          );
          router.push('/backoffice');
        });
    };
    fetchDepartmentsUserHasAccessTo();
  }, []);

  useEffect(() => {
    setContentBoardData(createDeepCopy(Object.values(contentBoardTemplate)));
    if (selectedDepartment == 'N/A' || selectedDepartment == '') return;
    setLoading(true);

    const fetchGraffixRequestsFromNotion = async () => {
      await fetch(`/api/notion?department_id=${selectedDepartment}`, {
        method: 'GET',
        credentials: 'include',
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          if (data != undefined && data.length > 0) {
            setGraffixRequests(data);
          } else {
            throw new Error(`Content Error! Status: ${data.status}`);
          }
        })
        .catch(() => {
          console.log('Failed to fetch Graffix Requests.');
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchGraffixRequestsFromNotion();
  }, [selectedDepartment]);

  useEffect(() => {
    if (!graffixRequests) return;

    const populateContentBoard = () => {
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
      let tempMap: KeyValueProps = {};
      graffixRequests.map((graffixRequest) => {
        tempMap[graffixRequest?.id] = graffixRequest;
      });
      setCellMap(tempMap);
    };

    populateContentBoard();
    populateCellIDMap();
  }, [graffixRequests]);

  return (
    <Page>
      <Head>
        <title>Graphics Requests</title>
      </Head>
      <Loading visible={loading}>Loading...</Loading>

      <BackofficeShell
        title={`Board Meeting Documents`}
        subtitle="Manage meeting calendars, agendas, and minutes for the University&ndash;Student Union"
      >
        <ContentBoard
          columns={contentBoardData}
          cellMap={cellMap}
          selectedDepartment={selectedDepartment}
          setSelectedDepartment={setSelectedDepartment}
          accessibleDepartment={accessibleDepartment}
        />
      </BackofficeShell>
    </Page>
  );
}
