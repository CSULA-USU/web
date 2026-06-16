import styled from 'styled-components';
import { Typography, Button } from 'components';
import { Colors, Spaces } from 'theme';
import type { WebTeamMember } from 'types';

const CardWrapper = styled.article`
  background: ${Colors.white};
  box-shadow: 2px 4px 12px rgba(191, 191, 191, 0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 8px;
`;

const Avatar = styled.div<{ $gradientStart: string; $gradientEnd: string }>`
  aspect-ratio: 4 / 3;
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
  font-size: 56px;
  letter-spacing: -0.02em;
`;

const CardBody = styled.div`
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
`;

const NameRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
`;

const YearBadge = styled.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${Colors.gold};
  white-space: nowrap;
  flex-shrink: 0;
`;

const ContribSection = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: ${Colors.greyDark};
  border-top: 1px solid ${Colors.greyLighter};
  padding-top: 10px;
  margin: 0;
  line-height: 1.55;
`;

const ContribLabel = styled.b`
  color: ${Colors.greyDarkest};
  display: block;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 4px;
`;

const ContactsRow = styled.div`
  display: flex;
  gap: ${Spaces.sm};
  margin-top: auto;
  padding-top: 12px;
  flex-wrap: wrap;
`;

export const PersonCard = ({ member }: { member: WebTeamMember }) => {
  const {
    name,
    initials,
    year,
    role,
    bio,
    contributions,
    linkedInHref,
    emailHref,
    gradientStart = Colors.greyDarkest,
    gradientEnd = Colors.greyDark,
  } = member;

  return (
    <CardWrapper>
      <Avatar $gradientStart={gradientStart} $gradientEnd={gradientEnd}>
        {initials}
      </Avatar>
      <CardBody>
        <NameRow>
          <Typography as="h3" variant="titleSmall" size="md" margin="0">
            {name}
          </Typography>
          <YearBadge>{year}</YearBadge>
        </NameRow>
        <Typography
          as="p"
          variant="labelTitle"
          size="xs"
          margin="0"
          color="greyDarkest"
          weight="700"
        >
          {role}
        </Typography>
        <Typography
          as="p"
          variant="copy"
          size="xs"
          margin="4px 0 6px"
          color="greyDarkest"
        >
          {bio}
        </Typography>
        <ContribSection>
          <ContribLabel>Contributions</ContribLabel>
          {contributions}
        </ContribSection>
        {(linkedInHref || emailHref) && (
          <ContactsRow>
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
          </ContactsRow>
        )}
      </CardBody>
    </CardWrapper>
  );
};
