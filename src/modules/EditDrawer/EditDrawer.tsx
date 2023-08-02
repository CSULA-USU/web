import React from 'react';
import styled from 'styled-components';
import * as Drawer from '@accessible/drawer';
import { HiMenuAlt3 } from 'react-icons/hi';
import { MdCancel } from 'react-icons/md';
import { BiSolidSave } from 'react-icons/bi';
import { SectionAdder } from './SectionAdder';
import { SectionForm } from './SectionForm';
import { useRecoilValue } from 'recoil';
import { editorPageState } from 'atoms/EditorAtom';
import { savePageSections } from 'api';
import { Divider, Typography } from 'components';
import { Colors } from 'theme';

const Container = styled.div`
  border-right: 8px solid ${Colors.primary};
  position: relative;
`;

const Content = styled.div`
  height: 100vh;
  width: 360px;
  padding: 24px;
  background-color: white;
  overflow-y: auto;
`;

const Toolbar = styled.div`
  display: flex;
  flex-direction: column;
  width: 50px;
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: ${Colors.primary};
    border: none;
    transition: 0.3s ease;
    &:hover {
      color: ${Colors.gold};
      transform: translateX(8px);
    }
  }
  position: absolute;
  right: -50px;
  top: 24px;
`;

const OpenButton = styled.button`
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
    page?.sections && savePageSections(page.sections);
  };

  return !page ? null : (
    <Drawer.Drawer>
      <Drawer.Trigger>
        <OpenButton>
          <HiMenuAlt3 color="white" size={48} />
        </OpenButton>
      </Drawer.Trigger>

      <Drawer.Target preventScroll>
        <Container>
          <Toolbar>
            <Drawer.CloseButton>
              <button>
                <MdCancel size={40} />
              </button>
            </Drawer.CloseButton>
            <button onClick={handleSave}>
              <BiSolidSave size={40}></BiSolidSave>
            </button>
            <SectionAdder pageId={page.id} />
          </Toolbar>
          <Content>
            <Typography variant="label">Sections</Typography>
            <Divider margin="8px 0 16px" />
            {page.sections
              .filter((s) => s.order !== -1)
              .map((section) => (
                <SectionForm
                  key={`SectionForm:${section.order}:${section.name}`}
                  section={section}
                />
              ))}
          </Content>
        </Container>
      </Drawer.Target>
    </Drawer.Drawer>
  );
};
