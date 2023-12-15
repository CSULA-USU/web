// import { useEffect, useState } from 'react';
// import {
//   Button,
//   Expandable,
//   FluidContainer,
//   Image,
//   Typography,
// } from 'components';
// import { Header, Page } from 'modules';
// import styled, { css } from 'styled-components';
// import { graphicsRequestListState } from 'atoms';
// import { useRecoilValue } from 'recoil';
// import departments from 'data/departments.json';
// import { BiChevronRight } from 'react-icons/bi';
// import { Spaces } from 'theme';
// import { all } from 'radash';
// // import { useBreakpoint } from 'hooks';

// export interface Prop {
//   department: 'csi' | 'ccc' | 'graffix' | 'operations' | 'recreation';
// }

// interface StatusButtonProps {
//   color?:
//     | 'grey'
//     | 'orange'
//     | 'purple'
//     | 'blue'
//     | 'pink'
//     | 'red'
//     | 'green'
//     | 'brown';
// }

// const getNotionColors = (color: StatusButtonProps['color']) => {
//   switch (color) {
//     case 'grey':
//       return css`
//         background-color: #787774;
//         color: #f1f1ef;
//       `;
//     case 'orange':
//       return css`
//         background-color: #d9730d;
//         color: #faebdd;
//       `;
//     case 'purple':
//       return css`
//         background-color: #9065b0;
//         color: #f6f3f9;
//       `;
//     case 'blue':
//       return css`
//         background-color: #337ea9;
//         color: #e7f3f8;
//       `;
//     case 'pink':
//       return css`
//         background-color: #c14c8a;
//         color: #faf1f5;
//       `;
//     case 'red':
//       return css`
//         background-color: #d44c47;
//         color: #fdebec;
//       `;
//     case 'green':
//       return css`
//         background-color: #448361;
//         color: #edf3ec;
//       `;
//     case 'brown':
//       return css`
//         background-color: #9f6b53;
//         color: #f4eeee;
//       `;
//     default:
//       return css`
//         background-color: #37352f;
//         color: #fff;
//       `;
//   }
// };

// const StatusButton = styled.button<StatusButtonProps>`
//   text-align: center;
//   border: none;
//   border-radius: 5px;
//   padding: 12px 16px;
//   margin: ${Spaces.md};
//   font-size: 16px;
//   font-weight: 700;
//   cursor: pointer;
//   color: #fff;

//   &:hover {
//     opacity: 0.7;
//   }

//   ${(props) => getNotionColors(props.color)}
// `;

// const StatusNav = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   align-items: center;
// `;

// const ExpandableContainer = styled.div`
//   border: 1px solid;
//   padding-left: ${Spaces.md};
//   margin: ${Spaces.md};
// `;

// const RequestLabel = styled.span`
//   text-decoration: underline;
// `;

// const InnerRequestContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   flex-wrap: wrap;
//   width: 95%;
// `;

// const RequestInfoContainer = styled.div`
//   margin: ${Spaces.xs};
// `;

// const AllRequestsCountContainer = styled.div`
//   text-align: right;
// `;

// export const GraphicsRequests = ({ department }: Prop) => {
//   // const { isMobile } = useBreakpoint();
//   const [currentDepartment, setDepartment] = useState(department);
//   const requests = [
//     'Not Started',
//     'In-Progress',
//     'Approved',
//     'Send to Print',
//     'Waiting for Approval',
//     'On Hold',
//     'Complete',
//     'Cancelled',
//   ];

//   const requestsList: Record<string, { title: string; data: any }> = {
//     'Not Started': {
//       title: 'Not Started',
//       data: [],
//     },
//     'In-Progress': {
//       title: 'In-Progress',
//       data: [],
//     },
//     Approved: {
//       title: 'Approved',
//       data: [],
//     },
//     'Send to Print': {
//       title: 'Send to Print',
//       data: [],
//     },
//     'Waiting for Approval': {
//       title: 'Waiting for Approval',
//       data: [],
//     },
//     'On Hold': {
//       title: 'On Hold',
//       data: [],
//     },
//     Complete: {
//       title: 'Complete',
//       data: [],
//     },
//     Cancelled: {
//       title: 'Cancelled',
//       data: [],
//     },
//   };
//   const [currentStatus, setCurrentStatus] = useState('All');
//   const graffixRequests = useRecoilValue(graphicsRequestListState);
//   const [requestCount, setRequestCount] = useState(0);
//   const [allStatusCount, setAllStatusCount] = useState<number[]>([]);
//   const [total, setTotal] = useState(0);

