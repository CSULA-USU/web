import { useEffect, useState } from 'react';
import Head from 'next/head';
import {
  Button,
  Expandable,
  FluidContainer,
  Image,
  Typography,
} from 'components';
import { Header, Page } from 'modules';
import styled, { css } from 'styled-components';
import departments from 'data/departments.json';
import { BiChevronRight } from 'react-icons/bi';
import { Colors, Spaces } from 'theme';
import { useBreakpoint } from 'hooks';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GraffixRequest } from 'types';

interface StatusButtonProps {
  color?:
    | 'grey'
    | 'orange'
    | 'purple'
    | 'blue'
    | 'pink'
    | 'red'
    | 'green'
    | 'brown';

  active?: boolean;
}

const notionColorsDM = (color: StatusButtonProps['color']) => {
  switch (color) {
    case 'grey':
      return css`
        background-color: #787774;
        color: #f1f1ef;
      `;
    case 'orange':
      return css`
        background-color: #d9730d;
        color: #faebdd;
      `;
    case 'purple':
      return css`
        background-color: #9065b0;
        color: #f6f3f9;
      `;
    case 'blue':
      return css`
        background-color: #337ea9;
        color: #e7f3f8;
      `;
    case 'pink':
      return css`
        background-color: #c14c8a;
        color: #faf1f5;
      `;
    case 'red':
      return css`
        background-color: #d44c47;
        color: #fdebec;
      `;
    case 'green':
      return css`
        background-color: #448361;
        color: #edf3ec;
      `;
    case 'brown':
      return css`
        background-color: #9f6b53;
        color: #f4eeee;
      `;
    default:
      return css`
        background-color: #37352f;
        color: #fff;
      `;
  }
};

const StatusButton = styled.button<StatusButtonProps>`
  text-align: center;
  border: none;
  border-radius: 5px;
  padding: 12px 16px;
  margin: ${Spaces.md};
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  color: #fff;
  box-shadow: 3px 3px 5px ${Colors.greyDarkest};

  &:hover {
    opacity: 0.7;
  }

  ${(props) => notionColorsDM(props.color)}

  ${(props) =>
    props.active &&
    css`
      box-shadow: none;
    `}
`;

const StatusNav = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const ExpandableContainer = styled.div`
  border: 1px solid;
  padding-left: ${Spaces.md};
  margin: ${Spaces.md};
`;

const RequestLabel = styled.span`
  font-weight: bold;
`;

const InnerRequestContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 95%;
`;

const RequestInfoContainer = styled.div`
  margin: ${Spaces.xs};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: ${Spaces.md};
`;

const AllRequestsCountContainer = styled.div`
  text-align: right;
`;

const Loading = styled.div<{ visible?: boolean }>`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  top: 0;
  background-color: rgba(255, 255, 255, 0.3);
  position: fixed;
  font-weight: 700;
  font-size: 36px;
