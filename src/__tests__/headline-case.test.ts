import { toHeadlineCase } from 'utils/stringhelpers';

describe('toHeadlineCase', () => {
  it('capitalizes every major word', () => {
    expect(toHeadlineCase('Why it matters')).toBe('Why It Matters');
    expect(toHeadlineCase('Get informed')).toBe('Get Informed');
  });

  it('keeps articles, conjunctions and prepositions lowercase mid-phrase', () => {
    expect(toHeadlineCase("What's at stake")).toBe("What's at Stake");
    expect(toHeadlineCase('for faculty and staff')).toBe(
      'For Faculty and Staff',
    );
  });

  it('capitalizes a minor word that opens or closes the phrase', () => {
    expect(toHeadlineCase('the numbers')).toBe('The Numbers');
    expect(toHeadlineCase('what to sign up for')).toBe('What to Sign Up For');
  });
});
