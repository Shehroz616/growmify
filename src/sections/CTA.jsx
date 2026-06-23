import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const btnRef = useRef(null);
  const leftHandRef = useRef(null);
  const rightHandRef = useRef(null);
  const orbRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    });

    tl.fromTo(
      headingRef.current.children,
      {
        y: 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.9,
        ease: 'expo.out',
      }
    )
      .fromTo(
        btnRef.current.children,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.4'
      )
      .fromTo(
        leftHandRef.current,
        {
          x: -80,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'expo.out',
        },
        '-=0.5'
      )
      .fromTo(
        rightHandRef.current,
        {
          x: 80,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'expo.out',
        },
        '<'
      );

    // Orb pulse
    gsap.to(orbRef.current, {
      scale: 1.3,
      opacity: 0.6,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });

    return () => tl.kill();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-8 relative overflow-hidden">
      {/* Background teal glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <p className="font-mono text-xs text-secondary uppercase tracking-[0.3em] mb-4">
          The Final Frontier
        </p>

        <div ref={headingRef}>
          <h2 className="font-jakarta font-black text-[clamp(40px,7vw,80px)] leading-[0.9] tracking-tighter text-on-surface mb-8 overflow-hidden">
            <span className="block">GET YOUR WEBSITE</span>
            <span className="block italic text-outline">TODAY</span>
          </h2>
        </div>

        <div ref={btnRef} className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            href="#"
            className="bg-primary text-on-primary px-10 py-5 rounded-full font-jakarta font-extrabold text-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20"
          >
            Access the Vault
          </a>
          <a
            href="#"
            className="glass text-on-surface px-10 py-5 rounded-full font-jakarta font-extrabold text-xl hover:bg-white/5 transition-all"
          >
            View Templates
          </a>
        </div>
      </div>

      {/* Hands + Orb */}
      <div className="mt-20 flex justify-between items-center relative h-[320px] max-w-5xl mx-auto">
        {/* Left hand — abstract geometric */}
        <div
          ref={leftHandRef}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-full flex items-center justify-start"
        >
          <svg viewBox="0 0 320 300" className="w-72 h-72 opacity-20" fill="none">
            <path d="M240 280 L120 180 L80 120 L100 60 L140 40 L180 80 L200 140 L260 200 L280 260 Z" stroke="rgba(79,219,200,0.6)" strokeWidth="1" fill="rgba(79,219,200,0.03)" />
            <path d="M60 200 L160 140 L200 80 L230 100 L220 160 L180 200 L140 240 Z" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="rgba(255,255,255,0.01)" />
            <circle cx="160" cy="150" r="60" stroke="rgba(79,219,200,0.15)" strokeWidth="1" fill="none" />
            <circle cx="160" cy="150" r="30" stroke="rgba(79,219,200,0.1)" strokeWidth="1" fill="none" strokeDasharray="4 6" />
          </svg>
        </div>

        {/* Center orb */}
        <div className="z-20 mx-auto w-28 h-28 rounded-full glass flex items-center justify-center relative">
          <div
            ref={orbRef}
            className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"
          />
          <div className="w-20 h-20 rounded-full animate-spin-slow flex items-center justify-center relative z-10">
            <img src="./icon-growmify.png" alt="Growmify Icon" />
          </div>
        </div>

        {/* Right hand — mirror */}
        <div
          ref={rightHandRef}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full flex items-center justify-end"
        >
          <svg viewBox="0 0 320 300" className="w-72 h-72 opacity-20 scale-x-[-1]" fill="none">
            <path d="M240 280 L120 180 L80 120 L100 60 L140 40 L180 80 L200 140 L260 200 L280 260 Z" stroke="rgba(79,219,200,0.6)" strokeWidth="1" fill="rgba(79,219,200,0.03)" />
            <path d="M60 200 L160 140 L200 80 L230 100 L220 160 L180 200 L140 240 Z" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="rgba(255,255,255,0.01)" />
            <circle cx="160" cy="150" r="60" stroke="rgba(79,219,200,0.15)" strokeWidth="1" fill="none" />
            <circle cx="160" cy="150" r="30" stroke="rgba(79,219,200,0.1)" strokeWidth="1" fill="none" strokeDasharray="4 6" />
          </svg>
        </div>
      </div>
    </section>
  );
}
