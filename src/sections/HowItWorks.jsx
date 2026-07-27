import { useRef } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

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

  // References for cards
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);

  // Setup GSAP scroll timeline for card transitions
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width:1024px)", () => {
        const cards = [
          card1Ref.current,
          card2Ref.current,
          card3Ref.current,
          card4Ref.current,
        ];

        gsap.set(cards[0], {
          opacity: 1,
          y: 0,
        });

        gsap.set(cards.slice(1), {
          opacity: 0,
          y: 50,
        });

        const tl = gsap.timeline({
          defaults: {
            ease: "none",
          },
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=1600",
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        const step = 1 / cards.length;

        cards.forEach((card, index) => {
          if (!card) return;

          const start = index * step;

          if (index > 0) {
            tl.fromTo(
              card,
              {
                opacity: 0,
                y: 50,
              },
              {
                opacity: 1,
                y: 0,
                duration: step * 0.45,
                ease: "power2.out",
              },
              start
            );
          }

          if (index < cards.length - 1) {
            tl.to(
              card,
              {
                opacity: 0,
                y: -50,
                duration: step * 0.45,
                ease: "power2.in",
              },
              start + step * 0.55
            );
          }
        });

        return () => {
          tl.kill();
        };
      });

      return () => {
        mm.revert();
      };
    },
    {
      scope: containerRef,
      revertOnUpdate: true,
    }
  );

  const cardRefs = [card1Ref, card2Ref, card3Ref, card4Ref];

  return (
    <div ref={containerRef} className="w-full bg-surface-container">
      <section
        className="relative w-full lg:min-h-screen flex flex-col lg:flex-row items-center justify-between px-8 lg:px-24 py-16 overflow-hidden max-w-7xl mx-auto"
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

        {/* Right Column - Sequential Flow Cards */}
        <div className="w-full lg:w-[50%] relative flex flex-col justify-center min-h-[360px] py-12 lg:py-0 z-10 shrink-0">
          <div className="relative w-full flex flex-col gap-6 lg:block lg:h-[280px]">
            {PHASES_DATA.map((phase, idx) => (
              <div
                key={idx}
                ref={cardRefs[idx]}
                className="lg:absolute relative lg:inset-0 flex flex-col justify-center w-full"
              >
                <div className=" bg-background rounded-3xl p-8 border border-border-subtle hover:border-primary/20 transition-all duration-300">
                  <span className={`font-mono text-xs uppercase tracking-widest block mb-2 font-bold ${phase.colorClass}`}>
                    {phase.phase}
                  </span>
                  <h3 className="font-jakarta font-extrabold text-2xl text-on-surface-variant mb-3">
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
    </div>
  );
}
