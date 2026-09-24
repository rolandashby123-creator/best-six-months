export default function LetterPage({ page }) {
  return (
    <div className="page-inner letter-page">
      <div className="paper-decoration paper-decoration--flower">✿</div>
      <div className="page-topline">
        <span>{page.label}</span>
        <span>♡</span>
      </div>
      <h2>{page.title}</h2>
      <p className="letter-date">{page.date}</p>
      <div className="letter-body">
        {page.body.map((paragraph, index) => (
          <p key={paragraph} style={{ '--delay': `${index * 90}ms` }}>{paragraph}</p>
        ))}
      </div>
      <div className="signature">
        <span>{page.signoff}</span>
        <strong>{page.signature}</strong>
      </div>
    </div>
  );
}
