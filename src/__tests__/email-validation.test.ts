jest.mock('lib/api', () => {
  const actual = jest.requireActual('lib/api');
  return actual;
});

import { validateEmail } from 'lib/api';

describe('validateEmail', () => {
  it('returns error when email is missing', () => {
    expect(validateEmail(undefined)).toBe('Email is required.');
  });

  it('returns error when email is empty string', () => {
    expect(validateEmail('')).toBe('Email is required.');
  });

  it('returns error when email format is invalid', () => {
    expect(validateEmail('notanemail')).toBe('Invalid email format.');
  });

  /* No domain is privileged. The contact form is the only way into the U-SU
     for people who are not students — someone renting a room, a visitor who
     left a bag behind — and a campus-only rule turned all of them away. */
  it('returns null for an address outside calstatela.edu', () => {
    expect(validateEmail('visitor@gmail.com')).toBeNull();
  });

  it('returns null for a calstatela.edu email', () => {
    expect(validateEmail('student@calstatela.edu')).toBeNull();
  });
});
