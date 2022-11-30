import { Button, Typography } from 'components';
import styled from 'styled-components';
import { Colors } from 'theme';

export interface EventCardProps {
  featured?: boolean;
  image?: string;
  org: string;
  title: string;
  location: string;
  time: string;
  url: string;
}

const EventCardContainer = styled.div<{ image?: string; featured?: boolean }>`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background-color: ${Colors.grey};
  padding: 36px;
  width: 100%;
  justify-content: ${({ featured }) =>
    featured ? `flex-end` : `space-between`};
  height: ${({ featured }) => (featured ? `648px` : `400px`)};
  color: ${Colors.white};
  background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.6) 0%,
      rgba(0, 0, 0, 0.2) 20%,
      rgba(0, 0, 0, 0) 55%,
      rgba(0, 0, 0, 0.7) 80%,
      rgba(0, 0, 0, 0.85) 100%
    ),
    ${({ image }) => image && `url(${image})`};
  background-size: cover;
  background-position: center;
  > div:first-child {
    padding-bottom: 12px;
    border-bottom: ${({ featured }) =>
      featured ? `1px solid ${Colors.white}` : `none`};
    align-items: ${({ featured }) => (featured ? 'flex-end' : 'flex-start')};
  }
  position: relative;
`;

const EventCardTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

const EventCardBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const EventDate = styled.div`
  opacity: 1;
`;

export const EventCard = ({
  org,
  title,
  location,
  time,
  url,
  ...props
}: EventCardProps) => {
  return (
    <EventCardContainer {...props}>
      <EventCardTop>
        <EventDate>
          <Typography as="span" variant="eventDetail" lineHeight="1">
            DEC <br />
          </Typography>
          <Typography
            as="span"
            variant="heroHeading"
            color="white"
            lineHeight="1"
          >
            25
          </Typography>
        </EventDate>
        <Typography as="h5" variant="eventDetail">
          {org}
        </Typography>
      </EventCardTop>
      <div>
        <Typography as="h3" variant="eventTitle" lineHeight="1.2">
          {title}
        </Typography>
        <Typography as="h4" variant="eventTime">
          {time}
        </Typography>
        <EventCardBottom>
          <Typography as="h5" variant="eventDetail">
            {location}
          </Typography>
          {props.featured ? (
            <Button margin="12px 0 0">Learn More</Button>
          ) : (
            <Typography color="primary" size="sm">
              Learn More
            </Typography>
          )}
        </EventCardBottom>
      </div>
    </EventCardContainer>
  );
};
