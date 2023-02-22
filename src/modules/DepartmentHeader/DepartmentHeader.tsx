import { Typography, FluidContainer } from 'components';
import { EventCard } from '../../modules/EventCard';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { eventListState } from 'atoms';
import { useState } from 'react';
import { PresenceEvent } from 'types';
import { EventModal } from 'modules/EventModal';

interface DepartmentHeaderProps {
  title: string;
  backgroundImage?: string;
  children: React.ReactNode;
  infoSection: React.ReactNode;
}
const HeaderContent = styled.div`
  min-width: 50%;
  padding: 48px;
`;
const HeaderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
export const DepartmentHeader = ({
  title,
  children,
  infoSection,
}: DepartmentHeaderProps) => {
  const events = useRecoilValue(eventListState);
  const departmentEvent = events.find(
    (event) => event.organizationName === title,
  );
  const [selectedEvent, selectEvent] = useState<undefined | PresenceEvent>(
    undefined,
  );
  const onRequestClose = () => selectEvent(undefined);
  return (
    <>
      <FluidContainer backgroundImage="subtle-background-3.jpg">
        <HeaderContainer>
          <HeaderContent>
            <Typography variant="labelTitle">Welcome to the</Typography>
            <Typography margin="0 0 24px" variant="titleLarge" weight="400">
              {title}
            </Typography>
            <Typography>{children}</Typography>
          </HeaderContent>
          {departmentEvent && (
            <EventCard
              onClick={() => selectEvent(departmentEvent)}
              featured
              event={departmentEvent}
            />
          )}
        </HeaderContainer>
        {infoSection}
      </FluidContainer>
      <EventModal
        isOpen={!!selectedEvent}
        event={selectedEvent}
        onRequestClose={onRequestClose}
      />
    </>
  );
};

// import styled from 'styled-components';
// import { FluidContainer, Typography } from 'components';
// import { EventCard } from 'modules';
// import { PresenceEvent } from 'types';
// import { Spaces } from 'theme';
// import { useState } from 'react';
// import { EventModal } from 'modules/EventModal';

// const HeaderContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `;

// export const EventHeader = ({
//   featuredEvent,
//   title,
// }: {
//   featuredEvent: PresenceEvent;
//   title?: React.ReactNode;
// }) => {
//   const [selectedEvent, selectEvent] = useState<undefined | PresenceEvent>(
//     undefined,
//   );
//   const onRequestClose = () => selectEvent(undefined);
//   return (
//     <FluidContainer
//       flex
//       flexDirection="column"
//       backgroundImage="/subtle-background-1.jpg"
//     >
//       <Typography
//         variant="pageHeader"
//         margin={`0 auto ${Spaces.lg}`}
//         size="2xl"
//         color="greyDarker"
//       >
//         {title}
//       </Typography>
//       <HeaderContainer onClick={() => selectEvent(featuredEvent)}>
//         <EventCard featured event={featuredEvent} />
//       </HeaderContainer>
//       <EventModal
//         isOpen={!!selectedEvent}
//         event={selectedEvent}
//         onRequestClose={onRequestClose}
//       />
//     </FluidContainer>
//   );
// };
