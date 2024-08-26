import styled from 'styled-components';
import Link from 'next/link';
import { LuExternalLink } from 'react-icons/lu';

const UnderlineHover = styled.a`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    opacity: 0.8;
  }
`;

const NoUnderlineHover = styled.a`
  text-decoration: underline;
  &:hover {
    text-decoration: none;
    opacity: 0.8;
  }
`;

const IconStyling = {
  marginLeft: '10px',
  height: '100%',
  marginBottom: '1px',
};
const StyleSpan = styled.span`
  display: flex;
  align-items: center;
`;

interface StyledLinkProps {
  children: React.ReactNode;
  href: string;
  isInverse?: boolean;
  isExternal?: boolean;
}

// Usage:
export const StyledLink = ({
  children,
  href,
  isInverse,
  isExternal,
}: StyledLinkProps) => {
  return (
    <>
      {isInverse ? (
        <NoUnderlineHover>
          <StyleSpan>
            <Link href={href}>{children}</Link>
            {isExternal ? (
              <LuExternalLink style={IconStyling} aria-hidden="true" />
            ) : null}
          </StyleSpan>
        </NoUnderlineHover>
      ) : (
        <UnderlineHover>
          <StyleSpan>
            <Link href={href} target={isExternal ? '_blank' : ''}>
              {children}
            </Link>
            {isExternal ? (
              <LuExternalLink style={IconStyling} aria-hidden="true" />
            ) : null}
          </StyleSpan>
        </UnderlineHover>
      )}
    </>
  );
};
