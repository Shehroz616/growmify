import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Galaxy from '../components/Galaxy'

gsap.registerPlugin(ScrollTrigger);

const SHOWCASE_PROJECTS = [
  {
    title: 'The Contrast API',
    label: 'Image Reveal',
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800',
    description: 'Interactive image reveal component with mouse tracking and color transitions for premium visual experiences.'
  },
  {
    title: 'AI Vision Suite',
    label: 'Machine Learning',
    image: 'https://images.unsplash.com/photo-1677442d019cecf8f69e1e370ecc2057?w=800',
    description: 'Advanced computer vision algorithms and real-time processing for intelligent image analysis.'
  },
  {
    title: 'Real-Time Dashboard',
    label: 'Data Visualization',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    description: 'Live analytics dashboard with instant data synchronization and beautiful visualization components.'
  },
  {
    title: 'Mobile Performance',
    label: 'Optimization',
    image: 'https://images.unsplash.com/photo-1512941691920-25bda36dc643?w=800',
    description: 'Performance-first mobile architecture delivering lightning-fast load times and smooth interactions.'
  },
  {
    title: 'Cloud Infrastructure',
    label: 'DevOps',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
    description: 'Scalable cloud solutions with automated deployment pipelines and infrastructure as code.'
  },
  {
    title: 'E-Commerce Platform',
    label: 'Full Stack',
    image: 'https://images.unsplash.com/photo-1522869635100-ce306b08a6d5?w=800',
    description: 'Complete e-commerce solution with checkout optimization, payments, and inventory management.'
  },
  {
    title: 'Social Network API',
    label: 'Backend Architecture',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
    description: 'Robust backend API supporting real-time messaging, notifications, and social features.'
  },
  {
    title: 'Blockchain Integration',
    label: 'Web3 Solutions',
    image: 'https://images.unsplash.com/photo-1639762681033-6461502127a9?w=800',
    description: 'Decentralized application integration with smart contracts and cryptocurrency payments.'
  },
  {
    title: 'Design System',
    label: 'UI Components',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
    description: 'Comprehensive component library with 100+ customizable UI elements and design tokens.'
  },
  {
    title: 'Analytics Engine',
    label: 'Data Processing',
    image: 'https://images.unsplash.com/photo-1551431009-381d2a1d6922?w=800',
    description: 'Advanced data processing pipeline for real-time analytics and predictive insights.'
  },
  {
    title: 'Security Framework',
    label: 'Cybersecurity',
    image: 'https://images.unsplash.com/photo-1555663848-b4b0a20fb0c1?w=800',
    description: 'Enterprise-grade security implementation with encryption, authentication, and compliance.'
  },
  {
    title: 'Performance Metrics',
    label: 'Monitoring',
    image: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=800',
    description: 'Real-time performance monitoring and alerting system for proactive issue detection.'
  }
];

export default function Showcase() {
  const headingRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

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

  const currentProject = SHOWCASE_PROJECTS[selectedIndex];

  const handlePrev = () => {
    setSelectedIndex(Math.max(0, selectedIndex - 1));
  };

  const handleNext = () => {
    setSelectedIndex(Math.min(SHOWCASE_PROJECTS.length - 1, selectedIndex + 1));
  };

  return (
    <section className="py-32 relative overflow-hidden">
      <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
        <Galaxy
          mouseRepulsion={false}
          mouseInteraction
          density={0.25}
          glowIntensity={0.1}
          saturation={0}
          hueShift={0}
          twinkleIntensity={0.1}
          rotationSpeed={0.1}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.25}
          speed={0.5}
        />
      </div>
      <div ref={headingRef} className="px-8 max-w-7xl mx-auto mb-16">
        <h2 className="font-jakarta font-extrabold text-[clamp(36px,5vw,56px)] tracking-tight text-on-surface leading-none">
          Live Deployments
        </h2>
        <p className="text-text-muted text-lg mt-2 font-jakarta">
          Explore our latest high-performance projects and innovative solutions.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Featured Image */}
          <div className="relative h-[400px] lg:h-[600px] rounded-3xl overflow-hidden bg-gradient-to-br from-surface-container to-background">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${currentProject.image}?w=800&q=90&sat=100')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Project Label Overlay */}
            <motion.div
              key={`label-${selectedIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute bottom-0 left-0 right-0 p-8 z-10"
            >
              <p className="font-mono text-xs uppercase tracking-widest text-primary mb-2 opacity-80">
                {currentProject.label}
              </p>
              <h3 className="font-jakarta font-black text-3xl lg:text-4xl text-white leading-tight">
                {currentProject.title}
              </h3>
            </motion.div>
          </div>

          {/* Right side - Features List */}
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-4">
            {SHOWCASE_PROJECTS.map((project, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`w-full text-left p-5 lg:p-6 rounded-2xl transition-all duration-300 group ${selectedIndex === index
                    ? 'bg-primary/15 border border-primary/50 shadow-lg'
                    : 'bg-surface-container/40 border border-border-subtle hover:border-primary/30 hover:bg-surface-container/60'
                  }`}
                whileHover={{ x: 4 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-mono text-xs uppercase tracking-widest transition-colors ${selectedIndex === index ? 'text-primary' : 'text-text-muted/60 group-hover:text-text-muted'
                        }`}
                    >
                      {project.label}
                    </p>
                    <h3
                      className={`font-jakarta font-bold text-lg mt-2 transition-colors line-clamp-2 ${selectedIndex === index ? 'text-on-surface' : 'text-on-surface/70 group-hover:text-on-surface'
                        }`}
                    >
                      {project.title}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ x: selectedIndex === index ? 4 : 0, opacity: selectedIndex === index ? 1 : 0.5 }}
                    className={`ml-2 flex-shrink-0 transition-colors ${selectedIndex === index ? 'text-primary' : 'text-text-muted'
                      }`}
                  >
                    <ChevronRight size={20} />
                  </motion.div>
                </div>

                {/* Expandable Description */}
                <AnimatePresence>
                  {selectedIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-primary/20"
                    >
                      <p className="text-sm text-text-muted/80 font-jakarta leading-relaxed">
                        {project.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Bottom Navigation & Indicators */}
        <div className="mt-12 pt-8 border-t border-border-subtle flex items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {SHOWCASE_PROJECTS.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`rounded-full transition-all ${selectedIndex === index
                    ? 'w-8 h-2 bg-primary'
                    : 'w-2 h-2 bg-border-subtle hover:bg-primary/50'
                  }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex gap-3">
            <motion.button
              onClick={handlePrev}
              disabled={selectedIndex === 0}
              className="w-10 h-10 rounded-full border border-border-subtle flex items-center justify-center hover:border-primary hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous project"
            >
              <ChevronRight size={18} className="rotate-180" />
            </motion.button>

            <motion.button
              onClick={handleNext}
              disabled={selectedIndex === SHOWCASE_PROJECTS.length - 1}
              className="w-10 h-10 rounded-full border border-border-subtle flex items-center justify-center hover:border-primary hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next project"
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>
        </div>

        {/* Counter */}
        <div className="mt-6 text-center">
          <p className="text-sm font-mono text-text-muted">
            {String(selectedIndex + 1).padStart(2, '0')} / {String(SHOWCASE_PROJECTS.length).padStart(2, '0')}
          </p>
        </div>
      </div>
    </section>
  );
}
