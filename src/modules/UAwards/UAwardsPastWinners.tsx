import { useEffect, useMemo, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Colors } from 'theme';
import { AwardeeCard } from 'components';
import type { Awardee, Department, DepartmentKey, PastAwardee } from 'types';

interface UAwardsPastWinnersProps {
  winners: PastAwardee[];
  departments: Department[];
}

type YearFilter = number | 'all';
type DeptFilter = DepartmentKey | 'all';

const PAGE_SIZE = 14;

const Section = styled.section`
  background: ${Colors.greyLightest};
  padding: 96px 36px;

  @media (max-width: 900px) {
    padding: 72px 24px;
  }

  @media (max-width: 600px) {
    padding: 64px 16px;
  }
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Head = styled.div`
  max-width: 720px;
  margin: 0 0 40px;
`;

const Kicker = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-montserrat, sans-serif);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${Colors.gold};
  margin-bottom: 16px;

  &::before {
    content: '';
    display: inline-block;
    width: 28px;
    height: 2px;
    background: ${Colors.primary};
  }
`;

const Title = styled.h2`
  font-family: var(--font-bitter), serif;
  font-weight: 700;
  font-size: clamp(34px, 4vw, 48px);
  line-height: 1.1;
  margin: 0 0 16px;
  color: ${Colors.black};
`;

const Lede = styled.p`
  font-family: var(--font-bitter), serif;
  font-size: 18px;
  line-height: 1.65;
  margin: 0;
  color: ${Colors.greyDarkest};
`;

const Filters = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
`;

const FilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const FilterLabel = styled.span`
  min-width: 100px;
  font-family: var(--font-montserrat, sans-serif);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${Colors.greyDark};
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Chip = styled.button<{ $active: boolean }>`
  background: ${(p) => (p.$active ? Colors.black : Colors.white)};
  color: ${(p) => (p.$active ? Colors.white : Colors.greyDarkest)};
  border: 1px solid ${(p) => (p.$active ? Colors.black : Colors.greyLighter)};
  border-radius: 999px;
  padding: 8px 16px;
  font-family: var(--font-montserrat, sans-serif);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease-in-out, color 0.2s ease-in-out,
    border-color 0.2s ease-in-out;

  &:hover {
    border-color: ${Colors.black};
    color: ${(p) => (p.$active ? Colors.white : Colors.black)};
  }
`;

const Count = styled.p`
  font-family: var(--font-montserrat, sans-serif);
  font-size: 13px;
  color: ${Colors.greyDark};
  margin: 8px 0 24px;
`;

const Grid = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const reveal = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ListItem = styled.li<{ $animate: boolean; $delayMs: number }>`
  ${(p) =>
    p.$animate &&
    css`
      animation: ${reveal} 280ms ease-out both;
      animation-delay: ${p.$delayMs}ms;
    `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const PaginationActions = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const PaginationButton = styled.button<{ $kind?: 'primary' | 'secondary' }>`
  background: ${(p) => (p.$kind === 'secondary' ? Colors.white : Colors.black)};
  color: ${(p) => (p.$kind === 'secondary' ? Colors.black : Colors.white)};
  border: 1px solid ${Colors.black};
  border-radius: 999px;
  padding: 10px 20px;
  font-family: var(--font-montserrat, sans-serif);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    background: ${(p) =>
      p.$kind === 'secondary' ? Colors.black : Colors.white};
    color: ${(p) => (p.$kind === 'secondary' ? Colors.white : Colors.black)};
  }
`;

const Empty = styled.div`
  background: ${Colors.white};
  border-radius: 16px;
  padding: 48px 24px;
  text-align: center;
  font-family: var(--font-bitter), serif;
  font-size: 18px;
  color: ${Colors.greyDark};
