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
import { Spaces } from 'theme';

const agendaDownloads: DownloadSectionProps[] = [
  {
    title: 'Fiscal Year 24-25',
    children: (
      <DocumentLinkContainer
        stacked
        links={[
          {
            href: 'https://www.dropbox.com/scl/fi/9swbxe510wvl5ppttcyvc/Agenda-U-SU-Board-of-Directors-August-30-2024.docx?rlkey=90ttu2o7qmu1zeiqt7fpdfyzn&dl=0',
            children: 'Meeting August 30, 2024',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/4bffzfcit7fmu4nkj8aby/Agenda-Fiscal-Committee-September-13-2024.docx?rlkey=nsh58bdlv6z32v5cze7laok2k&st=1c15fbgm&dl=0',
            children: 'Fiscal Committee September 13, 2024',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/sv5wydj0gop9wtbbgtx5k/Agenda-Audit-Committee-September-13-2024.docx?rlkey=gywniga9axihrk9uhldlvpr6x&st=jp1e5atu&dl=0',
            children: 'Audit Committee September 13, 2024',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/hgwh281cms1qw6fnwzktw/Agenda-U-SU-Board-of-Directors-September-20-2024.docx?rlkey=8q3xoiagc81m1y19b2m7gvmet&dl=0',
            children: 'Meeting September 20, 2024',
          },
        ]}
      />
    ),
    button: {
      children: <NonBreakingSpan>Download All</NonBreakingSpan>,
      href: 'https://www.dropbox.com/scl/fi/c7lxj8214251r9c4rtzc6/Archive.zip?rlkey=zox1d8b3v5q57ku0x3gj3dq99&dl=0',
      variant: 'black',
    },
  },
];

const minutesDownloads: DownloadSectionProps[] = [
  {
    title: 'Fiscal Year 24-25',
    children: (
      <DocumentLinkContainer
        stacked
        links={[
          {
            href: 'https://www.dropbox.com/scl/fi/p95bxqarp97fy5ju737z4/Minutes-Board-of-Directors-August-30-2024-signed.pdf?rlkey=40neyyje6c1bwno80hdquz798&st=toduyfkj&dl=0',
            children: 'Board of Directors August 30, 2024',
          },
        ]}
      />
    ),
    button: {
      children: <NonBreakingSpan>Download All</NonBreakingSpan>,
      href: 'https://www.dropbox.com/scl/fi/p95bxqarp97fy5ju737z4/Minutes-Board-of-Directors-August-30-2024-signed.pdf?rlkey=40neyyje6c1bwno80hdquz798&st=toduyfkj&dl=0',
      variant: 'black',
    },
  },
];

const typographyProps = {
  variant: 'titleSmall',
  as: 'h2',
  color: 'gold',
  margin: `${Spaces.xl} 0 0`,
} as TypeProps;

export const BODDownloads = () => (
  <FluidContainer>
    <Typography {...typographyProps}>Meeting Calendar</Typography>
    <Divider color="grey" margin={`${Spaces.xl} 0`} />
    <DownloadSection
      title="Fiscal Year 24-25"
      button={{
        children: <NonBreakingSpan>See Schedule</NonBreakingSpan>,
        href: 'https://www.dropbox.com/scl/fi/bnxxquo4d6hob0jp45avu/U-SU-2024-25-BOD-Meeting-Schedule.xlsx.pdf?rlkey=thadfs2lylcbeaq82ujuhsqib&dl=0',
        variant: 'black',
      }}
    />
    <Typography {...typographyProps}>Agenda</Typography>
    <Divider color="grey" margin={`${Spaces.xl} 0`} />
    {agendaDownloads.map((d) => (
      <DownloadSection key={d.title} {...d} />
    ))}
    <Typography {...typographyProps}>Minutes</Typography>
    <Divider color="grey" margin={`${Spaces.xl} 0`} />
    {minutesDownloads.map((d) => (
      <DownloadSection key={d.title} {...d} />
    ))}
    <Typography variant="span" color="gold">
      <StyledLink href="/governance/public-document-archives">
        View All Documents
      </StyledLink>
    </Typography>
  </FluidContainer>
);
