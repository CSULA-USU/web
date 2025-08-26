import {
  Divider,
  FluidContainer,
  NonBreakingSpan,
  StyledLink,
  Typography,
  TypeProps,
} from 'components';
import {
  DocumentLinkContainer,
  DownloadSection,
  DownloadSectionProps,
} from 'modules';
import { useBreakpoint } from 'hooks';
import { Spaces } from 'theme';

const agendaDownloads: DownloadSectionProps[] = [
  {
    title: 'Fiscal Year 25-26',
    children: (
      <DocumentLinkContainer
        stacked
        links={[
          {
            href: 'https://www.dropbox.com/scl/fi/u2axl3qac4r0yuy9my1um/Agenda-Board-of-Directors-August-22-2025.docx?rlkey=dp1tmxt65802vara3yspdpsqi&raw=1',
            children: 'Board of Directors August 22, 2025',
          },
        ]}
      />
    ),
    button: {
      children: <NonBreakingSpan>Download All</NonBreakingSpan>,
      href: 'https://www.dropbox.com/scl/fi/u2axl3qac4r0yuy9my1um/Agenda-Board-of-Directors-August-22-2025.docx?rlkey=dp1tmxt65802vara3yspdpsqi&raw=1',
      variant: 'black',
    },
  },
];

const minutesDownloads: DownloadSectionProps[] = [
  {
    title: 'Fiscal Year 25-26',
    children: (
      <DocumentLinkContainer
        stacked
        links={[
          {
            href: 'https://www.dropbox.com/scl/fi/gv8tq2nquadg9rdwznm93/Board-of-Directors-May-9-2025.pdf?rlkey=fo5zxrwmspyho9lig2kydl0iq&st=92wa1lzz&raw=1',
            children: 'BOD May 9, 2025',
          },
        ]}
      />
    ),
    button: {
      children: <NonBreakingSpan>Download All</NonBreakingSpan>,
      href: 'https://www.dropbox.com/scl/fi/u2axl3qac4r0yuy9my1um/Agenda-Board-of-Directors-August-22-2025.docx?rlkey=dp1tmxt65802vara3yspdpsqi&raw=1',
      variant: 'black',
    },
  },
];

// dl=1 is a Dropbox URL parameter that forces the browser to download the file instead of opening it in the browser.
const typographyProps = {
  variant: 'titleSmall',
  as: 'h2',
  color: 'gold',
  margin: `${Spaces.xl} 0 0`,
} as TypeProps;

export const BODDownloads = () => {
  const { isMobile, isDesktop } = useBreakpoint();
  return (
    <FluidContainer padding={isDesktop ? '0 36px 24px' : '0 72px 36px'}>
      <Typography {...typographyProps} size={isMobile ? 'lg' : '2xl'}>
        Meeting Calendar
      </Typography>
      <Divider color="grey" margin={`${Spaces.xl} 0`} />
      <DownloadSection
        title="Fiscal Year 25-26"
        button={{
          children: <NonBreakingSpan>See Schedule</NonBreakingSpan>,
          href: 'https://www.dropbox.com/scl/fi/qoti96w0h1n34qaqqv86t/Calendar-BOD-Meetings-FY-2025-2026.pdf?rlkey=mrm017dkuhf6evz6ls0ccyvo2&st=jilw4z5t&raw=1',
          variant: 'black',
        }}
      />
      <Typography {...typographyProps} size={isMobile ? 'lg' : '2xl'}>
        Agenda
      </Typography>
      <Divider color="grey" margin={`${Spaces.xl} 0`} />
      {agendaDownloads.map((d) => (
        <DownloadSection key={d.title} {...d} />
      ))}
      <Typography {...typographyProps} size={isMobile ? 'lg' : '2xl'}>
        Minutes
      </Typography>
      <Divider color="grey" margin={`${Spaces.xl} 0`} />
      {minutesDownloads.map((d) => (
        <DownloadSection key={d.title} {...d} />
      ))}
      <Typography variant="span" color="gold">
        <StyledLink href="/board-of-directors/public-document-archives">
          View All Documents
        </StyledLink>
      </Typography>
    </FluidContainer>
  );
};
