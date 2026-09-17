jest.mock('lib/ratelimit', () => ({
  jotformContactRatelimit: {
    limit: jest.fn(),
  },
  jotformContactIpRatelimit: {
    limit: jest.fn(),
  },
}));

jest.mock('lib/api', () => {
  const actual = jest.requireActual('lib/api');
  return actual;
});

import {
  isTooFastToBeHuman,
  MIN_FORM_FILL_MS,
  sanitize,
  validateContactForm,
} from 'pages/api/jotformContact';

describe('sanitize', () => {
  it('returns empty string when input is not a string', () => {
    expect(sanitize(123, 50)).toBe('');
  });

  it('returns empty string when input is null', () => {
    expect(sanitize(null, 50)).toBe('');
  });

  it('returns empty string when input is undefined', () => {
    expect(sanitize(undefined, 50)).toBe('');
  });

  it('trims whitespace from input', () => {
    expect(sanitize('  hello  ', 50)).toBe('hello');
  });

  it('truncates input to maxLength', () => {
    expect(sanitize('hello world', 5)).toBe('hello');
  });

  it('returns clean string when input is valid', () => {
    expect(sanitize('hello', 50)).toBe('hello');
  });
});

describe('validateContactForm', () => {
  const validBody = {
    email: 'student@calstatela.edu',
    subject: 'Test Subject',
    message: 'Test message content',
    category: 'feedback',
    firstName: 'John',
    lastInitial: 'D',
  };

  it('returns error when body is null', () => {
    const result = validateContactForm(null);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors).toContain('Invalid request body.');
    }
  });

  it('returns error when body is not an object', () => {
    const result = validateContactForm('string');
    expect(result.ok).toBe(false);
  });

  it('returns error when email is missing', () => {
    const result = validateContactForm({ ...validBody, email: '' });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.some((e) => e.toLowerCase().includes('email'))).toBe(
        true,
      );
    }
  });

  /* Anyone may write in, campus address or not — the form is how visitors
     and renters reach the U-SU at all. Format is the only email rule left. */
  it('accepts an email from outside calstatela.edu', () => {
    const result = validateContactForm({
      ...validBody,
      email: 'visitor@gmail.com',
    });
    expect(result.ok).toBe(true);
  });

  it('returns error when email is malformed', () => {
    const result = validateContactForm({ ...validBody, email: 'notanemail' });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.some((e) => e.toLowerCase().includes('email'))).toBe(
        true,
      );
    }
  });

  it('returns error when subject is missing', () => {
    const result = validateContactForm({ ...validBody, subject: '' });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors).toContain('Subject is required.');
    }
  });

  it('returns error when message is missing', () => {
    const result = validateContactForm({ ...validBody, message: '' });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors).toContain('Message is required.');
    }
  });

  it('returns error when category is missing', () => {
    const result = validateContactForm({ ...validBody, category: '' });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors).toContain('Category is required.');
    }
  });

  it('returns error when category is invalid', () => {
    const result = validateContactForm({
      ...validBody,
      category: 'invalid_category',
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors).toContain('Category is invalid.');
    }
  });

  it('returns ok with sanitized data when all fields are valid', () => {
    const result = validateContactForm(validBody);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.email).toBe('student@calstatela.edu');
      expect(result.data.subject).toBe('Test Subject');
      expect(result.data.message).toBe('Test message content');
    }
  });

  it('truncates fields that exceed max length', () => {
    const result = validateContactForm({
      ...validBody,
      subject: 'a'.repeat(300),
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.subject.length).toBeLessThanOrEqual(200);
    }
  });
});

describe('isTooFastToBeHuman', () => {
  it('accepts a duration a person could plausibly have taken', () => {
    expect(isTooFastToBeHuman(MIN_FORM_FILL_MS)).toBe(false);
    expect(isTooFastToBeHuman(MIN_FORM_FILL_MS + 1)).toBe(false);
    expect(isTooFastToBeHuman(45_000)).toBe(false);
  });

  it('rejects a submission faster than anyone could type it', () => {
    expect(isTooFastToBeHuman(0)).toBe(true);
    expect(isTooFastToBeHuman(250)).toBe(true);
    expect(isTooFastToBeHuman(MIN_FORM_FILL_MS - 1)).toBe(true);
  });

  /* A crafted POST that never loaded the page has no duration to report, so a
     missing or junk value is treated as a fail rather than waved through. */
  it('rejects a missing or non-numeric duration', () => {
    expect(isTooFastToBeHuman(undefined)).toBe(true);
    expect(isTooFastToBeHuman(null)).toBe(true);
    expect(isTooFastToBeHuman('4000')).toBe(true);
    expect(isTooFastToBeHuman(NaN)).toBe(true);
    expect(isTooFastToBeHuman(Infinity)).toBe(true);
  });

  it('rejects a negative duration', () => {
    expect(isTooFastToBeHuman(-1)).toBe(true);
    expect(isTooFastToBeHuman(-60_000)).toBe(true);
  });
});
