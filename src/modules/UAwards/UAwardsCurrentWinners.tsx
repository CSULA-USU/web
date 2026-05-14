import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Colors } from 'theme';
import { AwardeeCard } from 'components/AwardeeCard/AwardeeCard';
import type { Awardee } from 'types';

interface UAwardsCurrentWinnersProps {
  departmentWinners: Awardee[];
  valueWinners: Awardee[];
  staffWinners: Awardee[];
}

type CategoryKey = 'all' | 'dept' | 'values' | 'staff';
type GroupTone = 'dept' | 'values' | 'staff';
type TabTone = GroupTone | 'all';

const uAwardsGroupStyles: Record<
  GroupTone,
  { background: string; border: string; accent: string; label: string }
> = {
  dept: {
    background: 'rgba(140, 106, 20, 0.06)',
    border: 'rgba(140, 106, 20, 0.18)',
    accent: Colors.gold,
    label: 'Department Honorees',
  },
  values: {
    background: 'rgba(255, 206, 4, 0.08)',
    border: 'rgba(255, 206, 4, 0.22)',
    accent: Colors.primary,
    label: 'Values Honorees',
  },
  staff: {
    background: 'rgba(0, 0, 0, 0.04)',
    border: 'rgba(0, 0, 0, 0.12)',
    accent: Colors.black,
    label: 'Staff Honorees',
  },
};

const tabStyles: Record<
  TabTone,
  {
    activeBackground: string;
    activeBorder: string;
    accent: string;
    activeText: string;
    countActiveBackground: string;
    countActiveColor: string;
  }
> = {
  all: {
    activeBackground: 'rgba(0, 0, 0, 0.04)',
    activeBorder: 'rgba(0, 0, 0, 0.22)',
    accent: Colors.black,
    activeText: Colors.black,
    countActiveBackground: Colors.black,
    countActiveColor: Colors.white,
  },
  dept: {
    activeBackground: 'rgba(140, 106, 20, 0.06)',
    activeBorder: 'rgba(140, 106, 20, 0.3)',
    accent: Colors.gold,
    activeText: Colors.gold,
    countActiveBackground: Colors.gold,
    countActiveColor: Colors.white,
  },
  values: {
    activeBackground: 'rgba(255, 206, 4, 0.08)',
    activeBorder: 'rgba(255, 206, 4, 0.36)',
    accent: Colors.primary,
    activeText: Colors.black,
    countActiveBackground: Colors.primary,
    countActiveColor: Colors.black,
  },
  staff: {
    activeBackground: 'rgba(0, 0, 0, 0.05)',
    activeBorder: 'rgba(0, 0, 0, 0.24)',
    accent: Colors.black,
    activeText: Colors.black,
    countActiveBackground: Colors.black,
    countActiveColor: Colors.white,
  },
};

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
  gap: 12px;
  margin-bottom: 48px;
`;

const Tab = styled.button<{ $active: boolean; $tone: TabTone }>`
  background: ${Colors.white};
  border: 1px solid ${Colors.greyLighter};
  cursor: pointer;
  padding: 14px 20px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border-radius: 999px;
  font-family: var(--font-montserrat, sans-serif);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: ${(p) =>
    p.$active ? tabStyles[p.$tone].activeText : Colors.greyDark};
  box-shadow: ${(p) =>
    p.$active ? '0 10px 22px rgba(0, 0, 0, 0.08)' : 'none'};
  transition: color 0.2s ease-in-out, border-color 0.2s ease-in-out,
    background-color 0.2s ease-in-out, transform 0.2s ease-in-out;

  &:hover {
    color: ${(p) => (p.$active ? tabStyles[p.$tone].activeText : Colors.black)};
    transform: translateY(-1px);
  }

  ${(p) =>
    p.$active &&
    `
    background: ${tabStyles[p.$tone].activeBackground};
    border-color: ${tabStyles[p.$tone].activeBorder};
  `}
`;

const CountBadge = styled.span<{ $active: boolean; $tone: TabTone }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  background: ${(p) =>
    p.$active ? tabStyles[p.$tone].countActiveBackground : Colors.greyLightest};
  color: ${(p) =>
    p.$active ? tabStyles[p.$tone].countActiveColor : Colors.greyDark};
`;

const Group = styled.section<{ $tone: GroupTone }>`
  margin-bottom: 64px;
  padding: 28px 28px 24px;
  background: ${(p) => uAwardsGroupStyles[p.$tone].background};
  border: 1px solid ${(p) => uAwardsGroupStyles[p.$tone].border};
  border-left: 6px solid ${(p) => uAwardsGroupStyles[p.$tone].accent};
  border-radius: 20px;
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.05);

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 600px) {
    padding: 20px 16px 18px;
    border-left-width: 5px;
  }
`;

const GroupHead = styled.div<{ $tone: GroupTone }>`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 22px;
`;

