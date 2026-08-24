import { BsInfoCircle } from 'react-icons/bs';
import { Button, Skeleton, Typography } from 'components';
import { CampusGroupsEvent } from 'types';
import styled from 'styled-components';
import { formatEventLocation } from 'utils/eventUtils';
import { getDay, getMonth, getTime } from 'utils/timehelpers';
import { media } from 'theme';
import { useBreakpoint } from 'hooks';

export interface MinimalistEventProps {
  buttonText?: string;
  event: CampusGroupsEvent;
  isFeatured?: boolean;
  link?: string;
  onClick?: () => void;
}

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  width: 50%;
  ${media('tablet')('width: 80%;')};
  ${media('mobile')('width: 100%;')};
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px;
  width: 25%;
  ${media('mobile')('width: 100%; padding-left: 0px;')};
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  line-height: 1.6;
  flex-shrink: 0;

  /* The icon is a replaced element, so a long title in the middle column would
     squeeze it instead of wrapping. */
  svg {
    flex-shrink: 0;
  }
`;
const MinimalistEventContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 96px;
  height: 96px;
  width: 100%;
  box-sizing: border-box;

  ${media('mobile')`
    flex-direction: column; 
    align-items: start; 
    min-height: 200px;
    height: auto; 
    justify-content: center;
  `};
`;

const ResponsiveSkeleton = styled(Skeleton)`
  height: 96px !important;
  width: 100%;

  ${media('mobile')`
    height: 200px !important;
  `};
`;

const TitleContainer = styled.span`
  cursor: pointer;
`;

const DesktopOnly = styled.div`
  display: none;
  @media (min-width: 1024px) {
    display: block;
  }
`;

const TabletAndMobile = styled.div`
  display: block;
  @media (min-width: 1024px) {
    display: none;
  }
`;

const MobileOnly = styled.div`
  display: none;
  ${media('mobile')`
    display: block;
  `};
`;

const TabletOnly = styled.div`
  display: none;
  @media (min-width: 581px) and (max-width: 1023px) {
    display: block;
  }
`;

export const MinimalistEventSkeleton = () => {
  return (
    <MinimalistEventContainer>
      <ResponsiveSkeleton />
    </MinimalistEventContainer>
  );
};

export const MinimalistEvent = ({
  buttonText,
  event,
  isFeatured,
  link,
  onClick,
}: MinimalistEventProps) => {
  const { isMobile, isDesktop } = useBreakpoint();
  if (!event) return null;

  const { title, eventLocation, eventStartDateTime, eventEndDateTime } = event;
  const startTime = getTime(eventStartDateTime);
  const endTime = getTime(eventEndDateTime);
  const monthAbbr = getMonth(eventStartDateTime, 'short').toUpperCase();
  const month = getMonth(eventStartDateTime);
  const day = getDay(eventStartDateTime);

  return (
    <MinimalistEventContainer>
      <LeftContainer>
        <Typography
          as="h3"
          variant="eventDetail"
          color={isFeatured ? 'white' : isDesktop ? 'gold' : 'black'}
        >
          <abbr title={`${month} ${day}`}>
            {monthAbbr} {day}
          </abbr>
        </Typography>

        <DesktopOnly>
          <Typography
            as="h4"
            variant="eventTime"
            color={isFeatured ? 'greyLighter' : 'grey'}
            weight="400"
          >
            {startTime} - {endTime}
          </Typography>
        </DesktopOnly>

        <TabletOnly>
          <Typography
            as="h4"
            variant="eventTime"
            color={isFeatured ? 'greyLighter' : 'grey'}
            weight="400"
          >
            {startTime}
          </Typography>
        </TabletOnly>
      </LeftContainer>

      <MiddleContainer>
        <TitleContainer onClick={onClick}>
          <Typography
            as="h3"
            variant="eventTitle"
            color={isFeatured ? 'pastelYellow' : isDesktop ? 'black' : 'gold'}
            size="md"
          >
            {title}
          </Typography>
        </TitleContainer>

        <Typography
          as="h4"
          variant="eventTime"
          color={isFeatured ? 'greyLighter' : 'grey'}
          weight="400"
        >
          {formatEventLocation(eventLocation)}
        </Typography>

        <MobileOnly>
          <Typography
            as="h4"
            variant="eventTime"
            color={isFeatured ? 'greyLighter' : 'grey'}
            weight="400"
            margin="0 0 4px 0"
          >
            {startTime}
          </Typography>
        </MobileOnly>
      </MiddleContainer>

      <RightContainer>
        <DesktopOnly>
          <Button
            variant={isFeatured ? 'greyDarker' : 'grey'}
            onClick={link ? undefined : onClick}
            href={link ? link : undefined}
          >
            {buttonText ? buttonText : 'View Event'}
          </Button>
        </DesktopOnly>

        <TabletAndMobile>
          {isFeatured && link ? (
            <Button
              href={link}
              isExternalLink
              variant="transparent"
              padding="0"
            >
              <BsInfoCircle
                title="Learn More"
                size={isMobile ? '18px' : '30px'}
                color="white"
              />
            </Button>
          ) : (
            <Button onClick={onClick} variant="transparent" padding="0">
              <BsInfoCircle
                title="Learn More"
                size={isMobile ? '18px' : '30px'}
              />
            </Button>
          )}
        </TabletAndMobile>
      </RightContainer>
    </MinimalistEventContainer>
  );
};
