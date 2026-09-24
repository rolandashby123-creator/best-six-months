const hearts = ['♡', '✦', '·', '♡', '✧', '·', '♡', '✦', '♡', '·'];

export default function FloatingHearts() {
  return (
    <div className="floating-hearts" aria-hidden="true">
      {hearts.map((heart, index) => (
        <span key={index} style={{ '--i': index }}>{heart}</span>
      ))}
    </div>
  );
}
