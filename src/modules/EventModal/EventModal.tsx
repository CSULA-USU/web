import { Button, Divider, Image, Typography } from 'components';
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
import { formatEventLocation, getEventFlyerUrl } from 'utils/eventUtils';
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
 * The media well, sized by ratio rather than by the image it holds.
 *
 * That is what keeps the modal still. A box that takes its height from the
 * image is 0px tall on open and jumps to full height once the flyer decodes,
 * throwing the group, title, date, time, location and description down the
 * page as it goes. Reserving the space up front costs nothing and removes the
 * shift entirely — and it is also what gives the skeleton a box to fill, since
 * an overlay stretched over a zero-height parent paints nothing.
 *
 * 3:2 because the well holds flyers rather than covers. `getEventFlyerUrl`
 * prefers the coordinator's own upload, and those are square — all three in
 * the 2026-09-14 feed are 1080x1080 — where the 2:1 covers it falls back to
 * are the platform's crop of exactly those squares. Matching the cover meant
 * showing a flyer at 248px inside a 496px well; 3:2 gives it 330px. The
 * stragglers (that feed held one at 4.4:1 and one at 5.71:1) sit inside the
 * well rather than resizing it.
 *
 * Ratio rather than a pixel height so the well tracks the modal's own width,
 * which is set per breakpoint above — no second set of numbers to keep in step.
 *
 * `contain`, never `cover`: flyers routinely carry text, and cropping a 5.71:1
 * banner to fill the well would cut most of it away.
 */
const MediaFrame = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 3 / 2;
  margin: ${Spaces.lg} 0;

  /* The skeleton frame Image wraps itself in sits between this and the img, so
     it has to become the centering box or the flyer lands top-left of the well
     instead of in it. */
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  img {
    width: auto;
    max-width: 100%;
    max-height: 100%;
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
  const { isMobile, isTablet } = useBreakpoint();
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
    group,
    title,
    eventLocation,
    description,
    eventLink,
  } = event;
  const flyerUrl = getEventFlyerUrl(event);
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
          : isTablet
          ? tabletCustomStyles
          : desktopCustomStyles
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
        {flyerUrl && (
          <MediaFrame>
            {/* Decorative, so alt is empty: the host group, title, date, time
                and location are all printed as text directly below, and on the
                111 of 268 feed items with no flyer this falls back to the
                group's generic cover. The old alt repeated the title, which
                told a screen reader nothing and misdescribed a CSI logo as the
                event name.

                Worth revisiting now that the well shows real flyers rather
                than the platform's crop of them: a flyer carrying information
                of its own — a QR code, a lineup, a dress code — is dropped
                silently by an empty alt. The feed's own eventPhotoAltText is
                not the substitute; it is mostly "csi cover photo", and its
                longer entries arrive double-escaped. */}
            <Image src={flyerUrl} alt="" lazy skeletonWhileLoading />
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

        {eventLink && (
          <Button
            href={eventLink}
            isExternalLink
            variant="primary"
            margin={`${Spaces.lg} 0 0`}
          >
            RSVP
          </Button>
        )}
      </Main>
    </FixedModal>
  );
};
