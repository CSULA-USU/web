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
import Link from 'next/link';
import { Spaces } from 'theme';

const agendaDownloads: DownloadSectionProps[] = [
  {
    title: 'Fiscal Year 22-23',
    children: (
      <DocumentLinkContainer
        stacked
        links={[
          {
            href: '/governance/public-documents/agenda/fy22-23/bod-sep-16-22.pdf',
            children: 'BOD September 16, 2022',
          },
          {
            href: '/governance/public-documents/agenda/fy22-23/bod-sep-30-22.pdf',
            children: 'Committee September 30, 2022',
          },
          {
            href: '/governance/public-documents/agenda/fy22-23/bod-oct-14-22.pdf',
            children: 'Committee October 14, 2022',
          },
          {
            href: '/governance/public-documents/agenda/fy22-23/committee-nov-04-22.pdf',
            children: 'Committee November 4, 2022',
          },
          {
            href: '/governance/public-documents/agenda/fy22-23/bod-nov-04-22.pdf',
            children: 'Meeting November 4, 2022',
          },
          {
            href: '/governance/public-documents/agenda/fy22-23/bod-jan-20-23.pdf',
            children: 'Meeting January 20, 2023',
          },
          {
            href: '/governance/public-documents/agenda/fy22-23/committee-feb-10-23.pdf',
            children: 'Committee February 10, 2023',
          },
          {
            href: '/governance/public-documents/agenda/fy22-23/bod-feb-10-23.pdf',
            children: 'Meeting February 10, 2023',
          },
          {
            href: '/governance/public-documents/agenda/fy22-23/bod-mar-10-23.pdf',
            children: 'Meeting March 10, 2023',
          },
          {
            href: '/governance/public-documents/agenda/fy22-23/bod-apr-14-23.pdf',
            children: 'Meeting April 14, 2023',
          },
          {
            href: '/governance/public-documents/agenda/fy22-23/bod-may-12-23.pdf',
            children: 'Meeting May 12, 2023',
          },
        ]}
      />
    ),
    button: {
      children: <NonBreakingSpan>Download All</NonBreakingSpan>,
      href: '/governance/public-documents/agenda/fy22-23.zip',
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
          {
            href: '/governance/public-documents/minutes/fy22-23/bod-may-13-22.pdf',
            children: 'BOD Minutes May 13, 2022',
          },
          {
            href: '/governance/public-documents/minutes/fy22-23/bod-aug-01-22.pdf',
            children: 'BOD Minutes August 1, 2022',
          },
          {
            href: '/governance/public-documents/minutes/fy22-23/bod-sep-16-22.pdf',
            children: 'BOD Minutes September 16, 2022',
          },
          {
            href: '/governance/public-documents/minutes/fy22-23/bod-oct-14-22.pdf',
            children: 'BOD Minutes October 14, 2022',
          },
          {
            href: '/governance/public-documents/minutes/fy22-23/bod-feb-10-23.pdf',
            children: 'BOD Minutes February 10, 2023',
          },
          {
            href: '/governance/public-documents/minutes/fy22-23/bod-mar-10-23.pdf',
            children: 'BOD Minutes March 10, 2023',
          },
        ]}
      />
    ),
    button: {
      children: <NonBreakingSpan>Download All</NonBreakingSpan>,
      href: '/governance/public-documents/minutes/fy22-23.zip',
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
    <Link href="/governance/public-document-archives">View All Documents</Link>
  </FluidContainer>
);
