import { useEffect } from 'react';

/**
 * Inline body styles the lock overwrites, captured so the page is handed back
 * exactly as it was found.
 */
const LOCKED_PROPERTIES = [
  'position',
  'top',
  'left',
  'right',
  'width',
  'overflow',
] as const;

type LockedProperty = (typeof LOCKED_PROPERTIES)[number];

/**
 * Locks nest: a modal opened from inside another modal must not unlock the
 * page when only the inner one closes. The count is module-level so every
 * caller of the hook shares it.
 */
let activeLockCount = 0;
let previousBodyStyles: Record<LockedProperty, string> | null = null;
let scrollYBeforeLock = 0;

const lockBody = () => {
  activeLockCount += 1;
  if (activeLockCount > 1) {
    return;
  }

  scrollYBeforeLock = window.scrollY;
  previousBodyStyles = LOCKED_PROPERTIES.reduce(
    (styles, property) => ({
      ...styles,
      [property]: document.body.style[property],
    }),
    {} as Record<LockedProperty, string>,
  );

  // `overflow: hidden` alone is not a scroll lock on mobile: iOS Safari and
  // Chrome for Android both keep scrolling the visual viewport, which is why
  // the page behind the modal still moved on a phone while desktop was fine.
  // Taking the body out of flow is the only thing every browser honors — and
  // it costs the scroll position, so the offset is parked in `top` and put
  // back on unlock.
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollYBeforeLock}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.width = '100%';
  document.body.style.overflow = 'hidden';
};

const unlockBody = () => {
  activeLockCount = Math.max(0, activeLockCount - 1);
  if (activeLockCount > 0 || !previousBodyStyles) {
    return;
  }

  const restoredStyles = previousBodyStyles;
  previousBodyStyles = null;

  LOCKED_PROPERTIES.forEach((property) => {
    document.body.style[property] = restoredStyles[property];
  });

  // The browser reports scroll 0 while the body is fixed, so the offset has to
  // be reapplied by hand once it is back in flow.
  window.scrollTo(0, scrollYBeforeLock);
};

/**
 * Freezes the page behind an overlay while `isLocked` is true, and restores
 * both the body's own inline styles and the scroll position when it is not.
 *
 * Does nothing at all while unlocked, so a page may mount any number of closed
 * modals without them touching the body or each other.
 */
export const useBodyScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (!isLocked) {
      return;
    }

    lockBody();

    return unlockBody;
  }, [isLocked]);
};
