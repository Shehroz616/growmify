import { useRef, useState } from 'react';

/**
 * TiltedCard Component
 * Implements a 3D interactive card that tilts on hover based on mouse coordinates.
 * Supports preserve-3d layers (using translateZ) and displays a glowing glare overlay.
 */
export default function TiltedCard({
  children,
  className = '',
  maxTilt = 12,
  perspective = 1000,
  scale = 1.03,
}) {
  const cardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate normalized mouse coordinates from -0.5 to 0.5 relative to the center
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    // Determine tilt angles based on mouse position
    const rotateX = -mouseY * maxTilt;
    const rotateY = mouseX * maxTilt;

    setTiltStyle({
      transform: `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`,
    });

    // Update dynamic CSS variables for custom gradient glare effect
    const glareX = ((e.clientX - rect.left) / width) * 100;
    const glareY = ((e.clientY - rect.top) / height) * 100;
    card.style.setProperty('--glare-x', `${glareX}%`);
    card.style.setProperty('--glare-y', `${glareY}%`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl overflow-hidden border bg-surface-container backdrop-blur-md border-border-subtle group transition-all duration-300 hover:border-primary/40 hover:shadow-[0_20px_50px_rgba(7,168,197,0.15)] ${className}`}
      style={{
        ...tiltStyle,
        transformStyle: 'preserve-3d',
        transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s, box-shadow 0.3s',
      }}
    >
      {/* 3D Glassmorphism glare sheen overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 z-30"
        style={{
          background: 'radial-gradient(circle 280px at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255, 255, 255, 0.25), transparent 85%)',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Underlay glow behind the content */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-0"
        style={{
          background: 'radial-gradient(circle 350px at var(--glare-x, 50%) var(--glare-y, 50%), rgba(7, 168, 197, 0.15), transparent 80%)',
        }}
      />

      {/* Internal wrapper that passes down the preserve-3d property */}
      <div className="relative z-10 h-full w-full" style={{ transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </div>
  );
}
