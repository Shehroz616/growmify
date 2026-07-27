import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import useAppStore from './store/useAppStore';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Footer from './sections/Footer';
import Home from './sections/Home';
import About from './sections/About';
import Careers from './sections/Careers';
import Privacy from './sections/Privacy';
import Terms from './sections/Terms';
import AllProjectsShowcase from './sections/AllProjectsShowcase';
import Contact from './sections/Contact';
import AllBlogs from './sections/AllBlogs';
import BlogDetails from './sections/BlogDetails';

// Admin Imports
import AdminLogin from './sections/AdminLogin';
import AdminDashboard from './sections/AdminDashboard';
import AdminBlogForm from './sections/AdminBlogForm';
import AdminLayout from './components/AdminLayout';
import AdminProjects from './sections/AdminProjects';
import AdminProjectForm from './sections/AdminProjectForm';
import AdminCareers from './sections/AdminCareers';
import AdminCareerForm from './sections/AdminCareerForm';
import AdminInquiries from './sections/AdminInquiries';
import { Intercom } from "@intercom/messenger-js-sdk"

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
  const isAdminPath = location.pathname.startsWith('/admin');

  useEffect(() => {
    Intercom({
      app_id: 'qfat9rh3',
    });
  }, []);

  useEffect(() => {
    if (!isLoaded || isAdminPath) return;

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
      lenisRef.current = null;
    };
  }, [isLoaded, isAdminPath]);

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
        {!isAdminPath && <Navbar />}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/showcase" element={<AllProjectsShowcase />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blogs" element={<AllBlogs />} />
            <Route path="/blog/:id" element={<BlogDetails />} />

            {/* Admin Dashboard Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
            <Route path="/admin/dashboard/new" element={<AdminLayout><AdminBlogForm /></AdminLayout>} />
            <Route path="/admin/dashboard/edit/:id" element={<AdminLayout><AdminBlogForm /></AdminLayout>} />

            {/* Admin Portfolio Routes */}
            <Route path="/admin/dashboard/projects" element={<AdminLayout><AdminProjects /></AdminLayout>} />
            <Route path="/admin/dashboard/projects/new" element={<AdminLayout><AdminProjectForm /></AdminLayout>} />
            <Route path="/admin/dashboard/projects/edit/:id" element={<AdminLayout><AdminProjectForm /></AdminLayout>} />

            {/* Admin Careers Routes */}
            <Route path="/admin/dashboard/careers" element={<AdminLayout><AdminCareers /></AdminLayout>} />
            <Route path="/admin/dashboard/careers/new" element={<AdminLayout><AdminCareerForm /></AdminLayout>} />
            <Route path="/admin/dashboard/careers/edit/:id" element={<AdminLayout><AdminCareerForm /></AdminLayout>} />

            {/* Admin Inquiries Route */}
            <Route path="/admin/dashboard/inquiries" element={<AdminLayout><AdminInquiries /></AdminLayout>} />

            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </main>
        {!isAdminPath && <Footer />}
      </div>
    </div>
  );
}