`;

type RequestsMap = Record<
  string,
  { title: string; color: StatusButtonProps['color']; data: any[] }
>;

const GraffixRequestCard = ({
  graffixRequest,
  isMobile,
}: {
  graffixRequest: GraffixRequest;
  isMobile: boolean;
}) => {
  return (
    <ExpandableContainer>
      <Expandable
        indicator={<BiChevronRight size={48} />}
        header={
          <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
            {graffixRequest.title}
          </Typography>
        }
      >
        <RequestInfoContainer>
          <RequestLabel>Submission Date</RequestLabel>:{' '}
          {graffixRequest?.submissionDate ?? 'N/A'}
        </RequestInfoContainer>
        <RequestInfoContainer>
          <RequestLabel>Requestor</RequestLabel>:{' '}
          {graffixRequest?.requestorName ?? 'N/A'}
        </RequestInfoContainer>
        {isMobile ? (
          <>
            <RequestInfoContainer>
              <RequestLabel>Digital Delivery</RequestLabel>:{' '}
              {graffixRequest?.digitalDeliveryDate ?? 'N/A'}
            </RequestInfoContainer>
            <RequestInfoContainer>
              <RequestLabel>Send to Print</RequestLabel>:{' '}
              {graffixRequest?.sendToPrintDate ?? 'N/A'}
            </RequestInfoContainer>
            <RequestInfoContainer>
              <RequestLabel>Print Delivery</RequestLabel>:{' '}
              {graffixRequest?.printDeliveryDate ?? 'N/A'}
            </RequestInfoContainer>
            <RequestInfoContainer>
              <RequestLabel>Event Date</RequestLabel>:{' '}
              {graffixRequest?.eventDate ?? 'N/A'}
            </RequestInfoContainer>
          </>
        ) : (
          <>
            <InnerRequestContainer>
              <RequestInfoContainer>
                <RequestLabel>Digital Delivery</RequestLabel>:
                <Typography as="p" variant="cta" weight="400">
                  {graffixRequest?.digitalDeliveryDate ?? 'N/A'}
                </Typography>
              </RequestInfoContainer>
              <RequestInfoContainer>
                <RequestLabel>Send To Print</RequestLabel>:
                <Typography as="p" variant="cta" weight="400">
                  {graffixRequest?.sendToPrintDate ?? 'N/A'}
                </Typography>
              </RequestInfoContainer>
              <RequestInfoContainer>
                <RequestLabel>Print Delivery</RequestLabel>:
                <Typography as="p" variant="cta" weight="400">
                  {graffixRequest?.printDeliveryDate ?? 'N/A'}
                </Typography>
              </RequestInfoContainer>
              <RequestInfoContainer>
                <RequestLabel>Event Date</RequestLabel>:
                <Typography as="p" variant="cta" weight="400">
                  {graffixRequest?.eventDate ?? 'N/A'}
                </Typography>
              </RequestInfoContainer>
            </InnerRequestContainer>
          </>
        )}
        {graffixRequest?.projectBriefURL && (
          <ButtonContainer>
            <Button variant="primary" href={graffixRequest?.projectBriefURL}>
              View Request
            </Button>
          </ButtonContainer>
        )}
      </Expandable>
    </ExpandableContainer>
  );
};

const requestsListTemplate: RequestsMap = {
  'Not Started': {
    title: 'Not Started',
    color: 'grey',
    data: [],
  },
  'In Progress': {
    title: 'In Progress',
    color: 'orange',
    data: [],
  },
  Approved: {
    title: 'Approved',
    color: 'purple',
    data: [],
  },
  'Send to Print': {
    title: 'Send to Print',
    color: 'blue',
    data: [],
  },
  'Waiting for Approval': {
    title: 'Waiting for Approval',
    color: 'pink',
    data: [],
  },
  'On Hold': {
    title: 'On Hold',
    color: 'red',
    data: [],
  },
  Complete: {
    title: 'Complete',
    color: 'green',
    data: [],
  },
  Cancelled: {
    title: 'Cancelled',
    color: 'brown',
    data: [],
  },
};

export default function GraphicsRequests() {
  const [requestsList, setRequestsList] = useState(requestsListTemplate);

  const router = useRouter();
  const { id } = router.query;
  const { isMobile } = useBreakpoint();
  const [currentStatus, setCurrentStatus] = useState('All');
  const [loading, setLoading] = useState(true);
  const [department, setDepartment] = useState<(typeof departments)[number]>();

  const [graffixRequests, setGraffixRequests] = useState<
    GraffixRequest[] | undefined
  >(undefined);

  const populateRequestsList = () => {
    if (!graffixRequests) return;

    let tempRequestList: RequestsMap = { ...requestsListTemplate };
    graffixRequests.map((graffixRequest) => {
      if (graffixRequest?.status && graffixRequest?.status in tempRequestList) {
        tempRequestList[graffixRequest.status].data.push(graffixRequest);
      }
    });

    setRequestsList(tempRequestList);
  };

  const changeStatus = (status: string) => {
    setCurrentStatus(status);
  };

  useEffect(() => {
    if (id == undefined) return;
    const d = departments.find((d) => d.id === id);
    setDepartment(d);

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
    populateRequestsList();
  }, [graffixRequests]);

  return (
    <Page>
      <Head>
        <title>Graphics Requests</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {department ? (
        <>
          <Header
            title={`${department?.title} Graphics Requests`}
            backgroundImage="/subtle-background-2.jpg"
          >
            <Image
              alt="Graphics Requests Designer Life Header Image"
              src="/departments/graffix/backoffice/graffix-requests.svg"
              size={300}
            ></Image>
          </Header>
          <StatusNav>
            <StatusButton
              active={currentStatus === 'All'}
              onClick={() => changeStatus('All')}
            >
              All
            </StatusButton>
            {Object.entries(requestsListTemplate).map(
              ([graffixStatusName, graffixStatusValue]) => {
                return (
                  <StatusButton
                    key={graffixStatusName}
                    color={graffixStatusValue.color}
                    active={currentStatus === graffixStatusName}
                    onClick={() => changeStatus(graffixStatusName)}
                  >
                    {graffixStatusName}
                  </StatusButton>
                );
              },
            )}
          </StatusNav>
          <FluidContainer>
            {currentStatus === 'All' ? (
              <>
                {Object.values(requestsList).map((status, index) => (
                  <div key={index}>
                    <Typography as="h1" variant="title">
                      {status.title}: {status.data.length || 0}
                    </Typography>
                    {status.data.map((request, index) => (
                      <GraffixRequestCard
                        graffixRequest={request}
                        isMobile={isMobile}
                        key={index}
                      />
                    ))}
                  </div>
                ))}
                <AllRequestsCountContainer>
                  <Typography as="h1" variant="title">
                    Total:{' '}
                    {Object.values(requestsList).reduce(
                      (total, status) => total + status.data.length,
                      0,
                    )}
                  </Typography>
                </AllRequestsCountContainer>
              </>
            ) : (
              <>
                <Typography as="h1" variant="title">
                  {currentStatus}: {requestsList[currentStatus].data.length}
                </Typography>
                {requestsList[currentStatus]?.data.map((request, index) => (
                  <GraffixRequestCard
                    graffixRequest={request}
                    isMobile={isMobile}
                    key={index}
                  />
                ))}
              </>
            )}
          </FluidContainer>
          {loading && (
            <>
              <Loading>Loading...</Loading>
            </>
          )}
        </>
      ) : (
        <>
          <FluidContainer>
            <FluidContainer flex justifyContent="center" alignItems="center">
              <Typography as="h1" variant="title">
                OOPS! We can&apos;t find the page you&apos;re looking for.
              </Typography>
            </FluidContainer>
            <FluidContainer flex justifyContent="center" alignItems="center">
              <Image
                alt="Eddie the Eagle figuring out what you were thinking"
                src="https://media.giphy.com/media/Ihn3KpMcpCMamJdI30/giphy.gif"
                style={{ width: isMobile ? '70%' : '50%', height: 'auto' }}
              ></Image>
            </FluidContainer>

            <FluidContainer
              flex
              justifyContent="center"
              alignItems="center"
              flexWrap="wrap"
            >
              <Typography as="h2" variant="subheader">
                Did you mean:{' '}
              </Typography>
              <Link href="/graffix/backoffice/csi">
                <StatusButton color="blue">CSI</StatusButton>
              </Link>
              <Link href="/graffix/backoffice/ccc">
                <StatusButton color="green">CCC</StatusButton>
              </Link>
              <Link href="/graffix/backoffice/graffix">
                <StatusButton color="orange">Graffix</StatusButton>
              </Link>
              <Link href="/graffix/backoffice/operations">
                <StatusButton color="purple">Operations</StatusButton>
              </Link>
              <Link href="/graffix/backoffice/recreation">
                <StatusButton color="red">Recreation</StatusButton>
              </Link>
            </FluidContainer>
          </FluidContainer>
        </>
      )}
    </Page>
  );
}
