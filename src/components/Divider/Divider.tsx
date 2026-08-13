import { Typography } from 'components/Typography';
import styled from 'styled-components';
import { Colors, Spaces } from 'theme';

interface DividerProps {
  color?: keyof typeof Colors;
  margin?: string;
  label?: string;
  size?: string;
  variant?:
    | 'label'
    | 'title'
    | 'eventDetail'
    | 'pageHeader'
    | 'cta'
    | 'titleLarge'
    | 'titleSmall'
    | 'subheader'
    | 'labelTitle'
    | 'labelTitleSmall'
    | 'copy'
    | 'eventTitle'
    | 'eventTime';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
}

/* Spans its parent by width, never by growth. `flex-grow` runs along the
   parent's main axis, so a growing divider inside a column container absorbs
   that column's free space and stretches to hundreds of pixels tall with its
   rule stranded at the bottom. `width` is the same edge-to-edge in every
   orientation, and it also survives an `align-items` that would otherwise
   shrink an empty box to nothing. */
const StyledDivider = styled.div<DividerProps>`
  width: 100%;
  border-bottom: ${(p) => p.size} solid ${(p) => Colors[p.color || 'black']};
  ${(p) => p.margin && `margin: ${p.margin}`};
`;

const DividerContainer = styled.div`
  display: flex;
  align-items: center;

  /* The one place growth is wanted: beside a label the rule is a row item, so
     the main axis is horizontal and it fills whatever width the label leaves.
     A zero basis rather than the 100% above, so the label keeps its full
     width instead of being shrunk to make room. */
  ${StyledDivider} {
    flex: 1 1 0;
  }
`;

export const Divider = ({
  variant = 'label',
  as,
  label,
  ...props
}: DividerProps) =>
  label ? (
    <DividerContainer>
      <Typography
        as={as}
        variant={variant}
        margin={`${Spaces.sm} ${Spaces.sm} ${Spaces.md} 0`}
      >
        {label}
      </Typography>
      <StyledDivider {...props} />
    </DividerContainer>
  ) : (
    <StyledDivider {...props} />
  );
