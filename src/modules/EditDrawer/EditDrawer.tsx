import React from 'react';
import styled from 'styled-components';
import * as Drawer from '@accessible/drawer';
import { HiMenuAlt3 } from 'react-icons/hi';
import { MdCancel } from 'react-icons/md';
import { AddSection } from './AddSection';
import { Page } from 'types/Supabase';

interface EditDrawerProps {
  page: Page;
}
const Container = styled.div`
  height: 100vh;
  width: 480px;
  padding: 24px;
  background-color: rgba(255, 255, 255, 0.95);
  z-index: 10;
  overflow-y: auto;
`;

const SectionItem = styled.div`
  * {
    text-wrap: wrap;
  }
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

export const EditDrawer = ({ page }: EditDrawerProps) => {
  return (
    <Drawer.Drawer>
      <Drawer.Trigger>
        <StyledButton>
          <HiMenuAlt3 size={48} />
        </StyledButton>
      </Drawer.Trigger>

      <Drawer.Target preventScroll>
        <Container>
          <Drawer.CloseButton>
            <button
              style={{
                border: 0,
                backgroundColor: 'transparent',
                fontSize: 16,
                position: 'absolute',
                right: 16,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              CLOSE <MdCancel size={40} />
            </button>
          </Drawer.CloseButton>
          {page.sections.length &&
            page.sections.map((section) => (
              <SectionItem key={section.id}>
                <h2>{section.section_name}</h2>
                <pre>{JSON.stringify(section.data, null, 2)}</pre>
              </SectionItem>
            ))}
          <AddSection pageId={page.id} sectionCount={page.sections.length} />
        </Container>
      </Drawer.Target>
    </Drawer.Drawer>
  );
};