jest.mock('lib/api', () => {
  const actual = jest.requireActual('lib/api');
  return actual;
});

import { validateCalStateEmail } from 'lib/api';

describe('validateCalStateEmail', () => {
  it('returns error when email is missing', () => {
    expect(validateCalStateEmail(undefined)).toBe('Email is required.');
  });

  it('returns error when email is empty string', () => {
    expect(validateCalStateEmail('')).toBe('Email is required.');
  });

  it('returns error when email format is invalid', () => {
    expect(validateCalStateEmail('notanemail')).toBe('Invalid email format.');
  });

  it('returns error when email is not a calstatela.edu address', () => {
    expect(validateCalStateEmail('student@gmail.com')).toBe(
      'Please enter a valid Cal State LA email address.',
    );
  });

  it('returns null for valid calstatela.edu email', () => {
    expect(validateCalStateEmail('student@calstatela.edu')).toBeNull();
  });
});
