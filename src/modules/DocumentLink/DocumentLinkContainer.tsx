import styled from 'styled-components';
import { DocumentLinkProps, DocumentLink } from './DocumentLink';

export interface DocumentLinkContainerProps {
  grid?: boolean;
  links: DocumentLinkProps[];
  stacked?: boolean;
}

const LinkContainer = styled.div<{ stacked: boolean; grid: boolean }>`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  ${(p) => p.stacked && `flex-direction: column;`}
  ${(p) =>
    p.grid &&
    `display: grid; 
     grid-template-columns: repeat(2, 1fr);
     @media (max-width: 1428px) {
      grid-template-columns: repeat(2, 1fr);
     }
     @media (max-width: 1081px) {
      grid-template-columns: 1fr;
     }
     `}
`;

export const DocumentLinkContainer = ({
  links,
  stacked,
  grid,
}: DocumentLinkContainerProps) => (
  <LinkContainer stacked={!!stacked} grid={!!grid}>
    {links.map((l, i) => (
      <DocumentLink key={`${l.children}_${i}`} {...l} />
    ))}
  </LinkContainer>
);
