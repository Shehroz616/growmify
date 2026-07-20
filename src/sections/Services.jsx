import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Smartphone, Database, Cloud } from 'lucide-react';
import SpotlightCard from '../components/SpotlightCard';

gsap.registerPlugin(ScrollTrigger);

const EXPERTISE_CARDS = [
  {
    id: 'web-dev',
    badge: 'Full-Stack',
    icon: Code2,
    title: 'Full-Stack Web Development',
    description:
      'We build responsive websites, SaaS platforms, dashboards, and custom web applications with secure backends, scalable architecture, and reliable performance.',
    sections: [
      {
        label: 'Frontend',
        items: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux'],
      },
      {
        label: 'Backend',
        items: ['PHP', 'Laravel', 'Node.js', 'Express.js', 'REST APIs', 'Socket.IO'],
      },
    ],
  },
  {
    id: 'mobile-dev',
    badge: 'Mobile App',
    icon: Smartphone,
    title: 'Mobile App Development',
    description:
      'We build high-performance native and cross-platform mobile applications for Android and iOS, with smooth interfaces, secure architecture, and reliable performance across devices.',
    sections: [
      {
        label: 'Technologies',
        items: ['Swift', 'SwiftUI', 'React Native', 'Flutter', 'Firebase'],
      },
      {
        label: 'Capabilities',
        items: [
          'Push notifications',
          'Offline access',
          'API integrations',
          'In-app purchases',
          'App Store and Play Store deployment',
        ],
      },
      {
        label: 'Best suited for',
        items: [
          'MVPs',
          'Business applications',
          'Customer portals',
          'On-demand platforms',
        ],
      },
    ],
  },
  {
    id: 'databases-apis',
    badge: 'Data & Architecture',
    icon: Database,
    title: 'Databases & APIs',
    description:
      'We design secure data structures and APIs that keep applications fast, reliable, and ready to scale.',
    sections: [
      {
        label: 'Databases',
        items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Firebase', 'Redis'],
      },
      {
        label: 'APIs',
        items: [
          'REST APIs',
          'GraphQL',
          'Real-time communication',
          'Third-party integrations',
        ],
      },
    ],
  },
  {
    id: 'devops',
    badge: 'Cloud & Infrastructure',
    icon: Cloud,
    title: 'Deployment & DevOps',
    description:
      'We prepare applications for dependable production deployment with automated workflows, monitoring, and scalable infrastructure.',
    sections: [
      {
        label: 'Technologies',
        items: ['AWS', 'GitHub Actions', 'Vercel', 'CI/CD'],
      },
    ],
  },
];

export default function Services() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    // Header entry animation
    gsap.fromTo(
      headingRef.current,
      { y: 40, opacity: 0 },
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

    // Staggered card animation
    const cards = containerRef.current?.querySelectorAll('.expertise-card');
    if (cards && cards.length > 0) {
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        }
      );
    }
  }, []);

  return (
    <section className="w-full py-28 px-6 lg:px-12 relative z-10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          ref={headingRef}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
        >
          <div className="max-w-3xl">
            <span className="font-mono text-xs text-primary mb-3 tracking-[0.3em] uppercase block font-semibold">
              OUR CAPABILITIES
            </span>
            <h2 className="font-jakarta font-extrabold text-[clamp(36px,5vw,56px)] tracking-tight text-on-surface leading-tight">
              Technology Expertise
            </h2>
            <p className="text-text-muted text-base sm:text-lg max-w-2xl mt-4 font-jakarta leading-relaxed">
              We use reliable, production-ready technologies to build scalable web platforms, mobile applications, and digital products.
            </p>
          </div>
          <div className="font-mono text-xs text-primary border border-primary/20 px-4 py-2 rounded-full bg-primary/5 shrink-0">
            001 / EXPERTISE STACK
          </div>
        </div>

        {/* 2x2 Grid with Unified Card Design and Hover Effects */}
        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {EXPERTISE_CARDS.map((card) => {
            const IconComponent = card.icon;
            return (
              <div key={card.id} className="expertise-card h-full">
                <SpotlightCard className="p-8 sm:p-10 h-full flex flex-col justify-between">
                  <div>
                    {/* Top row: Icon & Tag */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-[11px] uppercase tracking-wider px-3 py-1 bg-surface-container-high border border-border-subtle rounded-full text-primary font-medium">
                        {card.badge}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-jakarta font-bold text-2xl sm:text-3xl text-on-surface mb-3 tracking-tight">
                      {card.title}
                    </h3>
                    <p className="text-text-muted text-sm sm:text-base font-jakarta leading-relaxed">
                      {card.description}
                    </p>

                    {/* Subsections List */}
                    <div className="space-y-6 mt-8 pt-6 border-t border-border-subtle">
                      {card.sections.map((sec, sIdx) => (
                        <div key={sIdx} className="space-y-2.5">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            <span className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
                              {sec.label}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-2 pt-0.5">
                            {sec.items.map((item, iIdx) => (
                              <span
                                key={iIdx}
                                className="inline-flex items-center text-xs font-jakarta font-medium px-3 py-1.5 rounded-lg bg-surface-container-high/80 border border-border-subtle text-on-surface group-hover:border-primary/30 group-hover:text-on-surface hover:border-primary hover:text-primary transition-colors duration-200"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}