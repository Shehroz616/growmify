import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, X, Zap, Shield, CheckCircle, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import TiltedCard from '../components/TiltedCard';
import Lightfall from '../components/Lightfall';
import useProjectStore from '../store/useProjectStore';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AllProjectsShowcase() {
  const [activeProject, setActiveProject] = useState(null);
  const containerRef = useRef(null);

  const ALL_PROJECTS = useProjectStore((s) => s.projects);
  const fetchProjects = useProjectStore((s) => s.fetchProjects);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useGSAP(() => {
    // Scroll header and controls entry animation
    gsap.fromTo(
      '.header-fade',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
    );

    // Initial 3D entry animation of grid cards
    gsap.fromTo(
      '.grid-card-3d',
      {
        opacity: 0,
        y: 80,
        rotateX: 10,
        transformPerspective: 1000
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.projects-grid-root',
          start: 'top 85%',
        }
      }
    );
  }, { dependencies: [], scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-screen bg-background pt-32 pb-24 px-6 lg:px-16 overflow-hidden">
      <div className="relative max-w-7xl mx-auto z-10">
        {/* Navigation & Header */}
        <div className="flex flex-col gap-6 mb-16">
          <Link
            to="/"
            className="header-fade flex items-center gap-2 text-text-muted hover:text-primary font-mono text-xs uppercase tracking-wider self-start group transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Home
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-xl">
              <h1 className="header-fade font-jakarta font-extrabold text-[clamp(40px,6vw,64px)] tracking-tight text-on-surface leading-none mb-4">
                Projects <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Showcase</span>
              </h1>
              <p className="header-fade text-text-muted text-lg font-jakarta">
                Explore our full gallery of high-performance web applications, AI integrations, and responsive creative layouts.
              </p>
            </div>

            {/* Quick stats board */}
            <div className="header-fade flex items-center gap-8 border border-border-subtle bg-surface-container/30 backdrop-blur-md rounded-2xl px-6 py-4">
              <div className="text-center">
                <span className="block font-jakarta font-extrabold text-2xl text-primary">30+</span>
                <span className="block font-mono text-[10px] text-text-muted uppercase">Deployments</span>
              </div>
              <div className="w-[1px] h-8 bg-border-subtle" />
              <div className="text-center">
                <span className="block font-jakarta font-extrabold text-2xl text-secondary">3.2x</span>
                <span className="block font-mono text-[10px] text-text-muted uppercase">Avg Speedup</span>
              </div>
              <div className="w-[1px] h-8 bg-border-subtle" />
              <div className="text-center">
                <span className="block font-jakarta font-extrabold text-2xl text-tertiary">99.9%</span>
                <span className="block font-mono text-[10px] text-text-muted uppercase">SLA Uptime</span>
              </div>
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <motion.div
          layout
          className="projects-grid-root grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {ALL_PROJECTS.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3 }}
                className="grid-card-3d group/card cursor-pointer h-full"
                onClick={() => setActiveProject(project)}
              >
                <TiltedCard className="h-full flex flex-col p-6">
                  {/* Card Image Area with scroll-reveal screenshot effect */}
                  <div className="relative w-full aspect-video overflow-hidden rounded-2xl border border-border-subtle bg-background select-none mb-6">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full object-cover object-top transition-transform duration-[5000ms] ease-in-out group-hover/card:translate-y-[-65%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background-deep/80 via-transparent to-transparent opacity-60 pointer-events-none" />

                    {/* Parallax Float Category Badge */}
                    <span
                      className="absolute top-3 left-3 font-mono text-[9px] font-bold uppercase tracking-wider bg-surface-container-high/90 border border-border-subtle text-secondary px-3 py-1.5 rounded-full shadow-lg"
                      style={{ transform: 'translateZ(30px)' }}
                    >
                      {project.category}
                    </span>
                  </div>

                  {/* Card Content details floating in 3D parallax space */}
                  <div className="flex flex-col flex-grow" style={{ transformStyle: 'preserve-3d' }}>
                    <span
                      className="font-mono text-[10px] text-text-muted tracking-wider uppercase mb-1 block"
                      style={{ transform: 'translateZ(20px)' }}
                    >
                      {project.client}
                    </span>
                    <h3
                      className="font-jakarta font-extrabold text-2xl text-on-surface tracking-tight mb-2 group-hover/card:text-primary transition-colors duration-300"
                      style={{ transform: 'translateZ(40px)' }}
                    >
                      {project.title}
                    </h3>
                    <p
                      className="text-text-muted text-sm font-jakarta leading-relaxed mb-6 flex-grow"
                      style={{ transform: 'translateZ(15px)' }}
                    >
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div
                      className="flex flex-wrap gap-1.5 mb-6"
                      style={{ transform: 'translateZ(25px)' }}
                    >
                      {project.tech.slice(0, 3).map((t) => (
                        <span key={t} className="font-mono text-[9px] px-2.5 py-1 bg-surface-container-high/60 text-on-surface-variant rounded-md border border-border-subtle">
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="font-mono text-[9px] px-2.5 py-1 bg-surface-container-high/60 text-primary rounded-md border border-border-subtle">
                          +{project.tech.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Case study CTA button */}
                    <div
                      className="flex items-center justify-between pt-4 border-t border-border-subtle/50 mt-auto"
                      style={{ transform: 'translateZ(35px)' }}
                    >
                      <span className="font-jakarta font-bold text-xs text-on-surface group-hover/card:text-primary flex items-center gap-1.5 transition-colors duration-300">
                        View Case Study
                        <ExternalLink className="w-3.5 h-3.5 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-transform duration-300" />
                      </span>
                      <div className="flex items-center gap-4 text-xs font-mono">
                        <span className="text-secondary font-bold">{project.stats.speed}</span>
                      </div>
                    </div>
                  </div>
                </TiltedCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Case Study Full-Screen Modal Overlay */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-8 bg-background-deep/95 backdrop-blur-lg"
          >
            {/* Click outside target */}
            <div className="absolute inset-0" onClick={() => setActiveProject(null)} />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, y: 30, rotateX: 5 }}
              animate={{ scale: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.95, y: 30, rotateX: 5 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-5xl h-[85vh] lg:h-auto lg:max-h-[90vh] overflow-y-auto bg-surface-container/90 border border-border-subtle rounded-3xl shadow-2xl flex flex-col lg:flex-row z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-6 right-6 z-20 p-2.5 rounded-full bg-surface-container-highest/80 hover:bg-primary hover:text-on-primary text-on-surface border border-border-subtle transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Left Column - Image & Stats (Visual Showcase) */}
              <div className="w-full lg:w-1/2 p-6 lg:p-10 border-b lg:border-b-0 lg:border-r border-border-subtle flex flex-col justify-between bg-surface-container-low/40">
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border-subtle shadow-xl bg-background max-h-[300px] mb-8 select-none">
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="w-full object-cover object-top hover:translate-y-[-60%] transition-transform duration-[6000ms] ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background-deep/60 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Project Metrics Display */}
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-4 flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-primary" /> Key Performance Metrics
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-surface-container-high/40 border border-border-subtle rounded-2xl p-4 text-center">
                      <span className="block font-jakarta font-extrabold text-2xl text-secondary mb-1">
                        {activeProject.stats.speed}
                      </span>
                      <span className="block font-mono text-[9px] text-text-muted uppercase">Load Speedup</span>
                    </div>
                    <div className="bg-surface-container-high/40 border border-border-subtle rounded-2xl p-4 text-center">
                      <span className="block font-jakarta font-extrabold text-2xl text-primary mb-1">
                        {activeProject.stats.conversion}
                      </span>
                      <span className="block font-mono text-[9px] text-text-muted uppercase">Conversion</span>
                    </div>
                    <div className="bg-surface-container-high/40 border border-border-subtle rounded-2xl p-4 text-center">
                      <span className="block font-jakarta font-extrabold text-2xl text-tertiary mb-1">
                        {activeProject.stats.uptime}
                      </span>
                      <span className="block font-mono text-[9px] text-text-muted uppercase">SLA Uptime</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Right Column - Case Study details */}
              <div className="w-full lg:w-1/2 p-6 lg:p-10 flex flex-col justify-between overflow-y-auto">
                <div className="flex-grow">
                  <span className="font-mono text-xs text-primary font-bold uppercase tracking-widest block mb-2">
                    {activeProject.category} / {activeProject.client}
                  </span>
                  <h2 className="font-jakarta font-extrabold text-3xl lg:text-4xl text-on-surface tracking-tight mb-6">
                    {activeProject.title}
                  </h2>

                  {/* Case study story blocks */}
                  <div className="space-y-6 mb-8 pr-2">
                    <div>
                      <h4 className="font-jakarta font-bold text-sm text-on-surface flex items-center gap-2 mb-2">
                        <Shield className="w-4 h-4 text-error" /> The Challenge
                      </h4>
                      <p className="text-text-muted text-sm font-jakarta leading-relaxed">
                        {activeProject.details.challenge}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-jakarta font-bold text-sm text-on-surface flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-primary" /> Our Solution
                      </h4>
                      <p className="text-text-muted text-sm font-jakarta leading-relaxed">
                        {activeProject.details.solution}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-jakarta font-bold text-sm text-on-surface flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-secondary" /> The Results
                      </h4>
                      <p className="text-text-muted text-sm font-jakarta leading-relaxed">
                        {activeProject.details.results}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer case study tags & close */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {activeProject.tech.map((t) => (
                      <span key={t} className="font-mono text-[9px] px-2.5 py-1 bg-surface-container-highest/60 text-on-surface rounded-md border border-border-subtle">
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveProject(null)}
                    className="w-full bg-secondary text-on-secondary py-3.5 rounded-2xl font-jakarta font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-[0_4px_20px_rgba(134,219,90,0.25)]"
                  >
                    Close Case Study
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
