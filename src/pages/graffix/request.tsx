import Head from 'next/head';
import { useState } from 'react';
import styled from 'styled-components';
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md';
import graffixData from 'data/graffixRequest.json';
import { Colors, Spaces, media } from 'theme';
import { useBreakpoint } from 'hooks';
import { TableData } from 'types';
import {
  Button,
  Card,
  FluidContainer,
  Gallery,
  GalleryImage,
  Image,
  Table,
  Typography,
} from 'components';
import {
  GenericModal,
  // GraffixGuidelines,
  Page,
  UtilityHeroHeader,
} from 'modules';

interface PackageSection {
  label: string;
  items: string[];
}

interface PackageEntry {
  title: string;
  subtitle: string;
  iconSrc: string;
  sections: PackageSection[];
}

const feesData = graffixData.feesTable as unknown as TableData;

const galleryImages: GalleryImage[] = graffixData.gallery.map((item) => ({
  src: item.src,
  alt: item.alt,
  title: item.title,
  caption: `${item.designer} — ${item.description}`,
}));

const PackageContainer = styled.button`
  ${media('tablet')(`min-width: 100%;`)}
  min-width: calc(33.33% - 8px);
  flex: 1;
  margin: ${Spaces.lg} 0;
  cursor: pointer;
  border-radius: 4px;
  background: none;
  border: none;
  padding: 0;
  text-align: left;
  &:focus-visible {
    outline: 3px solid ${Colors.primary};
    outline-offset: 4px;
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${Spaces.xl};
  ${media('tablet')(`grid-template-columns: 1fr;`)}
`;

const ContactCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: ${Spaces.xl};
  display: flex;
  flex-direction: column;
  gap: ${Spaces.sm};
`;

const IconRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${Spaces.sm};
`;

const StepList = styled.ol`
  padding-left: ${Spaces.xl};
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${Spaces.sm};
`;

