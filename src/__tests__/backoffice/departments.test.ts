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
  serverError: jest
    .fn()
    .mockImplementation((res: any, msg: string) =>
      res.status(500).json({ error: msg }),
    ),
  validateDepartmentBody: jest.fn(),
}));

import handler from 'pages/api/backoffice/departments/index';
import { supabaseAdmin } from 'lib/supabaseAdmin';
import { requireBackofficePolicyV2 } from 'lib/backoffice';
import { validateDepartmentBody } from 'lib/api';

const mockRequirePolicy = requireBackofficePolicyV2 as jest.Mock;
const mockSchema = supabaseAdmin.schema as jest.Mock;
const mockValidateDepartmentBody = validateDepartmentBody as jest.Mock;

describe('POST /api/backoffice/departments', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRequirePolicy.mockResolvedValue({ ok: true });
    mockValidateDepartmentBody.mockImplementation(() => undefined);
  });

  it('returns 400 when department_key is missing', async () => {
    mockValidateDepartmentBody.mockImplementation(() => {
      throw new Error('department_key is required.');
    });

    const req = createRequest({
      method: 'POST',
      body: { department_name: 'Engineering' },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
  });

  it('returns 400 when department_name is missing', async () => {
    mockValidateDepartmentBody.mockImplementation(() => {
      throw new Error('department_name is required.');
    });

    const req = createRequest({
      method: 'POST',
      body: { department_key: 'engineering' },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
  });

  it('returns 400 when department_key contains injection', async () => {
    mockValidateDepartmentBody.mockImplementation(() => {
      throw new Error('department_key contains invalid characters.');
    });

    const req = createRequest({
      method: 'POST',
      body: {
        department_key: '<script>alert("xss")</script>',
        department_name: 'Engineering',
      },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
  });

  it('returns 400 when department_key already exists', async () => {
    mockSchema.mockReturnValue({
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
    });

    const req = createRequest({
      method: 'POST',
      body: {
        department_key: 'engineering',
        department_name: 'Engineering',
      },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
  });

  it('returns 201 when department is created successfully', async () => {
    let callCount = 0;

    mockSchema.mockImplementation(() => {
      callCount++;

      if (callCount === 1) {
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
      }

      return {
        from: jest.fn().mockReturnValue({
          insert: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              single: jest.fn().mockResolvedValue({
                data: {
                  id: 1,
                  department_key: 'engineering',
                  department_name: 'Engineering',
                  department_fullname: null,
                  is_active: true,
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
      body: {
        department_key: 'engineering',
        department_name: 'Engineering',
      },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(201);
  });
});
