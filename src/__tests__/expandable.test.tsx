/** @jest-environment jsdom */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Expandable } from 'components/Expandable/Expandable';

describe('Expandable', () => {
  it('renders the trigger without an indicator', () => {
    render(<Expandable header="Question">Answer</Expandable>);

    expect(screen.getByRole('button', { name: 'Question' })).toBeTruthy();
  });

  it('keeps collapsed content in the DOM, linked to its trigger', () => {
    render(<Expandable header="Question">Answer</Expandable>);

    const button = screen.getByRole('button', { name: 'Question' });
    const panel = document.getElementById(
      button.getAttribute('aria-controls') as string,
    );
    expect(panel?.textContent).toBe('Answer');
    expect(button.getAttribute('aria-expanded')).toBe('false');
  });

  it('toggles its own state when uncontrolled', () => {
    const onToggle = jest.fn();
    render(
      <Expandable header="Question" onToggle={onToggle}>
        Answer
      </Expandable>,
    );

    const button = screen.getByRole('button', { name: 'Question' });
    fireEvent.click(button);
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('follows isExpanded, not internal state, when controlled', () => {
    const onToggle = jest.fn();
    const { rerender } = render(
      <Expandable header="Question" isExpanded onToggle={onToggle}>
        Answer
      </Expandable>,
    );

    const button = screen.getByRole('button', { name: 'Question' });
    expect(button.getAttribute('aria-expanded')).toBe('true');

    fireEvent.click(button);
    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(button.getAttribute('aria-expanded')).toBe('true');

    rerender(
      <Expandable header="Question" isExpanded={false} onToggle={onToggle}>
        Answer
      </Expandable>,
    );
    expect(button.getAttribute('aria-expanded')).toBe('false');
  });

  it('wraps the button in a heading rather than nesting one inside it', () => {
    render(
      <Expandable header="Question" headingLevel={3}>
        Answer
      </Expandable>,
    );

    const heading = screen.getByRole('heading', { level: 3, name: 'Question' });
    const button = screen.getByRole('button', { name: 'Question' });
    expect(button.parentElement).toBe(heading);
    expect(button.querySelector('h1, h2, h3, h4, h5, h6, div, p')).toBeNull();
  });
});
