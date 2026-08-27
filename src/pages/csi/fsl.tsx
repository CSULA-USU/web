import { ReactNode, useState, useMemo, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled, { css } from 'styled-components';
import { TabPanel } from 'react-tabs';
import { AiOutlineFileText, AiOutlineInstagram } from 'react-icons/ai';
import { BiChevronRight, BiCheck } from 'react-icons/bi';
import { HiOutlineMail } from 'react-icons/hi';
import { MdLanguage } from 'react-icons/md';
import { media, Spaces, Colors } from 'theme';
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
  CountUp,
} from 'components';
import { DocumentLink, Page, BaseModal } from 'modules';
import { Hazing } from 'partials';
import fslData from 'data/fsl-full-content.json';
import staff from 'data/staff.json';

const {
  chapters,
  howToJoin: HowToJoinContent,
  costOfMembership: FamilyAndFriendsCostOfMembershipContent,
  membershipIntakeForms: MembershipIntakeForms,
  expansion: FSLExpansionContent,
  resources: ResourceButtons,
  pillarsAccordion: PillarsAccordion,
} = fslData;

type ChapterType = 'Fraternity' | 'Sorority' | 'Co-Ed';
type Council = 'IFC' | 'MGC' | 'NPHC' | 'PHC';

interface Chapter {
  name: string;
  fullName?: string;
  crest?: string;
  greekLetters: string;
  type: ChapterType;
  council: Council;
  status: 'Recognized' | 'Reestablishing';
  founding?: string;
  values?: string[];
  colors?: string[];
  symbol?: string | string[];
  instagram?: string;
  website?: string;
}

const TYPE_FILTERS: ChapterType[] = ['Fraternity', 'Sorority', 'Co-Ed'];
const COUNCIL_FILTERS: Council[] = ['IFC', 'MGC', 'NPHC', 'PHC'];

// Data is authored alphabetically; sort defensively so display order never
// depends on JSON ordering.
const CHAPTER_ROSTER = (chapters as unknown as Chapter[])
  .slice()
  .sort((a, b) => a.name.localeCompare(b.name));

// Monogram fallback for chapters that have no seal image yet.
const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();

const instagramHref = (handle: string) =>
  handle.startsWith('http')
    ? handle
    : `https://www.instagram.com/${handle.replace(/^@/, '')}/`;

const instagramLabel = (handle: string) =>
  handle.startsWith('@') ? handle : `@${handle}`;

const websiteLabel = (website: string) =>
  website
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '');

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
  'Hazing Prevention',
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
  top: -15px;
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

/* ---------- Chapters: filter bar ---------- */
const FilterBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: ${Spaces.md};
  margin: ${Spaces.md} 0 ${Spaces.lg};
  padding: ${Spaces.md};
  background-color: ${Colors.greyLightest};
  border-radius: 12px;
  ${() =>
    media('tablet')(`
    flex-direction: column;
    gap: ${Spaces.sm};
  `)}
`;

const FilterGroup = styled.fieldset`
  border: none;
  margin: 0;
  padding: 0;
`;

const FilterLegend = styled.legend`
  padding: 0;
  margin: 0 0 ${Spaces.sm};
  font-size: 14px;
  font-weight: 700;
  color: ${Colors.greyDarkest};
`;

const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${Spaces.sm};
`;

const ResultsRow = styled.div`
  display: flex;
  justify-content: center;
  margin: ${Spaces.md} 0;
`;

const chipBase = css`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  user-select: none;
  color: ${Colors.black};
  transition: background-color 0.15s ease, border-color 0.15s ease;

  &:hover {
    border-color: ${Colors.grey};
  }
`;

const Chip = styled.label<{ $active: boolean }>`
  ${chipBase}
  border: 1.5px solid
    ${({ $active }) => ($active ? Colors.greyDarker : Colors.greyLighter)};
  background-color: ${({ $active }) =>
    $active ? Colors.primary : Colors.white};

  /* Focus ring driven by the visually-hidden native checkbox. */
  &:has(input:focus-visible) {
    outline: 2px solid ${Colors.black};
    outline-offset: 2px;
  }

  input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    border: 0;
  }
`;

