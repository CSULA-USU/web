import Head from 'next/head';
import { DocumentLinkContainer, Header, Page } from 'modules';
import { FluidContainer, TypeProps, Typography } from 'components';
import { Spaces } from 'theme';
import { GovernanceFooter } from 'partials';

const typographyProps = {
  variant: 'titleSmall',
  as: 'h2',
  color: 'gold',
  margin: `${Spaces.xl} 0 0`,
} as TypeProps;

const agendaLinks = [
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
];

const minutesLinks = agendaLinks;
const meetingLinks = agendaLinks;

export default function Governance() {
  return (
    <Page>
      <Head>
        <title>U-SU Public Docs Archive</title>
        <meta name="author" content="The University Student Union" />
        <meta
          name="keywords"
          content="The University Student Union, California State University Los Angeles, Student Union, CSULA, Cal State LA, U-SU, USU, Board of Directors, Board, Directors, Student, Leader, ASI, Agenda, Minutes, Meetings, Archive"
        />
        <meta
          name="description"
          content="The University-Student Union inc. (U-SU) at California State University, Los Angeles, was established in 1975. With open doors and minds, we provide space and opportunities enabling Golden Eagles to soar. We accomplish this by encouraging social, cultural, recreational, and educational programming for the University and broader community. We foster a vibrant and equitable campus climate. Our vision is to be Cal State LA’s hub for connection and growth."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header
        title="Archives"
        backgroundImage="/backgrounds/subtle-background-3.jpg"
      ></Header>
      <FluidContainer flex justifyContent="space-between">
        <div>
          <Typography as="h2" {...typographyProps}>
            Agenda
          </Typography>
          <DocumentLinkContainer stacked links={agendaLinks} />
        </div>
        <div>
          <Typography as="h2" {...typographyProps}>
            Minutes
          </Typography>
          <DocumentLinkContainer stacked links={minutesLinks} />
        </div>
        <div>
          <Typography as="h2" {...typographyProps}>
            Meetings
          </Typography>
          <DocumentLinkContainer stacked links={meetingLinks} />
        </div>
      </FluidContainer>
      <GovernanceFooter />
    </Page>
  );
}
