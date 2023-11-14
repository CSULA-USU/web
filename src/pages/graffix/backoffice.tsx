import Head from 'next/head';
import { ReactNode, useState } from 'react';
import styled from 'styled-components';
import {
  Button,
  Card,
  Expandable,
  FluidContainer,
  Image,
  SideImageHeader,
  Typography,
} from 'components';
import items from 'data/backoffice.json';
import { useBreakpoint } from 'hooks';
import { GenericModal, Page } from 'modules';
import { media, Spaces } from 'theme';
import { BiChevronRight } from 'react-icons/bi';

interface TenantCardData {
  title: string;
  children: ReactNode;
  iconSrc: string;
  iconAlt: string;
}

const GuidelineContainer = styled.div`
  border: 1px solid;
  margin: 8px;
`;

const RequestContainer = styled.div`
  ${media('tablet')(`min-width: 100%;`)}
  min-width: calc(33.33% - 8px);
  flex: 1;
  margin: ${Spaces.lg} 0;
  font-decoration: none;
`;

const HeaderContainer = styled.div`
  width: 50%;
  ${media('tablet')(`width:50%;`)}
  ${media('desktop')(`width:50%;`)}
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const requests = [
  {
    title: 'Package A',
    iconSrc:
      '/departments/graffix/backoffice/request-images/individual-campaign.svg',
    iconAlt: 'Package A request info',
    children: (
      <FluidContainer
        flex
        flexDirection="column"
        justifyContent="center"
        innerMaxWidth="100%"
      >
        <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
          Social Media
        </Typography>
        <Typography as="p">IG Post/Story</Typography>
        <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
          Small Print
        </Typography>
        <Typography as="p">Poster</Typography>
        <Typography as="p">Postcard</Typography>
        <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
          Large Print
        </Typography>
        <Typography as="p">Large Poster</Typography>
        <Typography as="p">Window Decal</Typography>
        <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
          Banners
        </Typography>
        <Typography as="p">12&apos; x 4&apos;</Typography>
        <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
          Signage
        </Typography>
        <Typography as="p">A-Frame (2)</Typography>
        <Typography as="p">Location Signage (poster size)</Typography>
      </FluidContainer>
    ),
  },
  {
    title: 'Package B',
    iconSrc: '/departments/graffix/backoffice/request-images/party.svg',
    iconAlt: 'Package B Information',
    children: (
      <FluidContainer
        flex
        flexDirection="column"
        justifyContent="center"
        innerMaxWidth="100%"
      >
        <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
          Social Media
        </Typography>
        <Typography as="p">IG Post/Story</Typography>
        <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
          Small Print
        </Typography>
        <Typography as="p">Poster</Typography>
        <Typography as="p">Postcard</Typography>
        <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
          Large Print
        </Typography>
        <Typography as="p">Large Poster</Typography>
        <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
          Banners
        </Typography>
        <Typography as="p">3&apos; x 8&apos;</Typography>
        <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
          Signage
        </Typography>
        <Typography as="p">A-Frame (2)</Typography>
      </FluidContainer>
    ),
  },
  {
    title: 'Package C',
    iconSrc: '/departments/graffix/backoffice/request-images/card.svg',
    iconAlt: 'Package C information',
    children: (
      <FluidContainer
        flex
        flexDirection="column"
        justifyContent="center"
        innerMaxWidth="100%"
      >
        <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
          Social Media
        </Typography>
        <Typography as="p">IG Post/Story</Typography>
        <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
          Small Print
        </Typography>
        <Typography as="p">Poster</Typography>
        <Typography as="p">Postcard</Typography>
      </FluidContainer>
    ),
  },
  {
    title: 'Package D',
    iconSrc:
      '/departments/graffix/backoffice/request-images/features-overview.svg',
    iconAlt: 'Package D information',
    children: (
      <FluidContainer
        flex
        flexDirection="column"
        justifyContent="center"
        innerMaxWidth="100%"
      >
        <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
          Single Item Request
        </Typography>
        <Typography as="p">Specify the Request</Typography>
      </FluidContainer>
    ),
  },
  {
    title: 'Package E',
    iconSrc:
      '/departments/graffix/backoffice/request-images/online-popularity.svg',
    iconAlt: 'Package E information',
    children: (
      <FluidContainer
        flex
        flexDirection="column"
        justifyContent="center"
        innerMaxWidth="100%"
      >
        <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
          Department Social Media Design Post
        </Typography>
      </FluidContainer>
    ),
  },
  {
    title: 'Optional Promo',
    iconSrc: '/departments/graffix/backoffice/request-images/gift-box.svg',
    iconAlt: 'Package C information',
    children: (
      <FluidContainer
        flex
        flexDirection="column"
        justifyContent="center"
        innerMaxWidth="100%"
      >
        <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
          Requires an additional week for design and print time
        </Typography>
        <Typography as="p">
          Needs to be disccussed prior to adding promo
        </Typography>
        <ol>
          <li>
            If solely requesting promo items, submit as a single item request
          </li>
        </ol>
        <Typography as="p">This is based on budget and capacity</Typography>
        <Typography as="p">Apparel</Typography>
        <ol>
          <li>Hats, shirts, hoodies, jackets, etc.</li>
        </ol>
        <Typography as="p">Products</Typography>
        <ol>
          <li>
            Bags, cups, planners, pens, stickers, pins (Enamel & Crocs), etc.
          </li>
        </ol>
        <Typography as="p">Outdoor</Typography>
        <ol>
          <li>Floor decals, large window decals (Window facing the plaza)</li>
        </ol>
      </FluidContainer>
    ),
  },
];

export default function Backoffice() {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<TenantCardData | null>(null);

  return (
    <Page>
      <Head>
        <title>Graffix Backoffice</title>
        <meta name="author" content="Graffix Backoffice" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SideImageHeader
        imgAlt="future graffix office"
        imgSrc="/departments/graffix/backoffice/graffix-future.png"
        imgWidth={isDesktop ? '100%' : '50%'}
      >
        <HeaderContainer>
          <Typography
            as="h1"
            variant="pageHeader"
            size={isDesktop ? '2xl' : isTablet ? '3xl' : '4xl'}
            margin={`${Spaces.lg} 0 ${Spaces.lg} 0`}
          >
            Graffix Backoffice
          </Typography>
          <Typography
            as="p"
            variant="title"
            size={isDesktop ? 'lg' : isTablet ? 'xl' : '2xl'}
            margin={`0 0 ${Spaces.lg} 0`}
          >
            Requests for Graphics
            <br />
            Spring and Summer 2024
          </Typography>
          <Button href="https://form.jotform.com/231835701552150" margin="3%">
            Request Form
          </Button>
        </HeaderContainer>
      </SideImageHeader>
      <FluidContainer>
        <Typography as="h2" variant="title" size={isMobile ? 'lg' : '2xl'}>
          Marketing Packages
        </Typography>
      </FluidContainer>
      <FluidContainer
        flex
        flexWrap="wrap"
        justifyContent="space-between"
        padding="0px 32px"
      >
        {requests.map((props) => (
          <RequestContainer
            key={props.title}
            onClick={() => {
              setModalData(props);
              setIsOpen(true);
            }}
          >
            <Card
              topBorder
              iconAlt={`${props.iconAlt}`}
              iconSrc={`${props.iconSrc}`}
              key={`${props.title}`}
              margin={`${Spaces.md}`}
              minHeight="100%"
              title={`${props.title}`}
            ></Card>
          </RequestContainer>
        ))}
      </FluidContainer>
      <FluidContainer justifyContent="flex-start">
        <Typography
          as="h2"
          margin="0px 0px 32px"
          variant="title"
          size={isMobile ? 'lg' : '2xl'}
        >
          Guidelines
        </Typography>
        <GuidelineContainer>
          <FluidContainer>
            <Expandable
              indicator={<BiChevronRight color="black" size={48} />}
              header={
                <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
                  Design Guidelines
                </Typography>
              }
            >
              <ol>
                <li>
                  The Graffix Department designs all event marketing for the
                  U-SU departments.
                  <ul>
                    <li>
                      The exception is if a campus partner handles the designs
                      for the events marketing.
                      <ul>
                        <li>
                          If a collaboration with any U-SU department the
                          Graffix Department will need to verify the branding
                          and marketing description of the U-SU to post the
                          designs around campus.
                        </li>
                        <li>
                          In the event the Graffix Department does not approve
                          the design then it releases the liability of the
                          Graffix departments and the department in question
                          will be responsible for any issues that arise from the
                          design.
                        </li>
                      </ul>
                    </li>
                    <li>
                      Department social media designs are only required as a
                      graphics request if the event is going up on presence.
                      <ul>
                        <li>
                          There are specific size requirements for presence
                          cover images.
                        </li>
                        <li>
                          Seven business days is required to schedule and resize
                          your design properly.
                        </li>
                      </ul>
                    </li>
                    <li>
                      If Presence is not used for social media content, U-SU
                      logos are still required on your designs.
                      <ul>
                        <li>
                          Your director will approve your design based on
                          branding and accessibility guidelines provided by the
                          Graffix Department.
                        </li>
                        <li>
                          Adhering to the branding and accessibility guidelines
                          falls on the department and the director approving the
                          design.
                        </li>
                        <li>
                          Graphics does not assume responsibility for these
                          designs.
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  All design artwork created by the Graffix Department will have
                  the Graffix branding to differentiate from internal department
                  designs.
                </li>
                <li>
                  All design requests require at least 8 weeks to fulfill the
                  request if 4 weeks of marketing is requested.
                  <ul>
                    <li>
                      Graffix needs a minimum of 3 weeks for design creation and
                      review time with the programmer.
                    </li>
                    <li>
                      If you are out of the office for an extended period,
                      please let us know so we can plan accordingly.
                      <ul>
                        <li>
                          Example: A conference taking you out of town for 4-5
                          workdays.
                        </li>
                        <li>
                          An option is to assign someone to approve designs in
                          your absence.
                        </li>
                      </ul>
                    </li>
                    <li>
                      Adding promo items to your request extends the request
                      time to 5-8 working days.
                      <ul>
                        <li>
                          The promo item needs to be approved by the department
                          director and the Graffix department which is based on
                          budget and capacity
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  We require all information related to the submittal at the
                  time of submission.
                  <ul>
                    <li>
                      Exception: If you are still trying to sign speakers or
                      entertainment acts
                    </li>
                  </ul>
                </li>
              </ol>
            </Expandable>
          </FluidContainer>
        </GuidelineContainer>
        <GuidelineContainer>
          <FluidContainer>
            <Expandable
              indicator={<BiChevronRight color="black" size={48} />}
              header={
                <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
                  Request Guidelines
                </Typography>
              }
            >
              <ol>
                <li>
                  All event marketing for the U-SU departments is required to be
                  designed by the Graffix Department unless it is a
                  collaboration with a campus partner that is handling the
                  designs
                  <ul>
                    <li>
                      Graffix requires a space reservation for all graphics
                      projects prior to submitting a graphics request
                      <ul>
                        <li>
                          All non U-SU space events will be submitted as a
                          standard graphics request. However, they still require
                          a reservation prior to submitting a graphics request
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  If U-SU logos are being used in the marketing, the director is
                  required to approve it.
                  <ul>
                    <li>
                      Any graphics requests submitted after the deadline are
                      based on the capacity of the department and require at
                      least 2 weeks for design time.
                      <ul>
                        <li>
                          Ex: If the programmer needs at least a week of
                          marketing time then the request should be given 3
                          weeks prior to the event date.
                        </li>
                      </ul>
                    </li>
                    <li>
                      Any non-design printing requests are accepted based on the
                      capacity of the department at the time of request and are
                      required to be submitted 2 days before the date needed.
                    </li>
                  </ul>
                </li>
              </ol>
            </Expandable>
          </FluidContainer>
        </GuidelineContainer>
        <GuidelineContainer>
          <FluidContainer>
            <Expandable
              indicator={<BiChevronRight color="black" size={48} />}
              header={
                <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
                  Submittal Requirements
                </Typography>
              }
            >
              <ol>
                <li>
                  Event Start & End Time
                  <ul>
                    <li>
                      What is the theme of your event?
                      <ul>
                        <li>
                          Colors schemes, style, perception
                          <ul>
                            Ex. Warm colors, inspirational leadership, building
                            community, afro-futurism theme
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  Date & Location
                  <ul>
                    <li>
                      What is the purpose or goal of the event?
                      <ul>
                        <li>
                          Example:
                          <ul>
                            I want to provide the students with a cultural and
                            learning experience.
                          </ul>
                          <ul>I want them to sign up for our newsletter.</ul>
                          <ul>
                            I want to bring awareness to a specific topic.
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  Reservation Number for U-SU Building Reservations ***Not
                  required for outside reservations***
                  <ul>
                    <li>
                      Who is your target student demographic?
                      <ul>
                        <li>
                          Example:
                          <ul>
                            I want to target transfer students so that they are
                            aware of the services we provide.
                          </ul>
                          <ul>
                            I want to target Latinx students who are 1st gen
                            students in social work.
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  Presence Calendar Description
                  <ul>
                    <li>
                      Mood Boards
                      <ul>
                        <li>
                          Please be specific to certain areas of inspiration
                        </li>
                      </ul>
                    </li>
                    <li>
                      Any non-design printing requests are accepted based on the
                      capacity of the department at the time of request and are
                      required to be submitted 2 days before the date needed.
                    </li>
                  </ul>
                </li>
                <li>Event Title</li>
                <li>
                  Series? How many events? Are they different designs within the
                  same series? Use the same design for all of them?
                  <ul>
                    <li>
                      A Word Doc with Relatable Images
                      <ul>
                        <li>
                          If you want us to use specific images, please provide
                          high-resolution images.
                        </li>
                        <ul>
                          They will come out blurry if the images are low
                          resolution.{' '}
                        </ul>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ol>
            </Expandable>
          </FluidContainer>
        </GuidelineContainer>
      </FluidContainer>
      <FluidContainer>
        <Typography as="h2" variant="title" size={isMobile ? 'lg' : '2xl'}>
          Item Selection Examples:
        </Typography>
        <FluidContainer
          flex
          flexWrap="wrap"
          padding="0px"
          justifyContent="space-between"
        >
          {items.map((item) => (
            <Card
              width={isMobile ? '100%' : '45%'}
              key={item.title}
              margin={`${Spaces.md} 0px`}
            >
              <Image src={item.src} alt={item.alt} width="100%" />
              <Typography as="p">{item.title}</Typography>
            </Card>
          ))}
        </FluidContainer>
      </FluidContainer>
      {modalData && (
        <GenericModal
          isOpen={modalIsOpen}
          onRequestClose={() => setIsOpen(false)}
        >
          <Typography variant="titleSmall" as="h2" margin="16px 0">
            {modalData.title}
          </Typography>
          <br />
          {modalData.children}
        </GenericModal>
      )}
    </Page>
  );
}
