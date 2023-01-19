import Link from 'next/link';
import { AiOutlineFileText } from 'react-icons/ai';
import styled from 'styled-components';
import { Colors, Spaces } from 'theme';

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

export const DocumentLink = ({ href, children }: DocumentLinkProps) => (
  <Link href={href}>
    <LinkInner>
      <AiOutlineFileText size="24px" /> {children}
    </LinkInner>
  </Link>
);
