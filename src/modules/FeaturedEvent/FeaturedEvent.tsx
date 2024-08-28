// import { FluidContainer, Typography } from 'components';
// import { MinimalistEvent } from 'modules/EventCard';
// import styled from 'styled-components';
// import { Colors, media } from 'theme';
// import { useBreakpoint } from 'hooks';
// import { BsInfoCircle } from 'react-icons/bs';

// const InfoContainer = styled.button`
//   background: transparent;
//   border: none;
//   padding: 0;
//   cursor: pointer;
// `;

// const MiddleContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 50%;
//   ${media('tablet')('width: 80%;')};
//   ${media('mobile')('width: 100%;')};
// `;

// const LeftContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   padding-left: 10px;
//   width: 25%;
//   ${media('mobile')('width: 100%; padding-left: 0px;')};
// `;

// const RightContainer = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const EventAndPreviewContainer = styled.div`
//   position: relative;
//   display: flex;
//   &:hover ${LeftContainer} {
//     border-left: 10px solid ${Colors.primary};
//   }
// `;

// const MinimalistEventContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   height: 96px;
//   width: 100%;
//   ${media('mobile')(
//     'flex-direction: column; align-items: start; height: 200px; justify-content: center',
//   )};
// `;

// const TitleContainer = styled.span`
//   cursor: pointer;
// `;

// interface FeaturedEventsProps {
//   featuredEvents: EventProps[];
// }

// interface EventProps {
//   date: string;
//   time: string;
//   title: string;
//   location: string;
// }

// export const FeaturedEvents = ({ featuredEvents }: FeaturedEventsProps) => {
//   return (
//     <FluidContainer>
//       <Typography as="h2" variant="title">
//         Featured
//       </Typography>

//       <Typography as="h2" variant="title">
//         Featured
//       </Typography>
//     </FluidContainer>
//   );
// };
