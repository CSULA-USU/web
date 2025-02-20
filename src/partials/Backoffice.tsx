import { Typography } from 'components';
import Link from 'next/link';
import { ReactNode } from 'react';
import styled from 'styled-components';

interface LinksProps {
  title: string;
  url: string;
}

const links: LinksProps[] = [
  {
    title: 'Graffix Requests',
    url: '/backoffice/graffix-requests',
  },
  {
    title: 'Maintenance Orders',
    url: '/backoffice/graffix-requests',
  },
];

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const SidebarContainer = styled.div`
  width: 240px;
  display: flex;
  flex-direction: column;
  background-color: #2b2b2b;
`;

const LinkContainer = styled.div`
  box-shadow: rgba(255, 255, 255, 0.14) 0px 3px 8px;
  padding: 2rem 1rem;
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      {links.map((link: LinksProps) => {
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
