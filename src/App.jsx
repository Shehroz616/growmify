import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Routes, Route, useLocation } from 'react-router-dom';

import useAppStore from './store/useAppStore';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Footer from './sections/Footer';
import Home from './sections/Home';
import AllProjectsShowcase from './sections/AllProjectsShowcase';
import Contact from './sections/Contact';
import AllBlogs from './sections/AllBlogs';
import BlogDetails from './sections/BlogDetails';

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
  const location = useLocation();
  const lenisRef = useRef(null);

  useEffect(() => {
    if (!isLoaded) return;

    // Init Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    let rafId;

    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [isLoaded]);

  // Reset scroll to top when navigation changes
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div className="dark bg-background min-h-screen">
      <CursorGlow />
      {!isLoaded && <Preloader />}
      <div style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s ease 0.2s' }}>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/showcase" element={<AllProjectsShowcase />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blogs" element={<AllBlogs />} />
            <Route path="/blog/:id" element={<BlogDetails />} />
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}
