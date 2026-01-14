import {
  FluidContainer,
  NonBreakingSpan,
  Typography,
  Expandable,
  StyledLink,
} from 'components';
import {
  DocumentLinkContainer,
  DownloadSection,
  DownloadSectionProps,
  Header,
  Page,
} from 'modules';
import { useBreakpoint } from 'hooks';
import archiveData from 'data/public-document-archives.json';
import { Spaces } from 'theme';
import { getDownloadAllDoc, getMeetingDocuments } from 'api/bod';
import type { Document } from 'types/Backoffice';
import { useState, useEffect, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { BiChevronRight } from 'react-icons/bi';

const FYContainer = styled.div`
  border: 1px solid;
  margin: 8px;
`;

const formSection: DownloadSectionProps = {
  children: (
    <DocumentLinkContainer links={archiveData['Form 990 & 199'].data} />
  ),
};

const latestAuditedSection: DownloadSectionProps = {
  children: (
    <DocumentLinkContainer
      links={archiveData['Latest Audited Financial Statements'].data}
    />
  ),
};

const sortByDateAsc = (a: Document, b: Document) =>
  (a.date ?? '').localeCompare(b.date ?? '');

const groupByFy = (docs: Document[]) =>
  docs.reduce((acc, d) => {
    const key = d.fy ?? 'Unknown FY';
    (acc[key] ||= []).push(d);
    return acc;
  }, {} as Record<string, Document[]>);

const fyRank = (fy: string) => {
  const m = /(\d{2}).*?(\d{2})?/.exec(fy);
  if (!m) return -1;
  const start = Number(m[1]);
  const end = Number(m[2] ?? String((start + 1) % 100).padStart(2, '0'));
  return start * 100 + end;
};
const sortFyDesc = ([a]: [string, Document[]], [b]: [string, Document[]]) =>
  fyRank(b) - fyRank(a);

export default function PublicDocumentArchives() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [calendarDownloadAll, setCalendarDownloadAll] =
    useState<Document | null>(null);
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  const agendas = useMemo(
    () => documents.filter((d) => d.category === 'Agenda').sort(sortByDateAsc),
    [documents],
  );
  const minutes = useMemo(
    () => documents.filter((d) => d.category === 'Minutes').sort(sortByDateAsc),
    [documents],
  );

  const agendasNoAll = useMemo(
    () => agendas.filter((d) => !d.is_download_all).sort(sortByDateAsc),
    [agendas],
  );
  const minutesNoAll = useMemo(
    () => minutes.filter((d) => !d.is_download_all).sort(sortByDateAsc),
    [minutes],
  );

  const agendasByFy = useMemo(() => groupByFy(agendasNoAll), [agendasNoAll]);
  const minutesByFy = useMemo(() => groupByFy(minutesNoAll), [minutesNoAll]);
  const calendarLinks = useMemo(
    () =>
      documents
        .filter((d) => d.category === 'Calendar' && !d.is_download_all)
        .map((d) => ({ href: d.url, children: d.title + ' (Archived)' })),
    [documents],
  );

  const toLinks = useCallback(
    (docs: Document[]) =>
      docs.map((d) => ({ href: d.url, children: d.title + ' (Archived)' })),
    [],
  );

  useEffect(() => {
    let alive = true;
    (async () => {
      const [rows, calAll] = await Promise.all([
        getMeetingDocuments({ isArchived: true, order: 'asc' }),
        getDownloadAllDoc('Calendar', { isArchived: false }),
      ]);
      if (!alive) return;
      setDocuments([...rows].sort(sortByDateAsc));
      setCalendarDownloadAll(calAll);
    })();
    return () => {
      alive = false;
    };
  }, []);
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

      <FluidContainer
        padding={
          isDesktop
            ? '18px 16px 0 16px'
            : isTablet
            ? '18px 36px 0 36px'
            : '36px 72px 0 72px'
        }
      >
        <Typography variant="title" weight="400" size={isMobile ? 'sm' : 'md'}>
          Files on this page are for historic reference. If you need an
          accessible version, please contact{' '}
          <StyledLink
            href="mailto:Accessibility@calstatela.edu"
            isInverseUnderlineStyling
          >
            Accessibility@calstatela.edu
          </StyledLink>
        </Typography>
      </FluidContainer>
      <FluidContainer>
        <Typography as="h2" variant="title" size={isMobile ? 'lg' : '2xl'}>
          990 & 199
        </Typography>
        <DownloadSection {...formSection} />
        <Typography as="h2" variant="title" size={isMobile ? 'lg' : '2xl'}>
          Latest Audited Financial Statements
        </Typography>
        <DownloadSection {...latestAuditedSection} />
        <Typography as="h2" variant="title" size={isMobile ? 'lg' : '2xl'}>
          Agenda
        </Typography>
        <FluidContainer
          flex
          flexDirection="column"
          padding={isMobile ? Spaces.sm : Spaces.md}
        >
          {/* Agenda */}
          {Object.entries(agendasByFy)
            .sort(sortFyDesc)
            .map(([fy, docs]) => (
              <FYContainer key={fy}>
                <FluidContainer padding="0 16px">
                  <Expandable
                    indicator={<BiChevronRight color="black" size={48} />}
                    header={
                      <Typography variant="labelTitle" as="h3">
                        {fy}
                      </Typography>
                    }
                  >
                    <FluidContainer
                      flex
                      justifyContent="space-between"
                      padding={isMobile ? '0' : ''}
                    >
                      <DocumentLinkContainer links={toLinks(docs)} grid />
                    </FluidContainer>
                  </Expandable>
                </FluidContainer>
              </FYContainer>
            ))}
        </FluidContainer>
        <Typography as="h2" variant="title" size={isMobile ? 'lg' : '2xl'}>
          Minutes
        </Typography>
        <FluidContainer
          flex
          flexDirection="column"
          padding={isMobile ? Spaces.sm : Spaces.md}
        >
          {/* Agenda */}
          {Object.entries(minutesByFy)
            .sort(sortFyDesc)
            .map(([fy, docs]) => (
              <FYContainer key={fy}>
                <FluidContainer padding="0 16px">
                  <Expandable
                    indicator={<BiChevronRight color="black" size={48} />}
                    header={
                      <Typography variant="labelTitle" as="h3">
                        {fy}
                      </Typography>
                    }
                  >
                    <FluidContainer
                      flex
                      justifyContent="space-between"
                      padding={isMobile ? '0' : ''}
                    >
                      <DocumentLinkContainer links={toLinks(docs)} grid />
                    </FluidContainer>
                  </Expandable>
                </FluidContainer>
              </FYContainer>
            ))}
        </FluidContainer>
        <Typography as="h2" variant="title" size={isMobile ? 'lg' : '2xl'}>
          Schedules
        </Typography>

        <DownloadSection
          title="Meeting Calendar"
          button={
            calendarDownloadAll
              ? {
                  children: <NonBreakingSpan>Download All</NonBreakingSpan>,
                  href: calendarDownloadAll.url,
                  variant: 'black',
                }
              : undefined
          }
        >
          <DocumentLinkContainer links={calendarLinks} />
        </DownloadSection>
      </FluidContainer>
    </Page>
  );
}
