import Link from 'next/link';
import { AiOutlineFileText } from 'react-icons/ai';
import styled from 'styled-components';
import { Colors, Spaces } from 'theme';
import { LuExternalLink } from 'react-icons/lu';

export interface DocumentLinkProps {
  children: string;
  href: string;
}

const LinkInner = styled.div`
  display: flex;
  align-items: center;
  color: ${Colors.gold};
  padding: ${Spaces.sm} ${Spaces.md} ${Spaces.sm} 0;
  &:hover {
    opacity: 0.8;
  }
`;

const IconStyling = {
  marginLeft: '4px',
  height: '100%',
  marginBottom: '1px',
  fontSize: 'inherit',
  color: 'currentColor',
};

export const DocumentLink = ({ href, children }: DocumentLinkProps) => (
  <Link href={href}>
    <LinkInner>
      <AiOutlineFileText size="18px" style={{ margin: '0 4px 0 0' }} />{' '}
      {children}
      <LuExternalLink style={IconStyling} aria-hidden="true" />
    </LinkInner>
  </Link>
);