export default function RequestGuide() {
  const { isMobile, isDesktop } = useBreakpoint();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPkg, setModalPkg] = useState<PackageEntry | null>(null);

  const openModal = (pkg: PackageEntry) => {
    setModalPkg(pkg);
    setModalOpen(true);
  };

  return (
    <Page>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Graphics Request Guide | Cal State LA U-SU</title>
        <meta
          name="author"
          content="The University Student Union Graffix Department"
          key="author"
        />
        <meta
          name="description"
          content="Learn how to request professional marketing materials from the U-SU Graffix department at Cal State LA. View packages, timelines, fees, and portfolio examples."
          key="description"
        />
        <meta
          property="og:title"
          content="Graffix Request Guide | Cal State LA U-SU"
          key="og-title"
        />
        <meta
          property="og:description"
          content="Request professional marketing materials from the U-SU Graffix department. View packages, timelines, and portfolio work."
          key="og-desc"
        />
        <meta property="og:type" content="website" key="og-type" />
        <link
          rel="canonical"
          href="https://www.calstatelausu.org/graffix/request-guide"
        />
      </Head>

      <UtilityHeroHeader
        src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/backgrounds/subtle-background-4.webp"
        alt=""
        title="Graphics Request Guide"
        description="Your guide to requesting professional marketing materials from the U-SU Graffix department at Cal State LA."
        height="60vh"
        minHeight="340px"
      />

      {/* Contact & Location */}
      <FluidContainer backgroundColor="primary">
        <Typography as="h2" variant="title" margin={`0 0 ${Spaces.xl} 0`}>
          Contact &amp; Location
        </Typography>
        <ContactGrid>
          <ContactCard>
            <Typography variant="label" as="h3">
              Robert
            </Typography>
            <Typography as="p" size="xs">
              Director of Graphics and Marketing
            </Typography>
            <IconRow>
              <MdEmail size={18} aria-hidden="true" />
              <a
                href="mailto:rgonza282@calstatela.edu"
                aria-label="Email Rob Gonzalez from the Graffix department"
              >
                <Typography as="span" size="xs">
                  rgonza282@calstatela.edu
                </Typography>
              </a>
            </IconRow>
            <IconRow>
              <MdPhone size={18} aria-hidden="true" />
              <Typography as="span" size="xs">
                Ext. 3-6010
              </Typography>
            </IconRow>
            <Button
              href="mailto:rgonza282@calstatela.edu"
              variant="black"
              margin={`${Spaces.sm} 0 0 0`}
            >
              Email
            </Button>
          </ContactCard>

          <ContactCard>
            <Typography variant="label" as="h3">
              Sam
            </Typography>
            <Typography as="p" size="xs">
              Graphics Coordinator
            </Typography>
            <IconRow>
              <MdEmail size={18} aria-hidden="true" />
              {/* TODO: Replace with Sam's direct email address */}
              <a
                href="mailto:hjuare13@calstatela.edu"
                aria-label="Email Sam Juarez from the Graffix department"
              >
                <Typography as="span" size="xs">
                  hjuare13@calstatela.edu
                </Typography>
              </a>
            </IconRow>
            <IconRow>
              <MdPhone size={18} aria-hidden="true" />
              <Typography as="span" size="xs">
                Ext. 3-2463
              </Typography>
            </IconRow>
            <Button
              href="mailto:hjuare13@calstatela.edu"
              variant="black"
              margin={`${Spaces.sm} 0 0 0`}
            >
              Email
            </Button>
          </ContactCard>

          <ContactCard>
            <Typography variant="label" as="h3">
              Find Us
            </Typography>
            <IconRow>
              <MdLocationOn size={18} aria-hidden="true" />
              <address style={{ fontStyle: 'normal' }}>
                <Typography as="span" size="xs">
                  5154 State University Dr., U-SU Room 204B, 2nd Floor
                  <br />
                  Los Angeles, CA 90032
                </Typography>
              </address>
            </IconRow>
            <IconRow>
              <MdPhone size={18} aria-hidden="true" />
              <a
                href="tel:+13233432464"
                aria-label="Call Graffix at (323) 343-2464"
              >
                <Typography as="span" size="xs">
                  (323) 343-2464
                </Typography>
              </a>
            </IconRow>
            <Typography as="p" size="xs" margin={`${Spaces.sm} 0 0 0`}>
              <span aria-label="Monday to Friday">Mon&ndash;Fri</span>: 8:00 AM
              to 5:00 PM
            </Typography>
          </ContactCard>
        </ContactGrid>
      </FluidContainer>

      {/* Who Can Request */}
      <FluidContainer>
        <Typography as="h2" variant="title" margin={`0 0 ${Spaces.md} 0`}>
          Making a Graphics Request
        </Typography>
        <Typography as="p" margin={`0 0 ${Spaces.md} 0`}>
          The U-SU Graffix Department provides professional marketing and design
          services to Cal State LA faculty and staff. Whether you need event
          posters, social media graphics, banners, or promotional merchandise,
          our award-winning team is here to help bring your vision to life.
        </Typography>

        <Typography
          as="h3"
          variant="labelTitle"
          margin={`${Spaces.lg} 0 ${Spaces.md} 0`}
        >
          Who Can Submit a Request?
        </Typography>
        <Typography as="p" margin={`0 0 ${Spaces.md} 0`}>
          This service is available to Cal State LA faculty, staff, and
          departments located outside of the University-Student Union. All
          requests are reviewed by our full-time Graffix staff to ensure quality
          and feasibility before work begins.
        </Typography>

        <Typography
          as="h3"
          variant="labelTitle"
          margin={`${Spaces.lg} 0 ${Spaces.md} 0`}
        >
          How It Works
        </Typography>
        <StepList>
          <li>
            <Typography as="p">
              Review the request packages below and identify which best fits
              your needs.
            </Typography>
          </li>
          <li>
            <Typography as="p">
              Contact Rob or Sam (see above) to discuss your project and receive
              the graphics request form link.
            </Typography>
          </li>
          <li>
            <Typography as="p">
              Complete the form with all required information: event details,
              dates, theme, color preferences, and any reference images.
            </Typography>
          </li>
          <li>
            <Typography as="p">
              Allow the required turnaround time. Most requests need at least 3
              to 8 weeks depending on the package.
            </Typography>
          </li>
        </StepList>
      </FluidContainer>

      {/* Request Packages */}
      <FluidContainer
        backgroundColor="greyLightest"
        flex
        flexDirection="column"
      >
        <Typography as="h2" variant="title" margin={`0 0 ${Spaces.xs} 0`}>
          Request Packages
        </Typography>
        <Typography as="p" margin={`0 0 ${Spaces.xl} 0`} color="greyDark">
          Click on any package to see what&apos;s included
        </Typography>
        <FluidContainer
          flex
          flexWrap="wrap"
          justifyContent="space-between"
          padding="0"
          backgroundColor="greyLightest"
        >
          {(graffixData.packages as PackageEntry[]).map((pkg) => (
            <PackageContainer
              key={pkg.title}
              type="button"
              onClick={() => openModal(pkg)}
              aria-label={`Open details for ${pkg.title}: ${pkg.subtitle}`}
            >
              <Card
                topBorder
                iconSrc={pkg.iconSrc}
                iconAlt=""
                title={pkg.title}
                margin={`${Spaces.md}`}
                minHeight="100%"
              >
                <Typography as="p" size="xs" color="greyDark">
                  {pkg.subtitle}
                </Typography>
              </Card>
            </PackageContainer>
          ))}
        </FluidContainer>
      </FluidContainer>

      {/* <GraffixGuidelines /> */}

      {/* Item Selection Examples */}
      <FluidContainer backgroundColor="greyLightest">
        <Typography as="h2" variant="title" margin={`0 0 ${Spaces.xl} 0`}>
          Item Selection Examples
        </Typography>
        <FluidContainer
          flex
          flexWrap="wrap"
          padding="0"
          justifyContent="space-between"
          backgroundColor="greyLightest"
        >
          {graffixData.items.map((item) => (
            <Card
              width={isMobile ? '100%' : '45%'}
              key={item.title}
              margin={`${Spaces.md} 0`}
            >
              <Image src={item.src} alt={item.alt} width="100%" />
              <Typography as="p">{item.title}</Typography>
            </Card>
          ))}
        </FluidContainer>
      </FluidContainer>

      {/* Portfolio Gallery */}
      <FluidContainer flexDirection="column" flex>
        <Typography as="h2" variant="title" margin={`0 0 ${Spaces.xs} 0`}>
          Our Work
        </Typography>
        <Typography as="p" margin={`0 0 ${Spaces.xl} 0`} color="greyDark">
          Browse a selection of our projects
        </Typography>
        <Gallery
          images={galleryImages}
          aria-label="Graffix portfolio gallery"
        />
      </FluidContainer>

      {/* Fees */}
      <FluidContainer backgroundColor="greyLightest">
        <Table data={feesData} />
      </FluidContainer>

      {/* CTA */}
      <FluidContainer
        flex
        flexDirection="column"
        alignItems="center"
        backgroundColor="black"
      >
        <Typography
          as="h2"
          variant="titleLarge"
          color="white"
          margin={`0 0 ${Spaces.md} 0`}
          style={{ textAlign: 'center' }}
        >
          Ready to Get Started?
        </Typography>
        <Typography
          as="p"
          color="white"
          margin={`0 0 ${Spaces.xl} 0`}
          style={{ textAlign: 'center', maxWidth: '560px' }}
        >
          Contact Rob or Sam to receive the graphics request form and begin your
          project. Our team looks forward to collaborating with you!
        </Typography>
        <FluidContainer
          flex
          gap={Spaces.md}
          justifyContent="center"
          flexWrap="wrap"
          padding="0"
          backgroundColor="black"
        >
          <Button href="mailto:rgonza282@calstatela.edu">Email Rob</Button>
          <Button href="mailto:hjuare13@calstatela.edu">Email Sam</Button>
        </FluidContainer>
      </FluidContainer>

      {/* Package modal */}
      {modalPkg && (
        <GenericModal
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
          width={isDesktop ? '500px' : '25vw'}
        >
          <Typography variant="titleSmall" as="h2">
            {modalPkg.title}
          </Typography>
          <Typography as="p" color="greyDark">
            {modalPkg.subtitle}
          </Typography>
          <FluidContainer
            flex
            flexDirection="column"
            justifyContent="center"
            innerMaxWidth="100%"
            padding="0"
          >
            {modalPkg.sections.map((section) => (
              <div key={section.label}>
                <Typography
                  variant="label"
                  as="h3"
                  margin={`${Spaces.sm} 0 ${Spaces.xs} 0`}
                >
                  {section.label}
                </Typography>
                {section.items.map((item) => (
                  <Typography as="p" key={item}>
                    {item}
                  </Typography>
                ))}
              </div>
            ))}
          </FluidContainer>
        </GenericModal>
      )}
    </Page>
  );
}
