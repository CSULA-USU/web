import { createRequest, createResponse } from 'node-mocks-http';

jest.mock('lib/supabaseAdmin', () => ({
  supabaseAdmin: {
    schema: jest.fn(),
  },
}));

jest.mock('lib/backoffice', () => ({
  requireBackofficePolicyV2: jest.fn(),
}));

jest.mock('lib/api', () => ({
  allowMethods: jest.fn().mockReturnValue(true),
  badRequest: jest
    .fn()
    .mockImplementation((res: any, msg: string) =>
      res.status(400).json({ error: msg }),
    ),
  notFound: jest
    .fn()
    .mockImplementation((res: any, msg: string) =>
      res.status(404).json({ error: msg }),
    ),
  serverError: jest
    .fn()
    .mockImplementation((res: any, msg: string) =>
      res.status(500).json({ error: msg }),
    ),
  parseNumericId: jest.fn(),
  validateUpdatePageBody: jest.fn(),
}));

import handler from 'pages/api/backoffice/pages/[id]';
import { supabaseAdmin } from 'lib/supabaseAdmin';
import { requireBackofficePolicyV2 } from 'lib/backoffice';
import { parseNumericId } from 'lib/api';

const mockRequirePolicy = requireBackofficePolicyV2 as jest.Mock;
const mockSchema = supabaseAdmin.schema as jest.Mock;
const mockParseId = parseNumericId as jest.Mock;

describe('PATCH /api/backoffice/pages/[id]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRequirePolicy.mockResolvedValue({
      ok: true,
      user: { email: 'admin@test.com' },
    });
    mockParseId.mockReturnValue(1);
    const { validateUpdatePageBody } = require('lib/api');
    validateUpdatePageBody.mockImplementation(() => undefined);
  });

  it('returns 400 when id is invalid', async () => {
    mockParseId.mockReturnValue(null);

    const req = createRequest({
      method: 'PATCH',
      query: { id: 'abc' },
      body: { title: 'Dashboard' },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
  });

  it('returns 404 when page is not found', async () => {
    mockSchema.mockReturnValue({
      from: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            maybeSingle: jest.fn().mockResolvedValue({
              data: null,
              error: null,
            }),
          }),
        }),
      }),
    });

    const req = createRequest({
      method: 'PATCH',
      query: { id: '999' },
      body: { title: 'Dashboard' },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(404);
  });

  it('returns 400 when no updates are provided', async () => {
    mockSchema.mockReturnValue({
      from: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            maybeSingle: jest.fn().mockResolvedValue({
              data: { id: 1, is_active: true },
              error: null,
            }),
          }),
        }),
      }),
    });

    const req = createRequest({
      method: 'PATCH',
      query: { id: '1' },
      body: {},
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
  });

  it('returns 400 when title contains injection', async () => {
    mockSchema.mockReturnValue({
      from: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            maybeSingle: jest.fn().mockResolvedValue({
              data: { id: 1, is_active: true },
              error: null,
            }),
          }),
        }),
      }),
    });

    const { validateUpdatePageBody } = require('lib/api');
    validateUpdatePageBody.mockImplementation(() => {
      throw new Error('title contains invalid characters.');
    });

    const req = createRequest({
      method: 'PATCH',
      query: { id: '1' },
      body: { title: '<script>alert("xss")</script>' },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
  });

  it('returns 200 when page is updated successfully', async () => {
    let callCount = 0;

    mockSchema.mockImplementation(() => {
      callCount++;

      if (callCount === 1) {
        return {
          from: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              eq: jest.fn().mockReturnValue({
                maybeSingle: jest.fn().mockResolvedValue({
                  data: { id: 1, is_active: true },
                  error: null,
                }),
              }),
            }),
          }),
        };
      }

      return {
        from: jest.fn().mockReturnValue({
          update: jest.fn().mockReturnValue({
            eq: jest.fn().mockReturnValue({
              select: jest.fn().mockReturnValue({
                single: jest.fn().mockResolvedValue({
                  data: {
                    id: 1,
                    page_key: 'dashboard',
                    title: 'Updated Dashboard',
                    route: '/dashboard',
                    description: null,
                    is_active: true,
                    deactivated_at: null,
                    deactivated_by: null,
                  },
                  error: null,
                }),
              }),
            }),
          }),
        }),
      };
    });

    const req = createRequest({
      method: 'PATCH',
      query: { id: '1' },
      body: { title: 'Updated Dashboard' },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
  });
});

describe('DELETE /api/backoffice/pages/[id]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRequirePolicy.mockResolvedValue({
      ok: true,
      user: { email: 'admin@test.com' },
    });
    mockParseId.mockReturnValue(1);
  });

  it('returns 400 when page is already deactivated', async () => {
    mockSchema.mockReturnValue({
      from: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            maybeSingle: jest.fn().mockResolvedValue({
              data: { id: 1, is_active: false },
              error: null,
            }),
          }),
        }),
      }),
    });

    const req = createRequest({
      method: 'DELETE',
      query: { id: '1' },
      body: {},
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
  });

  it('returns 400 when permanent delete attempted on active page', async () => {
    mockSchema.mockReturnValue({
      from: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            maybeSingle: jest.fn().mockResolvedValue({
              data: { id: 1, is_active: true },
              error: null,
            }),
          }),
        }),
      }),
    });

    const req = createRequest({
      method: 'DELETE',
      query: { id: '1' },
      body: { permanent: true },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
  });

  it('returns 200 when page is soft deleted successfully', async () => {
    let callCount = 0;

    mockSchema.mockImplementation(() => {
      callCount++;

      if (callCount === 1) {
        return {
          from: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              eq: jest.fn().mockReturnValue({
                maybeSingle: jest.fn().mockResolvedValue({
                  data: { id: 1, is_active: true },
                  error: null,
                }),
              }),
            }),
          }),
        };
      }

      return {
        from: jest.fn().mockReturnValue({
          update: jest.fn().mockReturnValue({
            eq: jest.fn().mockResolvedValue({
              data: null,
              error: null,
            }),
          }),
        }),
      };
    });

    const req = createRequest({
      method: 'DELETE',
      query: { id: '1' },
      body: {},
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
  });

  it('returns 200 when page is permanently deleted successfully', async () => {
    let callCount = 0;

    mockSchema.mockImplementation(() => {
      callCount++;

      if (callCount === 1) {
        return {
          from: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              eq: jest.fn().mockReturnValue({
                maybeSingle: jest.fn().mockResolvedValue({
                  data: { id: 1, is_active: false },
                  error: null,
                }),
              }),
            }),
          }),
        };
      }

      return {
        from: jest.fn().mockReturnValue({
          delete: jest.fn().mockReturnValue({
            eq: jest.fn().mockResolvedValue({
              data: null,
              error: null,
            }),
          }),
        }),
      };
    });

    const req = createRequest({
      method: 'DELETE',
      query: { id: '1' },
      body: { permanent: true },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
  });
});
