import { createRequest, createResponse } from 'node-mocks-http';

jest.mock('lib/supabaseAdmin', () => ({
  supabaseAdmin: {
    from: jest.fn(),
  },
}));

jest.mock('lib/backoffice', () => ({
  requireBackofficePolicyV2: jest.fn(),
}));

import handler from 'pages/api/announcementBanner/update';
import { supabaseAdmin } from 'lib/supabaseAdmin';
import { requireBackofficePolicyV2 } from 'lib/backoffice';

const mockRequirePolicy = requireBackofficePolicyV2 as jest.Mock;
const mockFrom = supabaseAdmin.from as jest.Mock;

describe('PATCH /api/announcementBanner/update', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRequirePolicy.mockResolvedValue({
      ok: true,
      user: { email: 'admin@test.com' },
    });
  });

  it('returns 405 when method is not PATCH', async () => {
    const req = createRequest({
      method: 'GET',
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(405);
  });

  it('returns 400 when id is missing', async () => {
    const req = createRequest({
      method: 'PATCH',
      body: { updates: { text: 'Hello' } },
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

  it('returns 200 when banner is updated successfully', async () => {
    mockFrom.mockReturnValue({
      update: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: {
                id: '1',
                text: 'Hello',
                is_visible: true,
                link_text: null,
                href: null,
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
        updates: { text: 'Hello', is_visible: true },
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
        updates: { text: 'Hello' },
      },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(500);
  });
});
