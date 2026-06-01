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

import handler from 'pages/api/bod/update';
import { computeNextDateFromUpdates } from 'utils/bod';
import { supabaseAdmin } from 'lib/supabaseAdmin';
import { requireBackofficePolicyV2 } from 'lib/backoffice';
import { Category } from 'types';

const mockRequirePolicy = requireBackofficePolicyV2 as jest.Mock;
const mockFrom = supabaseAdmin.from as jest.Mock;

describe('computeNextDateFromUpdates', () => {
  it('returns null when category is Calendar', () => {
    expect(
      computeNextDateFromUpdates({ category: 'Calendar' as Category }),
    ).toBeNull();
  });

  it('returns null when is_download_all is true', () => {
    expect(computeNextDateFromUpdates({ is_download_all: true })).toBeNull();
  });

  it('returns null when date is null', () => {
    expect(computeNextDateFromUpdates({ date: null })).toBeNull();
  });

  it('returns null when date is empty string', () => {
    expect(computeNextDateFromUpdates({ date: '' } as any)).toBeNull();
  });

  it('returns normalized date when date is provided', () => {
    expect(computeNextDateFromUpdates({ date: '2024-01-15' })).toBe(
      '2024-01-15',
    );
  });

  it('returns undefined when date is not in updates', () => {
    expect(computeNextDateFromUpdates({ title: 'Test' })).toBeUndefined();
  });
});

describe('PATCH /api/bod/update', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRequirePolicy.mockResolvedValue({
      ok: true,
      user: { email: 'admin@test.com' },
    });
  });

  it('returns 405 when method is not PATCH', async () => {
    const req = createRequest({
      method: 'POST',
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(405);
  });

  it('returns 400 when id is missing', async () => {
    const req = createRequest({
      method: 'PATCH',
      body: { updates: { title: 'Updated' } },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
  });

  it('returns 400 when updates is missing', async () => {
    const req = createRequest({
      method: 'PATCH',
      body: { id: '1' },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
  });

  it('returns 200 when document is updated successfully', async () => {
    mockFrom.mockReturnValue({
      update: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: {
                id: '1',
                title: 'Updated Doc',
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
      }),
    });

    const req = createRequest({
      method: 'PATCH',
      body: {
        id: '1',
        updates: {
          title: 'Updated Doc',
          url: 'https://example.com/file.pdf?dl=0',
        },
      },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
  });

  it('returns 500 when database update fails', async () => {
    mockFrom.mockReturnValue({
      update: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: null,
              error: { message: 'Database error' },
            }),
          }),
        }),
      }),
    });

    const req = createRequest({
      method: 'PATCH',
      body: {
        id: '1',
        updates: { title: 'Updated Doc' },
      },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(500);
  });
});
