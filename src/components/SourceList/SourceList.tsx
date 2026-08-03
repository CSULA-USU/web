import styled from 'styled-components';
import { Colors, Spaces } from 'theme';
import { Typography } from '../Typography';
import { StyledLink } from '../Link';
import { PlaceholderMarker } from '../PlaceholderMarker';

export interface Source {
  /** Numeral this row is cited by. Becomes `id="source-{id}"`. */
  id: string;
  label: string;
  note?: string;
  href?: string;
  /** Link text for `href`. Falls back to the bare host. */
  linkText?: string;
  /** Bracketed marker for a source whose public URL is not settled yet. */
  marker?: string;
}

interface SourceListProps {
  sources: Source[];
}

const List = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
`;

/* Each row is a citation target, so it carries the same offset as a section. */
const Row = styled.li`
  display: grid;
  grid-template-columns: ${Spaces.xl} 1fr;
  gap: ${Spaces.md};
  padding: ${Spaces.md} 0;
  scroll-margin-top: 84px;

  & + & {
    border-top: 1px solid ${Colors.greyLighter};
  }
`;

export const SourceList = ({ sources }: SourceListProps) => (
  <List>
    {sources.map((source) => (
      <Row key={source.id} id={`source-${source.id}`}>
        <Typography
          as="span"
          variant="span"
          size="md"
          weight="800"
          color="gold"
          tabularNums
          lineHeight="1.4"
        >
          {source.id}
        </Typography>
        <div>
          <Typography as="p" variant="span" size="sm" weight="700">
            {source.label}
          </Typography>
          {source.note && (
            <Typography
              as="p"
              variant="copy"
              size="sm"
              lineHeight="1.6"
              color="greyDarker"
              margin={`${Spaces.xs} 0 0`}
            >
              {source.note}{' '}
              {source.href && (
                <StyledLink href={source.href} isExternalLink>
                  {source.linkText || source.href}
                </StyledLink>
              )}{' '}
              {source.marker && (
                <PlaceholderMarker>{source.marker}</PlaceholderMarker>
              )}
            </Typography>
          )}
        </div>
      </Row>
    ))}
  </List>
);
