import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scale, Cpu, FileText } from 'lucide-react';
import SEO from '../components/SEO';

export default function Terms() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      '.terms-fade',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
    );
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen bg-background pt-32 pb-24 px-6 lg:px-16 overflow-hidden">
      <SEO
        title="Terms & Conditions"
        description="Read Growmify's Terms and Conditions to understand the rules and guidelines for using our website, services, and software platforms."
        keywords="terms and conditions, growmify terms, user agreement"
        canonical="https://growmify.com/terms"
      />
      {/* Background glow highlights */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-y-1/2 w-[350px] h-[350px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto z-10">
        {/* Navigation & Header */}
        <div className="flex flex-col gap-6 mb-16">
          <Link
            to="/"
            className="terms-fade flex items-center gap-2 text-text-muted hover:text-primary font-mono text-xs uppercase tracking-wider self-start group transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Home
          </Link>

          <div>
            <span className="terms-fade font-mono text-xs text-primary mb-3 tracking-[0.3em] uppercase block">
              AGREEMENT
            </span>
            <h1 className="terms-fade font-jakarta font-black text-[clamp(36px,5vw,60px)] tracking-tight text-on-surface-variant leading-none mb-4">
              Terms & <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Conditions</span>
            </h1>
            <p className="terms-fade text-text-muted text-sm font-mono uppercase tracking-wider">
              Last Updated: July 3, 2026
            </p>
          </div>
        </div>

        {/* Content body */}
        <div className="terms-fade flex flex-col gap-10 text-on-surface-variant font-jakarta leading-relaxed text-sm sm:text-base border-t border-border-subtle pt-10">
          <div className="flex flex-col gap-4">
            <h2 className="font-jakarta font-bold text-xl text-on-surface-variant flex items-center gap-2">
              <Scale className="w-5 h-5 text-primary" />
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and utilizing applications, custom code compilation libraries, and systems deployed by Growmify ("Services"), you explicitly agree to align with these terms. If you do not consent to these configurations, stop accessing the Services immediately.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="font-jakarta font-bold text-xl text-on-surface-variant flex items-center gap-2">
              <Cpu className="w-5 h-5 text-secondary" />
              2. Intellectual Property
            </h2>
            <p>
              Unless otherwise documented in bespoke client design agreements, all logic layers, custom vector illustrations, React components, GSAP timeline designs, and system architectures developed by Growmify are proprietary assets. Users receive license permissions restricted to deployed target sites according to terms of service contracts.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="font-jakarta font-bold text-xl text-on-surface-variant flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              3. Limit of Liability & SLA Tolerances
            </h2>
            <p>
              While we engineer and optimize layouts for maximum velocity and search engine indexing performance, client results may fluctuate based on third-party API configurations, browser updates, and structural mutations. Growmify is not liable for indirect damages, conversion deviations, or database interruptions resulting from third-party hosting dependencies.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="font-jakarta font-bold text-xl text-on-surface-variant">
              4. Service Adjustments
            </h2>
            <p>
              We reserve rights to mutate, adapt, or update rendering parameters of our web systems to comply with modern security guidelines or framework versions without prior warnings.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
