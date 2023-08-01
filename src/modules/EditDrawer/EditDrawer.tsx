import React from 'react';
import styled from 'styled-components';
import * as Drawer from '@accessible/drawer';
import { HiMenuAlt3 } from 'react-icons/hi';
import { MdCancel } from 'react-icons/md';
import { SectionAdder } from './SectionAdder';
import { SectionForm } from './SectionForm';
import { useRecoilValue } from 'recoil';
import { editorPageState } from 'atoms/EditorAtom';
import { upsertPageSection } from 'api';

const Container = styled.div`
  height: 100vh;
  width: 480px;
  padding: 24px;
  background-color: rgba(255, 255, 255, 0.95);
  overflow-y: auto;
`;

const StyledButton = styled.button`
  border: none;
  background-color: transparent;
  border-radius: 8px;
  transition: 0.3s ease;
  &:hover {
    opacity: 0.7;
  }
`;

export const EditDrawer = () => {
  const page = useRecoilValue(editorPageState);

  const handleSave = () => {
    page?.sections && upsertPageSection(page.sections);
  };

  return !page ? null : (
    <Drawer.Drawer>
      <Drawer.Trigger>
        <StyledButton>
          <HiMenuAlt3 size={48} />
        </StyledButton>
      </Drawer.Trigger>

      <Drawer.Target preventScroll>
        <Container>
          <Drawer.CloseButton>
            <button style={{ cursor: 'pointer', border: 0 }}>
              <MdCancel size={40} />
            </button>
          </Drawer.CloseButton>
          <button
            onClick={handleSave}
            style={{
              backgroundColor: 'transparent',
              fontSize: 16,
              position: 'absolute',
              top: 24,
              right: 24,
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            SAVE
          </button>
          {page.sections.map((section) => (
            <SectionForm
              key={`${section.name}:${section.id}`}
              section={section}
            />
          ))}
          <SectionAdder pageId={page.id} sectionCount={page.sections.length} />
        </Container>
      </Drawer.Target>
    </Drawer.Drawer>
  );
};
