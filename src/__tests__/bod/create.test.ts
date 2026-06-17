import { createRequest, createResponse } from 'node-mocks-http';

jest.mock('lib/supabaseAdmin', () => ({
  supabaseAdmin: {
    from: jest.fn(),
  },
}));

jest.mock('lib/backoffice', () => ({
  requireBackofficePolicyV2: jest.fn(),
}));

jest.mock('utils/dates', () => ({
  normalizeDateISO: jest.fn((date) => date),
}));

import handler from 'pages/api/bod/create';
import { supabaseAdmin } from 'lib/supabaseAdmin';
import { requireBackofficePolicyV2 } from 'lib/backoffice';
import { Category } from 'types';
import { computeNextDate, normalizeUrl } from 'utils/bod';

const mockRequirePolicy = requireBackofficePolicyV2 as jest.Mock;
const mockFrom = supabaseAdmin.from as jest.Mock;

describe('normalizeUrl', () => {
  it('returns undefined when url is undefined', () => {
    expect(normalizeUrl(undefined)).toBeUndefined();
  });

  it('returns empty string when url is empty', () => {
    expect(normalizeUrl('')).toBeFalsy();
  });

  it('converts pdf dl=0 to raw=1', () => {
    expect(normalizeUrl('https://dropbox.com/file.pdf?dl=0')).toBe(
      'https://dropbox.com/file.pdf?raw=1',
    );
  });

  it('converts pdf dl=1 to raw=1', () => {
    expect(normalizeUrl('https://dropbox.com/file.pdf?dl=1')).toBe(
      'https://dropbox.com/file.pdf?raw=1',
    );
  });

  it('does not modify pdf url that already has raw=1', () => {
    expect(normalizeUrl('https://dropbox.com/file.pdf?raw=1')).toBe(
      'https://dropbox.com/file.pdf?raw=1',
    );
  });

  it('removes raw=1 from docx url', () => {
    expect(normalizeUrl('https://dropbox.com/file.docx?raw=1')).toBe(
      'https://dropbox.com/file.docx?',
    );
  });

  it('converts zip dl=0 to dl=1', () => {
    expect(normalizeUrl('https://dropbox.com/file.zip?dl=0')).toBe(
      'https://dropbox.com/file.zip?dl=1',
    );
  });
});

describe('computeNextDate', () => {
  const baseDoc = {
    title: 'Test',
    url: 'https://example.com/file.pdf',
    category: 'Minutes' as Category,
    fy: '2024',
    is_archived: false,
    is_download_all: false,
  };

  it('returns null when category is Calendar', () => {
    expect(computeNextDate({ ...baseDoc, category: 'Calendar' })).toBeNull();
  });

  it('returns null when is_download_all is true', () => {
    expect(computeNextDate({ ...baseDoc, is_download_all: true })).toBeNull();
  });

  it('returns null when date is null', () => {
    expect(computeNextDate({ ...baseDoc, date: null } as any)).toBeNull();
  });

  it('returns null when date is empty string', () => {
    expect(computeNextDate({ ...baseDoc, date: '' } as any)).toBeNull();
  });

  it('returns normalized date when date is valid', () => {
    expect(computeNextDate({ ...baseDoc, date: '2024-01-15' } as any)).toBe(
      '2024-01-15',
    );
  });
});

describe('POST /api/bod/create', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRequirePolicy.mockResolvedValue({
      ok: true,
      user: { email: 'admin@test.com' },
    });
  });

  it('returns 405 when method is not POST', async () => {
    const req = createRequest({
      method: 'GET',
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(405);
  });

  it('returns 400 when doc is missing', async () => {
    const req = createRequest({
      method: 'POST',
      body: {},
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
  });

  it('returns 200 when document is created successfully', async () => {
    mockFrom.mockReturnValue({
      insert: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({
            data: {
              id: 1,
              title: 'Test Doc',
              url: 'https://example.com/file.pdf?raw=1',
              date: '2024-01-15',
              category: 'Minutes',
              fy: '2024',
              is_archived: false,
              is_download_all: false,
            },
            error: null,
          }),
        }),
      }),
    });

    const req = createRequest({
      method: 'POST',
      body: {
        doc: {
          title: 'Test Doc',
          url: 'https://example.com/file.pdf?dl=0',
          date: '2024-01-15',
          category: 'Minutes',
          fy: '2024',
          is_archived: false,
          is_download_all: false,
        },
      },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
  });

  it('returns 500 when database insert fails', async () => {
    mockFrom.mockReturnValue({
      insert: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({
            data: null,
            error: { message: 'Database error' },
          }),
        }),
      }),
    });

    const req = createRequest({
      method: 'POST',
      body: {
        doc: {
          title: 'Test Doc',
          url: 'https://example.com/file.pdf',
          date: '2024-01-15',
          category: 'Minutes',
          fy: '2024',
          is_archived: false,
          is_download_all: false,
        },
      },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(500);
  });
});
