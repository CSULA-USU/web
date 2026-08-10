/** @jest-environment jsdom */
import React from 'react';
import { render } from '@testing-library/react';
import { Typography } from 'components/Typography/Typography';

describe('Typography', () => {
  it('keeps semantic heading elements as block-level when given margin', () => {
    const { container } = render(
      <Typography as="h2" margin="1rem">
        Heading
      </Typography>,
    );

    const element = container.firstChild as HTMLElement;
    expect(window.getComputedStyle(element).display).toBe('block');
  });
});
