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
    title: 'Fiscal Year 25-26',
    children: (
      <DocumentLinkContainer
        stacked
        links={[
          {
            href: 'https://www.dropbox.com/scl/fi/u2axl3qac4r0yuy9my1um/Agenda-Board-of-Directors-August-22-2025.docx?rlkey=dp1tmxt65802vara3yspdpsqi&raw=1',
            children: 'Board of Directors August 22, 2025',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/knyqgk8gxc1hk23fl9g0g/Agenda-Audit-Committee-September-5-2025.docx?rlkey=5pvkzsfjlq05zbd1j0knf8kqu&st=87glw3e7&dl=1',
            children: 'Audit Committee September 5, 2025',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/lno74rhp8e42v4mze1jwn/Agenda-Board-of-Directors-September-12-2025.docx?rlkey=78ypckh8tn6u80osgkgljhlba&st=tu431nqk&raw=1',
            children: 'Board of Directors September 12, 2025',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/sftxiucm7oxbc2ajrxaqf/Agenda-Personnel-Committee-September-19-2025OCR.pdf?rlkey=gdvzutqb5hczp57cwc6csuq8y&st=u38hilj7&raw=1',
            children: 'Personnel Committee September 19, 2025',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/31n4ez7azdgr3cv1a5yh4/Agenda-Fiscal-Committee-September-19-2025.pdf?rlkey=nlg1pm6e86z6hw9f9ay4yvpzk&st=unz1fuh4&raw=1',
            children: 'Fiscal Committee September 19, 2025',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/jttvpqe64sb4v41xpzts7/Agenda-Facilities-Committee-October-3-2025.pdf?rlkey=fz0letg18hwdlk6a9a1dfe78q&st=9ihitx06&raw=1',
            children: 'Facilities Committee October 3, 2025',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/g3tr26lgf6u9ltmdiwiq3/Agenda-Nominating-Committee-October-3-2025.docx?rlkey=34cj858ig7guur0epxrquibl7&st=ti7a65pw&raw=1',
            children: 'Nominating Committee October 3, 2025',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/xathkyrwrtz19y65esfn6/Agenda-Board-of-Directors-October-10-2025.docx?rlkey=7bt1jrqs208n2t1lrtsjg900g&st=pwn3di1h&dl=1',
            children: 'Board of Directors October 10, 2025',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/ois9tkjpqpd1jx1yisbxm/Agenda-Fiscal-Committee-October-17-2025.docx?rlkey=wyrbnz4mhyih4dl0ecznfvi4n&st=nvmxoxk8&dl=1',
            children: 'Fiscal Committee October 17, 2025',
          },
        ]}
      />
    ),
    button: {
      children: <NonBreakingSpan>Download All</NonBreakingSpan>,
      href: 'https://www.dropbox.com/scl/fi/fec2wqzx7imk06omxhr56/agenda-fy25-26.zip?rlkey=19kxw7hfhinzg7w2kvycl5bv9&st=ndzhk6px&dl=1',
      variant: 'black',
    },
  },
];

const minutesDownloads: DownloadSectionProps[] = [
  {
    title: 'Fiscal Year 25-26',
    children: (
      <DocumentLinkContainer
        stacked
        links={[
          {
            href: 'https://www.dropbox.com/scl/fi/xrh2wtrn4fncopggiyldt/Board-of-Directors-August-22-2025-signed.pdf?rlkey=aux3w475pcriois56anskoz56&st=dsweay6y&raw=1',
            children: 'Board of Directors August 22, 2025',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/peqoimwoy2x9v3vlecq1s/Minutes-Board-of-Directors-September-12-2025-signed.pdf?rlkey=on8lfsfctxoa1fux1314evrhx&st=xx6n3kfp&raw=1',
            children: 'Board of Directors September 12, 2025',
          },
        ]}
      />
    ),
    button: {
      children: <NonBreakingSpan>Download All</NonBreakingSpan>,
      href: 'https://www.dropbox.com/scl/fi/90khb45zj9zho4l5rza5k/minutes-fy25-26.zip?rlkey=ysz6jtkn2w0wg00qf26e158jf&st=vdbnkk73&dl=1',
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
        title="Fiscal Year 25-26"
        button={{
          children: <NonBreakingSpan>See Schedule</NonBreakingSpan>,
          href: 'https://www.dropbox.com/scl/fi/qoti96w0h1n34qaqqv86t/Calendar-BOD-Meetings-FY-2025-2026.pdf?rlkey=mrm017dkuhf6evz6ls0ccyvo2&st=jilw4z5t&raw=1',
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
