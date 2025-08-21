import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { AiOutlineFileText } from 'react-icons/ai';
import { BiChevronRight } from 'react-icons/bi';
import { TabPanel } from 'react-tabs';
import { media, Spaces } from 'theme';
import { DocumentLink, Page } from 'modules';
import { useBreakpoint } from 'hooks';
import {
  Button,
  Card,
  Divider,
  Expandable,
  FluidContainer,
  Image,
  StaffCardWithModal,
  Panel,
  TabCluster,
  Typography,
  StyledLink,
} from 'components';
import fslData from 'data/fsl-full-content.json';
import staff from 'data/staff.json';
import { ReactNode, useState } from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import { Modal } from 'modules/UKrewCardList';

const {
  chapters,
  howToJoin: HowToJoinContent,
  costOfMembership: FamilyAndFriendsCostOfMembershipConent,
  membershipIntakeForms: MembershipIntakeForms,
  hazingPolicies: HazingPoliciesContent,
  expansion: FSLExpansionContent,
  policyButtons: PolicyButtons,
  resources: ResourceButtons,
  pillarsAccordion: PillarsAccordion,
} = fslData;

const AB524InfoSection = styled.div`
  margin: 0 0 ${Spaces.md} 0;
`;

const AB524ReportContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 ${Spaces.sm} 0;
`;

const LinkInner = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-right: ${Spaces.sm};
  }
`;

const HazingPoliciesContentSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ResourceButtonsSection = styled.div`
  width: calc(30%);
  @media (max-width: 900px) {
    width: calc(40%);
  }
  @media (max-width: 750px) {
    width: calc(100%);
  }
  margin: ${Spaces.sm};
`;

const NavItems = [
  'About Us',
  'Chapters',
  'How to Join',
  'Family and Friends',
  'Current Members',
  'Resources',
];

interface SquareImageContainerProps {
  src: string;
  alt: string;
  maxWidth?: string;
  objectFit?: 'cover' | 'contain';
  borderRadius?: string;
}

const Wrapper = styled.div<{ maxWidth?: string }>`
  position: relative;
  width: 100%;
  aspect-ratio: 17 / 11;
  ${(p) => p.maxWidth && `max-width: ${p.maxWidth};`}
  overflow: hidden;
`;

const StyledImage = styled(Image)<{ objectFit: string; borderRadius?: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: ${(p) => p.objectFit};
  ${(p) => p.borderRadius && `border-radius: ${p.borderRadius};`}
`;

const HeroContainer = styled.section`
  position: relative;
  width: 100%;
  height: 84.5vh;
  min-height: 600px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackgroundImage = styled(Image)`
  position: absolute;
  top: -25px;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 1;

  /* ✅ Soft blur */
  filter: blur(
    0.5px
  ); /* adjust value: 2px (subtle), 4px (soft), 6px (strong) */
  transform: scale(1.05); /* optional: prevent visible edges from blur */
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.5) 0%,
    rgba(255, 255, 255, 0.6) 50%,
    rgba(255, 255, 255, 0.7) 100%
  );
  z-index: 1;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 3;
  text-align: center;
  color: #1a1a1a;
  max-width: 1200px;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const TitleImage = styled(Image)`
  max-width: 100%;
  height: auto;
  width: 100%;
  max-width: 900px;

  filter: drop-shadow(2px 4px 12px rgba(0, 0, 0, 0.25))
    drop-shadow(0px 0px 8px rgba(255, 255, 255, 0.8));
`;

const TitleContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;

  &::before {
    content: '';
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% + 50px);
    height: calc(100% + 50px);
    background: radial-gradient(
      ellipse at center,
      rgba(255, 255, 255, 0.8) 0%,
      rgba(255, 255, 255, 0.5) 50%,
      transparent 70%
    );
    border-radius: 25px;
    z-index: -1;
  }

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;

    &::before {
      top: -20px;
      width: calc(100% + 40px);
      height: calc(100% + 40px);
    }
  }

  @media (max-width: 480px) {
    margin-bottom: 1rem;

    &::before {
      top: -15px;
      width: calc(100% + 30px);
      height: calc(100% + 30px);
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const LogoCropWrapper = styled.div`
  width: 100%;
  max-width: 900px;
  height: 300px; /* Adjust this value as needed */
  overflow: hidden;
  margin: 0 auto 2rem;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    max-height: 250px;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    height: 120px;
    margin-bottom: 1rem;
  }
