import Head from 'next/head';
import { useEffect, useState } from 'react';
// import styled from 'styled-components';
import { FluidContainer, NonBreakingSpan, Typography } from 'components';
import {
  EventHeader,
  ModUpcomingEvents,
  BoardOfDirectorsCTA,
  Page,
  CallToActionImages,
  FeaturedEvents,
} from 'modules';
import { useRecoilValue } from 'recoil';
import { eventListState, eventListStatusState } from 'atoms';
import { useBreakpoint } from 'hooks';
// import { Spaces } from 'theme';
import featuredEvents from 'data/featured-events.json';

const images = [
  {
    src: 'https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/departments/operations/images/building-maintenance.jpg',
    alt: '',
    width: '275',
    margin: '0',
  },
  {
    src: 'https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/departments/operations/images/information-event-services.jpg',
    alt: '',
    width: '275',
    margin: '0',
  },
  {
    src: 'https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/departments/operations/images/building-services.jpg',
    alt: '',
    width: '275',
    margin: '0',
  },
  {
    src: 'https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/departments/operations/images/media-services.jpg',
    alt: '',
    width: '275',
    margin: '0',
  },
];

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
  const events = useRecoilValue(eventListState);
  const eventsStatus = useRecoilValue(eventListStatusState);
  const [loading, setLoading] = useState(true);
  const { isMobile } = useBreakpoint();

  useEffect(() => {
    if (eventsStatus != 'undefined') {
      setLoading(false);
    }
  }, [events]);

  return (
    <Page>
      <Head>
        <title>University&ndash;Student Union</title>
      </Head>
      {/* {loading ? (
        <></>
      ) : events.length > 0 ? ( */}
      <>
        <EventHeader
          loading={loading}
          subheaderText={
            isMobile
              ? 'California State, Los Angeles'
              : 'California State University, Los Angeles'
          }
          title={isMobile ? 'U-SU' : 'University-Student Union'}
          featuredEvent={events[0]}
        />
        {!loading && eventsStatus == 'failed' ? (
          <Typography as="h3" variant="label">
            Resources failed to load. Please try refreshing your page.
          </Typography>
        ) : (
          <>
            {/* Toggle the line below if there is a promotion. */}
            {/* <BoardOfDirectorsCTAPromotion /> */}

            {featuredEvents.length >= 1 ? (
              <FeaturedEvents events={events} featuredEvents={featuredEvents} />
            ) : null}
            <ModUpcomingEvents loading={loading} events={events} />
          </>
        )}
      </>
      {/* ) : (
        <>
          <FluidContainer
            flex
            justifyContent="center"
            backgroundImage="/backgrounds/subtle-background-2.jpg"
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
        images={images}
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
