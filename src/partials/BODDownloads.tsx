import {
  Divider,
  FluidContainer,
  NonBreakingSpan,
  Typography,
  TypeProps,
  StyledLink,
} from 'components';
import { DocumentLinkContainer, DownloadSection } from 'modules';
import { useBreakpoint } from 'hooks';
import { Spaces } from 'theme';
import { getMeetingDocuments } from 'api';
import type { Document } from 'types/Backoffice';
import { useState, useEffect, useMemo } from 'react';

const typographyProps = {
  variant: 'titleSmall',
  as: 'h2',
  color: 'gold',
  margin: `${Spaces.xl} 0 0`,
} as TypeProps;

export const BODDownloads = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const { isMobile, isDesktop } = useBreakpoint();

  const sortByDateAsc = (a: Document, b: Document) =>
    (a.date ?? '').localeCompare(b.date ?? '');

  const agendas = useMemo(
    () =>
      documents
        .filter((d) => d.category === 'Agenda' && !d.is_download_all)
        .sort(sortByDateAsc),
    [documents],
  );
  const calendarLink = useMemo(
    () =>
      documents.find((d) => d.category === 'Calendar' && !d.is_download_all),
    [documents],
  );
  const minutes = useMemo(
    () =>
      documents
        .filter((d) => d.category === 'Minutes' && !d.is_download_all)
        .sort(sortByDateAsc),
    [documents],
  );
  const agendaDownloadAll = useMemo(
    () =>
      documents.find((d) => d.category === 'Agenda' && d.is_download_all) ??
      null,
    [documents],
  );
  const minutesDownloadAll = useMemo(
    () =>
      documents.find((d) => d.category === 'Minutes' && d.is_download_all) ??
      null,
    [documents],
  );

  // tiny adapter for DocumentLinkContainer
  const toLinks = (docs: Document[]) =>
    docs.map((d) => ({ href: d.url, children: d.title }));

  useEffect(() => {
    let alive = true;
    (async () => {
      const rows = await getMeetingDocuments({
        isArchived: false,
        order: 'asc',
      });
      if (!alive) return;
      const sorted = [...rows].sort(sortByDateAsc);
      setDocuments(sorted);
    })();
    return () => {
      alive = false;
    };
  }, []);
  return (
    <FluidContainer padding={isDesktop ? '0 36px 24px' : '0 72px 36px'}>
      <Typography {...typographyProps} size={isMobile ? 'lg' : '2xl'}>
        Meeting Calendar
      </Typography>
      <Divider color="grey" margin={`${Spaces.xl} 0`} />
      <DownloadSection
        title="Fiscal Year 25-26"
        button={
          calendarLink
            ? {
                children: <NonBreakingSpan>See Schedule</NonBreakingSpan>,
                href: calendarLink.url,
                variant: 'black',
              }
            : undefined
        }
      />
      <Typography {...typographyProps} size={isMobile ? 'lg' : '2xl'}>
        Agenda
      </Typography>
      <Divider color="grey" margin={`${Spaces.xl} 0`} />
      <DownloadSection
        title="Fiscal Year 25-26"
        button={
          agendaDownloadAll
            ? {
                children: <NonBreakingSpan>Download All</NonBreakingSpan>,
                href: agendaDownloadAll.url,
                variant: 'black',
              }
            : undefined
        }
      >
        <DocumentLinkContainer stacked links={toLinks(agendas)} />
      </DownloadSection>

      <Typography {...typographyProps} size={isMobile ? 'lg' : '2xl'}>
        Minutes
      </Typography>
      <Divider color="grey" margin={`${Spaces.xl} 0`} />
      <DownloadSection
        title="Fiscal Year 25-26"
        button={
          minutesDownloadAll
            ? {
                children: <NonBreakingSpan>Download All</NonBreakingSpan>,
                href: minutesDownloadAll.url,
                variant: 'black',
              }
            : undefined
        }
      >
        <DocumentLinkContainer stacked links={toLinks(minutes)} />
      </DownloadSection>

      <FluidContainer padding="0">
        <StyledLink href="/board-of-directors/public-document-archives">
          <Typography
            variant="labelTitleSmall"
            color="gold"
            size="sm"
            weight="400"
          >
            View All Documents
          </Typography>
        </StyledLink>
      </FluidContainer>
    </FluidContainer>
  );
};
