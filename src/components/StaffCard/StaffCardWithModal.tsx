import { useState } from 'react';
import styled from 'styled-components';
import { QRCodeSVG } from 'qrcode.react';
import { BiSolidPhone, BiLogoLinkedin } from 'react-icons/bi';
import { MdEmail } from 'react-icons/md';
import { toKebabCase } from 'utils/stringhelpers';
import { Colors, Spaces, media } from 'theme';
import { CopyButton, Image, Typography, StyledLink } from 'components';
import { GenericModal } from 'modules';
import { StaffCard } from './StaffCard';

interface CardStyles {
  margin?: string;
  width?: string;
  hoverable?: boolean;
  rounded?: boolean;
}

interface CardProps extends CardStyles {
  alt: string;
  name: string;
  title: string;
  src: string;
  children?: React.ReactNode;
  department?: string;
  head?: string;
  img?: string;
  phone?: string;
  pronouns?: string;
  suffix?: string;
  tags?: string[];
  url?: string;
  bio?: string;
  email?: string;
  orientation?: 'horizontal' | 'vertical';
}

// The whole card is the modal trigger, so it needs a visible focus ring for
// keyboard users — the button chrome itself is stripped away.
const CardTrigger = styled.button<{ $margin?: string; $maxWidth: string }>`
  display: block;
  width: 100%;
  max-width: ${(p) => p.$maxWidth};
  margin: ${(p) => p.$margin || '0'};
  padding: 0;
  border: none;
  border-radius: 12px;
  background: transparent;
  text-align: left;
  cursor: pointer;

  &:focus-visible {
    outline: 3px solid ${Colors.gold};
    outline-offset: 3px;
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spaces.lg};
  padding: 0 ${Spaces.md} ${Spaces.md};
  text-align: left;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${Spaces.lg};
  margin-top: ${Spaces.lg};

  ${media('tablet')(`
    flex-direction: column;
    align-items: center;
    text-align: center;
  `)}
`;

// Fixed frame + object-fit means headshots of any dimension read as a
// consistent set, the same way they do on the roster grid.
const PhotoFrame = styled.div`
  flex-shrink: 0;
  width: 180px;
  height: 216px;
  overflow: hidden;
  border-radius: 12px;
  background-color: ${Colors.greyLightest};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
  }
`;

const ProfileDetails = styled.div`
  display: flex;
  min-width: 0;
  flex-direction: column;
`;

const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spaces.sm};
  margin-top: ${Spaces.md};

  ${media('tablet')(`
    align-items: center;
  `)}
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${Spaces.sm};
  min-width: 0;
  overflow-wrap: anywhere;
`;

const IconBadge = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  background-color: ${Colors.black};

  svg {
    height: 14px;
    width: 14px;
    color: ${Colors.white};
  }
`;

const Section = styled.section`
  border-top: 1px solid ${Colors.greyLighter};
  padding-top: ${Spaces.lg};
`;

// The QR code is the point of the page — give it its own framed block with an
// explanation, rather than leaving a bare code floating under the contact info.
const NetworkPanel = styled(Section)`
  display: flex;
  align-items: center;
  gap: ${Spaces.lg};

  ${media('tablet')(`
    flex-direction: column;
    text-align: center;
  `)}
`;

const QRFrame = styled.div`
  display: flex;
  flex-shrink: 0;
  padding: ${Spaces.sm};
  border: 1px solid ${Colors.greyLighter};
  border-radius: 12px;
  background-color: ${Colors.white};
`;

