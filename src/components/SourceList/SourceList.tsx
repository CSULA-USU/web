import styled from 'styled-components';
import { Colors, media, Spaces } from 'theme';
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
  /** Two halves the height of a long list. Collapses to one on tablet. */
  columns?: 1 | 2;
}

/* Multi-column rather than a grid, so the numerals still run straight down
   each column — 1 to 5 on the left, 6 to 10 on the right. A two-up grid
   would zig-zag them across the rows, which is the wrong shape for a list
   whose whole job is to be looked up by number. */
const List = styled.ol<{ $columns: 1 | 2 }>`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  column-count: ${(p) => p.$columns};
  column-gap: ${Spaces['2xl']};

  ${media('tablet')(`
    column-count: 1;
  `)}
`;

/* Each row is a citation target, so it carries the same offset as a section.
   `break-inside` keeps a row whole: a citation marker that jumps to a source
   split across two columns lands on half an entry. */
const Row = styled.li`
  display: grid;
  grid-template-columns: ${Spaces.xl} 1fr;
  gap: ${Spaces.md};
  padding: ${Spaces.md} 0;
  scroll-margin-top: 84px;
  break-inside: avoid;

  & + & {
    border-top: 1px solid ${Colors.greyLighter};
  }
`;

export const SourceList = ({ sources, columns = 1 }: SourceListProps) => (
  <List $columns={columns}>
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
              {source.note}
            </Typography>
          )}
          {/* On its own line rather than trailing the note. In a narrow
              column a link buried at the end of a sentence is easy to miss,
              and it wraps mid-label. Gold and underlined at rest, matching
              the row numeral — the point of this section is that a reader
              can go and check, so the way out has to be obvious. */}
          {source.href && (
            <Typography
              as="p"
              variant="copy"
              size="sm"
              color="gold"
              margin={`${Spaces.xs} 0 0`}
            >
              <StyledLink
                href={source.href}
                isExternalLink
                isInverseUnderlineStyling
              >
                {source.linkText || source.href}
              </StyledLink>
            </Typography>
          )}
          {source.marker && (
            <Typography as="p" margin={`${Spaces.xs} 0 0`}>
              <PlaceholderMarker>{source.marker}</PlaceholderMarker>
            </Typography>
          )}
        </div>
      </Row>
    ))}
  </List>
);
