import Head from 'next/head';
import {
  Page,
  CallToAction,
  DepartmentHeader,
  OfficeHours,
  ImageAndCard,
} from 'modules';
import {
  DescriptionCard,
  FluidContainer,
  Image,
  Typography,
  Button,
} from 'components';
import { MdOutlineFacebook } from 'react-icons/md';
import { IoLogoInstagram } from 'react-icons/io';
import styled from 'styled-components';
import { useBreakpoint } from 'hooks';
import { Spaces } from 'theme';
import { Component as InstagramFeed } from 'sections/InstagramFeed/InstagramFeed';
import { NonDiscriminationPolicy, PhotoVideoDisclaimer } from 'partials';

const descriptionCards = [
  {
    imgSrc: 'icons/connecting-people-icon.png',
    imgAlt: '',
    children:
      'Meet new people! Connect with over 120 student organizations including fraternities & sororities.',
  },
  {
    imgSrc: 'icons/resume-icon.png',
    imgAlt: '',
    children: 'Attend events on and off campus! ',
  },
  {
    imgSrc: 'icons/giving-hand-icon.png',
    imgAlt: '',
    children:
      'Develop your leadership potential by attending an interactive workshop!',
  },
];

const clubCards = [
  {
    title: 'On Campus and Off Campus Programs',
    children:
      'Join us for events on campus like movie nights, arts and crafts, leadership workshops, pet therapy and off campus for musical theater trips, theme park visits, and leadership retreats. New events are hosted each semester!',
    imgSrc: '/vectors/csi/trip.svg',
    imgAlt: '',
    href: 'https://calstatela.presence.io/events',
    linkText: 'Learn More',
  },
  {
    title: 'Fraternities and Sororities',
    children:
      'Are you curious about fraternity and sorority life? Looking to add some fun to your university experience? Interested in helping others through community service? Take some time to check out these unique organizations.',
    imgSrc: '/vectors/csi/fraternities.svg',
    imgAlt: '',
    href: 'csi/fsl',
    linkText: 'Learn More',
  },
  {
    title: 'Wingspan Leadership Program',
    children:
      "The Wingspan Leadership Program strives to enhance our students' experience at Cal State LA through meaningful opportunities to cultivate leadership skills, social responsibility, and holistic development.",
    imgSrc: '/vectors/csi/superhero.svg',
    imgAlt: '',
    href: 'https://www.wingspanla.org/',
    isExternalLink: true,
    linkText: 'Learn More',
  },
  {
    title: 'Student Organizations',
    children:
      'Cal State LA is home to over 120 student organizations that represent academic, cultural, political, professional, service, social, spiritual, and recreational interests. Learn about the organizations or find information about the Student Org Handbook and policies and procedures!',
    imgSrc: '/vectors/csi/academic.svg',
    imgAlt: '',
    href: 'csi/student-orgs',
    linkText: 'Learn More',
  },
  {
    title: 'LEAD (Leadership Enrichment Advocacy and Development)',
    children:
      'Are you interested in developing the skills you need to be a stand-out in a tough job market? Explore the opportunities we have for all students regardless of the level of leadership experience they have. See our events calendar for upcoming opportunities.',
    imgSrc: '/vectors/csi/education.svg',
    imgAlt: '',
    href: '',
    linkText: '',
  },
  {
    title: 'Leadership Library',
    children:
      'CSI maintains a Leadership Library with books on retreat planning, team builders, enhancing communication skills, officer transitions, and tips for running a successful meeting. All recognized student organization members can check out the books from our office in the U-SU.',
    imgSrc: '/vectors/csi/meeting.svg',
    imgAlt: '',
    href: '',
    linkText: '',
  },
];

const hours = [
  {
    title: 'Office Hours',
    times: ['Monday - Friday: 9:00 AM - 5:00 PM', 'Saturday - Sunday: CLOSED'],
  },
];

const ButtonContainer = styled.div`
  margin: ${Spaces.md} 0;
`;

