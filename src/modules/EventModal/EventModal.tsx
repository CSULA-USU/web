import { Divider, Image, Typography } from 'components';
import { useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
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

const Main = styled.div`
  max-width: 600px;
  margin: ${Spaces.xs};
  display: flex;
  flex-direction: column;
  max-height: 80vh;
  img {
    max-height: 400px;
    object-fit: contain;
  }
  overflow-y: auto;
`;
export const EventModal = ({
  event,
  isOpen,
  onRequestClose,
}: EventModalProps) => {
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
    description,
  } = event;
  const startTime = getTime(startDateTimeUtc);
  const endTime = getTime(endDateTimeUtc);
  const month = getMonth(startDateTimeUtc, 'long');
  const day = getDay(startDateTimeUtc);
  const year = getYear(startDateTimeUtc);

  return (
    <Modal isOpen={isOpen} style={customStyles} onRequestClose={onRequestClose}>
      <Main>
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
        <Typography as="h1" variant="label" margin={`0 0 ${Spaces.xs}`}>
          {eventName}
        </Typography>
        <Typography
          as="h3"
          variant="subheader"
          color="greyDark"
          margin={`0 0 ${Spaces.md}`}
        >
          {month} {day} {year}, {startTime} - {endTime}
        </Typography>
        <Typography variant="copy" color="greyDark" margin={`0 0 ${Spaces.sm}`}>
          <span dangerouslySetInnerHTML={{ __html: description }} />
        </Typography>
      </Main>
      {/* <ShareLink></ShareLink> */}
    </Modal>
  );
};
