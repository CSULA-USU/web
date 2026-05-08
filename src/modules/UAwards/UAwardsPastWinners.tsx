import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Colors } from 'theme';
import { PortraitPlaceholder } from 'components';
import type { Department, DepartmentKey, PastAwardee } from 'types';

interface UAwardsPastWinnersProps {
  winners: PastAwardee[];
  departments: Department[];
}

type YearFilter = number | 'all';
type DeptFilter = DepartmentKey | 'all';

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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
  background: ${Colors.white};
  border: 1px solid ${Colors.greyLighter};
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out,
    border-color 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    border-color: ${Colors.primary};
  }
`;

const CardPhoto = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  background: ${Colors.greyLightest};
`;

const YearBadge = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 2;
  background: rgba(0, 0, 0, 0.85);
  color: ${Colors.white};
  font-family: var(--font-montserrat, sans-serif);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  padding: 5px 10px;
  border-radius: 6px;
`;

const Body = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Cat = styled.span`
  font-family: var(--font-montserrat, sans-serif);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${Colors.gold};
`;

const Name = styled.h3`
  font-family: var(--font-bitter), serif;
  font-weight: 700;
  font-size: 17px;
  line-height: 1.2;
  margin: 0;
  color: ${Colors.black};
`;

const DeptLine = styled.span`
  font-family: var(--font-montserrat, sans-serif);
  font-size: 12px;
  font-weight: 600;
  color: ${Colors.greyDark};
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

  const years = useMemo(
    () => Array.from(new Set(winners.map((w) => w.year))).sort((a, b) => b - a),
    [winners],
  );

  const filtered = winners.filter(
    (w) =>
      (year === 'all' || w.year === year) &&
      (dept === 'all' || w.deptKey === dept),
  );

  const deptLabel =
    dept === 'all' ? null : departments.find((d) => d.key === dept)?.label;
  const countLine = `Showing ${filtered.length} ${
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
          <Grid>
            {filtered.map((w) => (
              <Card key={w.id}>
                <CardPhoto>
                  <YearBadge>{w.year}</YearBadge>
                  <PortraitPlaceholder name={w.name} fontSize="40px" />
                </CardPhoto>
                <Body>
                  <Cat>{w.cat}</Cat>
                  <Name>{w.name}</Name>
                  <DeptLine>
                    {w.dept} · {w.role}
                  </DeptLine>
                </Body>
              </Card>
            ))}
          </Grid>
        )}
      </Inner>
    </Section>
  );
};
