/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen, within } from '@testing-library/react';
import { CulturalGradsHeader } from 'modules/CulturalGradsHeader/CulturalGradsHeader';

const images = [
  { src: 'https://example.com/one.webp', alt: '' },
  { src: 'https://example.com/two.webp', alt: '' },
];

/* jsdom has no Web Animations API, so the strip's CSS drift is stood in for
   by a fake animation that records pause() and play(). */
const fakeDrift = () => ({
  pause: jest.fn(),
  play: jest.fn(),
  currentTime: 0,
  playState: 'running',
  effect: { getComputedTiming: () => ({ duration: 10_000 }) },
});

let drift: ReturnType<typeof fakeDrift>;

beforeEach(() => {
  drift = fakeDrift();
  Element.prototype.getAnimations = jest
    .fn()
    .mockReturnValue([drift as unknown as Animation]);
});

afterEach(() => {
  // @ts-expect-error -- removing the stub jsdom never had
  delete Element.prototype.getAnimations;
});

const controls = () =>
  within(screen.getByRole('group', { name: 'Photo strip' }));

describe('CulturalGradsHeader photo strip controls', () => {
  it('offers previous, pause and next as buttons', () => {
    render(<CulturalGradsHeader images={images} />);

    expect(
      controls()
        .getAllByRole('button')
        .map((button) => button.getAttribute('aria-label')),
    ).toEqual(['Previous photo', 'Pause photo strip', 'Next photo']);
  });

  it('pauses and resumes the drift through the animation itself', () => {
    render(<CulturalGradsHeader images={images} />);

    fireEvent.click(
      controls().getByRole('button', { name: 'Pause photo strip' }),
    );
    expect(drift.pause).toHaveBeenCalled();
    expect(
      controls().getByRole('button', { name: 'Play photo strip' }),
    ).toBeTruthy();

    drift.play.mockClear();
    fireEvent.click(
      controls().getByRole('button', { name: 'Play photo strip' }),
    );
    expect(drift.play).toHaveBeenCalled();
  });

  it.each(['Previous photo', 'Next photo'])(
    '%s pauses the drift so the step holds',
    (name) => {
      render(<CulturalGradsHeader images={images} />);

      fireEvent.click(controls().getByRole('button', { name }));

      expect(drift.pause).toHaveBeenCalled();
      expect(
        controls().getByRole('button', { name: 'Play photo strip' }),
      ).toBeTruthy();
    },
  );
});
