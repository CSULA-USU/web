import styled from 'styled-components';
import Link from 'next/link';

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

interface StyledLinkProps {
  children: React.ReactNode;
  href: string;
  inverse?: boolean;
}

// Usage:
export const StyledLink = ({ children, href, inverse }: StyledLinkProps) => {
  return (
    <>
      {inverse ? (
        <NoUnderlineHover>
          <Link href={href}>{children}</Link>
        </NoUnderlineHover>
      ) : (
        <UnderlineHover>
          <Link href={href}>{children}</Link>
        </UnderlineHover>
      )}
    </>
  );
};
