import styled, { keyframes } from 'styled-components';
import { Colors, Spaces, media } from 'theme';

// Hero

export const HeroContentWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  padding: ${Spaces['2xl']};
  ${media('desktop')(`padding: ${Spaces.xl};`)}
  ${media('mobile')(`padding: ${Spaces.md} ${Spaces.md} ${Spaces.xl};`)}
`;

export const HeroTextGroup = styled.div`
  max-width: 720px;
`;

export const AccentBar = styled.div`
  width: 48px;
  height: 3px;
  background: ${Colors.primary};
  margin-bottom: 16px;
`;

export const HeroEyebrow = styled.p`
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${Colors.primary};
  margin: 0 0 10px;
`;

export const HeroSubtext = styled.div`
  margin-top: 18px;
  max-width: 640px;
`;

export const HeroButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 28px;
  flex-wrap: wrap;
`;

// Stat bar

export const StatBar = styled.div`
  background: ${Colors.black};
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  ${media('tablet')(`grid-template-columns: repeat(2, 1fr);`)}
  ${media('mobile')(`grid-template-columns: 1fr;`)}
`;

export const StatCell = styled.div`
  padding: 36px 28px;
  background: ${Colors.black};
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;

  & + & {
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 24px;
      bottom: 24px;
      width: 1px;
      background: ${Colors.greyDarker};
      ${media('mobile')(`display: none;`)}
    }
  }
`;

export const StatLabel = styled.p`
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: ${Colors.greyLighter};
  margin: 0;
`;

export const StatNote = styled.p`
  font-size: 13px;
  color: ${Colors.greyLighter};
  opacity: 0.85;
  margin: 0;
`;

// Section head (shared)

export const SectionHead = styled.div`
  max-width: 720px;
  margin: 0 auto 48px;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

export const SectionKicker = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
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

// Outcomes

export const OutcomesGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${Spaces.xl};
  ${media('tablet')(`grid-template-columns: 1fr;`)}
`;

export const OutcomeItem = styled.div`
  padding: 28px;
  border-left: 5px solid ${Colors.primary};
`;

export const OutcomeLabel = styled.p`
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${Colors.gold};
  margin: 8px 0;
`;

// Team section

export const StaffGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${Spaces.lg};
  margin-bottom: ${Spaces['2xl']};
  ${media('tablet')(`grid-template-columns: 1fr;`)}
`;

export const MemberGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  ${media('tablet')(`grid-template-columns: repeat(2, 1fr);`)}
  ${media('mobile')(`grid-template-columns: 1fr;`)}
`;

// Built With section

export const BuiltWithGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${Spaces['2xl']};
  max-width: 1440px;
  margin: 0 auto;
  ${media('tablet')(`grid-template-columns: 1fr;`)}
`;

export const BuiltWithLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BuiltWithRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const StatCard = styled.div`
  background: ${Colors.greyDarker};
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StatCardTopRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;

export const StatCardKicker = styled.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${Colors.primary};
`;

export const StatCardTitle = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: ${Colors.white};
  margin: 0;
`;

export const GaugeRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: flex-start;
`;

export const GaugeItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

export const GaugeLabel = styled.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${Colors.greyLighter};
  opacity: 0.7;
`;

export const BoxRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  flex-wrap: wrap;
`;

export const AccessBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex: 1;
  min-width: 60px;
`;

export const AccessBoxNum = styled.span`
  font-size: 32px;
  font-weight: 700;
  line-height: 1;
`;

export const AccessBoxLabel = styled.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${Colors.greyLighter};
  opacity: 0.7;
`;

export const BuiltWithKicker = styled.span`
  display: inline-block;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${Colors.primary};
  margin-bottom: 14px;
`;

export const TechPills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: ${Spaces.lg};
`;

export const TechPill = styled.span`
  padding: 10px 16px;
  background: ${Colors.greyDarker};
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  color: ${Colors.greyLighter};
`;

// What We Look For section

export const TraitCard = styled.article`
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

export const TraitsSection = styled.section`
  background: ${Colors.white};
  padding: 96px 72px;
  ${media('desktop')(`padding: 64px 36px;`)}
  ${media('mobile')(`padding: 48px 18px;`)}
`;

export const TraitsInner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

export const TraitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  ${media('tablet')(`grid-template-columns: repeat(2, 1fr);`)}
  ${media('mobile')(`grid-template-columns: 1fr;`)}
`;

export const TraitTitleRow = styled.h3`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  font-family: var(--font-bitter), serif;
  font-weight: 700;
  font-size: 26px;
  color: ${Colors.black};
`;

export const TraitIconBlock = styled.div`
  height: 120px;
  background: ${Colors.white};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;

  ${TraitCard}:hover & {
    background: ${Colors.greyLightest};
  }
`;

export const TraitNum = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${Colors.white};
  border: 1px solid ${Colors.greyLighter};
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 13px;
  font-weight: 800;
  color: ${Colors.gold};
  flex-shrink: 0;
  transition: background 0.2s ease-in-out, border-color 0.2s ease-in-out;

  ${TraitCard}:hover & {
    background: ${Colors.primary};
    border-color: ${Colors.primary};
    color: ${Colors.black};
  }
`;

export const TraitWhy = styled.p`
  font-size: 13px;
  font-weight: 600;
  line-height: 1.55;
  color: ${Colors.greyDark};
  border-top: 1px solid ${Colors.greyLighter};
  padding-top: 14px;
  margin: auto 0 0;
`;

// Alumni section

export const AlumniGrid = styled(MemberGrid)`
  opacity: 0.85;
`;

// Marquee

const marqueeScroll = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(-25%); }
`;

export const InlineMarqueeOuter = styled.div`
  overflow: hidden;
  width: 100%;
  margin: ${Spaces.xl} 0;
`;

export const InlineMarqueeTrack = styled.div`
  display: flex;
  width: fit-content;
  min-width: 200%;
  animation: ${marqueeScroll} 20s linear infinite;
  will-change: transform;
`;

export const MarqueeLogo = styled.img`
  height: 100px;
  width: auto;
  flex-shrink: 0;
  margin: 0 40px;
  object-fit: contain;
`;

// Games section

export const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;
  ${media('tablet')(`grid-template-columns: repeat(2, 1fr);`)}
  ${media('mobile')(`grid-template-columns: 1fr;`)}
`;

export const GameCard = styled.article`
  border-radius: 12px;
  overflow: hidden;
  background: ${Colors.greyLightest};
  display: flex;
  flex-direction: column;
`;

export const GameThumbnail = styled.div<{ gradient: string }>`
  height: 200px;
  border-radius: 12px 12px 0 0;
  background: ${({ gradient }) => gradient};
  position: relative;
`;

export const GamePlayBtn = styled.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${Colors.primary};
  color: ${Colors.black};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  line-height: 1;
  user-select: none;
`;

export const GameBody = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const GameTitle = styled.p`
  font-weight: 700;
  font-size: 18px;
  color: ${Colors.black};
  margin: 0;
`;

export const GameLink = styled.a`
  font-size: 14px;
  font-weight: 700;
  color: ${Colors.gold};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

// Join CTA section

export const JoinCtaSection = styled.section`
  background: ${Colors.greyDarkest};
  padding: 72px;
  ${media('mobile')(`padding: 48px 24px;`)}
`;

export const JoinCtaInner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 32px;
`;

export const JoinCtaLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 600px;
`;

export const JoinCtaButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  flex-wrap: wrap;
`;
