import { Typography } from 'components';
import { useBreakpoint } from 'hooks';
import Link from 'next/link';
import { ReactNode } from 'react';
import styled from 'styled-components';
import backOfficeLinks from 'data/backOfficeLinks.json';

interface LinksProps {
  title: string;
  url: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const SidebarContainer = styled.div`
  width: 120px;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  background-color: #1b1a1a;
`;

const LinkContainer = styled.div`
  box-shadow: rgba(255, 255, 255, 0.14) 0px 3px 8px;
  padding: 2rem 1rem;
`;

const Sidebar = () => {
  const { isTablet } = useBreakpoint();
  if (isTablet) return <></>;
  return (
    <SidebarContainer>
      {backOfficeLinks.map((link: LinksProps) => {
        return (
          <Link key={link.title} href={link.url}>
            <LinkContainer>
              <Typography as="h3" variant="labelTitle" color="white">
                {link.title}
              </Typography>
            </LinkContainer>
          </Link>
        );
      })}
    </SidebarContainer>
  );
};

export const BackOfficeTemplate = ({ children }: { children: ReactNode }) => {
  return (
    <Container>
      <Sidebar />
      {children}
    </Container>
  );
};
