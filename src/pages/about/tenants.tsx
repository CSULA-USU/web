import Head from 'next/head';
import { Fragment, ReactNode, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  MdChevronRight,
  MdEmail,
  MdLanguage,
  MdPhone,
  MdPlace,
  MdSchedule,
} from 'react-icons/md';
import { Page, GenericModal, Header } from 'modules';
import { toKebabCase } from 'utils/stringhelpers';
import {
  formatTime,
  formatWeekdays,
  groupHoursByValidity,
  OpeningHours,
  toOpeningHoursSpecification,
} from 'utils/openingHours';
import { Colors, FontSizes, Spaces, media } from 'theme';
import { useImageLoading } from 'hooks';
import {
  Button,
  CopyButton,
  FluidContainer,
  Image,
  PageMeta,
  Panel,
  SITE_URL,
  Skeleton,
  StyledLink,
  Typography,
} from 'components';

type TenantCategory = 'Dining' | 'Organizations & Services' | 'Shopping';

interface Tenant {
  name: string;
  category: TenantCategory;
  /** schema.org type for this tenant, so each one is indexed as what it is. */
  schemaType: string;
  /** Full copy. Rendered in the card and the modal, and fed to structured data. */
  description: string;
  /** The tenant name sits beside the logo in every place it renders, so the
   * image is decorative and always gets an empty alt. */
  logoSrc: string;
  /**
   * Tile color behind the logo. Defaults to white — set any theme color when
   * a white or light mark would otherwise disappear into it.
   */
  logoBackgroundColor?: keyof typeof Colors;
  /**
   * Where in the building, e.g. 'Room 204' or '3rd Floor'. Shown in the modal
   * only — deliberately kept off the card, which stays a short pitch. Named for
   * the building rather than just `location`, which would read as coordinates
   * and collides with the schema.org `location` key this page also emits.
   * Appended to the street address in structured data, matching how the GSRC and
   * FSL pages do it.
   */
  locationInBuilding?: string;
  phone?: string;
  email?: string;
  website?: string;
  /**
   * Shorter label for the website link, for when the bare URL is long enough to
   * look bad on a phone. Falls back to the stripped-down URL. Only the visible
   * text changes — `website` is still the href, and it is `website` that goes to
   * Google as `url`. Make it say where the link goes ('Food Pantry page' rather
   * than 'here'), since the link text is what a screen reader announces.
   */
  websiteText?: string;
  /** Omit when we have no confirmed hours; nothing renders and nothing is indexed. */
  hours?: OpeningHours[];
  /**
   * A single photo of the space, shown in the modal between the name and the
   * description. Unlike the logo, it carries information nothing else on the
   * page does, so `alt` has to be real description rather than empty. Also
   * published to Google in the structured data alongside the logo, so only use
   * an image meant to be public. The banner is a 2:1 box, so crop to that —
   * anything taller is trimmed top and bottom to fit.
   */
  headerImage?: { src: string; alt: string };
}

const USU_POSTAL_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: '5154 State University Dr',
  addressLocality: 'Los Angeles',
  addressRegion: 'CA',
  postalCode: '90032',
} as const;

