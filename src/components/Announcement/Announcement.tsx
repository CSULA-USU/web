import { Colors } from 'theme';
import styled from 'styled-components';
import { Typography } from 'components';
import Link from 'next/link';
interface AnnouncementProps {
  children?: React.ReactNode;
  text?: string;
  isVisible: boolean;
  isPreview?: boolean;
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
  children,
  href,
  linkText,
  text,
  isVisible,
  isPreview = false,
}: AnnouncementProps) => {
  const shouldRender = isPreview || isVisible;
  return shouldRender ? (
    <AnnouncementContainer>
      <AlertContainer>
        <Typography margin="4px 0 0 8px">{text}</Typography>
        {children}
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
