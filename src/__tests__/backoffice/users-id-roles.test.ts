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
}));

import handler from 'pages/api/backoffice/users/[id]/roles';
import { supabaseAdmin } from 'lib/supabaseAdmin';
import { requireBackofficePolicyV2 } from 'lib/backoffice';
import { parseNumericId } from 'lib/api';

const mockRequirePolicy = requireBackofficePolicyV2 as jest.Mock;
const mockSchema = supabaseAdmin.schema as jest.Mock;
const mockParseId = parseNumericId as jest.Mock;

describe('POST /api/backoffice/users/[id]/roles', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRequirePolicy.mockResolvedValue({
      ok: true,
      user: { email: 'admin@test.com' },
    });
    mockParseId.mockReturnValue(1);
  });

  it('returns 400 when user id is invalid', async () => {
    mockParseId.mockReturnValue(null);

    const req = createRequest({
      method: 'POST',
      query: { id: 'abc' },
      body: { role_id: 1 },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
  });

  it('returns 404 when user is not found', async () => {
    mockSchema.mockReturnValue({
      from: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            is: jest.fn().mockReturnValue({
              maybeSingle: jest.fn().mockResolvedValue({
                data: null,
                error: null,
              }),
            }),
          }),
        }),
      }),
    });

    const req = createRequest({
      method: 'POST',
      query: { id: '999' },
      body: { role_id: 1 },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(404);
  });

  it('returns 400 when role_id is missing', async () => {
    mockSchema.mockReturnValue({
      from: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            is: jest.fn().mockReturnValue({
              maybeSingle: jest.fn().mockResolvedValue({
                data: { id: 1 },
                error: null,
              }),
            }),
          }),
        }),
      }),
    });

    const req = createRequest({
      method: 'POST',
      query: { id: '1' },
      body: {},
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
  });

  it('returns 404 when role is not found', async () => {
    let callCount = 0;

    mockSchema.mockImplementation(() => {
      callCount++;

      if (callCount === 1) {
        return {
          from: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              eq: jest.fn().mockReturnValue({
                is: jest.fn().mockReturnValue({
                  maybeSingle: jest.fn().mockResolvedValue({
                    data: { id: 1 },
                    error: null,
                  }),
                }),
              }),
            }),
          }),
        };
      }

      return {
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
      };
    });

    const req = createRequest({
      method: 'POST',
      query: { id: '1' },
      body: { role_id: 999 },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(404);
  });

  it('returns 201 when role is assigned successfully', async () => {
    let callCount = 0;

    mockSchema.mockImplementation(() => {
      callCount++;

      if (callCount === 1) {
        return {
          from: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              eq: jest.fn().mockReturnValue({
                is: jest.fn().mockReturnValue({
                  maybeSingle: jest.fn().mockResolvedValue({
                    data: { id: 1 },
                    error: null,
                  }),
                }),
              }),
            }),
          }),
        };
      }

      if (callCount === 2) {
        return {
          from: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              eq: jest.fn().mockReturnValue({
                maybeSingle: jest.fn().mockResolvedValue({
                  data: { id: 1 },
                  error: null,
                }),
              }),
            }),
          }),
        };
      }

      return {
        from: jest.fn().mockReturnValue({
          insert: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              single: jest.fn().mockResolvedValue({
                data: {
                  id: 1,
                  user_id: 1,
                  role_id: 1,
                },
                error: null,
              }),
            }),
          }),
        }),
      };
    });

    const req = createRequest({
      method: 'POST',
      query: { id: '1' },
      body: { role_id: 1 },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(201);
  });
});

describe('DELETE /api/backoffice/users/[id]/roles', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRequirePolicy.mockResolvedValue({
      ok: true,
      user: { email: 'admin@test.com' },
    });
    mockParseId.mockReturnValue(1);
  });

  it('returns 400 when role_id is missing', async () => {
    mockSchema.mockReturnValue({
      from: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            is: jest.fn().mockReturnValue({
              maybeSingle: jest.fn().mockResolvedValue({
                data: { id: 1 },
                error: null,
              }),
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

  it('returns 404 when role assignment is not found', async () => {
    let callCount = 0;

    mockSchema.mockImplementation(() => {
      callCount++;

      if (callCount === 1) {
        return {
          from: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              eq: jest.fn().mockReturnValue({
                is: jest.fn().mockReturnValue({
                  maybeSingle: jest.fn().mockResolvedValue({
                    data: { id: 1 },
                    error: null,
                  }),
                }),
              }),
            }),
          }),
        };
      }

      return {
        from: jest.fn().mockReturnValue({
          delete: jest.fn().mockReturnValue({
            eq: jest.fn().mockReturnValue({
              eq: jest.fn().mockResolvedValue({
                count: 0,
                error: null,
              }),
            }),
          }),
        }),
      };
    });

    const req = createRequest({
      method: 'DELETE',
      query: { id: '1' },
      body: { role_id: 999 },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(404);
  });

  it('returns 200 when role is removed successfully', async () => {
    let callCount = 0;

    mockSchema.mockImplementation(() => {
      callCount++;

      if (callCount === 1) {
        return {
          from: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              eq: jest.fn().mockReturnValue({
                is: jest.fn().mockReturnValue({
                  maybeSingle: jest.fn().mockResolvedValue({
                    data: { id: 1 },
                    error: null,
                  }),
                }),
              }),
            }),
          }),
        };
      }

      return {
        from: jest.fn().mockReturnValue({
          delete: jest.fn().mockReturnValue({
            eq: jest.fn().mockReturnValue({
              eq: jest.fn().mockResolvedValue({
                count: 1,
                error: null,
              }),
            }),
          }),
        }),
      };
    });

    const req = createRequest({
      method: 'DELETE',
      query: { id: '1' },
      body: { role_id: 1 },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
  });
});
