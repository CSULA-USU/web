import styled from 'styled-components';
import Link from 'next/link';
import { LuExternalLink } from 'react-icons/lu';

const UnderlineHover = styled(Link)`
  position: relative;
  text-decoration: none;
  color: inherit;
  display: inline-block;
  &:hover {
    opacity: 0.8;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -0.1px;
    width: 100%;
    height: 1px;
    background-color: currentColor;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  &:hover::after {
    opacity: 0.9;
  }
`;

const NoUnderlineHover = styled(Link)`
  text-decoration: none;
  position: relative;
  color: inherit;
  display: inline-block;

  &:hover {
    opacity: 0.8;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 1px;
    background-color: currentColor;
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
  }

  &:hover::after {
    opacity: 0;
  }
`;

const StyledSpan = styled.span`
  display: flex;
  align-items: center;
  line-height: 1.1;
`;

const IconStyling = {
  marginLeft: '4px',
  fontSize: 'inherit',
  color: 'currentColor',
  flexShrink: 0,
};

interface StyledLinkProps {
  children: React.ReactNode;
  href: string;
  inline?: false;
  isInverseUnderlineStyling?: boolean;
  isExternalLink?: boolean;
}

export const StyledLink = ({
  children,
  href,
  isInverseUnderlineStyling,
  isExternalLink,
}: StyledLinkProps) => {
  return (
    <>
      {isInverseUnderlineStyling ? (
        <>
          <NoUnderlineHover
            href={href}
            target={isExternalLink ? '_blank' : undefined}
            rel={isExternalLink ? 'noopener noreferrer' : undefined}
          >
            <StyledSpan>
              {children}
              {isExternalLink ? (
                <LuExternalLink style={IconStyling} aria-hidden="true" />
              ) : null}
            </StyledSpan>
          </NoUnderlineHover>
        </>
      ) : (
        <>
          <UnderlineHover
            href={href}
            target={isExternalLink ? '_blank' : undefined}
            rel={isExternalLink ? 'noopener noreferrer' : undefined}
          >
            <StyledSpan>
              {children}
              {isExternalLink ? (
                <LuExternalLink style={IconStyling} aria-hidden="true" />
              ) : null}
            </StyledSpan>
          </UnderlineHover>
        </>
      )}
    </>
  );
};
