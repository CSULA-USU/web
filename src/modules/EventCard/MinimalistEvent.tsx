import { BsInfoCircle } from 'react-icons/bs';
import { Button, Skeleton, StyledLink, Typography } from 'components';
import { useBreakpoint } from 'hooks';
import { PresenceEvent } from 'types';
import styled from 'styled-components';
import { getDay, getMonth, getTime } from 'utils/timehelpers';
import { Colors, media } from 'theme';

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

const EventAndPreviewContainer = styled.div`
  position: relative;
  display: flex;
  &:hover ${LeftContainer} {
    border-left: 10px solid ${Colors.primary};
  }
`;

const MinimalistEventContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 96px;
  width: 100%;
  ${media('mobile')(
    'flex-direction: column; align-items: start; height: 200px; justify-content: center',
  )};
`;

const TitleContainer = styled.span`
  cursor: pointer;
`;

export const MinimalistEventSkeleton = () => {
  const { isDesktop, isMobile } = useBreakpoint();
  return (
    <MinimalistEventContainer>
      {isDesktop ? (
        isMobile ? (
          <Skeleton height="200px" />
        ) : (
          <Skeleton height="96px" />
        )
      ) : (
        <Skeleton height="96px" />
      )}
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
  const { isDesktop, isMobile } = useBreakpoint();
  if (!event) return null;
  const { eventName, location, startDateTimeUtc, endDateTimeUtc } = event;
  const startTime = getTime(startDateTimeUtc);
  const endTime = getTime(endDateTimeUtc);
  const monthAbbr = getMonth(startDateTimeUtc, 'short').toUpperCase();
  const month = getMonth(startDateTimeUtc);
  const day = getDay(startDateTimeUtc);
  return (
    <>
      {isDesktop ? (
        isMobile ? (
          <>
            <MinimalistEventContainer>
              <LeftContainer>
                <Typography as="h3" variant="eventDetail" color="gold">
                  <abbr title={`${month} ${day}`}>
                    {monthAbbr} {day}
                  </abbr>
                </Typography>
                <TitleContainer onClick={onClick}>
                  <Typography
                    as="h3"
                    variant="eventTitle"
                    color={isFeatured ? 'greyLighter' : 'black'}
                    size="md"
                  >
                    {eventName}
                  </Typography>
                </TitleContainer>
              </LeftContainer>
              <MiddleContainer>
                <Typography
                  as="h4"
                  variant="eventTime"
                  color={isFeatured ? 'greyLighter' : 'grey'}
                  weight="400"
                >
                  {location}
                </Typography>
                <Typography
                  as="h4"
                  variant="eventTime"
                  color={isFeatured ? 'greyLighter' : 'grey'}
                  weight="400"
                  margin="0 0 4px 0"
                >
                  {startTime}
                </Typography>
              </MiddleContainer>
              <RightContainer>
                <InfoContainer color={isFeatured ? 'white' : 'black'}>
                  {isFeatured && link ? (
                    <StyledLink href={link ? link : ''} isExternalLink>
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
                </InfoContainer>
              </RightContainer>
            </MinimalistEventContainer>
          </>
        ) : (
          <>
            <MinimalistEventContainer>
              <LeftContainer>
                <Typography as="h3" variant="eventDetail" color="gold">
                  <abbr title={`${month} ${day}`}>
                    {monthAbbr} {day}
                  </abbr>
                </Typography>
                <Typography
                  as="h4"
                  variant="eventTime"
                  color={isFeatured ? 'greyLighter' : 'grey'}
                  weight="400"
                >
                  {startTime}
                </Typography>
              </LeftContainer>
              <MiddleContainer>
                <TitleContainer onClick={onClick}>
                  <Typography
                    as="h3"
                    variant="eventTitle"
                    color={isFeatured ? 'greyLighter' : 'black'}
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
              </MiddleContainer>
              <RightContainer>
                <InfoContainer
                  color={isFeatured ? 'white' : 'black'}
                  style={{ fontSize: '30px' }}
                >
                  {isFeatured && link ? (
                    <StyledLink href={link ? link : ''} isExternalLink>
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
                </InfoContainer>
              </RightContainer>
            </MinimalistEventContainer>
          </>
        )
      ) : (
        <>
          <MinimalistEventContainer>
            <LeftContainer>
              <abbr title={`${month} ${day}`}>
                <Typography
                  as="h3"
                  variant="eventDetail"
                  color={isFeatured ? 'greyLighter' : 'black'}
                >
                  {monthAbbr} {day}
                </Typography>
              </abbr>
              <Typography
                as="h4"
                variant="eventTime"
                color={isFeatured ? 'greyLighter' : 'grey'}
                weight="400"
              >
                {startTime} - {endTime}
              </Typography>
            </LeftContainer>
            <MiddleContainer>
              <TitleContainer onClick={onClick}>
                <EventAndPreviewContainer>
                  <Typography
                    as="h3"
                    variant="eventTitle"
                    color="gold"
                    size="md"
                  >
                    {eventName}
                  </Typography>
                </EventAndPreviewContainer>
              </TitleContainer>
              <Typography
                as="h4"
                variant="eventTime"
                color={isFeatured ? 'greyLighter' : 'grey'}
                weight="400"
              >
                {location}
              </Typography>
            </MiddleContainer>
            <RightContainer>
              <Button
                variant={isFeatured ? 'greyDarker' : 'grey'}
                onClick={link ? undefined : onClick}
                href={link ? link : undefined}
              >
                {buttonText ? buttonText : 'View Event'}
              </Button>
            </RightContainer>
          </MinimalistEventContainer>
        </>
      )}
    </>
  );
};
