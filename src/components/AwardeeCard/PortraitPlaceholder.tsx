import styled from 'styled-components';
import { Colors } from 'theme';

interface PortraitPlaceholderProps {
  name: string;
  rounded?: boolean;
  fontSize?: string;
}

const PALETTE: Array<[keyof typeof Colors, keyof typeof Colors]> = [
  ['greyDarkest', 'primary'],
  ['blackMauve', 'pastelYellow'],
  ['nuestraOrange', 'greyDarkest'],
  ['nativeBeige', 'greyDarkest'],
  ['primary', 'greyDarkest'],
  ['greyDarker', 'primary'],
  ['gold', 'pastelYellow'],
  ['black', 'primary'],
  ['blackMauve', 'primary'],
  ['greyDark', 'primary'],
];

const colorFor = (seed: string): [string, string] => {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  const [bg, fg] = PALETTE[h % PALETTE.length];
  return [Colors[bg], Colors[fg]];
};

const initialsOf = (name: string): string =>
  name
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

const Wrap = styled.div<{
  $bg: string;
  $fg: string;
  $rounded: boolean;
  $fontSize: string;
}>`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$fg};
  font-family: var(--font-bitter), serif;
  font-weight: 700;
  font-size: ${(p) => p.$fontSize};
  letter-spacing: -0.01em;
  border-radius: ${(p) => (p.$rounded ? '16px' : '0')};
`;

export const PortraitPlaceholder = ({
  name,
  rounded = false,
  fontSize = '64px',
}: PortraitPlaceholderProps) => {
  const [bg, fg] = colorFor(name);
  return (
    <Wrap
      $bg={bg}
      $fg={fg}
      $rounded={rounded}
      $fontSize={fontSize}
      aria-hidden="true"
    >
      {initialsOf(name)}
    </Wrap>
  );
};
