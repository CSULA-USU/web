import Head from 'next/head';
import { useMemo, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import {
  Button,
  FluidContainer,
  Image,
  Input,
  StaffCardWithModal,
  Typography,
} from 'components';
import staff from 'data/staff.json';
import { splitDepartments } from 'utils/stringhelpers';
import { Colors, Spaces, media } from 'theme';
import { Page, Header } from 'modules';

const DEPARTMENT_FILTERS = [
  'All',
  'Directors',
  'Administration',
  'CSI',
  'CCC',
  'Graffix',
  'Operations',
  'Recreation',
];

const SearchField = styled.div`
  position: relative;
  width: 340px;
  max-width: 100%;
  margin-bottom: ${Spaces.lg};

  svg {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: ${Colors.greyDark};
    font-size: 14px;
    pointer-events: none;
  }

  input {
    height: 44px;
    padding-left: 38px;
    border: 1px solid ${Colors.greyLighter};
    border-radius: 8px;
    background-color: ${Colors.white};
    font-family: inherit;
    font-size: 14px;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${Spaces.sm};
  padding-bottom: ${Spaces.lg};
  border-bottom: 1px solid ${Colors.greyLighter};
`;

const ResultsBar = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${Spaces.md};
  padding: ${Spaces.lg} 0;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: none;
  }
`;

// Cards ease in as they mount, so switching a filter reads as the roster
// resolving rather than snapping to a new set. Remounting the grid on a filter
// change (see the key below) replays it for the whole set; a search only fades
// in the people who newly match, leaving the rest still.
const Roster = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: ${Spaces.lg};

  > * {
    animation: ${fadeIn} 0.3s ease both;
  }

  ${media('mobile')(`
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: ${Spaces.md};
  `)}

  @media (prefers-reduced-motion: reduce) {
    > * {
      animation: none;
    }
  }
`;

const EmptyState = styled.div`
  padding: ${Spaces['2xl']} 0;
  text-align: center;
  animation: ${fadeIn} 0.3s ease both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const GroupPhoto = styled.figure`
  margin: 0;
  text-align: center;
