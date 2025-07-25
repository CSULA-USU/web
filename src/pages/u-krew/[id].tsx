import { useRouter } from 'next/router';
import styled from 'styled-components';
import { MdEmail } from 'react-icons/md';
import { BiGlobe, BiLogoLinkedin, BiSolidPhone } from 'react-icons/bi';
import { QRCodeSVG } from 'qrcode.react';
import Image from 'next/image';
import { StyledLink, Typography } from 'components';
import { Colors, Spaces } from 'theme';
import { toTitleCase } from 'utils/stringhelpers';
import { useEffect, useState } from 'react';
import { UKrewStudent } from 'types';

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

// const CardBlurbContainer = styled.div`
//   margin-bottom: ${Spaces.sm};
// `;

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
  margin-bottom: ${Spaces.sm};
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
  height: 112px;
  width: 112px;
  flex-shrink: 0;
  position: absolute;
  bottom: -60px;
  left: 50%;
  transform: translateX(-50%);
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

export default function StudentBusinessCard() {
  const [studentData, setStudentData] = useState<UKrewStudent | undefined>(
    undefined,
  );
  const router = useRouter();
  let id = router.query.id;

  useEffect(() => {
    if (!id) return;
    const fetchStudentData = async () => {
      await fetch(`/api/jotformUKrew?user_id=${id}`).then(async (res) => {
        if (!res.ok) {
          console.log('Error when fetching user data.');
          router.push('directory');
          return;
        }
        setStudentData(await res.json());
      });
    };
    fetchStudentData();
  }, [id]);

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
              profilePicture={studentData && studentData?.photoUpload}
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
                {studentData &&
                  `${toTitleCase(studentData.firstName)} ${toTitleCase(
                    studentData.lastName,
                  )}`}
                {/* {studentData && ', ' + studentData.suffix} */}
              </Typography>
              <Typography
                variant="titleSmall"
                size="2xs"
                color="black"
                weight="600"
                lineHeight="1.5"
              >
                {studentData && studentData.role}
              </Typography>
              <Typography
                variant="eventTime"
                size="2xs"
                color="black"
                weight="400"
                lineHeight="1"
              >
                {studentData && studentData.department}
              </Typography>
            </ProfessionalInfoContainer>
            {/* <CardBlurbContainer>
              <Typography
                variant="eventTime"
                size="2xs"
                color="black"
                weight="400"
                lineHeight="1"
              >
                {studentData && studentData.cardBlurb}
              </Typography>
            </CardBlurbContainer> */}
            <ContactInfoContainer>
              {studentData && studentData.phoneNumber && (
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
                      href={`tel:${studentData.phoneNumber}`}
                      isInverseUnderlineStyling
                    >
                      <Typography variant="span" size="2xs" color="greyDarkest">
                        {studentData && studentData.phoneNumber}
                      </Typography>
                    </StyledLink>
                  </IconAndInfoContainerRight>
                </IconAndInfoContainer>
              )}
              {studentData && studentData.email && (
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
                      href={`mailto:${studentData.email}`}
                      isInverseUnderlineStyling
                    >
                      <Typography variant="span" size="2xs" color="greyDarkest">
                        {studentData.email}
                      </Typography>
                    </StyledLink>
                  </IconAndInfoContainerRight>
                </IconAndInfoContainer>
              )}
              {studentData && studentData.linkedIn && (
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
                      href={String(studentData.linkedIn)}
                      isExternalLink
                      isInverseUnderlineStyling
                    >
                      <Typography
                        variant="span"
                        size="2xs"
                        color="greyDarkest"
                        as="p"
                      >
                        Linkedin
                      </Typography>
                    </StyledLink>
                  </IconAndInfoContainerRight>
                </IconAndInfoContainer>
              )}
              {studentData && studentData.portfolioLink && (
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
                    <StyledLink
                      href={studentData?.portfolioLink}
                      isInverseUnderlineStyling
                    >
                      <Typography
                        variant="span"
                        size="2xs"
                        color="greyDarker"
                        as="p"
                      >
                        {studentData && studentData?.portfolioLink}
                      </Typography>
                    </StyledLink>
                  </IconAndInfoContainerRight>
                </IconAndInfoContainer>
              )}
              {/* <IconAndInfoContainer>
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
                <StyledLink
                  href={
                    'https://www.google.com/maps/search/?api=1&query=5154+State+University+Dr,+Los+Angeles,+CA+90032'
                  }
                  isInverseUnderlineStyling
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
              </IconAndInfoContainer> */}
              <QRContainer>
                <QRCodeSVG
                  value={`https://www.calstatelausu.org/u-krew/${
                    studentData && studentData?.email.split('@')[0]
                  }`}
                />
              </QRContainer>
            </ContactInfoContainer>
          </CardContainerBottom>
        </CardContainer>
      </ShadowWrapper>
    </OutsideContainer>
  );
}
