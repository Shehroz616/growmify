import { useRef } from 'react';

/**
 * SpotlightCard Component
 * Renders a card with a premium hover spotlight effect following the mouse cursor.
 * Uses hardware-accelerated CSS custom properties to prevent React re-renders.
 */
export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(7, 168, 197, 0.12)', // brand primary teal color
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
      className={`relative rounded-3xl overflow-hidden border bg-surface-container border-border-subtle group transition-all duration-300 hover:border-primary/30 ${className}`}
      style={{
        '--mouse-x': '0px',
        '--mouse-y': '0px',
      }}
    >
      {/* Background radial gradient overlay responding to CSS custom variables */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), ${spotlightColor}, transparent 80%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
