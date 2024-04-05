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
            href: 'https://www.dropbox.com/scl/fi/pn57mvy2705y74swssqf9/audit-committee-sep-8-23.docx?rlkey=0o3oqpizwqu72ospxtiu748hn&dl=0',
            children: 'Audit Committee Sep 8, 2023',
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
            children: 'Personnel Committee Oct 6, 2023',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/tu6vye98c8ewuejci99l3/bod-oct-13-23.docx?rlkey=yopndir9ke3o1wwfnlemtpz2p&dl=0',
            children: 'BOD Meeting Oct 13, 2023',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/8cjzpzbb66yvswsa6feoo/bod-nov-17-23.pdf?rlkey=floyjw88s8m3yz7e4l0ryzcdm&dl=0',
            children: 'BOD Meeting Nov 17, 2023',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/ep6gvcd2n8p7b8z5beoeg/bod-jan-19-24.pdf?rlkey=czpkh0944thji08kka4r1vvbb&dl=0',
            children: 'BOD Meeting Jan 19, 2024',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/d1q9iuy3fdrgai0oy52rd/bod-feb-9-24.docx?rlkey=xc1swg7cng5uu2qcixdxm4r0m&dl=0',
            children: 'Fiscal Committee Feb 9, 2024',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/650k0sd6mjibmgwv3v7ca/nominating-feb-9-24.docx?rlkey=gp1fhsneqpntyjq2vbyzav3r2&dl=0',
            children: 'Nominating Committee Feb 9, 2024',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/w1rrzq94dfhnfrif0hj0x/bod-feb-16-24.docx?rlkey=2es0rcl4diaw8mvasv0shwjc5&dl=0',
            children: 'BOD Meeting Feb 16, 2024',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/did9ye71fj5zvatiop4k1/Nominating-Committee-March-1-2024.docx?rlkey=sa5uwwdblrwc79nmhuusyswrv&dl=0',
            children: 'Nominating Committee Meeting Mar 1, 2024',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/yinettixdwa9805cof566/Agenda-U-SU-BOD-Special-Meeting-March-1-2024.docx?rlkey=8nzj3ba2rdddv3o4xbnkbdvdj&dl=0',
            children: 'BOD Special Meeting Mar 1, 2024',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/etcuwrep4ffmnxl281d64/Audit-Committee-March-8-2024.docx?rlkey=cm1qcv6g88shzcq8gnki7tq90&dl=0',
            children: 'BOD Audit Committee Meeting Mar 8, 2024',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/dzzvt3hvxgiwbzamhvzeo/BOD-Budget-Training-March-8-2024.docx?rlkey=yiki6arpd2t3nry2t46xmvvdi&dl=0',
            children: 'BOD Budget Training Mar 8, 2024',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/cnz3e3wp94omlfkcj4u6p/Agenda-U-SU-Board-of-Directors-March-15-2024.docx?rlkey=qmxqvmoo0r96sks46d1g1bbbj&dl=0',
            children: 'BOD Meeting Mar 15, 2024',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/4hyk3gsv8g6scr617l626/Agenda-Fiscal-Committee-April-12-2024.docx?rlkey=r9jrep7mkqwbucrymmwdjjy3u&dl=0',
            children: 'BOD Fiscal Committee Meeting Apr 12, 2024',
          },
        ]}
      />
    ),
    button: {
      children: <NonBreakingSpan>Download All</NonBreakingSpan>,
      href: 'https://www.dropbox.com/scl/fi/84w5cmuloskr3u19ncdwr/fy23-24.zip?rlkey=fi2cymy5mxbzif8p8vctr9al9&dl=0',
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
        ]}
      />
    ),
    button: {
      children: <NonBreakingSpan>Download All</NonBreakingSpan>,
      href: 'https://www.dropbox.com/scl/fi/pratoa4hjlg8fj856inet/fy23-24-minutes.zip.zip?rlkey=zz30qksuzup0adhc4l4k2nji8&dl=0',
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
