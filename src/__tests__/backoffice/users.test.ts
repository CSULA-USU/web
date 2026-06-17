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
  validateEmail: jest.fn().mockReturnValue(null),
}));

import handler from 'pages/api/backoffice/users/index';
import { supabaseAdmin } from 'lib/supabaseAdmin';
import { requireBackofficePolicyV2 } from 'lib/backoffice';
import { validateEmail } from 'lib/api';

const mockRequirePolicy = requireBackofficePolicyV2 as jest.Mock;
const mockSchema = supabaseAdmin.schema as jest.Mock;
const mockValidateEmail = validateEmail as jest.Mock;

describe('POST /api/backoffice/users', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRequirePolicy.mockResolvedValue({ ok: true });
    mockValidateEmail.mockReturnValue(null);
  });

  it('returns 400 when email is missing', async () => {
    mockValidateEmail.mockReturnValue('Email is required.');

    const req = createRequest({
      method: 'POST',
      body: {},
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
  });

  it('returns 400 when email format is invalid', async () => {
    mockValidateEmail.mockReturnValue('Invalid email format.');

    const req = createRequest({
      method: 'POST',
      body: { email: 'notanemail' },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
  });

  it('returns 400 when user already exists', async () => {
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
      body: { email: 'test@example.com' },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
  });

  it('returns 201 when user is created successfully', async () => {
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
                    data: null,
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
          insert: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              single: jest.fn().mockResolvedValue({
                data: {
                  id: 1,
                  email: 'test@example.com',
                  is_active: true,
                  departments: null,
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
      body: { email: 'test@example.com' },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(201);
  });
});

describe('validateEmail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns error when email is missing', () => {
    mockValidateEmail.mockReturnValue('Email is required.');
    expect(validateEmail(undefined)).toBe('Email is required.');
  });

  it('returns error when email is empty string', () => {
    mockValidateEmail.mockReturnValue('Email is required.');
    expect(validateEmail('')).toBe('Email is required.');
  });

  it('returns error when email format is invalid', () => {
    mockValidateEmail.mockReturnValue('Invalid email format.');
    expect(validateEmail('notanemail')).toBe('Invalid email format.');
  });

  it('returns null for valid email', () => {
    mockValidateEmail.mockReturnValue(null);
    expect(validateEmail('test@example.com')).toBeNull();
  });
});
