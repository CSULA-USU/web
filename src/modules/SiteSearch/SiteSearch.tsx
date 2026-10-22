import {
  FormEvent,
  KeyboardEvent,
  MouseEvent,
  RefObject,
  useId,
  useRef,
} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import { FaSearch } from 'react-icons/fa';
// Leaf imports rather than the `components` barrel, which reaches back into
// `modules` (and so into the nav that renders this) — see BaseModal.
import { Typography } from 'components/Typography';
import { VisuallyHidden } from 'components/VisuallyHidden';
import { Colors, FontSizes, Radii, Spaces } from 'theme';
import {
  MIN_QUERY_LENGTH,
  SearchEntry,
  displayUrl,
  isExternalUrl,
} from 'utils/siteSearch';
import { SiteSearchStatus, useSiteSearch } from './useSiteSearch';

const Field = styled.div`
  position: relative;
`;

const FieldIcon = styled(FaSearch)`
  position: absolute;
  top: 50%;
  left: ${Spaces.md};
  transform: translateY(-50%);
  font-size: ${FontSizes.md};
  color: ${Colors.greyMid};
  pointer-events: none;
`;

const SearchField = styled.input`
  width: 100%;
  padding: ${Spaces.md};
  padding-left: calc(${Spaces.md} + ${FontSizes.md} + ${Spaces.sm});
  border: 1px solid ${Colors.grey};
  border-radius: ${Radii.control};
  background-color: ${Colors.white};
  color: ${Colors.black};
  font: inherit;
  font-size: ${FontSizes.md};

  &::placeholder {
    color: ${Colors.greyMid};
  }

  &:focus {
    outline: 2px solid ${Colors.black};
    outline-offset: 2px;
  }
`;

const ResultList = styled.ol`
  display: flex;
  flex-direction: column;
  gap: ${Spaces.xs};
  margin: ${Spaces.sm} 0 0;
  padding: 0;
  list-style: none;
`;

// Rows fill rather than recolor on hover, per the house pattern, and every
// line inside switches to black with the fill — gold on primary is too faint.
const resultLinkCSS = css`
  display: flex;
  flex-direction: column;
  gap: ${Spaces.xs};
  padding: ${Spaces.md};
  border-radius: ${Radii.control};
  text-decoration: none;
  transition: background-color 150ms ease;

  /* Each line sets its own color, so the fade has to live on the lines or
     the text snaps while the fill fades in. */
  & * {
    transition: color 150ms ease;
  }

  &:hover,
  &:focus-visible {
    background-color: ${Colors.primary};
  }

  &:hover *,
  &:focus-visible * {
    color: ${Colors.black};
  }
`;

// Two lines is enough to tell results apart; the full text is one click away,
// and several pages share a paragraph that would otherwise fill the dialog.
const ResultDescription = styled(Typography)`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

const InternalResultLink = styled(Link)`
  ${resultLinkCSS}
`;

const ExternalResultLink = styled.a`
  ${resultLinkCSS}
`;

const statusMessage = (
  status: SiteSearchStatus,
  query: string,
  resultCount: number,
) => {
  if (status === 'error') {
    return 'Search is unavailable right now.';
  }
  if (query.trim().length < MIN_QUERY_LENGTH) {
    return '';
  }
  if (status === 'loading') {
    return 'Loading…';
  }
  if (resultCount === 0) {
    return `No results for “${query.trim()}”.`;
  }
  return resultCount === 1 ? '1 result' : `${resultCount} results`;
};

const isModifiedClick = (event: MouseEvent) =>
  event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;

interface SiteSearchProps {
  query: string;
  onQueryChange: (query: string) => void;
  /** Called as a result is opened — the search dialog closes itself here. */
  onResultOpen?: () => void;
  inputRef?: RefObject<HTMLInputElement>;
}

/**
 * The search field and its results. Shared by the nav's search dialog and the
 * /search page, so both rank, render, and navigate identically.
 *
 * Results are a plain list of links rather than an ARIA combobox: a combobox
 * option may not contain a link, and keeping real links keeps middle-click,
 * open-in-new-tab, and screen-reader link lists working. Arrow keys move real
 * focus through them, and Enter in the field opens the top result.
 */
export const SiteSearch = ({
  query,
  onQueryChange,
  onResultOpen,
  inputRef,
}: SiteSearchProps) => {
  const router = useRouter();
  const { results, status } = useSiteSearch(query);
  const fallbackInputRef = useRef<HTMLInputElement>(null);
  const fieldRef = inputRef ?? fallbackInputRef;
  const resultListRef = useRef<HTMLOListElement>(null);
  const inputId = useId();

  const resultLinks = () =>
    Array.from(resultListRef.current?.querySelectorAll('a') ?? []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const [topResult] = results;

    if (!topResult) {
      return;
    }

    onResultOpen?.();
    if (isExternalUrl(topResult.url)) {
      window.location.assign(topResult.url);
    } else {
      router.push(topResult.url);
    }
  };

  const handleFieldKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      const [firstLink] = resultLinks();
      if (firstLink) {
        event.preventDefault();
        firstLink.focus();
      }
    }
  };

  const handleResultsKeyDown = (event: KeyboardEvent<HTMLOListElement>) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
      return;
    }

    event.preventDefault();
    const links = resultLinks();
    const current = links.indexOf(document.activeElement as HTMLAnchorElement);
    const next = current + (event.key === 'ArrowDown' ? 1 : -1);

    if (next < 0) {
      fieldRef.current?.focus();
    } else if (next < links.length) {
      links[next].focus();
    }
  };

  const handleResultClick = (event: MouseEvent) => {
    if (!isModifiedClick(event)) {
      onResultOpen?.();
    }
  };

  const renderResult = (result: SearchEntry) => {
    const content = (
      <>
        <Typography as="span" variant="labelTitle">
          {result.title}
        </Typography>
        {result.description && (
          <ResultDescription forwardedAs="span" variant="copy" color="greyMid">
            {result.description}
          </ResultDescription>
        )}
        <Typography as="span" variant="span" size="xs" color="gold">
          {displayUrl(result.url)}
        </Typography>
      </>
    );

    return isExternalUrl(result.url) ? (
      <ExternalResultLink href={result.url} onClick={handleResultClick}>
        {content}
      </ExternalResultLink>
    ) : (
      <InternalResultLink href={result.url} onClick={handleResultClick}>
        {content}
      </InternalResultLink>
    );
  };

  return (
    <>
      <form role="search" onSubmit={handleSubmit}>
        <VisuallyHidden as="label" htmlFor={inputId}>
          Search the U-SU
        </VisuallyHidden>
        <Field>
          <FieldIcon aria-hidden />
          <SearchField
            ref={fieldRef}
            id={inputId}
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            onKeyDown={handleFieldKeyDown}
            placeholder="Search the U-SU"
            autoComplete="off"
            enterKeyHint="go"
          />
        </Field>
      </form>

      {/* Mounted even when empty: a live region announces changes only if it
          already existed before them. */}
      <Typography
        as="p"
        variant="span"
        size="xs"
        color="greyMid"
        margin={`${Spaces.md} 0 0`}
      >
        <span role="status">
          {statusMessage(status, query, results.length)}
        </span>
      </Typography>

      {results.length > 0 && (
        <ResultList ref={resultListRef} onKeyDown={handleResultsKeyDown}>
          {results.map((result) => (
            <li key={result.url}>{renderResult(result)}</li>
          ))}
        </ResultList>
      )}
    </>
  );
};
