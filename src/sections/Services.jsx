import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function BentoCard({ children, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export default function Services() {
  const headingRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      {
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
        },
      }
    );
  }, []);

  return (
    <section className="w-full py-32 px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div
        ref={headingRef}
        className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
      >
        <div>
          <h2 className="font-jakarta font-extrabold text-[clamp(36px,5vw,56px)] tracking-tight text-on-surface leading-none">
            Expertise Stack
          </h2>
          <p className="text-text-muted text-lg max-w-md mt-4 font-jakarta">
            Uncommon engineering for elite teams. High-fidelity systems built with precision.
          </p>
        </div>
        <div className="font-mono text-xs text-primary border border-primary/20 px-4 py-2 rounded-full bg-primary/5 shrink-0">
          001 / SERVICES
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Web Architectures — large */}
        <BentoCard className="md:col-span-8 group relative overflow-hidden rounded-3xl bg-surface-container border border-border-subtle hover:border-primary/50 transition-all duration-500 min-h-[380px]">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="p-8 relative h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                  </svg>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-tighter px-2 py-1 bg-primary/10 rounded text-primary border border-primary/20">
                  Elite Tier
                </span>
              </div>
              <h3 className="font-jakarta font-bold text-4xl text-on-surface mb-4">
                Web Architectures
              </h3>
              <p className="text-text-muted max-w-lg font-jakarta">
                Next.js performance optimization, complex state management, and high-conversion
                landing experiences that feel like native apps.
              </p>
            </div>
            <div className="flex gap-3 mt-8 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
              {['Typescript', 'Tailwind', 'Motion'].map((t) => (
                <span key={t} className="font-mono text-xs px-4 py-2 border border-border-subtle rounded-full text-on-surface-variant">
                  {t}
                </span>
              ))}
            </div>
          </div>
          {/* Orb */}
          <div className="absolute right-0 bottom-0 w-72 h-72 opacity-0 group-hover:opacity-100 transition-all duration-1000 transform translate-x-24 translate-y-24 group-hover:translate-x-0 group-hover:translate-y-0 pointer-events-none">
            <div className="w-full h-full bg-primary rounded-full blur-[100px]" />
          </div>
        </BentoCard>

        {/* Android */}
        <BentoCard className="md:col-span-4 group relative overflow-hidden rounded-3xl bg-surface-container-high border border-border-subtle hover:border-secondary/50 transition-all duration-500">
          <div className="p-8 flex flex-col h-full min-h-[380px]">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
              <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.523 15.341c-.297 0-.54-.243-.54-.54V9.196c0-.297.243-.54.54-.54.298 0 .54.243.54.54v5.605c0 .297-.242.54-.54.54zm-11.046 0c-.297 0-.54-.243-.54-.54V9.196c0-.297.243-.54.54-.54.298 0 .54.243.54.54v5.605c0 .297-.242.54-.54.54zm2.5 2.999c0 .297-.242.54-.54.54H7.9c-.297 0-.54-.243-.54-.54v-5.65c0-.297.243-.54.54-.54s.54.243.54.54v5.65zm7.069 0c0 .297-.242.54-.54.54s-.54-.243-.54-.54v-5.65c0-.297.243-.54.54-.54s.54.243.54.54v5.65zm-.93-11.43 1.24-2.149a.27.27 0 00-.467-.27l-1.256 2.175A7.6 7.6 0 0012 6c-.92 0-1.797.165-2.616.466L8.128 4.291a.27.27 0 00-.467.27l1.24 2.15A7.572 7.572 0 004.5 12.5h15c0-2.24-.975-4.248-2.514-5.59z" />
              </svg>
            </div>
            <h3 className="font-jakarta font-bold text-3xl text-on-surface mb-3">
              Android Ecosystem
            </h3>
            <p className="text-text-muted font-jakarta">
              Seamless native performance for high-growth mobile products. Jetpack Compose and
              Kotlin Multiplatform mastery.
            </p>
            <div className="mt-auto pt-10">
              <div className="w-full h-1 bg-border-subtle rounded-full overflow-hidden">
                <div className="h-full bg-secondary rounded-full" style={{ width: '92%' }} />
              </div>
              <div className="flex justify-between mt-2 font-mono text-[10px] text-text-muted uppercase">
                <span>System Integrity</span>
                <span>92%</span>
              </div>
            </div>
          </div>
        </BentoCard>

        {/* Lighthouse card */}
        <BentoCard className="md:col-span-4 glass rounded-3xl p-8 flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
            <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h4 className="font-jakarta font-bold text-xl text-on-surface mb-2">Lighthouse Perfect</h4>
          <p className="text-text-muted text-sm px-4 font-jakarta">
            Core Web Vitals are not optional. We ship 100/100 performance scores on every build.
          </p>
          {/* Score rings */}
          <div className="mt-6 flex gap-3">
            {[100, 100, 100, 98].map((score, i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-secondary flex items-center justify-center">
                <span className="font-mono text-[9px] text-secondary font-bold">{score}</span>
              </div>
            ))}
          </div>
        </BentoCard>

        {/* Devouring Details sign-in */}
        <BentoCard className="md:col-span-8 bg-background-deep rounded-3xl border border-border-subtle relative overflow-hidden p-8 flex items-center justify-center group min-h-[300px]">
          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="relative z-10 w-full max-w-sm glass p-8 rounded-2xl">
            <div className="flex items-center justify-between mb-8">
              <span className="text-on-surface/50 font-mono text-xs">LOGIN.CLI</span>
              <div className="w-5 h-5 text-primary">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase font-mono text-text-muted ml-1 block mb-1">
                  Identity
                </label>
                <input
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-mono text-sm text-on-surface outline-none"
                  readOnly
                  defaultValue="yo@growmify.dev"
                />
              </div>
              <button className="w-full bg-primary py-3 rounded-lg text-on-primary font-bold flex items-center justify-center gap-2 group-hover:gap-4 transition-all duration-300 font-jakarta">
                Initiate Growth
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </BentoCard>
      </div>
      </div>
    </section>
  );
}
