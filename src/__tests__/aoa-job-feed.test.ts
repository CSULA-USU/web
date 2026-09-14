import {
  restorePostingStructure,
  sanitizeJobDescription,
  toJobListings,
} from 'lib/aoaJobFeed';

const usuItem = {
  guid: 'https://csuaoa.org/?post_type=job_listing&p=9509',
  title: 'Assistant Director of Operations Services',
  link: 'https://csuaoa.org/job/usu-losangeles-assistant-director-of-operations-services/',
  isoDate: '2026-08-21T22:55:52.000Z',
  'content:encoded':
    '<strong>General Statement</strong>\nAnnual rate: $70,500-$74,000.',
  'job_listing:location': 'usu-losangeles',
};

describe('toJobListings', () => {
  it('keeps listings whose location is the U-SU', () => {
    expect(toJobListings([usuItem])).toHaveLength(1);
  });

  it('drops other Los Angeles auxiliaries sharing the feed', () => {
    const otherAuxiliary = {
      ...usuItem,
      'job_listing:location': 'asi-losangeles',
    };
    expect(toJobListings([otherAuxiliary])).toHaveLength(0);
  });

  // The old filter matched "university-student union" in the prose, so a
  // posting that only ever said "U-SU" silently vanished from the page.
  it('keeps a listing that never spells out the U-SU in its body', () => {
    const abbreviated = {
      ...usuItem,
      'content:encoded': 'The U-SU seeks a director.',
    };
    expect(toJobListings([abbreviated])).toHaveLength(1);
  });

  it('maps only the fields the page renders', () => {
    const [job] = toJobListings([usuItem]);
    expect(job.id).toBe(usuItem.guid);
    expect(job.title).toBe(usuItem.title);
    expect(job.link).toBe(usuItem.link);
    expect(job.postedAt).toBe(usuItem.isoDate);
    expect(job.descriptionHtml).toContain('Annual rate: $70,500-$74,000.');
  });
});

describe('sanitizeJobDescription', () => {
  it('strips script tags and their contents', () => {
    const clean = sanitizeJobDescription('<p>Hi</p><script>alert(1)</script>');
    expect(clean).not.toContain('script');
    expect(clean).not.toContain('alert');
  });

  it('strips event handler attributes', () => {
    expect(sanitizeJobDescription('<p onclick="steal()">Duties</p>')).toBe(
      '<p>Duties</p>',
    );
  });

  // The body is pasted out of Outlook, so every real posting carries this.
  it('drops Outlook paste artifacts but keeps the href', () => {
    const clean = sanitizeJobDescription(
      '<a id="OWA9c5f" class="OWAAutoLink" title="dropbox" href="https://example.com/form.pdf" data-olk-copy-source="MailCompose">U-SU Application</a>',
    );
    expect(clean).toContain('href="https://example.com/form.pdf"');
    expect(clean).not.toContain('OWAAutoLink');
    expect(clean).not.toContain('data-olk-copy-source');
  });

  it('opens surviving links safely in a new tab', () => {
    const clean = sanitizeJobDescription(
      '<a href="https://example.com">Apply</a>',
    );
    expect(clean).toContain('target="_blank"');
    expect(clean).toContain('rel="noopener noreferrer"');
  });

  it('keeps the section headings and list markup HR actually uses', () => {
    const clean = sanitizeJobDescription(
      '<strong>Qualifications</strong><ul><li>Degree</li></ul>',
    );
    expect(clean).toBe(
      '<strong>Qualifications</strong><ul><li>Degree</li></ul>',
    );
  });

  it('keeps the markup restorePostingStructure produces', () => {
    expect(
      sanitizeJobDescription('<h3>Qualifications</h3><p>Degree.</p>'),
    ).toBe('<h3>Qualifications</h3><p>Degree.</p>');
  });
});

describe('restorePostingStructure', () => {
  // Word wraps the source at ~90 characters, so these newlines fall wherever
  // the document happened to end a line, not where a sentence ends.
  it('rejoins a sentence Word broke across lines', () => {
    expect(
      restorePostingStructure(
        'The Assistant Director of Operations is responsible for the maintenance and custodial units of the\nUniversity-Student Union (U-SU).',
      ),
    ).toBe(
      '<p>The Assistant Director of Operations is responsible for the maintenance and custodial units of the University-Student Union (U-SU).</p>',
    );
  });

  it('treats a blank line as a real paragraph break', () => {
    expect(
      restorePostingStructure(
        'Work week class: Non-Exempt\n\nMandated reporter: Limited',
      ),
    ).toBe(
      '<p>Work week class: Non-Exempt</p><p>Mandated reporter: Limited</p>',
    );
  });

  it('promotes a bolded label on its own line to a heading', () => {
    expect(
      restorePostingStructure(
        '<strong>General Statement</strong>\nThe U-SU seeks a director.',
      ),
    ).toBe('<h3>General Statement</h3><p>The U-SU seeks a director.</p>');
  });

  it('builds a list from bullet lines', () => {
    expect(
      restorePostingStructure(
        '• Bachelor’s degree required.\n• Two years of experience.',
      ),
    ).toBe(
      '<ul><li>Bachelor’s degree required.</li><li>Two years of experience.</li></ul>',
    );
  });

  // The failure the old pre-line rendering showed most visibly: a bullet long
  // enough to wrap stranded its last word on a line by itself.
  it('reunites a wrapped bullet with its own item', () => {
    expect(
      restorePostingStructure(
        '• Strong interpersonal, customer service, organizational, and communication skills\nrequired.',
      ),
    ).toBe(
      '<ul><li>Strong interpersonal, customer service, organizational, and communication skills required.</li></ul>',
    );
  });

  it('closes a list when prose resumes after it', () => {
    expect(
      restorePostingStructure('• Degree required.\n\nApply by email.'),
    ).toBe('<ul><li>Degree required.</li></ul><p>Apply by email.</p>');
  });

  it('leaves the body alone if AOA ever sends real markup', () => {
    const structured = '<p>Already paragraphed.</p>';
    expect(restorePostingStructure(structured)).toBe(structured);
  });

  it('returns nothing for an empty body', () => {
    expect(restorePostingStructure('')).toBe('');
  });
});