// `phone`, `email`, `website`, and `hours` are all optional — a tenant only
// shows the rows it has data for. Anything left off here is a detail we have not
// confirmed with the tenant yet, not one that was forgotten; fill it in and the
// card, the modal, and the structured data all pick it up automatically.
//
// See "Editing Tenants" in the README for the full field reference. Note
// that these values are published as schema.org structured data, so a guessed
// value is asserted to Google as fact — leave a field off instead.
const TENANTS: Tenant[] = [
  {
    name: 'Starbucks',
    category: 'Dining',
    schemaType: 'CafeOrCoffeeShop',
    description:
      'It takes many hands to craft the perfect cup of coffee: from the farmers who tend to the red-ripe coffee cherries, to the master roasters who coax the best from every bean, and to the barista who serves it with care. We are committed to the highest standards of quality and service, embracing our heritage while innovating to create new experiences to savor.',
    logoBackgroundColor: 'greyLightest',
    logoSrc: '/about/tenants/starbucks-logo.png',
    phone: '(323) 343-6793',
    website: '',
    // Confirmed hours go here. Scope each span to the term it applies to, and
    // add the next window when it is known — spans sharing dates group together:
    // hours: [
    //   {
    //     days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    //     opens: '07:00',
    //     closes: '19:00',
    //     validFrom: '2026-08-24',
    //     validThrough: '2026-12-18',
    //   },
    //   {
    //     days: ['Friday'],
    //     opens: '07:00',
    //     closes: '15:30',
    //     validFrom: '2026-08-24',
    //     validThrough: '2026-12-18',
    //   },
    // ],
  },
  {
    name: 'Sbarro',
    category: 'Dining',
    schemaType: 'Restaurant',
    description:
      'Extraordinary food and atmosphere, time-honored family recipes and the finest quality ingredients are the hallmarks of the Sbarro brand. From the moment our customers walk through the door, they know that dining at Sbarro will be a distinctive Italian experience.',
    logoBackgroundColor: 'greyLightest',
    logoSrc: '/about/tenants/sbarro-logo.png',
    phone: '(323) 225-1464',
    website: '',
  },
  {
    name: 'Associated Students, Inc.',
    category: 'Organizations & Services',
    schemaType: 'NonprofitOrganization',
    description:
      'Associated Students, Incorporated (ASI) is a non-profit student-run auxiliary governed by a Board of Directors elected by the student body of Cal State LA.',
    logoBackgroundColor: 'greyLightest',
    logoSrc: '/about/tenants/asi-logo.png',
    phone: '(323) 343-4780',
  },
  {
    name: 'Alumni Association',
    category: 'Organizations & Services',
    schemaType: 'Organization',
    description:
      'Cal State LA Alumni Association is dedicated to past and present students desiring to stay involved in the Cal State LA community.',
    logoBackgroundColor: 'greyLightest',
    logoSrc: '/calstatela-badge.svg',
    phone: '(323) 343-2586',
  },
  {
    name: 'Cal State LA Food Pantry',
    category: 'Organizations & Services',
    schemaType: 'Organization',
    description:
      'The Cal State LA Food Pantry provides access to fresh produce, perishable, and nonperishable foods. The pantry is a no-cost service to currently enrolled, degree-seeking Cal State LA students experiencing food insecurity. While it is closed for the summer, we are bringing food access to the campus community through our Pop-Up Food Distributions!',
    locationInBuilding: '3rd Floor',
    logoSrc:
      'https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/tenants/FoodPantryLogo_360x214.png',
    logoBackgroundColor: 'greyDarkest',
    phone: '',
    headerImage: {
      src: 'https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/tenants/Food%20Pantry%201200x600.jpg',
      alt: 'Food Pantry volunteers distributing food to students at the 3rd floor of the U-SU',
    },
    website:
      'https://www.calstatela.edu/deanofstudents/cal-state-la-food-pantry',
    websiteText: 'Food Pantry page',
  },
  {
    name: 'In the Making',
    category: 'Shopping',
    schemaType: 'NonprofitOrganization',
    description:
      'In the Making is a nonprofit organization serving as a community resource center providing clothing and household items to individuals, groups and organizations as well as being a source for youth capacity building in a nonprofit environment. Our programs form partnerships with schools, corporations and government agencies in order to serve the community.',
    logoBackgroundColor: 'greyLightest',
    logoSrc:
      'https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/tenants/ITM_logo_black.png',
    phone: '(323) 350-1331',
    website: 'https://www.inthemakingla.org/',
    websiteText: 'In the Making website',
  },
];

// Alphabetical is the default order for a rendered list here. Sorted once, so
// the cards and the structured-data positions cannot drift apart, and so a
// tenant appended to TENANTS lands in the right place without anyone noticing.
// The explicit 'en' locale keeps the comparison identical on the server and in
// the browser — an unqualified localeCompare risks a hydration mismatch.
const TENANTS_ALPHABETICAL = [...TENANTS].sort((a, b) =>
  a.name.localeCompare(b.name, 'en'),
);

