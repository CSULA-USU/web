import { AiOutlineFileText } from 'react-icons/ai';
import styled from 'styled-components';
import { Colors, Spaces } from 'theme';
import { StyledLink } from 'components';

export interface DocumentLinkProps {
  children: string;
  href: string;
}

const LinkInner = styled.div`
  display: flex;
  align-items: center;
  color: ${Colors.gold};
  margin: 0 ${Spaces.md};
  padding: ${Spaces.sm} ${Spaces.md} ${Spaces.sm} 0;
  &:hover {
    opacity: 0.8;
  }
`;

export const DocumentLink = ({ href, children }: DocumentLinkProps) => (
  <LinkInner>
    <StyledLink href={href} isExternalLink>
      <AiOutlineFileText
        style={{
          position: 'absolute',
          transform: 'translateX(-18px) translateY(1px)',
          flexShrink: '0',
        }}
      />{' '}
      {children}
    </StyledLink>
  </LinkInner>
);
