import styled from 'styled-components';
import { Colors } from 'theme';
import { Image } from 'components';
import type { ValueDef } from 'types';

interface UAwardsValuesProps {
  values: ValueDef[];
}

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
  max-width: 720px;
  margin: 0 auto 48px;
  text-align: center;
`;

const Kicker = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-family: var(--font-montserrat, sans-serif);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${Colors.gold};
  margin-bottom: 16px;

  &::before,
  &::after {
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
  background: ${Colors.greyLightest};
  border-radius: 16px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: background 0.2s ease-in-out, transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;

  &:hover {
    background: ${Colors.white};
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
  }
`;

const IconBlock = styled.div`
  height: 140px;
  background: ${Colors.white};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease-in-out;

  ${Card}:hover & {
    background: ${Colors.greyLightest};
  }
`;

const TitleRow = styled.h3`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  font-family: var(--font-bitter), serif;
  font-weight: 700;
  font-size: 26px;
  color: ${Colors.black};
`;

const Num = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${Colors.white};
  border: 1px solid ${Colors.greyLighter};
  border-radius: 999px;
  padding: 4px 10px;
  font-family: var(--font-montserrat, sans-serif);
  font-size: 13px;
  font-weight: 800;
  color: ${Colors.gold};
  transition: background 0.2s ease-in-out, border-color 0.2s ease-in-out;

  ${Card}:hover & {
    background: ${Colors.primary};
    border-color: ${Colors.primary};
    color: ${Colors.black};
  }
`;

const Body = styled.p`
  font-family: var(--font-bitter), serif;
  font-size: 15px;
  line-height: 1.6;
  margin: 0;
  color: ${Colors.greyDarkest};
`;

const Why = styled.p`
  font-family: var(--font-montserrat, sans-serif);
  font-size: 13px;
  font-weight: 600;
  line-height: 1.55;
  color: ${Colors.greyDark};
  border-top: 1px solid ${Colors.greyLighter};
  padding-top: 14px;
  margin: auto 0 0;
`;

export const UAwardsValues = ({ values }: UAwardsValuesProps) => {
  return (
    <Section id="values" aria-labelledby="values-title">
      <Inner>
        <Head>
          <Kicker>Our Six Core Values</Kicker>
          <Title id="values-title">Our Compass</Title>
          <Lede>
            These six values guide who we hire, how we work, and who we
            celebrate. Every honoree was nominated because they embody at least
            one of them&mdash;usually more.
          </Lede>
        </Head>
        <Grid>
          {values.map((v, i) => (
            <Card key={v.key}>
              <IconBlock>
                <Image src={v.iconSrc} alt="" width="110" height="110" lazy />
              </IconBlock>
              <TitleRow>
                <Num>{String(i + 1).padStart(2, '0')}</Num>
                <span>{v.title}</span>
              </TitleRow>
              <Body>{v.body}</Body>
              <Why>{v.why}</Why>
            </Card>
          ))}
        </Grid>
      </Inner>
    </Section>
  );
};