export default function CSI() {
  const SocialsContainer = styled.div`
    display: flex;
    margin: 16px 0px;
  `;

  const { returnByBreakpoint } = useBreakpoint();

  const descriptionCardWidth = returnByBreakpoint({
    tablet: '100%',
    desktop: 'calc(50% - 16px)',
    widescreen: 'calc(25% - 16px)',
  });

  return (
    <Page>
      <Head>
        <title>U-SU CSI</title>
        <meta
          name="author"
          content="The University Student Union Center for Student Involvement"
          key="author"
        />
        <meta
          name="keywords"
          content="CSULA, Cal State LA Student Union, U-SU, Center for Student Involvement, CSI, University Student, GEEK, Golden Eagle Event Krew, FSL, Greek Life, Sorority, Fraternity, Student Organizations, Leadership Enrichment Advocacy and Development, LEAD, Leadership Library, On Campus Programs, Off Campus Programs, Presence"
          key="keywords"
        />
        <meta
          name="description"
          content="The Center for Student Involvement in the Cal State LA University-Student Union serves as a hub for involvement, recreation, and leadership, adding to the value of campus life at Cal State LA"
          key="description"
        />
      </Head>
      <DepartmentHeader
        title="Center for Student Involvement"
        infoSection={
          <OfficeHours
            address={
              <>
                <Typography as="p">University-Student Union,</Typography>
                <Typography as="p">
                  5154 State University Dr, <blockquote />
                </Typography>
                <Typography as="p">Los Angeles CA, 90032</Typography>
              </>
            }
            phoneNumber="323-343-5110"
            hours={hours}
          />
        }
      >
        The Center for Student Involvement empowers Golden Eagles to engage in
        transformative opportunities, build community, and create positive
        change.
        <br />
        <br />
        For questions about student organizations or to share event ideas please
        contact us at:{' '}
        <a
          href="mailto:CSI@calstatela.edu"
          aria-label="University-Student Union CSI's email"
        >
          <strong>CSI@calstatela.edu</strong>
        </a>
        <ButtonContainer>
          <abbr title="Center of Student Involvement Forms">
            <Button href="/csi/forms" variant="black" margin={``}>
              <Typography color="white">CSI Forms</Typography>
            </Button>
          </abbr>
        </ButtonContainer>
        <SocialsContainer>
          <a
            href="https://www.facebook.com/csicalstatela"
            aria-label="Visit the University-Student Union CSI facebook page"
          >
            <MdOutlineFacebook style={{ height: '32px', width: '32px' }} />
          </a>
          <a
            href="https://www.instagram.com/csicalstatela/?hl=en"
            aria-label="Check out the U-SU CSI'"
          >
            <IoLogoInstagram style={{ height: '32px', width: '32px' }} />
          </a>
          <a
            href="https://linktr.ee/csicalstatela"
            aria-label="visit the University-Student Union CSI Linktree"
          >
            <Image
              alt=""
              src="/departments/logos/linktree.svg"
              height="29px"
              width="32px"
            />
          </a>
        </SocialsContainer>
      </DepartmentHeader>
      <CallToAction
        href="https://lp.constantcontactpages.com/su/ZS9x5ft/CSInews"
        buttonText="Sign Up"
        text="CSI Monthly Newsletter"
      >
        <Typography as="h2" variant="label">
          Stay up to date with <abbr>CSI</abbr> info, events, updates, and
          opportunities!
        </Typography>
      </CallToAction>
      <FluidContainer
        backgroundColor="greyLightest"
        flex
        flexWrap="wrap"
        justifyContent="center"
      >
        {descriptionCards.map((props) => (
          <DescriptionCard
            rounded
            hoverable
            margin="24px 8px"
            key={`${props.children}`}
            width={descriptionCardWidth}
            minHeight="280px"
            {...props}
          />
        ))}
      </FluidContainer>
      {clubCards.map((props) => (
        <ImageAndCard key={props.title} {...props} />
      ))}
      <InstagramFeed department="csi" />
      <NonDiscriminationPolicy />
      <PhotoVideoDisclaimer />
      <FluidContainer flex justifyContent="center">
        <Image
          alt=""
          src="/departments/logos/csi-logo.svg"
          height="400px"
          width="100%"
        />
      </FluidContainer>
    </Page>
  );
}
