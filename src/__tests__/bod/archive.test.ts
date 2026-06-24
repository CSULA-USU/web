import { createRequest, createResponse } from 'node-mocks-http';

jest.mock('lib/supabaseAdmin', () => ({
  supabaseAdmin: {
    from: jest.fn(),
  },
}));

jest.mock('lib/backoffice', () => ({
  requireBackofficePolicyV2: jest.fn(),
}));

import handler from 'pages/api/bod/archive';
import { supabaseAdmin } from 'lib/supabaseAdmin';
import { requireBackofficePolicyV2 } from 'lib/backoffice';

const mockRequirePolicy = requireBackofficePolicyV2 as jest.Mock;
const mockFrom = supabaseAdmin.from as jest.Mock;

describe('PATCH /api/bod/archive', () => {
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

  it('returns 400 when category is missing', async () => {
    const req = createRequest({
      method: 'PATCH',
      body: {},
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
  });

  it('returns 200 with archived count when successful', async () => {
    mockFrom.mockReturnValue({
      update: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          neq: jest.fn().mockReturnValue({
            select: jest.fn().mockResolvedValue({
              data: [{ id: '1' }, { id: '2' }],
              error: null,
            }),
          }),
        }),
      }),
    });

    const req = createRequest({
      method: 'PATCH',
      body: { category: 'Minutes' },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({ archived: 2 });
  });

  it('returns 200 with zero when no documents archived', async () => {
    mockFrom.mockReturnValue({
      update: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          neq: jest.fn().mockReturnValue({
            select: jest.fn().mockResolvedValue({
              data: [],
              error: null,
            }),
          }),
        }),
      }),
    });

    const req = createRequest({
      method: 'PATCH',
      body: { category: 'Agenda' },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({ archived: 0 });
  });

  it('returns 500 when database update fails', async () => {
    mockFrom.mockReturnValue({
      update: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          neq: jest.fn().mockReturnValue({
            select: jest.fn().mockResolvedValue({
              data: null,
              error: { message: 'Database error' },
            }),
          }),
        }),
      }),
    });

    const req = createRequest({
      method: 'PATCH',
      body: { category: 'Minutes' },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(500);
  });
});
