import styled from 'styled-components';
import Link from 'next/link';
import { LuExternalLink } from 'react-icons/lu';

const UnderlineHover = styled(Link)`
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

const NoUnderlineHover = styled(Link)`
  text-decoration: none;
  position: relative;
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
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
  }

  &:hover::after {
    opacity: 0;
  }
`;

const StyleSpan = styled.span`
  display: flex;
  align-items: center;
`;

const IconStyling = {
  marginLeft: '4px',
  height: '100%',
  marginBottom: '1px',
  fontSize: 'inherit',
  color: 'currentColor',
};

interface StyledLinkProps {
  children: React.ReactNode;
  href: string;
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
        <NoUnderlineHover
          href={href}
          target={isExternalLink ? '_blank' : undefined}
        >
          <StyleSpan>
            {children}
            {isExternalLink ? (
              <LuExternalLink style={IconStyling} aria-hidden="true" />
            ) : null}
          </StyleSpan>
        </NoUnderlineHover>
      ) : (
        <UnderlineHover
          href={href}
          target={isExternalLink ? '_blank' : undefined}
        >
          <StyleSpan>
            {children}
            {isExternalLink ? (
              <LuExternalLink style={IconStyling} aria-hidden="true" />
            ) : null}
          </StyleSpan>
        </UnderlineHover>
      )}
    </>
  );
};
