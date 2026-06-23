import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Galaxy from '../components/Galaxy'
import CardSwap, { Card } from '../components/CardSwap';

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
      <div style={{ height: '600px', position: 'relative' }}>
        <CardSwap
          cardDistance={60}
          verticalDistance={70}
          delay={5000}
          pauseOnHover={false}
        >
          {SHOWCASE_PROJECTS.map((project, index) => (
          <Card>
            <h3>{project.title}</h3>
            <img src={project.image} alt={project.title} />
          </Card>
          ))}
        </CardSwap>
      </div>
    </section>
  );
}
