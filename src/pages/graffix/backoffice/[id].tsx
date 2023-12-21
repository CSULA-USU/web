import { useCallback, useEffect, useMemo, useState } from 'react';
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
import { graphicsRequestListState } from 'atoms';
import { useRecoilValue } from 'recoil';
import departments from 'data/departments.json';
import { BiChevronRight } from 'react-icons/bi';
import { Colors, Spaces } from 'theme';
import { useBreakpoint } from 'hooks';
import { useRouter } from 'next/router';
import Link from 'next/link';

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
  text-decoration: underline;
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

type RequestsMap = Record<string, { title: string; data: any[] }>;

export default function GraphicsRequests() {
  const requestsList: RequestsMap = useMemo(
    () => ({
      'Not Started': {
        title: 'Not Started',
        data: [],
      },
      'In Progress': {
        title: 'In Progress',
        data: [],
      },
      Approved: {
        title: 'Approved',
        data: [],
      },
      'Send to Print': {
        title: 'Send to Print',
        data: [],
      },
      'Waiting for Approval': {
        title: 'Waiting for Approval',
        data: [],
      },
      'On Hold': {
        title: 'On Hold',
        data: [],
      },
      Complete: {
        title: 'Complete',
        data: [],
      },
      Cancelled: {
        title: 'Cancelled',
        data: [],
      },
    }),
    [],
  );

  const router = useRouter();
  const { id } = router.query;
  const { isMobile } = useBreakpoint();
  const [currentStatus, setCurrentStatus] = useState('All');
  const graffixRequests = useRecoilValue(graphicsRequestListState);
  const [loading, setLoading] = useState(true);
  const [useEffectCounter, setEffectCounter] = useState(0);
  const [department, setDepartment] = useState<(typeof departments)[number]>();

  const populateRequestsList = useCallback(() => {
    Object.values(requestsList).forEach((status) => {
      const filteredRequests = graffixRequests
        .filter(
          (request) =>
            request.properties.Department.rich_text[0]?.plain_text.toLowerCase() ===
            department?.id,
        )
        .filter(
          (request) => request.properties.Status.status.name === status.title,
        );
      status.data = [...filteredRequests];
    });
  }, [department, graffixRequests, requestsList]);

  const toggleLoading = () => {
    if (loading) {
      setLoading(false);
    }
  };

  const changeStatus = (status: string) => {
    setCurrentStatus(status);
  };

  useEffect(() => {
    const d = departments.find((d) => d.id === id);
    setDepartment(d);
    populateRequestsList();
    if (useEffectCounter === 2) {
      toggleLoading();
    } else {
      setEffectCounter(useEffectCounter + 1);
    }
  }, [graffixRequests, id]);

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
            <StatusButton
              color="grey"
              active={currentStatus === 'Not Started'}
              onClick={() => changeStatus('Not Started')}
            >
              Not Started
            </StatusButton>
            <StatusButton
              color="orange"
              active={currentStatus === 'In Progress'}
              onClick={() => changeStatus('In Progress')}
            >
              In Progress
            </StatusButton>
            <StatusButton
              color="purple"
              active={currentStatus === 'Approved'}
              onClick={() => changeStatus('Approved')}
            >
              Approved
            </StatusButton>
            <StatusButton
              color="blue"
              active={currentStatus === 'Send to Print'}
              onClick={() => changeStatus('Send to Print')}
            >
              Send to Print
            </StatusButton>
            <StatusButton
              color="pink"
              active={currentStatus === 'Waiting for Approval'}
              onClick={() => changeStatus('Waiting for Approval')}
            >
              Waiting for Approval
            </StatusButton>
            <StatusButton
              color="red"
              active={currentStatus === 'On Hold'}
              onClick={() => changeStatus('On Hold')}
            >
              On Hold
            </StatusButton>
            <StatusButton
              color="green"
              active={currentStatus === 'Complete'}
              onClick={() => changeStatus('Complete')}
            >
              Complete
            </StatusButton>
            <StatusButton
              color="brown"
              active={currentStatus === 'Cancelled'}
              onClick={() => changeStatus('Cancelled')}
            >
              Cancelled
            </StatusButton>
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
                      <ExpandableContainer key={index}>
                        <Expandable
                          indicator={<BiChevronRight size={48} />}
                          header={
                            <Typography
                              variant="label"
                              as="h3"
                              margin={`${Spaces.sm} 0`}
                            >
                              {request.properties.Item.title[0]?.plain_text}
                            </Typography>
                          }
                        >
                          <RequestInfoContainer>
                            <RequestLabel>Submission Date</RequestLabel>:{' '}
                            {request.properties['Submission Date']?.date?.start}
                          </RequestInfoContainer>
                          <RequestInfoContainer>
                            <RequestLabel>Requestor</RequestLabel>:{' '}
                            {
                              request.properties.Contact.rich_text[0]
                                ?.plain_text
                            }
                          </RequestInfoContainer>
                          <RequestInfoContainer>
                            {/* <RequestLabel>Artist</RequestLabel>: {} */}
                          </RequestInfoContainer>
                          {isMobile ? (
                            <>
                              <RequestInfoContainer>
                                <RequestLabel>Digital Delivery</RequestLabel>:{' '}
                                {
                                  request.properties['Digital Delivery']?.date
                                    ?.start
                                }
                              </RequestInfoContainer>
                              <RequestInfoContainer>
                                <RequestLabel>Send to Print</RequestLabel>:{' '}
                                {
                                  request.properties['Send to Print']?.formula
                                    ?.date?.start
                                }
                              </RequestInfoContainer>
                              <RequestInfoContainer>
                                <RequestLabel>Print Delivery</RequestLabel>:{' '}
                                {
                                  request.properties['Print Delivery']?.formula
                                    ?.date?.start
                                }
                              </RequestInfoContainer>
                              <RequestInfoContainer>
                                <RequestLabel>Event Date</RequestLabel>:{' '}
                                {
                                  request.properties['Event Date']?.formula
                                    ?.date?.start
                                }
                              </RequestInfoContainer>
                            </>
                          ) : (
                            <>
                              <InnerRequestContainer>
                                <RequestInfoContainer>
                                  <RequestLabel>Digital Delivery</RequestLabel>:
                                  <Typography as="p" variant="cta" weight="400">
                                    {
                                      request.properties['Digital Delivery']
                                        ?.formula?.date?.start
                                    }
                                  </Typography>
                                </RequestInfoContainer>
                                <RequestInfoContainer>
                                  <RequestLabel>Send To Print</RequestLabel>:
                                  <Typography as="p" variant="cta" weight="400">
                                    {
                                      request.properties['Send to Print']
                                        ?.formula?.date?.start
                                    }
                                  </Typography>
                                </RequestInfoContainer>
                                <RequestInfoContainer>
                                  <RequestLabel>Print Delivery</RequestLabel>:
                                  <Typography as="p" variant="cta" weight="400">
                                    {
                                      request.properties['Print Delivery']
                                        ?.formula?.date?.start
                                    }
                                  </Typography>
                                </RequestInfoContainer>
                                <RequestInfoContainer>
                                  <RequestLabel>Event Date</RequestLabel>:
                                  <Typography as="p" variant="cta" weight="400">
                                    {
                                      request.properties['Event Date']?.date
                                        ?.start
                                    }
                                  </Typography>
                                </RequestInfoContainer>
                              </InnerRequestContainer>
                            </>
                          )}

                          <ButtonContainer>
                            <Button
                              variant="primary"
                              href={request.properties['Project Brief']?.url}
                            >
                              View Request
                            </Button>
                          </ButtonContainer>
                        </Expandable>
                      </ExpandableContainer>
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
                {graffixRequests
                  .filter(
                    (request) =>
                      request.properties.Department.rich_text[0]?.plain_text.toLowerCase() ===
                      department,
                  )
                  .filter(
                    (request) =>
                      request.properties.Status.status.name === currentStatus,
                  )
                  .map((request) => (
                    <ExpandableContainer key={request.title}>
                      <Expandable
                        indicator={<BiChevronRight size={48} />}
                        header={
                          <Typography
                            variant="label"
                            as="h3"
                            margin={`${Spaces.sm} 0`}
                          >
                            {request.properties.Item.title[0]?.plain_text}
                          </Typography>
                        }
                      >
                        <RequestInfoContainer>
                          <RequestLabel>Submission Date</RequestLabel>:{' '}
                          {request.properties['Submission Date']?.date?.start}
                        </RequestInfoContainer>
                        <RequestInfoContainer>
                          <RequestLabel>Requestor</RequestLabel>:{' '}
                          {request.properties.Contact.rich_text[0]?.plain_text}
                        </RequestInfoContainer>
                        {isMobile ? (
                          <>
                            <RequestInfoContainer>
                              <RequestLabel>Digital Delivery</RequestLabel>:{' '}
                              {
                                request.properties['Digital Delivery']?.date
                                  ?.start
                              }
                            </RequestInfoContainer>
                            <RequestInfoContainer>
                              <RequestLabel>Send to Print</RequestLabel>:{' '}
                              {
                                request.properties['Send to Print']?.formula
                                  ?.date?.start
                              }
                            </RequestInfoContainer>
                            <RequestInfoContainer>
                              <RequestLabel>Print Delivery</RequestLabel>:{' '}
                              {
                                request.properties['Print Delivery']?.formula
                                  ?.date?.start
                              }
                            </RequestInfoContainer>
                            <RequestInfoContainer>
                              <RequestLabel>Event Date</RequestLabel>:{' '}
                              {
                                request.properties['Event Date']?.formula?.date
                                  ?.start
                              }
                            </RequestInfoContainer>
                          </>
                        ) : (
                          <>
                            <InnerRequestContainer>
                              <RequestInfoContainer>
                                <RequestLabel>Digital Delivery</RequestLabel>:
                                <Typography as="p" variant="cta" weight="400">
                                  {
                                    request.properties['Digital Delivery']
                                      ?.formula?.date?.start
                                  }
                                </Typography>
                              </RequestInfoContainer>
                              <RequestInfoContainer>
                                <RequestLabel>Send To Print</RequestLabel>:
                                <Typography as="p" variant="cta" weight="400">
                                  {
                                    request.properties['Send to Print']?.formula
                                      ?.date?.start
                                  }
                                </Typography>
                              </RequestInfoContainer>
                              <RequestInfoContainer>
                                <RequestLabel>Print Delivery</RequestLabel>:
                                <Typography as="p" variant="cta" weight="400">
                                  {
                                    request.properties['Print Delivery']
                                      ?.formula?.date?.start
                                  }
                                </Typography>
                              </RequestInfoContainer>
                              <RequestInfoContainer>
                                <RequestLabel>Event Date</RequestLabel>:
                                <Typography as="p" variant="cta" weight="400">
                                  {
                                    request.properties['Event Date']?.date
                                      ?.start
                                  }
                                </Typography>
                              </RequestInfoContainer>
                            </InnerRequestContainer>
                          </>
                        )}
                        <ButtonContainer>
                          <Button
                            variant="primary"
                            href={request.properties['Project Brief']?.url}
                          >
                            View Request
                          </Button>
                        </ButtonContainer>
                      </Expandable>
                    </ExpandableContainer>
                  ))}
              </>
            )}
          </FluidContainer>
          {loading ? (
            <>
              <Loading>Loading...</Loading>
            </>
          ) : (
            <></>
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
              ></Image>
            </FluidContainer>

            <FluidContainer flex justifyContent="center" alignItems="center">
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
