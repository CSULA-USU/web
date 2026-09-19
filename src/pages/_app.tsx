import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Modal from 'react-modal';
import { SessionProvider } from 'next-auth/react';
import { EventsLoader } from 'modules';
import { FALLBACK_CARD_IMAGE } from 'components';
import ToastProvider from 'context/ToastContext';
import { usesAuthSession } from 'utils/authRoutes';
import { Bitter, Montserrat } from 'next/font/google';

if (typeof window !== 'undefined') {
  Modal.setAppElement('#__next');
}

const bitter = Bitter({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-bitter',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-montserrat',
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();

  // A route segment starting with an underscore marks an unpublished draft.
  // Next.js only treats _app and _document as special — every other underscore
  // page is still routed, prerendered, and publicly reachable — so drafts are
  // kept out of search results here rather than relying on each one to remember.
  // Dropping the underscore to publish a page lifts this automatically.
  const isDraftRoute = router.pathname
    .split('/')
    .some((segment) => segment.startsWith('_'));

  const usesSession = usesAuthSession(router.pathname);

  return (
    <>
      <style jsx global>{`
        :root {
          --font-montserrat: ${montserrat.style.fontFamily};
          --font-bitter: ${bitter.style.fontFamily};
        }
      `}</style>
      <div className={`${bitter.variable} ${montserrat.variable}`}>
        {/* Kept mounted on every route rather than rendered conditionally: the
            provider holds the fetched session in memory, so tearing it down
            when a signed-in staff member steps out to a public page and back
            would drop that — and would remount ToastProvider and RecoilRoot
            with it, resetting page state on every crossing.

            What changes is its behavior. `undefined` means "unknown, go find
            out" and triggers a request to /api/auth/session, which is what
            sets NextAuth's cookies; `null` means "known signed out" and
            fetches nothing. Public visitors therefore receive no cookies at
            all. `refetchOnWindowFocus` defaults to true and would re-fetch on
            every tab focus, setting them anyway, so it has to be gated on the
            same condition.

            Expect this to look broken in development. React StrictMode
            double-invokes effects, and next-auth's cleanup resets its own
            module-level session cache to `undefined` between the two runs —
            so the second mount no longer sees the `null` above, fetches, and
            sets the cookies regardless. Production mounts once and does not.
            Verified by toggling `reactStrictMode` off locally: cookies
            disappear from public pages. Do not "fix" this by disabling
            StrictMode. */}
        <SessionProvider
          session={usesSession ? session : null}
          refetchOnWindowFocus={usesSession}
        >
          <ToastProvider>
            <RecoilRoot>
              <Head>
                <title>University&ndash;Student Union</title>
                <meta
                  name="author"
                  content="The University Student Union"
                  key="author"
                />
                <meta
                  name="description"
                  content="The University-Student Union inc. (U-SU) at California State University, Los Angeles, was established in 1975. With open doors and minds, we provide space and opportunities enabling Golden Eagles to soar. We accomplish this by encouraging social, cultural, recreational, and educational programming for the University and broader community. We foster a vibrant and equitable campus climate. Our vision is to be Cal State LA’s hub for connection and growth."
                  key="description"
                />
                {isDraftRoute && (
                  <meta name="robots" content="noindex,nofollow" key="robots" />
                )}
                {/* Baseline link-preview card for any page that does not set its
                    own tags. Pages override these by rendering <PageMeta />,
                    whose keys match the ones below — matching keys are what make
                    a page's tag replace this one instead of appending a second
                    copy that crawlers may read first.
                    Scope is deliberate. No og:url or canonical: both must be
                    per-page. No og:image:alt or og:image:width/height: a page
                    that overrides og:image alone would inherit the alt text and
                    dimensions of THIS image and describe its own card wrongly.
                    No twitter:card: 25 pages already set it without a key, so a
                    keyed copy here would duplicate on all of them — PageMeta
                    emits it per page instead. */}
                <meta
                  property="og:site_name"
                  content="University-Student Union at Cal State LA"
                  key="og-site-name"
                />
                <meta
                  property="og:title"
                  content="University-Student Union at Cal State LA"
                  key="og-title"
                />
                <meta
                  property="og:description"
                  content="Cal State LA's hub for connection and growth. Explore events, student organizations, recreation, and student services at the U-SU."
                  key="og-desc"
                />
                <meta property="og:type" content="website" key="og-type" />
                <meta
                  property="og:image"
                  content={FALLBACK_CARD_IMAGE.url}
                  key="og-image"
                />
              </Head>
              <EventsLoader />
              <Component {...pageProps} />
              <SpeedInsights route={router.pathname} />
              <Analytics />
            </RecoilRoot>
          </ToastProvider>
        </SessionProvider>
      </div>
    </>
  );
}
