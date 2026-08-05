import styled from 'styled-components';
import { Colors } from 'theme';

type CitationContext = 'prose' | 'figure';

interface CitationMarkerProps {
  /** Numeric id of the row in the page's source list, e.g. `2`. */
  sourceId: string;
  /**
   * `prose` sits in running text at gold; `figure` sits beside a large
   * display figure and renders black, which is also what keeps it legible
   * on the yellow band where gold-on-yellow would fail AA.
   */
  context?: CitationContext;
}

const sizes: Record<CitationContext, { fontSize: string; padding: string }> = {
  prose: { fontSize: '0.6em', padding: '2px' },
  figure: { fontSize: '0.32em', padding: '4px' },
};

const Marker = styled.a<{ $context: CitationContext }>`
  font-weight: 700;
  vertical-align: super;
  text-decoration: none;
  color: ${(p) => (p.$context === 'prose' ? Colors.gold : Colors.black)};
  font-size: ${(p) => sizes[p.$context].fontSize};
  padding-left: ${(p) => sizes[p.$context].padding};

  &:hover {
    opacity: 0.7;
  }
`;

export const CitationMarker = ({
  sourceId,
  context = 'prose',
}: CitationMarkerProps) => (
  <Marker
    href={`#source-${sourceId}`}
    aria-label={`Source ${sourceId}`}
    $context={context}
  >
    {sourceId}
  </Marker>
);
