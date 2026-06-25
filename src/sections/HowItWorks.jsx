import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PHASES_DATA = [
  {
    phase: 'Phase 01',
    title: 'Audit & Discovery',
    description: 'We perform deep performance audits of your current codebase, API structures, and landing page funnels to find hidden bottlenecks.',
    colorClass: 'text-primary',
  },
  {
    phase: 'Phase 02',
    title: 'Optimization & Engineering',
    description: 'We rebuild critical bottlenecks, implement clean React architectures, optimize database indexes, and compile high-speed native modules.',
    colorClass: 'text-secondary',
  },
  {
    phase: 'Phase 03',
    title: 'Deployment & Validation',
    description: 'We ship production bundles with zero-downtime CI/CD pipelines, track live KPIs, and configure real-time monitoring alerts.',
    colorClass: 'text-primary',
  },
  {
    phase: 'Phase 04',
    title: 'Growth Acceleration',
    description: 'We implement AI receptionist flows, launch automated SEO structures, and iterate on client retention funnels.',
    colorClass: 'text-secondary',
  },
];

export default function HowItWorks() {
  const containerRef = useRef(null);
  const activePathRef = useRef(null);
  const dotRef = useRef(null);

  // References for cards
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);

  const [pathLength, setPathLength] = useState(0);

  // Initialize path length on mount
  useEffect(() => {
    if (activePathRef.current) {
      const len = activePathRef.current.getTotalLength();
      setPathLength(len);
      
      // Position tracer dot at start
      const startPoint = activePathRef.current.getPointAtLength(0);
      if (dotRef.current) {
        dotRef.current.setAttribute('cx', startPoint.x);
        dotRef.current.setAttribute('cy', startPoint.y);
      }
    }
  }, []);

  // Setup GSAP scroll timeline once pathLength is known
  useEffect(() => {
    if (pathLength === 0) return;

    // Set initial stroke dash properties for self-drawing path
    gsap.set(activePathRef.current, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    const cards = [card1Ref, card2Ref, card3Ref, card4Ref];

    // Set all except the first card to invisible initially
    gsap.set(card2Ref.current, { opacity: 0, y: 50 });
    gsap.set(card3Ref.current, { opacity: 0, y: 50 });
    gsap.set(card4Ref.current, { opacity: 0, y: 50 });
    gsap.set(card1Ref.current, { opacity: 1, y: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=2400', // Total scroll distance while pinned
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    // 1. Draw the SVG line down the page
    tl.to(
      activePathRef.current,
      {
        strokeDashoffset: 0,
        ease: 'none',
      },
      0
    );

    // 2. Animate the tracer dot along the active path
    tl.to(
      { val: 0 },
      {
        val: 1,
        ease: 'none',
        onUpdate: function () {
          if (!activePathRef.current || !dotRef.current) return;
          const progress = this.targets()[0].val;
          const currentLength = progress * pathLength;
          const point = activePathRef.current.getPointAtLength(currentLength);
          dotRef.current.setAttribute('cx', point.x);
          dotRef.current.setAttribute('cy', point.y);
        },
      },
      0
    );

    // 3. Chronologically transition between cards
    const stepRatio = 1 / cards.length; // 0.25 duration for each step

    cards.forEach((card, index) => {
      const startOffset = index * stepRatio;

      // Animating entrance of the card (except the first one, which is already there)
      if (index > 0) {
        tl.fromTo(
          card.current,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: stepRatio * 0.35,
            ease: 'power2.out',
          },
          startOffset
        );
      }

      // Animating exit of the card (except the last one, which stays visible at the end)
      if (index < cards.length - 1) {
        tl.to(
          card.current,
          {
            opacity: 0,
            y: -50,
            duration: stepRatio * 0.35,
            ease: 'power2.in',
          },
          startOffset + stepRatio * 0.65
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, [pathLength]);

  const cardRefs = [card1Ref, card2Ref, card3Ref, card4Ref];

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-background flex flex-col lg:flex-row items-center justify-between px-8 lg:px-24 py-16 overflow-hidden max-w-7xl mx-auto"
    >
      {/* Background glow highlights */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Left Column - Section Header */}
      <div className="w-full lg:w-[40%] flex flex-col justify-start lg:justify-center py-8 lg:py-0 select-none z-10 shrink-0">
        <span className="font-mono text-xs text-secondary border border-secondary/20 px-4 py-2 rounded-full bg-secondary/5 self-start mb-6 uppercase tracking-wider">
          003 / METHODOLOGY
        </span>
        <h2 className="font-jakarta font-extrabold text-[clamp(36px,5vw,56px)] tracking-tight text-on-surface leading-none mb-6">
          Our Blueprint For Speed
        </h2>
        <p className="text-text-muted text-lg font-jakarta max-w-sm leading-relaxed">
          How we build, deploy, and scale high-performance applications that accelerate growth.
        </p>
      </div>

      {/* Center Column - Interactive SVG Drawing String Path */}
      <div className="relative w-16 lg:w-24 h-[120px] lg:h-[480px] shrink-0 flex items-center justify-center z-10">
        <svg
          viewBox="0 0 100 800"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <defs>
            {/* Soft outer glow */}
            <filter id="glow-wire" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            
            {/* Neon color gradient matching theme */}
            <linearGradient id="neonGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#07a8c5" />
              <stop offset="100%" stopColor="#86db5a" />
            </linearGradient>
          </defs>

          {/* Guide Wire: dashed background curve */}
          <path
            d="M 50,0 C 80,180 20,380 50,560 C 80,740 20,780 50,800"
            fill="none"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="3"
            strokeDasharray="6 6"
          />

          {/* Drawing Wire: animated on scroll */}
          <path
            ref={activePathRef}
            d="M 50,0 C 80,180 20,380 50,560 C 80,740 20,780 50,800"
            fill="none"
            stroke="url(#neonGradient)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Tracer Dot: moving neon particle */}
          <circle
            ref={dotRef}
            r="8"
            fill="#86db5a"
            filter="url(#glow-wire)"
          />
        </svg>
      </div>

      {/* Right Column - Sequential Testimonial/Flow Cards */}
      <div className="w-full lg:w-[45%] relative flex flex-col justify-center min-h-[360px] py-12 lg:py-0 z-10 shrink-0">
        <div className="relative w-full h-[280px]">
          {PHASES_DATA.map((phase, idx) => (
            <div
              key={idx}
              ref={cardRefs[idx]}
              className="absolute inset-0 flex flex-col justify-center"
            >
              <div className="glass rounded-3xl p-8 border border-border-subtle hover:border-primary/20 transition-all duration-300">
                <span className={`font-mono text-xs uppercase tracking-widest block mb-2 font-bold ${phase.colorClass}`}>
                  {phase.phase}
                </span>
                <h3 className="font-jakarta font-extrabold text-2xl text-on-surface mb-3">
                  {phase.title}
                </h3>
                <p className="text-text-muted text-sm font-jakarta leading-relaxed">
                  {phase.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
