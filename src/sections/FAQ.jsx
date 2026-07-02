import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FAQ_ITEMS = [
  {
    question: 'What makes Growmify different from traditional agencies?',
    answer: 'We are an elite engineering team focusing strictly on speed optimization, custom AI automation, and clean React architectures. No generic builders, no slow plugins, just custom high-performance code.'
  },
  {
    question: 'How long does a typical performance audit take?',
    answer: 'Our high-fidelity audits are compiled within 3-5 business days, delivering direct bottleneck fixes, compilation speed suggestions, and step-by-step UI performance breakdowns.'
  },
  {
    question: 'Do we need to migrate our entire tech stack?',
    answer: 'Not necessarily. We build modular, isolated micro-frontends, optimize existing index paths, and integrate AI pipelines into your current stack with minimal friction.'
  },
  {
    question: 'What metrics do you guarantee?',
    answer: 'We target a 2.5x to 5x average load speedup, sub-100ms response latencies for AI agent integrations, and a guaranteed 99.9% uptime SLA.'
  },
  {
    question: 'How do you price your engineering services?',
    answer: 'We work on a transparent, milestone-driven sprint model or retainer agreements suited for rapidly scaling organizations. Contact us for custom quotes.'
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);
  const containerRef = useRef(null);
  const headingRef = useRef(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = headingRef.current;
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          }
        }
      );

      gsap.fromTo(
        '.faq-row-anim',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.faq-list-container',
            start: 'top 80%',
          }
        }
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="py-24 relative overflow-hidden bg-background">
      {/* Background glow highlights */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[350px] h-[350px] bg-primary/3 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-secondary/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 z-10">
        {/* Header Block */}
        <div ref={headingRef} className="flex flex-col items-center text-center mb-16 select-none">
          <span className="font-mono text-xs text-secondary border border-secondary/20 px-4 py-2 rounded-full bg-secondary/5 mb-6 uppercase tracking-wider">
            005 / FAQ
          </span>
          <h2 className="font-jakarta font-extrabold text-[clamp(36px,5vw,56px)] tracking-tight text-on-surface leading-none mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-text-muted text-lg font-jakarta max-w-lg leading-relaxed">
            Get quick answers regarding our process, performance guarantees, and integration steps.
          </p>
        </div>

        {/* FAQ List Container */}
        <div className="faq-list-container space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div
                key={idx}
                className="faq-row-anim border border-border-subtle rounded-2xl bg-surface-container/20 backdrop-blur-md hover:border-primary/20 transition-all duration-300 overflow-hidden"
              >
                {/* Question Trigger Header */}
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none group select-none"
                >
                  <div className="flex items-center gap-4">
                    <HelpCircle className={`w-5 h-5 shrink-0 transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-text-muted/60 group-hover:text-primary'}`} />
                    <h3 className={`font-jakarta font-extrabold text-base lg:text-lg tracking-tight transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-on-surface group-hover:text-on-surface-variant'}`}>
                      {item.question}
                    </h3>
                  </div>
                  
                  {/* Chevron Icon with Rotation */}
                  <ChevronDown
                    className={`w-5 h-5 text-text-muted transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : 'group-hover:text-on-surface'}`}
                  />
                </button>

                {/* Animated Accordion Content Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 pl-15 border-t border-border-subtle/50 text-text-muted text-sm leading-relaxed font-jakarta">
                        <div className="pl-9">
                          {item.answer}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
