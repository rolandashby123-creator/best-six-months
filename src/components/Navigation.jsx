export default function Navigation({ pageIndex, pageCount, onPrevious, onNext, onClose }) {
  return (
    <nav className="navigation" aria-label="Book navigation">
      <button onClick={onPrevious} disabled={pageIndex === 0}>← <span>Previous</span></button>
      <button className="close-book" onClick={onClose}>Close book</button>
      <button onClick={onNext} disabled={pageIndex === pageCount - 1}><span>Next</span> →</button>
    </nav>
  );
}
