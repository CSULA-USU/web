import { Colors } from 'theme';
import styled from 'styled-components';
import { Typography } from 'components';
import { IconContext } from 'react-icons';
import { BsMegaphone } from 'react-icons/bs';
interface AnnouncementProps {
  text: string;
  isVisible: boolean;
}

const AnnouncementContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  background-color: ${Colors.primary};
`;

export const Announcement = ({ text, isVisible }: AnnouncementProps) => {
  return isVisible ? (
    <AnnouncementContainer>
      <BsMegaphone fontSize="24px" />
      <Typography as="h2" variant="bodySerif" weight="500" margin="4px 0 0 8px">
        {text}
      </Typography>
    </AnnouncementContainer>
  ) : null;
};
