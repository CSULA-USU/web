/**
 * @jest-environment jsdom
 */
// The `components` barrel transitively reaches lib/supabase, which throws at
// import time without env vars. Nothing here talks to Supabase.
jest.mock('lib/supabase', () => ({ supabase: {} }));
// The barrels also reach Nav, whose drawer library ships ESM that ts-jest will
// not parse. Nothing here renders it.
jest.mock('@accessible/drawer', () => ({}));

import { fireEvent, render, screen, within } from '@testing-library/react';
import { createStore, Provider, useAtomValue } from 'jotai';
import { editorPageState } from 'atoms/EditorAtom';
import { EditDrawer } from 'modules/EditDrawer';
import { sections } from 'sections';
import { SupaPage } from 'types';

/* The section adder is a Radix popover, which measures its anchor with a
   ResizeObserver that jsdom does not implement. Layout is irrelevant here. */
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

const fixturePage: SupaPage = {
  id: 7,
  slug: 'csi/wingspan',
  title: 'Wingspan',
  sections: [
    {
      id: 101,
      page_id: 7,
      name: 'CallToAction',
      order: 0,
      data: { ...sections.CallToAction.defaultProps, title: 'Join the U-SU' },
    },
    {
      id: 102,
      page_id: 7,
      name: 'InstagramFeed',
      order: 1,
      data: { department: 'csi' },
    },
  ],
};

/* Stands in for PageSections on the editor page: a sibling that renders from
   the same atom, so every assertion below is about what the shared preview
   would show, not about the drawer's own local state. */
const Preview = () => {
  const page = useAtomValue(editorPageState);
  return (
    <ul aria-label="Preview">
      {page?.sections.map((section) => (
        <li key={section.order}>
          {`${section.name}: ${
            section.data?.title ?? section.data?.department ?? ''
          }${section.stagedDelete ? ' [staged delete]' : ''}`}
        </li>
      ))}
    </ul>
  );
};

const renderEditor = () => {
  const store = createStore();
  store.set(editorPageState, fixturePage);
  render(
    <Provider store={store}>
      <EditDrawer>
        <Preview />
      </EditDrawer>
    </Provider>,
  );
  return store;
};

const previewLines = () =>
  within(screen.getByRole('list', { name: 'Preview' }))
    .queryAllByRole('listitem')
    .map((item) => item.textContent);

/* The toolbar's icon buttons carry no accessible name, so they are reached by
   position: toggle, save, add — in that order, ahead of everything else in
   the drawer. */
const toolbarButton = (which: 'save' | 'add') =>
  screen.getAllByRole('button')[which === 'save' ? 1 : 2];

/* The section's header label, as opposed to the same name in the preview. */
const deleteButtonFor = (sectionName: string) => {
  const preview = screen.getByRole('list', { name: 'Preview' });
  const label = screen
    .getAllByText(new RegExp(sectionName))
    .find((element) => !preview.contains(element));
  const button = label?.parentElement?.querySelector('button');
  if (!button) throw new Error(`No delete button for ${sectionName}`);
  return button;
};

describe('EditDrawer shared editor state', () => {
  it('renders the page held in the editor atom', () => {
    renderEditor();
    expect(previewLines()).toEqual([
      'CallToAction: Join the U-SU',
      'InstagramFeed: csi',
    ]);
  });

  it('pushes a field edit through to the preview', () => {
    renderEditor();

    const titleInput = document.querySelector('input[name="title"]');
    if (!titleInput) throw new Error('No title field rendered');
    fireEvent.change(titleInput, { target: { value: 'Fly With Us' } });

    expect(previewLines()).toEqual([
      'CallToAction: Fly With Us',
      'InstagramFeed: csi',
    ]);
  });

  it('appends an added section with its default props, after the existing ones', () => {
    const store = renderEditor();

    fireEvent.click(toolbarButton('add'));
    const heroOption = screen.getByText('HeroHeader').closest('button');
    if (!heroOption) throw new Error('No HeroHeader option in the adder');
    fireEvent.click(heroOption);

    const added = store.get(editorPageState)?.sections[2];
    expect(added).toEqual({
      page_id: 7,
      name: 'HeroHeader',
      data: sections.HeroHeader.defaultProps,
      order: 2,
    });
    expect(previewLines()).toHaveLength(3);
  });

  it('stages a deletion, and a second press undoes it', () => {
    renderEditor();

    fireEvent.click(deleteButtonFor('InstagramFeed'));
    expect(previewLines()).toEqual([
      'CallToAction: Join the U-SU',
      'InstagramFeed: csi [staged delete]',
    ]);

    fireEvent.click(deleteButtonFor('InstagramFeed'));
    expect(previewLines()).toEqual([
      'CallToAction: Join the U-SU',
      'InstagramFeed: csi',
    ]);
  });

  /* Save only drops staged sections from local state: the database write in
     EditDrawer's handleSave is commented out, and this migration leaves it
     that way. */
  it('drops staged sections on save and keeps the rest', () => {
    renderEditor();

    fireEvent.click(deleteButtonFor('CallToAction'));
    fireEvent.click(toolbarButton('save'));

    expect(previewLines()).toEqual(['InstagramFeed: csi']);
  });
});