const GroupLabel = styled.span<{ $tone: GroupTone }>`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 7px 12px;
  border-radius: 999px;
  background: ${(p) => uAwardsGroupStyles[p.$tone].accent};
  color: ${(p) => (p.$tone === 'values' ? Colors.black : Colors.white)};
  font-family: var(--font-montserrat, sans-serif);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const GroupTitle = styled.h3<{ $tone: GroupTone }>`
  font-family: var(--font-bitter), serif;
  font-weight: 700;
  font-size: 32px;
  margin: 0;
`;

const GroupSub = styled.p`
  font-family: var(--font-bitter), serif;
  font-size: 16px;
  margin: 0 0 22px;
  color: ${Colors.greyDark};
`;

const List = styled.div<{ $tone: GroupTone }>`
  display: grid;
  grid-template-columns: ${(p) =>
    p.$tone === 'staff'
      ? 'repeat(2, minmax(0, 1fr))'
      : 'repeat(3, minmax(0, 1fr))'};
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const panelReveal = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Panel = styled.div`
  &[hidden] {
    display: none;
  }

  &:not([hidden]) {
    animation: ${panelReveal} 280ms ease-out;
  }

  @media (prefers-reduced-motion: reduce) {
    &:not([hidden]) {
      animation: none;
    }
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

  const cats: Array<{
    key: CategoryKey;
    label: string;
    count: number;
    tone: TabTone;
  }> = [
    { key: 'all', label: 'All', count: total, tone: 'all' },
    {
      key: 'dept',
      label: 'Department',
      count: departmentWinners.length,
      tone: 'dept',
    },
    {
      key: 'values',
      label: 'U-SU Values',
      count: valueWinners.length,
      tone: 'values',
    },
    {
      key: 'staff',
      label: 'Full-Time',
      count: staffWinners.length,
      tone: 'staff',
    },
  ];

  const renderGroup = (
    tone: GroupTone,
    title: string,
    sub: string,
    winners: Awardee[],
    badge: string | ((awardee: Awardee) => string),
  ) => (
    <Group $tone={tone}>
      <GroupHead $tone={tone}>
        <GroupLabel $tone={tone}>{uAwardsGroupStyles[tone].label}</GroupLabel>
        <GroupTitle $tone={tone}>{title}</GroupTitle>
      </GroupHead>
      <GroupSub>{sub}</GroupSub>
      <List $tone={tone}>
        {winners.map((a, i) => (
          <AwardeeCard
            key={a.id}
            awardee={a}
            badge={typeof badge === 'function' ? badge(a) : badge}
            index={i}
            isFirst={i === 0}
          />
        ))}
      </List>
    </Group>
  );

  return (
    <Section id="winners" aria-labelledby="winners-title">
      <Inner>
        <Head>
          <Kicker>2026 Honorees</Kicker>
          <Title id="winners-title">This Year&apos;s Winners</Title>
          <Lede>
            Fourteen members of the U-SU team, both students and full-time
            staff, nominated by their colleagues and selected by committee to be
            recognized for outstanding work, embodying our values, and building
            the culture that makes Cal State LA feel like home.
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
              $tone={c.tone}
              $active={active === c.key}
              onClick={() => setActive(c.key)}
            >
              {c.label}
              <CountBadge $tone={c.tone} $active={active === c.key}>
                {c.count}
              </CountBadge>
            </Tab>
          ))}
        </TabStrip>

        <Panel
          id="winners-panel-all"
          role="tabpanel"
          aria-labelledby="winners-tab-all"
          hidden={active !== 'all'}
        >
          {renderGroup(
            'dept',
            'Student of the Year by Department',
            'One from each U-SU department, nominated by their teams.',
            departmentWinners,
            'Student of the Year',
          )}

          {renderGroup(
            'values',
            'U-SU Values Awards',
            'One student for each of our six core values.',
            valueWinners,
            (awardee) => awardee.value ?? '',
          )}

          {renderGroup(
            'staff',
            'U-SU Values Champions',
            'Two full-time staff members who embody every U-SU value, every day.',
            staffWinners,
            'Full-Time Staff Honoree',
          )}
        </Panel>

        <Panel
          id="winners-panel-dept"
          role="tabpanel"
          aria-labelledby="winners-tab-dept"
          hidden={active !== 'dept'}
        >
          {renderGroup(
            'dept',
            'Student of the Year by Department',
            'One from each U-SU department, nominated by their teams.',
            departmentWinners,
            'Student of the Year',
          )}
        </Panel>

        <Panel
          id="winners-panel-values"
          role="tabpanel"
          aria-labelledby="winners-tab-values"
          hidden={active !== 'values'}
        >
          {renderGroup(
            'values',
            'U-SU Values Awards',
            'One student for each of our six core values.',
            valueWinners,
            (awardee) => awardee.value ?? '',
          )}
        </Panel>

        <Panel
          id="winners-panel-staff"
          role="tabpanel"
          aria-labelledby="winners-tab-staff"
          hidden={active !== 'staff'}
        >
          {renderGroup(
            'staff',
            'Full-Time Staff Honorees',
            'Two staff members who embody every U-SU value, every day.',
            staffWinners,
            'Full-Time Staff Honoree',
          )}
        </Panel>
      </Inner>
    </Section>
  );
};
