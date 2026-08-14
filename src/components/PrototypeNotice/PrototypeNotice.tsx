import React from 'react';
import styled from 'styled-components';
import { Spaces } from 'theme';
import { FluidContainer } from '../FluidContainer';
import { Typography } from '../Typography';

type NoticeTone = 'subtle' | 'loud';

interface PrototypeNoticeProps {
  /**
   * What this page is and why it is not final. Defaults to a generic
   * not-yet-published line; pass copy when the page has something specific
   * to disclose, such as which markers are still open.
   */
  children?: React.ReactNode;
  /**
   * `subtle` is a grey strip for a page that is merely unfinished. `loud` is
   * black on the brand yellow, for a page nobody should mistake for the real
   * thing — a staging deploy, or a test that had to ship to production.
   */
  tone?: NoticeTone;
  /** Match the page's own content width so the strip lines up with it. */
  contentMaxWidth?: string;
}

const STRIP_PADDING = `${Spaces.lg} clamp(20px, 4vw, 36px)`;

const toneStyles: Record<
  NoticeTone,
  {
    backgroundColor: 'greyLightest' | 'primary';
    border: 'greyLighter' | 'black';
    textColor: 'greyDark' | 'black';
  }
> = {
  subtle: {
    backgroundColor: 'greyLightest',
    border: 'greyLighter',
    textColor: 'greyDark',
  },
  loud: { backgroundColor: 'primary', border: 'black', textColor: 'black' },
};

/* `role="note"` rather than an alert: this is a standing disclosure about the
   page, not something that just happened, so it should not interrupt. */
const Note = styled.div`
  width: 100%;
`;

/**
 * A strip disclosing that the page above it is not a finished, published
 * thing.
 *
 * Belongs at the very bottom of a page, after everything else. Two situations
 * it exists for: work that had to ship to production before it was finished,
 * and a reader who has wandered into staging and has no way of knowing that
 * what they are reading is not official.
 *
 * Keep it in place until someone with the authority to publish removes it.
 * Removing it early is how a prototype becomes a statement.
 */
export const PrototypeNotice = ({
  children,
  tone = 'subtle',
  contentMaxWidth,
}: PrototypeNoticeProps) => {
  const { backgroundColor, border, textColor } = toneStyles[tone];

  return (
    <FluidContainer
      backgroundColor={backgroundColor}
      border={border}
      padding={STRIP_PADDING}
      paddingDesktop={STRIP_PADDING}
      paddingMobile={STRIP_PADDING}
      innerMaxWidth={contentMaxWidth}
    >
      <Note role="note">
        <Typography as="p" variant="span" size="2xs" color={textColor}>
          {children ??
            'Prototype for review — not a published communication. Nothing on this page is final, and it should not be quoted or shared as official.'}
        </Typography>
      </Note>
    </FluidContainer>
  );
};
