import { readPageMetadata } from 'scripts/page-metadata';

const pageMetaWith = (attributes: string) =>
  `<PageMeta title="a" description="b" path="/" ${attributes} />`;

describe('readPageMetadata', () => {
  it('reads a <PageMeta>', () => {
    expect(
      readPageMetadata(`
        <PageMeta
          title="U–SU Board Members"
          description={'Meet the board.'}
          path="/board-of-directors/roster"
        />`),
    ).toEqual({
      title: 'U–SU Board Members',
      description: 'Meet the board.',
      noindex: false,
    });
  });

  it('reads a hand-written <Head>, decoding entities and dropping the site name', () => {
    expect(
      readPageMetadata(`
        <Head>
          <title>Recreation Membership | Cal State LA U&ndash;SU</title>
          <meta
            name="description"
            content="Most students already
              have a membership."
            key="description"
          />
        </Head>`),
    ).toEqual({
      title: 'Recreation Membership',
      description: 'Most students already have a membership.',
      noindex: false,
    });
  });

  it('gives up on a title built at runtime rather than guessing', () => {
    expect(readPageMetadata('<title>{`${name} | U-SU`}</title>').title).toBe(
      null,
    );
  });
});

describe('noindex', () => {
  it('counts a bare noindex or noindex={true} on <PageMeta>', () => {
    expect(readPageMetadata(pageMetaWith('noindex')).noindex).toBe(true);
    expect(readPageMetadata(pageMetaWith('noindex={true}')).noindex).toBe(true);
    expect(
      readPageMetadata('<PageMeta title="a" description="b" noindex/>').noindex,
    ).toBe(true);
  });

  it('does not count noindex={false} or a value only known at runtime', () => {
    expect(readPageMetadata(pageMetaWith('noindex={false}')).noindex).toBe(
      false,
    );
    expect(
      readPageMetadata(pageMetaWith('noindex={!isLaunched}')).noindex,
    ).toBe(false);
  });

  it('counts a robots meta tag whatever order its attributes are in', () => {
    expect(
      readPageMetadata('<meta name="robots" content="noindex, nofollow" />')
        .noindex,
    ).toBe(true);
    expect(
      readPageMetadata(`
        <meta
          content="noindex,nofollow"
          key="robots"
          name="robots"
        />`).noindex,
    ).toBe(true);
  });

  it('ignores a robots tag that allows indexing, and other meta tags', () => {
    expect(
      readPageMetadata('<meta name="robots" content="index, follow" />')
        .noindex,
    ).toBe(false);
    expect(
      readPageMetadata(
        '<meta name="description" content="noindex is a word" />',
      ).noindex,
    ).toBe(false);
  });
});
