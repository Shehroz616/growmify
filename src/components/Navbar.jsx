import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import useAppStore from '../store/useAppStore';

const NAV_LINKS = ['Home', 'Showcase', 'Docs', 'Pricing'];

export default function Navbar() {
  const navRef = useRef(null);
  const { activeNav, setActiveNav, isLoaded } = useAppStore();

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

  return (
    <nav
      ref={navRef}
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl rounded-full border border-border-subtle bg-surface-glass backdrop-blur-xl z-50 flex justify-between items-center px-6 py-3 shadow-2xl"
    >
      {/* Logo */}
      <div className="flex items-center gap-2">

        <span className="font-jakarta font-extrabold text-xl tracking-tighter text-on-surface">
          <img src="./logo-growmify-white.png" alt="Growmify Logo" width={100} />
        </span>
      </div>

      {/* Links */}
      <div className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href="#"
            onClick={() => setActiveNav(link)}
            className={`font-jakarta text-sm transition-all duration-300 ${activeNav === link
              ? 'text-primary font-bold border-b-2 border-primary pb-0.5'
              : 'text-on-surface-variant hover:text-on-surface'
              }`}
          >
            {link}
          </a>
        ))}
      </div>

      {/* CTA */}
      <div className="flex items-center gap-4">
        {/* <button className="text-on-surface-variant hover:text-primary transition-all duration-300">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button> */}
        <button className="bg-primary text-on-primary px-5 py-2 rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-all duration-200">
          Contact Us
        </button>
      </div>
    </nav>
  );
}
