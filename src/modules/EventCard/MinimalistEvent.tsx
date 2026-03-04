import { BsInfoCircle } from 'react-icons/bs';
import { Button, Skeleton, StyledLink, Typography } from 'components';
import { PresenceEvent } from 'types';
import styled from 'styled-components';
import { getDay, getMonth, getTime } from 'utils/timehelpers';
import { media } from 'theme';
import { useBreakpoint } from 'hooks';

export interface MinimalistEventProps {
  buttonText?: string;
  event: PresenceEvent;
  isFeatured?: boolean;
  link?: string;
  onClick?: () => void;
}

const InfoContainer = styled.button<{ color: string }>`
  background: transparent;
  border: none;
  color: ${(p) => p.color};
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
`;

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
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
    height: 200px; 
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
  @media (min-width: 580px) and (max-width: 1023px) {
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

  const { eventName, location, startDateTimeUtc, endDateTimeUtc } = event;
  const startTime = getTime(startDateTimeUtc);
  const endTime = getTime(endDateTimeUtc);
  const monthAbbr = getMonth(startDateTimeUtc, 'short').toUpperCase();
  const month = getMonth(startDateTimeUtc);
  const day = getDay(startDateTimeUtc);

  const iconColor = isFeatured ? 'white' : 'black';

  return (
    <MinimalistEventContainer>
      <LeftContainer>
        <Typography
          as="h3"
          variant="eventDetail"
          color={isDesktop ? 'gold' : 'black'}
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
            color={isDesktop ? 'black' : 'gold'}
            size="md"
          >
            {eventName}
          </Typography>
        </TitleContainer>

        <Typography
          as="h4"
          variant="eventTime"
          color={isFeatured ? 'greyLighter' : 'grey'}
          weight="400"
        >
          {location}
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
          <InfoContainer color={iconColor}>
            <Button
              variant={isFeatured ? 'greyDarker' : 'grey'}
              onClick={link ? undefined : onClick}
              href={link ? link : undefined}
            >
              {buttonText ? buttonText : 'View Event'}
            </Button>
          </InfoContainer>
        </DesktopOnly>

        <TabletAndMobile>
          {isFeatured && link ? (
            <StyledLink href={link} isExternalLink>
              <BsInfoCircle
                title="Learn More"
                size={isMobile ? '18px' : '30px'}
                color="white"
              />
            </StyledLink>
          ) : (
            <BsInfoCircle
              title="Learn More"
              size={isMobile ? '18px' : '30px'}
              onClick={onClick}
            />
          )}
        </TabletAndMobile>
      </RightContainer>
    </MinimalistEventContainer>
  );
};
