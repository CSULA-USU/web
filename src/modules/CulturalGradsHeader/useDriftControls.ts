import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

/* Drives the photo strip's CSS drift animation from script, through the Web
   Animations API, so the visitor can swipe, drag, trackpad-scroll or step it.

   The drift itself stays a plain CSS animation, so the strip moves exactly as
   before for anyone who never touches it. Any interaction pauses it, and Play
   resumes from wherever the visitor left it, because play() continues from
   the animation's currentTime.

   Pausing goes through the animation object, never `animation-play-state`:
   once script has called pause() or play(), browsers ignore that CSS property
   for the animation, so the two routes cannot be mixed.

   With reduced motion the CSS animation is `none`, getAnimations() finds
   nothing, and every handler here returns early — the strip is then a native
   scrolling row and must be left to the browser. */

/* Movement before a press counts as a drag. Below it, a slightly wobbly tap
   or a vertical scroll that starts on the strip doesn't pause anything. */
const DRAG_THRESHOLD_PX = 6;

/* Momentum after a flick: velocity is multiplied by this every 60fps frame,
   and the glide stops once it falls below the floor (in px per ms). */
const MOMENTUM_DECAY_PER_FRAME = 0.95;
const MOMENTUM_FLOOR = 0.01;

/* A release this long after the last movement is a hold, not a flick. */
const FLICK_WINDOW_MS = 100;

const STEP_DURATION_MS = 350;

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

const wrap = (value: number, size: number) => ((value % size) + size) % size;

interface DriftControlsRefs {
  stripRef: RefObject<HTMLDivElement | null>;
  trackRef: RefObject<HTMLDivElement | null>;
  /* The first copy of the photo set, whose children are one <img> each. The
     step buttons align to their left edges. */
  photoSetRef: RefObject<HTMLDivElement | null>;
}

