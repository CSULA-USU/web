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
  validateUpdateDepartmentBody: jest.fn(),
}));

import handler from 'pages/api/backoffice/departments/[id]';
import { supabaseAdmin } from 'lib/supabaseAdmin';
import { requireBackofficePolicyV2 } from 'lib/backoffice';
import { parseNumericId } from 'lib/api';

const mockRequirePolicy = requireBackofficePolicyV2 as jest.Mock;
const mockSchema = supabaseAdmin.schema as jest.Mock;
const mockParseId = parseNumericId as jest.Mock;

describe('PATCH /api/backoffice/departments/[id]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRequirePolicy.mockResolvedValue({
      ok: true,
      user: { email: 'admin@test.com' },
    });
    mockParseId.mockReturnValue(1);
    const { validateUpdateDepartmentBody } = require('lib/api');
    validateUpdateDepartmentBody.mockImplementation(() => undefined);
  });

  it('returns 400 when id is invalid', async () => {
    mockParseId.mockReturnValue(null);

    const req = createRequest({
      method: 'PATCH',
      query: { id: 'abc' },
      body: { department_name: 'Engineering' },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
  });

  it('returns 404 when department is not found', async () => {
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
      body: { department_name: 'Engineering' },
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

  it('returns 400 when department_name contains injection', async () => {
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

    const { validateUpdateDepartmentBody } = require('lib/api');
    validateUpdateDepartmentBody.mockImplementation(() => {
      throw new Error('department_name contains invalid characters.');
    });

    const req = createRequest({
      method: 'PATCH',
      query: { id: '1' },
      body: { department_name: '<script>alert("xss")</script>' },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
  });

  it('returns 200 when department is updated successfully', async () => {
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
                    department_key: 'engineering',
                    department_name: 'Engineering Updated',
                    department_fullname: null,
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
      body: { department_name: 'Engineering Updated' },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
  });
});

describe('DELETE /api/backoffice/departments/[id]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRequirePolicy.mockResolvedValue({
      ok: true,
      user: { email: 'admin@test.com' },
    });
    mockParseId.mockReturnValue(1);
  });

  it('returns 400 when department is already deactivated', async () => {
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
          select: jest.fn().mockReturnValue({
            eq: jest.fn().mockReturnValue({
              count: 0,
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

    expect(res.statusCode).toBe(400);
  });

  it('returns 400 when department has assigned users', async () => {
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
          select: jest.fn().mockReturnValue({
            eq: jest.fn().mockReturnValue({
              count: 2,
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

    expect(res.statusCode).toBe(400);
  });

  it('returns 400 when permanent delete attempted on active department', async () => {
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
          select: jest.fn().mockReturnValue({
            eq: jest.fn().mockReturnValue({
              count: 0,
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

    expect(res.statusCode).toBe(400);
  });

  it('returns 200 when department is soft deleted successfully', async () => {
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

      if (callCount === 2) {
        return {
          from: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              eq: jest.fn().mockReturnValue({
                count: 0,
                error: null,
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

  it('returns 200 when department is permanently deleted successfully', async () => {
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

      if (callCount === 2) {
        return {
          from: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              eq: jest.fn().mockReturnValue({
                count: 0,
                error: null,
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
