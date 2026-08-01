import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CountUp from '../components/CountUp';

gsap.registerPlugin(ScrollTrigger);

const STATS_DATA = [
  {
    value: 4.2,
    decimals: 1,
    suffix: 'x',
    label: 'Conversion Rate',
    desc: 'Average boost in landing page and funnel performance.',
    colorClass: 'text-primary', // teal
  },
  {
    value: 12,
    decimals: 0,
    prefix: '$',
    suffix: 'M+',
    label: 'Client Revenue',
    desc: 'Revenue generated and captured through built systems.',
    colorClass: 'text-secondary', // green
  },
  {
    value: 50,
    decimals: 0,
    suffix: '+',
    label: 'Projects Completed',
    desc: 'Production-grade applications built, shipped, and scaled.',
    colorClass: 'text-primary',
  },
  {
    value: 18,
    decimals: 0,
    suffix: '+',
    label: 'Global Markets',
    desc: 'International countries where our client campaigns run.',
    colorClass: 'text-secondary',
  },
];

function StatCard({ stat }) {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
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
          trigger: cardRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <div
      ref={cardRef}
      className="bg-[#063b62]/25 border border-[#063b62]/50 backdrop-blur-2xl rounded-3xl p-8 relative overflow-hidden transition-all duration-300 hover:border-primary/40 hover:bg-[#063b62]/40 group"
    >
      {/* Light border reflection hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          <span className="font-mono text-xs text-text-muted/80 uppercase tracking-widest block mb-4 font-semibold">
            {stat.label}
          </span>
          <div className="flex items-baseline font-jakarta font-black text-5xl sm:text-6xl tracking-tight mb-4">
            {stat.prefix && <span className="text-on-surface-variant mr-1">{stat.prefix}</span>}
            <CountUp
              from={0}
              to={stat.value}
              decimals={stat.decimals}
              duration={2.5}
              className={`${stat.colorClass} transition-all duration-300`}
            />
            {stat.suffix && <span className="text-on-surface-variant ml-1">{stat.suffix}</span>}
          </div>
        </div>
        <p className="text-text-muted text-sm font-jakarta leading-relaxed">
          {stat.desc}
        </p>
      </div>
    </div>
  );
}

export default function Stats() {
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
    <section className="py-28 px-8 relative overflow-hidden bg-gradient-to-r from-[#063b62]/35 via-[#0e1513] to-[#063b62]/35 border-y border-[#063b62]/40">
      {/* Background glow effects with rgb(6 59 98) oceanic accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[500px] bg-[#063b62]/40 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="font-mono text-xs text-primary mb-3 tracking-[0.3em] uppercase block font-semibold">
              REAL IMPACT
            </span>
            <h2 className="font-jakarta font-extrabold text-[clamp(36px,5vw,56px)] tracking-tight text-on-surface-variant leading-none">
              Metrics That Matter
            </h2>
            <p className="text-text-muted text-lg max-w-md mt-4 font-jakarta">
              Empirical evidence of our high-speed growth strategies in production.
            </p>
          </div>

        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS_DATA.map((stat, idx) => (
            <StatCard key={idx} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
