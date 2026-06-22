import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import useAppStore from './store/useAppStore';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Services from './sections/Services';
import Showcase from './sections/Showcase';
import CTA from './sections/CTA';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function CursorGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (ref.current) {
        ref.current.style.left = e.clientX + 'px';
        ref.current.style.top = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return <div ref={ref} className="cursor-glow" />;
}

export default function App() {
  const isLoaded = useAppStore((s) => s.isLoaded);

  useEffect(() => {
    if (!isLoaded) return;

    // Init Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, [isLoaded]);

  return (
    <div className="dark bg-background min-h-screen">
      <CursorGlow />
      {!isLoaded && <Preloader />}
      <div style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s ease 0.2s' }}>
        <Navbar />
        <main>
          <Hero />
          <Services />
          <Showcase />
          <CTA />
        </main>
        <Footer />
      </div>
    </div>
  );
}