`;

export const UAwardsPastWinners = ({
  winners,
  departments,
}: UAwardsPastWinnersProps) => {
  const [year, setYear] = useState<YearFilter>('all');
  const [dept, setDept] = useState<DeptFilter>('all');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [animateFromIndex, setAnimateFromIndex] = useState(0);

  const years = useMemo(
    () => Array.from(new Set(winners.map((w) => w.year))).sort((a, b) => b - a),
    [winners],
  );

  const filtered = winners.filter(
    (w) =>
      (year === 'all' || w.year === year) &&
      (dept === 'all' || w.deptKey === dept),
  );

  const winnerProfiles = useMemo(
    () =>
      filtered.map(
        (winner): Awardee => ({
          id: winner.id,
          name: winner.name,
          role: `${winner.dept} · ${winner.role}`,
          dept: winner.cat,
          deptKey: winner.deptKey,
          quote:
            winner.quote?.trim() ||
            `${winner.name} was recognized in ${winner.year} as a ${winner.type} honoree for ${winner.cat}.`,
          photoUrl: winner.photoUrl,
        }),
      ),
    [filtered],
  );

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
    setAnimateFromIndex(0);
  }, [year, dept]);

  const visibleProfiles = winnerProfiles.slice(0, visibleCount);
  const hasMore = visibleCount < winnerProfiles.length;
  const canShowLess = visibleCount > PAGE_SIZE;

  const deptLabel =
    dept === 'all' ? null : departments.find((d) => d.key === dept)?.label;
  const visibleTotal = Math.min(visibleCount, filtered.length);
  const countLine = `Showing ${visibleTotal} of ${filtered.length} ${
    filtered.length === 1 ? 'honoree' : 'honorees'
  }${year !== 'all' ? ` from ${year}` : ''}${
    deptLabel ? ` in ${deptLabel}` : ''
  }.`;

  return (
    <Section id="past" aria-labelledby="past-title">
      <Inner>
        <Head>
          <Kicker>Hall of Honorees</Kicker>
          <Title id="past-title">Past Winners</Title>
          <Lede>
            Five years of U-Awards recipients. Browse by year or department to
            see the people who built the U-SU we know today.
          </Lede>
        </Head>

        <Filters>
          <FilterRow>
            <FilterLabel>Year</FilterLabel>
            <Chips role="group" aria-label="Filter by year">
              <Chip
                $active={year === 'all'}
                onClick={() => setYear('all')}
                aria-pressed={year === 'all'}
              >
                All Years
              </Chip>
              {years.map((y) => (
                <Chip
                  key={y}
                  $active={year === y}
                  onClick={() => setYear(y)}
                  aria-pressed={year === y}
                >
                  {y}
                </Chip>
              ))}
            </Chips>
          </FilterRow>
          <FilterRow>
            <FilterLabel>Department</FilterLabel>
            <Chips role="group" aria-label="Filter by department">
              <Chip
                $active={dept === 'all'}
                onClick={() => setDept('all')}
                aria-pressed={dept === 'all'}
              >
                All Departments
              </Chip>
              {departments.map((d) => (
                <Chip
                  key={d.key}
                  $active={dept === d.key}
                  onClick={() => setDept(d.key)}
                  aria-pressed={dept === d.key}
                >
                  {d.label}
                </Chip>
              ))}
            </Chips>
          </FilterRow>
        </Filters>

        <Count aria-live="polite">{countLine}</Count>

        {filtered.length === 0 ? (
          <Empty>No honorees match these filters.</Empty>
        ) : (
          <>
            <Grid>
              {visibleProfiles.map((w, i) => (
                <ListItem
                  key={w.id}
                  $animate={i >= animateFromIndex}
                  $delayMs={Math.max(0, i - animateFromIndex) * 26}
                >
                  <AwardeeCard
                    awardee={w}
                    badge={String(filtered[i].year)}
                    hidePhoto
                    hideModalPhoto={false}
                    layout="list"
                  />
                </ListItem>
              ))}
            </Grid>
            {(hasMore || canShowLess) && (
              <PaginationActions>
                {hasMore && (
                  <PaginationButton
                    type="button"
                    onClick={() => {
                      setAnimateFromIndex(visibleCount);
                      setVisibleCount((count) => count + PAGE_SIZE);
                    }}
                  >
                    Load 14 More
                  </PaginationButton>
                )}
                {canShowLess && (
                  <PaginationButton
                    $kind="secondary"
                    type="button"
                    onClick={() => {
                      setAnimateFromIndex(0);
                      setVisibleCount(PAGE_SIZE);
                    }}
                  >
                    Show Less
                  </PaginationButton>
                )}
              </PaginationActions>
            )}
          </>
        )}
      </Inner>
    </Section>
  );
};