const CATEGORY_ORDER: TenantCategory[] = [
  'Dining',
  'Organizations & Services',
  'Shopping',
];

const CATEGORY_DESCRIPTIONS: Record<TenantCategory, string> = {
  Dining:
    'Grab coffee between classes or sit down for lunch without ever having to leave the building. Both of our eateries are inside the U-SU and open to students, staff, and visitors.',
  'Organizations & Services':
    'Student government, alumni, and community partners keep offices in the U-SU, which means the people behind these programs are a walk down the hall rather than an email away.',
  Shopping:
    'Secondhand clothing and household goods, without ever leaving campus.',
};

const digitsOf = (phone: string) => phone.replace(/\D/g, '');

/** schema.org wants E.164; the tenants list stores the human-readable form. */
const toE164 = (phone: string) => `+1${digitsOf(phone)}`;

const toAbsoluteUrl = (src: string) =>
  src.startsWith('http') ? src : `${SITE_URL}${src}`;

const toDisplayUrl = (url: string) =>
  url
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '');

interface TenantContactLink {
  icon: ReactNode;
  href: string;
  text: string;
  isExternalLink?: boolean;
  /** Present for values worth putting on the clipboard rather than dialing. */
  copy?: { value: string; label: string };
}

const buildContactLinks = (tenant: Tenant): TenantContactLink[] => {
  const links: TenantContactLink[] = [];

  if (tenant.phone) {
    links.push({
      icon: <MdPhone />,
      href: `tel:${toE164(tenant.phone)}`,
      text: tenant.phone,
      copy: { value: tenant.phone, label: 'phone number' },
    });
  }

  if (tenant.email) {
    links.push({
      icon: <MdEmail />,
      href: `mailto:${tenant.email}`,
      text: tenant.email,
      copy: { value: tenant.email, label: 'email address' },
    });
  }

  if (tenant.website) {
    links.push({
      icon: <MdLanguage />,
      href: tenant.website,
      text: tenant.websiteText || toDisplayUrl(tenant.website),
      isExternalLink: true,
    });
  }

  return links;
};

/**
 * Every image we can offer a crawler for this tenant: the logo first, then the
 * header photo. Empty entries drop out, so a tenant with no logo still
 * contributes its photo and vice versa — and an empty result means the `image`
 * key is left off rather than pointing at the site root.
 */
const imageUrlsFor = (tenant: Tenant) =>
  [tenant.logoSrc, tenant.headerImage?.src]
    .filter((src): src is string => Boolean(src))
    .map(toAbsoluteUrl);

/**
 * The tenant's own address: the building, plus its room or level when we know
 * it. Follows the pattern already used on the GSRC and FSL pages, where the room
 * is folded into streetAddress rather than carried in a separate field.
 */
const postalAddressFor = (tenant: Tenant) =>
  tenant.locationInBuilding
    ? {
        ...USU_POSTAL_ADDRESS,
        streetAddress: `${USU_POSTAL_ADDRESS.streetAddress}, ${tenant.locationInBuilding}`,
      }
    : USU_POSTAL_ADDRESS;

// Every tenant lands in the ItemList with its full description and whatever
// contact details it has, so search engines see the same content a visitor gets
// from opening a card — the modal itself is not in the DOM until it is opened.
const tenantsStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'University-Student Union Tenants and Dining',
  description:
    'Directory of the dining, student government, alumni, and community organizations located inside the University-Student Union at Cal State LA.',
  itemListElement: TENANTS_ALPHABETICAL.map((tenant, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': tenant.schemaType,
      name: tenant.name,
      description: tenant.description,
      ...(imageUrlsFor(tenant).length && { image: imageUrlsFor(tenant) }),
      address: postalAddressFor(tenant),
      // The containing building, so its address deliberately stays room-free —
      // the U-SU is not located in Room 204; this tenant is.
      location: {
        '@type': 'Place',
        name: 'University-Student Union at Cal State LA',
        address: USU_POSTAL_ADDRESS,
      },
      ...(tenant.phone && { telephone: toE164(tenant.phone) }),
      ...(tenant.email && { email: tenant.email }),
      ...(tenant.website && { url: tenant.website }),
      ...(tenant.hours?.length && {
        openingHoursSpecification: toOpeningHoursSpecification(tenant.hours),
      }),
    },
  })),
};

const TenantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${Spaces.lg};
  width: 100%;

  ${media('desktop')(`grid-template-columns: repeat(2, 1fr);`)}
  ${media('mobile')(`grid-template-columns: 1fr;`)}
`;

// A short there-and-back nudge rather than a drift, so the chevron reads as
// "there's more this way" without traveling far enough to be distracting.
const nudgeChevron = keyframes`
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(4px); }
`;

// Its own element so it can animate independently of the label, and so the icon
// centers against the text rather than sitting on the maths baseline the way a
// literal '>' would. Sized like ContactIcon for consistency within the page.
const DetailsChevron = styled.span`
  display: inline-flex;
  font-size: 18px;
  flex-shrink: 0;
`;

/**
 * Lift-and-shadow on hover, matching StaffCard's HoverPanel so the two
 * card-opens-a-modal patterns on the site behave identically, plus the gold bar
 * along the top edge.
 *
 * The bar is a transparent border that is always present and only gains color
 * on hover — adding a 5px border on hover instead would shove the card's
 * contents down by 5px every time the pointer crossed it.
 *
 * Everything keys off `:focus-within` as well as `:hover`, so tabbing to the
 * "More" button gets the same feedback a mouse does.
 */
const TenantCard = styled.div`
  cursor: pointer;
  height: 100%;

  > div {
    height: 100%;
    border-top: 5px solid transparent;
    transition: transform 0.2s ease, box-shadow 0.2s ease,
      border-top-color 0.2s ease;
  }

  &:hover > div,
  &:focus-within > div {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
    border-top-color: ${Colors.primary};
  }

  &:hover ${DetailsChevron}, &:focus-within ${DetailsChevron} {
    animation: ${nudgeChevron} 0.9s ease-in-out infinite;
  }

  /* The looping arrow is the part that matters here — an indefinite animation is
     what troubles vestibular sensitivity. The color and shadow cues stay, so
     hover is still obviously hover without anything moving. */
  @media (prefers-reduced-motion: reduce) {
    &:hover ${DetailsChevron}, &:focus-within ${DetailsChevron} {
      animation: none;
    }

    &:hover > div,
    &:focus-within > div {
      transform: none;
    }
  }
`;

const TenantCardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spaces.md};
  width: 100%;
`;

// A fixed-height tile behind the logos, so marks that differ wildly in shape
// and size still line up at the same optical size across the grid. White by
// default; takes any theme color so a white or light logo can get a backdrop
// it actually reads against. Transient prop so it does not reach the DOM.
const LogoFrame = styled.div<{ $backgroundColor?: keyof typeof Colors }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 88px;
  padding: ${Spaces.sm} ${Spaces.md};
  background-color: ${(p) => Colors[p.$backgroundColor ?? 'white']};
  border-radius: 8px;

  /* Sized here rather than through Image's width/height props: those are real
     <img> attributes, and a percentage in them is invalid HTML the browser
     throws away. Letting the intrinsic size shrink to fit letterboxes each
     logo inside the tile without distorting it. */
  img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
  }
