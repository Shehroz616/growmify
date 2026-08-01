import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Zap, Shield, Target, Compass, Sparkles, Users, Award } from 'lucide-react';
import SpotlightCard from '../components/SpotlightCard';
import Lightfall from '../components/Lightfall';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const VALUES = [
  {
    title: 'Performance First',
    description: 'We optimize every single byte. Sub-second load times, smooth scrolling, and perfect conversion parameters are our baseline.',
    icon: Zap,
    color: '#07a8c5'
  },
  {
    title: 'Devoured by Details',
    description: 'From fluid easing curves to clean DOM architecture, we believe that extreme attention to detail is what separates the average from the legendary.',
    icon: Sparkles,
    color: '#86db5a'
  },
  {
    title: 'Aesthetic Dominance',
    description: 'Our web apps do not just work—they wow. We build bespoke interfaces that express your brand’s true premium nature.',
    icon: Target,
    color: '#b7c8e1'
  }
];

const TIMELINE = [
  {
    year: '2024',
    title: 'Genesis Phase',
    desc: 'Founded with a core team of designers and engineers committed to breaking away from generic templates and building high-performance creative interfaces.'
  },
  {
    year: '2025',
    title: 'The Flux Expansion',
    desc: 'Scaled operations by integrating custom AI engines and workflow automations, enabling client funnels to achieve conversion rates up to 4.2x higher.'
  },
  {
    year: '2026',
    title: 'Evolved Velocity',
    desc: 'Expanding globally as a premier high-velocity digital agency, deploying bespoke React frameworks and setting new design standards.'
  }
];

export default function About() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Fade in intro headers
    gsap.fromTo(
      '.about-fade',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
    );

    // Timeline line expansion
    gsap.fromTo(
      '.timeline-progress-line',
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.timeline-root',
          start: 'top 70%',
          end: 'bottom 60%',
          scrub: true
        }
      }
    );

    // Staggered value card entry
    gsap.fromTo(
      '.value-card-3d',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.values-grid-root',
          start: 'top 80%',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-screen bg-background pt-32 pb-24 px-6 lg:px-16 overflow-hidden">
      {/* Dynamic particles background */}


      {/* Ambient background glow highlights */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-y-1/2 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Navigation & Header */}
        <div className="flex flex-col gap-6 mb-20">
          <Link
            to="/"
            className="about-fade flex items-center gap-2 text-text-muted hover:text-primary font-mono text-xs uppercase tracking-wider self-start group transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Home
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <span className="about-fade font-mono text-xs text-primary mb-3 tracking-[0.3em] uppercase block">
                OUR IDENTITY
              </span>
              <h1 className="about-fade font-jakarta font-black text-[clamp(40px,6vw,72px)] tracking-tight text-on-surface-variant leading-none mb-6">
                Evolving Velocity In <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Digital Growth</span>
              </h1>
              <p className="about-fade text-text-muted text-lg font-jakarta leading-relaxed">
                Growmify was built to solve a simple problem: the web has gotten slow, repetitive, and visually uninspiring. We combine cutting-edge performance engineering with state-of-the-art interactive aesthetics to build digital growth experiences that captivate and convert.
              </p>
            </div>

            {/* Quick stats highlight board */}
            <div className="about-fade flex items-center gap-6 border border-border-subtle bg-surface-container/30 backdrop-blur-md rounded-2xl px-6 py-4 self-start lg:self-end">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-primary" />
                <div>
                  <span className="block font-jakarta font-extrabold text-lg text-on-surface">100%</span>
                  <span className="block font-mono text-[9px] text-text-muted uppercase">In-house Talent</span>
                </div>
              </div>
              <div className="w-[1px] h-8 bg-border-subtle" />
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-secondary" />
                <div>
                  <span className="block font-jakarta font-extrabold text-lg text-on-surface">50+</span>
                  <span className="block font-mono text-[9px] text-text-muted uppercase">Milestones Shipped</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: Core Values / Pillars */}
        <div className="mb-32">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <h2 className="font-jakarta font-extrabold text-3xl sm:text-4xl text-on-surface-variant tracking-tight">
                Our Core Pillars
              </h2>
              <p className="text-text-muted text-sm mt-2 font-jakarta max-w-md">
                The technical standards and creative beliefs that define every pixel we compile.
              </p>
            </div>

          </div>

          <div className="values-grid-root grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <div key={idx} className="value-card-3d">
                  <SpotlightCard className="p-8 h-full flex flex-col" spotlightColor={`rgba(7, 168, 197, 0.08)`}>
                    <div className="p-4 bg-primary/5 border border-border-subtle text-primary rounded-2xl w-fit mb-6">
                      <IconComp className="w-6 h-6" style={{ color: val.color }} />
                    </div>
                    <h3 className="font-jakarta font-bold text-xl text-on-surface mb-3">
                      {val.title}
                    </h3>
                    <p className="text-text-muted text-sm font-jakarta leading-relaxed flex-grow">
                      {val.description}
                    </p>
                  </SpotlightCard>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Journey / History Timeline */}
        <div className="mb-32 timeline-root">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <div>
              <h2 className="font-jakarta font-extrabold text-3xl sm:text-4xl text-on-surface-variant tracking-tight">
                Our Journey
              </h2>
              <p className="text-text-muted text-sm mt-2 font-jakarta max-w-md">
                How we transformed from an ambitious concept into a high-performance digital accelerator.
              </p>
            </div>

          </div>

          <div className="relative max-w-3xl mx-auto pl-8 md:pl-0">
            {/* Middle connecting line (centered on desktop, left on mobile) */}
            <div className="absolute left-[9px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 pointer-events-none" />
            <div className="timeline-progress-line absolute left-[9px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-secondary to-tertiary origin-top scale-y-0 pointer-events-none" />

            {/* Timeline nodes */}
            <div className="flex flex-col gap-16">
              {TIMELINE.map((item, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className={`relative flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''
                      }`}
                  >
                    {/* Node Dot */}
                    <div className="absolute left-[-29px] md:left-1/2 md:-translate-x-1/2 top-1.5 w-4 h-4 rounded-full border-4 border-background bg-primary shadow-[0_0_12px_rgba(7,168,197,0.8)] z-10" />

                    {/* Timeline Content Block */}
                    <div className="w-full md:w-1/2 md:px-8">
                      <div className={`glass rounded-2xl p-6 hover:border-primary/20 transition-all duration-300 ${isEven ? 'md:text-right' : 'md:text-left'
                        }`}>
                        <span className="font-mono text-xs font-black text-secondary uppercase tracking-widest block mb-2">
                          {item.year}
                        </span>
                        <h3 className="font-jakarta font-bold text-lg text-on-surface-variant mb-2">
                          {item.title}
                        </h3>
                        <p className="text-text-muted text-xs sm:text-sm font-jakarta leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    {/* Empty spacer block to maintain flex layout balance */}
                    <div className="hidden md:block w-1/2" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA section bottom */}
        <div className="mt-28 border border-border-subtle rounded-3xl bg-surface-container p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-50 pointer-events-none" />
          <h3 className="font-jakarta font-extrabold text-2xl sm:text-3xl text-on-surface mb-4">
            Want to accelerate your brand velocity?
          </h3>
          <p className="text-text-muted text-sm sm:text-base font-jakarta max-w-lg mx-auto mb-8">
            Let's collaborate to build highly customized, hyper-performance UI designs and integrations.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-3.5 rounded-full font-jakarta font-bold text-sm hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-primary/10"
          >
            <span>Start a Project</span>
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </div>
    </section>
  );
}
