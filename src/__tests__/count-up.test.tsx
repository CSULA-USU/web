/**
 * @jest-environment jsdom
 */
import { renderHook, act } from '@testing-library/react';
import { useCountUp, smoothstep } from 'hooks/useCountUp';

let now = 0;
let frames: FrameRequestCallback[] = [];

const flushFrame = (advanceMs: number) => {
  now += advanceMs;
  const pending = frames;
  frames = [];
  act(() => {
    pending.forEach((frame) => frame(now));
  });
};

const mockMatchMedia = (reduced: boolean) => {
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    matches: reduced && query === '(prefers-reduced-motion: reduce)',
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  })) as unknown as typeof window.matchMedia;
};

beforeEach(() => {
  now = 0;
  frames = [];
  jest
    .spyOn(window, 'requestAnimationFrame')
    .mockImplementation((cb: FrameRequestCallback) => {
      frames.push(cb);
      return frames.length;
    });
  jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
  mockMatchMedia(false);
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('smoothstep', () => {
  it('pins the ends and eases the middle', () => {
    expect(smoothstep(0)).toBe(0);
    expect(smoothstep(1)).toBe(1);
    expect(smoothstep(0.5)).toBe(0.5);
    // Eases in: below linear early on.
    expect(smoothstep(0.25)).toBeLessThan(0.25);
    // Eases out: above linear late on.
    expect(smoothstep(0.75)).toBeGreaterThan(0.75);
  });
});

describe('useCountUp', () => {
  it('holds at start while inactive', () => {
    const { result } = renderHook(() =>
      useCountUp(1084, { active: false, duration: 1000 }),
    );
    expect(result.current).toBe(0);
  });

  it('holds at the real figure when start equals end', () => {
    // This is how a chart at rest renders its true value with no animation.
    const { result } = renderHook(() =>
      useCountUp(1084, { start: 1084, active: false }),
    );
    expect(result.current).toBe(1084);
  });

  it('counts to the end value over the duration', () => {
    const { result } = renderHook(() =>
      useCountUp(1000, { duration: 1000, active: true }),
    );

    flushFrame(0);
    expect(result.current).toBe(0);

    flushFrame(500);
    expect(result.current).toBeGreaterThan(0);
    expect(result.current).toBeLessThan(1000);

    flushFrame(500);
    expect(result.current).toBe(1000);
  });

  it('waits out its delay before counting', () => {
    const { result } = renderHook(() =>
      useCountUp(1000, { duration: 1000, delay: 400, active: true }),
    );

    flushFrame(0);
    flushFrame(300);
    expect(result.current).toBe(0);

    flushFrame(300);
    expect(result.current).toBeGreaterThan(0);
  });

  it('applies easing to progress', () => {
    const { result } = renderHook(() =>
      useCountUp(1000, { duration: 1000, active: true, easing: smoothstep }),
    );

    flushFrame(0);
    flushFrame(250);
    // Eased value trails the linear 250 at a quarter through.
    expect(result.current).toBeLessThan(250);
  });

  it('paints the final value and schedules no frame under reduced motion', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() =>
      useCountUp(1084, { duration: 1000, active: true }),
    );

    expect(result.current).toBe(1084);
    expect(frames).toHaveLength(0);
  });
});
