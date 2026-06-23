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
    title: '505Error',
    label: '505Error',
    image: './505error-site.png',
    description: 'Interactive image reveal component with mouse tracking and color transitions for premium visual experiences.'
  },
  {
    title: 'Equicadamy',
    label: 'Equicadamy',
    image: './equicadamy-site.png',
    description: 'The freeguide that changes how you walk every course.'
  },
  {
    title: 'Well Clean',
    label: 'Well Clean',
    image: './wellclean-site.png',
    description: 'Well clean is a team of Saudi Architects who believe in improving life quality through excellent care of living spaces'
  },
  {
    title: 'Talk Right',
    label: 'Talk Right',
    image: './talkright-site.png',
    description: 'The AI receptionist & AI call center for UAE clinics. Answer every call, book every patient — 24/7, in 70+ languages.'
  },

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

      <div className='max-w-7xl mx-auto min-h-96' style={{ position: 'relative' }}>
        <div ref={headingRef} className="px-8 max-w-2xl me-auto mb-16">
          <h2 className="font-jakarta font-extrabold text-[clamp(36px,5vw,56px)] tracking-tight text-on-surface leading-none">
            Live Deployments
          </h2>
          <p className="text-text-muted text-lg mt-2 font-jakarta">
            Explore our latest high-performance projects and innovative solutions.
          </p>
          <p className="text-text-muted text-lg mt-2 font-jakarta">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium animi tenetur assumenda rem vel suscipit? Qui recusandae laudantium quibusdam enim a, provident eius sunt quae distinctio autem? Ratione, molestias dolore!
          </p>
          <p className="text-text-muted text-lg mt-2 font-jakarta">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium animi tenetur assumenda rem vel suscipit? Qui recusandae laudantium quibusdam enim a, provident eius sunt quae distinctio autem? Ratione, molestias dolore!
          </p>
          <p className="text-text-muted text-lg mt-2 font-jakarta">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium animi tenetur assumenda rem vel suscipit? Qui recusandae laudantium quibusdam enim a, provident eius sunt quae distinctio autem? Ratione, molestias dolore!
          </p>
        </div>
        <CardSwap
          cardDistance={60}
          verticalDistance={70}
          delay={5000}
          pauseOnHover={false}
        >
          {SHOWCASE_PROJECTS.map((project, index) => (
            <Card className="p-5 group">
              <h3 className='text-text-muted text-lg mt-2 font-jakarta'>{project.title}</h3>
              <p className='leading-4 my-3 text-text-muted text-md mt-2 font-jakarta '>{project.description}</p>
        
                <img
                  src={project.image}
                  alt={project.label}
                  className="w-full aspect-video transition-all duration-[2500ms] ease-linear group-hover:object-bottom object-top object-cover"
                />
            </Card>
          ))}
        </CardSwap>
      </div>
    </section>
  );
}
