import styled from 'styled-components';
import Link from 'next/link';
import { LuExternalLink } from 'react-icons/lu';

const UnderlineHover = styled.a`
  position: relative;
  text-decoration: none;
  color: inherit;
  display: inline-block;
  &:hover {
    opacity: 0.85;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 2px;
    background-color: currentColor;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  &:hover::after {
    opacity: 0.95;
  }
`;

const NoUnderlineHover = styled.a`
  text-decoration: underline;
  position: relative;
  color: inherit;

  &:hover {
    text-decoration: none;
    opacity: 0.8;
  }
`;

const StyleSpan = styled.span`
  display: flex;
  align-items: center;
`;

const IconStyling = {
  marginLeft: '10px',
  height: '100%',
  marginBottom: '1px',
};

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
        <Link href={href} target={isExternal ? '_blank' : undefined} passHref>
          <NoUnderlineHover>
            <StyleSpan>
              {children}
              {isExternal ? (
                <LuExternalLink style={IconStyling} aria-hidden="true" />
              ) : null}
            </StyleSpan>
          </NoUnderlineHover>
        </Link>
      ) : (
        <Link href={href} target={isExternal ? '_blank' : undefined} passHref>
          <UnderlineHover>
            <StyleSpan>
              {children}
              {isExternal ? (
                <LuExternalLink style={IconStyling} aria-hidden="true" />
              ) : null}
            </StyleSpan>
          </UnderlineHover>
        </Link>
      )}
    </>
  );
};
