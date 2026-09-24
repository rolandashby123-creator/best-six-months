export default function BookCover({ onOpen, opening }) {
  return (
    <section className="cover-screen">
      <div className={`cover-book ${opening ? 'cover-book--opening' : ''}`} role="button" tabIndex={0} onClick={onOpen} onKeyDown={(e) => e.key === 'Enter' && onOpen()}>
        <div className="cover-ribbon">FOR YOU</div>
        <div className="cover-floral" aria-hidden="true">
          <span className="cover-sprig cover-sprig--left">❧</span>
          <span className="cover-mini-flower cover-mini-flower--one">✿</span>
          <span className="cover-mini-flower cover-mini-flower--two">✽</span>
          <span className="cover-sprig cover-sprig--right">❧</span>
        </div>
        <div className="cover-content">
          <span className="cover-small">A LITTLE BOOK OF</span>
          <h1>Letters<br /><em>&amp; Poems</em></h1>
          <div className="cover-heart">♡</div>
          <p>Six Months i would not trade for anything else..</p>
        </div>
        <div className="cover-corner cover-corner--top" />
        <div className="cover-corner cover-corner--bottom" />
      </div>
      <button className="open-button" onClick={onOpen}>Open the book <span>→</span></button>
      <p className="hint">Click the cover, or press Enter</p>
    </section>
  );
}
