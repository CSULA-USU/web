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
            href: 'https://www.dropbox.com/scl/fi/w2nyhsjbqkozpywnddgbt/Agenda-U-SU-Board-of-Directors-August-30-2024.pdf?rlkey=tg7fw41qv0syx3ghvuz145jp0&st=709hvjpc&raw=1',
            children: 'Meeting August 30, 2024',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/4bffzfcit7fmu4nkj8aby/Agenda-Fiscal-Committee-September-13-2024.docx?rlkey=nsh58bdlv6z32v5cze7laok2k&st=1c15fbgm&raw=1',
            children: 'Fiscal Committee September 13, 2024',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/93iezggm4qo4xca0l99ba/Agenda-Fiscal-Committee-September-13-2024.pdf?rlkey=8viny9dr6slfnvykuzeuvia3o&st=lpbad2wg&raw=1',
            children: 'Audit Committee September 13, 2024',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/krif2ix2f4pxfz58raucx/Agenda-U-SU-Board-of-Directors-September-20-2024.pdf?rlkey=zwixo00atn93l0f531lbge32z&st=ex8fklaz&raw=1',
            children: 'Meeting September 20, 2024',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/zy423o8ueoggkygthsh2s/Agenda-Board-of-Directors-October-25-2024.pdf?rlkey=7myrj8xld5ocd8yoosux3tsz9&st=qc5snz5j&raw=1',
            children: 'Meeting October 25, 2024',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/p7mjatek898q16u562nnu/Agenda-Ad-hoc-Bylaws-Committee-October-25-2024.pdf?rlkey=i6futigbmmgqpcx8tmk73j22a&st=vh2bwahy&raw=1',
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
            href: 'https://www.dropbox.com/scl/fi/m4kvevpjmwdhg26vpzj31/Agenda-Bylaws-Committee-January-24-2025.pdf?rlkey=qq9p3jx4c1x7pz4bv5ziv5hsb&st=gcf6ylv3&raw=1',
            children: 'Bylaws Committee Meeting January 24, 2025',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/3hcx7auj7scag9qs4mpb7/Agenda-Board-of-Directors-January-31-2025-1.pdf?rlkey=0v9cji2byh05yezrp7iirn34i&st=bphrwt1l&raw=1',
            children: 'Meeting January 31, 2025',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/tv8vzpavw2n385eol74cx/Agenda-Board-of-Directors-February-28-2025.pdf?rlkey=i78gu15h05my82dkwo3y2m7fy&st=ielnb1ks&raw=1',
            children: 'Board of Directors February 28, 2025',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/iw0malrs4hvra1653p22x/Agenda-Audit-Committee-February-21-2025.pdf?rlkey=akv0x5dc285vf4g4c5gywdl8o&st=8uvrxf6q&raw=1',
            children: 'Audit Committee February 21, 2025',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/ox59rxw4rmv0c0e28k7vn/Agenda-Board-of-Directors-March-21-2025.pdf?rlkey=wcxiyudot0dkaj0vvc5uwvbd4&st=yin0hl6b&raw=1',
            children: 'Board of Directors March 21, 2025',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/1ee85ad260ofp286bqtv3/Agenda-Fiscal-Committee-April-11-2025.pdf?rlkey=zgrkwuzmfr3vk42amsx2dm6cj&st=qg6wjxhg&raw=1',
            children: 'Fiscal Committee April 11, 2025',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/mm3zrfdwjpgofdxob2k8i/Agenda-Board-of-Directors-May-9-2025.pdf?rlkey=finzhhdudhosoww5zlf6siska&st=zdj6td4u&raw=1',
            children: 'Board of Directors May 9, 2025',
          },
        ]}
      />
    ),
    button: {
      children: <NonBreakingSpan>Download All</NonBreakingSpan>,
      href: 'https://www.dropbox.com/scl/fi/1p5gut4b0nfc2mv11fw0r/fy24-25.zip?rlkey=qhbmpqspthqkd9cj1bkpilsj5&st=r9sdt259&dl=1',
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
            href: 'https://www.dropbox.com/scl/fi/qjdf6whh9d53lny0ii5zt/Minutes-Fiscal-Committee-September-13-2024.pdf?rlkey=17h5xwjd2q018wsv6giypeetu&st=8vwxa5wl&raw=1',
            children: 'Fiscal Committee September 13, 2024',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/qs2z3f91tobya4ofdlumk/Minutes-Audit-Committee-September-13-2024-signed.pdf?rlkey=hnxizdehq6ee5g37sss582qf6&st=1tzvusfc&raw=1',
            children: 'Audit Committee September 13, 2024',
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
          {
            href: 'https://www.dropbox.com/scl/fi/0x13a0sx2try9ev9dh8zr/Minutes-Bylaws-Committee-November-15-2024.pdf?rlkey=s2t4wtc1r9eznvrtsoa989fzj&st=wj2bpwqk&raw=1',
            children: 'Bylaws Committee November 15 Updated, 2024',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/gc46pw6ycxaohxvnnolcn/Minutes-Bylaws-Committee-January-24-2025.pdf?rlkey=e88bkudssvff35q042bbqt897&st=6mzp18f6&raw=1',
            children: 'Bylaws Committee January 24, 2025',
          },
          {
            href: 'https://www.dropbox.com/s/0qbxps2y2znhvxe/Minutes%20Board%20of%20Directors%20January%2031%2C%202025.pdf?st=0zyj2un5&raw=1',
            children: 'Board of Directors January 31, 2025',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/le8vuwzxojm5yu2mj05ov/Minutes-Board-of-Directors-February-28-2025-signed.pdf?rlkey=er36nhlq3yodsyvx4153p96dc&st=yksmnylj&raw=1',
            children: 'Board of Directors February 28, 2025',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/mg8mnw7m7fw16pvd4mlp9/Minutes-Fiscal-Committee-March-14-2025.pdf?rlkey=m75sqp6jgcra9essrgx436m49&st=2qklo1mi&raw=1',
            children: 'Fiscal Committee March 14, 2025',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/3g4yc74dx8av8ijiasy0c/Minutes-Board-of-Directors-March-21-2025.pdf?rlkey=joxzk6ct32lvm2nv4i1pb7lws&st=ybumvcke&raw=1',
            children: 'Board of Directors March 21, 2025',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/j09rkgny0ig5szg813b9w/Minutes-Board-of-Directors-April-18-2025.pdf?rlkey=qi1ehz0tyus3n3q7z7squy3n0&st=ebufnylt&raw=1',
            children: 'Board of Directors April 18, 2025',
          },
        ]}
      />
    ),
    button: {
      children: <NonBreakingSpan>Download All</NonBreakingSpan>,
      href: 'https://www.dropbox.com/scl/fi/trkt9rnvwxbtti0a19cro/minutes-fy24-25.zip?rlkey=6hpx0nsw1hna8yfb6j6uzra0x&st=0o1n6kpj&dl=1',
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