`;

export const SquareImageContainer = ({
  src,
  alt,
  maxWidth,
  objectFit = 'cover',
  borderRadius = '12px',
}: SquareImageContainerProps) => (
  <Wrapper maxWidth={maxWidth}>
    <StyledImage
      src={src}
      alt={alt}
      objectFit={objectFit}
      style={{ borderRadius }}
    />
  </Wrapper>
);

const ContactsBarWrapper = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem;
  margin: 0;
  flex-wrap: wrap;

  ${() =>
    media('tablet')(`
          width: 300px;
          margin: 0 auto;
        `)}

  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    white-space: nowrap;
    ${() =>
      media('desktop')(`
            justify-content: center;
            flex: 1 1 50%;
          `)}
    ${() =>
      media('tablet')(`
            justify-content: start;
            flex: 1 1 100%;
          `)}
  }
`;

const CrestImageWrapper = styled.div`
  width: 100%;
  height: 120px; /* consistent height */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${Spaces.lg};

  img {
    max-height: 100%;
    width: auto;
    object-fit: contain;
  }
`;

const ChaptersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${Spaces.sm};
  margin: ${Spaces.md} 0;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ChapterCardWrapper = styled.div`
  cursor: pointer;
  width: 100%;
`;

const CrestImageContainer = styled.div`
  width: 100%;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-height: 100%;
    object-fit: contain;
  }
`;

interface ContactsBarProps {
  children: ReactNode;
  isMobile: boolean;
  isDesktop: boolean;
}
const ContactsBar = ({ children, isMobile, isDesktop }: ContactsBarProps) => {
  return (
    <FluidContainer
      backgroundColor="primary"
      padding={isMobile ? '0 16px' : isDesktop ? '0 36px' : '12px 72px'}
    >
      <ContactsBarWrapper>{children}</ContactsBarWrapper>
    </FluidContainer>
  );
};

