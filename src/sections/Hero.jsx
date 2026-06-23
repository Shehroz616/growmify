import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import useAppStore from '../store/useAppStore';
import Lightfall from '../components/Lightfall';

export default function Hero() {
  const sectionRef = useRef(null);
  const tagRef = useRef(null);
  const h1Ref = useRef(null);
  const cmdRef = useRef(null);
  const bgTextRef = useRef(null);
  const { isLoaded, commandInput, setCommandInput } = useAppStore();

  useEffect(() => {
    if (!isLoaded) return;

    const tl = gsap.timeline({ delay: 0.2 });

    tl.from(tagRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
    })
      .from(
        h1Ref.current.children,
        {
          y: 80,
          opacity: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: 'expo.out',
        },
        '-=0.3'
      )
      .from(
        cmdRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
        },
        '-=0.4'
      );

    // Parallax bg text on scroll
    gsap.to(bgTextRef.current, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => tl.kill();
  }, [isLoaded]);

  return (
    <header
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 px-8 z-10 overflow-hidden"
    >
      <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: -1 }}>
        <Lightfall
          colors={['#4ae176', '#4fdbc8', '#84dc54']}
          backgroundColor="#00000000"
          speed={0.5}
          streakCount={2}
          streakWidth={1}
          streakLength={1}
          glow={0.1}
          density={1}
          twinkle={0.85}
          zoom={3}
          backgroundGlow={0.1}
          opacity={0.5}
          mouseInteraction
          mouseStrength={0.5}
          mouseRadius={1}
          color1="#4ae176"
          color2="#4fdbc8"
          color3="#84dc54"
        />
      </div>
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      {/* Background marquee text */}
      <div
        ref={bgTextRef}
        className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex items-center opacity-[0.2] pointer-events-none overflow-hidden"
      >
        {/* <div className="marquee-container w-full h-full">
          <div className="marquee-content font-jakarta">
            <span className="marquee-item">GROWMIFY</span>
            <span className="marquee-item">GROWMIFY</span>
            <span className="marquee-item">GROWMIFY</span>
            <span className="marquee-item">GROWMIFY</span>
          </div>
        </div> */}
      </div>

      <div className="text-center max-w-5xl relative z-10">
        {/* Tag */}
        <p
          ref={tagRef}
          className="font-mono text-xs text-primary mb-6 tracking-[0.3em] uppercase"
        >
          GROW WITH US
        </p>

        {/* Headline — split into spans for stagger */}
        <h1
          ref={h1Ref}
          className="font-jakarta font-black tracking-tighter mb-10 mix-blend-plus-lighter"
        >
          <span className="block text-[clamp(48px,9vw,110px)] leading-[0.92] text-on-surface">
            ACCELERATING
          </span>
          <span className="block text-[clamp(48px,9vw,110px)] leading-[0.92] text-transparent bg-clip-text bg-gradient-to-r from-primary  to-secondary">
            GROWTH
          </span>
        </h1>

        {/* Command palette input */}
        <div
          ref={cmdRef}
          className="command-input max-w-2xl mx-auto glass p-1 rounded-2xl flex items-center shadow-2xl transition-all duration-300"
        >
          <div className="flex-1 flex items-center px-4 py-3">
            <span className="mr-3 text-text-muted">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </span>
            <input
              className="bg-transparent border-none outline-none w-full font-mono text-sm text-on-surface placeholder:text-text-muted/50"
              placeholder="npx growmify build --fast"
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
            />
          </div>
          <div className="hidden sm:flex items-center px-4 text-xs font-mono text-text-muted gap-2 border-l border-border-subtle">
            <span className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10">⌘</span>
            <span className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10">K</span>
          </div>
          <button className="bg-white text-black font-bold px-6 py-3 rounded-xl ml-2 hover:bg-primary hover:text-white transition-all duration-300 text-sm">
            Quick Start
          </button>
        </div>

        {/* Scroll hint */}
        <div className="mt-16 flex flex-col items-center gap-2 opacity-60 animate-float">
          <span className="font-mono text-[10px] uppercase tracking-widest text-white">
            Scroll to explore
          </span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </div>
    </header>
  );
}
