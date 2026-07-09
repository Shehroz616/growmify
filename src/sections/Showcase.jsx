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
  }, { scope: headingRef });

  return (
    <section className="py-32 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10 min-h-[500px]">
        <div ref={headingRef} className="max-w-2xl">
          <h2 className="font-jakarta font-extrabold text-[clamp(36px,5vw,56px)] tracking-tight text-on-surface leading-none">
            Live Deployments
          </h2>
          <p className="text-text-muted text-lg mt-4 font-jakarta">
            Explore our latest high-performance projects and innovative solutions.
          </p>
          <p className="text-text-muted text-base mt-4 font-jakarta leading-relaxed">
            We engineer bespoke digital experiences that don't just look stunning, but perform under extreme workloads. From hardware-accelerated creative UI to custom-built AI calling systems and responsive SaaS portals, see how we translate complex requirements into live, highly-optimized production systems.
          </p>
          <p className="text-text-muted text-base mt-4 font-jakarta leading-relaxed">
            Every project in our portfolio is engineered for maximum conversion, sub-second load speeds, and robust backend scalability.
          </p>
          <Link
            to="/showcase"
            className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-full font-jakarta font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20 mt-8 group"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        <div className="relative w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] overflow-visible mt-12 lg:mt-0">
          <CardSwap
            cardDistance={60}
            verticalDistance={70}
            delay={5000}
            pauseOnHover={false}
          >
            {SHOWCASE_PROJECTS.map((project, index) => (
              <Card key={index} className="p-5 group">
                <h3 className="text-text-muted text-lg mt-2 font-jakarta">{project.title}</h3>
                <p className="leading-4 my-3 text-text-muted text-md mt-2 font-jakarta">{project.description}</p>

                <img
                  src={project.image}
                  alt={project.label}
                  className="w-full aspect-video transition-all duration-[2500ms] ease-linear group-hover:object-bottom object-top object-cover"
                />
              </Card>
            ))}
          </CardSwap>
        </div>
      </div>
    </section>
  );
}