const ResetChip = styled.button<{ $active: boolean }>`
  ${chipBase}
  border: 1.5px solid
    ${({ $active }) => ($active ? Colors.gold : Colors.greyLighter)};
  background-color: ${({ $active }) =>
    $active ? Colors.primary : Colors.white};

  &:focus-visible {
    outline: 2px solid ${Colors.black};
    outline-offset: 2px;
  }
`;

/* ---------- Chapters: cards ---------- */
const ChaptersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: ${Spaces.md};
  margin: ${Spaces.md} 0;

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`;

const ChapterCard = styled.button`
  display: flex;
  align-items: center;
  gap: ${Spaces.md};
  width: 100%;
  text-align: left;
  padding: ${Spaces.md};
  background-color: ${Colors.white};
  border: 1px solid ${Colors.greyLighter};
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    border: 1px solid ${Colors.primary};
  }

  &:focus-visible {
    outline: 3px solid ${Colors.gold};
    outline-offset: 2px;
  }
`;

const SealBox = styled.div<{ $size: string }>`
  flex-shrink: 0;
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const Monogram = styled.div<{ $size: string }>`
  flex-shrink: 0;
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  border-radius: 50%;
  background-color: ${Colors.primary};
  color: ${Colors.black};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  letter-spacing: 1px;
  font-size: calc(${({ $size }) => $size} * 0.3);
`;

const CardBody = styled.span`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
`;

const ChapterName = styled.span`
  font-weight: 700;
  font-size: 18px;
  color: ${Colors.greyDarkest};
`;

const MetaLine = styled.span`
  font-size: 13px;
  color: ${Colors.greyDark};
`;

