import { Dispatch, ReactElement, SetStateAction } from 'react';
import { KeyValueProps } from './ContentBoardTypes';
import styled from 'styled-components';
import { Typography } from 'components';
import Link from 'next/link';
import { FontSizes } from 'theme';

const Sidebar = styled.div<{ visible: boolean }>`
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  width: 50vh;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  /* padding: 1rem; */

  transform-origin: right;
  transform: ${({ visible }) => (visible ? 'scaleX(1)' : 'scaleX(0)')};
  transition: transform 0.3s ease-in-out;
`;

const SidebarNav = styled.div`
  height: 64px;
  width: 100%;
  background-color: #2b2b2b;

  display: flex;
  align-items: center;
  justify-content: left;
  padding-left: 1rem;
`;

const ExitContentBoardSidebarPageCover = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  inset: 0;
`;

const capitalize = (s: string) => {
  if (s.length > 0) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  return '';
};

const printContentRecursively = (data: any) => {
  // If data is an object, print all key, value pairs, and recurse.
  // If data is an array, print all elements, and recurse
  // Else data is text, print text and DONT recurse.
  if (typeof data == 'object') {
    return (
      <>
        {Object.entries(data).map(([key, val]): ReactElement => {
          return (
            <>
              <Typography
                variant="labelTitle"
                weight="400"
                size="sm"
                lineHeight={FontSizes['lg']}
              >
                <strong>{capitalize(key)}:</strong>
              </Typography>
              {printContentRecursively(val)}
            </>
          );
        })}
      </>
    );
  } else if (Array.isArray(data)) {
    return (
      <>
        {data.map((element): ReactElement => printContentRecursively(element))}
      </>
    );
  } else {
    if (typeof data == 'string' && data.includes('https://')) {
      return (
        <Link
          href={data}
          target="_blank"
          style={{
            textDecoration: 'underline',
            margin: '0 0 0.5rem 0',
            display: 'block',
          }}
        >
          {data}
        </Link>
      );
    }
    return (
      <Typography
        margin="0 0 0.5rem 0"
        variant="labelTitle"
        weight="400"
        size="sm"
        lineHeight={FontSizes['lg']}
      >
        {data}
      </Typography>
    );
  }
};

export const ContentBoardSidebar = ({
  selectedCellID,
  setSelectedCellID,
  cellMap,
}: {
  selectedCellID: string;
  setSelectedCellID: Dispatch<SetStateAction<string>>;
  cellMap: KeyValueProps;
}) => {
  const visible = selectedCellID != '' && selectedCellID in cellMap;

  const data = cellMap[selectedCellID];

  return (
    <>
      {visible && (
        <ExitContentBoardSidebarPageCover
          onClick={() => {
            setSelectedCellID('');
          }}
        />
      )}
      <Sidebar visible={visible}>
        <SidebarNav>
          {data?.title && (
            <Typography
              as="h2"
              variant="labelTitle"
              weight="400"
              size="md"
              lineHeight={FontSizes['lg']}
              color="white"
            >
              {data.title}
            </Typography>
          )}
        </SidebarNav>
        <div style={{ padding: '1rem' }}>{printContentRecursively(data)}</div>
      </Sidebar>
    </>
  );
};
