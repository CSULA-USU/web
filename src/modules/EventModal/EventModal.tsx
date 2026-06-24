import { Divider, Image, Typography } from 'components';
import { useEffect, useRef } from 'react';
import {
  AiFillCloseCircle,
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlineEnvironment,
} from 'react-icons/ai';
import Modal from 'react-modal';
import styled from 'styled-components';
import { useBreakpoint } from 'hooks';
import { Colors, Spaces } from 'theme';
import { CampusGroupsEvent } from 'types';
import { formatEventLocation } from 'utils/eventUtils';
import { getDay, getMonth, getTime, getYear } from 'utils/timehelpers';

interface EventModalProps {
  event?: CampusGroupsEvent;
  isOpen: boolean;
  onRequestClose: () => void;
}
const FixedModal = Modal as unknown as React.FC<any>;

const baseContent = {
  top: '50%',
  left: '50%',
  right: 'auto',
  bottom: 'auto',
  transform: 'translate(-50%, -50%)',
  borderRadius: '16px',
  border: `1px solid ${Colors.greyLightest}`,
  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.18)',
  textDecoration: 'none',
  padding: '0',
  overflow: 'hidden',
};

const desktopCustomStyles = {
  overlay: { zIndex: 100, backgroundColor: 'rgba(0, 0, 0, 0.45)' },
  content: { ...baseContent, width: '560px', maxWidth: '90vw' },
};

const tabletCustomStyles = {
  overlay: { zIndex: 100, backgroundColor: 'rgba(0, 0, 0, 0.45)' },
  content: { ...baseContent, width: '85%' },
};

const mobileCustomStyles = {
  overlay: { zIndex: 100, backgroundColor: 'rgba(0, 0, 0, 0.45)' },
  content: { ...baseContent, width: '94%' },
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
  padding-top: ${Spaces.md};
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
  max-height: 80vh;
  padding: 0 ${Spaces.lg} ${Spaces.lg};
  overflow-y: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
`;

/**
 * Aspect-agnostic frame: event flyers arrive as either landscape photos or
 * square graphics. The image is centered and capped by height (never forced to
 * full width), so a square flyer stays a sensible size instead of ballooning to
 * the full modal width, and nothing gets cropped.
 */
const MediaFrame = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: ${Spaces.lg};
  padding-top: ${Spaces.lg};

  img {
    width: auto;
    max-width: 100%;
    max-height: 380px;
    object-fit: contain;
    border-radius: 12px;
    display: block;
  }
`;

const MetaList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spaces.xs};
  margin-bottom: ${Spaces.md};
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${Spaces.sm};

  svg {
    color: ${Colors.gold};
    font-size: 18px;
    flex-shrink: 0;
  }
`;

export const EventModal = ({
  event,
  isOpen,
  onRequestClose,
}: EventModalProps) => {
  const { isMobile, isDesktop } = useBreakpoint();
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const scrollAmount = 50;
      const container = mainRef.current;

      if (container) {
        if (event.key === 'ArrowDown' || event.key === 'Down') {
          event.preventDefault();
          container.scrollTop += scrollAmount;
        } else if (event.key === 'ArrowUp' || event.key === 'Up') {
          event.preventDefault();
          container.scrollTop -= scrollAmount;
        }
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!event) return null;
  const {
    eventStartDateTime,
    eventEndDateTime,
    eventOriginalPhotoFullUrl,
    group,
    title,
    eventLocation,
    description,
  } = event;
  const startTime = getTime(eventStartDateTime);
  const endTime = getTime(eventEndDateTime);
  const month = getMonth(eventStartDateTime, 'long');
  const day = getDay(eventStartDateTime);
  const year = getYear(eventStartDateTime);

  return (
    <FixedModal
      role="dialog"
      contentLabel="Event Details"
      isOpen={isOpen}
      style={
        isMobile
          ? mobileCustomStyles
          : isDesktop
          ? desktopCustomStyles
          : tabletCustomStyles
      }
      onRequestClose={onRequestClose}
      onAfterOpen={() => {
        mainRef.current?.focus();
      }}
      ariaHideApp={false}
    >
      <CloseButtonContainer>
        <CloseButton onClick={onRequestClose} aria-label="close">
          <CloseButtonIcon />
        </CloseButton>
      </CloseButtonContainer>
      <Main
        ref={mainRef}
        tabIndex={-1}
        style={{ outline: 'none' }}
        className="modal-content"
      >
        {eventOriginalPhotoFullUrl && (
          <MediaFrame>
            <Image src={eventOriginalPhotoFullUrl} alt={title} lazy />
          </MediaFrame>
        )}

        {group && (
          <Typography
            as="p"
            variant="cta"
            color="gold"
            uppercase
            letterSpacing="0.08em"
            margin={`0 0 ${Spaces.xs}`}
          >
            {group}
          </Typography>
        )}

        <Typography
          as="h2"
          variant="title"
          size="xl"
          color="black"
          margin={`0 0 ${Spaces.md}`}
        >
          {title}
        </Typography>

        <MetaList>
          <MetaRow>
            <AiOutlineCalendar />
            <Typography
              as="span"
              variant="span"
              color="greyDarkest"
              weight="600"
            >
              {month} {day}, {year}
            </Typography>
          </MetaRow>
          <MetaRow>
            <AiOutlineClockCircle />
            <Typography as="span" variant="span" color="greyDarkest">
              {startTime} - {endTime}
            </Typography>
          </MetaRow>
          <MetaRow>
            <AiOutlineEnvironment />
            <Typography as="span" variant="span" color="greyDarkest">
              {formatEventLocation(eventLocation)}
            </Typography>
          </MetaRow>
        </MetaList>

        <Divider margin={`0 0 ${Spaces.md}`} color="grey" size="1px" />

        <Typography
          as="div"
          variant="prose"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </Main>
    </FixedModal>
  );
};
