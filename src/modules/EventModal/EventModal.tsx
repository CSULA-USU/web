import { Divider, Image, Typography } from 'components';
import { useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { useBreakpoint } from 'hooks';
import { Colors, Spaces } from 'theme';
import { PresenceEvent } from 'types';
import { PRESENCE_URI_BASE } from 'utils/constants';
import { getDay, getMonth, getTime, getYear } from 'utils/timehelpers';

interface EventModalProps {
  event?: PresenceEvent;
  isOpen: boolean;
  onRequestClose: () => void;
}

const customStyles = {
  overlay: { zIndex: 100 },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    borderRadius: '12px',
    border: `1px solid ${Colors.greyLightest}`,
    boxShadow: '2px 4px 12px rgba(191, 191, 191, 0.25)',
    textDecoration: 'none',
  },
};

const desktopCustomStyles = {
  overlay: { zIndex: 100 },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '85%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '12px',
    border: `1px solid ${Colors.greyLightest}`,
    boxShadow: '2px 4px 12px rgba(191, 191, 191, 0.25)',
    textDecoration: 'none',
  },
};

const mobileCustomStyles = {
  overlay: { zIndex: 100 },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '85%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '12px',
    border: `1px solid ${Colors.greyLightest}`,
    boxShadow: '2px 4px 12px rgba(191, 191, 191, 0.25)',
    textDecoration: 'none',
  },
};

const Main = styled.div`
  max-width: 100%;
  margin: ${Spaces.xs};
  display: flex;
  flex-direction: column;
  max-height: 80vh;
  img {
    max-height: 600px;
    object-fit: contain;
  }
  overflow-y: auto;
`;
export const EventModal = ({
  event,
  isOpen,
  onRequestClose,
}: EventModalProps) => {
  const { isMobile, isDesktop } = useBreakpoint();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!event) return null;
  const {
    startDateTimeUtc,
    endDateTimeUtc,
    photoUri,
    organizationName,
    eventName,
    location,
    description,
  } = event;
  const startTime = getTime(startDateTimeUtc);
  const endTime = getTime(endDateTimeUtc);
  const month = getMonth(startDateTimeUtc, 'long');
  const day = getDay(startDateTimeUtc);
  const year = getYear(startDateTimeUtc);

  return (
    <Modal
      isOpen={isOpen}
      style={
        isMobile
          ? mobileCustomStyles
          : isDesktop
          ? desktopCustomStyles
          : customStyles
      }
      onRequestClose={onRequestClose}
      ariaHideApp={false}
    >
      <Main tabIndex={0}>
        <Image
          src={`${PRESENCE_URI_BASE}/${photoUri}`}
          alt={`Image of ${eventName}`}
          width="100%"
          marginBottom="24px"
        />
        <Typography as="h2" variant="cta">
          {organizationName}
        </Typography>
        <Divider margin={`${Spaces.sm} 0`} />
        <Typography
          as="h3"
          variant="eventTitle"
          color="black"
          margin={`0 0 ${Spaces.xs}`}
        >
          {eventName}
        </Typography>
        <Typography as="h3" variant="eventDetail" color="gold" size="lg">
          {month} {day}, {year}
        </Typography>
        <Typography as="h4" variant="eventTime" color="grey" weight="400">
          {startTime} - {endTime}
        </Typography>
        <Typography
          as="h4"
          variant="eventTime"
          color="grey"
          weight="400"
          margin={`0 0 ${Spaces.md}`}
        >
          {location}
        </Typography>
        <Typography variant="copy" color="greyDark" margin={`0 0 ${Spaces.sm}`}>
          <span dangerouslySetInnerHTML={{ __html: description }} />
        </Typography>
      </Main>
      {/* <ShareLink></ShareLink> */}
    </Modal>
  );
};