`;

export default function Staff() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [query, setQuery] = useState('');

  const visibleStaff = useMemo(() => {
    const search = query.trim().toLowerCase();

    return staff.filter((staffMember) => {
      const matchesFilter =
        activeFilter === 'All' || staffMember.tags.includes(activeFilter);
      const matchesSearch =
        !search ||
        [
          staffMember.name,
          staffMember.title,
          staffMember.department,
          staffMember.email,
        ].some((field) => field.toLowerCase().includes(search));

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, query]);

  const isFiltered = activeFilter !== 'All' || query.trim() !== '';

  const clearFilters = () => {
    setActiveFilter('All');
    setQuery('');
  };

  return (
    <Page>
      <Head>
        <title>U&ndash;SU Staff</title>
        <meta
          name="author"
          content="University-Student Union, Cal State LA"
          key="author"
        />
        <meta
          name="description"
          content="Meet the staff of the University-Student Union at Cal State LA. Browse our directors, administration, CSI, CCC, Graffix, Operations, and Recreation teams and find their contact details."
          key="description"
        />
        {/* Open Graph / Social Media */}
        <meta
          property="og:title"
          content="Meet the Staff of the Cal State LA U-SU"
          key="og-title"
        />
        <meta
          property="og:description"
          content="Search the U-SU staff directory by name, title, or department, and find contact details for every team across the Union."
          key="og-desc"
        />
        <meta property="og:type" content="website" key="og-type" />
        <meta
          property="og:url"
          content="https://www.calstatelausu.org/staff"
          key="og-url"
        />
        <meta
          property="og:image"
          content="https://www.calstatelausu.org/about/calstatela-hero.jpeg"
          key="og-image"
        />
        <meta
          property="og:image:alt"
          content="The Cal State LA University-Student Union Building"
          key="og-image-alt"
        />
        <meta property="og:image:width" content="1000" key="og-image-width" />
        <meta property="og:image:height" content="710" key="og-image-height" />

        {/* Twitter */}
        <meta
          name="twitter:card"
          content="summary_large_image"
          key="twitter-card"
        />
        <link rel="canonical" href="https://www.calstatelausu.org/staff" />
      </Head>
      <Header
        title="Meet the Staff"
        backgroundImage="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/backgrounds/subtle-background-4.webp"
      >
        <Typography as="p" variant="copy" margin={`0 0 ${Spaces.md} 0`}>
          Union: An act or instance of uniting or joining two or more things
          into one. Something that is made one : something formed by a
          combination or coalition of parts or members. A confederation of
          independent individuals for some common purpose.
        </Typography>
        <Typography as="p" variant="span" size="xs" color="greyDark">
          Select any staff member for their info and a link to their virtual
          card
        </Typography>
      </Header>
      <FluidContainer>
        <SearchField>
          <FaSearch aria-hidden />
          <Input
            type="search"
            value={query}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(event.target.value)
            }
            placeholder="Search by name, title, or department"
            aria-label="Search staff by name, title, or department"
          />
        </SearchField>
        <FilterGroup>
          {DEPARTMENT_FILTERS.map((filter) => {
            const isActive = filter === activeFilter;
            return (
              <Button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                variant={isActive ? 'black' : 'grey'}
                padding="10px 18px"
                fontSize="14px"
                aria-pressed={isActive}
              >
                {filter}
              </Button>
            );
          })}
        </FilterGroup>
        <ResultsBar>
          <Typography
            as="p"
            variant="span"
            size="xs"
            color="greyDark"
            aria-live="polite"
          >
            {`Showing ${visibleStaff.length} of ${staff.length}`}
          </Typography>
          {isFiltered && (
            <Button
              onClick={clearFilters}
              variant="grey"
              padding="8px 16px"
              fontSize="14px"
            >
              Clear filters
            </Button>
          )}
        </ResultsBar>
        {visibleStaff.length > 0 ? (
          <Roster key={activeFilter}>
            {visibleStaff.map((staffMember) => (
              <StaffCardWithModal
                key={staffMember.name}
                name={staffMember.name}
                title={staffMember.title}
                src={staffMember.src}
                alt={staffMember.alt}
                pronouns={staffMember.pronouns}
                pronunciation={staffMember.pronunciation}
                suffix={staffMember.suffix}
                department={staffMember.department}
                email={staffMember.email}
                phone={staffMember.phone}
                url={staffMember.url}
                bio={staffMember.bio}
                special={staffMember.special}
                orientation="vertical"
                width="100%"
                rounded
              >
                {/* A member in more than one department gets a line each —
                    run together on one line they read as a single, wrong name. */}
                {splitDepartments(staffMember.department).map(
                  (department, index) => (
                    <Typography
                      key={department}
                      as="p"
                      variant="span"
                      size="2xs"
                      color="greyDark"
                      margin={index === 0 ? `${Spaces.xs} 0 0 0` : '0'}
                    >
                      {department}
                    </Typography>
                  ),
                )}
              </StaffCardWithModal>
            ))}
          </Roster>
        ) : (
          <EmptyState>
            <Typography as="p" variant="copy" margin={`0 0 ${Spaces.md} 0`}>
              No staff members match that search.
            </Typography>
            <Button
              onClick={clearFilters}
              variant="black"
              padding="10px 18px"
              fontSize="14px"
            >
              Clear filters
            </Button>
          </EmptyState>
        )}
      </FluidContainer>
      <FluidContainer>
        <GroupPhoto>
          <Image
            alt="group photo of full time u-su staff"
            src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/staff/group/usu-group-2026%20(1).webp"
            width="100%"
            borderRadius="12px"
          />
          <figcaption>
            <Typography
              as="span"
              variant="span"
              size="2xs"
              color="greyDark"
              margin={`${Spaces.md} 0 0 0`}
            >
              The full&ndash;time staff of the University&ndash;Student Union at
              Cal State LA (2026)
            </Typography>
          </figcaption>
        </GroupPhoto>
      </FluidContainer>
    </Page>
  );
}
