import Head from 'next/head';
import { DocumentLinkContainer, Header, Page } from 'modules';
import { Expandable, FluidContainer, TypeProps, Typography } from 'components';
import archiveData from 'data/public-document-archives.json';
import { useBreakpoint } from 'hooks';
import { BiChevronRight } from 'react-icons/bi';
import styled from 'styled-components';
import { Spaces } from 'theme';

const FYContainer = styled.div`
  border: 1px solid;
  margin: 8px;
`;

const typographyProps = {
  variant: 'titleSmall',
  as: 'h3',
  color: 'gold',
} as TypeProps;

export default function Governance() {
  const { isMobile } = useBreakpoint();
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
      <FluidContainer>
        <Typography as="h2" variant="title" size={isMobile ? 'lg' : '2xl'}>
          Agenda
        </Typography>
        <FluidContainer
          flex
          flexDirection="column"
          padding={isMobile ? Spaces.sm : Spaces.md}
        >
          <Typography {...typographyProps} size={isMobile ? 'md' : 'xl'}>
            Committee
          </Typography>
          {archiveData.agenda.committee.map((fycm) => {
            return (
              <FYContainer key={fycm.fy}>
                <FluidContainer padding="0px 16px">
                  <Expandable
                    indicator={<BiChevronRight color="black" size={48} />}
                    header={
                      <Typography variant="labelTitle" as="h4">
                        {fycm.fy}
                      </Typography>
                    }
                  >
                    <FluidContainer
                      flex
                      justifyContent="space-between"
                      padding={isMobile ? '0px' : ''}
                    >
                      <DocumentLinkContainer links={fycm.data} />
                    </FluidContainer>
                  </Expandable>
                </FluidContainer>
              </FYContainer>
            );
          })}
          <Typography
            {...typographyProps}
            size={isMobile ? 'md' : 'xl'}
            margin="16px 0px 0px"
          >
            Meeting
          </Typography>
          {archiveData.agenda.meeting.map((fymeet) => {
            return (
              <FYContainer key={fymeet.fy}>
                <FluidContainer padding="0px 16px">
                  <Expandable
                    indicator={<BiChevronRight color="black" size={48} />}
                    header={
                      <Typography variant="labelTitle" as="h4">
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
                      <Typography variant="labelTitle" as="h4">
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