export const StaffCardWithModal = ({
  name,
  head,
  title,
  children,
  src,
  alt,
  pronouns,
  phone,
  email,
  bio,
  department,
  suffix,
  url,
  margin,
  width = '380px',
  orientation,
  rounded,
  hoverable,
}: CardProps) => {
  const [showModal, setShowModal] = useState(false);

  const cardPath = `/staff/${toKebabCase(name)}`;
  const fullName = suffix ? `${name}, ${suffix}` : name;
  const firstName = name.split(' ')[0];

  return (
    <>
      <CardTrigger
        onClick={() => setShowModal(true)}
        aria-label={`View contact details and virtual card for ${name}`}
        $margin={margin}
        $maxWidth={width}
      >
        <StaffCard
          name={name}
          head={head}
          title={title}
          src={src}
          alt={alt}
          width="100%"
          orientation={orientation}
          rounded={rounded}
          hoverable={hoverable}
        >
          {children}
        </StaffCard>
      </CardTrigger>
      <GenericModal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        width="720px"
      >
        <ModalContent>
          <ProfileHeader>
            <PhotoFrame>
              <Image src={src} alt={alt} />
            </PhotoFrame>
            <ProfileDetails>
              <Typography
                as="h2"
                variant="titleSmall"
                size="lg"
                lineHeight="1.2"
              >
                {fullName}
              </Typography>
              {pronouns && (
                <Typography
                  as="p"
                  variant="span"
                  size="2xs"
                  color="grey"
                  margin={`${Spaces.xs} 0 0 0`}
                >
                  {pronouns}
                </Typography>
              )}
              <Typography
                as="p"
                variant="cta"
                size="md"
                color="gold"
                weight="700"
                lineHeight="1.3"
                margin={`${Spaces.sm} 0 0 0`}
              >
                {title}
              </Typography>
              {department && (
                <Typography
                  as="p"
                  variant="span"
                  size="xs"
                  color="greyDark"
                  margin={`${Spaces.xs} 0 0 0`}
                >
                  {department}
                </Typography>
              )}
              <ContactList>
                {email && (
                  <ContactItem>
                    <IconBadge aria-hidden>
                      <MdEmail />
                    </IconBadge>
                    <Typography
                      as="p"
                      variant="span"
                      size="xs"
                      color="greyDarker"
                    >
                      <StyledLink
                        href={`mailto:${email}`}
                        isInverseUnderlineStyling
                      >
                        {email}
                      </StyledLink>
                    </Typography>
                    <CopyButton value={email} label="email address" />
                  </ContactItem>
                )}
                {phone && (
                  <ContactItem>
                    <IconBadge aria-hidden>
                      <BiSolidPhone />
                    </IconBadge>
                    <Typography
                      as="p"
                      variant="span"
                      size="xs"
                      color="greyDarker"
                    >
                      <StyledLink
                        href={`tel:${phone}`}
                        isInverseUnderlineStyling
                      >
                        {phone}
                      </StyledLink>
                    </Typography>
                    <CopyButton value={phone} label="phone number" />
                  </ContactItem>
                )}
                {url && (
                  <ContactItem>
                    <IconBadge aria-hidden>
                      <BiLogoLinkedin />
                    </IconBadge>
                    <Typography
                      as="p"
                      variant="span"
                      size="xs"
                      color="greyDarker"
                    >
                      <StyledLink
                        href={url}
                        isExternalLink
                        isInverseUnderlineStyling
                      >
                        {`LinkedIn`}
                      </StyledLink>
                    </Typography>
                  </ContactItem>
                )}
              </ContactList>
            </ProfileDetails>
          </ProfileHeader>
          {bio && (
            <Section>
              <Typography
                as="h3"
                variant="labelTitleSmall"
                size="2xs"
                color="greyDark"
                uppercase
                letterSpacing="0.08em"
                margin={`0 0 ${Spaces.sm} 0`}
              >
                About {firstName}
              </Typography>
              <Typography as="p" variant="prose" size="xs">
                {bio}
              </Typography>
            </Section>
          )}
          <NetworkPanel>
            <QRFrame>
              <QRCodeSVG
                size={104}
                value={`https://www.calstatelausu.org${cardPath}`}
                title={`QR code linking to ${name}'s virtual card`}
              />
            </QRFrame>
            <div>
              <Typography
                as="h3"
                variant="labelTitleSmall"
                size="2xs"
                color="greyDark"
                uppercase
                letterSpacing="0.08em"
                margin={`0 0 ${Spaces.xs} 0`}
              >
                Scan to connect
              </Typography>
              <Typography
                as="p"
                variant="prose"
                size="xs"
                margin={`0 0 ${Spaces.sm} 0`}
              >
                Point a phone camera QR code to open {firstName}&apos;s virtual
                card
              </Typography>
              <Typography as="p" variant="cta" size="xs" color="greyDarkest">
                <StyledLink href={cardPath} isInverseUnderlineStyling>
                  View virtual card
                </StyledLink>
              </Typography>
            </div>
          </NetworkPanel>
        </ModalContent>
      </GenericModal>
    </>
  );
};
