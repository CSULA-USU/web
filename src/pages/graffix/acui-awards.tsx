import { Page } from 'modules';
import Head from 'next/head';
import { FluidContainer, Typography, Image, Panel, Button } from 'components';
import { Colors, Spaces, media } from 'theme';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import awards from 'data/acuiAwards.json';
import { useBreakpoint } from 'hooks';
import ReactPaginate from 'react-paginate';
import awardYears from 'data/acuiYear.json';
const NavItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const NavItems = [
  'All',
  'Best of Show',
  '1st Place',
  '2nd Place',
  '3rd Place',
  'Honorable Mention',
];

const InnerAwardContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  ${media('tablet')(`
   flex-wrap: wrap;
  
   `)}
  margin: auto;
`;

const PaginationContainer = styled.menu`
  ul {
    list-style-type: none;
    display: flex;
    justify-content: space-evenly;
    cursor: pointer;
  }

  a {
    padding: 5px;
    border-radius: 5px;
    border: 1px solid ${Colors.black};
    color: ${Colors.black};
  }

  a:hover {
    background: ${Colors.primary};
  }
`;

export default function AcuiAwards() {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const [buttonType, setButtonType] = useState('');
  const [awardCards, setAwardCards] = useState(awards);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    switch (buttonType) {
      case 'All':
        setAwardCards(awards);
        break;
      case 'Best of Show':
        const bestOfShow = awards.filter((p) =>
          p.place.includes('Best of Show'),
        );
        setAwardCards(bestOfShow);
        break;
      case '1st Place':
        const first = awards.filter((p) => p.place.includes('First'));
        setAwardCards(first);
        break;
      case '2nd Place':
        const second = awards.filter((p) => p.place.includes('Second'));
        setAwardCards(second);
        break;
      case '3rd Place':
        const third = awards.filter((p) => p.place.includes('Third'));
        setAwardCards(third);
        break;
      case 'Honorable Mention':
        const honorableMentions = awards.filter((p) =>
          p.place.includes('Honorable Mention'),
        );
        setAwardCards(honorableMentions);
        break;
    }
    setCurrentPage(0);
  }, [buttonType]);

  const AwardsNav = () => {
    return (
      <FluidContainer
        flex
        justifyContent={isDesktop ? 'initial' : 'center'}
        flexWrap="wrap"
      >
        {NavItems.map((item) => (
          <NavItemContainer
            key={item}
            onClick={() => {
              setButtonType(item);
            }}
          >
            <Button margin="5px">
              <Typography lineHeight="1" variant="cta">
                {item}
              </Typography>
            </Button>
          </NavItemContainer>
        ))}
      </FluidContainer>
    );
  };
  const PER_PAGE = 8;
  const offset = currentPage * PER_PAGE;
  const currentPageData = awardCards
    .slice(offset, offset + PER_PAGE)
    .map((award) => (
      <Panel
        width={isMobile ? '100%' : isTablet ? 'calc(40%)' : 'calc(30%)'}
        topBorder
        margin={Spaces.md}
        key={award.name + award.title}
      >
        <InnerAwardContainer>
          <Image
            src={award.src}
            alt={award.title}
            width={'100%'}
            marginRight={Spaces.md}
          />
          <div>
            <Typography
              as="h2"
              variant={isMobile ? 'label' : 'titleSmall'}
              margin="16px 0"
            >
              {award.name}
            </Typography>
            <Typography as="p">ACUI Conference:{award.acuiName}</Typography>
            <Typography as="p">Title: {award.title}</Typography>
            <Typography as="p">Place: {award.place}</Typography>
            <Typography as="p">Category: {award.category}</Typography>
            <Typography as="p">Class: {award.class}</Typography>
          </div>
        </InnerAwardContainer>
      </Panel>
    ));
  const pageCount = Math.ceil(awardCards.length / PER_PAGE);

  function handlePageClick({ selected: selectedPage }: any) {
    setCurrentPage(selectedPage);
  }

  const ScreenReaderOnly = styled.div`
    height: 1px;
    width: 1px;
    overflow: hidden;
    position: absolute;
    clip: rect(0, 0, 0, 0);
    clip-path: inset(50%);
    white-space: nowrap;
    border: 0;
    padding: 0;
    margin: -1px;
  `;

  return (
    <Page>
      <Head>
        <title>U-SU Graffix ACUI Awards</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="author"
          content="The University-Student Union Graffix Department at Cal State LA"
          key="author"
        />
        <meta
          name="description"
          content="Explore the award-winning work of the Cal State LA U-SU Graffix department. Celebrating over a decade of ACUI conference honors in graphic design and student union promotion."
          key="description"
        />
        <meta
          name="keywords"
          content="Graffix Awards, ACUI Conference, Cal State LA Graphic Design, U-SU Creative Services, Award Winning Design, Student Union Marketing, CSULA Graphics"
          key="keywords"
        />

        {/* Open Graph / Social Media */}
        <meta
          property="og:title"
          content="Graffix ACUI Awards | Cal State LA University-Student Union"
          key="og-title"
        />
        <meta
          property="og:description"
          content="From 'Best of Show' to Honorable Mentions, see why our Graffix team is recognized nationally for excellence in student union media."
          key="og-desc"
        />
        <meta
          property="og:url"
          content="https://www.calstatelausu.org/graffix/acui-awards"
        />
        <meta property="og:type" content="website" key="og-type" />
        <meta
          property="og:image"
          content="https://www.calstatelausu.org/departments/logos/graffix-logo.svg"
          key="og-image"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Award-Winning Design | Graffix ACUI Awards"
        />
        <meta
          name="twitter:description"
          content="Explore over a decade of national design awards won by Cal State LA students at the ACUI conferences."
        />
        <meta
          name="twitter:image"
          content="https://www.calstatelausu.org/departments/logos/graffix-logo.svg"
        />

        <link
          rel="canonical"
          href="https://www.calstatelausu.org/graffix/acui-awards"
        />

        {/* Structured Data for Portfolio/Awards */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'CollectionPage',
                  name: 'Graffix ACUI Awards',
                  description:
                    'A gallery of national awards won by Graffix student designers at Cal State LA.',
                  publisher: {
                    '@type': 'EducationalOrganization',
                    name: 'U-SU Graffix',
                    url: 'https://www.calstatelausu.org/graffix',
                  },
                },
                ...awards.map((award) => ({
                  '@type': 'CreativeWork',
                  name: award.title,
                  creator: {
                    '@type': 'Person',
                    name: award.name,
                  },
                  award: `${award.place} - ${award.acuiName}`,
                  genre: award.category,
                  image: `https://www.calstatelausu.org${award.src}`,
                  maintainer: {
                    '@type': 'EducationalOrganization',
                    name: 'U-SU Graffix',
                  },
                })),
              ],
            }),
          }}
        />
      </Head>
      <FluidContainer flex justifyContent="center" backgroundColor="black">
        <Typography variant="pageHeader" color="gold" as="h1">
          Graffix ACUI Awards
        </Typography>
      </FluidContainer>
      <ScreenReaderOnly id="acui-banner-descriptions">
        A group of 22 banners representing the different years and cities that
        hosted ACUI, the oldest taking place in 2007 and the most recent in
        2020.
      </ScreenReaderOnly>
      <FluidContainer flex justifyContent="center" flexWrap="wrap">
        {awardYears.map((y) => (
          <Image
            key={y.alt}
            src={y.src}
            alt="" //treat as single decorative group
            width="100px"
            margin="8px"
          />
        ))}
      </FluidContainer>
      <AwardsNav />
      <FluidContainer>
        <div>
          <FluidContainer flex justifyContent="center" flexWrap="wrap">
            {currentPageData}
          </FluidContainer>
          <PaginationContainer>
            <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              pageCount={pageCount}
              onPageChange={handlePageClick}
            />
          </PaginationContainer>
        </div>
      </FluidContainer>
    </Page>
  );
}
