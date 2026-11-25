import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import {
  FiMusic,
  FiPause,
  FiPlay,
  FiRepeat,
  FiShuffle,
  FiSkipBack,
  FiSkipForward,
  FiSun,
} from 'react-icons/fi';
import { Button, PageMeta, Typography } from 'components';
import { Page } from 'modules';
import { Colors } from 'theme';
import songs from 'data/songs.json';
import { createShuffleOrder, getMediaUrl } from 'lib/music';

const PAGE_DESCRIPTION =
  'Explore the University-Student Union (U-SU) through songs inspired by its departments and created in collaboration with their staff.';

// Album order is intentional; keep the playlist and previous/next controls in sync.
const playlist = songs.map((song) => ({
  ...song,
  audioUrl: getMediaUrl(song.url),
  artworkUrl: getMediaUrl(song.artworkUrl),
}));
const albumOrder = playlist.flatMap((song, index) =>
  song.audioUrl ? [index] : [],
);
type RepeatMode = 'off' | 'all' | 'one';
const repeatLabels = {
  off: 'Repeat off',
  all: 'Repeat album',
  one: 'Repeat song',
};
const formatTime = (seconds: number) => {
  const wholeSeconds = Number.isFinite(seconds)
    ? Math.max(0, Math.floor(seconds))
    : 0;
  return `${Math.floor(wholeSeconds / 60)}:${String(wholeSeconds % 60).padStart(
    2,
    '0',
  )}`;
};

const MusicSection = styled.section<{ $ambiance: boolean }>`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: ${(p) =>
    p.$ambiance ? Colors.greyDarkest : Colors.greyLightest};
  transition: background-color 600ms ease;
  padding: clamp(24px, 5vw, 72px) 20px;
  min-height: 75vh;
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    /* Even a white cover stays dark enough for the white heading and copy. */
    background: rgba(0, 0, 0, 0.58);
    opacity: ${(p) => (p.$ambiance ? 1 : 0)};
    transition: opacity 600ms ease;
  }
  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &::after {
      transition: none;
    }
  }
  button,
  summary,
  input {
    &:focus-visible {
      outline: 3px solid ${Colors.blue};
      outline-offset: 4px;
    }
  }
`;
const AmbianceBackdrop = styled.div<{ $enabled: boolean }>`
  position: absolute;
  inset: -90px;
  z-index: 0;
  pointer-events: none;
  background-size: cover;
  background-position: center;
  filter: blur(72px) saturate(1.6);
  opacity: ${(p) => (p.$enabled ? 0.85 : 0)};
  transition: opacity 600ms ease;
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;
const MusicInner = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1120px;
  margin: 0 auto;
`;
const AlbumHeader = styled.header`
  border-top: 5px solid ${Colors.primary};
  padding-top: 24px;
  margin-bottom: 36px;
`;
const HeadingRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
`;
const AmbianceToggle = styled(Button)`
  && {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-height: 32px;
    padding: 6px 10px;
    font-size: 12px;
    line-height: 1.25;
    flex-shrink: 0;
  }
  &:hover:not(:disabled) {
    opacity: 1;
    background: ${Colors.primary};
    color: ${Colors.black};
  }
  &&[aria-pressed='true']:focus-visible {
    outline-color: ${Colors.white};
  }
  svg {
    display: block;
  }
