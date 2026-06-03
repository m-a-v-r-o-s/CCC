// Flat (non-wavy) SVG flags for the language switch.

const STRIPE = 20 / 13;

export function FlagUS({ className }: { className?: string }) {
  const stars: { cx: number; cy: number }[] = [];
  // simplified, evenly spaced star field within the canton
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 6; col++) {
      stars.push({ cx: 1.6 + col * 2.4, cy: 1.4 + row * 1.9 });
    }
  }
  return (
    <svg className={className} viewBox="0 0 38 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="38" height="20" fill="#B22234" />
      {[1, 3, 5, 7, 9, 11].map((i) => (
        <rect key={i} y={i * STRIPE} width="38" height={STRIPE} fill="#fff" />
      ))}
      <rect width="15.2" height={STRIPE * 7} fill="#3C3B6E" />
      {stars.map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy} r="0.55" fill="#fff" />
      ))}
    </svg>
  );
}

export function FlagGR({ className }: { className?: string }) {
  const blue = "#0D5EAF";
  return (
    <svg className={className} viewBox="0 0 27 18" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="27" height="18" fill={blue} />
      {[1, 3, 5, 7].map((i) => (
        <rect key={i} y={i * 2} width="27" height="2" fill="#fff" />
      ))}
      {/* blue canton with white cross */}
      <rect width="10" height="10" fill={blue} />
      <rect x="4" width="2" height="10" fill="#fff" />
      <rect y="4" width="10" height="2" fill="#fff" />
    </svg>
  );
}
