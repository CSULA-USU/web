import { useCallback, useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { BiPlus } from 'react-icons/bi';
import {
  AnchorNav,
  AutoGrid,
  Button,
  Divider,
  Expandable,
  Eyebrow,
  FluidContainer,
  Image,
  Panel,
  SelectableOption,
  StyledLink,
  Table,
  TapTarget,
  Typography,
  VisuallyHidden,
} from 'components';
import { Page } from 'modules';
import {
  APP_STORE_HREF,
  eligibilityContacts,
  feeFootnotes,
  footerLocations,
  GOOGLE_PLAY_HREF,
  HIGHLIGHT_AFTER_INDEX,
  type MembershipKey,
  membershipTypes,
  paidTracks,
  sampleStatementRows,
  statementSteps,
} from 'modules/RecreationMembership';
import { Colors, FontSizes, Shadows, Spaces, media } from 'theme';
import type { TableData } from 'types';

const MEDIA =
  'https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/departments/recreation';
const STATEMENT_SCREENSHOT =
  '/departments/recreation/membership/billing-statement-student-union-fee.png';

/* One horizontal grid for every section. Load-bearing: the padding lives
   inside the 1440px cap, so a full-bleed band's text lines up with a plain
   one's instead of sitting a gutter's width to its left. */
const SECTION_PADDING = 'clamp(48px, 7vw, 96px) clamp(16px, 5vw, 72px)';
const CONTENT_MAX_WIDTH = '1440px';

const sectionShell = {
  padding: SECTION_PADDING,
  paddingDesktop: SECTION_PADDING,
  paddingMobile: SECTION_PADDING,
  innerMaxWidth: CONTENT_MAX_WIDTH,
  scrollMarginTop: '76px',
} as const;

/* Both ends of every clamp land on real FontSizes steps. */
const DISPLAY_H2 = `clamp(${FontSizes['2xl']}, 5vw, ${FontSizes['5xl']})`;
const SECTION_H2 = `clamp(${FontSizes.xl}, 4vw, ${FontSizes['4xl']})`;
const VERDICT_HEADLINE = `clamp(${FontSizes['2xl']}, 4.4vw, ${FontSizes['4xl']})`;
const HERO_DECK = `clamp(${FontSizes.lg}, 2.6vw, ${FontSizes['2xl']})`;
const STATEMENT_DECK = `clamp(${FontSizes.md}, 2.2vw, ${FontSizes.xl})`;
const CASH_ONLY = `clamp(${FontSizes.md}, 2vw, ${FontSizes.lg})`;

const anchorLinks = [
  { label: 'Find yours & register', href: '#start' },
  { label: 'Memberships', href: '#plans' },
  { label: 'Your billing statement', href: '#statement' },
  { label: 'Fees', href: '#rates' },
];

/* A kicker with a rule running out to the section's edge. */
const RuleHeader = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${Spaces.lg};
  margin-bottom: ${Spaces.md};

  ::after {
    content: '';
    flex: 1 1 auto;
    height: 2px;
    background-color: ${Colors.greyLighter};
  }
`;

const TwoColumn = styled.div<{ $gap?: string; $align?: string }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(320px, 100%), 1fr));
  gap: ${(p) => p.$gap || 'clamp(32px, 4vw, 56px)'};
  align-items: ${(p) => p.$align || 'start'};
  width: 100%;
`;

const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: ${Spaces.lg};
`;

const AnswerColumn = styled.div`
  display: flex;
  align-self: stretch;

  > * {
    flex: 1 1 auto;
  }
`;

/* Every answer is stacked into the same grid cell, so the section reserves the
   height of the longest one from first paint and switching options moves
   nothing below it. */
const AnswerStack = styled.div`
  display: grid;

  > * {
    grid-area: 1 / 1;
  }
`;

/* The answers that are not picked stay in the layout so they keep holding the
   height — visibility rather than display, which also takes them out of the
   a11y tree and the tab order. */
const VerdictCard = styled.div<{ $hidden?: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${Colors.black};
  border-radius: 12px;
  padding: clamp(24px, 3vw, 40px);
  visibility: ${(p) => (p.$hidden ? 'hidden' : 'visible')};
`;

const RegisterBlock = styled.div`
  margin-top: 28px;
  padding-top: 28px;
  border-top: 1px solid ${Colors.greyDark};
`;

const StepList = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0;
  padding-left: ${Spaces.lg};
  color: ${Colors.white};
  font-family: var(--font-bitter), serif;
  font-size: ${FontSizes.md};
  line-height: 1.6;

  a {
    color: ${Colors.primary};
  }
`;

/* Pushes the link to the card's foot so a row of cards ends on one line while
   their headings still top-align. */
const Spacer = styled.div`
  flex: 1 1 auto;
`;

const PlanCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${Spaces.md};
  min-height: 420px;
  padding: 32px;
  border-radius: 16px;
  background-color: ${Colors.white};
  box-shadow: ${Shadows.default};
`;

const PriceBand = styled.div`
  display: flex;
  gap: ${Spaces.lg};
  padding: 20px 0;
  border-top: 2px solid ${Colors.black};
  border-bottom: 1px solid ${Colors.greyLighter};
`;

const NumberedStep = styled.div`
  display: flex;
  gap: ${Spaces.lg};
  align-items: flex-start;
`;

const StepNumeral = styled.span`
  flex: none;
  font-size: ${FontSizes['3xl']};
  font-weight: 800;
  line-height: 0.9;
  color: ${Colors.primary};
`;

const StatementCard = styled.div`
  background-color: ${Colors.white};
  border-radius: 16px;
  padding: clamp(20px, 2.5vw, 32px);
`;

const StatementHeadRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 14px;
  border-bottom: 1px solid ${Colors.greyLighter};
`;

const StatementRow = styled.div<{ $last?: boolean }>`
  display: flex;
  justify-content: space-between;
  gap: ${Spaces.md};
  padding: 13px 14px;
  border-bottom: ${(p) =>
    p.$last ? 'none' : `1px solid ${Colors.greyLightest}`};
`;

/* An outline ring rather than an elevation — the row is being pointed at, not
   lifted off the card. */
const HighlightRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${Spaces.md};
  padding: 18px 14px;
  margin: 6px 0;
  border-radius: 8px;
  background-color: ${Colors.primary};
  box-shadow: 0 0 0 3px ${Colors.black};
`;

const StatementFootnote = styled.div`
  margin-top: ${Spaces.md};
  padding-top: ${Spaces.md};
  border-top: 2px solid ${Colors.black};
`;

const Disclosure = styled.div`
  margin-top: ${Spaces.lg};
  padding: 18px 22px;
  border-radius: 12px;
  border: 1px solid ${Colors.greyDark};
  background-color: rgba(255, 255, 255, 0.06);
`;

const CashOnlyBadge = styled.span`
  display: inline-block;
  align-self: flex-start;
  padding: 14px 22px;
  border-radius: 8px;
  background-color: ${Colors.primary};
  color: ${Colors.black};
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: ${CASH_ONLY};
`;

const StoreBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${Spaces.md};
`;

const HeroButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${Spaces.md};
`;

const Stack = styled.div<{ $gap?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.$gap || Spaces.md};
`;

const FooterVenue = styled.div`
  ${media('mobile')(`
    line-height: 1.5;
  `)}
`;

/* The plan cards' call to action. It is a link because it goes somewhere —
   #start — and a click handler because it also opens the answer for that type
   before the reader arrives. */
const RegisterAnchor = styled.a<{ $tone: 'onLight' | 'onDark' }>`
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  align-self: flex-start;
  font-weight: 700;
  font-size: ${FontSizes.sm};
  text-decoration: none;
  padding-bottom: 2px;
  border-bottom: 2px solid ${Colors.primary};
  color: ${(p) => (p.$tone === 'onDark' ? Colors.primary : Colors.gold)};

  &:hover {
    opacity: 0.7;
  }
`;

const RegisterLink = ({
  onSelect,
  tone = 'onLight',
  label,
}: {
  onSelect: () => void;
  tone?: 'onLight' | 'onDark';
  /** Distinguishes one card's link from the next in a screen reader's list. */
  label: string;
}) => (
  <RegisterAnchor
    href="#start"
    onClick={onSelect}
    $tone={tone}
    aria-label={label}
  >
    Register
  </RegisterAnchor>
);

const FooterEyebrow = ({ children }: { children: React.ReactNode }) => (
  <Typography
    as="p"
    variant="span"
    size="2xs"
    weight="700"
    uppercase
    letterSpacing="0.12em"
    color="primary"
    margin="0"
  >
    {children}
  </Typography>
);

/* Table centers every cell and rules every edge, which is right for a
   schedule and wrong for a price list: here the type column is read down the
   left and the figures are compared down the right. Only the alignment and
   the rules change — the markup, the caption, the row scopes, and the stacked
   mobile cards all stay the component's. */
const FeeTable = styled(Table)`
  /* Keeps the footnotes clear of the rule that closes the last row. */
  margin-bottom: ${Spaces.lg};

  table {
    table-layout: auto;
  }

  th,
  td {
    width: auto;
    border: none;
    border-bottom: 1px solid ${Colors.greyLighter};
    padding: 22px 20px;
    vertical-align: baseline;
  }

  thead th {
    padding: 0 20px 14px;
    border-bottom: 3px solid ${Colors.black};
  }

  /* The column name reads as a micro-label; the term dates beneath it keep
     body type, so the two lines are told apart at a glance. */
  thead th div > span:first-child {
    font-size: ${FontSizes['2xs']};
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  /* Closes the table on the same weight of rule that opens it. */
  tbody tr:last-child th,
  tbody tr:last-child td {
    border-bottom: 3px solid ${Colors.black};
  }

  th:first-child,
  td:first-child {
    padding-left: 0;
  }

  th:last-child,
  td:last-child {
    padding-right: 0;
  }

  th div,
  td div {
    text-align: right;
  }

  th:first-child div,
  td:first-child div {
    text-align: left;
  }
`;

/* "Included" is a word where the other cells hold figures, so it takes the
   gold the footnote markers take rather than reading as another price. */
const renderFee = (value: string | undefined) => {
  const included = value === 'Included';
  return (
    <Typography
      as="span"
      variant="labelTitle"
      size="md"
      weight="700"
      color={included ? 'gold' : 'black'}
      tabularNums={!included}
    >
      {value}
    </Typography>
  );
};

/* Splits the trailing footnote marker off so it can carry its own color. */
const renderTypeName = (value: string | undefined) => {
  const [, name, marker] = /^(.*?)\s*(\*+)?$/.exec(value || '') || [];
  return (
    <Typography as="span" variant="labelTitle" size="md" weight="700">
      {name}
      {marker && (
        <Typography
          as="span"
          variant="span"
          size="md"
          weight="700"
          color="gold"
          inline
        >
          {` ${marker}`}
        </Typography>
      )}
    </Typography>
  );
};

const feeTable: TableData = {
  id: 'recreation-membership-fees',
  ariaLabel: 'Recreation membership fees for fiscal year 2026 to 2027',
  caption:
    'Recreation membership rates by membership type and term, FY 2026–27.',
  headerColors: { backgroundColor: 'white', textColor: 'black' },
  columns: [
    {
      id: 'type',
      label: 'Membership type',
      backgroundColor: 'white',
      textColor: 'black',
      render: (row) => renderTypeName(row.values.type),
      renderRowHeader: (row) => renderTypeName(row.values.type),
    },
    {
      id: 'fall',
      label: 'Fall 2026',
      sublabel: 'Aug 24 – Jan 22',
      backgroundColor: 'white',
      textColor: 'black',
      render: (row) => renderFee(row.values.fall),
    },
    {
      id: 'spring',
      label: 'Spring 2027',
      sublabel: 'Jan 25 – May 22',
      backgroundColor: 'white',
      textColor: 'black',
      render: (row) => renderFee(row.values.spring),
    },
    {
      id: 'summer',
      label: 'Summer 2027',
      sublabel: 'Jun 1 – Aug 11',
      backgroundColor: 'white',
      textColor: 'black',
      render: (row) => renderFee(row.values.summer),
    },
  ],
  rows: [
    {
      id: 'student',
      values: {
        type: 'Student *',
        fall: 'Included',
        spring: 'Included',
        summer: 'Included',
      },
    },
    {
      id: 'next',
      values: {
        type: 'LA NEXT Student *',
        fall: 'Included',
        spring: 'Included',
        summer: 'Included',
      },
    },
    {
      id: 'page',
      values: {
        type: 'PaGE Student **',
        fall: '$75',
        spring: '$75',
        summer: '$45',
      },
    },
    {
      id: 'staff',
      values: {
        type: 'Faculty/Staff',
        fall: '$100',
        spring: '$100',
        summer: '$60',
      },
    },
    {
      id: 'scholar',
      values: {
        type: 'Visiting Scholar',
        fall: '$75',
        spring: '$75',
        summer: '$45',
      },
    },
  ],
};

export default function RecreationMembership() {
  /* Opens on the answer most readers need: the enrolled student who already
     has a membership. One option is always active — there is no cleared
     state — so the section never renders without an answer beside it. */
  const [picked, setPicked] = useState<MembershipKey>('student');

  const pick = useCallback((key: MembershipKey) => {
    setPicked(key);
  }, []);

  return (
    <Page>
      <Head>
        <title>Recreation Membership | Cal State LA U&ndash;SU</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Most Cal State LA students already have a Recreation membership through the Student Union campus fee. Find your membership type, check your billing statement, and see FY 2026-27 rates."
          key="description"
        />
        <meta name="author" content="Recreation" key="author" />
        <meta
          property="og:title"
          content="Recreation Membership | Cal State LA University-Student Union"
          key="og-title"
        />
        <meta
          property="og:description"
          content="Do you already have a Recreation membership? Most Golden Eagles do — it is paid through the Student Union campus fee."
          key="og-desc"
        />
        <meta
          property="og:url"
          content="https://www.calstatelausu.org/recreation/membership"
          key="og-url"
        />
        <meta property="og:type" content="website" key="og-type" />
        <meta
          property="og:image"
          content={`${MEDIA}/rec-floor-tablet.webp`}
          key="og-image"
        />
        <meta
          property="og:image:alt"
          content="Students exercising at the Cal State LA Recreation Fitness Center"
          key="og-image-alt"
        />
        <meta
          name="twitter:card"
          content="summary_large_image"
          key="twitter-card"
        />
        <link
          rel="canonical"
          href="https://www.calstatelausu.org/recreation/membership"
        />
      </Head>

      <AnchorNav
        links={anchorLinks}
        tone="dark"
        contentMaxWidth={CONTENT_MAX_WIDTH}
      />

      <FluidContainer
        backgroundImage={`${MEDIA}/Rec-Hero.webp`}
        backgroundScrim="linear-gradient(to top, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0.55) 50%, rgba(0, 0, 0, 0.25) 100%)"
        backgroundPosition="20% center"
        padding="clamp(96px, 9vw, 132px) clamp(16px, 5vw, 72px) clamp(36px, 5vw, 64px)"
        paddingDesktop="clamp(96px, 9vw, 132px) clamp(16px, 5vw, 72px) clamp(36px, 5vw, 64px)"
        paddingMobile="clamp(96px, 9vw, 132px) clamp(16px, 5vw, 72px) clamp(36px, 5vw, 64px)"
        innerMaxWidth={CONTENT_MAX_WIDTH}
        innerMinHeight="480px"
        outerAlignItems="flex-end"
        flex
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="flex-end"
        gap={Spaces.md}
      >
        <Eyebrow color="primary" accentColor="primary">
          U&ndash;SU Recreation
        </Eyebrow>
        <Typography
          as="h1"
          variant="title"
          weight="800"
          uppercase
          fluidSize={`clamp(${FontSizes['4xl']}, 10vw, ${FontSizes['6xl']})`}
          lineHeight="0.92"
          letterSpacing="-0.02em"
          color="white"
          margin="0"
        >
          Membership
        </Typography>
        <Typography
          as="p"
          variant="copy"
          weight="300"
          fluidSize={HERO_DECK}
          lineHeight="1.3"
          color="white"
          margin="0"
          style={{ maxWidth: '780px' }}
        >
          Most Golden Eagles already have one. It is paid through your
          &ldquo;Student Union&rdquo; campus fee.
        </Typography>
        <HeroButtons>
          <Button href="#statement" variant="primary" shadow>
            Check if you already have it
          </Button>
          <Button href="#plans" variant="whiteOutline">
            See all memberships
          </Button>
        </HeroButtons>
      </FluidContainer>

      <FluidContainer id="start" backgroundColor="primary" {...sectionShell}>
        <TwoColumn $gap="clamp(32px, 5vw, 72px)" $align="stretch">
          <div>
            <Eyebrow color="black" accentColor="black">
              Start here
            </Eyebrow>
            <Typography
              as="h2"
              variant="title"
              weight="800"
              fluidSize={DISPLAY_H2}
              lineHeight="1"
              color="black"
              margin={`${Spaces.sm} 0 ${Spaces.md}`}
            >
              Find Your Eligibility Below
            </Typography>
            <Typography
              as="p"
              variant="copy"
              size="md"
              color="black"
              margin="0"
              style={{ maxWidth: '460px' }}
            >
              Pick one to see your rate and every step to register. Have your
              Cal State LA user ID, CIN number, and password ready.
            </Typography>
            <OptionList>
              {membershipTypes.map((type) => (
                <SelectableOption
                  key={type.key}
                  title={type.optionTitle}
                  subtitle={type.optionSubtitle}
                  selected={picked === type.key}
                  onSelect={() => pick(type.key)}
                  controls="membership-answer"
                />
              ))}
            </OptionList>
          </div>

          <AnswerColumn>
            <AnswerStack id="membership-answer">
              {membershipTypes.map((answer) => (
                <VerdictCard key={answer.key} $hidden={answer.key !== picked}>
                  <Typography
                    as="p"
                    variant="labelTitleSmall"
                    size="xs"
                    weight="700"
                    uppercase
                    letterSpacing="0.12em"
                    color="primary"
                    margin="0"
                  >
                    {answer.name}
                  </Typography>
                  <Typography
                    as="p"
                    variant="title"
                    weight="800"
                    fluidSize={VERDICT_HEADLINE}
                    lineHeight="1"
                    color="white"
                    margin={`${Spaces.sm} 0`}
                  >
                    {answer.headline}
                  </Typography>
                  <Typography
                    as="p"
                    variant="copy"
                    size="sm"
                    color="primary"
                    margin={`0 0 ${Spaces.md}`}
                  >
                    {answer.priceNote}
                  </Typography>
                  <Typography
                    as="p"
                    variant="copy"
                    size="md"
                    lineHeight="1.6"
                    color="white"
                    margin="0"
                    style={{ maxWidth: '560px' }}
                  >
                    {answer.verdict}
                  </Typography>

                  <RegisterBlock>
                    <Typography
                      as="p"
                      variant="labelTitleSmall"
                      size="xs"
                      weight="700"
                      uppercase
                      letterSpacing="0.16em"
                      color="primary"
                      margin={`0 0 ${Spaces.lg}`}
                    >
                      How to register
                    </Typography>
                    <Typography
                      as="p"
                      variant="copy"
                      size="md"
                      lineHeight="1.6"
                      color="white"
                      margin={`0 0 ${Spaces.md}`}
                    >
                      {answer.registerIntro}
                    </Typography>
                    <StepList>
                      {answer.steps.map((step, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <li key={index}>{step}</li>
                      ))}
                    </StepList>
                    {answer.notes.map((note) => (
                      <Typography
                        key={note}
                        as="p"
                        variant="copy"
                        size="md"
                        lineHeight="1.6"
                        color="white"
                        margin={`${Spaces.md} 0 0`}
                      >
                        {note}
                      </Typography>
                    ))}
                  </RegisterBlock>

                  <Button
                    href="#statement"
                    variant="primary"
                    padding="16px 32px"
                    margin={`${Spaces.lg} auto 0 0`}
                  >
                    Check my statement
                  </Button>
                </VerdictCard>
              ))}
            </AnswerStack>
          </AnswerColumn>
        </TwoColumn>
      </FluidContainer>

      <FluidContainer id="plans" backgroundColor="white" {...sectionShell}>
        <RuleHeader>
          <Typography
            as="span"
            variant="span"
            size="xs"
            weight="700"
            uppercase
            letterSpacing="0.16em"
            color="gold"
          >
            Memberships
          </Typography>
        </RuleHeader>
        <Typography
          as="h2"
          variant="title"
          weight="800"
          fluidSize={SECTION_H2}
          lineHeight="1.05"
          margin={`0 0 ${Spaces.md}`}
        >
          Purchase by Term
        </Typography>
        <Typography
          as="p"
          variant="copy"
          size="md"
          margin={`0 0 ${Spaces.lg}`}
          style={{ maxWidth: '640px' }}
        >
          These groups do not pay the &ldquo;Student Union&rdquo; campus fee, so
          a term membership is required to use the Recreation Fitness Center,
          programs, and services.
        </Typography>
        <AutoGrid minColumnWidth="300px" gap={Spaces.lg}>
          {paidTracks.map((track) => (
            <PlanCard key={track.name}>
              <Typography
                as="h3"
                variant="title"
                weight="800"
                size="xl"
                margin="0"
              >
                {track.name}
              </Typography>
              <PriceBand>
                <div>
                  <Typography
                    as="p"
                    variant="title"
                    weight="800"
                    size="2xl"
                    tabularNums
                    margin="0"
                  >
                    {track.termPrice}
                  </Typography>
                  <Typography
                    as="p"
                    variant="span"
                    size="2xs"
                    weight="700"
                    uppercase
                    letterSpacing="0.1em"
                    color="greyDark"
                    margin={`${Spaces.xs} 0 0`}
                  >
                    Fall or Spring
                  </Typography>
                </div>
                <div>
                  <Typography
                    as="p"
                    variant="title"
                    weight="800"
                    size="2xl"
                    color="greyDark"
                    tabularNums
                    margin="0"
                  >
                    {track.summerPrice}
                  </Typography>
                  <Typography
                    as="p"
                    variant="span"
                    size="2xs"
                    weight="700"
                    uppercase
                    letterSpacing="0.1em"
                    color="greyDark"
                    margin={`${Spaces.xs} 0 0`}
                  >
                    Summer
                  </Typography>
                </div>
              </PriceBand>
              <Typography
                as="p"
                variant="copy"
                size="sm"
                lineHeight="1.6"
                margin="0"
              >
                {track.body}
              </Typography>
              <Spacer />
              <RegisterLink
                onSelect={() => pick(track.pickerKey)}
                label={`Register as ${track.name}`}
              />
            </PlanCard>
          ))}
        </AutoGrid>
      </FluidContainer>

      <FluidContainer
        id="statement"
        backgroundColor="greyDarkest"
        {...sectionShell}
      >
        <TwoColumn>
          <Stack $gap="30px">
            <div
              style={{
                maxWidth: '780px',
                marginBottom: 'clamp(36px, 5vw, 64px)',
              }}
            >
              <Eyebrow color="primary" accentColor="primary">
                Your billing statement
              </Eyebrow>
              <Typography
                as="h2"
                variant="title"
                weight="800"
                fluidSize={DISPLAY_H2}
                lineHeight="1"
                color="white"
                margin={`${Spaces.sm} 0 ${Spaces.md}`}
              >
                Look for Fee
              </Typography>
              <Typography
                as="p"
                variant="copy"
                weight="300"
                fluidSize={STATEMENT_DECK}
                lineHeight="1.4"
                color="white"
                margin="0"
              >
                If{' '}
                <Typography
                  as="span"
                  variant="span"
                  weight="700"
                  color="primary"
                  inline
                  fluidSize={STATEMENT_DECK}
                >
                  Student Union
                </Typography>{' '}
                appears in your Invoice Items, your Recreation membership is
                paid. Do not buy anything.
              </Typography>
            </div>
            {statementSteps.map((step, index) => (
              <NumberedStep key={step.id}>
                <StepNumeral aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </StepNumeral>
                <Typography
                  as="p"
                  variant="copy"
                  size="md"
                  lineHeight="1.6"
                  color="white"
                  margin="0"
                >
                  {step.body}
                </Typography>
              </NumberedStep>
            ))}
            <div
              style={{
                borderTop: `1px solid ${Colors.greyDark}`,
                paddingTop: '28px',
              }}
            >
              <Typography
                as="p"
                variant="copy"
                size="sm"
                lineHeight="1.6"
                color="greyLighter"
                margin={`0 0 ${Spaces.md}`}
              >
                Still unsure? Any Recreation front desk can confirm your
                eligibility on the spot.
              </Typography>
              <Button href="#start" variant="primary" padding="18px 36px">
                Register now
              </Button>
            </div>
          </Stack>

          <div>
            <StatementCard>
              <Typography
                as="p"
                variant="labelTitle"
                size="md"
                weight="700"
                margin="0"
              >
                Invoice Items
              </Typography>
              <Typography
                as="p"
                variant="copy"
                size="xs"
                color="greyDark"
                margin={`${Spaces.xs} 0 ${Spaces.md}`}
              >
                Sample statement &mdash; Spring 26
              </Typography>
              <StatementHeadRow>
                <Typography
                  as="span"
                  variant="span"
                  size="2xs"
                  weight="700"
                  uppercase
                  letterSpacing="0.08em"
                  color="greyDark"
                >
                  Item
                </Typography>
                <Typography
                  as="span"
                  variant="span"
                  size="2xs"
                  weight="700"
                  uppercase
                  letterSpacing="0.08em"
                  color="greyDark"
                >
                  Amount
                </Typography>
              </StatementHeadRow>
              {sampleStatementRows.map((row, index) => (
                <div key={row.item}>
                  <StatementRow
                    $last={index === sampleStatementRows.length - 1}
                  >
                    <Typography
                      as="span"
                      variant="span"
                      size="xs"
                      color="greyDark"
                    >
                      {row.item}
                    </Typography>
                    <Typography
                      as="span"
                      variant="span"
                      size="xs"
                      color="greyDark"
                      tabularNums
                    >
                      {row.amount}
                    </Typography>
                  </StatementRow>
                  {index === HIGHLIGHT_AFTER_INDEX && (
                    <HighlightRow>
                      <Typography
                        as="span"
                        variant="labelTitle"
                        size="md"
                        weight="700"
                        color="black"
                      >
                        Student Union Spring (Charge)
                      </Typography>
                      <Typography
                        as="span"
                        variant="labelTitle"
                        size="md"
                        weight="700"
                        color="black"
                        tabularNums
                      >
                        137.25
                      </Typography>
                    </HighlightRow>
                  )}
                </div>
              ))}
              <StatementFootnote>
                <Typography
                  as="p"
                  variant="copy"
                  size="xs"
                  lineHeight="1.6"
                  margin="0"
                >
                  <Typography
                    as="span"
                    variant="span"
                    size="xs"
                    weight="700"
                    inline
                  >
                    That highlighted row is the one.
                  </Typography>{' '}
                  Your amount and term will differ from this example.
                </Typography>
              </StatementFootnote>
            </StatementCard>

            <Disclosure>
              <Expandable
                indicator={<BiPlus size={24} color={Colors.primary} />}
                indicatorRotation="45deg"
                header={
                  <Typography
                    as="span"
                    variant="labelTitleSmall"
                    size="xs"
                    weight="700"
                    color="white"
                  >
                    See it on a real statement
                  </Typography>
                }
              >
                <Image
                  src={STATEMENT_SCREENSHOT}
                  alt="A university billing statement's Invoice Items table, with the Student Union Spring charge of 137.25 outlined in red."
                  width="100%"
                  margin={`${Spaces.md} 0 0`}
                  borderRadius="8px"
                />
              </Expandable>
            </Disclosure>
          </div>
        </TwoColumn>
      </FluidContainer>

      <FluidContainer id="rates" backgroundColor="white" {...sectionShell}>
        <RuleHeader>
          <Typography
            as="span"
            variant="span"
            size="xs"
            weight="700"
            uppercase
            letterSpacing="0.16em"
            color="gold"
          >
            FY 2026&ndash;27
          </Typography>
        </RuleHeader>
        <Typography
          as="h2"
          variant="title"
          weight="800"
          fluidSize={SECTION_H2}
          lineHeight="1.05"
          margin={`0 0 ${Spaces.lg}`}
        >
          Every Rate
        </Typography>
        <FeeTable data={feeTable} />
        <Stack $gap="12px">
          {feeFootnotes.map((note) => (
            <Typography
              key={note}
              as="p"
              variant="copy"
              size="xs"
              lineHeight="1.6"
              color="greyDark"
              margin="0"
              style={{ maxWidth: '860px' }}
            >
              {note}
            </Typography>
          ))}
        </Stack>
      </FluidContainer>

      <FluidContainer
        backgroundImage={`${MEDIA}/rec-treadmill-tablet.webp`}
        backgroundScrim="linear-gradient(to right, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0.8) 55%, rgba(0, 0, 0, 0.45) 100%)"
        backgroundPosition="50% 35%"
        {...sectionShell}
      >
        <TwoColumn $align="center">
          <Stack>
            <Eyebrow color="primary" accentColor="primary">
              Buying a membership
            </Eyebrow>
            <Typography
              as="h2"
              variant="title"
              weight="800"
              fluidSize={SECTION_H2}
              lineHeight="1.05"
              color="white"
              margin="0"
            >
              U&ndash;SU Room 306
            </Typography>
            <Typography
              as="p"
              variant="copy"
              size="md"
              lineHeight="1.6"
              color="white"
              margin="0"
            >
              Memberships can be purchased on the 3rd floor of the U&ndash;SU in
              room 306 from 8 AM to 4:30 PM. Bring your receipt to any
              Recreation facility to add a membership to your profile.
            </Typography>
            <CashOnlyBadge>Reminder: Cash only!</CashOnlyBadge>
          </Stack>

          <Panel
            backgroundColor="white"
            borderRadius="16px"
            padding="clamp(28px, 3vw, 40px)"
          >
            <div style={{ textAlign: 'center' }}>
              <Typography
                as="h3"
                variant="title"
                weight="800"
                size="lg"
                margin={`0 0 ${Spaces.md}`}
              >
                Get the App First
              </Typography>
              <Typography
                as="p"
                variant="copy"
                size="md"
                lineHeight="1.6"
                margin={`0 auto ${Spaces.lg}`}
                style={{ maxWidth: '46ch' }}
              >
                Every membership runs through the Cal State LA Campus Rec app:
                sign the facility access waiver, finish registration, then scan
                your barcode ID at the door.
              </Typography>
              <StoreBadges>
                <StyledLink href={APP_STORE_HREF}>
                  <Image
                    src={`${MEDIA}/App_Store_Badge.webp`}
                    alt="Download on the App Store"
                    width={158}
                  />
                </StyledLink>
                <StyledLink href={GOOGLE_PLAY_HREF}>
                  <Image
                    src={`${MEDIA}/Google_Play_Store_badge.webp`}
                    alt="Get it on Google Play"
                    width={158}
                  />
                </StyledLink>
              </StoreBadges>
            </div>
          </Panel>
        </TwoColumn>
      </FluidContainer>

      <FluidContainer
        backgroundColor="greyDarkest"
        padding="clamp(36px, 5vw, 72px) clamp(16px, 5vw, 72px)"
        paddingDesktop="clamp(36px, 5vw, 72px) clamp(16px, 5vw, 72px)"
        paddingMobile="clamp(36px, 5vw, 72px) clamp(16px, 5vw, 72px)"
        innerMaxWidth={CONTENT_MAX_WIDTH}
      >
        <VisuallyHidden as="h2">Recreation membership contacts</VisuallyHidden>
        <AutoGrid minColumnWidth="260px" gap="32px" alignItems="flex-start">
          <Stack>
            <FooterEyebrow>Eligibility questions</FooterEyebrow>
            {eligibilityContacts.map((contact) => (
              <div key={contact.email} style={{ marginBottom: '14px' }}>
                <Typography
                  as="p"
                  variant="copy"
                  size="md"
                  weight="600"
                  color="white"
                  margin="0"
                >
                  {contact.name}
                </Typography>
                <Typography
                  as="p"
                  variant="copy"
                  size="md"
                  color="white"
                  margin="0"
                >
                  {contact.role}
                </Typography>
                <Typography
                  as="p"
                  variant="copy"
                  size="md"
                  color="primary"
                  margin="0"
                >
                  <TapTarget>
                    <StyledLink href={`mailto:${contact.email}`}>
                      {contact.email}
                    </StyledLink>
                  </TapTarget>
                </Typography>
              </div>
            ))}
          </Stack>

          <Stack>
            <FooterEyebrow>Location</FooterEyebrow>
            <Stack $gap={Spaces.md}>
              {footerLocations.map((venue) => (
                <FooterVenue key={venue.name}>
                  <Typography
                    as="p"
                    variant="copy"
                    size="md"
                    weight="600"
                    color="white"
                    margin="0"
                  >
                    {venue.name}
                  </Typography>
                  <Typography
                    as="p"
                    variant="copy"
                    size="md"
                    color="white"
                    margin="0"
                  >
                    {venue.building}
                  </Typography>
                  <Typography
                    as="p"
                    variant="copy"
                    size="md"
                    color="white"
                    margin="0"
                  >
                    {venue.phone}
                  </Typography>
                </FooterVenue>
              ))}
            </Stack>
          </Stack>

          <Stack>
            <FooterEyebrow>Purchase memberships</FooterEyebrow>
            <Typography
              as="p"
              variant="copy"
              size="md"
              lineHeight="1.6"
              color="white"
              margin="0"
            >
              U&ndash;SU room 306, 3rd floor
              <br />8 AM to 4:30 PM &middot; cash only
            </Typography>
          </Stack>
        </AutoGrid>
        <Divider
          color="greyLighter"
          size="1px"
          margin="clamp(36px, 5vw, 72px) 0"
        />
      </FluidContainer>
    </Page>
  );
}
