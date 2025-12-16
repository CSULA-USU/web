import styled from 'styled-components';
import Link from 'next/link';
import { LuExternalLink } from 'react-icons/lu';

const UnderlineHover = styled(Link)`
  color: inherit;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
  text-decoration-color: transparent;
  transition: text-decoration-color 0.3s ease-in-out;

  &:hover {
    opacity: 0.8;
    text-decoration-color: currentColor;
  }
`;

const NoUnderlineHover = styled(Link)`
  color: inherit;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
  text-decoration-color: currentColor;
  transition: text-decoration-color 0.3s ease-in-out;

  &:hover {
    opacity: 0.8;
    text-decoration-color: transparent;
  }
`;

const StyledSpan = styled.span`
  line-height: 1;
`;

const StyledDiv = styled.span`
  display: inline-flex;
  align-items: center;
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
                <StyledDiv>
                  <LuExternalLink style={IconStyling} aria-hidden="true" />
                </StyledDiv>
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
                <StyledDiv>
                  <LuExternalLink style={IconStyling} aria-hidden="true" />
                </StyledDiv>
              ) : null}
            </StyledSpan>
          </UnderlineHover>
        </>
      )}
    </>
  );
};
