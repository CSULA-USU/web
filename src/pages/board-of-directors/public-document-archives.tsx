import Head from 'next/head';
import { DocumentLinkContainer, Header, Page } from 'modules';
import { Expandable, FluidContainer, Typography } from 'components';
import archiveData from 'data/public-document-archives.json';
import { useBreakpoint } from 'hooks';
import { BiChevronRight } from 'react-icons/bi';
import styled from 'styled-components';
import { Spaces } from 'theme';

const FYContainer = styled.div`
  border: 1px solid;
  margin: 8px;
`;

export default function PublicDocumentArchives() {
  const { isMobile } = useBreakpoint();
  return (
    <Page>
      <Head>
        <title>U-SU Public Docs Archive</title>
        <meta
          name="keywords"
          content="The University Student Union, California State University Los Angeles, Student Union, CSULA, Cal State LA, U-SU, USU, Board of Directors, Board, Directors, Student, Leader, ASI, Agenda, Minutes, Meetings, Archive"
          key="keywords"
        />
      </Head>
      <Header
        title="Archives"
        backgroundImage="/backgrounds/subtle-background-3.jpg"
      ></Header>
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
                      <DocumentLinkContainer links={fymeet.data} />
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
                      <DocumentLinkContainer links={fyminutes.data} />
                    </FluidContainer>
                  </Expandable>
                </FluidContainer>
              </FYContainer>
            );
          })}
        </FluidContainer>
      </FluidContainer>
    </Page>
  );
}