const StatusBadge = styled.span<{ $status: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  align-self: flex-start;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  background-color: ${({ $status }) =>
    $status === 'Recognized' ? Colors.recognizedGreen : Colors.greyLighter};
  color: ${Colors.greyDarkest};

  &::before {
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: ${({ $status }) =>
      $status === 'Recognized' ? 'green' : Colors.grey};
  }
`;

/* ---------- Chapters: modal ---------- */
const ModalSealCenter = styled.div`
  display: flex;
  justify-content: center;
`;

const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${Spaces.sm};
  justify-content: center;
  margin-top: ${Spaces.md};
`;

const InfoBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 999px;
  background-color: ${Colors.greyLightest};
  color: ${Colors.greyDarkest};
  font-size: 13px;
  font-weight: 600;
`;

const DetailList = styled.dl`
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: ${Spaces.sm} ${Spaces.md};
  margin: ${Spaces.lg} 0 0;

  dt {
    font-weight: 700;
    color: ${Colors.greyDarkest};
  }
  dd {
    margin: 0;
    color: ${Colors.greyDarkest};
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
    gap: 2px;
    dd {
      margin-bottom: ${Spaces.sm};
    }
  }
`;

const ChapterLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${Spaces.md};
  width: 100%;
  margin-top: ${Spaces.xl};
  padding-top: ${Spaces.lg};
  border-top: 1px solid ${Colors.greyLighter};
`;

const ChapterLink = styled.div`
  display: flex;
  align-items: center;
  gap: ${Spaces.sm};
  color: ${Colors.greyDarkest};
`;

const ChapterLinkIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex: 0 0 24px;
  line-height: 0;
  color: ${Colors.black};

  svg {
    display: block;
    width: 20px;
    height: 20px;
  }
`;

// Renders a chapter's seal, falling back to an initials monogram when the
// organization has no crest image yet.
const ChapterSeal = ({ chapter, size }: { chapter: Chapter; size: string }) =>
  chapter.crest ? (
    <SealBox $size={size}>
      <Image src={chapter.crest} alt="" width="auto" height="auto" />
    </SealBox>
  ) : (
    <Monogram $size={size} aria-hidden="true">
      {getInitials(chapter.name)}
    </Monogram>
  );

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
  const { isMobile, isTablet, isDesktop, isWidescreen } = useBreakpoint();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<Set<ChapterType>>(
    new Set(),
  );
  const [selectedCouncils, setSelectedCouncils] = useState<Set<Council>>(
    new Set(),
  );
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const year = new Date().getFullYear();

  const noFiltersActive =
    selectedTypes.size === 0 && selectedCouncils.size === 0;

  // Within a facet: OR. Across facets: AND. Empty facet = no constraint.
  const visibleChapters = useMemo(
    () =>
      CHAPTER_ROSTER.filter(
        (chapter) =>
          (selectedTypes.size === 0 || selectedTypes.has(chapter.type)) &&
          (selectedCouncils.size === 0 ||
            selectedCouncils.has(chapter.council)),
      ),
    [selectedTypes, selectedCouncils],
  );

  const toggleType = (value: ChapterType) =>
    setSelectedTypes((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });

  const toggleCouncil = (value: Council) =>
    setSelectedCouncils((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });

  const clearFilters = () => {
    setSelectedTypes(new Set());
    setSelectedCouncils(new Set());
  };

  const openChapter = (chapter: Chapter, trigger: HTMLButtonElement) => {
    lastTrigger.current = trigger;
    setSelectedChapter(chapter);
    setIsModalOpen(true);
  };

  const closeChapter = () => {
    setIsModalOpen(false);
    setSelectedChapter(null);
  };

  // Escape-to-close, focus-into-dialog, focus trap, and focus restoration.
  // BaseModal provides the dialog semantics; this layers keyboard handling on
  // top without modifying the shared component.
  useEffect(() => {
    if (!isModalOpen) return;

    const dialog = document.querySelector<HTMLElement>(
      '[aria-labelledby="fsl-chapter-title"]',
    );
    if (!dialog) return;

    const getFocusable = () =>
      Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute('disabled'));

    getFocusable()[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsModalOpen(false);
        setSelectedChapter(null);
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = getFocusable();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      lastTrigger.current?.focus();
    };
  }, [isModalOpen]);

  return (
    <Page>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>Fraternity & Sorority Life (FSL) | Cal State LA</title>

        <meta
          name="description"
          content="Contact Cal State LA Fraternity & Sorority Life (FSL) at (323) 343-5113. Information on recruitment, Greek council intake, and sorority/fraternity chapters."
          key="description"
        />

        <meta
          name="author"
          content="The University Student Union Center for Student Involvement"
          key="author"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Fraternity & Sorority Life (FSL) | Cal State LA"
          key="og-title"
        />
        <meta
          property="og:description"
          content="Information on recruitment, Greek council intake, and sorority/fraternity chapters at Cal State LA."
          key="og-desc"
        />
        <meta property="og:type" content="website" key="og-type" />
        <meta
          property="og:url"
          content="https://www.calstatelausu.org/csi/fsl"
        />
        <meta
          property="og:image"
          content="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/departments/csi/fsl/fsl-header.webp"
          key="og-image"
        />
        <meta
          property="og:image:alt"
          content="Fraternity & Sorority Life at Cal State LA logo"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Fraternity & Sorority Life (FSL) | Cal State LA"
        />
        <meta
          name="twitter:description"
          content="Information on recruitment, Greek council intake, and sorority/fraternity chapters at Cal State LA."
        />
        <meta
          name="twitter:image"
          content="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/departments/csi/fsl/fsl-header.webp"
        />

        {/* Canonical */}
        <link rel="canonical" href="https://www.calstatelausu.org/csi/fsl" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: 'Fraternity and Sorority Life (FSL)',
              url: 'https://www.calstatelausu.org/csi/fsl',
              logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Uiy8CLtYE2AQWZgKKbUfEbj1xQ9CDA.png',
              provider: {
                '@type': 'EducationalOrganization',
                name: 'Center for Student Involvement (CSI)',
                parentOrganization: {
                  '@type': 'NonprofitOrganization',
                  name: 'University-Student Union at Cal State LA',
                },
              },
              telephone: '+13233435113',
              email: 'iprieto7@calstatela.edu',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '5154 State University Dr., U-SU Room 204',
                addressLocality: 'Los Angeles',
                addressRegion: 'CA',
                postalCode: '90032',
                addressCountry: 'US',
              },
              openingHours: ['Mo-Fr 09:00-17:00'],
              parentOrganization: {
                '@type': 'NonprofitOrganization',
                name: 'Center for Student Involvement (CSI)',
                url: 'https://www.calstatelausu.org/csi',
              },
            }),
          }}
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
              href="https://form.jotform.com/260065959465064"
              variant="primary"
              isExternalLink
            >
              Join Our Community
            </Button>
            <Button
              href="https://www.instagram.com/calstatelagreeks/?hl=en"
              variant="primary"
              isExternalLink
            >
              Follow Us
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
            U&ndash;SU 2nd floor, Room 204
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
              (323) 343&ndash;5113
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
      <TabCluster tabItems={NavItems}>
        {/* About Us*/}
        <TabPanel>
          <FluidContainer>
            <Typography as="h2" variant="title" size={isMobile ? 'xl' : '2xl'}>
              Welcome!
            </Typography>
            <FluidContainer
              backgroundColor="greyLightest"
              margin={isWidescreen ? '18px 0' : '36px 0'}
            >
              <Typography as="p" variant="copy">
                With 16 organizations and over 300 fraternity and sorority
                members, Cal State LA&apos;s Greek community truly has it
                all—from culturally based and service&mdash;driven groups to
                social organizations and everything in between. No matter what
                you&apos;re looking for, there&apos;s a place for you in our
                fraternity and sorority community! Build lifelong friendships,
                grow as a leader, give back to the community, and make
                unforgettable memories along the way... go Greek!
              </Typography>
            </FluidContainer>
          </FluidContainer>

          {/* Register */}
          {/* <FluidContainer
            flex
            justifyContent="center"
            padding="0"
            margin={isWidescreen ? '18px 0 0 0' : '36px 0 0 0'}
          >
            <FluidContainer
              flex
              alignItems="center"
              justifyContent="center"
              flexDirection={isMobile ? 'column' : 'row'}
              innerMaxWidth="850px"
              backgroundColor="primary"
              gap={'16px'}
            >
              <FluidContainer padding="0">
                <Typography as="p">
                  Register here for Sorority Formal Recruitment with
                  Panhellenic. For more information about the Panhellenic
                  community, visit on{' '}
                  <StyledLink
                    href="https://www.instagram.com/csulbpanhellenic"
                    isInverseUnderlineStyling
                    isExternalLink
                  >
                    @csulapanhellenic
                  </StyledLink>{' '}
                  Instagram
                </Typography>
              </FluidContainer>
              <FluidContainer padding="0" innerMaxWidth="200px">
                <Button
                  href="http://csula.mycampusdirector2.com/"
                  isExternalLink
                  variant="black"
                >
                  Register
                </Button>
              </FluidContainer>
            </FluidContainer>
          </FluidContainer> */}

          {/* MISSION */}
          <FluidContainer
            flex
            flexDirection={isMobile ? 'column' : 'row'}
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
              <Typography as="p" variant="copy" margin={`0 0 ${Spaces.md} 0`}>
                Fraternities and sororities offer an enriching college
                experience that helps students grow into leaders, develop
                valuable social skills, and stay committed to academics and
                community service.
              </Typography>
              <Typography as="p" variant="copy" margin={`0 0 ${Spaces.md} 0`}>
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

          {/* Count-Up */}
          <FluidContainer
            flex
            justifyContent="center"
            gap={isMobile ? '35px' : isTablet ? '35px' : '150px'}
            alignItems="flex-start"
          >
            <FluidContainer
              flex
              flexDirection="column"
              padding="0"
              alignItems="center"
              justifyContent="center"
            >
              <CountUp
                end={300}
                duration={1000}
                variant="title"
                as="h2"
                size={isMobile ? 'lg' : '3xl'}
                color="gold"
                showPlus
                format={(n) => n.toLocaleString()}
              />
              <Typography
                as="h3"
                variant="span"
                size={isMobile ? 'sm' : 'lg'}
                lineHeight="1.2"
              >
                Members
              </Typography>
            </FluidContainer>
            <FluidContainer
              flex
              flexDirection="column"
              padding="0"
              alignItems="center"
              justifyContent="center"
            >
              <CountUp
                end={14}
                duration={1000}
                variant="title"
                as="h2"
                size={isMobile ? 'lg' : '3xl'}
                color="gold"
                format={(n) => n.toLocaleString()}
              />
              <Typography
                as="h3"
                variant="span"
                size={isMobile ? 'sm' : 'lg'}
                lineHeight="1.2"
              >
                Chapters
              </Typography>
            </FluidContainer>
            <FluidContainer
              flex
              flexDirection="column"
              padding="0"
              alignItems="center"
              justifyContent="center"
            >
              <CountUp
                end={year - 1948}
                duration={1000}
                variant="title"
                as="h2"
                size={isMobile ? 'lg' : '3xl'}
                color="gold"
                format={(n) => n.toLocaleString()}
              />
              <Typography
                as="h3"
                variant="span"
                size={isMobile ? 'sm' : 'lg'}
                lineHeight="1.2"
              >
                Years of Service
              </Typography>
            </FluidContainer>
          </FluidContainer>

          {/* STAFF */}
          <FluidContainer
            flex
            flexDirection={isWidescreen ? 'column' : 'row'}
            backgroundColor="greyLightest"
          >
            <FluidContainer
              innerMaxWidth={isWidescreen ? '100%' : '50%'}
              padding={isWidescreen ? '18px' : '0'}
            >
              <Typography
                as="h2"
                variant="title"
                size={isMobile ? 'xl' : '2xl'}
              >
                Meet Our Staff
              </Typography>
              <Typography as="p" margin={`${Spaces.md} 0 `}>
                The CSI staff is available during the work week and can be seen
                on campus at night and weekends for meetings and programs to
                assist you in your fraternity and sorority experience. Please
                email us or stop by our office for more information.
              </Typography>
              <Typography weight="700" as="h3">
                Contact Us
              </Typography>
              <Typography as="p">Phone: (323) 343&ndash;5113</Typography>
              <Typography as="p">Email: iprieto7@calstatela.edu</Typography>
            </FluidContainer>

            <FluidContainer
              flex
              flexDirection="column"
              alignItems={isWidescreen ? 'center' : 'flex-start'}
              padding="0"
            >
              <FluidContainer
                flex
                justifyContent="center"
                padding="0"
                flexDirection={
                  isMobile ? 'column' : isTablet ? 'column' : 'row'
                }
              >
                {staff
                  .filter(
                    (s) =>
                      s.name.includes('Ian Prieto') ||
                      s.name.includes('Fabi Avina'),
                  )
                  .map((s) => (
                    <StaffCardWithModal
                      key={s.name}
                      name={s.name}
                      title={s.title}
                      src={s.src}
                      alt={s.alt}
                      margin={isMobile ? `${Spaces.sm} 0` : `${Spaces.sm}`}
                      pronouns={s.pronouns}
                      suffix={s.suffix}
                      department={s.department}
                      email={s.email}
                      phone={s.phone}
                      url={s.url}
                      bio={s.bio}
                      rounded
                    >
                      <Typography
                        as="p"
                        variant="span"
                        size="2xs"
                        color="greyDark"
                        margin={`${Spaces.xs} 0 0 0`}
                      >
                        {s.department}
                      </Typography>
                    </StaffCardWithModal>
                  ))}
              </FluidContainer>
            </FluidContainer>
          </FluidContainer>

          {/* Community Reports */}
          <FluidContainer>
            <Typography as="h2" variant="title" size={isMobile ? 'xl' : '2xl'}>
              Community Reports
            </Typography>
            <Typography as="p" margin={`0 0 ${Spaces.md} 0 `}>
              Created to demonstrate academic, service, and philanthropic
              efforts of the Greek community.
            </Typography>
            <Typography variant="subheader" as="h3">
              Campus&ndash;Recognized Sorority And Fraternity Transparency Act
              &ndash; AB524
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
                href="https://www.dropbox.com/scl/fi/bk41ypgbsdjvt0zq9nx5q/2022-2023-AB-524-Report.pdf?rlkey=blktva7fvvqkrlobxcp4j4kuh&st=4k6sbdlb&raw=1"
                aria-label="FY 22&mdash;23 Report"
              >
                FY 22&mdash;23 Report
              </DocumentLink>
              <DocumentLink
                href="https://www.dropbox.com/scl/fi/26yu1niyp0kg73ntigdkl/2023-2024-AB-524-Report.pdf?rlkey=coc6owqcz78f1etbixhxzyf3v&st=w0suj43l&raw=1"
                aria-label="FY 23&mdash;24 Report"
              >
                FY 23&mdash;24 Report
              </DocumentLink>
              <DocumentLink
                href="https://www.dropbox.com/scl/fi/m9pp7o7jeakk3aswg4s4f/2024-2025-AB-524-Report.pdf?rlkey=db01rxsfu3oldh1p3alwo2y4h&st=ywm14ay6&raw=1"
                aria-label="FY 24&mdash;25 Report"
              >
                FY 24&mdash;25 Report
              </DocumentLink>
            </AB524ReportContainer>
            {/*
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
            */}
          </FluidContainer>
        </TabPanel>

        {/* Chapters */}
        <TabPanel>
          <FluidContainer flex flexDirection="column" padding="0">
            <Typography
              as="h2"
              variant="title"
              size={isMobile ? 'xl' : '2xl'}
              margin={`0 0 ${Spaces.sm} 0`}
            >
              Chapters
            </Typography>
            <Typography as="p" variant="copy" margin={`0 0 ${Spaces.md} 0`}>
              Filter by organization type or governing council, then select a
              chapter to view its full profile.
            </Typography>

            <FilterBar role="group" aria-label="Filter chapters">
              <FilterGroup>
                <FilterLegend>Filter</FilterLegend>
                <ResetChip
                  type="button"
                  $active={noFiltersActive}
                  aria-pressed={noFiltersActive}
                  onClick={clearFilters}
                >
                  {noFiltersActive && <BiCheck size={16} aria-hidden="true" />}
                  All
                </ResetChip>
              </FilterGroup>
              <FilterGroup>
                <FilterLegend>Type</FilterLegend>
                <ChipRow>
                  {TYPE_FILTERS.map((type) => {
                    const active = selectedTypes.has(type);
                    return (
                      <Chip key={type} $active={active}>
                        <input
                          type="checkbox"
                          name="chapter-type"
                          value={type}
                          checked={active}
                          onChange={() => toggleType(type)}
                        />
                        {active && <BiCheck size={16} aria-hidden="true" />}
                        {type}
                      </Chip>
                    );
                  })}
                </ChipRow>
              </FilterGroup>

              <FilterGroup>
                <FilterLegend>Council</FilterLegend>
                <ChipRow>
                  {COUNCIL_FILTERS.map((council) => {
                    const active = selectedCouncils.has(council);
                    return (
                      <Chip key={council} $active={active}>
                        <input
                          type="checkbox"
                          name="chapter-council"
                          value={council}
                          checked={active}
                          onChange={() => toggleCouncil(council)}
                        />
                        {active && <BiCheck size={16} aria-hidden="true" />}
                        {council}
                      </Chip>
                    );
                  })}
                </ChipRow>
              </FilterGroup>
            </FilterBar>

            {visibleChapters.length === 0 ? (
              <FluidContainer
                flex
                flexDirection="column"
                alignItems="center"
                padding={`${Spaces.xl} 0`}
              >
                <Typography as="p" margin={`0 0 ${Spaces.md}`}>
                  No chapters match the selected filters.
                </Typography>
                <Button variant="outline" onClick={clearFilters}>
                  Clear filters
                </Button>
              </FluidContainer>
            ) : (
              <ChaptersGrid>
                {visibleChapters.map((chapter) => (
                  <ChapterCard
                    key={chapter.name}
                    type="button"
                    aria-haspopup="dialog"
                    aria-label={`${chapter.name}. ${chapter.type}, ${chapter.council} council, ${chapter.status}. View chapter details.`}
                    onClick={(e) => openChapter(chapter, e.currentTarget)}
                  >
                    <ChapterSeal chapter={chapter} size="88px" />
                    <CardBody>
                      <ChapterName>{chapter.name}</ChapterName>
                      <Typography color="greyDarkest" lineHeight="1">
                        {chapter.greekLetters}
                      </Typography>
                      <StatusBadge $status={chapter.status}>
                        {chapter.status}
                      </StatusBadge>
                      <MetaLine>
                        {chapter.type} &middot; {chapter.council}
                      </MetaLine>
                    </CardBody>
                  </ChapterCard>
                ))}
              </ChaptersGrid>
            )}
            <ResultsRow>
              <Typography color="greyDark" aria-live="polite" variant="span">
                Showing {visibleChapters.length} of {CHAPTER_ROSTER.length}
              </Typography>
            </ResultsRow>
          </FluidContainer>
        </TabPanel>

        {/* How to Join */}
        <TabPanel>
          <FluidContainer>
            <Typography as="h2" variant="title" size={isMobile ? 'xl' : '2xl'}>
              How to Join
            </Typography>
            <FluidContainer
              backgroundColor="greyLightest"
              padding="16px"
              margin={isWidescreen ? '18px 0' : '36px 0'}
            >
              <Typography as="p" color="black" margin={`${Spaces.sm} 0`}>
                At Cal State LA, the joining process for each organization is
                based on their governing council and their National and Regional
                Offices. The process to join an organization is different for
                each governing council.
              </Typography>
            </FluidContainer>
            {HowToJoinContent.map((item) => (
              <FluidContainer
                flex
                flexWrap="wrap"
                key={item.title}
                padding={`${Spaces.md} 0 0`}
              >
                <Card title={item.title} width="100%" topBorder>
                  {item.content}
                </Card>
              </FluidContainer>
            ))}
          </FluidContainer>
        </TabPanel>

        {/* Family and Friends */}
        <TabPanel>
          <FluidContainer>
            <Typography as="h2" variant="title" size={isMobile ? 'xl' : '2xl'}>
              Family and Friends
            </Typography>
            <FluidContainer
              backgroundColor="greyLightest"
              margin={isWidescreen ? '18px 0' : '36px 0'}
            >
              <Typography as="p">
                Your student has embarked upon a great adventure and opportunity
                by choosing to attend California State University, Los Angeles.
                Your student has many opportunities ahead of them while at Cal
                State LA. By joining a fraternity or sorority, they are joining
                a number of other new members in their search for a sense of
                community at the university. Being in a new environment can
                cause students to feel overwhelmed. and for many parents, the
                Greek community conjures up images of Animal House. That&apos;s
                simply not the reality! There are many myths about the Greek
                community, but the reality is that men and women in fraternities
                and sororities are committed to their academics, volunteer time
                in the community, develop and strengthen their leadership
                skills, and form a campus network with other Greeks. Our Greek
                community consists of over 14 different organizations and over
                300 students. As the Center for Student Involvement staff, we
                work closely with the recognized organizations to enhance the
                overall Greek experience by upholding their values, community
                standards and university Policies.
              </Typography>
            </FluidContainer>
          </FluidContainer>
          <FluidContainer>
            <Typography as="h2" variant="title" size={isMobile ? 'xl' : '2xl'}>
              Your Role
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
          <FluidContainer>
            <Typography as="h2" variant="title" size={isMobile ? 'xl' : '2xl'}>
              Cost of Membership
            </Typography>
            {FamilyAndFriendsCostOfMembershipContent.map((card) => (
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
          <FluidContainer>
            <Typography variant="title" as="h2" margin={`${Spaces.sm} 0`}>
              Membership Intake Forms
            </Typography>
            <FluidContainer
              backgroundColor="greyLightest"
              margin={isWidescreen ? '18px 0' : '36px 0'}
            >
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
          </FluidContainer>
          <FluidContainer>
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

        {/*Hazing */}
        <TabPanel>
          <Hazing />
        </TabPanel>

        {/* Resources */}
        <TabPanel>
          <FluidContainer>
            <Typography variant="title" as="h1">
              Resources
            </Typography>
            <FluidContainer flex flexWrap="wrap" padding="0">
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

      {isModalOpen && selectedChapter && (
        <BaseModal
          title={selectedChapter.name}
          greekLetters={selectedChapter.greekLetters}
          labelledById="fsl-chapter-title"
          maxWidth="560px"
          onClose={closeChapter}
        >
          <ModalSealCenter>
            <ChapterSeal chapter={selectedChapter} size="140px" />
          </ModalSealCenter>

          {selectedChapter.fullName && (
            <Typography
              as="p"
              variant="cta"
              color="greyDark"
              margin={`${Spaces.sm} 0 0`}
            >
              {selectedChapter.fullName}
            </Typography>
          )}

          <BadgeRow>
            <InfoBadge>{selectedChapter.type}</InfoBadge>
            <InfoBadge>{selectedChapter.council} Council</InfoBadge>
            <StatusBadge $status={selectedChapter.status}>
              {selectedChapter.status}
            </StatusBadge>
          </BadgeRow>

          {selectedChapter.founding ||
          selectedChapter.values ||
          selectedChapter.colors ||
          selectedChapter.symbol ? (
            <DetailList>
              {selectedChapter.founding && (
                <>
                  <dt>Founded</dt>
                  <dd>{selectedChapter.founding}</dd>
                </>
              )}
              {selectedChapter.values && (
                <>
                  <dt>Values</dt>
                  <dd>{selectedChapter.values.join(', ')}</dd>
                </>
              )}
              {selectedChapter.colors && (
                <>
                  <dt>Colors</dt>
                  <dd>{selectedChapter.colors.join(', ')}</dd>
                </>
              )}
              {selectedChapter.symbol && (
                <>
                  <dt>Symbol</dt>
                  <dd>
                    {Array.isArray(selectedChapter.symbol)
                      ? selectedChapter.symbol.join(', ')
                      : selectedChapter.symbol}
                  </dd>
                </>
              )}
            </DetailList>
          ) : (
            <Typography
              as="p"
              margin={`${Spaces.lg} 0 0`}
              style={{ textAlign: 'center' }}
            >
              Full chapter profile coming soon.
            </Typography>
          )}

          {(selectedChapter.instagram || selectedChapter.website) && (
            <ChapterLinks>
              {selectedChapter.instagram && (
                <ChapterLink>
                  <ChapterLinkIcon>
                    <AiOutlineInstagram aria-hidden="true" />
                  </ChapterLinkIcon>
                  <StyledLink
                    href={instagramHref(selectedChapter.instagram)}
                    isExternalLink
                    isInverseUnderlineStyling
                  >
                    {instagramLabel(selectedChapter.instagram)}
                  </StyledLink>
                </ChapterLink>
              )}
              {selectedChapter.website && (
                <ChapterLink>
                  <ChapterLinkIcon>
                    <MdLanguage aria-hidden="true" />
                  </ChapterLinkIcon>
                  <StyledLink
                    href={selectedChapter.website}
                    isExternalLink
                    isInverseUnderlineStyling
                  >
                    {websiteLabel(selectedChapter.website)}
                  </StyledLink>
                </ChapterLink>
              )}
            </ChapterLinks>
          )}
        </BaseModal>
      )}
    </Page>
  );
}
