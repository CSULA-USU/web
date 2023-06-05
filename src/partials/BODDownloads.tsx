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
            href: 'https://www.dropbox.com/s/3hae1soovvohj2f/bod-sep-16-22.pdf?dl=0',
            children: 'BOD September 16, 2022',
          },
          {
            href: 'https://www.dropbox.com/s/wy3iqtm0bjaiu1j/bod-sep-30-22.pdf?dl=0',
            children: 'Committee September 30, 2022',
          },
          {
            href: 'https://www.dropbox.com/s/hvxdhn3bzed4xjx/bod-oct-14-22.pdf?dl=0',
            children: 'Committee October 14, 2022',
          },
          {
            href: 'https://www.dropbox.com/s/m88be0unucifij9/committee-nov-04-22.pdf?dl=0',
            children: 'Committee November 4, 2022',
          },
          {
            href: 'https://www.dropbox.com/s/b1rgdamwhxgutr2/bod-nov-04-22.pdf?dl=0',
            children: 'Meeting November 4, 2022',
          },
          {
            href: 'https://www.dropbox.com/s/tm6khc9sk0gy74t/bod-jan-20-23.pdf?dl=0',
            children: 'Meeting January 20, 2023',
          },
          {
            href: 'https://www.dropbox.com/s/tjj7mrh83fs4q9n/committee-feb-10-23.pdf?dl=0',
            children: 'Committee February 10, 2023',
          },
          {
            href: 'https://www.dropbox.com/s/r8qvb5a1qm9gqxy/bod-feb-10-23.pdf?dl=0',
            children: 'Meeting February 10, 2023',
          },
          {
            href: 'https://www.dropbox.com/s/nz1iud9zlxdpp5c/bod-mar-10-23.pdf?dl=0',
            children: 'Meeting March 10, 2023',
          },
          {
            href: 'https://www.dropbox.com/s/cuez8bybmir0m17/bod-apr-14-23.pdf?dl=0',
            children: 'Meeting April 14, 2023',
          },
          {
            href: 'https://www.dropbox.com/s/h79q91yjuvx4b99/bod-may-12-23.pdf?dl=0',
            children: 'Meeting May 12, 2023',
          },
        ]}
      />
    ),
    button: {
      children: <NonBreakingSpan>Download All</NonBreakingSpan>,
      href: 'https://www.dropbox.com/s/8l2t64fp097xvib/fy22-23.zip?dl=0',
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
            href: 'https://www.dropbox.com/s/ev1s64gmy23agq0/bod-may-13-22.pdf?dl=0',
            children: 'BOD Minutes May 13, 2022',
          },
          {
            href: 'https://www.dropbox.com/s/ogdlvqzh1lzhsr2/bod-minutes-aug-01-22.pdf?dl=0',
            children: 'BOD Minutes August 1, 2022',
          },
          {
            href: 'https://www.dropbox.com/s/f67v3wkiw6m0tb1/bod-sep-16-22.pdf?dl=0',
            children: 'BOD Minutes September 16, 2022',
          },
          {
            href: 'https://www.dropbox.com/s/2gi0zr2kpqv2s51/bod-oct-14-22.pdf?dl=0',
            children: 'BOD Minutes October 14, 2022',
          },
          {
            href: 'https://www.dropbox.com/s/655qj48mu7k8kij/bod-feb-10-23.pdf?dl=0',
            children: 'BOD Minutes February 10, 2023',
          },
          {
            href: 'https://www.dropbox.com/s/yi4np8ranm5uu5s/bod-mar-10-23.pdf?dl=0',
            children: 'BOD Minutes March 10, 2023',
          },
        ]}
      />
    ),
    button: {
      children: <NonBreakingSpan>Download All</NonBreakingSpan>,
      href: 'https://www.dropbox.com/s/v10ka40w20fqu9v/fy22-23.zip?dl=0',
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
