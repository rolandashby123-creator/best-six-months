const petals = Array.from({ length: 18 }, (_, index) => index);

function Flower({ className = '' }) {
  return (
    <svg className={`flower ${className}`} viewBox="0 0 120 120" aria-hidden="true">
      <g className="flower-bloom">
        <ellipse cx="60" cy="31" rx="17" ry="29" />
        <ellipse cx="89" cy="48" rx="17" ry="29" transform="rotate(72 89 48)" />
        <ellipse cx="78" cy="80" rx="17" ry="29" transform="rotate(144 78 80)" />
        <ellipse cx="43" cy="80" rx="17" ry="29" transform="rotate(216 43 80)" />
        <ellipse cx="31" cy="48" rx="17" ry="29" transform="rotate(288 31 48)" />
        <circle cx="60" cy="60" r="13" className="flower-center" />
      </g>
      <path className="flower-stem" d="M60 74 C57 89 55 103 58 119" />
      <path className="flower-leaf" d="M57 92 C41 85 31 89 25 99 C39 101 50 98 57 92Z" />
    </svg>
  );
}

function Butterfly() {
  return (
    <div className="butterfly" aria-hidden="true">
      <svg viewBox="0 0 180 130">
        <g className="butterfly-wing butterfly-wing--left">
          <path d="M87 60 C55 9 13 16 18 55 C22 79 48 85 83 78Z" />
          <path d="M82 76 C46 73 29 88 39 105 C50 121 72 106 89 84Z" />
        </g>
        <g className="butterfly-wing butterfly-wing--right">
          <path d="M93 60 C125 9 167 16 162 55 C158 79 132 85 97 78Z" />
          <path d="M98 76 C134 73 151 88 141 105 C130 121 108 106 91 84Z" />
        </g>
        <path className="butterfly-body" d="M90 45 C84 56 84 74 90 87 C96 74 96 56 90 45Z" />
        <path className="butterfly-antenna" d="M88 49 C79 36 71 32 62 32 M92 49 C101 36 109 32 118 32" />
        <circle cx="90" cy="48" r="5" className="butterfly-head" />
      </svg>
    </div>
  );
}

export default function BotanicalDecor() {
  return (
    <div className="botanical-decor" aria-hidden="true">
      <div className="petal-field">
        {petals.map((index) => (
          <span
            key={index}
            className="falling-petal"
            style={{
              '--petal-left': `${(index * 17) % 100}%`,
              '--petal-delay': `${-index * 0.9}s`,
              '--petal-duration': `${10 + (index % 6)}s`,
              '--petal-size': `${5 + (index % 4)}px`,
              '--petal-drift': `${(index % 2 ? 1 : -1) * (18 + (index % 5) * 7)}px`,
            }}
          />
        ))}
      </div>

      <Butterfly />

      <div className="flower-cluster flower-cluster--left">
        <Flower className="flower--one" />
        <Flower className="flower--two" />
      </div>
      <div className="flower-cluster flower-cluster--right">
        <Flower className="flower--one" />
        <Flower className="flower--two" />
      </div>

      <div className="botanical-glow botanical-glow--one" />
      <div className="botanical-glow botanical-glow--two" />
    </div>
  );
}
