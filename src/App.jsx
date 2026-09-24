
import { useEffect, useMemo, useRef, useState } from 'react';
import { pages } from './data/letters';
import BookCover from './components/BookCover';
import LetterPage from './components/LetterPage';
import PoemPage from './components/PoemPage';
import Navigation from './components/Navigation';
import FloatingHearts from './components/FloatingHearts';
import BotanicalDecor from './components/BotanicalDecor';
import './styles/book.css';

const MUSIC_START_TIME = 1;
const MUSIC_VOLUME = 0.24;

const MUSIC_SRC =
  '/music/Brent%20Faiyaz%20-%20butterflies.%20%5BOfficial%20Visualizer%5D.mp3';

function App() {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState('next');
  const [musicPlaying, setMusicPlaying] = useState(false);

  const audioRef = useRef(null);
  const fadeTimerRef = useRef(null);
  const stopTimerRef = useRef(null);
  const autoplayAttemptedRef = useRef(false);

  const currentPage = pages[pageIndex];

  const setMusicPosition = () => {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      if (
        Number.isFinite(audio.duration) &&
        audio.duration > MUSIC_START_TIME
      ) {
        audio.currentTime = MUSIC_START_TIME;
      }
    } catch {
      // The audio metadata may not be ready yet.
      // onLoadedMetadata will call this again.
    }
  };

  const fadeMusicTo = (targetVolume, duration = 1500) => {
    const audio = audioRef.current;

    if (!audio) return;

    window.clearInterval(fadeTimerRef.current);

    const startVolume = audio.volume;
    const steps = 28;
    const stepTime = duration / steps;
    let step = 0;

    fadeTimerRef.current = window.setInterval(() => {
      step += 1;

      const progress = Math.min(step / steps, 1);

      audio.volume = Math.max(
        0,
        Math.min(
          1,
          startVolume + (targetVolume - startVolume) * progress
        )
      );

      if (progress >= 1) {
        window.clearInterval(fadeTimerRef.current);
        fadeTimerRef.current = null;
      }
    }, stepTime);
  };

  const startMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return false;

    window.clearTimeout(stopTimerRef.current);
    window.clearInterval(fadeTimerRef.current);

    // Always begin this song from 9 seconds.
    setMusicPosition();

    try {
      audio.volume = 0;

      await audio.play();

      setMusicPlaying(true);

      fadeMusicTo(MUSIC_VOLUME, 1800);

      return true;
    } catch (error) {
      console.warn(
        'The browser blocked automatic audio playback:',
        error
      );

      setMusicPlaying(false);

      return false;
    }
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      await startMusic();
      return;
    }

    window.clearInterval(fadeTimerRef.current);

    fadeMusicTo(0, 500);

    window.clearTimeout(stopTimerRef.current);

    stopTimerRef.current = window.setTimeout(() => {
      audio.pause();

      // When music is stopped, prepare it to start again at 9 seconds.
      audio.currentTime = MUSIC_START_TIME;
      audio.volume = MUSIC_VOLUME;

      setMusicPlaying(false);
    }, 520);
  };

  const openBook = () => {
    if (opening || opened) return;

    // The book-opening click is also a valid user interaction
    // for browsers that block automatic audio playback.
    startMusic();

    setOpening(true);

    window.setTimeout(() => {
      setOpened(true);
      setOpening(false);
    }, 620);
  };

  const progress = useMemo(
    () => ((pageIndex + 1) / pages.length) * 100,
    [pageIndex]
  );

  const goNext = () => {
    if (pageIndex < pages.length - 1) {
      setDirection('next');
      setPageIndex((value) => value + 1);
    }
  };

  const goPrevious = () => {
    if (pageIndex > 0) {
      setDirection('previous');
      setPageIndex((value) => value - 1);
    }
  };

  /*
   * Attempt automatic playback when the page first loads.
   */
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return undefined;

    if (!autoplayAttemptedRef.current) {
      autoplayAttemptedRef.current = true;

      startMusic();
    }

    /*
     * Some browsers block audible autoplay.
     * When that happens, the first click/touch/keypress
     * starts the music automatically.
     */
    const handleFirstInteraction = () => {
      if (!audio.paused) return;

      startMusic();
    };

    window.addEventListener(
      'pointerdown',
      handleFirstInteraction,
      { once: true }
    );

    window.addEventListener(
      'keydown',
      handleFirstInteraction,
      { once: true }
    );

    return () => {
      window.removeEventListener(
        'pointerdown',
        handleFirstInteraction
      );

      window.removeEventListener(
        'keydown',
        handleFirstInteraction
      );
    };
  }, []);

  useEffect(() => {
    const handleKey = (event) => {
      if (!opened) return;

      if (
        event.key === 'ArrowRight' ||
        event.key === ' '
      ) {
        event.preventDefault();
        goNext();
      }

      if (event.key === 'ArrowLeft') {
        goPrevious();
      }

      if (event.key === 'Escape') {
        setOpened(false);
      }
    };

    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  });

  useEffect(() => {
    return () => {
      window.clearInterval(fadeTimerRef.current);
      window.clearTimeout(stopTimerRef.current);
    };
  }, []);

  return (
    <main className="app-shell">
      <audio
        ref={audioRef}
        src={MUSIC_SRC}
        autoPlay
        loop
        preload="auto"
        aria-hidden="true"
        onLoadedMetadata={setMusicPosition}
        onError={(event) => {
          console.error(
            'Audio file failed to load:',
            event.currentTarget.error
          );
        }}
      />

      <FloatingHearts />
      <BotanicalDecor />

      <button
        className={`music-button ${
          musicPlaying
            ? 'music-button--playing'
            : ''
        }`}
        type="button"
        onClick={toggleMusic}
        aria-label={
          musicPlaying
            ? 'Pause romantic background music'
            : 'Play romantic background music'
        }
        aria-pressed={musicPlaying}
        title={
          musicPlaying
            ? 'Pause music'
            : 'Play music'
        }
      >
        <span
          className="music-button__disc"
          aria-hidden="true"
        >
          ♫
        </span>

        <span
          className="music-button__pulse"
          aria-hidden="true"
        />
      </button>

      {!opened ? (
        <BookCover
          onOpen={openBook}
          opening={opening}
        />
      ) : (
        <section
          className="reader"
          aria-label="Love letter book"
        >
          <header className="reader-header">
            <span className="eyebrow">
              A LITTLE BOOK OF WORDS
            </span>

            <span className="page-count">
              {String(pageIndex + 1).padStart(2, '0')} /{' '}
              {String(pages.length).padStart(2, '0')}
            </span>
          </header>

          <div
            className="progress-track"
            aria-hidden="true"
          >
            <span
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <div className="book-stage">
            <button
              className="edge-button edge-button--left"
              onClick={goPrevious}
              disabled={pageIndex === 0}
              aria-label="Previous page"
            >
              ‹
            </button>

            <article
              key={`${pageIndex}-${direction}`}
              className={`paper page-animation page-animation--${direction} ${
                pageIndex === pages.length - 1
                  ? 'paper--final'
                  : ''
              }`}
            >
              <div className="paper-shadow" />

              {currentPage.type === 'letter' ? (
                <LetterPage page={currentPage} />
              ) : (
                <PoemPage page={currentPage} />
              )}
            </article>

            <button
              className="edge-button edge-button--right"
              onClick={goNext}
              disabled={
                pageIndex === pages.length - 1
              }
              aria-label="Next page"
            >
              ›
            </button>
          </div>

          <Navigation
            pageIndex={pageIndex}
            pageCount={pages.length}
            onPrevious={goPrevious}
            onNext={goNext}
            onClose={() => setOpened(false)}
          />
        </section>
      )}
    </main>
  );
}

export default App;
