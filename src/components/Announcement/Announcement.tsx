import { Colors } from 'theme';
import styled from 'styled-components';
import { Typography } from 'components';
import Link from 'next/link';
interface AnnouncementProps {
  text: string;
  isVisible: boolean;
  linkText?: string;
  href?: string;
}

const AlertContainer = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
`;

const AnnouncementContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  background-color: ${Colors.white};
  border-top: 6px solid #cc0000;
  border-bottom: 6px solid #cc0000;
`;

const LinkContainer = styled.div`
  text-decoration: underline;
`;

export const Announcement = ({
  href,
  linkText,
  text,
  isVisible,
}: AnnouncementProps) => {
  return isVisible ? (
    <AnnouncementContainer>
      <AlertContainer>
        <Typography margin="4px 0 0 8px">{text}</Typography>
      </AlertContainer>
      {linkText && href && (
        <LinkContainer>
          <Link href={href} target="_blank">
            <Typography weight="700">{linkText}</Typography>
          </Link>
        </LinkContainer>
      )}
    </AnnouncementContainer>
  ) : null;
};
