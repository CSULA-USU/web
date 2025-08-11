import { Divider, Typography } from 'components';
import Image from 'next/image';
import { useEffect } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
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
const FixedModal = Modal as unknown as React.FC<any>;

const desktopCustomStyles = {
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
    padding: '20px 4px 0 0',
  },
};

const tabletCustomStyles = {
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
    padding: '12px 4px 0 0',
  },
};

const mobileCustomStyles = {
  overlay: { zIndex: 100 },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '95%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '12px',
    border: `1px solid ${Colors.greyLightest}`,
    boxShadow: '2px 4px 12px rgba(191, 191, 191, 0.25)',
    textDecoration: 'none',
    padding: '20px 0 0',
  },
};

const CloseButton = styled.button`
  background: transparent;
  height: 24px;
  width: 24px;
  border: none;
  cursor: pointer;
  margin: 0 20px 20px;
`;

const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid ${Colors.greyLightest};
`;

const CloseButtonIcon = styled(AiFillCloseCircle)`
  color: red;
  font-size: 24px;
  &:hover,
  &:focus {
    color: ${Colors.black};
    transition: 0.2s ease-in-out;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  padding: ${Spaces.md};
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
    <FixedModal
      role="dialog"
      contentLabel="Event Details"
      isOpen={isOpen}
      style={
        isMobile
          ? mobileCustomStyles
          : isDesktop
          ? tabletCustomStyles
          : desktopCustomStyles
      }
      onRequestClose={onRequestClose}
      ariaHideApp={false}
    >
      <CloseButtonContainer>
        <CloseButton onClick={onRequestClose} aria-label="close">
          <CloseButtonIcon />
        </CloseButton>
      </CloseButtonContainer>
      <Main>
        <Image
          src={`${PRESENCE_URI_BASE}/${photoUri}`}
          alt={`${eventName}`}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto', marginBottom: '24px' }}
          loading="lazy"
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
    </FixedModal>
  );
};
