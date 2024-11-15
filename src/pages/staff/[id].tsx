import { useRouter } from 'next/router';
import styled from 'styled-components';
import { MdEmail, MdLocationOn } from 'react-icons/md';
import { BiGlobe, BiLogoLinkedin, BiSolidPhone } from 'react-icons/bi';
import Image from 'next/image';
import staff from 'data/staff.json';
import { StyledLink, Typography } from 'components';
import { Colors, Spaces } from 'theme';
import { toTitleCase } from 'utils/stringhelpers';

const OutsideContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background: linear-gradient(
    135deg,
    ${Colors.greyLightest} 52%,
    ${Colors.primary} 52%,
    ${Colors.primary} 54%,
    ${Colors.greyDarkest} 54%
  );
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 95vh;
  width: 95vw;
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
  padding: 80px 24px 24px 24px;
  background-color: ${Colors.white};
`;

const CardContainerTop = styled.div`
  height: 400px;
  width: 100%;
  background-image: url('/about/calstatela-hero-business-card.jpeg');
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
    backdrop-filter: blur(0.5px); /* Blur effect */
    z-index: 1; /* Ensure the overlay is above the background image */
  }

  > * {
    position: relative;
    z-index: 2; /* Ensure the content is above the overlay */
  }
`;

const ContactInfoContainer = styled.div``;

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
  margin-bottom: ${Spaces.md};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProfileImageContainer = styled.div<{ profilePicture?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${(props) => props.profilePicture});
  background-size: cover;
  background-position: top;
  border-radius: 50%;
  height: 120px;
  width: 120px;
  flex-shrink: 0;
  position: absolute;
  bottom: -60px;
  left: 50%;
  transform: translateX(-50%);
`;

const ShadowWrapper = styled.div`
  filter: drop-shadow(0px 4px 4px rgb(0, 0, 0, 0.25));
  border-radius: 16px;
`;

export default function StaffBusinessCard() {
  const router = useRouter();
  const { id } = router.query;
  const staffData = staff.find(
    (staffMember) => staffMember.name === toTitleCase(String(id)),
  );

  return (
    <OutsideContainer>
      <ShadowWrapper>
        <CardContainer>
          <CardContainerTop>
            <Image
              src="/usu-wordmark-white.png"
              alt=""
              width="224"
              height="80"
            />
            <ProfileImageContainer
              profilePicture={staffData && staffData.src}
            />
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
                {staffData && staffData.name}
              </Typography>
              <Typography
                variant="titleSmall"
                size="2xs"
                color="black"
                weight="600"
                lineHeight="1.5"
              >
                {staffData && staffData.title}
              </Typography>
              <Typography
                variant="eventTime"
                size="2xs"
                color="black"
                weight="400"
                lineHeight="1"
              >
                {staffData && staffData.department}
              </Typography>
            </ProfessionalInfoContainer>
            <ContactInfoContainer>
              {staffData && staffData.phone && (
                <IconAndInfoContainer>
                  <IconContainer>
                    <BiSolidPhone
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
                      <Typography variant="span" size="xs" color="greyDarkest">
                        {staffData && staffData.phone}
                      </Typography>
                    </StyledLink>
                  </IconAndInfoContainerRight>
                </IconAndInfoContainer>
              )}
              {staffData && staffData.email && (
                <IconAndInfoContainer>
                  <IconContainer>
                    <MdEmail
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
                      <Typography variant="span" size="xs" color="greyDarkest">
                        {staffData.email}
                      </Typography>
                    </StyledLink>
                  </IconAndInfoContainerRight>
                </IconAndInfoContainer>
              )}
              {staffData && staffData.url && (
                <IconAndInfoContainer>
                  <IconContainer>
                    <BiLogoLinkedin
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
                      href={String(staffData.url)}
                      isExternalLink
                      isInverseUnderlineStyling
                    >
                      <Typography
                        variant="span"
                        size="xs"
                        color="greyDarkest"
                        as="p"
                      >
                        Linkedin
                      </Typography>
                    </StyledLink>
                  </IconAndInfoContainerRight>
                </IconAndInfoContainer>
              )}
              <IconAndInfoContainer>
                <IconContainer>
                  <BiGlobe
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
                      size="xs"
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
                    size="xs"
                    color="greyDarker"
                    as="p"
                  >
                    5154 State University Dr.
                  </Typography>
                  <Typography
                    variant="span"
                    size="xs"
                    color="greyDarker"
                    as="p"
                  >
                    Los Angeles, CA 90032
                  </Typography>
                </IconAndInfoContainerRight>
              </IconAndInfoContainer>
            </ContactInfoContainer>
          </CardContainerBottom>
        </CardContainer>
      </ShadowWrapper>
    </OutsideContainer>
  );
}
