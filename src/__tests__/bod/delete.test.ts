import { createRequest, createResponse } from 'node-mocks-http';

jest.mock('lib/supabaseAdmin', () => ({
  supabaseAdmin: {
    from: jest.fn(),
  },
}));

jest.mock('lib/backoffice', () => ({
  requireBackofficePolicyV2: jest.fn(),
}));

import handler from 'pages/api/bod/delete';
import { supabaseAdmin } from 'lib/supabaseAdmin';
import { requireBackofficePolicyV2 } from 'lib/backoffice';

const mockRequirePolicy = requireBackofficePolicyV2 as jest.Mock;
const mockFrom = supabaseAdmin.from as jest.Mock;

describe('DELETE /api/bod/delete', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRequirePolicy.mockResolvedValue({
      ok: true,
      user: { email: 'admin@test.com' },
    });
  });

  it('returns 405 when method is not DELETE', async () => {
    const req = createRequest({
      method: 'POST',
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(405);
  });

  it('returns 400 when id is missing', async () => {
    const req = createRequest({
      method: 'DELETE',
      body: {},
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
  });

  it('returns 200 when document is deleted successfully', async () => {
    mockFrom.mockReturnValue({
      delete: jest.fn().mockReturnValue({
        eq: jest.fn().mockResolvedValue({
          data: null,
          error: null,
        }),
      }),
    });

    const req = createRequest({
      method: 'DELETE',
      body: { id: '1' },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({ ok: true });
  });

  it('returns 500 when database delete fails', async () => {
    mockFrom.mockReturnValue({
      delete: jest.fn().mockReturnValue({
        eq: jest.fn().mockResolvedValue({
          data: null,
          error: { message: 'Database error' },
        }),
      }),
    });

    const req = createRequest({
      method: 'DELETE',
      body: { id: '1' },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(500);
  });
});
