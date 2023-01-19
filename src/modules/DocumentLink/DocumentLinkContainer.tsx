import styled from 'styled-components';
import { DocumentLinkProps, DocumentLink } from './DocumentLink';

export interface DocumentLinkContainerProps {
  links: DocumentLinkProps[];
  stacked?: boolean;
}

const LinkContainer = styled.div<{ stacked: boolean }>`
  display: flex;
  flex-wrap: wrap;
  ${(p) => p.stacked && `flex-direction: column;`}
`;

export const DocumentLinkContainer = ({
  links,
  stacked,
}: DocumentLinkContainerProps) => (
  <LinkContainer stacked={stacked}>
    {links.map((l, i) => (
      <DocumentLink key={`${l.children}_${i}`} {...l} />
    ))}
  </LinkContainer>
);
