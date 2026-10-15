import styled from 'styled-components';
import type { IconType } from 'react-icons';
import { AiOutlineInstagram, AiOutlineLinkedin } from 'react-icons/ai';
import { FaDiscord, FaFacebook, FaTiktok, FaTwitch } from 'react-icons/fa';
import { SiGroupme, SiLinktree } from 'react-icons/si';
import { Colors, Spaces } from 'theme';

export type SocialNetwork =
  | 'discord'
  | 'facebook'
  | 'groupme'
  | 'instagram'
  | 'linkedin'
  | 'linktree'
  | 'tiktok'
  | 'twitch';

interface NetworkGlyph {
  /** Read into the link's accessible name, and the key the row sorts on. */
  name: string;
  Icon: IconType;
  /** Share of the row's icon size this glyph renders at. */
  scale: number;
}

/* One glyph per network, so a network looks the same on every page — before
   this, Instagram and TikTok each came from two different icon packs.

   `scale` evens out optical size. The outline Ai glyphs sit inside generous
   padding; the solid Font Awesome and Simple Icons glyphs run to the edge of
   their box, so at equal sizes they read a size larger. Discord stays at full
   size because it is wider than tall, and react-icons fits it to the width. */
const networks: Record<SocialNetwork, NetworkGlyph> = {
  discord: { name: 'Discord', Icon: FaDiscord, scale: 1 },
  facebook: { name: 'Facebook', Icon: FaFacebook, scale: 0.8 },
  groupme: { name: 'GroupMe', Icon: SiGroupme, scale: 0.8 },
  instagram: { name: 'Instagram', Icon: AiOutlineInstagram, scale: 1 },
  linkedin: { name: 'LinkedIn', Icon: AiOutlineLinkedin, scale: 1 },
  linktree: { name: 'Linktree', Icon: SiLinktree, scale: 0.8 },
  tiktok: { name: 'TikTok', Icon: FaTiktok, scale: 0.8 },
  twitch: { name: 'Twitch', Icon: FaTwitch, scale: 0.8 },
};

type SocialLinksTone = 'onLight' | 'onDark';

/* Hover on a light ground darkens to gold rather than lifting to primary:
   yellow on white is under 1.5:1, too faint to see the icon by. */
const toneColors: Record<
  SocialLinksTone,
  { color: keyof typeof Colors; hoverColor: keyof typeof Colors }
> = {
  onLight: { color: 'black', hoverColor: 'gold' },
  onDark: { color: 'greyLighter', hoverColor: 'primary' },
};

export interface SocialLink {
  network: SocialNetwork;
  href: string;
  /**
   * Overrides the row's `accountName` for this one link — for an account that
   * belongs to a parent group, like a resource center linking its umbrella
   * center's Linktree.
   */
  accountName?: string;
}

interface SocialLinksProps {
  /** Any order: the row sorts itself alphabetically by network. */
  links: SocialLink[];
  /**
   * Whose accounts these are. Each link is named
   * `{accountName} on {network} (opens in a new tab)` for screen readers,
   * since the visible icon carries no text.
   */
  accountName: string;
  /** Ground the row sits on. Sets the resting and hover colors. */
  tone?: SocialLinksTone;
  /** Overrides the tone's resting color. */
  color?: keyof typeof Colors;
  /** Overrides the tone's hover and focus color. */
  hoverColor?: keyof typeof Colors;
  /** Side of each link's square box; glyphs scale inside it. */
  size?: string;
  gap?: string;
}

const List = styled.ul<{ $gap: string }>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${(p) => p.$gap};
  margin: 0;
  padding: 0;
  list-style: none;
`;

/* Icon-only links lift on hover instead of filling, the house hover pattern:
   there is no label or pill to fill, so the lift is the extra signal beside
   the color change. The lift is keyed to the link, not the icon. The link's
   box stays put while the icon rises, so a pointer resting on the icon's
   bottom edge does not slip off it, drop it, and set it bouncing. Every link
   is the same square whatever its glyph's scale, so a row spaces evenly. */
const IconLink = styled.a<{
  $size: string;
  $color: keyof typeof Colors;
  $hoverColor: keyof typeof Colors;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
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
    &:hover svg,
    &:focus-visible svg {
      transform: none;
    }
  }
`;

export const SocialLinks = ({
  links,
  accountName,
  tone = 'onLight',
  color,
  hoverColor,
  size = '32px',
  gap = Spaces.md,
}: SocialLinksProps) => {
  /* Alphabetical, per the house list-order rule. The locale is explicit so
     server and client collate the same way. */
  const sortedLinks = [...links].sort((a, b) =>
    networks[a.network].name.localeCompare(networks[b.network].name, 'en'),
  );

  return (
    <List $gap={gap}>
      {sortedLinks.map((link) => {
        const { name, Icon, scale } = networks[link.network];
        return (
          <li key={link.href}>
            <IconLink
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${
                link.accountName ?? accountName
              } on ${name} (opens in a new tab)`}
              $size={size}
              $color={color ?? toneColors[tone].color}
              $hoverColor={hoverColor ?? toneColors[tone].hoverColor}
            >
              <Icon size={`${scale}em`} aria-hidden="true" focusable="false" />
            </IconLink>
          </li>
        );
      })}
    </List>
  );
};