//   const populateRequestsList = () => {
//     Object.values(requestsList).forEach((status) => {
//       graffixRequests
//         .filter(
//           (request) =>
//             request.properties.Department.rich_text[0]?.plain_text.toLowerCase() ===
//             currentDepartment,
//         )
//         .filter(
//           (request) => request.properties.Status.status.name === status.title,
//         );
//       status.data = [...graffixRequests];
//     });
//   };

//   const changeStatus = (status: string) => {
//     setCurrentStatus(status);
//     const requestsFilter = graffixRequests
//       .filter(
//         (request) =>
//           request.properties.Department.rich_text[0]?.plain_text.toLowerCase() ===
//           currentDepartment,
//       )
//       .filter((request) => request.properties.Status.status.name === status);
//     setRequestCount(requestsFilter.length);
//   };

//   const setStatusCount = (count: number) => {
//     setAllStatusCount((prevStatusCount) => [...prevStatusCount, count]);
//     setTotal(total + count);
//   };

//   useEffect(() => {
//     // const pathSegments = window.location.pathname.split('/');
//     // const id = pathSegments[pathSegments.length - 1];
//     // const selectedDepartment = departments.find((param) => param.id === id);
//     // setDepartment(selectedDepartment);
//     populateRequestsList();
//     console.log(
//       'requests from recoil within graphics-requests',
//       graffixRequests,
//     );
//   }, [graffixRequests, populateRequestsList()]);

//   return (
//     <Page>
//       <Header
//         title={`${
//           departments.find((d) => d.id === currentDepartment)?.title
//         } Graphics Request`}
//         backgroundImage="/subtle-background-2.jpg"
//       >
//         <Image
//           alt="Graphics Requests Art Museum Header Image"
//           src="/departments/graffix/backoffice/graphics-requests.svg"
//           size={300}
//         ></Image>
//       </Header>
//       <StatusNav>
//         <StatusButton onClick={() => changeStatus('All')}>All</StatusButton>
//         <StatusButton color="grey" onClick={() => changeStatus('Not Started')}>
//           Not Started
//         </StatusButton>
//         <StatusButton
//           color="orange"
//           onClick={() => changeStatus('In-Progress')}
//         >
//           In-Progress
//         </StatusButton>
//         <StatusButton color="purple" onClick={() => changeStatus('Approved')}>
//           Approved
//         </StatusButton>
//         <StatusButton
//           color="blue"
//           onClick={() => changeStatus('Send To Print')}
//         >
//           Send to Print
//         </StatusButton>
//         <StatusButton
//           color="pink"
//           onClick={() => changeStatus('Waiting for Approval')}
//         >
//           Waiting for Approval
//         </StatusButton>
//         <StatusButton color="red" onClick={() => changeStatus('On Hold')}>
//           On Hold
//         </StatusButton>
//         <StatusButton color="green" onClick={() => changeStatus('Complete')}>
//           Complete
//         </StatusButton>
//         <StatusButton color="brown" onClick={() => changeStatus('Cancelled')}>
//           Cancelled
//         </StatusButton>
//       </StatusNav>
//       <FluidContainer>
//         {currentStatus === 'All' ? (
//           <>
//             {Object.values(requestsList).map((status, index) => (
//               <>
//                 <Typography as="h1" variant="title" key={index}>
//                   {status.title}: {status.data.length || 0}
//                 </Typography>
//                 {status.data.map((data, index) => (
//                   <ExpandableContainer key={index}>
//                     <Expandable
//                       indicator={<BiChevronRight size={48} />}
//                       header={
//                         <Typography
//                           variant="label"
//                           as="h3"
//                           margin={`${Spaces.sm} 0`}
//                         >
//                           {data.properties.Item.title[0]?.plain_text}
//                         </Typography>
//                       }
//                     >
//                       <RequestInfoContainer>
//                         <RequestLabel>Submission Date</RequestLabel>:{' '}
//                         {data.properties['Submission Date']?.date?.start}
//                       </RequestInfoContainer>
//                       <RequestInfoContainer>
//                         <RequestLabel>Requestor</RequestLabel>:{' '}
//                         {data.properties.Contact.rich_text[0]?.plain_text}
//                       </RequestInfoContainer>
//                       <RequestInfoContainer>
//                         {/* <RequestLabel>Artist</RequestLabel>: {} */}
//                       </RequestInfoContainer>
//                       <InnerRequestContainer>
//                         <RequestInfoContainer>
//                           <RequestLabel>Digital Delivery</RequestLabel>:
//                           <Typography as="p" variant="cta" weight="400">
//                             {
//                               data.properties['Digital Delivery']?.formula?.date
//                                 ?.start
//                             }
//                           </Typography>
//                         </RequestInfoContainer>
//                         <RequestInfoContainer>
//                           <RequestLabel>Send To Print</RequestLabel>:
//                           <Typography as="p" variant="cta" weight="400">
//                             {
//                               data.properties['Send to Print']?.formula?.date
//                                 ?.start
//                             }
//                           </Typography>
//                         </RequestInfoContainer>
//                         <RequestInfoContainer>
//                           <RequestLabel>Print Delivery</RequestLabel>:
//                           <Typography as="p" variant="cta" weight="400">
//                             {
//                               data.properties['Print Delivery']?.formula?.date
//                                 ?.start
//                             }
//                           </Typography>
//                         </RequestInfoContainer>
//                         <RequestInfoContainer>
//                           <RequestLabel>Event Date</RequestLabel>:
//                           <Typography as="p" variant="cta" weight="400">
//                             {data.properties['Event Date']?.date?.start}
//                           </Typography>
//                         </RequestInfoContainer>
//                       </InnerRequestContainer>

