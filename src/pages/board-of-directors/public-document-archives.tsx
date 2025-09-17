import Head from 'next/head';
import {
  DocumentLinkContainer,
  DownloadSection,
  DownloadSectionProps,
  Header,
  Page,
} from 'modules';
import {
  Expandable,
  FluidContainer,
  NonBreakingSpan,
  Typography,
} from 'components';
import archiveData from 'data/public-document-archives.json';
import { useBreakpoint } from 'hooks';
import { BiChevronRight } from 'react-icons/bi';
import styled from 'styled-components';
import { Spaces } from 'theme';

const FYContainer = styled.div`
  border: 1px solid;
  margin: 8px;
`;

const scheduleSection: DownloadSectionProps = {
  title: 'Meeting Calendar',
  children: (
    <DocumentLinkContainer
      links={archiveData.schedules.calendar}
      autoGrid
      minColumnWidth="600px"
    />
  ),
  button: {
    children: <NonBreakingSpan>&nbsp;Download All&nbsp;&nbsp;</NonBreakingSpan>,
    href: 'https://www.dropbox.com/scl/fi/01d4zzbyz3s2bpqq14uqf/2024-2025-meeting-schedule.zip?rlkey=98tk7cyfh3c16xud89juth7hr&st=ddcdkwgq&dl=1',
    variant: 'black',
  },
};

export default function PublicDocumentArchives() {
  const { isMobile } = useBreakpoint();
  return (
    <Page>
      <Head>
        <title>U&ndash;SU Public Document Archive</title>
        <meta
          name="keywords"
          content="The University Student Union, California State University Los Angeles, Student Union, CSULA, Cal State LA, U-SU, USU, Board of Directors, Board, Directors, Student, Leader, ASI, Agenda, Minutes, Meetings, Archive, public documents,"
          key="keywords"
        />
      </Head>
      <Header
        title="Archives"
        backgroundImage="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/backgrounds/subtle-background-3.webp"
      />
      <FluidContainer>
        <Typography as="h2" variant="title" size={isMobile ? 'lg' : '2xl'}>
          Agenda
        </Typography>
        <FluidContainer
          flex
          flexDirection="column"
          padding={isMobile ? Spaces.sm : Spaces.md}
        >
          {archiveData.agenda.meeting.map((fymeet) => {
            return (
              <FYContainer key={fymeet.fy}>
                <FluidContainer padding="0px 16px">
                  <Expandable
                    indicator={<BiChevronRight color="black" size={48} />}
                    header={
                      <Typography variant="labelTitle" as="h3">
                        {fymeet.fy}
                      </Typography>
                    }
                  >
                    <FluidContainer
                      flex
                      justifyContent="space-between"
                      padding={isMobile ? '0px' : ''}
                    >
                      <DocumentLinkContainer links={fymeet.data} grid />
                    </FluidContainer>
                  </Expandable>
                </FluidContainer>
              </FYContainer>
            );
          })}
        </FluidContainer>
        <Typography as="h2" variant="title" size={isMobile ? 'lg' : '2xl'}>
          Minutes
        </Typography>
        <FluidContainer
          flex
          flexDirection="column"
          padding={isMobile ? Spaces.sm : Spaces.md}
        >
          {archiveData.minutes.map((fyminutes) => {
            return (
              <FYContainer key={fyminutes.fy}>
                <FluidContainer padding="0px 16px">
                  <Expandable
                    indicator={<BiChevronRight color="black" size={48} />}
                    header={
                      <Typography variant="labelTitle" as="h3">
                        {fyminutes.fy}
                      </Typography>
                    }
                  >
                    <FluidContainer
                      flex
                      justifyContent="space-between"
                      padding={isMobile ? '0px' : ''}
                    >
                      <DocumentLinkContainer links={fyminutes.data} grid />
                    </FluidContainer>
                  </Expandable>
                </FluidContainer>
              </FYContainer>
            );
          })}
        </FluidContainer>
        <Typography as="h2" variant="title" size={isMobile ? 'lg' : '2xl'}>
          Schedules
        </Typography>
        <DownloadSection {...scheduleSection} />
      </FluidContainer>
    </Page>
  );
}
