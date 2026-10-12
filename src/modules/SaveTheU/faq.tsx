import { PlaceholderMarker, StyledLink } from 'components';

/* Separate from content.ts because these answers carry markup — placeholder
   markers and in-page links to the sections that hold the full figures. */
export const faq = [
  {
    question: 'Exactly how much? And when does it start?',
    answer: (
      <>
        $90 more per semester. Your U-SU fee goes from $137.25 to $227.25 a
        semester: $454.50 a year instead of $274.50. Across a 16-week semester
        that is $5.63 a week. The effective term has not been set.{' '}
        <PlaceholderMarker>[NEEDS FIGURE — effective term]</PlaceholderMarker>
      </>
    ),
  },
  {
    question: 'Does my financial aid cover it?',
    answer: (
      <>
        That answer belongs to Cal State LA Financial Aid, not to the U-SU, and
        we are not going to approximate it. It will be published here, in their
        words, before anything else on this page is finalized. Until then:{' '}
        <StyledLink
          href="https://www.calstatela.edu/financialaid"
          isExternalLink
        >
          Cal State LA Financial Aid
        </StyledLink>
        . <PlaceholderMarker>[NEEDS COPY — Financial Aid]</PlaceholderMarker>
      </>
    ),
  },
  {
    question: 'What is the 3% annual adjustment? Is it a blank check?',
    answer:
      'No. The proposed contract language allows the fee to rise by up to 3% a year for inflation. It is a ceiling, not a target, and it sits below the historical average rate of inflation, which is exactly why this page exists: the fee was set in 2007 and has not moved in nineteen years. The adjustment is there so that the U-SU never has to come back and ask for another $90 at once.',
  },
  {
    question: "Why can't tuition or the university cover this?",
    answer:
      "The U-SU is a separate 501(c)(3) nonprofit governed by a board chaired by an elected student. It is not part of the university's operating budget and tuition does not fund it. Student fees cover 67% of what it costs to run today; the sustainable range is 80–85%.",
  },
  {
    question: "What happens if it doesn't pass?",
    answer: (
      <>
        $2,000,000 has already been cut across FY 2024-25 and FY 2025-26 — 25%
        of the operating budget. On the current fee, the reserve falls from
        $8,364,353 in FY 2024-25 to $274,702 in FY 2029-30 and to −$2,065,518 in
        FY 2030-31. What gets reduced after that has not been decided.{' '}
        <StyledLink href="#if-it-fails">See the full section →</StyledLink>
      </>
    ),
  },
  {
    question: 'Who decided the amount?',
    answer: (
      <>
        The U-SU Board of Directors, chaired by an elected student, working from
        the Fiscal Committee&apos;s April 10 2026 budget projection.{' '}
        <PlaceholderMarker>
          [NEEDS COPY — board resolution and vote record]
        </PlaceholderMarker>
      </>
    ),
  },
  {
    question: 'I never use the U-SU. Why am I paying?',
    answer:
      'Fair question, and the honest answer has two halves. The first: most of what is in here costs money everywhere else — a gym, a pantry, a microwave, a quiet room, a place to park yourself between classes — and here it is already paid for. The second: the building went up in 2009 on a bond that runs through 2038, about a third of the operating budget every year. That payment does not stop if attendance drops. It is worth getting something back for it.',
  },
  {
    question: 'Where can I see the budget for myself?',
    answer: (
      <>
        Every figure on this page is numbered and traced to its document.{' '}
        <StyledLink href="#sources">Sources →</StyledLink>
      </>
    ),
  },
];
