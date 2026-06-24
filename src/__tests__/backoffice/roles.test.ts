import { createRequest, createResponse } from 'node-mocks-http';

jest.mock('lib/supabaseAdmin', () => ({
  supabaseAdmin: {
    schema: jest.fn(),
  },
}));

jest.mock('lib/backoffice', () => ({
  requireBackofficePolicyV2: jest.fn(),
}));

import { normalizeOptionalText } from 'pages/api/backoffice/roles/index';
import handler from 'pages/api/backoffice/roles/index';
import { supabaseAdmin } from 'lib/supabaseAdmin';
import { requireBackofficePolicyV2 } from 'lib/backoffice';
import { validateStringField } from 'lib/api';

const mockRequirePolicy = requireBackofficePolicyV2 as jest.Mock;
const mockSchema = supabaseAdmin.schema as jest.Mock;

describe('normalizeOptionalText', () => {
  it('returns null when value is undefined', () => {
    expect(normalizeOptionalText(undefined)).toBeNull();
  });

  it('returns null when value is null', () => {
    expect(normalizeOptionalText(null)).toBeNull();
  });

  it('returns null when value is an empty string', () => {
    expect(normalizeOptionalText('')).toBeNull();
  });

  it('returns null when value is only whitespace', () => {
    expect(normalizeOptionalText('     ')).toBeNull();
  });

  it('returns trimmed string when value has leading and trailing spaces', () => {
    expect(normalizeOptionalText('  admin  ')).toBe('admin');
  });

  it('returns the string as is when value is already clean', () => {
    expect(normalizeOptionalText('admin')).toBe('admin');
  });
});

describe('validateStringField', () => {
  it('returns error when required field is missing', () => {
    expect(
      validateStringField(undefined, { required: true, fieldName: 'role_key' }),
    ).toBe('role_key is required.');
  });

  it('returns error when required field is empty string', () => {
    expect(
      validateStringField('', { required: true, fieldName: 'role_key' }),
    ).toBe('role_key is required.');
  });

  it('returns error when required field is only whitespace', () => {
    expect(
      validateStringField('   ', { required: true, fieldName: 'role_key' }),
    ).toBe('role_key is required.');
  });

  it('returns error when value exceeds maxLength', () => {
    const longString = 'a'.repeat(51);
    expect(
      validateStringField(longString, { maxLength: 50, fieldName: 'role_key' }),
    ).toBe('role_key must be 50 characters or fewer.');
  });

  it('returns error when value contains script injection', () => {
    expect(
      validateStringField('<script>alert("xss")</script>', {
        fieldName: 'role_key',
      }),
    ).toBe('role_key contains invalid characters.');
  });

  it('returns error when value contains sql injection', () => {
    expect(
      validateStringField("'; DROP TABLE roles; --", { fieldName: 'role_key' }),
    ).toBe('role_key contains invalid characters.');
  });

  it('returns error when value contains javascript protocol', () => {
    expect(
      validateStringField('javascript:alert(1)', { fieldName: 'role_key' }),
    ).toBe('role_key contains invalid characters.');
  });

  it('returns null for valid clean input', () => {
    expect(
      validateStringField('admin_role', {
        required: true,
        maxLength: 50,
        fieldName: 'role_key',
      }),
    ).toBeNull();
  });
});

describe('POST /api/backoffice/roles', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRequirePolicy.mockResolvedValue({ ok: true });
  });

  it('returns 400 when role_key is missing', async () => {
    const req = createRequest({
      method: 'POST',
      body: { role_name: 'Admin' },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
  });

  it('returns 400 when role_key is only whitespace', async () => {
    const req = createRequest({
      method: 'POST',
      body: { role_key: '   ', role_name: 'Admin' },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
  });

  it('returns 400 when role_name is missing', async () => {
    const req = createRequest({
      method: 'POST',
      body: { role_key: 'admin' },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
  });

  it('returns 400 when role_key already exists', async () => {
    mockSchema.mockReturnValue({
      from: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            maybeSingle: jest.fn().mockResolvedValue({
              data: { id: '123' },
              error: null,
            }),
          }),
        }),
      }),
    });

    const req = createRequest({
      method: 'POST',
      body: { role_key: 'admin', role_name: 'Admin' },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
  });

  it('returns 201 when role is created successfully', async () => {
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
                  id: '1',
                  role_key: 'admin',
                  role_name: 'Admin',
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
      body: { role_key: 'admin', role_name: 'Admin' },
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(201);
  });
});