`;
const PlayerGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
  gap: 32px;
  align-items: start;
  @media (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr);
    grid-auto-rows: 1fr;
  }
`;
const PlayerPanel = styled.section`
  padding: clamp(20px, 4vw, 36px);
  background: ${Colors.white};
  border: 1px solid ${Colors.greyLighter};
  border-radius: 16px;
  min-width: 0;
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 64px minmax(0, 1fr);
    column-gap: 16px;
    > p {
      grid-column: 1 / -1;
    }
  }
`;
const Artwork = styled.div`
  width: 100%;
  aspect-ratio: 1;
  background: ${Colors.greyDarkest};
  border-radius: 10px;
  display: grid;
  place-items: center;
  margin-bottom: 24px;
  overflow: hidden;
  svg {
    color: ${Colors.primary};
    width: 80px;
    height: 80px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  @media (max-width: 768px) {
    width: 64px;
    height: 64px;
    grid-column: 1;
    grid-row: 1;
    margin: 0;
    svg {
      width: 32px;
      height: 32px;
    }
  }
`;
const scrollTitle = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;
const TitleViewport = styled.h2`
  margin: 0;
  height: 1.4em;
  line-height: 1.4;
  font-size: 30px;
  font-weight: 700;
  overflow: hidden;
  white-space: nowrap;
  &:hover > div,
  &:focus-within > div {
    animation-play-state: paused;
  }
  &:focus-visible {
    outline: 3px solid ${Colors.blue};
    outline-offset: 4px;
  }
  @media (prefers-reduced-motion: reduce) {
    overflow-x: auto;
  }
  @media (max-width: 768px) {
    grid-column: 2;
    grid-row: 1;
    align-self: center;
    font-size: 22px;
  }
`;
const TitleTrack = styled.div<{ $scrolls: boolean; $duration: number }>`
  display: inline-flex;
  width: max-content;
  gap: 40px;
  padding-right: ${(p) => (p.$scrolls ? '40px' : '0')};
  animation-name: ${(p) => (p.$scrolls ? scrollTitle : 'none')};
  animation-duration: ${(p) => p.$duration}s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  &::after {
    content: ${(p) => (p.$scrolls ? 'attr(data-title)' : 'none')};
  }
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    padding-right: 0;
    &::after {
      display: none;
    }
  }
`;

function ScrollingSongTitle({ title }: { title: string }) {
  const viewportRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [overflowWidth, setOverflowWidth] = useState(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    const text = textRef.current;
    if (!viewport || !text || typeof ResizeObserver === 'undefined') return;
    const measure = () => {
      const width = text.getBoundingClientRect().width;
      setOverflowWidth(width > viewport.clientWidth + 1 ? width : 0);
    };
    // Observe both: responsive widths and downloaded fonts can change overflow.
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(text);
    return () => observer.disconnect();
  }, [title]);

  return (
    <TitleViewport
      ref={viewportRef}
      id="now-playing-title"
      aria-label={title}
      title={title}
      tabIndex={overflowWidth ? 0 : undefined}
    >
      <TitleTrack
        key={title}
        $scrolls={overflowWidth > 0}
        $duration={Math.max(10, (overflowWidth + 40) / 35)}
        data-title={title}
        aria-hidden="true"
      >
        <span ref={textRef}>{title}</span>
      </TitleTrack>
    </TitleViewport>
  );
}
const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(2px, 1vw, 12px);
  margin: 24px 0;
  @media (max-width: 768px) {
    grid-column: 1 / -1;
    margin: 16px 0 12px;
  }
`;
const ControlButton = styled(Button)`
  /* The shared text-button defaults can be injected later; keep icon sizing
     and centering authoritative without changing buttons on other pages. */
  && {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: clamp(44px, 4vw, 52px);
    height: clamp(44px, 4vw, 52px);
    min-width: 44px;
    min-height: 44px;
    flex-shrink: 0;
    padding: 0;
    line-height: 1;
  }
  svg {
    display: block;
    flex-shrink: 0;
  }
  &:hover:not(:disabled) {
    opacity: 1;
    background: ${Colors.primary};
    color: ${Colors.black};
  }
  &:disabled {
    cursor: not-allowed;
  }
  &[aria-pressed='true'] {
    background: ${Colors.primary};
    color: ${Colors.black};
    box-shadow: inset 0 -4px 0 ${Colors.black};
  }
`;
const RepeatBadge = styled.span`
  position: absolute;
  top: 2px;
  right: 5px;
  font-size: 12px;
  font-weight: 700;
`;
const SeekBar = styled.input`
  grid-column: 1 / -1;
  width: 100%;
  height: 32px;
  accent-color: ${Colors.black};
  cursor: pointer;
