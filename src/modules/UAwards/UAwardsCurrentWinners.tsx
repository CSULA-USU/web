import { useState } from 'react';
import styled from 'styled-components';
import { Colors } from 'theme';
import { AwardeeCard } from 'components';
import type { Awardee } from 'types';

interface UAwardsCurrentWinnersProps {
  departmentWinners: Awardee[];
  valueWinners: Awardee[];
  staffWinners: Awardee[];
}

type CategoryKey = 'all' | 'dept' | 'values' | 'staff';

const Section = styled.section`
  background: ${Colors.white};
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
  max-width: 1112px;
  margin: 0 0 48px;
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

const TabStrip = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid ${Colors.greyLighter};
  margin-bottom: 48px;
`;

const Tab = styled.button<{ $active: boolean }>`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 14px 20px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-montserrat, sans-serif);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: ${(p) => (p.$active ? Colors.black : Colors.greyDark)};
  border-bottom: 3px solid
    ${(p) => (p.$active ? Colors.primary : 'transparent')};
  transition: color 0.2s ease-in-out, border-color 0.2s ease-in-out;

  &:hover {
    color: ${Colors.black};
  }
`;

const CountBadge = styled.span<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  background: ${(p) => (p.$active ? Colors.primary : Colors.greyLightest)};
  color: ${(p) => (p.$active ? Colors.black : Colors.greyDark)};
`;

const Group = styled.div`
  margin-bottom: 64px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const GroupHead = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 24px;
`;

const GroupTitle = styled.h3`
  font-family: var(--font-bitter), serif;
  font-weight: 700;
  font-size: 32px;
  margin: 0;
  color: ${Colors.black};
`;

const GroupSub = styled.p`
  font-family: var(--font-bitter), serif;
  font-size: 16px;
  margin: 0;
  color: ${Colors.greyDark};
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const Panel = styled.div`
  &[hidden] {
    display: none;
  }
`;

export const UAwardsCurrentWinners = ({
  departmentWinners,
  valueWinners,
  staffWinners,
}: UAwardsCurrentWinnersProps) => {
  const [active, setActive] = useState<CategoryKey>('all');

  const total =
    departmentWinners.length + valueWinners.length + staffWinners.length;

  const cats: Array<{ key: CategoryKey; label: string; count: number }> = [
    { key: 'all', label: 'All Honorees', count: total },
    { key: 'dept', label: 'Department', count: departmentWinners.length },
    { key: 'values', label: 'U-SU Values', count: valueWinners.length },
    { key: 'staff', label: 'Full-Time Staff', count: staffWinners.length },
  ];

  return (
    <Section id="winners" aria-labelledby="winners-title">
      <Inner>
        <Head>
          <Kicker>2025 Honorees</Kicker>
          <Title id="winners-title">This Year&apos;s Winners</Title>
          <Lede>
            Fourteen members of the U-SU team, both students and full-time
            staff, nominated by their colleagues and selected by a committee to
            be recognized for outstanding work, embodying our values, and
            building the culture that makes Cal State LA feel like home.
          </Lede>
        </Head>

        <TabStrip role="tablist" aria-label="Filter honorees by category">
          {cats.map((c) => (
            <Tab
              key={c.key}
              id={`winners-tab-${c.key}`}
              role="tab"
              aria-selected={active === c.key}
              aria-controls={`winners-panel-${c.key}`}
              tabIndex={0}
              $active={active === c.key}
              onClick={() => setActive(c.key)}
            >
              {c.label}
              <CountBadge $active={active === c.key}>{c.count}</CountBadge>
            </Tab>
          ))}
        </TabStrip>

        <Panel
          id="winners-panel-all"
          role="tabpanel"
          aria-labelledby="winners-tab-all"
          hidden={active !== 'all'}
        >
          <Group>
            <GroupHead>
              <GroupTitle>Student of the Year by Department</GroupTitle>
              <GroupSub>
                One from each U-SU department, nominated by their teams.
              </GroupSub>
            </GroupHead>
            <List>
              {departmentWinners.map((a, i) => (
                <AwardeeCard
                  key={a.id}
                  awardee={a}
                  badge="Student of the Year"
                  index={i}
                  isFirst={i === 0}
                />
              ))}
            </List>
          </Group>

          <Group>
            <GroupHead>
              <GroupTitle>U-SU Values Awards</GroupTitle>
              <GroupSub>One student for each of our six core values.</GroupSub>
            </GroupHead>
            <List>
              {valueWinners.map((a, i) => (
                <AwardeeCard
                  key={a.id}
                  awardee={a}
                  badge={a.value}
                  index={i}
                  isFirst={i === 0}
                />
              ))}
            </List>
          </Group>

          <Group>
            <GroupHead>
              <GroupTitle>U-SU Values Champions</GroupTitle>
              <GroupSub>
                Two full-time staff members who embody every U-SU value, every
                day.
              </GroupSub>
            </GroupHead>
            <List>
              {staffWinners.map((a, i) => (
                <AwardeeCard
                  key={a.id}
                  awardee={a}
                  badge="Full-Time Staff Honoree"
                  index={i}
                  isFirst={i === 0}
                />
              ))}
            </List>
          </Group>
        </Panel>

        <Panel
          id="winners-panel-dept"
          role="tabpanel"
          aria-labelledby="winners-tab-dept"
          hidden={active !== 'dept'}
        >
          <Group>
            <GroupHead>
              <GroupTitle>Student of the Year by Department</GroupTitle>
              <GroupSub>
                One from each U-SU department, nominated by their teams.
              </GroupSub>
            </GroupHead>
            <List>
              {departmentWinners.map((a, i) => (
                <AwardeeCard
                  key={a.id}
                  awardee={a}
                  badge="Student of the Year"
                  index={i}
                  isFirst={i === 0}
                />
              ))}
            </List>
          </Group>
        </Panel>

        <Panel
          id="winners-panel-values"
          role="tabpanel"
          aria-labelledby="winners-tab-values"
          hidden={active !== 'values'}
        >
          <Group>
            <GroupHead>
              <GroupTitle>U-SU Values Awards</GroupTitle>
              <GroupSub>One student for each of our six core values.</GroupSub>
            </GroupHead>
            <List>
              {valueWinners.map((a, i) => (
                <AwardeeCard
                  key={a.id}
                  awardee={a}
                  badge={a.value}
                  index={i}
                  isFirst={i === 0}
                />
              ))}
            </List>
          </Group>
        </Panel>

        <Panel
          id="winners-panel-staff"
          role="tabpanel"
          aria-labelledby="winners-tab-staff"
          hidden={active !== 'staff'}
        >
          <Group>
            <GroupHead>
              <GroupTitle>Full-Time Staff Honorees</GroupTitle>
              <GroupSub>
                Two staff members who embody every U-SU value, every day.
              </GroupSub>
            </GroupHead>
            <List>
              {staffWinners.map((a, i) => (
                <AwardeeCard
                  key={a.id}
                  awardee={a}
                  badge="Full-Time Staff Honoree"
                  index={i}
                  isFirst={i === 0}
                />
              ))}
            </List>
          </Group>
        </Panel>
      </Inner>
    </Section>
  );
};