//                       <FluidContainer flex justifyContent="center">
//                         <Button
//                           variant="primary"
//                           href={data.properties['Project Brief']?.url}
//                         >
//                           View Request
//                         </Button>
//                       </FluidContainer>
//                     </Expandable>
//                   </ExpandableContainer>
//                 ))}
//               </>
//             ))}
//             <AllRequestsCountContainer>
//               <Typography as="h1" variant="title">
//                 Total: {total}
//               </Typography>
//             </AllRequestsCountContainer>
//           </>
//         ) : (
//           <>
//             <Typography as="h1" variant="title">
//               {currentStatus}: {requestCount}
//             </Typography>
//             {graffixRequests
//               .filter(
//                 (request) =>
//                   request.properties.Department.rich_text[0]?.plain_text.toLowerCase() ===
//                   currentDepartment,
//               )
//               .filter(
//                 (request) =>
//                   request.properties.Status.status.name === currentStatus,
//               )
//               .map((request) => (
//                 <ExpandableContainer key={request.title}>
//                   <Expandable
//                     indicator={<BiChevronRight size={48} />}
//                     header={
//                       <Typography
//                         variant="label"
//                         as="h3"
//                         margin={`${Spaces.sm} 0`}
//                       >
//                         {request.properties.Item.title[0]?.plain_text}
//                       </Typography>
//                     }
//                   >
//                     <RequestInfoContainer>
//                       <RequestLabel>Submission Date</RequestLabel>:{' '}
//                       {request.properties['Submission Date']?.date?.start}
//                     </RequestInfoContainer>
//                     <RequestInfoContainer>
//                       <RequestLabel>Requestor</RequestLabel>:{' '}
//                       {request.properties.Contact.rich_text[0]?.plain_text}
//                     </RequestInfoContainer>
//                     <RequestInfoContainer>
//                       {/* <RequestLabel>Artist</RequestLabel>: {} */}
//                     </RequestInfoContainer>
//                     <InnerRequestContainer>
//                       <RequestInfoContainer>
//                         <RequestLabel>Digital Delivery</RequestLabel>:
//                         <Typography as="p" variant="cta" weight="400">
//                           {
//                             request.properties['Digital Delivery']?.formula
//                               ?.date?.start
//                           }
//                         </Typography>
//                       </RequestInfoContainer>
//                       <RequestInfoContainer>
//                         <RequestLabel>Send To Print</RequestLabel>:
//                         <Typography as="p" variant="cta" weight="400">
//                           {
//                             request.properties['Send to Print']?.formula?.date
//                               ?.start
//                           }
//                         </Typography>
//                       </RequestInfoContainer>
//                       <RequestInfoContainer>
//                         <RequestLabel>Print Delivery</RequestLabel>:
//                         <Typography as="p" variant="cta" weight="400">
//                           {
//                             request.properties['Print Delivery']?.formula?.date
//                               ?.start
//                           }
//                         </Typography>
//                       </RequestInfoContainer>
//                       <RequestInfoContainer>
//                         <RequestLabel>Event Date</RequestLabel>:
//                         <Typography as="p" variant="cta" weight="400">
//                           {request.properties['Event Date']?.date?.start}
//                         </Typography>
//                       </RequestInfoContainer>
//                     </InnerRequestContainer>

//                     <FluidContainer flex justifyContent="center">
//                       <Button
//                         variant="primary"
//                         href={request.properties['Project Brief']?.url}
//                       >
//                         View Request
//                       </Button>
//                     </FluidContainer>
//                   </Expandable>
//                 </ExpandableContainer>
//               ))}
//           </>
//         )}
//       </FluidContainer>
//     </Page>
//   );
// };
