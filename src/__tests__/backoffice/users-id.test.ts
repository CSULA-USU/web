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
  validateUpdateUserBody: jest.fn(),
}));

import handler from 'pages/api/backoffice/users/[id]';
import { supabaseAdmin } from 'lib/supabaseAdmin';
import { requireBackofficePolicyV2 } from 'lib/backoffice';
import { parseNumericId } from 'lib/api';

const mockRequirePolicy = requireBackofficePolicyV2 as jest.Mock;
const mockSchema = supabaseAdmin.schema as jest.Mock;
const mockParseId = parseNumericId as jest.Mock;

describe('PATCH /api/backoffice/users/[id]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRequirePolicy.mockResolvedValue({
      ok: true,
      user: { id: 99, email: 'admin@test.com' },
    });
    mockParseId.mockReturnValue(1);
    // reset validateUpdateUserBody to pass by default
    const { validateUpdateUserBody } = require('lib/api');
    validateUpdateUserBody.mockImplementation(() => undefined);
  });

  it('returns 400 when id is invalid', async () => {
    mockParseId.mockReturnValue(null);

    const req = createRequest({
      method: 'PATCH',
      query: { id: 'abc' },
      body: { email: 'new@example.com' },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
  });

  it('returns 400 when no updates are provided', async () => {
    const req = createRequest({
      method: 'PATCH',
      query: { id: '1' },
      body: {},
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
  });

  it('returns 400 when email format is invalid', async () => {
    const { validateUpdateUserBody } = require('lib/api');
    validateUpdateUserBody.mockImplementation(() => {
      throw new Error('Invalid email format.');
    });

    const req = createRequest({
      method: 'PATCH',
      query: { id: '1' },
      body: { email: 'notanemail' },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
  });

  it('returns 404 when user is not found', async () => {
    mockSchema.mockReturnValue({
      from: jest.fn().mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              single: jest.fn().mockResolvedValue({
                data: null,
                error: null,
              }),
            }),
          }),
        }),
      }),
    });

    const req = createRequest({
      method: 'PATCH',
      query: { id: '1' },
      body: { email: 'new@example.com' },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(404);
  });

  it('returns 200 when user is updated successfully', async () => {
    mockSchema.mockReturnValue({
      from: jest.fn().mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              single: jest.fn().mockResolvedValue({
                data: {
                  id: 1,
                  email: 'new@example.com',
                  is_active: true,
                  deactivated_at: null,
                  deactivated_by: null,
                  departments: null,
                },
                error: null,
              }),
            }),
          }),
        }),
      }),
    });

    const req = createRequest({
      method: 'PATCH',
      query: { id: '1' },
      body: { email: 'new@example.com' },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
  });
});

describe('DELETE /api/backoffice/users/[id]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRequirePolicy.mockResolvedValue({
      ok: true,
      user: { id: 99, email: 'admin@test.com' },
    });
    mockParseId.mockReturnValue(1);
  });

  it('returns 400 when user tries to delete their own account', async () => {
    mockParseId.mockReturnValue(99);

    const req = createRequest({
      method: 'DELETE',
      query: { id: '99' },
      body: {},
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
  });

  it('returns 404 when user is not found or already deactivated', async () => {
    mockSchema.mockReturnValue({
      from: jest.fn().mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            is: jest.fn().mockReturnValue({
              select: jest.fn().mockReturnValue({
                single: jest.fn().mockResolvedValue({
                  data: null,
                  error: null,
                }),
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

    expect(res.statusCode).toBe(404);
  });

  it('returns 200 when user is soft deleted successfully', async () => {
    mockSchema.mockReturnValue({
      from: jest.fn().mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            is: jest.fn().mockReturnValue({
              select: jest.fn().mockReturnValue({
                single: jest.fn().mockResolvedValue({
                  data: {
                    id: 1,
                    email: 'user@example.com',
                    is_active: false,
                    deactivated_at: new Date().toISOString(),
                    deactivated_by: 'admin@test.com',
                  },
                  error: null,
                }),
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

    expect(res.statusCode).toBe(200);
  });

  it('returns 200 when user is permanently deleted successfully', async () => {
    mockSchema.mockImplementation(() => {
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
