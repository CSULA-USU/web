import Head from 'next/head';
import { ReactNode, useState } from 'react';
import styled from 'styled-components';
import {
  Button,
  Card,
  Divider,
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
  justify-content: space-around;
  text-align: center;
`;

const requests = [
  {
    title: 'Individual',
    iconSrc:
      '/departments/graffix/backoffice/request-images/individual-campaign.svg',
    iconAlt: 'individual campaign',
    children: (
      <FluidContainer
        flex
        flexDirection="column"
        justifyContent="center"
        innerMaxWidth="100%"
      >
        <Expandable
          indicator={<BiChevronRight color="black" size={48} />}
          header={
            <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
              Requirements
            </Typography>
          }
        >
          <Typography as="p" margin="0px 0px 8px">
            Event title
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 8px">
            Series or single event choice
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 8px">
            Event dates and times
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 8px">
            Design options
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 8px">
            Calendar descriptions
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 8px">
            Themes
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 8px">
            Social media choices
          </Typography>
        </Expandable>
        <Divider color="gold" />
        <Expandable
          indicator={<BiChevronRight color="black" size={48} />}
          header={
            <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
              Item Selection
            </Typography>
          }
        >
          <Typography as="h5" weight="700">
            Printed Items
          </Typography>
          <Typography as="p" margin="0px 0px 1px">
            Color Posters
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 1px">
            Postcards
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 1px">
            Button
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 1px">
            UT Ad (Published Every Tuesday)
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 8px">
            Other (specify)
          </Typography>
          <br />
          <Typography as="h5" weight="700">
            Large Scale Items
          </Typography>
          <Typography as="p" margin="0px 0px 1px">
            Big Banner (22&quot; x 28&quot;)
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 1px">
            Foam Board (20&quot; x 30&quot;)
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 8px">
            Window Decal (CCC 35&quot; x 28&quot;)
          </Typography>
          <Typography as="h5" weight="700">
            Signage
          </Typography>
          <Typography as="p" margin="0px 0px 1px">
            2 A-Frame (24&quot; x 36&quot;)
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 1px">
            Vinyl (12&quot; x 4&quot;)
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 8px">
            Vinyl (3&quot; x 8&quot;)
          </Typography>
        </Expandable>
        <Divider color="gold" />
        <Expandable
          indicator={<BiChevronRight color="black" size={48} />}
          header={
            <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
              Social Media
            </Typography>
          }
        >
          <Typography as="p" margin="0px 0px 1px">
            The following questions will ask you to provide information on your
            preferred social media and virtual event platforms. Having
            information like your Zoom link, password, RSVP method or event
            theme will be helpful, but is not required.
          </Typography>
          <br />
          <ol>
            <li>
              <Typography as="p" margin="0px 0px 1px">
                Instagram Post or Story
              </Typography>
            </li>
            <br />
            <li>
              <Typography as="p" margin="0px 0px 1px">
                Facebook Post or Story
              </Typography>
            </li>
            <br />
            <li>
              <Typography as="p" margin="0px 0px 1px">
                Twitter Post
              </Typography>
            </li>
            <br />
            <li>
              <Typography as="p" margin="0px 0px 8px">
                Optional: Zoom, IG Sticker, FB Event Cover
              </Typography>
            </li>
          </ol>
        </Expandable>
      </FluidContainer>
    ),
  },
  {
    title: 'Conference',
    iconSrc: '/departments/graffix/backoffice/request-images/conference.svg',
    iconAlt: 'conference',
    children: (
      <FluidContainer
        flex
        flexDirection="column"
        justifyContent="center"
        innerMaxWidth="100%"
      >
        <Expandable
          indicator={<BiChevronRight color="black" size={48} />}
          header={
            <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
              Requirements
            </Typography>
          }
        >
          <Typography as="p" margin="0px 0px 8px">
            Event title
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 8px">
            Series or single event choice
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 8px">
            Event dates and times
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 8px">
            Design options
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 8px">
            Calendar descriptions
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 8px">
            Themes
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 8px">
            Social media choices
          </Typography>
        </Expandable>
        <Divider color="gold" />
        <Expandable
          indicator={<BiChevronRight color="black" size={48} />}
          header={
            <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
              Item Selection
            </Typography>
          }
        >
          <Typography as="h5" weight="700">
            Printed Items
          </Typography>
          <Typography as="p" margin="0px 0px 1px">
            Color Posters
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 1px">
            Postcards
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 1px">
            Button
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 1px">
            UT Ad (Published Every Tuesday)
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 1px">
            Brochure/Program
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 8px">
            Other (specify)
          </Typography>
          <br />
          <Typography as="h5" weight="700">
            Large Scale Items
          </Typography>
          <Typography as="p" margin="0px 0px 1px">
            Big Banner (22&quot; x 28&quot;)
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 8px">
            Foam Board (20&quot; x 30&quot;)
          </Typography>
          <Typography as="h5" weight="700">
            Signage
          </Typography>
          <Typography as="p" margin="0px 0px 1px">
            2 A-Frame (24&quot; x 36&quot;)
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 1px">
            Event Signage
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 8px">
            Window Decal (CCC - 35&quot; x 28&quot;)
          </Typography>
        </Expandable>
        <Divider color="gold" />
        <Expandable
          indicator={<BiChevronRight color="black" size={48} />}
          header={
            <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
              Social Media
            </Typography>
          }
        >
          <Typography as="p" margin="0px 0px 1px">
            Instagram Post or Story
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 1px">
            Facebook Post or Story
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 1px">
            Twitter Post
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 8px">
            Optional: Zoom, IG Sticker, FB Event Cover
          </Typography>
        </Expandable>
      </FluidContainer>
    ),
  },
  {
    title: 'Awards',
    iconSrc: '/departments/graffix/backoffice/request-images/awards.svg',
    iconAlt: 'awards',
    children: (
      <FluidContainer
        flex
        flexDirection="column"
        justifyContent="center"
        innerMaxWidth="100%"
      >
        <Expandable
          indicator={<BiChevronRight color="black" size={48} />}
          header={
            <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
              Requirements
            </Typography>
          }
        >
          <Typography as="p" margin="0px 0px 8px">
            Event title
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 8px">
            Series or single event choice
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 8px">
            Event dates and times
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 8px">
            Design options
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 8px">
            Calendar descriptions
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 8px">
            Themes
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 8px">
            Social media choices
          </Typography>
        </Expandable>
        <Divider color="gold" />
        <Expandable
          indicator={<BiChevronRight color="black" size={48} />}
          header={
            <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
              Item Selection
            </Typography>
          }
        >
          <Typography as="h5" weight="700">
            Printed Items
          </Typography>
          <Typography as="p" margin="0px 0px 1px">
            Color Posters
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 1px">
            Postcards
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 1px">
            Button
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 1px">
            UT Ad (Published Every Tuesday)
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 8px">
            Other (specify)
          </Typography>
          <br />
          <Typography as="h5" weight="700">
            Large Scale Items
          </Typography>
          <Typography as="p" margin="0px 0px 1px">
            Big Banner (22&quot; x 28&quot;)
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 8px">
            Foam Board (20&quot; x 30&quot;)
          </Typography>
          <Typography as="h5" weight="700">
            Signage
          </Typography>
          <Typography as="p" margin="0px 0px 1px">
            Event Signage
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 1px">
            Podium Signage
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 8px">
            Window Decal (CCC - 35&quot; x 28&quot;)
          </Typography>
          <Typography as="p" margin="0px 0px 8px">
            Window Decal (CSI - 33.5&quot; x 30&quot;)
          </Typography>
        </Expandable>
        <Divider color="gold" />
        <Expandable
          indicator={<BiChevronRight color="black" size={48} />}
          header={
            <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
              Social Media
            </Typography>
          }
        >
          <Typography as="p" margin="0px 0px 1px">
            The following questions will ask you to provide information on your
            preferred social media and virtual event platforms. Having
            information like your Zoom link, password, RSVP method or event
            theme will be helpful, but is not required.
          </Typography>
          <br />
          <ol>
            <li>
              <Typography as="p" margin="0px 0px 1px">
                Instagram Post or Story
              </Typography>
            </li>
            <br />
            <li>
              <Typography as="p" margin="0px 0px 1px">
                Facebook Post or Story
              </Typography>
            </li>
            <br />
            <li>
              <Typography as="p" margin="0px 0px 1px">
                Twitter Post
              </Typography>
            </li>
            <br />
            <li>
              <Typography as="p" margin="0px 0px 8px">
                Optional: Zoom, IG Sticker, FB Event Cover
              </Typography>
            </li>
          </ol>
        </Expandable>
      </FluidContainer>
    ),
  },
  {
    title: 'Social Media',
    iconSrc: '/departments/graffix/backoffice/request-images/social-media.svg',
    iconAlt: 'social media',
    children: (
      <FluidContainer
        flex
        flexDirection="column"
        justifyContent="center"
        innerMaxWidth="100%"
      >
        <Expandable
          indicator={<BiChevronRight color="black" size={48} />}
          header={
            <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
              Requirements
            </Typography>
          }
        >
          <Typography as="p" margin="0px 0px 1px">
            Event title
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 1px">
            Series or single event choice
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 1px">
            Event dates and times
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 1px">
            Design options
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 1px">
            Calendar descriptions
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 8px">
            Themes
          </Typography>
        </Expandable>
        <Divider color="gold" />
        <Expandable
          indicator={<BiChevronRight color="black" size={48} />}
          header={
            <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
              Social Media Selection
            </Typography>
          }
        >
          <Typography as="p" margin="0px 0px 1px">
            Instagram Post or Story
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 1px">
            Facebook Post or Story
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 1px">
            Twitter Post
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 8px">
            Optional: Zoom, IG Sticker, FB Event Cover
          </Typography>
        </Expandable>
      </FluidContainer>
    ),
  },
  {
    title: 'Single Item',
    iconSrc: '/departments/graffix/backoffice/request-images/single-item.svg',
    iconAlt: 'single item',
    children: (
      <Expandable
        indicator={<BiChevronRight color="black" size={48} />}
        header={
          <Typography variant="label" as="h3" margin={'0px 0px 1px'}>
            Instructions
          </Typography>
        }
      >
        <Typography as="p" margin="0px 0px 8px">
          Please provide correct spelling/punctuation. Graffix will not be
          responsible for incorrect information on submission.
        </Typography>
        <Typography as="p" margin="0px 0px 8px">
          Submit all photos, text copy, graphic elements, concepts and layout to
          be used in U-SU Marketing. Please have everything ready at the time of
          the request.
        </Typography>
      </Expandable>
    ),
  },
  {
    title: 'Shirt',
    iconSrc: '/departments/graffix/backoffice/request-images/shirt.svg',
    iconAlt: 'shirt',
    children: (
      <div>
        <Expandable
          indicator={<BiChevronRight color="black" size={48} />}
          header={
            <Typography variant="label" as="h3" margin={'0px 0px 1px'}>
              Instructions
            </Typography>
          }
        >
          <ol>
            <li>
              <Typography as="p" margin="0px 0px 1px">
                Completely fill out form or it will be returned unprocessed.
              </Typography>
            </li>
            <br />
            <li>
              <Typography as="p" margin="0px 0px 1px">
                T-shirt (silkscreen/embroidery) production requires at least 7-9
                working days.
              </Typography>
            </li>
            <br />
            <li>
              <Typography as="p" margin="0px 0px 1px">
                Price quote and press check require an additional 1 week.
              </Typography>
            </li>
            <br />
            <li>
              <Typography as="p" margin="0px 0px 1px">
                We require at least 2-3 weeks for each project (NOT including
                production time).
              </Typography>
            </li>
            <br />
            <li>
              <Typography as="p" margin="0px 0px 1px">
                Minimum order of 50 shirts per request.
              </Typography>
            </li>
            <br />
            <li>
              <Typography as="p" margin="0px 0px 1px">
                Request is subject to approval.
              </Typography>
            </li>
            <br />
            <li>
              <Typography as="p" margin="0px 0px 1px">
                Please provide correct spelling/punctuation. Graffix will not be
                responsible for incorrect information on submission.
              </Typography>
            </li>
            <br />
            <li>
              <Typography as="p" margin="0px 0px 1px">
                Submit all photos, text copy, graphic elements, concepts &
                layout to be used in U-SU Marketing. Please have everything
                ready at the time of the request.
              </Typography>
            </li>
          </ol>
        </Expandable>
      </div>
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
            margin={isMobile ? `${Spaces.md} 0 ${Spaces.md} 0` : `0 0}`}
          >
            Graffix Backoffice
          </Typography>
          <Typography
            as="p"
            variant="title"
            size={isDesktop ? 'lg' : isTablet ? 'xl' : '2xl'}
          >
            Requests for Graphics
            <br />
            Summer and Fall 2023
          </Typography>
          <Button href="https://form.jotform.com/222994969107168" margin="16px">
            Request Form
          </Button>
        </HeaderContainer>
      </SideImageHeader>
      <FluidContainer>
        <Typography as="h2" variant="title" size={isMobile ? 'lg' : '2xl'}>
          Types of Requests
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
                  Marketing Guidelines
                </Typography>
              }
            >
              <ol>
                <li>
                  All event marketing for the U-SU departments is required to be
                  designed by the Graffix Department unless it is a
                  collaboration with a campus partner that is handling the
                  designs
                </li>
                <li>
                  If U-SU logos are being used in the marketing, the director is
                  required to approve it.
                  <ul>
                    <li>
                      Content Marketing on social media does not require a
                      graphics request, but the use of any logos will need the
                      approval of the director.
                    </li>
                  </ul>
                </li>
                <li>
                  We request that you all use our vendor, but we understand
                  pricing might be an issue.
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
      </FluidContainer>
      <FluidContainer>
        <Typography as="h2" variant="title" size={isMobile ? 'lg' : '2xl'}>
          What Programmers Will Receive From Graffix
        </Typography>
        <Typography as="h3" variant="titleSmall" size={isMobile ? 'md' : 'lg'}>
          Individual Spreadsheet:
        </Typography>
        <ol>
          <li>Event Info</li>
          <li>Designer Assignment</li>
          <li>
            Designer Email
            <ul>
              <li>
                The designers will add their schedules to Outlook. That way, you
                all can set up a meeting with them when you need to Designers
                will set the first meeting to talk about concepts if requested
                on the graphics request form.
              </li>
              <li>
                No design project status or updates related walk-ins are allowed
                without a previous meeting scheduled.
              </li>
              <li>
                The designers don’t have the authority to change the scope of
                any design project.
              </li>
              <li>
                All things print, the Director or Graphics Coordinator will
                handle approvals on adding to the scope of the work.
              </li>
              <li>
                All things web, the web designer will handle approvals on adding
                to the scope of the project.
              </li>
            </ul>
          </li>
        </ol>
        <Typography as="h3" variant="titleSmall" size={isMobile ? 'md' : 'lg'}>
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
        <Typography as="h3" variant="titleSmall" size={isMobile ? 'md' : 'lg'}>
          Important Dates:
        </Typography>
        <ol>
          <li>First Draft</li>
          <li>Send to Print</li>
          <li>Target Completion Date</li>
          <li>Event Date</li>
          <li>Sign Up Dates (if there is one) Start and End</li>
          <li>
            If any event requests come up after the deadline, we require a
            minimum of six weeks for design and marketing time.
          </li>
        </ol>
        <Typography as="h3" variant="titleSmall" size={isMobile ? 'md' : 'lg'}>
          Promotional Items Notes:
        </Typography>
        <ol>
          <li>
            We will give you the site we use for promo items so you can browse
            based on your budget.
          </li>
          <li>
            When submitting an apparel request, we ask that you also offer a
            budget range so we can work within your desired scope.
          </li>
          <li>Sometimes we need to make quick decisions about your request</li>
          <li>
            There is a chain supply shortage going on right now where things are
            flying off the shelf, and waiting might change an item being there
            or not.
          </li>
        </ol>
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
