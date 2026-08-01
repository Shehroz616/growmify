import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Lock } from 'lucide-react';

export default function Privacy() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      '.policy-fade',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
    );
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen bg-background pt-32 pb-24 px-6 lg:px-16 overflow-hidden">
      {/* Background glow highlights */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-y-1/2 w-[350px] h-[350px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto z-10">
        {/* Navigation & Header */}
        <div className="flex flex-col gap-6 mb-16">
          <Link
            to="/"
            className="policy-fade flex items-center gap-2 text-text-muted hover:text-primary font-mono text-xs uppercase tracking-wider self-start group transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Home
          </Link>

          <div>
            <span className="policy-fade font-mono text-xs text-primary mb-3 tracking-[0.3em] uppercase block">
              REGULATORY
            </span>
            <h1 className="policy-fade font-jakarta font-black text-[clamp(36px,5vw,60px)] tracking-tight text-on-surface-variant leading-none mb-4">
              Privacy <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Policy</span>
            </h1>
            <p className="policy-fade text-text-muted text-sm font-mono uppercase tracking-wider">
              Last Updated: July 3, 2026
            </p>
          </div>
        </div>

        {/* Content body */}
        <div className="policy-fade flex flex-col gap-10 text-on-surface-variant font-jakarta leading-relaxed text-sm sm:text-base border-t border-border-subtle pt-10">
          <div className="flex flex-col gap-4">
            <h2 className="font-jakarta font-bold text-xl text-on-surface-variant flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              1. Information We Collect
            </h2>
            <p>
              We compile and collect informational elements necessary to maintain and deploy high-velocity web experiences:
            </p>
            <ul className="list-disc pl-6 flex flex-col gap-2 font-mono text-xs sm:text-sm text-text-muted">
              <li>Identifiers: Name, Email Address, and candidate profile links when manually provided.</li>
              <li>Network metrics: anonymized load timings, compression ratios, and client hardware attributes (via standard browser hooks).</li>
              <li>User communications: contact form feedback, project details, and inquiries.</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="font-jakarta font-bold text-xl text-on-surface-variant flex items-center gap-2">
              <Shield className="w-5 h-5 text-secondary" />
              2. How We Utilize Information
            </h2>
            <p>
              Information compiled is strictly used to optimize the velocity, efficiency, and aesthetics of Growmify applications:
            </p>
            <p className="pl-4 border-l-2 border-primary/20 italic">
              "We believe details should be devoured for performance, never for surveillance."
            </p>
            <p>
              We process data to monitor system SLA uptimes, dispatch requested project estimates, route applicant credentials, and adjust GSAP rendering performance based on system profiling parameters. We do not sell data to third-party databases.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="font-jakarta font-bold text-xl text-on-surface-variant flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              3. Data Security & Uptime Integrity
            </h2>
            <p>
              We utilize production-grade container protocols and encrypted environments to secure all data transitions. All application communication layers are routed over HTTPS with standard token authentication models.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="font-jakarta font-bold text-xl text-on-surface-variant">
              4. Contact & Compliance
            </h2>
            <p>
              If you have queries, request deletions, or want to audit your information parameters, submit an request through the contact page or reach out directly at:
            </p>
            <span className="font-mono text-xs text-primary bg-primary/5 border border-primary/20 px-4 py-2 rounded-xl w-fit self-start">
              compliance@growmify.com
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
