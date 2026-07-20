import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ChevronDown } from 'lucide-react';
import useAppStore from '../store/useAppStore';
import Lightfall from '../components/Lightfall';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero() {
  const sectionRef = useRef(null);
  const tagRef = useRef(null);
  const h1Ref = useRef(null);
  const bgTextRef = useRef(null);
  const { isLoaded, commandInput, setCommandInput } = useAppStore();

  useGSAP(() => {
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

    // Scale up, fade out, and cinematic blur on scroll for headline text
    gsap.to(h1Ref.current, {
      scale: 1.4,
      opacity: 0,
      filter: 'blur(8px)',
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom 35%',
        scrub: true,
      },
    });
  }, { dependencies: [isLoaded], scope: sectionRef });

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

        {/* Scroll hint */}
        <div className="mt-14 flex flex-col items-center gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-on-surface/80 font-medium">
            Scroll to explore
          </span>
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-9 h-9  flex items-center justify-center text-primary  animate-bounce">
              <ChevronDown className="w-5 h-5 text-primary stroke-[2.5]" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
