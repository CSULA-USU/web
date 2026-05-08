import styled from 'styled-components';
import { Colors } from 'theme';
import { Typography } from '../Typography';
import { PortraitPlaceholder } from './PortraitPlaceholder';
import type { Awardee } from 'types';

interface AwardeeCardProps {
  awardee: Awardee;
  badge?: string;
  index?: number;
  isFirst?: boolean;
}

const Article = styled.article<{ $flipped: boolean; $isFirst: boolean }>`
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: 48px;
  align-items: center;
  padding: 40px 0;
  border-top: ${(p) =>
    p.$isFirst ? 'none' : `1px solid ${Colors.greyLighter}`};

  ${(p) =>
    p.$flipped &&
    `
    > :first-child { order: 2; }
    > :last-child { order: 1; }
  `}

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 28px 0;
    > :first-child {
      order: 0;
    }
    > :last-child {
      order: 0;
    }
  }
`;

const PhotoWrap = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5;
  border-radius: 16px;
  overflow: hidden;
  background: ${Colors.greyLightest};
`;

const Badge = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  background: ${Colors.primary};
  color: ${Colors.black};
  font-family: var(--font-montserrat, sans-serif);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 8px 12px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
  z-index: 2;
`;

const Copy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Cat = styled.span`
  font-family: var(--font-montserrat, sans-serif);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${Colors.gold};
`;

const Name = styled.h3`
  font-family: var(--font-bitter), serif;
  font-weight: 700;
  font-size: clamp(34px, 4vw, 48px);
  line-height: 1.05;
  letter-spacing: -0.01em;
  margin: 0;
  color: ${Colors.black};
`;

const RoleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  font-family: var(--font-montserrat, sans-serif);
  font-size: 15px;
  font-weight: 600;
  color: ${Colors.greyDark};
`;

const Dot = styled.span`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${Colors.greyLighter};
  display: inline-block;
`;

const DeptPill = styled.span`
  background: ${Colors.greyLightest};
  color: ${Colors.black};
  font-size: 13px;
  font-weight: 700;
  border-radius: 999px;
  padding: 4px 12px;
`;

const Quote = styled.p`
  font-family: var(--font-bitter), serif;
  font-size: 18px;
  line-height: 1.6;
  border-left: 3px solid ${Colors.primary};
  padding-left: 20px;
  margin: 4px 0 0;
  color: ${Colors.greyDarkest};
`;

export const AwardeeCard = ({
  awardee,
  badge,
  index = 0,
  isFirst = false,
}: AwardeeCardProps) => {
  const flipped = index % 2 === 1;
  const catLabel = awardee.value
    ? `U-SU Values Award · ${awardee.value}`
    : awardee.dept;

  return (
    <Article $flipped={flipped} $isFirst={isFirst}>
      <PhotoWrap>
        <PortraitPlaceholder name={awardee.name} />
        {badge && <Badge>{badge}</Badge>}
      </PhotoWrap>
      <Copy>
        <Cat>{catLabel}</Cat>
        <Name>{awardee.name}</Name>
        <RoleRow>
          <Typography as="span" size="xs" weight="600" color="greyDark">
            {awardee.role}
          </Typography>
          {awardee.dept && (
            <>
              <Dot aria-hidden="true" />
              <DeptPill>{awardee.dept}</DeptPill>
            </>
          )}
        </RoleRow>
        <Quote>{awardee.quote}</Quote>
      </Copy>
    </Article>
  );
};
