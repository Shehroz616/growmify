import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import CardSwap, { Card } from '../components/CardSwap';
import useProjectStore from '../store/useProjectStore';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Showcase() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const projects = useProjectStore((s) => s.projects);
  const fetchProjects = useProjectStore((s) => s.fetchProjects);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const SHOWCASE_PROJECTS = projects
    .filter((project) => project.featured)
    .map((project) => ({
      ...project,
      description: project.featuredDescription || project.description,
    }));

  useGSAP(() => {
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
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 lg:py-36 relative overflow-hidden bg-surface-container">
      {/* Background Arc Graphic Lines & Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-primary/10 opacity-60" />
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full border border-white/5 opacity-30" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10 min-h-[500px]">
        {/* Left Side: Formatted Content & CTA Button */}
        <div ref={headingRef} className="lg:col-span-6 flex flex-col justify-center max-w-xl">
          <h2 className="font-jakarta font-extrabold text-[clamp(40px,5vw,64px)] tracking-tight leading-tight mb-4">
            <span className="text-primary">Live</span> <span className="text-on-surface">Deployments</span>
          </h2>

          <h3 className="text-on-surface font-jakarta font-semibold text-lg sm:text-xl leading-snug mb-6 text-on-surface/90">
            Explore our latest high-performance projects and innovative solutions.
          </h3>

          <div className="space-y-4 mb-8 text-text-muted text-sm sm:text-base font-jakarta leading-relaxed">
            <p>
              We engineer bespoke digital experiences that don't just look stunning, but perform under extreme workloads. From hardware-accelerated creative UI to custom-built AI calling systems and responsive SaaS portals, see how we translate complex requirements into live, highly optimized production systems.
            </p>
            <p>
              Every project in our portfolio is engineered for maximum conversion, sub-second load speeds, and robust backend scalability.
            </p>
          </div>

          <div>
            <Link
              to="/showcase"
              className="inline-flex items-center gap-2.5 bg-primary text-on-primary font-jakarta font-bold text-sm sm:text-base px-8 py-3.5 rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20 group cursor-pointer"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* Right Side: CardSwap 3D Perspective Stacked Cards */}
        <div className="lg:col-span-6 relative w-full h-[400px] sm:h-[460px] lg:h-[500px] flex items-center justify-center overflow-visible">
          <CardSwap
            width={480}
            height={320}
            cardDistance={55}
            verticalDistance={60}
            delay={4500}
            pauseOnHover={false}
          >
            {SHOWCASE_PROJECTS.map((project, index) => (
              <Card
                key={project._id || project.id || index}
                className="p-0 border border-border-subtle bg-surface-container/95 backdrop-blur-2xl rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
              >
                <div className="grid grid-cols-1 sm:grid-cols-12 h-full w-full">
                  {/* Left Inner Content */}
                  <div className="sm:col-span-6 p-6 sm:p-7 flex flex-col justify-between h-full bg-surface-container">
                    <div>
                      <h4 className="font-jakarta font-extrabold text-2xl text-on-surface mb-2 tracking-tight group-hover:text-primary transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-text-muted text-xs sm:text-sm font-jakarta leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-auto">
                      <Link
                        to="/showcase"
                        className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-primary group-hover:translate-x-1 transition-transform duration-300"
                      >
                        <span>View Project</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Inner Image Preview */}
                  <div className="sm:col-span-6 relative h-full overflow-hidden bg-background border-t sm:border-t-0 sm:border-l border-border-subtle">
                    {/* Mock Browser Header Bar */}
                    <div className="h-6 bg-surface-container-high/90 border-b border-border-subtle px-3 flex items-center gap-1.5 z-10 relative">
                      <span className="w-2 h-2 rounded-full bg-red-500/70" />
                      <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
                      <span className="w-2 h-2 rounded-full bg-green-500/70" />
                      <span className="font-mono text-[8px] text-text-muted ml-2 opacity-60 truncate">
                        {project.title.toLowerCase().replace(/\s+/g, '')}.growmify.com
                      </span>
                    </div>

                    <div className="relative h-[calc(100%-24px)] w-full overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-container/40 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </CardSwap>
        </div>
      </div>
    </section>
  );
}
