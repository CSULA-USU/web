import styled from 'styled-components';
import { Typography, Button } from 'components';
import { Colors, Spaces, media } from 'theme';
import type { WebTeamStaffMember } from 'types';

const CardWrapper = styled.article`
  background: ${Colors.white};
  border-radius: 16px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 210px 1fr;
  box-shadow: 2px 4px 12px rgba(191, 191, 191, 0.25);
  ${media('mobile')(`
    grid-template-columns: 1fr;
  `)}
`;

const PhotoArea = styled.div<{ $gradientStart: string; $gradientEnd: string }>`
  background: linear-gradient(
    135deg,
    ${(p) => p.$gradientStart},
    ${(p) => p.$gradientEnd}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.95);
  font-family: var(--font-bitter), serif;
  font-weight: 700;
  font-size: 60px;
  min-height: 210px;
`;

const CardBody = styled.div`
  padding: 26px 28px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
`;

const Badge = styled.span<{ $variant: 'primary' | 'muted' }>`
  align-self: flex-start;
  background: ${(p) =>
    p.$variant === 'primary' ? Colors.primary : Colors.white};
  color: ${(p) =>
    p.$variant === 'primary' ? Colors.black : Colors.greyDarkest};
  border: ${(p) =>
    p.$variant === 'muted' ? `1px solid ${Colors.greyLighter}` : 'none'};
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 5px 11px;
  border-radius: 999px;
`;

const AwardsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${Spaces.sm};
  margin-top: 2px;
`;

const AwardTag = styled.span`
  padding: 5px 11px;
  background: ${Colors.greyLightest};
  border: 1px solid ${Colors.greyLighter};
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  color: ${Colors.greyDarkest};
`;

const ContactsRow = styled.div`
  display: flex;
  gap: ${Spaces.sm};
  margin-top: 10px;
  flex-wrap: wrap;
`;

export const StaffHighlightCard = ({
  staffMember,
}: {
  staffMember: WebTeamStaffMember;
}) => {
  const {
    name,
    initials,
    badgeLabel,
    badgeVariant = 'primary',
    title,
    bio,
    awards,
    emailHref,
    phoneHref,
    linkedInHref,
    portfolioHref,
    gradientStart = Colors.gold,
    gradientEnd = Colors.greyDarkest,
  } = staffMember;

  return (
    <CardWrapper>
      <PhotoArea $gradientStart={gradientStart} $gradientEnd={gradientEnd}>
        {initials}
      </PhotoArea>
      <CardBody>
        <Badge $variant={badgeVariant}>{badgeLabel}</Badge>
        <Typography as="h3" variant="titleSmall" size="xl" margin="2px 0 0">
          {name}
        </Typography>
        <Typography
          as="p"
          variant="labelTitle"
          size="xs"
          weight="700"
          color="greyDarkest"
          margin="0"
        >
          {title}
        </Typography>
        <Typography
          as="p"
          variant="copy"
          size="xs"
          color="greyDarkest"
          margin="4px 0"
        >
          {bio}
        </Typography>
        {awards.length > 0 && (
          <AwardsRow>
            {awards.map((award) => (
              <AwardTag key={award}>{award}</AwardTag>
            ))}
          </AwardsRow>
        )}
        <ContactsRow>
          {emailHref && (
            <Button
              href={emailHref}
              variant="grey"
              padding="9px 13px"
              fontSize="12px"
            >
              Email
            </Button>
          )}
          {phoneHref && (
            <Button
              href={phoneHref}
              variant="grey"
              padding="9px 13px"
              fontSize="12px"
            >
              Phone
            </Button>
          )}
          {linkedInHref && (
            <Button
              href={linkedInHref}
              variant="grey"
              isExternalLink
              padding="9px 13px"
              fontSize="12px"
            >
              LinkedIn
            </Button>
          )}
          {portfolioHref && (
            <Button
              href={portfolioHref}
              variant="grey"
              isExternalLink
              padding="9px 13px"
              fontSize="12px"
            >
              Portfolio
            </Button>
          )}
        </ContactsRow>
      </CardBody>
    </CardWrapper>
  );
};
