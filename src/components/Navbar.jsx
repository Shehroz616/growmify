import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Globe } from 'lucide-react';
import useAppStore from '../store/useAppStore';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Careers', path: '/careers' },
  { name: 'Showcase', path: '/showcase' },
  { name: 'Blogs', path: '/blogs' },
];

export default function Navbar() {
  const navRef = useRef(null);
  const { isLoaded } = useAppStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 1,
      ease: 'expo.out',
      delay: 0.1,
    });
  }, [isLoaded]);

  // Disable scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Auto close mobile menu on path changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // SVG Path animation morphing variants for the liquid waves
  const wave1Variants = {
    initial: {
      d: "M 100 0 Q 100 50 100 100 L 100 100 L 100 0 Z"
    },
    animate: {
      d: "M 0 0 Q 0 50 0 100 L 100 100 L 100 0 Z",
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
      d: "M 100 0 Q 100 50 100 100 L 100 100 L 100 0 Z",
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.1 }
    }
  };

  const wave2Variants = {
    initial: {
      d: "M 100 0 Q 100 50 100 100 L 100 100 L 100 0 Z"
    },
    animate: {
      d: "M 0 0 Q 0 50 0 100 L 100 100 L 100 0 Z",
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.08 }
    },
    exit: {
      d: "M 100 0 Q 100 50 100 100 L 100 100 L 100 0 Z",
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
    }
  };

  const menuLinksVariants = {
    initial: { x: 80, opacity: 0 },
    animate: (idx) => ({
      x: 0,
      opacity: 1,
      transition: { delay: 0.35 + idx * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }),
    exit: (idx) => ({
      x: 40,
      opacity: 0,
      transition: { delay: idx * 0.04, duration: 0.3, ease: 'easeIn' }
    })
  };

  return (
    <>
      <nav
        ref={navRef}
        className="bg-surface-low backdrop-blur-md fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl rounded-full border border-border-subtle z-50 flex justify-between items-center px-6 py-3 shadow-2xl"
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="font-jakarta font-extrabold text-xl tracking-tighter text-on-surface">
            <img src="./logo-growmify-white.png" alt="Growmify Logo" width={100} />
          </Link>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`font-jakarta text-sm transition-all duration-300 ${isActive
                  ? 'text-primary font-bold border-b-2 border-primary pb-0.5'
                  : 'text-on-surface-variant hover:text-primary'
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* CTA & Burger */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/contact')}
            className="hidden md:block bg-[linear-gradient(45deg,var(--tw-gradient-stops))] from-primary  to-secondary text-on-primary px-5 py-2 rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Contact Us
          </button>

          {/* Morphing Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="relative z-50 flex md:hidden flex-col items-center justify-center w-10 h-10 rounded-full border border-border-subtle bg-white/5 backdrop-blur-md cursor-pointer hover:border-primary/50 transition-colors duration-300"
            aria-label="Toggle Menu"
          >
            <div className="flex flex-col gap-1.5 w-5">
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="h-0.5 w-full bg-on-surface rounded-full block origin-center"
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="h-0.5 w-full bg-on-surface rounded-full block origin-center"
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="h-0.5 w-full bg-on-surface rounded-full block origin-center"
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Crazy Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden pointer-events-none"
          >
            {/* SVG Wave 1: Glowing Teal Trailing Curtain */}
            <svg
              className="absolute inset-0 w-full h-full fill-primary/30 z-10"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <motion.path
                variants={wave1Variants}
                initial="initial"
                animate="animate"
                exit="exit"
              />
            </svg>

            {/* SVG Wave 2: Deep Dark Container Main Panel */}
            <svg
              className="absolute inset-0 w-full h-full fill-surface-container z-20 shadow-2xl"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <motion.path
                variants={wave2Variants}
                initial="initial"
                animate="animate"
                exit="exit"
              />
            </svg>

            {/* Content Container */}
            <div className="absolute inset-0 z-30 pointer-events-auto flex flex-col justify-between p-8 pt-32 h-full">
              {/* High-tech Grid Background Pattern overlay */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
                  backgroundSize: '30px 30px',
                }}
              />

              {/* Ambient overlay glow */}
              <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

              {/* Menu Links */}
              <div className="flex flex-col gap-6 my-auto pl-4">
                {NAV_LINKS.map((link, idx) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.div
                      key={link.name}
                      custom={idx}
                      variants={menuLinksVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <Link
                        to={link.path}
                        className={`group relative flex items-baseline gap-4 font-jakarta font-extrabold text-4xl uppercase tracking-tighter transition-all duration-300 ${isActive ? 'text-primary' : 'text-on-surface hover:text-primary'
                          }`}
                      >
                        {/* Numerical indicators */}
                        <span className="font-mono text-xs text-text-muted/60 tracking-normal group-hover:text-primary/70 transition-colors">
                          00{idx + 1}
                        </span>

                        <span>{link.name}</span>

                        <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 text-primary self-center" />
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Staggered Contact CTA Button */}
                <motion.div
                  custom={NAV_LINKS.length}
                  variants={menuLinksVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="pt-6"
                >
                  <button
                    onClick={() => navigate('/contact')}
                    className="w-full sm:w-auto bg-primary text-on-primary font-jakarta font-extrabold text-center py-4 px-8 rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-primary/20 cursor-pointer"
                  >
                    <span>Get in Touch</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              </div>

              {/* Mobile Menu Footer Info */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.7 } }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-between border-t border-border-subtle/30 pt-6 text-[10px] font-mono text-text-muted"
              >
                <div className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-primary/70" />
                  <span>UTC+5 / 2026</span>
                </div>
                <span>Devoured by Details.</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
