import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Colors } from 'theme';

interface UAwardsHeroProps {
  imageSrc?: string;
  imageAlt?: string;
  kicker?: string;
  yearLine?: string;
  title?: string;
  highlight?: string;
  description?: string;
  meta?: Array<{ label: string; value: string }>;
}

const Header = styled.header`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 900px) {
    display: block;
  }
`;

const Media = styled.div<{ $loaded: boolean; $src: string }>`
  width: 100%;
  height: 80vh;
  position: relative;
  overflow: hidden;
  background-color: black;

  &::selection {
    background: transparent;
  }

  > span {
    position: absolute;
    inset: 0;
    background-image: url(${(p) => p.$src});
    background-size: cover;
    background-position: top 30%;
    background-repeat: no-repeat;
    background-attachment: fixed;
    opacity: ${(p) => (p.$loaded ? 1 : 0)};
    transition: opacity 480ms ease;
    will-change: opacity;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.72) 0%,
      rgba(0, 0, 0, 0.66) 50%,
      rgba(0, 0, 0, 0.72) 100%
    );
    z-index: 0;
  }

  @media (max-width: 900px) {
    height: 440px;
    > span {
      background-attachment: scroll;
      background-position: center 18%;
    }

    &::before {
      backdrop-filter: blur(1px);
      -webkit-backdrop-filter: blur(1px);
    }
  }

  @media (max-width: 600px) {
    height: 360px;
    &::before {
      backdrop-filter: blur(1px);
      -webkit-backdrop-filter: blur(1px);
    }
  }
`;

const Strip = styled.div`
  display: none;
`;

const Inner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  width: 100%;

  @media (max-width: 900px) {
    position: relative;
    top: auto;
    left: auto;
    right: auto;
    bottom: auto;
    margin: -88px auto 0;
    padding: 0 16px 24px;
    display: block;
  }
`;

const Card = styled.div`
  position: relative;
  z-index: 2;
  max-width: 840px;
  width: 100%;
  text-align: center;
  background: ${Colors.white};
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.22);
  padding: 40px 48px;

  @media (max-width: 900px) {
    padding: 28px 20px;
    max-width: 680px;
    margin: 0 auto;
  }
`;

const KickerRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const KickerText = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-montserrat, sans-serif);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${Colors.black};

  &::before {
    content: '';
    display: inline-block;
    width: 28px;
    height: 2px;
    background: ${Colors.black};
  }
`;

const YearText = styled.span`
  font-family: var(--font-montserrat, sans-serif);
  font-size: 13px;
  font-weight: 600;
  color: ${Colors.black};
`;

const Title = styled.h1`
  font-family: var(--font-bitter), serif;
  font-weight: 700;
  font-size: clamp(48px, 6.5vw, 84px);
  line-height: 1.02;
  letter-spacing: -0.01em;
  margin: 0 0 24px;
  color: ${Colors.black};
`;

const Accent = styled.span`
  white-space: nowrap;
  background: linear-gradient(
    180deg,
    transparent 65%,
    ${Colors.primary} 65%,
    ${Colors.primary} 92%,
    transparent 92%
  );
  padding: 0 6px;
`;

const Description = styled.p`
  font-family: var(--font-bitter), serif;
  font-size: 18px;
  line-height: 1.6;
  max-width: 620px;
  margin: 0 auto 32px;
  color: ${Colors.greyDarkest};
`;

const Meta = styled.dl`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 24px;
  margin: 0;
  padding-top: 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.2);

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  > div > dt {
    font-family: var(--font-montserrat, sans-serif);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${Colors.greyDark};
    margin-bottom: 4px;
  }

  > div > dd {
    font-size: 16px;
    font-weight: 700;
    color: ${Colors.black};
    margin: 0;
  }
`;

const DEFAULT_META = [
  { label: 'Honorees', value: 'Student & Full-time Staff' },
  { label: 'Hosted by', value: 'U-SU Executive Office' },
];

export const UAwardsHero = ({
  imageSrc = 'https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/u-krew/u-awards.webp',
  imageAlt = 'Four U-Awards recipients on stage holding their plaques.',
  kicker = 'Cal State LA University-Student Union presents',
  yearLine = '',
  title = 'The',
  highlight = 'U-Awards',
  description = 'Our annual celebration recognizing outstanding employees who have gone above and beyond in their dedication and service to the Cal State LA University-Student Union community',
  meta = DEFAULT_META,
}: UAwardsHeroProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);

    const image = new Image();
    image.src = imageSrc;

    if (image.complete) {
      setIsLoaded(true);
      return;
    }

    image.onload = () => setIsLoaded(true);
    image.onerror = () => setIsLoaded(true);

    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, [imageSrc]);

  return (
    <Header>
      <Media
        $loaded={isLoaded}
        $src={imageSrc}
        role="img"
        aria-label={imageAlt}
      >
        <span aria-hidden="true" />
      </Media>
      <Strip aria-hidden="true" />
      <Inner>
        <Card>
          <KickerRow>
            <KickerText>{kicker}</KickerText>
            {yearLine && <YearText>{yearLine}</YearText>}
          </KickerRow>
          <Title>
            {title} <Accent>{highlight}</Accent>
          </Title>
          <Description>{description}</Description>
          <Meta>
            {meta.map((m) => (
              <div key={m.label}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </Meta>
        </Card>
      </Inner>
    </Header>
  );
};
