import {
  Divider,
  FluidContainer,
  NonBreakingSpan,
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
    title: 'Fiscal Year 22-23',
    children: (
      <DocumentLinkContainer
        stacked
        links={[
          {
            href: '/governance/public-documents/agenda/bod-agenda-fy22-23-080122.pdf',
            children: 'BOD Agenda August 1, 2022',
          },
          {
            href: '/governance/public-documents/agenda/bod-agenda-fy22-23-091622.pdf',
            children: 'BOD Agenda September 16, 2022',
          },
          {
            href: '/governance/public-documents/agenda/bod-agenda-fy22-23-093022.pdf',
            children: 'BOD Agenda September 30, 2022',
          },
          {
            href: '/governance/public-documents/agenda/bod-agenda-fy22-23-012023.pdf',
            children: 'BOD Agenda January 20, 2023',
          },
        ]}
      />
    ),
    button: {
      children: <NonBreakingSpan>Download All</NonBreakingSpan>,
      href: '#',
      variant: 'black',
    },
  },
  {
    title: 'Fiscal Year 21-22',
    children: (
      <DocumentLinkContainer
        stacked
        links={[
          {
            href: '/governance/public-documents/agenda/bod-agenda-fy-21-22-012122.pdf',
            children: 'BOD Agenda January 21, 2022',
          },
          {
            href: '/governance/public-documents/agenda/bod-agenda-fy21-22-101521.pdf',
            children: 'BOD Agenda October 15, 2021',
          },
          {
            href: '/governance/public-documents/agenda/bod-agenda-fy21-22-110521.pdf',
            children: 'BOD Agenda November 5, 2021',
          },
        ]}
      />
    ),
    button: {
      children: <NonBreakingSpan>Download All</NonBreakingSpan>,
      href: '#',
      variant: 'black',
    },
  },
];
const minutesDownloads: DownloadSectionProps[] = [
  {
    title: 'Fiscal Year 22-23',
    children: (
      <DocumentLinkContainer
        stacked
        links={[
          { href: '#', children: 'BOD Minutes August 1, 2022' },
          { href: '#', children: 'BOD Minutes September 30, 2022' },
          { href: '#', children: 'BOD Minutes September 16, 2022' },
        ]}
      />
    ),
    button: {
      children: <NonBreakingSpan>Download All</NonBreakingSpan>,
      href: '#',
      variant: 'black',
    },
  },
];
const meetingsDownloads: DownloadSectionProps[] = [
  {
    title: 'Fiscal Year 22-23',
    children: (
      <DocumentLinkContainer
        stacked
        links={[
          { href: '#', children: 'BOD Meeting August 1, 2022' },
          { href: '#', children: 'BOD Meeting September 30, 2022' },
          { href: '#', children: 'BOD Meeting September 16, 2022' },
        ]}
      />
    ),
    button: {
      children: <NonBreakingSpan>Download All</NonBreakingSpan>,
      href: '#',
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
    <Typography {...typographyProps}>Meetings</Typography>
    <Divider color="grey" margin={`${Spaces.xl} 0`} />
    {meetingsDownloads.map((d) => (
      <DownloadSection key={d.title} {...d} />
    ))}
  </FluidContainer>
);
