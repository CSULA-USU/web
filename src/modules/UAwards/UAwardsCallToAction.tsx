import styled from 'styled-components';
import { BiUserPlus, BiMessageDetail } from 'react-icons/bi';
import { Button } from 'components';
import { Colors } from 'theme';

interface UAwardsCTACard {
  icon: 'userPlus' | 'message';
  title: string;
  body: string;
  buttonText: string;
  buttonHref: string;
  buttonVariant?: 'primary' | 'whiteOutline';
}

interface UAwardsCallToActionProps {
  kicker?: string;
  title?: string;
  highlight?: string;
  lede?: string;
  cards?: UAwardsCTACard[];
}

const Section = styled.section`
  position: relative;
  background: ${Colors.greyDarkest};
  padding: 96px 36px;
  overflow: hidden;
  color: ${Colors.white};

  @media (max-width: 900px) {
    padding: 72px 24px;
  }

  @media (max-width: 600px) {
    padding: 64px 16px;
  }
`;

const Decoration = styled.div`
  position: absolute;
  top: -120px;
  right: -80px;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: ${Colors.primary};
  opacity: 0.08;
  pointer-events: none;
`;

const Inner = styled.div`
  position: relative;
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
  color: ${Colors.primary};
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
  font-size: clamp(36px, 4.5vw, 54px);
  line-height: 1.1;
  margin: 0 0 16px;
  color: ${Colors.white};
`;

const Highlight = styled.span`
  color: ${Colors.primary};
`;

const Lede = styled.p`
  font-family: var(--font-bitter), serif;
  font-size: 18px;
  line-height: 1.6;
  margin: 0;
  color: ${Colors.greyLighter};
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: background 0.2s ease-in-out, border-color 0.2s ease-in-out;

  &:hover {
    background: rgba(255, 206, 4, 0.08);
    border-color: ${Colors.primary};
  }
`;

const IconBox = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: ${Colors.primary};
  color: ${Colors.black};
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const CardTitle = styled.h3`
  font-family: var(--font-bitter), serif;
  font-weight: 700;
  font-size: 26px;
  line-height: 1.2;
  margin: 0;
  color: ${Colors.white};
`;

const CardBody = styled.p`
  font-family: var(--font-bitter), serif;
  font-size: 15px;
  line-height: 1.6;
  margin: 0;
  color: ${Colors.greyLighter};
`;

const ButtonRow = styled.div`
  margin-top: 8px;
`;

const ICON_MAP = {
  userPlus: BiUserPlus,
  message: BiMessageDetail,
} as const;

const DEFAULT_CARDS: UAwardsCTACard[] = [
  {
    icon: 'userPlus',
    title: 'Join the U-Krew',
    body: 'Browse open student/staff roles across Graffix, CSI, CCC, Operations, Recreation, and Admin. The U-Krew is how thousands of Golden Eagles built their first résumé.',
    buttonText: 'View Opportunities',
    buttonHref: '/employment',
    buttonVariant: 'primary',
  },
  {
    icon: 'message',
    title: 'Send some kudos',
    body: 'Know a U-SU teammate who deserves a shout-out? Drop their name in our feedback form and tell us why they deserve it. Many nominations start exactly this way.',
    buttonText: 'Offer Kudos',
    buttonHref: '/contact',
    buttonVariant: 'whiteOutline',
  },
];

export const UAwardsCallToAction = ({
  kicker = 'Get Involved',
  title = 'Become part of',
  highlight = 'the team we celebrate',
  lede = 'Everyone on this page started as a student or staff member who simply applied. The next cohort is being built right now and there is more than one way to be part of it.',
  cards = DEFAULT_CARDS,
}: UAwardsCallToActionProps) => {
  return (
    <Section id="join" aria-labelledby="cta-title">
      <Decoration aria-hidden="true" />
      <Inner>
        <Head>
          <Kicker>{kicker}</Kicker>
          <Title id="cta-title">
            {title}
            <br /> <Highlight>{highlight}</Highlight>
          </Title>
          <Lede>{lede}</Lede>
        </Head>
        <Cards>
          {cards.map((c) => {
            const Icon = ICON_MAP[c.icon];
            return (
              <Card key={c.title}>
                <IconBox aria-hidden="true">
                  <Icon size={28} />
                </IconBox>
                <CardTitle>{c.title}</CardTitle>
                <CardBody>{c.body}</CardBody>
                <ButtonRow>
                  <Button
                    href={c.buttonHref}
                    variant={c.buttonVariant ?? 'primary'}
                  >
                    {c.buttonText}
                  </Button>
                </ButtonRow>
              </Card>
            );
          })}
        </Cards>
      </Inner>
    </Section>
  );
};
