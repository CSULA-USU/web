import { createShuffleOrder, getMediaUrl } from 'lib/music';

describe('shuffle order', () => {
  it('keeps the selected track first and includes every track exactly once', () => {
    const original = [0, 1, 2, 3, 4, 5, 6, 7];
    const random = jest.spyOn(Math, 'random').mockReturnValue(0);
    try {
      const shuffled = createShuffleOrder(original, 3);
      expect(shuffled[0]).toBe(3);
      expect([...shuffled].sort((a, b) => a - b)).toEqual(original);
      expect(shuffled.slice(1)).not.toEqual(
        original.filter((index) => index !== 3),
      );
      expect(original).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
    } finally {
      random.mockRestore();
    }
  });

  it('does not add an unavailable selected track to the queue', () => {
    expect(createShuffleOrder([], 0)).toEqual([]);
    expect(createShuffleOrder([2], 0)).toEqual([2]);
    expect(createShuffleOrder([2], 2)).toEqual([2]);
  });
});

describe('direct media URLs', () => {
  it.each(['track.m4a', 'artwork.webp'])(
    'converts %s sharing links without losing access keys',
    (filename) => {
      const url = new URL(
        getMediaUrl(
          `https://www.dropbox.com/scl/fo/folder/${filename}?rlkey=secret&dl=0`,
        ),
      );
      expect(url.hostname).toBe('dl.dropboxusercontent.com');
      expect(url.pathname).toBe(`/scl/fo/folder/${filename}`);
      expect(url.searchParams.get('rlkey')).toBe('secret');
      expect(url.searchParams.get('raw')).toBe('1');
      expect(url.searchParams.has('dl')).toBe(false);
    },
  );

  it('preserves other HTTPS media URLs and rejects invalid sources', () => {
    expect(getMediaUrl('https://example.com/cover.webp')).toBe(
      'https://example.com/cover.webp',
    );
    expect(getMediaUrl('javascript:alert(1)')).toBe('');
    expect(getMediaUrl('not a URL')).toBe('');
    expect(getMediaUrl('')).toBe('');
  });
});
