import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';
import staff from 'data/staff.json';
import { Typography } from 'components';
import { Colors, Spaces } from 'theme';
import { toTitleCase } from 'utils/stringhelpers';

const OutsideContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: ${Colors.greyLightest};
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
  padding: 48px 24px 24px 24px;
  background-color: ${Colors.white};
`;

const CardContainerTop = styled.div`
  height: 240px;
  width: 100%;
  background-image: url('/about/calstatela-hero.jpeg');
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

const ProfileImageContainer = styled.div<{ profilePicture?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${(props) => props.profilePicture});
  background-size: cover;
  background-position: top;
  border-radius: 50%;
  height: 72px;
  width: 72px;
  margin-right: ${Spaces.sm};
  flex-shrink: 0;
  position: absolute;
  bottom: -36px;
  left: 24px;
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
            <Typography as="h1" variant="eventTitle" color="gold">
              {staffData && staffData.name}
            </Typography>
            <Typography variant="eventDetail" size="xs" color="black">
              {staffData && staffData.title}
            </Typography>
            <Typography variant="eventDetail" size="xs" color="black">
              {staffData && staffData.department}
            </Typography>
            <Typography variant="eventDetail" size="xs" color="black">
              {staffData && staffData.phone}
            </Typography>
            <Typography variant="eventDetail" size="xs" color="black">
              {staffData && staffData.email}
            </Typography>
            {staffData && staffData.url && (
              <Link href={String(staffData.url)}>
                <Typography
                  variant="eventDetail"
                  size="xs"
                  color="black"
                  as="p"
                >
                  Linkedin
                </Typography>
              </Link>
            )}
          </CardContainerBottom>
        </CardContainer>
      </ShadowWrapper>
    </OutsideContainer>
  );
}
