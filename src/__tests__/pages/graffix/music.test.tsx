/** @jest-environment jsdom */
import {
  act,
  fireEvent,
  render,
  screen,
  cleanup,
} from '@testing-library/react';
import type { ReactNode } from 'react';
import Music from 'pages/graffix/web-team/music';

jest.mock('modules', () => ({
  Page: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));
jest.mock('components', () => {
  const React = jest.requireActual('react');
  return {
    Button: React.forwardRef(function MockButton(
      { variant: _variant, ...props }: any,
      ref: any,
    ) {
      return <button ref={ref} {...props} />;
    }),
    PageMeta: () => null,
    Typography: ({ as: Element = 'p', children, id }: any) => (
      <Element id={id}>{children}</Element>
    ),
  };
});

const click = async (button: HTMLElement) => {
  await act(async () => {
    fireEvent.click(button);
  });
};
const currentTitle = () =>
  document.querySelector('#now-playing-title')?.textContent;
const endSong = async () => {
  await act(async () => {
    fireEvent.ended(document.querySelector('audio')!);
  });
};

beforeEach(() => {
  jest.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => {});
  jest
    .spyOn(HTMLMediaElement.prototype, 'play')
    .mockImplementation(function (this: HTMLMediaElement) {
      Object.defineProperty(this, 'paused', {
        configurable: true,
        value: false,
      });
      fireEvent.play(this);
      fireEvent.playing(this);
      return Promise.resolve();
    });
  jest
    .spyOn(HTMLMediaElement.prototype, 'pause')
    .mockImplementation(function (this: HTMLMediaElement) {
      Object.defineProperty(this, 'paused', {
        configurable: true,
        value: true,
      });
      fireEvent.pause(this);
    });
});
afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
});

it('switches to the selected song lyrics without interrupting playback', async () => {
  render(<Music />);
  await click(screen.getByRole('button', { name: 'Play ArT aTtaCk' }));
  const lyricsTab = screen.getByRole('tab', { name: 'Lyrics' });
  await click(lyricsTab);
  expect(lyricsTab.getAttribute('aria-selected')).toBe('true');
  expect(document.querySelector('article:not([hidden]) h2')?.textContent).toBe(
    'ArT aTtaCk',
  );
  expect(document.querySelector('details')).toBeNull();
  expect(currentTitle()).toBe('ArT aTtaCk');
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
  expect((document.querySelector('audio') as HTMLAudioElement).paused).toBe(
    false,
  );
  expect(document.querySelector('img')?.getAttribute('src')).toContain('.webp');
  await click(screen.getByRole('button', { name: 'Next song' }));
  expect(lyricsTab.getAttribute('aria-selected')).toBe('true');
  expect(document.querySelector('article:not([hidden]) h2')?.textContent).toBe(
    'Board Room Hootenanny',
  );
  await click(screen.getByRole('tab', { name: 'Tracks' }));
  expect((document.querySelector('audio') as HTMLAudioElement).paused).toBe(
    false,
  );
});

it('plays each shuffled song once and goes back through that order', async () => {
  jest.spyOn(Math, 'random').mockReturnValue(0);
  render(<Music />);
  const first = currentTitle();
  await click(screen.getByRole('button', { name: 'Shuffle' }));
  expect(currentTitle()).toBe(first);
  const visited = [first];
  for (let index = 0; index < 7; index++) {
    await click(screen.getByRole('button', { name: 'Next song' }));
    visited.push(currentTitle());
  }
  expect(new Set(visited).size).toBe(8);
  expect(
    (screen.getByRole('button', { name: 'Next song' }) as HTMLButtonElement)
      .disabled,
  ).toBe(true);
  await click(screen.getByRole('button', { name: 'Previous song' }));
  expect(currentTitle()).toBe(visited[6]);
});

it('wraps the album, repeats one song, permits manual skips, and stops with repeat off', async () => {
  render(<Music />);
  await click(
    screen.getByRole('button', { name: 'Play Ready, Get Set, U-SET!' }),
  );
  await click(screen.getByRole('button', { name: /Repeat off\. Switch/ }));
  await endSong();
  expect(currentTitle()).toBe('Admin Lo-Fi [lo-fi beats to work to]');
  await click(screen.getByRole('button', { name: /Repeat album\. Switch/ }));
  document.querySelector('audio')!.currentTime = 20;
  await endSong();
  expect(currentTitle()).toBe('Admin Lo-Fi [lo-fi beats to work to]');
  expect(document.querySelector('audio')!.currentTime).toBe(0);
  await click(screen.getByRole('button', { name: 'Next song' }));
  expect(currentTitle()).toBe('ArT aTtaCk');
  await click(screen.getByRole('button', { name: /Repeat song\. Switch/ }));
  await click(
    screen.getByRole('button', { name: 'Play Ready, Get Set, U-SET!' }),
  );
  const calls = (HTMLMediaElement.prototype.play as jest.Mock).mock.calls
    .length;
  await endSong();
  expect(currentTitle()).toBe('Ready, Get Set, U-SET!');
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(calls);
});
