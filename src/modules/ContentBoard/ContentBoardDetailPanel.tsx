import { Fragment, ReactElement, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { MdClose } from 'react-icons/md';

import { Typography } from 'components/Typography';
import { Colors, FontSizes, Radii, Shadows } from 'theme';
import { KeyValueProps } from './ContentBoardTypes';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;
`;

const Scrim = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
`;

// Fixed to the window, not the board: the board is a long list now, and a
// panel anchored to its top would open off-screen for a request far down.
const Panel = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(500px, calc(100vw - 48px));
  overflow-y: auto;
  background: ${Colors.white};
  box-shadow: ${Shadows.lifted};
`;

const PanelHeader = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  min-height: 64px;
  padding: 8px 8px 8px 16px;
  background: ${Colors.greyDarkest};
`;

const CloseButton = styled.button`
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 0;
  border-radius: ${Radii.structure};
  background: transparent;
  color: ${Colors.greyLighter};
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    background-color: ${Colors.primary};
    color: ${Colors.black};
  }

  &:focus-visible {
    outline: 2px solid ${Colors.primary};
    outline-offset: -2px;
  }
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
            <Fragment key={key}>
              <Typography
                variant="labelTitle"
                weight="400"
                size="sm"
                lineHeight={FontSizes['lg']}
              >
                <strong>{capitalize(key)}:</strong>
              </Typography>
              {printContentRecursively(val)}
            </Fragment>
          );
        })}
      </>
    );
  } else if (Array.isArray(data)) {
    return (
      <>
        {data.map(
          (element, index): ReactElement => (
            <Fragment key={index}>{printContentRecursively(element)}</Fragment>
          ),
        )}
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
            wordWrap: 'break-word',
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

export const ContentBoardDetailPanel = ({
  selectedCellID,
  onClose,
  cellMap,
}: {
  selectedCellID: string;
  onClose: () => void;
  cellMap: KeyValueProps;
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const visible = selectedCellID !== '' && selectedCellID in cellMap;
  const data = cellMap[selectedCellID];

  useEffect(() => {
    if (!visible) return;

    // Focus moves into the panel and back to the title that opened it.
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const onMouseDown = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node))
        onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onMouseDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onMouseDown);
      opener?.focus();
    };
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <Overlay>
      <Scrim aria-hidden="true" />
      <Panel
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="graffix-request-title"
      >
        <PanelHeader>
          <Typography
            as="h2"
            id="graffix-request-title"
            variant="labelTitle"
            weight="400"
            size="md"
            lineHeight={FontSizes['lg']}
            color="white"
          >
            {data?.title}
          </Typography>
          <CloseButton
            ref={closeRef}
            type="button"
            aria-label="Close request details"
            onClick={onClose}
          >
            <MdClose size={24} aria-hidden="true" />
          </CloseButton>
        </PanelHeader>
        <div style={{ padding: '1rem' }}>{printContentRecursively(data)}</div>
      </Panel>
    </Overlay>
  );
};
