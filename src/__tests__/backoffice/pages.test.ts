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
  validatePageBody: jest.fn(),
}));

import handler from 'pages/api/backoffice/pages/index';
import { supabaseAdmin } from 'lib/supabaseAdmin';
import { requireBackofficePolicyV2 } from 'lib/backoffice';
import { validatePageBody } from 'lib/api';

const mockRequirePolicy = requireBackofficePolicyV2 as jest.Mock;
const mockSchema = supabaseAdmin.schema as jest.Mock;
const mockValidatePageBody = validatePageBody as jest.Mock;

describe('POST /api/backoffice/pages', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRequirePolicy.mockResolvedValue({ ok: true });
    mockValidatePageBody.mockImplementation(() => undefined);
  });

  it('returns 400 when page_key is missing', async () => {
    mockValidatePageBody.mockImplementation(() => {
      throw new Error('page_key is required.');
    });

    const req = createRequest({
      method: 'POST',
      body: { title: 'Dashboard', route: '/dashboard' },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
  });

  it('returns 400 when title is missing', async () => {
    mockValidatePageBody.mockImplementation(() => {
      throw new Error('title is required.');
    });

    const req = createRequest({
      method: 'POST',
      body: { page_key: 'dashboard', route: '/dashboard' },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
  });

  it('returns 400 when route is missing', async () => {
    mockValidatePageBody.mockImplementation(() => {
      throw new Error('route is required.');
    });

    const req = createRequest({
      method: 'POST',
      body: { page_key: 'dashboard', title: 'Dashboard' },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
  });

  it('returns 400 when page_key contains injection', async () => {
    mockValidatePageBody.mockImplementation(() => {
      throw new Error('page_key contains invalid characters.');
    });

    const req = createRequest({
      method: 'POST',
      body: {
        page_key: '<script>alert("xss")</script>',
        title: 'Dashboard',
        route: '/dashboard',
      },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
  });

  it('returns 400 when page_key already exists', async () => {
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
        page_key: 'dashboard',
        title: 'Dashboard',
        route: '/dashboard',
      },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
  });

  it('returns 201 when page is created successfully', async () => {
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
                  page_key: 'dashboard',
                  title: 'Dashboard',
                  route: '/dashboard',
                  description: null,
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
        page_key: 'dashboard',
        title: 'Dashboard',
        route: '/dashboard',
      },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(201);
  });
});
