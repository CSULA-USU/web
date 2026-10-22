import { MouseEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { BaseModal } from 'modules/Modals/BaseModal';
import { Colors } from 'theme';
import { SiteSearch } from './SiteSearch';
import { loadSiteSearch } from './useSiteSearch';

/* Icon-only, so it lifts on hover beside the color change, the same as
   SocialLinks: the link's box stays put while the glyph rises, so a pointer
   resting on its bottom edge does not slip off and set it bouncing. */
const SearchLink = styled(Link)<{
  $size: string;
  $color: keyof typeof Colors;
  $hoverColor: keyof typeof Colors;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  /* Sits in a flex row beside the nav's items, which would squeeze it. */
  flex-shrink: 0;
  width: ${(p) => p.$size};
  height: ${(p) => p.$size};
  font-size: ${(p) => p.$size};
  color: ${(p) => Colors[p.$color]};
  transition: color 200ms ease;

  svg {
    transition: transform 200ms ease;
  }

  &:hover,
  &:focus-visible {
    color: ${(p) => Colors[p.$hoverColor]};
  }

  &:hover svg,
  &:focus-visible svg {
    transform: translateY(-4px);
  }

  @media (prefers-reduced-motion: reduce) {
    svg {
      transition: none;
    }

    &:hover svg,
    &:focus-visible svg {
      transform: none;
    }
  }
`;

const SearchDialog = ({ onClose }: { onClose: () => void }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <BaseModal
      title="Search"
      onClose={onClose}
      maxWidth="640px"
      initialFocusRef={inputRef}
    >
      <SiteSearch
        query={query}
        onQueryChange={setQuery}
        onResultOpen={onClose}
        inputRef={inputRef}
      />
    </BaseModal>
  );
};

interface SearchButtonProps {
  size?: string;
  color?: keyof typeof Colors;
  hoverColor?: keyof typeof Colors;
}

/**
 * The nav's search icon. Opens search in a dialog, and on ⌘K / Ctrl+K from
 * anywhere on the page. It is a real link to /search underneath, so a
 * modified click still opens the full page in a new tab.
 */
export const SearchButton = ({
  size = '20px',
  color = 'white',
  hoverColor = 'primary',
}: SearchButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    setIsOpen(true);
  };

  // Starting the download on intent means the index is usually loaded before
  // the dialog has finished opening.
  const warmSearch = () => {
    loadSiteSearch().catch(() => {});
  };

  return (
    <>
      <SearchLink
        href="/search"
        aria-label="Search"
        aria-haspopup="dialog"
        aria-keyshortcuts="Meta+K Control+K"
        onClick={handleClick}
        onPointerEnter={warmSearch}
        onFocus={warmSearch}
        $size={size}
        $color={color}
        $hoverColor={hoverColor}
      >
        <FaSearch aria-hidden />
      </SearchLink>
      {isOpen && <SearchDialog onClose={() => setIsOpen(false)} />}
    </>
  );
};
