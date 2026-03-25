import { useEffect, useState } from 'react';
import Head from 'next/head';
import { ContentBoard, Page } from 'modules';
import { GraffixRequest } from 'types';
import {
  ContentBoardCellProps,
  ContentBoardColumnProps,
  KeyValueProps,
} from 'modules/ContentBoard/ContentBoardTypes';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import BackofficeShell from 'modules/Backoffice/BackofficeShell';
import { FluidContainer, Loading } from 'components';

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
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/backoffice/signin');
    }
  }, [session, router, status]);

  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('N/A');

  const [graffixRequests, setGraffixRequests] = useState<
    GraffixRequest[] | undefined
  >(undefined);
  const [cellMap, setCellMap] = useState<KeyValueProps>({});

  const [contentBoardData, setContentBoardData] = useState<
    ContentBoardColumnProps[]
  >(createDeepCopy(Object.values(contentBoardTemplate)));

  useEffect(() => {
    setContentBoardData(createDeepCopy(Object.values(contentBoardTemplate)));
    if (selectedDepartment === 'N/A' || selectedDepartment === '') return;

    setLoading(true);

    const fetchGraffixRequestsFromNotion = async () => {
      try {
        const res = await fetch(
          `/api/notion?department_id=${selectedDepartment}`,
          {
            method: 'GET',
            credentials: 'include',
          },
        );

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const data = await res.json();
        if (data && data.length > 0) {
          setGraffixRequests(data);
        } else {
          setGraffixRequests([]);
        }
      } catch (err) {
        console.error('Failed to fetch Graffix Requests:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGraffixRequestsFromNotion();
  }, [selectedDepartment, router]);

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
        .catch(() => {})
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
        <title>Graffix Requests</title>
      </Head>

      <BackofficeShell
        title={`Graffix Requests`}
        subtitle="Manage and view graphic requests for the University–Student Union"
      >
        {loading ? (
          <FluidContainer
            flex
            alignItems="center"
            justifyContent="center"
            height="70vh"
          >
            <Loading load={true} />
          </FluidContainer>
        ) : (
          <ContentBoard
            columns={contentBoardData}
            cellMap={cellMap}
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
            accessibleDepartment={accessibleDepartment}
          />
        )}
      </BackofficeShell>
    </Page>
  );
}
