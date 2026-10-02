/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { SocialLinks } from 'components/SocialLinks';

describe('SocialLinks', () => {
  it('sorts the row alphabetically by network, whatever order it is given', () => {
    render(
      <SocialLinks
        accountName="U-SU"
        links={[
          { network: 'tiktok', href: 'https://tiktok.example' },
          { network: 'instagram', href: 'https://instagram.example' },
          { network: 'linkedin', href: 'https://linkedin.example' },
        ]}
      />,
    );

    expect(
      screen.getAllByRole('link').map((link) => link.getAttribute('href')),
    ).toEqual([
      'https://instagram.example',
      'https://linkedin.example',
      'https://tiktok.example',
    ]);
  });

  it('names each icon-only link for screen readers, and opens it in a new tab', () => {
    render(
      <SocialLinks
        accountName="U-SU Graffix"
        links={[{ network: 'tiktok', href: 'https://tiktok.example' }]}
      />,
    );

    const link = screen.getByRole('link', {
      name: 'U-SU Graffix on TikTok (opens in a new tab)',
    });
    expect(link).toHaveProperty('target', '_blank');
    expect(link.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it("lets one link name a parent group's account in place of the row's", () => {
    render(
      <SocialLinks
        accountName="CLSRC"
        links={[
          { network: 'instagram', href: 'https://instagram.example' },
          {
            network: 'linktree',
            href: 'https://linktree.example',
            accountName: 'Cross Cultural Center',
          },
        ]}
      />,
    );

    expect(
      screen.getByRole('link', {
        name: 'CLSRC on Instagram (opens in a new tab)',
      }),
    ).toBeTruthy();
    expect(
      screen.getByRole('link', {
        name: 'Cross Cultural Center on Linktree (opens in a new tab)',
      }),
    ).toBeTruthy();
  });

  it('keeps the glyph out of the accessibility tree', () => {
    const { container } = render(
      <SocialLinks
        accountName="U-SU"
        links={[{ network: 'instagram', href: 'https://instagram.example' }]}
      />,
    );

    expect(container.querySelector('svg')?.getAttribute('aria-hidden')).toBe(
      'true',
    );
  });
});
