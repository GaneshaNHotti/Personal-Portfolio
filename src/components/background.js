"use client";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">

      {/* Film grain / noise texture */}
      <div className="absolute inset-0 bg-noise" />

      {/* Subtle dot grid */}
      <div className="absolute inset-0 bg-dot-grid opacity-[0.08]" />

      {/* Single indigo spotlight from top */}
      <div className="bg-spotlight" />

      {/* Animated glowing line at the very top */}
      <div className="bg-top-line" />

    </div>
  );
}
