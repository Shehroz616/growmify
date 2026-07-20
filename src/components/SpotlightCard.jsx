import { useRef } from 'react';

/**
 * SpotlightCard Component
 * Renders a card with a premium hover spotlight effect following the mouse cursor.
 * Uses hardware-accelerated CSS custom properties to prevent React re-renders.
 */
export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(0, 227, 186, 0.14)', // brand primary teal color (#00E3B6)
}) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`relative rounded-3xl overflow-hidden border bg-surface-container border-border-subtle group transition-all duration-500 hover:border-primary/40 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(0,227,186,0.15)] ${className}`}
      style={{
        '--mouse-x': '0px',
        '--mouse-y': '0px',
      }}
    >
      {/* Background radial gradient overlay responding to CSS custom variables */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), ${spotlightColor}, transparent 80%)`,
        }}
      />

      {/* Ambient background glow orb on hover */}
      <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-primary/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

