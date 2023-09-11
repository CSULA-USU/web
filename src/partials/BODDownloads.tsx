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
    title: 'Fiscal Year 23-24',
    children: (
      <DocumentLinkContainer
        stacked
        links={[
          {
            href: 'https://www.dropbox.com/scl/fi/hhke5ecmjflcs94emk24s/bod-aug-25-23.pdf?rlkey=xdpl14daz00mg10zapl6vvi45&dl=0',
            children: 'BOD Meeting Aug 25, 2023',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/fq0gtfffhw4bqb490rrsz/bod-sep-15-23.pdf?rlkey=xk51yjktx91mxp8ac2zrch7s8&dl=0',
            children: 'BOD Meeting Sep 15, 2023',
          },
        ]}
      />
    ),
    button: {
      children: <NonBreakingSpan>Download All</NonBreakingSpan>,
      href: 'https://www.dropbox.com/scl/fi/i4wg3izhs4chhoe9m85n7/fy23-24.zip?rlkey=p11gz07afggco6cc86vsigjsw&dl=0',
      variant: 'black',
    },
  },
];
const minutesDownloads: DownloadSectionProps[] = [
  {
    title: 'Fiscal Year 23-24',
    children: (
      <DocumentLinkContainer
        stacked
        links={[
          {
            href: 'https://www.dropbox.com/scl/fi/h8519l3yauw3ijt6homqg/BOD-May-12-2023-Minutes.pdf?rlkey=2jju8gp4n5q9erc5wqes8j183&dl=0',
            children: 'BOD Minutes May 12, 2023',
          },
        ]}
      />
    ),
    button: {
      children: <NonBreakingSpan>Download All</NonBreakingSpan>,
      href: 'https://www.dropbox.com/scl/fi/h8519l3yauw3ijt6homqg/BOD-Aug-25-2023-Minutes-fix.pdf?rlkey=2jju8gp4n5q9erc5wqes8j183&dl=0',
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
