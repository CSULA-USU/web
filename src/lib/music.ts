/** Keep the selected song first so enabling shuffle never interrupts playback. */
export function createShuffleOrder(
  albumOrder: number[],
  selectedIndex: number,
): number[] {
  const remaining = albumOrder.filter((index) => index !== selectedIndex);
  for (let index = remaining.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [remaining[index], remaining[swapIndex]] = [
      remaining[swapIndex],
      remaining[index],
    ];
  }
  return albumOrder.includes(selectedIndex)
    ? [selectedIndex, ...remaining]
    : remaining;
}

export function getMediaUrl(source: string): string {
  if (!source.trim()) return '';
  try {
    const url = new URL(source);
    if (url.protocol !== 'https:') return '';
    if (url.hostname === 'www.dropbox.com' || url.hostname === 'dropbox.com') {
      // Use file content rather than the Dropbox preview page for audio and images.
      url.hostname = 'dl.dropboxusercontent.com';
      url.searchParams.delete('dl');
      url.searchParams.set('raw', '1');
    }
    return url.toString();
  } catch {
    return '';
  }
}
