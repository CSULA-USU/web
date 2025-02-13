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
    title: 'Fiscal Year 24-25',
    children: (
      <DocumentLinkContainer
        stacked
        links={[
          {
            href: 'https://www.dropbox.com/scl/fi/9swbxe510wvl5ppttcyvc/Agenda-U-SU-Board-of-Directors-August-30-2024.docx?rlkey=90ttu2o7qmu1zeiqt7fpdfyzn&raw=1',
            children: 'Meeting August 30, 2024',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/4bffzfcit7fmu4nkj8aby/Agenda-Fiscal-Committee-September-13-2024.docx?rlkey=nsh58bdlv6z32v5cze7laok2k&st=1c15fbgm&raw=1',
            children: 'Fiscal Committee September 13, 2024',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/sv5wydj0gop9wtbbgtx5k/Agenda-Audit-Committee-September-13-2024.docx?rlkey=gywniga9axihrk9uhldlvpr6x&st=jp1e5atu&raw=1',
            children: 'Audit Committee September 13, 2024',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/hgwh281cms1qw6fnwzktw/Agenda-U-SU-Board-of-Directors-September-20-2024.docx?rlkey=8q3xoiagc81m1y19b2m7gvmet&raw=1',
            children: 'Meeting September 20, 2024',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/7dv75v6rxqb2atdrpdspe/Agenda-Board-of-Directors-October-25-2024.docx?rlkey=95jru0v5leqm3njjpoddat6gd&st=sga0hzg0&raw=1',
            children: 'Meeting October 25, 2024',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/o5kfe6rt5y8y08nypjt1e/Agenda-Ad-hoc-Bylaws-Committee-October-25-2024.docx?rlkey=0294tig72y3tvu7nendd40qq8&st=qu06ylot&raw=1',
            children: 'Ad-hoc Bylaws Committee October 25, 2024',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/awu36ja3dbkstvqd1nu6w/Agenda-Bylaws-Committee-November-15-2024.pdf?rlkey=0ye4ga9a5aufud2utffhmr0nx&st=th40w88x&raw=1',
            children: 'Bylaws Committee Meeting November 15, 2024',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/w9z5qm1d3unybtgh7sh3m/Agenda-Board-of-Directors-November-15-2024.pdf?rlkey=s0am8bq5nui55208kcyh6iy6a&st=t6dmsw7n&raw=1',
            children: 'Meeting November 15, 2024',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/8z4yn6933zgoxpvfr9b6g/Agenda-Bylaws-Committee-January-24-2025.docx?rlkey=jtznxpvgd5iixo4or9p9e0pgn&e=1&st=bt6xgpbj&raw=1',
            children: 'Bylaws Committee Meeting January 24, 2025',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/o3og18r3sf9r53wd0eyh6/Agenda-Board-of-Directors-January-31-2025-1.docx?rlkey=lfk3oqakaqplia4jp9ox821f8&e=1&st=0vbtz2yw&raw=1',
            children: 'Meeting January 31, 2025',
          },
        ]}
      />
    ),
    button: {
      children: <NonBreakingSpan>Download All</NonBreakingSpan>,
      href: 'https://www.dropbox.com/scl/fi/9brg9f24krmob5v62k57g/Archive.zip?rlkey=wiw2dc6smwm0yx7lm47ikl5o3&st=8psm7j2q&dl=1',
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
            href: 'https://www.dropbox.com/scl/fi/p95bxqarp97fy5ju737z4/Minutes-Board-of-Directors-August-30-2024-signed.pdf?rlkey=40neyyje6c1bwno80hdquz798&st=toduyfkj&raw=1',
            children: 'Board of Directors August 30, 2024',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/94w7xkjtj4e6zlts3h5it/Minutes-Board-of-Directors-September-20-2024-signed.pdf?rlkey=t8q7gnmtp4k9cg6boelxd6ag0&st=e0r3fho7&raw=1',
            children: 'Board of Directors September 20, 2024',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/rip35bl3fl53q55mvk5t0/Minutes-Ad-hoc-Bylaws-Committee-October-25-2024.pdf?rlkey=xzsool8vco5he3xc3imr6cpbx&st=0u9iyalq&raw=1',
            children: 'Ad-hoc Bylaws Committee October 25, 2024',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/t0dthpyhivzksdfvks8pc/Minutes-Board-of-Directors-October-25-2024.pdf?rlkey=upvkzzqs7kj5ghpubff5wf4tb&st=ww1w9fw8&raw=1',
            children: 'Board of Directors October 25, 2024',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/47lz4fwe622znkpoza7qp/Minutes-Board-of-Directors-November-15-2024-Updated.pdf?rlkey=wp3asr82xgz0qfrk63czpts43&st=kgapdh11&raw=1',
            children: 'Board of Directors November 15 Updated, 2024',
          },
        ]}
      />
    ),
    button: {
      children: <NonBreakingSpan>Download All</NonBreakingSpan>,
      href: 'https://www.dropbox.com/scl/fi/3nkk1zq3bb7zpfmr4qpq4/fy24-25.zip?rlkey=58lkwsrfnm0vul7uh5sc5lfhn&st=e1hhlbq2&dl=1',
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
        title="Fiscal Year 24-25"
        button={{
          children: <NonBreakingSpan>See Schedule</NonBreakingSpan>,
          href: 'https://www.dropbox.com/scl/fi/01d4zzbyz3s2bpqq14uqf/2024-2025-meeting-schedule.zip?rlkey=98tk7cyfh3c16xud89juth7hr&st=6upmmwc8&raw=1',
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
