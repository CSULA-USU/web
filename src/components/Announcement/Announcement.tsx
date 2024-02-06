import { Colors } from 'theme';
import styled from 'styled-components';
import { Typography } from 'components';
import { BsMegaphone } from 'react-icons/bs';
import { useBreakpoint } from 'hooks';
interface AnnouncementProps {
  text: string;
  isVisible: boolean;
}

const AnnouncementContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  background-color: ${Colors.white};
  border-top: 6px solid #cc0000;
  border-bottom: 6px solid #cc0000;
`;

export const Announcement = ({ text, isVisible }: AnnouncementProps) => {
  const { isMobile } = useBreakpoint();

  return isVisible ? (
    <AnnouncementContainer>
      <BsMegaphone fontSize={isMobile ? '40px' : '24px'} />
      <Typography margin="4px 0 0 8px">{text}</Typography>
    </AnnouncementContainer>
  ) : null;
};