export const useDriftControls = ({
  stripRef,
  trackRef,
  photoSetRef,
}: DriftControlsRefs) => {
  const [isPaused, setIsPaused] = useState(false);

  const frameRef = useRef<number | null>(null);
  /* Where an in-flight step is heading, so a second press steps on from
     there rather than from part-way through the first glide. */
  const stepTargetRef = useRef<number | null>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    isDragging: boolean;
    anchorX: number;
    anchorOffset: number;
    lastX: number;
    lastTime: number;
    velocity: number;
  } | null>(null);

  const getDrift = useCallback(() => {
    const track = trackRef.current;
    if (!track || typeof track.getAnimations !== 'function') return null;
    return track.getAnimations()[0] ?? null;
  }, [trackRef]);

  /* Width of one photo set, i.e. the distance of one full loop. Measured
     live because the strip is shorter, and so narrower, on tablet. */
  const getSetWidth = useCallback(() => {
    const track = trackRef.current;
    return track ? track.offsetWidth / 2 : 0;
  }, [trackRef]);

  const getDurationMs = (animation: Animation) => {
    const duration = animation.effect?.getComputedTiming().duration;
    return typeof duration === 'number' ? duration : 0;
  };

  /* Offset is how far the track has moved left within one loop, in px. */
  const getOffset = useCallback(
    (animation: Animation) => {
      const durationMs = getDurationMs(animation);
      const currentTime = animation.currentTime;
      if (!durationMs || typeof currentTime !== 'number') return 0;
      return (wrap(currentTime, durationMs) / durationMs) * getSetWidth();
    },
    [getSetWidth],
  );

  /* Always wraps into one loop: a negative currentTime would put an infinite
     animation before its start, where it renders no transform at all. */
  const setOffset = useCallback(
    (animation: Animation, offset: number) => {
      const setWidth = getSetWidth();
      const durationMs = getDurationMs(animation);
      if (!setWidth || !durationMs) return;
      animation.currentTime = (wrap(offset, setWidth) / setWidth) * durationMs;
    },
    [getSetWidth],
  );

  const cancelGlide = useCallback(() => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    stepTargetRef.current = null;
  }, []);

  const pauseForInteraction = useCallback(
    (animation: Animation) => {
      cancelGlide();
      animation.pause();
      setIsPaused(true);
    },
    [cancelGlide],
  );

  useEffect(() => {
    const animation = getDrift();
    if (!animation) return;
    if (isPaused) animation.pause();
    else animation.play();
  }, [isPaused, getDrift]);

  useEffect(() => cancelGlide, [cancelGlide]);

  const togglePaused = useCallback(() => {
    cancelGlide();
    setIsPaused((paused) => !paused);
  }, [cancelGlide]);

  const glideWithMomentum = useCallback(
    (animation: Animation, initialVelocity: number) => {
      let velocity = initialVelocity;
      let offset = getOffset(animation);
      let previousTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - previousTime;
        previousTime = now;
        offset += velocity * elapsed;
        velocity *= MOMENTUM_DECAY_PER_FRAME ** (elapsed / (1000 / 60));
        setOffset(animation, offset);
        frameRef.current =
          Math.abs(velocity) > MOMENTUM_FLOOR
            ? requestAnimationFrame(tick)
            : null;
      };
      frameRef.current = requestAnimationFrame(tick);
    },
    [getOffset, setOffset],
  );

  const step = useCallback(
    (direction: 1 | -1) => {
      const animation = getDrift();
      const photoSet = photoSetRef.current;
      if (!animation || !photoSet) return;

      const from = stepTargetRef.current ?? getOffset(animation);
      pauseForInteraction(animation);

      /* Left edges of every photo in one set, repeated a loop either side so
         stepping past the first or last photo wraps around. */
      const setWidth = getSetWidth();
      const photos = Array.from(photoSet.children) as HTMLElement[];
      const firstLeft = photos[0]?.offsetLeft ?? 0;
      const edges = photos.map((photo) => photo.offsetLeft - firstLeft);
      const candidates = [-setWidth, 0, setWidth].flatMap((shift) =>
        edges.map((edge) => edge + shift),
      );
      const current = wrap(from, setWidth);
      const target =
        direction === 1
          ? Math.min(...candidates.filter((edge) => edge > current + 1))
          : Math.max(...candidates.filter((edge) => edge < current - 1));
      if (!Number.isFinite(target)) return;

      stepTargetRef.current = target;
      const startTime = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / STEP_DURATION_MS, 1);
        setOffset(
          animation,
          current + (target - current) * easeOutCubic(progress),
        );
        if (progress < 1) {
          frameRef.current = requestAnimationFrame(tick);
        } else {
          frameRef.current = null;
          stepTargetRef.current = null;
        }
      };
      frameRef.current = requestAnimationFrame(tick);
    },
    [
      getDrift,
      photoSetRef,
      getOffset,
      getSetWidth,
      setOffset,
      pauseForInteraction,
    ],
  );

  const stepBack = useCallback(() => step(-1), [step]);
  const stepForward = useCallback(() => step(1), [step]);

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!getDrift()) return;
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      /* The control buttons sit inside the strip; a press on one is a press,
         not the start of a drag. */
      if ((event.target as HTMLElement).closest('button')) return;
      dragRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        isDragging: false,
        anchorX: 0,
        anchorOffset: 0,
        lastX: event.clientX,
        lastTime: event.timeStamp,
        velocity: 0,
      };
    },
    [getDrift],
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;
      const animation = getDrift();
      if (!drag || drag.pointerId !== event.pointerId || !animation) return;
      /* A press released outside the strip never reaches onPointerUp, so a
         mouse moving back over it with no button held must not drag. */
      if (event.pointerType === 'mouse' && event.buttons === 0) {
        dragRef.current = null;
        return;
      }

      if (!drag.isDragging) {
        if (Math.abs(event.clientX - drag.startX) < DRAG_THRESHOLD_PX) return;
        /* Anchor at the moment the drag is recognized, not at the press, so
           the strip doesn't jump by the threshold distance. */
        pauseForInteraction(animation);
        drag.isDragging = true;
        drag.anchorX = event.clientX;
        drag.anchorOffset = getOffset(animation);
        event.currentTarget.setPointerCapture(event.pointerId);
      }

      /* Dragging right pulls the photos right, i.e. back along the loop. */
      setOffset(animation, drag.anchorOffset - (event.clientX - drag.anchorX));

      const elapsed = event.timeStamp - drag.lastTime;
      if (elapsed > 0) {
        const sampled = -(event.clientX - drag.lastX) / elapsed;
        drag.velocity = drag.velocity * 0.2 + sampled * 0.8;
      }
      drag.lastX = event.clientX;
      drag.lastTime = event.timeStamp;
    },
    [getDrift, getOffset, setOffset, pauseForInteraction],
  );

  const onPointerUp = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;
      dragRef.current = null;
      const animation = getDrift();
      if (!drag || !drag.isDragging || !animation) return;
      const isFlick = event.timeStamp - drag.lastTime < FLICK_WINDOW_MS;
      if (isFlick && Math.abs(drag.velocity) > MOMENTUM_FLOOR) {
        glideWithMomentum(animation, drag.velocity);
      }
    },
    [getDrift, glideWithMomentum],
  );

  /* The browser took the gesture over (a vertical page scroll, usually).
     Whatever the strip did so far stands; no momentum. */
  const onPointerCancel = useCallback(() => {
    dragRef.current = null;
  }, []);

  /* Two-finger horizontal trackpad scrolling. A native listener because
     React's wheel handlers are passive and cannot preventDefault — and
     without preventDefault, a horizontal swipe over the strip on a Mac can
     trigger the browser's back/forward gesture. Vertical scrolling passes
     through untouched. */
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    const handleWheel = (event: WheelEvent) => {
      const animation = getDrift();
      if (!animation) return;
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      if (frameRef.current !== null || animation.playState !== 'paused') {
        pauseForInteraction(animation);
      }
      const lineHeightPx = 16;
      const deltaPx =
        event.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? event.deltaX * lineHeightPx
          : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
          ? event.deltaX * strip.clientWidth
          : event.deltaX;
      setOffset(animation, getOffset(animation) + deltaPx);
    };

    strip.addEventListener('wheel', handleWheel, { passive: false });
    return () => strip.removeEventListener('wheel', handleWheel);
  }, [stripRef, getDrift, getOffset, setOffset, pauseForInteraction]);

  return {
    isPaused,
    togglePaused,
    stepBack,
    stepForward,
    pointerHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
    },
  };
};
