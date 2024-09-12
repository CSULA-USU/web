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
            children: 'BOD Meeting August 30, 2024',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/4bffzfcit7fmu4nkj8aby/Agenda-Fiscal-Committee-September-13-2024.docx?rlkey=nsh58bdlv6z32v5cze7laok2k&st=1c15fbgm&dl=0',
            children: 'Fiscal Committee September 13, 2024',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/sv5wydj0gop9wtbbgtx5k/Agenda-Audit-Committee-September-13-2024.docx?rlkey=gywniga9axihrk9uhldlvpr6x&st=jp1e5atu&dl=0',
            children: 'Audit Committee September 13, 2024',
          },
        ]}
      />
    ),
    button: {
      children: <NonBreakingSpan>Download All</NonBreakingSpan>,
      href: 'https://www.dropbox.com/scl/fi/06bozfxo0oijt694vh5gd/Archive.zip?rlkey=9e0nhtzdotua1zuaaicwpdcgy&st=8ua40rsq&dl=0',
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
            href: 'https://www.dropbox.com/scl/fi/os3w86bgfj9hdaaympi95/Minutes-Audit-Committee-September-8-2023-signed.pdf?rlkey=85ll9kldufbwctsxfl7vyla21&dl=0',
            children: 'BOD Minutes Audit Committee September 8, 2023',
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
          {
            href: 'https://www.dropbox.com/scl/fi/1l1srke43ahma579aai9d/Minutes-Board-of-Directors-November-17-2023-signed.pdf?rlkey=kh3lpvmanywd7birbm0nu8p8v&dl=0',
            children: 'BOD Minutes November 17, 2023',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/5o9sd8696gemhxivwu35u/Minutes-Board-of-Directors-January-19-2024-signed.pdf?rlkey=sdj410mwecexfm43u8to9yh3n&dl=0',
            children: 'BOD Minutes January 19, 2024',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/n3c8mb2v6lfplmizct64q/Minutes-Nominating-Committee-February-9-2024.pdf?rlkey=xsqeijfxogrelhp1wzlentpic&dl=0',
            children: 'BOD Minutes Nominating Committee February 9, 2024',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/r2p1uwpew70d98ci1rchc/Minutes-BOD-Meeting-February-16-2024-signed.pdf?rlkey=v4wjzsptvm17q01nz2qxm7s8h&dl=0',
            children: 'BOD Minutes February 16, 2024',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/e26r9k2x6ryu3dp1hx6cg/Special-Meeting-Minutes-March-1-2024.pdf?rlkey=zmn11cyfl440ly728tma6vek6&dl=0',
            children: 'BOD Special Meeting Minutes March 1, 2024',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/8mzpg98jvrmh3ikograio/Approved-Minutes-Board-of-Directors-March-15-2024-signed.pdf?rlkey=mywdwfmlx9q13lype6cgh793e&dl=0',
            children: 'BOD Special Meeting Minutes March 15, 2024',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/gukddkrpb9cgara5r4pfe/Minutes-Board-of-Directors-April-19-2024-signed.pdf?rlkey=2jht2n0nkcu3klffkx4sou2l4&dl=0',
            children: 'BOD Special Meeting Minutes April 19, 2024',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/aicuc5dp5qjl5avqx7mn2/Minutes-Board-of-Directors-May-10-2024.pdf?rlkey=5sivgrvf1g0u7xssdmlsn1brq&dl=0',
            children: 'BOD Special Meeting Minutes May 10, 2024',
          },
        ]}
      />
    ),
    button: {
      children: <NonBreakingSpan>Download All</NonBreakingSpan>,
      href: 'https://www.dropbox.com/scl/fi/8rs0pip87oi8lcy9ajxnd/fy23-24.zip?rlkey=ozry91k5f2f21jmzpnbd9tj45&dl=0',
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