`;
const TimeRow = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  font-variant-numeric: tabular-nums;
  color: ${Colors.greyMid};
  font-size: 14px;
`;
const TrackList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const TrackButton = styled.button<{ $selected: boolean }>`
  width: 100%;
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr) 24px;
  gap: 12px;
  align-items: center;
  text-align: left;
  padding: 18px 12px;
  min-height: 64px;
  font: inherit;
  font-weight: ${(p) => (p.$selected ? 700 : 400)};
  color: ${Colors.black};
  border: 0;
  border-bottom: 1px solid ${Colors.greyLighter};
  background: ${(p) => (p.$selected ? Colors.primary : Colors.transparent)};
  cursor: pointer;
  &:hover {
    background: ${Colors.primary};
  }
  span {
    overflow-wrap: anywhere;
  }
`;
const TrackRow = styled.li<{ $selected: boolean }>`
  background: ${(p) => (p.$selected ? Colors.primary : Colors.transparent)};
`;
const AlbumReader = styled.section`
  /* Let the player alone size the grid rows, then fill that height.
     Containment prevents a long track list or lyrics from stretching it. */
  contain: size;
  align-self: stretch;
  min-height: 0;
  min-width: 0;
  padding: 24px;
  background: ${Colors.white};
  border: 1px solid ${Colors.greyLighter};
  border-radius: 16px;
  .react-tabs {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .react-tabs__tab-list {
    display: flex;
    flex-shrink: 0;
    gap: 16px;
    list-style: none;
    padding: 0;
    margin: 0 0 24px;
    border-bottom: 1px solid ${Colors.greyLighter};
  }
  .react-tabs__tab {
    padding: 12px 16px;
    font-size: 22px;
    font-weight: 700;
    border-bottom: 4px solid transparent;
    cursor: pointer;
    &[aria-selected='true'] {
      border-bottom-color: ${Colors.primary};
    }
    &:hover {
      background: ${Colors.primary};
      color: ${Colors.black};
    }
    &:focus-visible {
      outline: 3px solid ${Colors.blue};
      outline-offset: -3px;
    }
  }
  /* Keep both panels rendered for indexing; the matched reading area prevents a
     tab switch or a longer song's lyrics from moving the rest of the page. */
  .react-tabs__tab-panel {
    display: none;
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    scrollbar-gutter: stable;
    &:focus-visible {
      outline: 3px solid ${Colors.blue};
      outline-offset: -3px;
    }
  }
  .react-tabs__tab-panel--selected {
    display: block;
  }
  [data-lyrics] {
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    font-size: 18px;
    line-height: 1.9;
  }
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export default function Music() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playRequest = useRef(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [playbackOrder, setPlaybackOrder] = useState(albumOrder);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>('off');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState('');
  const [failedArtwork, setFailedArtwork] = useState('');
  const [isAmbianceOn, setIsAmbianceOn] = useState(true);
  const song = playlist[selectedIndex];
  const queuePosition = playbackOrder.indexOf(selectedIndex);
  const canGoBack =
    queuePosition > 0 || (repeatMode === 'all' && playbackOrder.length > 0);
  const canGoForward =
    queuePosition < playbackOrder.length - 1 ||
    (repeatMode === 'all' && playbackOrder.length > 0);
  const imageUrl = song.artworkUrl;
  const ambianceArtworkUrl = imageUrl !== failedArtwork ? imageUrl : '';

  useEffect(() => {
    // Warm the browser cache so switching tracks need not wait for its cover.
    playlist.forEach((track) => {
      if (!track.artworkUrl) return;
      const image = new window.Image();
      image.src = track.artworkUrl;
    });
  }, []);

  async function playSong(index: number) {
    const audio = audioRef.current;
    const selectedSong = playlist[index];
    if (!audio) return;
    const request = ++playRequest.current;
    setError('');
    if (
      index !== selectedIndex ||
      audio.getAttribute('src') !== selectedSong.audioUrl
    ) {
      audio.pause();
      setSelectedIndex(index);
      setCurrentTime(0);
      setDuration(0);
      if (selectedSong.audioUrl) audio.src = selectedSong.audioUrl;
      else audio.removeAttribute('src');
      audio.load();
    }
    if (!selectedSong.audioUrl) {
      setIsLoading(false);
      setError('This song is not available yet.');
      return;
    }
    setIsLoading(true);
    try {
      await audio.play();
      if (request === playRequest.current) setIsLoading(false);
    } catch {
      if (request !== playRequest.current) return;
      setIsLoading(false);
      setError(
        'Unable to play this song. Please try again or select another track.',
      );
    }
  }

  function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused || isLoading) {
      ++playRequest.current;
      audio.pause();
      setIsLoading(false);
    } else {
      void playSong(selectedIndex);
    }
  }

  function skipSong(direction: -1 | 1) {
    if (!playbackOrder.length) return;
    const nextPosition = queuePosition + direction;
    if (
      repeatMode !== 'all' &&
      (nextPosition < 0 || nextPosition >= playbackOrder.length)
    )
      return;
    const nextIndex =
      playbackOrder[
        (nextPosition + playbackOrder.length) % playbackOrder.length
      ];
    if (nextIndex === selectedIndex && audioRef.current)
      audioRef.current.currentTime = 0;
    void playSong(nextIndex);
  }

  function toggleShuffle() {
    setPlaybackOrder(
      shuffle ? albumOrder : createShuffleOrder(albumOrder, selectedIndex),
    );
    setShuffle(!shuffle);
  }

  function cycleRepeat() {
    setRepeatMode(
      repeatMode === 'off' ? 'all' : repeatMode === 'all' ? 'one' : 'off',
    );
  }

  return (
    <Page>
      <PageMeta
        title="mU-SUsic | Graffix"
        description={PAGE_DESCRIPTION}
        path="/graffix/web-team/music"
      />
      <MusicSection $ambiance={isAmbianceOn} aria-labelledby="music-title">
        <AmbianceBackdrop
          aria-hidden="true"
          $enabled={isAmbianceOn && !!ambianceArtworkUrl}
          style={{
            backgroundImage: ambianceArtworkUrl
              ? `url(${JSON.stringify(ambianceArtworkUrl)})`
              : 'none',
          }}
        />
        <MusicInner>
          <AlbumHeader>
            <HeadingRow>
              <Typography
                as="h1"
                id="music-title"
                variant="pageHeader"
                margin="0"
                color={isAmbianceOn ? 'white' : 'black'}
              >
                mU-SUsic
              </Typography>
              <AmbianceToggle
                type="button"
                variant={isAmbianceOn ? 'primary' : 'outline'}
                aria-label="Ambiance mode"
                aria-pressed={isAmbianceOn}
                title={isAmbianceOn ? 'Turn ambiance off' : 'Turn ambiance on'}
                onClick={() => setIsAmbianceOn(!isAmbianceOn)}
              >
                <FiSun aria-hidden="true" size={16} />
                Ambiance
              </AmbianceToggle>
            </HeadingRow>
            <Typography
              variant="copy"
              lineHeight="1.7"
              style={{ maxWidth: '68ch' }}
              color={isAmbianceOn ? 'white' : 'black'}
            >
              {PAGE_DESCRIPTION}
            </Typography>
          </AlbumHeader>
          <PlayerGrid>
            <PlayerPanel aria-labelledby="now-playing-title">
              <Artwork>
                {imageUrl && failedArtwork !== imageUrl ? (
                  // Dropbox already serves optimized WebP files; use their direct URLs.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imageUrl}
                    alt={`Artwork for ${song.title}`}
                    onError={() => setFailedArtwork(imageUrl)}
                  />
                ) : (
                  <FiMusic aria-label="Album artwork unavailable" role="img" />
                )}
              </Artwork>
              <ScrollingSongTitle title={song.title} />
              <Controls>
                <ControlButton
                  variant="outline"
                  aria-label="Shuffle"
                  title={shuffle ? 'Shuffle on' : 'Shuffle off'}
                  aria-pressed={shuffle}
                  onClick={toggleShuffle}
                >
                  <FiShuffle aria-hidden="true" size={20} />
                </ControlButton>
                <ControlButton
                  variant="outline"
                  aria-label="Previous song"
                  disabled={!canGoBack}
                  onClick={() => skipSong(-1)}
                >
                  <FiSkipBack aria-hidden="true" size={22} />
                </ControlButton>
                <ControlButton
                  aria-label={isPlaying || isLoading ? 'Pause' : 'Play'}
                  disabled={!song.audioUrl}
                  onClick={togglePlayback}
                >
                  <>
                    {isPlaying || isLoading ? (
                      <FiPause aria-hidden="true" size={26} />
                    ) : (
                      <FiPlay aria-hidden="true" size={26} />
                    )}
                  </>
                </ControlButton>
                <ControlButton
                  variant="outline"
                  aria-label="Next song"
                  disabled={!canGoForward}
                  onClick={() => skipSong(1)}
                >
                  <FiSkipForward aria-hidden="true" size={22} />
                </ControlButton>
                <ControlButton
                  variant="outline"
                  aria-label={`${
                    repeatLabels[repeatMode]
                  }. Switch to ${repeatLabels[
                    repeatMode === 'off'
                      ? 'all'
                      : repeatMode === 'all'
                      ? 'one'
                      : 'off'
                  ].toLowerCase()}`}
                  title={repeatLabels[repeatMode]}
                  aria-pressed={repeatMode !== 'off'}
                  onClick={cycleRepeat}
                >
                  <FiRepeat aria-hidden="true" size={20} />
                  {repeatMode === 'one' && (
                    <RepeatBadge aria-hidden="true">1</RepeatBadge>
                  )}
                </ControlButton>
              </Controls>
              <SeekBar
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={Math.min(currentTime, duration)}
                disabled={!duration}
                aria-label="Song position"
                aria-valuetext={`${formatTime(currentTime)} of ${formatTime(
                  duration,
                )}`}
                onChange={(event) => {
                  const seconds = Number(event.target.value);
                  if (audioRef.current && duration) {
                    audioRef.current.currentTime = seconds;
                    setCurrentTime(seconds);
                  }
                }}
              />
              <TimeRow aria-hidden="true">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </TimeRow>
              <p role="status">{error || (isLoading ? 'Loading song…' : '')}</p>
              {/* Lyrics live in the adjacent tab panel; audio starts only on interaction. */}
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <audio
                ref={audioRef}
                preload="none"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onPlaying={() => setIsLoading(false)}
                onWaiting={() => setIsLoading(true)}
                onLoadedMetadata={(event) =>
                  setDuration(
                    Number.isFinite(event.currentTarget.duration)
                      ? event.currentTarget.duration
                      : 0,
                  )
                }
                onDurationChange={(event) =>
                  setDuration(
                    Number.isFinite(event.currentTarget.duration)
                      ? event.currentTarget.duration
                      : 0,
                  )
                }
                onTimeUpdate={(event) =>
                  setCurrentTime(event.currentTarget.currentTime)
                }
                onEnded={() => {
                  setIsPlaying(false);
                  setIsLoading(false);
                  if (repeatMode === 'one') {
                    if (audioRef.current) audioRef.current.currentTime = 0;
                    void playSong(selectedIndex);
                  } else {
                    skipSong(1);
                  }
                }}
                onError={() => {
                  ++playRequest.current;
                  setIsPlaying(false);
                  setIsLoading(false);
                  setError(
                    'Unable to load this song. Please try again or select another track.',
                  );
                }}
              />
            </PlayerPanel>
            <AlbumReader aria-label="Album tracks and lyrics">
              <Tabs forceRenderTabPanel>
                <TabList aria-label="Album content">
                  <Tab>Tracks</Tab>
                  <Tab>Lyrics</Tab>
                </TabList>
                <TabPanel>
                  <TrackList aria-label="Album tracks">
                    {playlist.map((track, index) => (
                      <TrackRow
                        key={track.id}
                        $selected={index === selectedIndex}
                      >
                        <TrackButton
                          type="button"
                          $selected={index === selectedIndex}
                          aria-current={
                            index === selectedIndex ? 'true' : undefined
                          }
                          aria-label={`${
                            index === selectedIndex && isPlaying
                              ? 'Pause'
                              : 'Play'
                          } ${track.title}`}
                          onClick={() =>
                            index === selectedIndex
                              ? togglePlayback()
                              : void playSong(index)
                          }
                        >
                          <span aria-hidden="true">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span>{track.title}</span>
                          {index === selectedIndex && isPlaying ? (
                            <FiPause aria-hidden="true" />
                          ) : (
                            <FiPlay aria-hidden="true" />
                          )}
                        </TrackButton>
                      </TrackRow>
                    ))}
                  </TrackList>
                </TabPanel>
                <TabPanel>
                  {playlist.map((track, index) => (
                    <article key={track.id} hidden={index !== selectedIndex}>
                      <Typography
                        as="h2"
                        variant="title"
                        size="xl"
                        margin="0 0 24px"
                      >
                        {track.title}
                      </Typography>
                      <p data-lyrics>{track.lyrics || 'Lyrics coming soon.'}</p>
                    </article>
                  ))}
                </TabPanel>
              </Tabs>
            </AlbumReader>
          </PlayerGrid>
        </MusicInner>
      </MusicSection>
    </Page>
  );
}
