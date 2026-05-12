import Head from 'next/head';
import { useEffect, useState } from 'react';
// import styled from 'styled-components';
import {
  Button,
  FluidContainer,
  NonBreakingSpan,
  Typography,
} from 'components';
import {
  // EventHeader,
  // ModUpcomingEvents,
  BoardOfDirectorsCTA,
  Page,
  CallToActionImages,
  UAwardsValues,
  UtilityHeroHeader,
  // FeaturedEvents,
} from 'modules';
import { useRecoilValue } from 'recoil';
import {
  // eventListState,
  eventListStatusState,
} from 'atoms';
import { useBreakpoint } from 'hooks';
import uAwards from 'data/uAwards.json';
import type { UAwardsData } from 'types';

// import { Spaces } from 'theme';
// const ButtonContainer = styled.div`
//   margin-top: ${Spaces['sm']};
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   ./ > *:not(:last-child) {
//     margin-right: 8px;
//   }
//   column-gap: ${Spaces.md};
//   row-gap: ${Spaces.md};
// `;

export default function Home() {
  const data = uAwards as UAwardsData;
  // const events = useRecoilValue(eventListState);
  const eventsStatus = useRecoilValue(eventListStatusState);
  const [loading, setLoading] = useState(true);
  const { isDesktop, isMobile } = useBreakpoint();

  useEffect(() => {
    if (eventsStatus != 'undefined') {
      setLoading(false);
    }
  }, [eventsStatus]);

  return (
    <Page>
      <Head>
        <title>University&ndash;Student Union</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="author"
          content="University-Student Union at Cal State LA"
        />
        <meta
          name="description"
          content="The heart of campus life at Cal State LA. Discover upcoming events, student organizations, job opportunities, room rentals, and essential student services at the U-SU."
        />
        {/* Open Graph / Social Media */}
        <meta
          property="og:title"
          content="University-Student Union | Cal State LA"
        />
        <meta
          property="og:description"
          content="Your hub for connection and growth. Explore events, join student orgs, find your community at the U-SU."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.calstatelausu.org/" />
        <meta
          property="og:image"
          content="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/about/calstatela-hero.jpg"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://www.calstatelausu.org/" />

        {/* Structured Data for the Organization and Events */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'NonprofitOrganization',
              name: 'University-Student Union at Cal State LA',
              url: 'https://www.calstatelausu.org',
              logo: 'https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/brand/usu_logo_white.webp',
              sameAs: ['https://www.instagram.com/usucalstatela/?hl=en'],
            }),
          }}
        />
      </Head>
      {/* {loading ? (
        <></>
      ) : events.length > 0 ? ( */}
      <>
        {/* If there are no events, we can hide the event header section and just show the upcoming events section with a message that there are no events. */}
        {/* <EventHeader
          loading={loading || !events.length}
          subheaderText="California State University, Los Angeles"
          title={
            <>
              <span className="mobile-only">U-SU</span>
              <span className="desktop-only">University-Student Union</span>
            </>
          }
          featuredEvent={events[0]}
        /> */}
        {/* summer no event section */}
        <UtilityHeroHeader
          src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/services/Services-Hero.webp"
          mobileSrc="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/about/Hero-Mobile.webp"
          alt="Student Union Building"
          title="We are the U-SU"
          maxDescriptionWidth="1000px"
          description="The Board of Directors is the governing board for the University-Student Union, consisting of 8 student directors and 11 faculty/staff/administrator/alumni members who help shape policy, structure and are responsible for all financial & legal responsibilities of running a non-profit organization. Directors are expected to serve on the board for one academic year (Fall-Spring)."
        >
          <Button
            href="https://www.dropbox.com/scl/fi/ilqryvwvq5fgrxn1jwjvt/Org-Chart_9.17.25.jpg?rlkey=o2w6m4cmqj2vskvn8fy36iljp&st=m7xnxsft&raw=1"
            isExternalLink
          >
            U&ndash;SU Organizational Chart
          </Button>
          <Button
            variant="white"
            href="https://www.dropbox.com/scl/fi/mhz4o8qwrgoc5fs1913pa/strategic-plan-2024.pdf?rlkey=0lqvmafy11699jekjtgru89lg&raw=1"
            isExternalLink
          >
            Strategic Plan
          </Button>
        </UtilityHeroHeader>
        <FluidContainer
          flex
          flexDirection={isMobile ? 'column' : 'row'}
          backgroundColor="primary"
          padding="0"
        >
          <FluidContainer>
            <Typography
              variant="pageHeader"
              as="span"
              size={isDesktop ? 'lg' : 'xl'}
              lineHeight="1.5"
            >
              With open doors and minds, we provide space and opportunities,
              enabling Golden Eagles to soar. Our vision is to become Cal State
              LA&apos;s hub for connection and growth.
            </Typography>
          </FluidContainer>
          <FluidContainer>
            <Typography
              variant="pageHeader"
              color="greyDarkest"
              as="p"
              size={isDesktop ? 'sm' : 'md'}
              lineHeight="1.5"
            >
              The University-Student Union, or U-SU for short, is a great
              one-stop location for students eager to learn about what&apos;s
              happening on campus, collect student discounts or get involved. It
              is the headquarters for the Alumni Center, student government
              (Associated Students Incorporated) and campus organizations and
              clubs.
            </Typography>
          </FluidContainer>
        </FluidContainer>
        <UAwardsValues values={data.values} />
        {/* end of summer no event section */}

        {!loading && eventsStatus == 'failed' ? (
          <Typography as="h3" variant="label">
            Resources failed to load. Please try refreshing your page.
          </Typography>
        ) : (
          <>
            {/* Toggle the line below if there is a promotion. */}
            {/* <BoardOfDirectorsCTAPromotion /> */}

            {/* If there are no events, we can hide the featured events section and just show the upcoming events section with a message that there are no events. */}
            {/* {featuredEvents.length >= 1 ? (
              <FeaturedEvents events={events} featuredEvents={featuredEvents} />
            ) : null}
            <ModUpcomingEvents loading={loading} events={events} /> */}
          </>
        )}
      </>
      {/* ) : (
        <>
          <FluidContainer
            flex
            justifyContent="center"
            backgroundImage="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/backgrounds/subtle-background-2.webp"
          >
            {isTablet || isMobile ? (
              <>
                <FluidContainer>
                  <Typography
                    as="h1"
                    variant="pageHeader"
                    size={isTablet ? '4xl' : '5xl'}
                    lineHeight="1.3"
                    style={{ textAlign: 'center' }}
                  >
                    We are <NonBreakingSpan>the U-SU</NonBreakingSpan>
                  </Typography>
                  <FluidContainer
                    flex
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Image
                      alt="student union"
                      src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/about/calstatela-hero.jpg"
                      width={0}
                      height={0}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </FluidContainer>
                  <ButtonContainer>
                    <Button
                      variant="black"
                      href="https://www.dropbox.com/scl/fi/92l1g0nv0v3pv3n75t7bj/Org-Chart_6.16.25.png?rlkey=q8j70t5aq2jlx47qf4z596n70&raw=1"
                      isExternalLink
                    >
                      U-SU Organizational Chart
                    </Button>
                    <Button
                      variant="outline"
                      href="https://www.dropbox.com/scl/fi/mhz4o8qwrgoc5fs1913pa/strategic-plan-2024.pdf?rlkey=0lqvmafy11699jekjtgru89lg&raw=1"
                      isExternalLink
                    >
                      Strategic Plan
                    </Button>
                  </ButtonContainer>
                </FluidContainer>
              </>
            ) : (
              <>
                <FluidContainer
                  flex
                  justifyContent="center"
                  alignItems="center"
                  padding="0"
                >
                  <Image
                    alt="student union"
                    src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/about/calstatela-hero.jpg"
                    style={{ width: '100%', height: 'auto' }}
                  />
                </FluidContainer>
                <FluidContainer padding="18px 0px 18px 18px">
                  <FluidContainer>
                    <Typography
                      as="h1"
                      variant="pageHeader"
                      size={isDesktop ? '4xl' : '5xl'}
                      lineHeight="1.3"
                      style={{ textAlign: 'center' }}
                    >
                      We are <NonBreakingSpan>the U-SU</NonBreakingSpan>
                    </Typography>
                  </FluidContainer>
                  <ButtonContainer>
                    <Button
                      variant="black"
                      href="https://www.dropbox.com/scl/fi/92l1g0nv0v3pv3n75t7bj/Org-Chart_6.16.25.png?rlkey=q8j70t5aq2jlx47qf4z596n70&raw=1"
                      isExternalLink
                    >
                      U-SU Organizational Chart
                    </Button>
                    <Button
                      variant="outline"
                      href="https://www.dropbox.com/scl/fi/mhz4o8qwrgoc5fs1913pa/strategic-plan-2024.pdf?rlkey=0lqvmafy11699jekjtgru89lg&raw=1"
                      isExternalLink
                    >
                      Strategic Plan
                    </Button>
                  </ButtonContainer>
                </FluidContainer>
              </>
            )}
          </FluidContainer>
          <FluidContainer
            flex
            flexDirection={isMobile ? 'column' : 'row'}
            backgroundColor="primary"
            padding="0"
          >
            <FluidContainer>
              <Typography
                variant="pageHeader"
                as="span"
                size={isDesktop ? 'lg' : 'xl'}
                lineHeight="1.5"
              >
                With open doors and minds, we provide space and opportunities,
                enabling Golden Eagles to soar. Our vision is to become Cal
                State LA&apos;s hub for connection and growth.
              </Typography>
            </FluidContainer>
            <FluidContainer>
              <Typography
                variant="pageHeader"
                color="greyDarkest"
                as="p"
                size={isDesktop ? 'sm' : 'md'}
                lineHeight="1.5"
              >
                The University-Student Union, or U-SU for short, is a great
                one-stop location for students eager to learn about what&apos;s
                happening on campus, collect student discounts or get involved.
                It is the headquarters for the Alumni Center, student government
                (Associated Students Incorporated) and campus organizations and
                clubs.
              </Typography>
            </FluidContainer>
          </FluidContainer>
        </>
      )} */}
      {/* Toggle the line below if there is a promotion. */}
      <CallToActionImages
        title={
          <>
            Join the
            <br />
            <strong>U-Krew!</strong>
          </>
        }
        buttonHref="/employment"
        buttonText="View Opportunities"
      >
        Catalyze your professional development and build your network by
        becoming a valued member of the <NonBreakingSpan>U-SU</NonBreakingSpan>
      </CallToActionImages>
      <FluidContainer>
        <BoardOfDirectorsCTA />
      </FluidContainer>
    </Page>
  );
}
