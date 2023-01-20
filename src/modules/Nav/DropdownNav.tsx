import styled from 'styled-components';
import { useFloating } from '@floating-ui/react';
import Link from 'next/link';
import { Colors, FontSizes, Spaces } from 'theme';
import { useState } from 'react';

const DropdownTrigger = styled(Link)`
  cursor: pointer;
  padding-bottom: ${Spaces.md};
`;

const DropdownItems = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${FontSizes.sm};
  > * {
    width: 100%;
    padding: ${Spaces.md};
    &:not(:last-child) {
      border-bottom: 1px solid ${Colors.greyDark};
    }
  }
  background-color: ${Colors.greyDarker};
`;

interface DropdownNavProps {
  title: string;
  href: string;
  links: {
    text: string;
    href: string;
  }[];
}

export const DropdownNav = ({ title, href, links }: DropdownNavProps) => {
  const { x, y, reference, floating, strategy } = useFloating({
    placement: 'bottom-start',
  });
  const [isMenuVisible, setMenuVisibility] = useState(false);

  const hideMenu = () => setMenuVisibility(false);
  const showMenu = () => setMenuVisibility(true);
  return (
    <div onMouseLeave={hideMenu}>
      <DropdownTrigger href={href} ref={reference} onMouseOver={showMenu}>
        {title}
      </DropdownTrigger>
      {isMenuVisible && (
        <DropdownItems
          ref={floating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
            width: 'max-content',
          }}
        >
          {links.map(({ text, href }) => (
            <Link key={text} href={href}>
              {text}
            </Link>
          ))}
        </DropdownItems>
      )}
    </div>
  );
};
