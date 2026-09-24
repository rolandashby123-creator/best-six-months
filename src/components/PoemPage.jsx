export default function PoemPage({ page }) {
  return (
    <div className="page-inner poem-page">
      <div className="poem-mark">✦</div>
      <span className="poem-label">{page.label}</span>
      <h2>{page.title}</h2>
      <div className="poem-lines">
        {page.lines.map((line, index) => (
          <p
            key={`${line}-${index}`}
            className={!line ? 'poem-gap' : ''}
            style={{ '--delay': `${index * 65}ms` }}
          >
            {line || ' '}
          </p>
        ))}
      </div>
      <div className="poem-footer">with love, always</div>
    </div>
  );
}
