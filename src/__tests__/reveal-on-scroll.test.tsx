/**
 * @jest-environment jsdom
 */
import { renderHook, act } from '@testing-library/react';
import { useRevealOnce } from 'hooks/useRevealOnce';

type ObserverCallback = (entries: { isIntersecting: boolean }[]) => void;

let observerCallbacks: ObserverCallback[] = [];
let observeCount = 0;
let disconnectCount = 0;

const mockMatchMedia = (reduced: boolean) => {
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    matches: reduced && query === '(prefers-reduced-motion: reduce)',
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  })) as unknown as typeof window.matchMedia;
};

beforeEach(() => {
  observerCallbacks = [];
  observeCount = 0;
  disconnectCount = 0;

  class MockIntersectionObserver {
    constructor(callback: ObserverCallback) {
      observerCallbacks.push(callback);
    }
    observe() {
      observeCount += 1;
    }
    disconnect() {
      disconnectCount += 1;
    }
    unobserve() {}
    takeRecords() {
      return [];
    }
  }

  global.IntersectionObserver =
    MockIntersectionObserver as unknown as typeof IntersectionObserver;
  mockMatchMedia(false);
});

/* The hook needs a real node to observe, so attach the ref before asserting. */
const renderWithNode = (options: Parameters<typeof useRevealOnce>[0] = {}) => {
  const node = document.createElement('div');
  document.body.appendChild(node);
  return renderHook(
    (props: Parameters<typeof useRevealOnce>[0]) => {
      const result = useRevealOnce<HTMLDivElement>(props);
      result.ref.current = node;
      return result;
    },
    { initialProps: options },
  );
};

describe('useRevealOnce', () => {
  it('starts at the final state so first render and no-JS are correct', () => {
    // Ref is null on the very first render, before any effect runs.
    const { result } = renderHook(() => useRevealOnce<HTMLDivElement>());
    expect(result.current.phase).toBe('final');
    expect(result.current.atFinal).toBe(true);
    expect(result.current.isTransitioning).toBe(false);
  });

  it('arms and observes once a node is present', () => {
    const { result } = renderWithNode();
    // Second render attaches the ref, so the effect can observe.
    act(() => {
      result.current.ref.current = result.current.ref.current;
    });
    expect(result.current.phase).toBe('armed');
    expect(result.current.atFinal).toBe(false);
    expect(observeCount).toBe(1);
  });

  it('reveals once on intersection and then disconnects', () => {
    const { result } = renderWithNode();
    expect(result.current.phase).toBe('armed');

    act(() => {
      observerCallbacks[0]([{ isIntersecting: true }]);
    });

    expect(result.current.phase).toBe('revealed');
    expect(result.current.atFinal).toBe(true);
    expect(result.current.isTransitioning).toBe(true);
    expect(disconnectCount).toBeGreaterThanOrEqual(1);
  });

  it('ignores an entry that is not intersecting', () => {
    const { result } = renderWithNode();
    act(() => {
      observerCallbacks[0]([{ isIntersecting: false }]);
    });
    expect(result.current.phase).toBe('armed');
  });

  it('registers no observer when reduced motion is preferred', () => {
    mockMatchMedia(true);
    const { result } = renderWithNode();
    expect(observeCount).toBe(0);
    expect(result.current.phase).toBe('final');
    expect(result.current.atFinal).toBe(true);
    expect(result.current.isTransitioning).toBe(false);
  });

  it('registers no observer when disabled', () => {
    const { result } = renderWithNode({ enabled: false });
    expect(observeCount).toBe(0);
    expect(result.current.phase).toBe('final');
  });

  it('re-arms when an animation prop changes', () => {
    const { result, rerender } = renderWithNode({ resetKey: 1400 });
    act(() => {
      observerCallbacks[0]([{ isIntersecting: true }]);
    });
    expect(result.current.phase).toBe('revealed');

    rerender({ resetKey: 900 });
    expect(result.current.phase).toBe('armed');
    expect(observeCount).toBe(2);
  });
});
