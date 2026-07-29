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

const OutsideContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100%;
  width: 100%;
  background: linear-gradient(
    135deg,
    ${Colors.greyLightest} 52%,
    ${Colors.primary} 52%,
    ${Colors.primary} 54%,
    ${Colors.greyDarkest} 54%
  );
  overflow: auto;
`;

const CardBlurbContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-bottom: ${Spaces.sm};
  text-align: center;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 95vw;
  max-width: 400px;
  border-radius: 16px;
  filter: drop-shadow(0px 4px 4px rgb(0, 0, 0, 0.25));
  overflow: hidden;
  position: relative;
`;

const CardContainerBottom = styled.div`
  height: 100%;
  width: 100%;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 68px 24px 12px 24px;
  background-color: ${Colors.white};
`;

const CardContainerTop = styled.div`
  min-height: 200px;
  width: 100%;
  background-image: url('https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/about/calstatela-hero-business-card.webp');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 16px 16px 0 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5); /* Dark overlay */
    -webkit-backdrop-filter: blur(0.5px); /* For Safari */

    z-index: 1; /* Ensure the overlay is above the background image */
  }

  > * {
    position: relative;
    z-index: 2; /* Ensure the content is above the overlay */
  }
`;

const ContactInfoContainer = styled.div``;

// Pushes the copy button to the right edge of its contact row. Aligning just the
// button keeps the shared row container untouched, so the rows that have no copy
// button — LinkedIn, website, address — keep sitting exactly where they did.
const TrailingCopyButton = styled.div`
  display: flex;
  align-self: center;
  margin-left: auto;
`;

const IconAndInfoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: ${Spaces.sm};
`;

const IconAndInfoContainerRight = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  border-radius: 50%;
  height: 24px;
  width: 24px;
  margin-right: ${Spaces.sm};
  flex-shrink: 0;
`;

const ProfessionalInfoContainer = styled.div`
  margin-bottom: ${Spaces.sm};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const ProfileImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.white};
  border-radius: 50%;
  height: 112px;
  width: 112px;
  flex-shrink: 0;
  position: absolute;
  bottom: -60px;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden; // ensures the image stays circular
`;

const QRContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: ${Spaces.lg} 0 ${Spaces.md} 0;
`;

const ShadowWrapper = styled.div`
  filter: drop-shadow(0px 4px 4px rgb(0, 0, 0, 0.25));
  border-radius: 16px;
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
    <OutsideContainer>
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
      <ShadowWrapper>
        <CardContainer>
          <CardContainerTop>
            <Image
              src="/usu-wordmark-white.png"
              alt="Cal State LA University-Student Union"
              width="224"
              height="80"
            />
            <ProfileImageContainer>
              {staffData.src && (
                <Image
                  src={staffData.src}
                  alt=""
                  style={{ objectFit: 'cover', objectPosition: 'top' }}
                  width={112}
                  height={112}
                  aria-hidden
                />
              )}
            </ProfileImageContainer>
          </CardContainerTop>
          <CardContainerBottom>
            <ProfessionalInfoContainer>
              <Typography
                as="h1"
                variant="eventTitle"
                color="gold"
                size="lg"
                lineHeight="1"
              >
                {/* No easter egg here on purpose: the virtual card is what
                    staff hand to people off campus, so it stays plain. The
                    "special" flag only animates the staff directory. */}
                {fullName}
              </Typography>
              <Typography
                variant="span"
                size="2xs"
                color="grey"
                lineHeight="1.2"
                margin={`0 0 ${Spaces.sm} 0`}
              >
                {staffData.pronouns}
              </Typography>
              <Typography
                variant="titleSmall"
                size="2xs"
                color="black"
                weight="600"
                lineHeight="1"
              >
                {staffData.title}
              </Typography>
              <Typography
                variant="eventTime"
                size="2xs"
                color="black"
                weight="400"
                lineHeight="1"
              >
                {staffData.department}
              </Typography>
            </ProfessionalInfoContainer>
            <CardBlurbContainer>
              <Typography
                variant="eventTime"
                size="2xs"
                color="black"
                weight="400"
                lineHeight="1.1"
              >
                {staffData.cardBlurb}
              </Typography>
            </CardBlurbContainer>
            <ContactInfoContainer>
              {staffData.phone && (
                <IconAndInfoContainer>
                  <IconContainer>
                    <BiSolidPhone
                      aria-hidden
                      style={{
                        height: '16px',
                        width: '16px',
                        flexShrink: 0,
                        color: 'white',
                      }}
                    />
                  </IconContainer>
                  <IconAndInfoContainerRight>
                    <StyledLink
                      href={`tel:${staffData.phone}`}
                      isInverseUnderlineStyling
                    >
                      <Typography variant="span" size="2xs" color="greyDarkest">
                        {staffData.phone}
                      </Typography>
                    </StyledLink>
                  </IconAndInfoContainerRight>
                  <TrailingCopyButton>
                    <CopyButton value={staffData.phone} label="phone number" />
                  </TrailingCopyButton>
                </IconAndInfoContainer>
              )}
              {staffData.email && (
                <IconAndInfoContainer>
                  <IconContainer>
                    <MdEmail
                      aria-hidden
                      style={{
                        height: '16px',
                        width: '16px',
                        flexShrink: 0,
                        color: 'white',
                      }}
                    />
                  </IconContainer>
                  <IconAndInfoContainerRight>
                    <StyledLink
                      href={`mailto:${staffData.email}`}
                      isInverseUnderlineStyling
                    >
                      <Typography variant="span" size="2xs" color="greyDarkest">
                        {staffData.email}
                      </Typography>
                    </StyledLink>
                  </IconAndInfoContainerRight>
                  <TrailingCopyButton>
                    <CopyButton value={staffData.email} label="email address" />
                  </TrailingCopyButton>
                </IconAndInfoContainer>
              )}
              {staffData.url && (
                <IconAndInfoContainer>
                  <IconContainer>
                    <BiLogoLinkedin
                      aria-hidden
                      style={{
                        height: '16px',
                        width: '16px',
                        flexShrink: 0,
                        color: 'white',
                      }}
                    />
                  </IconContainer>
                  <IconAndInfoContainerRight>
                    <Typography
                      variant="span"
                      size="2xs"
                      color="greyDarkest"
                      as="p"
                    >
                      <StyledLink
                        href={String(staffData.url)}
                        isExternalLink
                        isInverseUnderlineStyling
                      >
                        Linkedin
                      </StyledLink>
                    </Typography>
                  </IconAndInfoContainerRight>
                </IconAndInfoContainer>
              )}
              <IconAndInfoContainer>
                <IconContainer>
                  <BiGlobe
                    aria-hidden
                    style={{
                      height: '16px',
                      width: '16px',
                      flexShrink: 0,
                      color: 'white',
                    }}
                  />
                </IconContainer>
                <IconAndInfoContainerRight>
                  <StyledLink href={'/'} isInverseUnderlineStyling>
                    <Typography
                      variant="span"
                      size="2xs"
                      color="greyDarker"
                      as="p"
                    >
                      https://www.calstatelausu.org/
                    </Typography>
                  </StyledLink>
                </IconAndInfoContainerRight>
              </IconAndInfoContainer>
              <IconAndInfoContainer>
                <IconContainer>
                  <MdLocationOn
                    aria-hidden
                    style={{
                      height: '16px',
                      width: '16px',
                      flexShrink: 0,
                      color: 'white',
                    }}
                  />
                </IconContainer>
                <StyledLink
                  href={
                    'https://www.google.com/maps/search/?api=1&query=5154+State+University+Dr,+Los+Angeles,+CA+90032'
                  }
                  isInverseUnderlineStyling
                  aria-label="Open U-SU address in Google Maps: 5154 State University Dr, Los Angeles, CA 90032"
                >
                  <IconAndInfoContainerRight>
                    <Typography
                      variant="span"
                      size="2xs"
                      color="greyDarker"
                      as="p"
                    >
                      5154 State University Dr.
                    </Typography>
                    <Typography
                      variant="span"
                      size="2xs"
                      color="greyDarker"
                      as="p"
                    >
                      Los Angeles, CA 90032
                    </Typography>
                  </IconAndInfoContainerRight>
                </StyledLink>
              </IconAndInfoContainer>
              <QRContainer>
                <QRCodeSVG value={`https://www.calstatelausu.org${cardPath}`} />
              </QRContainer>
            </ContactInfoContainer>
          </CardContainerBottom>
        </CardContainer>
      </ShadowWrapper>
    </OutsideContainer>
  );
}
