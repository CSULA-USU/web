import { GetStaticPaths, GetStaticProps } from 'next';
import styled from 'styled-components';
import { MdEmail, MdLocationOn } from 'react-icons/md';
import { BiGlobe, BiLogoLinkedin, BiSolidPhone } from 'react-icons/bi';
import { QRCodeSVG } from 'qrcode.react';
import staff from 'data/staff.json';
import { toKebabCase } from 'utils/stringhelpers';
import {
  CopyButton,
  Image,
  PageMeta,
  StyledLink,
  Typography,
} from 'components';
import { Colors, Spaces } from 'theme';

const AVATAR_SIZE = 112;
// Half the avatar hangs below the banner, so the body has to clear that overhang
// before its own padding starts. Deriving it keeps the two in step if the avatar
// ever resizes.
const AVATAR_OVERHANG = AVATAR_SIZE / 2;
const WORDMARK_HEIGHT = 80;
// Sized so the centred wordmark clears the avatar: the wordmark's lower edge
// lands at (BANNER_HEIGHT + WORDMARK_HEIGHT) / 2 = 152px and the avatar's top
// edge at BANNER_HEIGHT - AVATAR_OVERHANG = 168px, leaving 16px between them.
const BANNER_HEIGHT = 224;

// The card scrolls in normal flow rather than inside a fixed overlay: on mobile
// Safari a fixed 100% height fights the collapsing URL bar, and a card taller
// than the viewport then clips instead of scrolling. dvh tracks the visible
// viewport; the vh line is the fallback for browsers without it.
const Backdrop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  min-height: 100dvh;
  padding: ${Spaces.lg} 0;
  background: linear-gradient(
    135deg,
    ${Colors.greyLightest} 52%,
    ${Colors.primary} 52%,
    ${Colors.primary} 54%,
    ${Colors.greyDarkest} 54%
  );
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 92vw;
  max-width: 380px;
  border-radius: 16px;
  background-color: ${Colors.white};
  box-shadow: 0 4px 16px rgb(0 0 0 / 0.25);
  overflow: hidden;
`;

const CardBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: ${BANNER_HEIGHT}px;
  background-image: url('https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/about/calstatela-hero-business-card.webp');
  background-size: cover;
  background-position: center;

  /* Darkens the photo so the white wordmark holds up over any part of it. */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgb(0 0 0 / 0.5);
    z-index: 1;
  }

  > * {
    position: relative;
    z-index: 2;
  }
`;

const AvatarFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: -${AVATAR_OVERHANG}px;
  left: 50%;
  transform: translateX(-50%);
  height: ${AVATAR_SIZE}px;
  width: ${AVATAR_SIZE}px;
  border: 3px solid ${Colors.white};
  border-radius: 50%;
  background-color: ${Colors.white};
  overflow: hidden; // ensures the image stays circular
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${AVATAR_OVERHANG + 16}px ${Spaces.lg} ${Spaces.lg};
`;

// One tight block: the name and the three lines qualifying it read as a unit,
// so they sit at 4px while the sections around them are 24px apart.
const Identity = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${Spaces.xs};
  text-align: center;
`;

const IdentityMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: ${Spaces.sm};
`;

// Bitter italic, the one place on the card a serif earns its keep — it sets the
// strengths list apart from the functional text above and below it without
// needing a rule or a size change. Takes no `as` prop at the call site:
// styled-components claims that prop on a wrapped component, and Typography
// already renders a paragraph by default.
const CardBlurb = styled(Typography)`
  margin-top: ${Spaces.md};
  font-style: italic;
  text-align: center;
`;

// Shrink-wrapped to its widest row and centred as a block, so the badges still
// line up in one column and every value starts at the same left edge — centring
// the rows individually would stagger both.
const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  gap: ${Spaces.sm};
  max-width: 100%;
  margin-top: ${Spaces.lg};
`;

