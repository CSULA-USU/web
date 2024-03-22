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

const InnerAwardContainer = styled.nav`
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
                {item} fsafasfsa
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
  return (
    <Page>
      <Head>
        <title>U-SU Graffix ACUI Awards</title>
        <meta
          name="author"
          content="The University Student Union Graffix Department"
        />
        <meta
          name="keywords"
          content="The University Student Union, California State University Los Angeles, Student Union, CSULA, Cal State LA, U-SU, USU, Graffix, Graphics, Programming, Events, Campaign, Promotion, Print, ACUI"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FluidContainer flex justifyContent="center" backgroundColor="black">
        <Typography variant="pageHeader" color="gold" as="h1">
          Graffix ACUI Awards
        </Typography>
      </FluidContainer>
      <FluidContainer flex justifyContent="center" flexWrap="wrap">
        {awardYears.map((y) => (
          <Image
            key={y.alt}
            src={y.src}
            alt={y.alt}
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
