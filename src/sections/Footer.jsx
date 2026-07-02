import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FOOTER_LINKS = ['Philosophy', 'Changelog', 'Security', 'Terms'];

export default function Footer() {
  const logoRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      logoRef.current,
      {
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: logoRef.current,
          start: 'top 90%',
        },
      }
    );
  }, { scope: logoRef });

  return (
    <footer className="w-full border-t border-border-subtle bg-background relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary/3 blur-[100px] pointer-events-none" />

      <div className="flex flex-col items-center justify-center py-20 px-8 w-full max-w-7xl mx-auto relative z-10">
        {/* Big logo */}
        <div ref={logoRef} className="flex flex-col items-center mb-12">
          <img src="./logo-growmify-white.png" alt="Growmify Logo" width={350} />
          <p className="font-mono text-sm text-text-muted mt-4">
            © 2026 Growmify. Devoured by Details.
          </p>
        </div>

        {/* Footer links */}
        <div className="flex flex-wrap justify-center gap-10">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="text-text-muted hover:text-on-surface font-mono text-sm transition-all duration-500 hover:tracking-widest"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Social icons */}
        <div className="mt-16 flex items-center gap-6">
          {/* Facebook */}
          <a
            href="#" target='_blank'
            className="w-12 h-12 rounded-full border border-border-subtle flex items-center justify-center text-on-surface hover:border-primary hover:text-primary transition-all duration-300"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
          </a>
          {/* Instagram */}
          <a
            href="https://www.instagram.com/growmify.official/" target='_blank'
            className="w-12 h-12 rounded-full border border-border-subtle flex items-center justify-center text-on-surface hover:border-primary hover:text-primary transition-all duration-300"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/company/growmify/" target='_blank'
            className="w-12 h-12 rounded-full border border-border-subtle flex items-center justify-center text-on-surface hover:border-primary hover:text-primary transition-all duration-300"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        </div>

        <div className="mt-12">
          <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest text-center">
            Copyright © 2026 Growmify. Devoured by Details.
          </p>
        </div>
      </div>
    </footer>
  );
}
