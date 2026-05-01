"use client";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Dot grid overlay */}
      <div className="absolute inset-0 bg-dot-grid opacity-[0.18]" />

      {/* Radial vignette to keep edges dark */}
      <div className="absolute inset-0 bg-radial-vignette" />

      {/* Orb 1 — purple, top-left */}
      <div className="orb orb-purple" />

      {/* Orb 2 — cyan/teal, top-right */}
      <div className="orb orb-cyan" />

      {/* Orb 3 — indigo, center */}
      <div className="orb orb-indigo" />

      {/* Orb 4 — rose, bottom-right */}
      <div className="orb orb-rose" />

      {/* Floating particles */}
      {Array.from({ length: 24 }).map((_, i) => (
        <span key={i} className="particle" style={{
          left: `${(i * 37 + 11) % 100}%`,
          top: `${(i * 53 + 7) % 100}%`,
          animationDelay: `${(i * 0.6) % 8}s`,
          animationDuration: `${6 + (i % 5)}s`,
          width: i % 3 === 0 ? "2px" : "1.5px",
          height: i % 3 === 0 ? "2px" : "1.5px",
          opacity: 0.3 + (i % 4) * 0.1,
        }} />
      ))}
    </div>
  );
}