`;

// Clamps the blurb to keep the grid even while leaving the full text in the
// markup for crawlers. A JS substring would drop it from the page entirely.
const ClampedDescription = styled.div`
  p {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

// Font size and padding live here instead of Button's fontSize/padding props,
// which leak onto the rendered <button> as stray attributes.
const DetailsButton = styled(Button)`
  /* Flex row so the chevron centers against the label instead of riding the
     text baseline. The gap replaces the space that used to sit in the JSX. */
  display: inline-flex;
  align-items: center;
  gap: ${Spaces.xs};
  padding: ${Spaces.sm} 0;
  font-size: 14px;

  &:focus-visible {
    outline: 2px solid ${Colors.gold};
    outline-offset: 2px;
  }
`;

const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: ${Spaces.sm};
`;

const ContactRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${Spaces.sm};
  color: ${Colors.greyDarkest};
`;

const ContactIcon = styled.span`
  display: inline-flex;
  color: ${Colors.black};
  font-size: 20px;
  /* Hours can run to several lines; the clock keeps its size beside them. */
  flex-shrink: 0;
`;

// A description list is the honest markup for day/time pairs. The two columns
// keep the times aligned under each other instead of ragging off the day labels.
const HoursList = styled.dl`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: center;
  gap: ${Spaces.xs} ${Spaces.sm};
  margin: 0;
  font-size: ${FontSizes.xs};
  line-height: 1.5;
`;

const HoursDays = styled.dt`
  margin: 0;
  text-align: right;
  font-weight: 700;
  color: ${Colors.greyDarkest};
`;

const HoursTime = styled.dd`
  margin: 0;
  text-align: left;
  color: ${Colors.greyDark};
  white-space: nowrap;
`;

const HoursCaption = styled.p`
  margin: 0 0 ${Spaces.xs};
  font-size: ${FontSizes['2xs']};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: ${Colors.gold};
`;

const HoursGroups = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spaces.md};
`;

const OpeningHoursList = ({ hours }: { hours: OpeningHours[] }) => (
  <HoursGroups>
    {groupHoursByValidity(hours).map((group) => (
      <div key={group.caption || 'year-round'}>
        {group.caption && <HoursCaption>{group.caption}</HoursCaption>}
        <HoursList>
          {group.spans.map((span) => (
            <Fragment key={`${span.days.join()}-${span.opens}`}>
              <HoursDays>{formatWeekdays(span.days)}</HoursDays>
              <HoursTime>
                {`${formatTime(span.opens)} – ${formatTime(span.closes)}`}
              </HoursTime>
            </Fragment>
          ))}
        </HoursList>
      </div>
    ))}
  </HoursGroups>
);

// On the card the hours sit inline under the name, clock icon to the left.
const CardHours = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${Spaces.sm};

  ${HoursList} {
    justify-content: start;
  }

  ${HoursCaption} {
    text-align: left;
  }
`;

const SectionNav = styled.nav`
  display: flex;
  margin-top: ${Spaces.lg};
  flex-wrap: wrap;
  justify-content: center;
  gap: ${Spaces.sm};
  width: 100%;
`;

// scroll-margin keeps the heading clear of the top of the viewport when a nav
// link jumps to it, rather than butting it against the edge.
const CategorySection = styled.section`
  scroll-margin-top: ${Spaces.xl};
`;

// Sits directly under the name, so it reads as part of the tenant's identity
// rather than as another contact method.
const ModalLocation = styled.p`
  display: flex;
  align-items: center;
  gap: ${Spaces.sm};
  margin: ${Spaces.sm} 0 0;
  color: ${Colors.greyDarkest};
`;

/**
 * Full-bleed banner across the modal, held at the 2:1 crop header images are
 * authored to. The ratio — rather than the image's own intrinsic height — is
 * what reserves the space, so the skeleton and the photo that replaces it fill
 * exactly the same box and nothing below the banner moves when it loads. A crop
 * that is a little off 2:1 gets trimmed rather than letterboxed; if we ever take
 * on a header image that is deliberately a different shape, this becomes a ratio
 * carried on the tenant's `headerImage` instead of a constant here.
 */
const ModalHeaderImage = styled.div`
  width: 100%;
  aspect-ratio: 2 / 1;
  margin-top: ${Spaces.md};
  border-radius: 8px;
  overflow: hidden;
  /* Kills the inline descender gap that would otherwise show under the image. */
  line-height: 0;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ModalSection = styled.div`
  width: 100%;
  margin-top: ${Spaces.lg};
  padding-top: ${Spaces.lg};
  border-top: 1px solid ${Colors.greyLighter};
