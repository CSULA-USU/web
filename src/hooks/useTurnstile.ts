import { useCallback, useEffect, useRef, useState } from 'react';

/* Must be loaded from Cloudflare's own URL: the script is versioned on their
   side, and Cloudflare documents that proxied or cached copies break. */
const TURNSTILE_SCRIPT_SRC =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

interface TurnstileRenderOptions {
  sitekey: string;
  action?: string;
  execution: 'render' | 'execute';
  appearance: 'always' | 'execute' | 'interaction-only';
  retry: 'auto' | 'never';
  theme: 'light' | 'dark' | 'auto';
  size: 'normal' | 'flexible' | 'compact';
  'response-field': boolean;
  callback: (token: string) => void;
  'error-callback': (errorCode: string) => void;
  'timeout-callback': () => void;
  'unsupported-callback': () => void;
  'before-interactive-callback': () => void;
  'after-interactive-callback': () => void;
}

interface TurnstileApi {
  render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
  execute: (widgetId: string) => void;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

/* One script per page, however many widgets ask for it. Cleared on failure so
   a visitor whose network blipped can retry instead of being stuck with a
   rejected promise for the rest of the visit. */
let scriptLoading: Promise<TurnstileApi> | null = null;

const loadTurnstileScript = () => {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (scriptLoading) return scriptLoading;

  scriptLoading = new Promise<TurnstileApi>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = TURNSTILE_SCRIPT_SRC;
    script.async = true;
    script.onload = () => {
      if (window.turnstile) resolve(window.turnstile);
      else reject(new Error('Turnstile loaded but did not initialize'));
    };
    script.onerror = () => {
      scriptLoading = null;
      script.remove();
      reject(new Error('Turnstile failed to load'));
    };
    document.head.appendChild(script);
  });
  return scriptLoading;
};

interface PendingChallenge {
  resolve: (token: string) => void;
  reject: (error: Error) => void;
}

/**
 * Cloudflare Turnstile, loaded late and run on demand.
 *
 * Nothing reaches Cloudflare until `prepare` is called — wire it to the form's
 * first focus, so a visitor who only reads the page never contacts a third
 * party. `getToken` runs the challenge at submit and resolves with a fresh
 * single-use token; most visitors see nothing, and the widget only appears in
 * `containerRef` when Cloudflare needs an interaction, which `isInteractive`
 * reports so the page can make room for it. Call `reset` after every submit
 * attempt, successful or not, because a token cannot be verified twice.
 *
 * With no `siteKey`, `getToken` resolves `null` and nothing loads, so a
 * missing environment variable surfaces as a server-side rejection rather
 * than a page that throws.
 */
export const useTurnstile = (siteKey: string | undefined, action?: string) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const pendingRef = useRef<PendingChallenge | null>(null);
  /* The container always holds Turnstile's hidden scaffolding, so its
     emptiness says nothing about whether a widget is showing. */
  const [isInteractive, setIsInteractive] = useState(false);

  const settle = useCallback(
    (outcome: { token: string } | { error: Error }) => {
      const pending = pendingRef.current;
      pendingRef.current = null;
      if (!pending) return;
      if ('token' in outcome) pending.resolve(outcome.token);
      else pending.reject(outcome.error);
    },
    [],
  );

  const ensureWidget = useCallback(async () => {
    if (!siteKey) return null;
    const turnstile = await loadTurnstileScript();
    if (!widgetIdRef.current && containerRef.current) {
      widgetIdRef.current = turnstile.render(containerRef.current, {
        sitekey: siteKey,
        action,
        execution: 'execute',
        appearance: 'interaction-only',
        /* A failed challenge settles the submit and lets the visitor retry by
           submitting again. Turnstile's own background retries would keep
           running after the submit had already reported the failure. */
        retry: 'never',
        /* The form sits on a white card whatever the visitor's OS theme. */
        theme: 'light',
        size: 'flexible',
        /* `getToken` hands the token over directly; a hidden form field
           would only be a second copy of it. */
        'response-field': false,
        'before-interactive-callback': () => setIsInteractive(true),
        'after-interactive-callback': () => setIsInteractive(false),
        callback: (token) => settle({ token }),
        'error-callback': (errorCode) =>
          settle({ error: new Error(`Turnstile error ${errorCode}`) }),
        'timeout-callback': () =>
          settle({ error: new Error('Turnstile challenge timed out') }),
        'unsupported-callback': () =>
          settle({
            error: new Error('Turnstile does not support this browser'),
          }),
      });
    }
    return turnstile;
  }, [siteKey, action, settle]);

  const prepare = useCallback(() => {
    /* Best effort: a failure here resurfaces, and is reported, at submit. */
    ensureWidget().catch(() => undefined);
  }, [ensureWidget]);

  const getToken = useCallback(async (): Promise<string | null> => {
    const turnstile = await ensureWidget();
    if (!turnstile) return null;
    const widgetId = widgetIdRef.current;
    if (!widgetId) throw new Error('Turnstile widget has no container');

    return new Promise<string>((resolve, reject) => {
      /* A second submit while the first is still pending supersedes it. */
      settle({ error: new Error('Superseded by a newer submit') });
      pendingRef.current = { resolve, reject };
      turnstile.execute(widgetId);
    });
  }, [ensureWidget, settle]);

  const reset = useCallback(() => {
    if (widgetIdRef.current) window.turnstile?.reset(widgetIdRef.current);
    setIsInteractive(false);
  }, []);

  useEffect(
    () => () => {
      if (widgetIdRef.current) window.turnstile?.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    },
    [],
  );

  return { containerRef, isInteractive, prepare, getToken, reset };
};
