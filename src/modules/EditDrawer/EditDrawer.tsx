import React, { useState } from 'react';
import styled from 'styled-components';
import {
  BiSolidChevronLeftSquare,
  BiSolidChevronRightSquare,
  BiSolidSave,
} from 'react-icons/bi';
import { SectionAdder } from './SectionAdder';
import { SectionForm } from './SectionForm';
import { useRecoilState } from 'recoil';
import { editorPageState } from 'atoms/EditorAtom';
import { savePageSections } from 'api';
import { Divider, PushDrawer, Typography } from 'components';
import { Colors } from 'theme';

const Container = styled.div`
  border-right: 8px solid ${Colors.primary};
  position: relative;
  width: 360px;
  height: 100%;
  background-color: lightyellow;
`;

const Content = styled.div`
  padding: 24px;
  height: calc(100vh - 80px);
  overflow: scroll;
`;

const Toolbar = styled.div`
  &,
  * {
    transition: 0.2s ease;
  }
  display: flex;
  flex-direction: column;
  width: 62px;
  border-left: 8px solid ${Colors.primary};
  background-color: ${Colors.primary};
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: ${Colors.primary};
    border: none;
    color: ${Colors.greyDarkest};
    padding: 8px 4px;
    &:hover {
      color: ${Colors.greyDark};
      svg {
        transform: scale(1.1);
      }
    }
  }
  position: absolute;
  right: -62px;
  top: 66px;
`;

export const EditDrawer = ({ children }: { children: React.ReactNode }) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [page, setPage] = useRecoilState(editorPageState);

  const handleSave = async () => {
    if (!page?.sections) return;
    await savePageSections(page.sections);
    setPage({
      ...page,
      sections: page.sections.filter((section) => !section.stagedDelete),
    });
  };

  const handleToggle = () => setDrawerIsOpen((isOpen) => !isOpen);
  return !page ? null : (
    <PushDrawer
      isOpen={drawerIsOpen}
      drawer={
        <Container>
          <Toolbar>
            <button onClick={handleToggle}>
              {drawerIsOpen ? (
                <BiSolidChevronLeftSquare size={40} />
              ) : (
                <BiSolidChevronRightSquare size={40} />
              )}
            </button>
            <button onClick={handleSave}>
              <BiSolidSave size={40}></BiSolidSave>
            </button>
            <SectionAdder pageId={page.id} />
          </Toolbar>
          <Content>
            <Typography variant="label">Sections</Typography>
            <Divider margin="8px 0 16px" />
            {page.sections.map((section) => (
              <SectionForm
                key={`SectionForm:${section.order}:${section.name}`}
                section={section}
              />
            ))}
          </Content>
        </Container>
      }
    >
      {children}
    </PushDrawer>
  );
};