`;

/**
 * Fills its frame with a shimmer until the image has decoded, then swaps the
 * image in. Both states are 100% of the frame, so it is the frame that has to
 * reserve the height — LogoFrame's fixed tile and ModalHeaderImage's 2:1 ratio
 * both do, which is what keeps the swap from shifting the modal's contents.
 *
 * Only the modal needs this: it mounts on open, so its images start loading
 * after the dialog is already on screen. The cards render with the page and are
 * lazy-loaded inside a fixed tile, so they have nothing to shift.
 */
const ImageWithSkeleton = ({ src, alt }: { src: string; alt: string }) => {
  const isLoading = useImageLoading(src);

  return isLoading ? (
    <Skeleton width="100%" height="100%" />
  ) : (
    <Image src={src} alt={alt} />
  );
};

export default function Tenants() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);

  const openTenant = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setIsOpen(true);
  };

  const contactLinks = selectedTenant ? buildContactLinks(selectedTenant) : [];

  return (
    <Page>
      <PageMeta
        title="Tenants | Cal State LA U–SU"
        description="Starbucks, Sbarro, Associated Students Inc., the Cal State LA Alumni Association, Cal State LA Food Pantry, and In the Making all rent space inside the University-Student Union. Find what each one offers, plus phone numbers and websites."
        path="/about/tenants"
        socialTitle="Who You'll Find Inside the U-SU"
        socialDescription="Coffee, pizza, student government, alumni, and community partners all under one roof at the University-Student Union at Cal State LA."
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(tenantsStructuredData),
          }}
        />
      </Head>

      <Header
        title="Tenants"
        backgroundImage="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/backgrounds/subtle-background-4.webp"
      >
        The University-Student Union is more than meeting rooms. Restaurants,
        student government, and community organizations lease space in our
        building, which puts a coffee run, a hot lunch, and the people who run
        campus programs on the same floor plan. Here is who you will find
        inside, and how to reach them.
      </Header>

      {/* All three paddings are set because FluidContainer's responsive steps
          fall back to `padding` — supplying only that would keep the 72px
          desktop inset on a phone. Horizontal values track its own defaults. */}
      <FluidContainer
        padding={`0 ${Spaces['2xl']} ${Spaces.lg}`}
        paddingDesktop={`0 ${Spaces.xl} ${Spaces.md}`}
        paddingMobile={`0 ${Spaces.md} ${Spaces.md}`}
      >
        <SectionNav aria-label="Tenant categories">
          {CATEGORY_ORDER.map((category) => (
            <Button
              key={category}
              href={`#${toKebabCase(category)}`}
              variant="outline"
            >
              {category}
            </Button>
          ))}
        </SectionNav>
      </FluidContainer>

      {CATEGORY_ORDER.map((category, categoryIndex) => (
        <CategorySection key={category} id={toKebabCase(category)}>
          <FluidContainer
            backgroundColor={
              categoryIndex % 2 === 0 ? 'transparent' : 'greyLightest'
            }
          >
            <Typography as="h2" variant="title" margin={`0 0 ${Spaces.sm}`}>
              {category}
            </Typography>
            <br />
            <Typography as="p" color="greyDarkest" margin={`0 0 ${Spaces.xl}`}>
              {CATEGORY_DESCRIPTIONS[category]}
            </Typography>

            <TenantGrid>
              {TENANTS_ALPHABETICAL.filter(
                (tenant) => tenant.category === category,
              ).map((tenant) => (
                <TenantCard
                  key={tenant.name}
                  onClick={() => openTenant(tenant)}
                >
                  <Panel rounded>
                    <TenantCardBody>
                      {/* No tile at all when there is no logo — an empty src
                          renders a broken image box and fires a request for the
                          page itself. */}
                      {tenant.logoSrc && (
                        <LogoFrame
                          $backgroundColor={tenant.logoBackgroundColor}
                        >
                          <Image src={tenant.logoSrc} alt="" lazy />
                        </LogoFrame>
                      )}
                      <Typography as="h3" variant="titleSmall">
                        {tenant.name}
                      </Typography>
                      {tenant.hours?.length ? (
                        <CardHours>
                          <ContactIcon aria-hidden="true">
                            <MdSchedule />
                          </ContactIcon>
                          <OpeningHoursList hours={tenant.hours} />
                        </CardHours>
                      ) : null}
                      <ClampedDescription>
                        <Typography as="p">{tenant.description}</Typography>
                      </ClampedDescription>
                    </TenantCardBody>
                    {/* One word plus an arrow to signal it is clickable. The
                      tenant name goes in aria-label so five buttons reading
                      "More" are still tellable apart in a screen reader's
                      element list — that label also replaces the visible text,
                      so the arrow is never announced as a character. */}
                    <DetailsButton
                      variant="transparent"
                      aria-haspopup="dialog"
                      aria-label={`More about ${tenant.name}`}
                      onClick={() => openTenant(tenant)}
                    >
                      More
                      <DetailsChevron aria-hidden="true">
                        <MdChevronRight />
                      </DetailsChevron>
                    </DetailsButton>
                  </Panel>
                </TenantCard>
              ))}
            </TenantGrid>
          </FluidContainer>
        </CategorySection>
      ))}

      {selectedTenant && (
        <GenericModal
          isOpen={modalIsOpen}
          width="min(560px, 90vw)"
          contentLabel={selectedTenant.name}
          onRequestClose={() => setIsOpen(false)}
        >
          <FluidContainer
            padding={`0 ${Spaces.md} ${Spaces.md}`}
            flex
            flexDirection="column"
            alignItems="center"
          >
            {selectedTenant.logoSrc && (
              <LogoFrame $backgroundColor={selectedTenant.logoBackgroundColor}>
                <ImageWithSkeleton src={selectedTenant.logoSrc} alt="" />
              </LogoFrame>
            )}
            <Typography
              variant="cta"
              as="p"
              color="gold"
              uppercase
              margin={`${Spaces.lg} 0 ${Spaces.xs}`}
            >
              {selectedTenant.category}
            </Typography>
            <Typography variant="titleSmall" as="h2">
              {selectedTenant.name}
            </Typography>
            {selectedTenant.headerImage && (
              <ModalHeaderImage>
                <ImageWithSkeleton
                  src={selectedTenant.headerImage.src}
                  alt={selectedTenant.headerImage.alt}
                />
              </ModalHeaderImage>
            )}
            <Typography as="p" margin={`${Spaces.md} 0 0`}>
              {selectedTenant.description}
            </Typography>
            {selectedTenant.hours?.length ? (
              <ModalSection>
                <Typography
                  variant="cta"
                  as="p"
                  color="greyDark"
                  uppercase
                  margin={`0 0 ${Spaces.md}`}
                >
                  Hours
                </Typography>
                <OpeningHoursList hours={selectedTenant.hours} />
              </ModalSection>
            ) : null}

            {contactLinks.length > 0 && (
              <ModalSection>
                <ContactList>
                  {selectedTenant.locationInBuilding && (
                    <ModalLocation>
                      <ContactIcon aria-hidden="true">
                        <MdPlace />
                      </ContactIcon>
                      {selectedTenant.locationInBuilding}
                    </ModalLocation>
                  )}
                  {contactLinks.map((link) => (
                    <ContactRow key={link.href}>
                      <ContactIcon aria-hidden="true">{link.icon}</ContactIcon>
                      <Typography as="span">
                        <StyledLink
                          href={link.href}
                          isExternalLink={link.isExternalLink}
                        >
                          {link.text}
                        </StyledLink>
                      </Typography>
                      {link.copy && (
                        <CopyButton
                          value={link.copy.value}
                          label={link.copy.label}
                        />
                      )}
                    </ContactRow>
                  ))}
                </ContactList>
              </ModalSection>
            )}
          </FluidContainer>
        </GenericModal>
      )}
    </Page>
  );
}
