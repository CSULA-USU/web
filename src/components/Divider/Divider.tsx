import { Typography } from 'components/Typography';
import styled from 'styled-components';
import { Colors, Spaces } from 'theme';

interface DividerProps {
  color?: keyof typeof Colors;
  margin?: string;
  label?: string;
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

const DividerContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledDivider = styled.div<DividerProps>`
  flex-grow: 1;
  border-bottom: 1px solid ${(p) => Colors[p.color || 'black']};
  ${(p) => p.margin && `margin: ${p.margin}`};
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
