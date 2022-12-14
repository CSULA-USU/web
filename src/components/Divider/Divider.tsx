import styled from 'styled-components';
import { Colors } from 'theme';

interface DividerProps {
  color: keyof typeof Colors;
  margin: string;
}

export const Divider = styled.div<DividerProps>`
  border-bottom: 1px solid ${(p) => Colors[p.color || 'black']};
  ${(p) => p.margin && `margin: ${p.margin}`};
`;
