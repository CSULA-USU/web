import styled from 'styled-components';

/**
 * Removes content from view while leaving it in the accessibility tree — for
 * text alternatives that must be read but not seen, such as a chart's
 * underlying data table.
 */
export const VisuallyHidden = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
  margin: -1px;
  padding: 0;
`;