// No dividers and no forced row height — the 32px badge sets the row's height on
// its own, which with the 8px gaps still leaves a 40px touch pitch per row.
// Spacing is per-child rather than a row `gap`: the copy button's 28px hit area
// is deliberately larger than its 14px glyph, so a gap would land on top of that
// slack and read as a double gap.
const ContactRow = styled.div`
  display: flex;
  align-items: center;
`;

const ContactValue = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow-wrap: anywhere;
`;

// Sits immediately after the value it copies, not out at the card's edge, so the
// button reads as belonging to that one line. Needs a wrapper of its own because
// CopyButton renders a fragment and cannot take a className.
const RowAction = styled.div`
  display: flex;
`;

const IconBadge = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  height: 32px;
  width: 32px;
  margin-right: ${Spaces.sm};
  border-radius: 50%;
  background-color: ${Colors.black};

  svg {
    height: 16px;
    width: 16px;
    color: ${Colors.white};
  }
`;

const QRPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${Spaces.sm};
  margin-top: ${Spaces.lg};
  text-align: center;
`;

type StaffMember = (typeof staff)[number];

type Props = {
  staffData: StaffMember;
};

// Pre-rendered per person so link-preview crawlers get this staff member's name
// and photo. Resolving the person from router.query instead would leave crawlers
// — which do not run JavaScript — with an empty card.
export const getStaticPaths: GetStaticPaths = async () => ({
  paths: staff.map((staffMember) => ({
    params: { id: toKebabCase(staffMember.name) },
  })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const staffData = staff.find(
    (staffMember) => toKebabCase(staffMember.name) === String(params?.id),
  );

  if (!staffData) {
    return { notFound: true };
  }

  return { props: { staffData } };
};

export default function StaffBusinessCard({ staffData }: Props) {
  const cardPath = `/staff/${toKebabCase(staffData.name)}`;
  const fullName = staffData.suffix
    ? `${staffData.name}, ${staffData.suffix}`
    : staffData.name;

  return (
    <Backdrop>
      <PageMeta
        title={`${fullName} | U–SU Staff`}
        description={`${staffData.title}, ${staffData.department} at the University-Student Union, Cal State LA. Contact card with email, phone, and a scannable QR code.`}
        path={cardPath}
        socialTitle={`${fullName} — ${staffData.title}`}
        socialDescription={`${staffData.department}, University-Student Union at Cal State LA.`}
        type="profile"
        imageUrl={staffData.src || undefined}
        imageAlt={`${staffData.name}, ${staffData.title}`}
      />
      <Card>
        <CardBanner>
          <Image
            src="/usu-wordmark-white.png"
            alt="Cal State LA University-Student Union"
            width="224"
            height={WORDMARK_HEIGHT}
          />
          <AvatarFrame>
            {staffData.src && (
              <Image
                src={staffData.src}
                alt=""
                style={{ objectFit: 'cover', objectPosition: 'top' }}
                width={AVATAR_SIZE}
                height={AVATAR_SIZE}
                aria-hidden
              />
            )}
          </AvatarFrame>
        </CardBanner>
        <CardBody>
          <Identity>
            <Typography
              as="h1"
              variant="titleSmall"
              size="lg"
              weight="700"
              color="greyDarkest"
              lineHeight="1.15"
              letterSpacing="-0.01em"
            >
              {/* No easter egg here on purpose: the virtual card is what
                  staff hand to people off campus, so it stays plain. The
                  "special" flag only animates the staff directory. */}
              {fullName}
            </Typography>
            {(staffData.pronouns || staffData.pronunciation) && (
              <IdentityMeta>
                {staffData.pronouns && (
                  <Typography as="p" variant="span" size="2xs" color="grey">
                    {staffData.pronouns}
                  </Typography>
                )}
                {staffData.pronunciation && (
                  <Typography as="p" variant="span" size="2xs" color="grey">
                    {`[ ${staffData.pronunciation} ]`}
                  </Typography>
                )}
              </IdentityMeta>
            )}
            <Typography
              as="p"
              variant="cta"
              size="xs"
              color="gold"
              weight="700"
              lineHeight="1.3"
            >
              {staffData.title}
            </Typography>
            <Typography
              as="p"
              variant="span"
              size="2xs"
              color="greyDark"
              weight="600"
              uppercase
              letterSpacing="0.08em"
              lineHeight="1.3"
            >
              {staffData.department}
            </Typography>
          </Identity>
          {staffData.cardBlurb && (
            <CardBlurb
              variant="copy"
              size="2xs"
              color="greyDark"
              lineHeight="1.6"
            >
              {staffData.cardBlurb}
            </CardBlurb>
          )}
          <ContactList>
            {staffData.phone && (
              <ContactRow>
                <IconBadge aria-hidden>
                  <BiSolidPhone />
                </IconBadge>
                <ContactValue>
                  <Typography
                    as="p"
                    variant="span"
                    size="xs"
                    color="greyDarkest"
                  >
                    <StyledLink
                      href={`tel:${staffData.phone}`}
                      isInverseUnderlineStyling
                    >
                      {staffData.phone}
                    </StyledLink>
                  </Typography>
                </ContactValue>
                <RowAction>
                  <CopyButton value={staffData.phone} label="phone number" />
                </RowAction>
              </ContactRow>
            )}
            {staffData.email && (
              <ContactRow>
                <IconBadge aria-hidden>
                  <MdEmail />
                </IconBadge>
                <ContactValue>
                  <Typography
                    as="p"
                    variant="span"
                    size="xs"
                    color="greyDarkest"
                  >
                    <StyledLink
                      href={`mailto:${staffData.email}`}
                      isInverseUnderlineStyling
                    >
                      {staffData.email}
                    </StyledLink>
                  </Typography>
                </ContactValue>
                <RowAction>
                  <CopyButton value={staffData.email} label="email address" />
                </RowAction>
              </ContactRow>
            )}
            {staffData.url && (
              <ContactRow>
                <IconBadge aria-hidden>
                  <BiLogoLinkedin />
                </IconBadge>
                <ContactValue>
                  <Typography
                    as="p"
                    variant="span"
                    size="xs"
                    color="greyDarkest"
                  >
                    <StyledLink
                      href={String(staffData.url)}
                      isExternalLink
                      isInverseUnderlineStyling
                    >
                      LinkedIn
                    </StyledLink>
                  </Typography>
                </ContactValue>
              </ContactRow>
            )}
            <ContactRow>
              <IconBadge aria-hidden>
                <BiGlobe />
              </IconBadge>
              <ContactValue>
                <Typography as="p" variant="span" size="xs" color="greyDarkest">
                  <StyledLink href="/" isInverseUnderlineStyling>
                    calstatelausu.org
                  </StyledLink>
                </Typography>
              </ContactValue>
            </ContactRow>
            <ContactRow>
              <IconBadge aria-hidden>
                <MdLocationOn />
              </IconBadge>
              <StyledLink
                href="https://www.google.com/maps/search/?api=1&query=5154+State+University+Dr,+Los+Angeles,+CA+90032"
                isInverseUnderlineStyling
                aria-label="Open U-SU address in Google Maps: 5154 State University Dr, Los Angeles, CA 90032"
              >
                <ContactValue>
                  <Typography
                    as="p"
                    variant="span"
                    size="xs"
                    color="greyDarkest"
                  >
                    5154 State University Dr.
                  </Typography>
                  <Typography
                    as="p"
                    variant="span"
                    size="xs"
                    color="greyDarkest"
                  >
                    Los Angeles, CA 90032
                  </Typography>
                </ContactValue>
              </StyledLink>
            </ContactRow>
          </ContactList>
          <QRPanel>
            <QRCodeSVG
              size={128}
              value={`https://www.calstatelausu.org${cardPath}`}
              title={`QR code linking to ${staffData.name}'s virtual card`}
            />
            <Typography
              as="p"
              variant="span"
              size="2xs"
              color="greyDark"
              weight="600"
              uppercase
              letterSpacing="0.08em"
            >
              Scan for virtual card
            </Typography>
          </QRPanel>
        </CardBody>
      </Card>
    </Backdrop>
  );
}