export default function FSL() {
  const { isMobile, isDesktop } = useBreakpoint();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<any | null>(null);

  return (
    <Page>
      <Head>
        <title>Student Organizations FSL</title>
        <meta
          name="author"
          content="The University Student Union Center for Student Involvement"
          key="author"
        />
        <meta
          name="keywords"
          content="CSULA, Cal State LA Student Union, U-SU, Center for Student Involvement, CSI, University Student, Fraternity, Sorority, Co-Ed, Greek Life, FSL, IFC Recruitment, MGC Membership Intake, NPHC Membership Intake, Panhellenic Recruitment"
          key="keywords"
        />
        <meta
          name="description"
          content="The Center for Student Involvement in the Cal State LA University-Student Union serves as a hub for involvement, recreation, and leadership, adding to the value of campus life at Cal State LA"
          key="description"
        />
      </Head>

      <HeroContainer>
        <BackgroundImage
          src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/departments/csi/fsl/fsl-header.webp"
          alt="Cal State LA Fraternity and Sorority students"
        />
        <Overlay />
        <ContentWrapper>
          <TitleContainer>
            <LogoCropWrapper>
              <h1>
                <TitleImage
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Uiy8CLtYE2AQWZgKKbUfEbj1xQ9CDA.png"
                  alt="Fraternity & Sorority Life - California State University, Los Angeles"
                />
              </h1>
            </LogoCropWrapper>
          </TitleContainer>
          <FluidContainer
            flex
            flexDirection="column"
            padding="0 0 80px 0"
            innerMaxWidth="800px"
          >
            <Typography as="h2" variant="subheader" weight="600">
              The fraternity and sorority community at California State
              University, Los Angeles has been a vibrant and engaged community
              since 1948.
            </Typography>
          </FluidContainer>
          <ButtonGroup>
            <Button
              href="https://www.instagram.com/calstatelagreeks/?hl=en"
              aria-label="Link to the Fraternities and Sororities Instagram feed"
              variant="primary"
            >
              Join Our Community
            </Button>
            <Button variant="black" href="#learn-more">
              Learn More
            </Button>
          </ButtonGroup>
        </ContentWrapper>
      </HeroContainer>
      <ContactsBar isMobile={isMobile} isDesktop={isDesktop}>
        <li>
          <Image
            alt="Flag icon for game room's room number."
            src="/departments/recreation/game-room/icons/flag.svg"
            height="18px"
            width="18px"
          />
          <Typography variant="cta" color="black">
            U-SU 2nd floor, Room 206
          </Typography>
        </li>
        <li>
          <Image
            alt="Phone icon for game room's phone number."
            src="/departments/recreation/game-room/icons/phone.svg"
            height="18px"
            width="18px"
          />
          <StyledLink href="tel:13233436909">
            <Typography variant="cta" color="black">
              323&ndash;343&ndash;5113
            </Typography>
          </StyledLink>
        </li>
        <li>
          <HiOutlineMail />
          <Typography variant="cta" color="black">
            iprieto7@calstatela.edu
          </Typography>
        </li>
      </ContactsBar>

      {/* Drop-Down Menus */}
      <div id="learn-more"></div>
      <TabCluster tabItems={NavItems}>
        {/* About Us*/}
        <TabPanel>
          <FluidContainer backgroundColor="greyLightest">
            <Typography as="h2" variant="title" size={isMobile ? 'xl' : '2xl'}>
              Welcome!
            </Typography>
            <Typography as="p" variant="copy">
              With 12+ organizations and over 300 fraternity and sorority
              members, Cal State LA&apos;s Greek community truly has it all—from
              culturally based and service&mdash;driven groups to social
              organizations and everything in between. No matter what
              you&apos;re looking for, there&apos;s a place for you in our
              fraternity and sorority community! Build lifelong friendships,
              grow as a leader, give back to the community, and make
              unforgettable memories along the way... go greek!
            </Typography>
          </FluidContainer>
          {/* MISSION */}
          <FluidContainer
            flex
            flexDirection="row"
            padding="0"
            alignItems="flex-start"
          >
            <FluidContainer flex flexDirection="column" alignItems="flex-start">
              <Typography
                as="h2"
                variant="title"
                size={isMobile ? 'xl' : '2xl'}
              >
                Our Mission
              </Typography>
              <Typography as="p" variant="copy">
                The Center for Student Involvement empowers Golden Eagles to
                engage in transformative opportunities, build community, and
                create positive change.
              </Typography>
            </FluidContainer>

            {/* VALUES */}
            <FluidContainer flex flexDirection="column" alignItems="flex-start">
              <Typography
                as="h2"
                variant="title"
                size={isMobile ? 'xl' : '2xl'}
              >
                Our Values
              </Typography>
              <Typography as="p" variant="copy">
                Fraternities and sororities offer an enriching college
                experience that helps students grow into leaders, develop
                valuable social skills, and stay committed to academics and
                community service.
              </Typography>
              <Typography as="p" variant="copy">
                Joining a fraternity or sorority is more than just a college
                club or organization—it&apos;s a lifelong connection that
                continues to open doors and build friendships long after
                graduation.
              </Typography>
              <Typography as="p" variant="copy">
                At Cal State LA, membership is centered around four key pillars
                of fraternity and sorority life:
              </Typography>
            </FluidContainer>
          </FluidContainer>

          {/* Pillars Accordian */}
          <FluidContainer>
            {PillarsAccordion.map((item, index) => (
              <FluidContainer key={index} padding="0">
                <Expandable
                  indicator={<BiChevronRight size={36} />}
                  header={
                    <Typography
                      variant="titleSmall"
                      as="h3"
                      size={isMobile ? 'lg' : 'xl'}
                    >
                      {item.title}
                    </Typography>
                  }
                >
                  <Typography as="p" margin={`${Spaces.md} 0`}>
                    {item.content}
                  </Typography>
                </Expandable>
                <Divider margin={`${Spaces.md} 0`} />
              </FluidContainer>
            ))}
          </FluidContainer>

          {/* STAFF */}
          <FluidContainer
            backgroundColor="greyLightest"
            flex
            flexDirection="column"
          >
            <Typography as="h2" variant="title" size={isMobile ? 'xl' : '2xl'}>
              Meet Our Staff
            </Typography>
            <FluidContainer
              flex
              flexWrap="wrap"
              justifyContent="center"
              padding="0"
            >
              {staff
                .filter((s) => s.tags.includes('CSI'))
                .map((s) => (
                  <StaffCardWithModal
                    key={s.name}
                    name={s.name}
                    title={s.title}
                    src={s.src}
                    alt={s.alt}
                    tags={s.tags}
                    margin={`${Spaces.sm}`}
                    pronouns={s.pronouns}
                    email={s.email}
                    phone={s.phone}
                    bio={s.bio}
                    rounded
                  >
                    <Typography size="xs" as="p">
                      {s.department}
                    </Typography>
                    <Typography size="xs" as="p">
                      {s.email}
                    </Typography>
                  </StaffCardWithModal>
                ))}
            </FluidContainer>
          </FluidContainer>

          {/* Community Reports */}
          <FluidContainer>
            <Typography as="h2" variant="title" size={isMobile ? 'xl' : '2xl'}>
              Community Reports
            </Typography>
            <Typography as="p" margin={`0 0 ${Spaces.md} 0 `}>
              Community reports are created to demonstrate academic, service,
              and philanthropic efforts of the Greek community.
            </Typography>
            <Typography variant="subheader" as="h3">
              Campus-Recognized Sorority And Fraternity Transparency Act - AB524
            </Typography>
            <Typography as="p" margin={`0 0 ${Spaces.md} 0`}>
              The Annual Campus-Recognized Sorority and Fraternity Transparency
              Report, which offers insights about recognized fraternities and
              sororities Cal State LA during the previous academic year, is now
              available. You can access the report here by clicking the button
              below.
            </Typography>
            <AB524InfoSection>
              <Typography as="p">
                This report is shared annually in October in compliance with{' '}
                <Link
                  href="https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB524"
                  aria-label="AB-524 Postsecondary education: Campus-Recognized Sorority and Fraternity Transparency Act information"
                >
                  <strong>
                    Assembly Bill 524; Sections 66310&mdash;66312 of the
                    California Education Code
                  </strong>
                </Link>
                , which requires that institutions in California with
                fraternities and sororities compile and maintain details about
                each organization, including information about the
                organizations, their members, and their conduct.
              </Typography>
            </AB524InfoSection>
            <AB524ReportContainer>
              <DocumentLink
                href="https://www.dropbox.com/scl/fi/bk41ypgbsdjvt0zq9nx5q/2022-2023-AB-524-Report.pdf?rlkey=blktva7fvvqkrlobxcp4j4kuh&st=y05rbrpi&raw=1"
                aria-label="FY 22&mdash;23 Report"
              >
                FY 22&mdash;23 Report
              </DocumentLink>
              <DocumentLink
                href="https://www.dropbox.com/scl/fi/26yu1niyp0kg73ntigdkl/2023-2024-AB-524-Report.pdf?rlkey=coc6owqcz78f1etbixhxzyf3v&st=jwrbzkyd&dl=0"
                aria-label="FY 23&mdash;24 Report"
              >
                FY 23&mdash;24 Report
              </DocumentLink>
            </AB524ReportContainer>
            <Typography variant="subheader" as="h3">
              Chapter Status
            </Typography>
            <Typography as="p">
              In an effort to be as transparent as possible with our community,
              the Center for Student Involvement has published the chapter
              status of each chapter chartered at California State University,
              Los Angeles.
            </Typography>
            <Typography weight="700" as="h4" margin={`${Spaces.sm} 0 0`}>
              <strong>University Status Key for FSl Groups</strong>
            </Typography>
            <ul>
              <li>
                <Typography as="p">
                  <strong>Good Standing: </strong> the organization is
                  officially recognized by the university. These organizations
                  have the privileges of using University facilities and
                  equipment, holding meetings and programs on campus, recruiting
                  members that will be recognized by the University,
                  participating in University&mdash;sponsored activities and
                  events, and other benefits outlined in the Cal State LA
                  Student Organization Handbook.
                </Typography>
              </li>
              <li>
                <Typography as="p">
                  <strong>Unrecognized: </strong> the organization is not in
                  good standing and is no longer associated with the University,
                  their HQs, or council. The organization and its members do not
                  receive any support or advisement from the University.
                  Unrecognized organizations may not participate in any
                  university&mdash;sponsored activity and may not utilize any
                  property owned, operated, leased, or managed by Cal State LA.
                  The University has severed its relationship with these
                  organizations due to significant and serious concerns over the
                  health and safety of our students and university community,
                  and the University would strongly discourage maintaining or
                  seeking membership in these organizations.
                </Typography>
              </li>
              <li>
                <Typography as="p">
                  <strong>Probation: </strong>places the organization on
                  probation for a period of time during which the organization
                  is expected to demonstrate exemplary compliance with
                  University policies. Probation may include conditions that the
                  organization must meet to be removed from probation. The
                  probationary conditions may specify the sanctions to be
                  imposed should the organization not comply with the term(s) of
                  probation.
                </Typography>
              </li>
            </ul>
            <abbr title="Fraternity and Sorority Scoresheet">
              <Button href="https://csula.sharepoint.com/:x:/s/CenterForStudentInvolvement/EVRwQIqtOeFAnArKx6PdXiwBT0QETtyq41vdycvduqprgQ?e=CEVBdS">
                FSL Scoresheet
              </Button>
            </abbr>
          </FluidContainer>

          {/* Visit Us */}
          <FluidContainer>
            <Typography as="h2" variant="title" size={isMobile ? 'xl' : '2xl'}>
              Visit Us
            </Typography>
            <Typography as="p" margin={`${Spaces.md} 0 `}>
              The CSI staff is available during the work week and can be seen on
              campus at night and weekends for meetings and programs to assist
              you in your fraternity and sorority experience. Please email us or
              stop by our office for more information.
            </Typography>
            <Typography weight="700" as="h3">
              Contact Us
            </Typography>
            <Typography as="p">Phone: 323&ndash;343&ndash;5113</Typography>
            <Typography as="p">Email: iprieto7@calstatela.edu</Typography>
          </FluidContainer>
        </TabPanel>

        {/* Chapters */}
        <TabPanel>
          <FluidContainer>
            {chapters.map((obj: any) =>
              Object.keys(obj).map((item) => (
                <>
                  <Expandable
                    indicator={<BiChevronRight size={36} />}
                    header={
                      <Typography variant="titleSmall"> {item}</Typography>
                    }
                  >
                    <ChaptersGrid>
                      {obj[item].map((p: any) => (
                        <ChapterCardWrapper
                          key={p.name}
                          role="button"
                          tabIndex={0}
                          onClick={() => {
                            setSelectedChapter(p);
                            setIsModalOpen(true);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setSelectedChapter(p);
                              setIsModalOpen(true);
                            }
                          }}
                        >
                          <FluidContainer
                            flex
                            flexDirection="column"
                            alignItems="center"
                            padding="16px"
                            backgroundColor="white"
                          >
                            <CrestImageContainer>
                              <Image
                                src={p.crest}
                                alt={`${p.name} crest`}
                                width="auto"
                                height="auto"
                              />
                            </CrestImageContainer>
                            <Typography
                              as="h3"
                              variant="titleSmall"
                              margin="16px 0 0"
                            >
                              {p.name}
                            </Typography>
                          </FluidContainer>
                        </ChapterCardWrapper>
                      ))}
                    </ChaptersGrid>
                  </Expandable>
                  <Divider margin={`${Spaces.md} 0`} />
                </>
              )),
            )}
          </FluidContainer>
        </TabPanel>

        {isModalOpen && selectedChapter && (
          <Modal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedChapter(null);
            }}
          >
            <FluidContainer flex flexDirection="column" gap="24px">
              <FluidContainer
                flex
                flexDirection="row"
                justifyContent="space-between"
                padding="0"
              >
                <CrestImageWrapper>
                  <Image
                    src={selectedChapter.crest}
                    alt={`${selectedChapter.name} crest`}
                    width="auto"
                    height="auto"
                  />
                </CrestImageWrapper>
                <FluidContainer
                  flex
                  alignItems="center"
                  flexDirection="column"
                  padding="0"
                >
                  <Typography variant="titleSmall">
                    {selectedChapter.fullName?.trim() || selectedChapter.name}
                  </Typography>
                </FluidContainer>
              </FluidContainer>
              <FluidContainer padding="0">
                <Typography as="span">
                  <strong>Values: </strong>
                  {selectedChapter.values.map((value: string, idx: number) => (
                    <span key={`val-${idx}`}>{value} </span>
                  ))}
                  <br />
                  <strong>Founding: </strong>
                  {selectedChapter.founding}
                  <br />
                  {selectedChapter.communityService && (
                    <>
                      <strong>Community Service:</strong>{' '}
                      {selectedChapter.communityService.map(
                        (service: string, idx: number) => (
                          <span key={`cs-${idx}`}>{service} </span>
                        ),
                      )}
                      <br />
                    </>
                  )}
                  <strong>Colors:</strong>{' '}
                  {selectedChapter.colors.map((color: string, idx: number) => (
                    <span key={`color-${idx}`}>{color} </span>
                  ))}
                  <br />
                  <strong>Symbol:</strong> {selectedChapter.symbol}
                </Typography>
              </FluidContainer>
            </FluidContainer>
          </Modal>
        )}

        {/* How to Join */}
        <TabPanel>
          <FluidContainer>
            <Typography as="p" color="black" margin={`${Spaces.sm} 0`}>
              At Cal State LA, the joining process for each organization is
              based on their governing council and their National and Regional
              Offices. The process to join an organization is different for each
              governing council.
            </Typography>
            {HowToJoinContent.map((item) => (
              <FluidContainer flex flexWrap="wrap" key={item.title}>
                <Card title={item.title} width="100%" topBorder>
                  {item.content}
                </Card>
              </FluidContainer>
            ))}
          </FluidContainer>
        </TabPanel>

        {/* Family and Friends */}
        <TabPanel>
          <FluidContainer backgroundColor="greyLightest">
            <Typography as="h2" variant="title" size={isMobile ? 'xl' : '2xl'}>
              Welcome to Fraternity & Sorority Life at Cal State LA!
            </Typography>

            <Typography as="p">
              Your student has embarked upon a great adventure and opportunity
              by choosing to attend California State University, Los Angeles.
              Your student has many opportunities ahead of them while at Cal
              State LA. By joining a fraternity or sorority, they are joining a
              number of other new members in their search for a sense of
              community at the university. Being in a new environment can cause
              students to feel overwhelmed. and for many parents, the Greek
              community conjures up images of Animal House. That&apos;s simply
              not the reality! There are many myths about the Greek community,
              but the reality is that men and women in fraternities and
              sororities are committed to their academics, volunteer time in the
              community, develop and strengthen their leadership skills, and
              form a campus network with other Greeks. Our Greek community
              consists of over 20 different organizations and over 500 students.
              As the Center for Student Involvement staff, we work closely with
              the recognized organizations to enhance the overall Greek
              experience by upholding their values, community standards and
              university Policies.
            </Typography>
          </FluidContainer>
          <FluidContainer>
            <Typography as="h2" variant="title" size={isMobile ? 'xl' : '2xl'}>
              Your Role as a Parent/Family Member. Get Connected, Stay Informed,
              Support Your Students.
            </Typography>
            <Typography as="p">
              Students need support throughout the process of recruitment/intake
              and new member education. Be supportive and learn as much as you
              can about Greek life by asking questions of your student as they
              meet members in fraternities and sororities. If you have questions
              about what your student is saying, call the Center for Student
              Involvement. We&apos;re happy to answer any questions.
              <br />
              <br />
              Keep an open mind. Greek life is not for everyone. Just because
              you may have been a fraternity or sorority member doesn&apos;t
              mean that it is the right choice for your student and vice versa.
              Fraternities and sororities are different on every campus. Groups
              that may have been strong on the campus where you attended school
              or that you&apos;ve experienced may not have the same reputation
              at Cal State LA. Let your student choose the group that they feel
              the most comfortable joining.
              <br />
              <br />
              Talk to your student beforehand about the financial obligation.
              Determine who will pay for what and where the limits are.
              <br />
              <br />
              You do not want to become too involved in the sorority and
              fraternity recruitment/intake process &mdash; this is your
              student&apos;s decision. There will be plenty of activities and
              events for you to attend once your student joins one of our
              organizations.
              <br />
              <br />
              Too often, parents do not give their students the autonomy to
              navigate their own experience as a college student. It helps the
              student mature and gain some assertiveness when they feel the need
              to call various offices with questions or concerns about their
              decision to go Greek.
              <br />
              <br />
              If you have any questions or concerns about Greek Life on Cal
              State LA&apos;s campus, please contact us!
            </Typography>
            <Typography weight="700" as="h3" margin={`${Spaces.md} 0 0`}>
              Contact Us
            </Typography>
            <Typography as="p">
              Phone: 323&ndash;343&ndash;5709 <br /> Email:
              iprieto7@calstatela.edu
            </Typography>
          </FluidContainer>
          <FluidContainer backgroundColor="greyLightest">
            <Typography as="h2" variant="title" size={isMobile ? 'xl' : '2xl'}>
              Cost of Membership
            </Typography>

            {FamilyAndFriendsCostOfMembershipConent.map((card) => (
              <Card
                key={card.title}
                {...card}
                topBorder
                margin={`${Spaces.md} 0`}
              />
            ))}
          </FluidContainer>
        </TabPanel>

        {/* Current Members */}
        <TabPanel>
          <FluidContainer backgroundColor="greyLightest">
            <Typography variant="title" as="h2" margin={`${Spaces.sm} 0`}>
              Membership Intake Forms
            </Typography>
            <FluidContainer
              flex
              flexWrap="wrap"
              justifyContent="center"
              alignItems="center"
              padding="0"
            >
              {MembershipIntakeForms.map((form) => (
                <Button
                  variant="outline"
                  href={form.href}
                  key={form.title}
                  margin={Spaces.sm}
                >
                  <LinkInner>
                    <AiOutlineFileText size="24px" />
                    {form.title}
                  </LinkInner>
                </Button>
              ))}
            </FluidContainer>
          </FluidContainer>
          <FluidContainer>
            <Typography variant="title" as="h2" margin={`${Spaces.sm} 0`}>
              Policies
            </Typography>
            <Typography as="p" variant="copy" weight="700">
              California Hazing Law
            </Typography>
            <Typography>
              <strong>
                Hazing is not permitted on Cal State LA&apos;s campus.{' '}
              </strong>
              This is in accordance with California law; the policies of
              California State University, Los Angeles, including the bylaws of
              all inter/national organizations represented on our campus, hazing
              is not permitted. All acts of hazing by any organization, member,
              and/or alumni are specifically forbidden. Refer to the Student
              Handbook for information concerning Cal State LA&apos;s definition
              of hazing, California State law, and possible sanctions.
            </Typography>
            <Typography as="p" margin={`${Spaces.md} 0`}>
              At Cal State LA, the sanctions for hazing include:
            </Typography>
          </FluidContainer>
          <HazingPoliciesContentSection>
            {HazingPoliciesContent.map((policy) => (
              <Card
                key={policy.name}
                topBorder
                title={policy.name}
                margin={`${Spaces.sm}`}
                width={!isDesktop ? 'calc(30%)' : '100%'}
              >
                {policy.content}
              </Card>
            ))}
          </HazingPoliciesContentSection>
          <FluidContainer
            flex
            flexWrap="wrap"
            justifyContent="center"
            alignItems="center"
          >
            {PolicyButtons.map((policy) => (
              <Button href={policy.href} margin={Spaces.sm} key={policy.href}>
                {policy.children}
              </Button>
            ))}
          </FluidContainer>
          <FluidContainer backgroundColor="greyLightest">
            <Typography variant="title" as="h2">
              {' '}
              Expansion of New Fraternities and Sororities
            </Typography>
            {FSLExpansionContent.map((item) => (
              <Panel key={item.content} margin={`${Spaces.md} 0`}>
                <Typography>{item.content}</Typography>
              </Panel>
            ))}
          </FluidContainer>
        </TabPanel>

        {/* Resources */}
        <TabPanel>
          <FluidContainer>
            <Typography variant="title" as="h1">
              Resources
            </Typography>
            <FluidContainer justifyContent="center" flex flexWrap="wrap">
              {ResourceButtons.map((resource) => (
                <ResourceButtonsSection key={resource.title}>
                  <a href={resource.href}>
                    <Card
                      topBorder
                      minHeight={isMobile ? '320px' : '100%'}
                      title={resource.title}
                      hoverable
                      rounded
                    >
                      <Typography>{resource.children}</Typography>
                    </Card>
                  </a>
                </ResourceButtonsSection>
              ))}
            </FluidContainer>
          </FluidContainer>
        </TabPanel>
      </TabCluster>
    </Page>
  );
}
