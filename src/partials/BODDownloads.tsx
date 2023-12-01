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
          {
            href: 'https://www.dropbox.com/scl/fi/dunyfe6dqhzf7kppdff59/bod-sep-29-23.pdf?rlkey=jwmjhq8z1kffyqqdjpm92h285&dl=0',
            children: 'BOD Meeting Sep 29, 2023',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/io1lewa3ae6flsnl6m6uc/bod-oct-6-23.pdf?rlkey=wdop1s18s05ib7y0stc3uckjm&dl=0',
            children: 'BOD Meeting Oct 6, 2023',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/tu6vye98c8ewuejci99l3/bod-oct-13-23.docx?rlkey=yopndir9ke3o1wwfnlemtpz2p&dl=0',
            children: 'BOD Meeting Oct 13, 2023',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/8cjzpzbb66yvswsa6feoo/bod-nov-17-23.pdf?rlkey=floyjw88s8m3yz7e4l0ryzcdm&dl=0',
            children: 'BOD Meeting Nov 17, 2023',
          },
        ]}
      />
    ),
    button: {
      children: <NonBreakingSpan>Download All</NonBreakingSpan>,
      href: 'https://www.dropbox.com/scl/fi/1hxvk1ybb966hukkxn6v5/fy23-24.zip?rlkey=37whhtmqrvlw93gb260279z64&dl=0',
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
          {
            href: 'https://www.dropbox.com/scl/fi/v1juab6s134llnbj6ihll/BOD-Minutes-August-25-2023.pdf?rlkey=hki135hyxe73087qz748buv2h&dl=0',
            children: 'BOD Minutes August 25, 2023',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/g7er99czzgfbyrvsqbut8/Minutes-Board-of-Directors-September-15-2023.pdf?rlkey=lie8b76v1qxtoik1foa7z97tn&dl=0',
            children: 'BOD Minutes September 15, 2023',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/hvcn6693beh5jg13lf5mf/Minutes-Board-of-Directors-Special-Meeting-September-29-2023.pdf?rlkey=vj69ndeb55e1p5so4a9qtwl7p&dl=0',
            children: 'Special Meeting Minutes September 29, 2023',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/g7lk04fia214904axdned/BOD-Minutes-October-13-2023.pdf?rlkey=wya7domnwdjq4elea5gjmty1o&dl=0',
            children: 'BOD Minutes October 13, 2023',
          },
        ]}
      />
    ),
    button: {
      children: <NonBreakingSpan>Download All</NonBreakingSpan>,
      href: 'https://www.dropbox.com/scl/fi/rj51goh3ickst0q4en4em/fy23-24-minutes.zip?rlkey=hqcgqx2yfchuowz241wd7kwtw&dl=0',
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
