import styled, { css } from 'styled-components';
import { Colors, Spaces, media } from 'theme';
import { TableColorKey } from 'types';

interface ColorProps {
  $backgroundColor: TableColorKey;
  $textColor: TableColorKey;
}

interface AlignmentProps {
  $align?: 'left' | 'center' | 'right';
}

const getCellColors = ({ $backgroundColor, $textColor }: ColorProps) => css`
  background-color: ${Colors[$backgroundColor]};
  color: ${Colors[$textColor]};
`;

export const TableSection = styled.section`
  width: 100%;
`;

export const TableHeadingWrap = styled.div`
  margin-bottom: ${Spaces.md};
`;

export const TableTitleWrap = styled.div`
  margin-bottom: ${Spaces.sm};
`;

export const TableNoteWrap = styled.div<ColorProps>`
  ${({ $backgroundColor, $textColor }) =>
    getCellColors({ $backgroundColor, $textColor })};
  padding: ${Spaces.lg};
  text-align: center;
`;

export const DesktopScroll = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  ${media('tablet')`
    display: none;
  `}
`;

export const StyledTable = styled.table`
  width: 100%;
  min-width: 980px;
  border-collapse: collapse;
  table-layout: fixed;
`;

export const VisuallyHiddenCaption = styled.caption`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
`;

export const TableHeadCell = styled.th<ColorProps>`
  ${({ $backgroundColor, $textColor }) =>
    getCellColors({ $backgroundColor, $textColor })};
  padding: ${Spaces.md};
  border: 1px solid ${Colors.greyDark};
  vertical-align: middle;
`;

export const HeaderCellInner = styled.div`
  display: flex;
  min-height: 96px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${Spaces.sm};
`;

export const HeaderImage = styled.img`
  display: block;
  max-width: 96px;
  max-height: 64px;
  width: auto;
  height: auto;
  object-fit: contain;
`;

export const TableBodyHeaderCell = styled.th<ColorProps>`
  ${({ $backgroundColor, $textColor }) =>
    getCellColors({ $backgroundColor, $textColor })};
  padding: ${Spaces.md};
  border: 1px solid ${Colors.greyDark};
  vertical-align: middle;
`;

export const TableDataCell = styled.td<ColorProps>`
  ${({ $backgroundColor, $textColor }) =>
    getCellColors({ $backgroundColor, $textColor })};
  padding: ${Spaces.md};
  border: 1px solid ${Colors.greyDark};
  vertical-align: middle;
`;

export const TableCellContent = styled.div<AlignmentProps>`
  text-align: ${({ $align = 'center' }) => $align};
`;

export const MobileCards = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: grid;
    gap: ${Spaces.md};
    width: 100%;
  }
`;

export const MobileCard = styled.article`
  border: 1px solid ${Colors.greyLighter};
  background-color: ${Colors.white};
`;

export const MobileCardHeader = styled.div<ColorProps>`
  ${({ $backgroundColor, $textColor }) =>
    getCellColors({ $backgroundColor, $textColor })};
  padding: ${Spaces.md};
`;

export const MobileCardBody = styled.div`
  display: grid;
`;

export const MobileFieldRow = styled.div`
  display: grid;
  grid-template-columns: minmax(120px, 38%) 1fr;
  border-top: 1px solid ${Colors.greyLighter};

  ${media('mini')`
    grid-template-columns: 1fr;
  `}
`;

export const MobileFieldLabel = styled.div`
  padding: ${Spaces.sm} ${Spaces.md};
  background-color: ${Colors.greyLightest};
`;

export const MobileFieldValue = styled.div<ColorProps>`
  ${({ $backgroundColor, $textColor }) =>
    getCellColors({ $backgroundColor, $textColor })};
  padding: ${Spaces.sm} ${Spaces.md};
`;

export const MobileMergedField = styled.div<ColorProps>`
  ${({ $backgroundColor, $textColor }) =>
    getCellColors({ $backgroundColor, $textColor })};
  padding: ${Spaces.md};
  border-top: 1px solid ${Colors.greyLighter};
  text-align: center;
`;
