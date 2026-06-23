import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Galaxy from '../components/Galaxy'

gsap.registerPlugin(ScrollTrigger);

function BentoCard({ children, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export default function Services() {
  const headingRef = useRef(null);

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

  return (
    <section className="w-full py-32 px-8 relative z-10">
      <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: -1 }}>
        <Galaxy
          mouseRepulsion={false}
          mouseInteraction
          density={0.5}
          glowIntensity={0.2}
          saturation={0}
          hueShift={0}
          twinkleIntensity={0.2}
          rotationSpeed={0.1}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.5}
          speed={0.7}
        />
      </div>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          ref={headingRef}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div>
            <h2 className="font-jakarta font-extrabold text-[clamp(36px,5vw,56px)] tracking-tight text-on-surface leading-none">
              Expertise Stack
            </h2>
            <p className="text-text-muted text-lg max-w-md mt-4 font-jakarta">
              Full-stack engineering across web and mobile. Production-grade systems built with the right tools.
            </p>
          </div>
          <div className="font-mono text-xs text-primary border border-primary/20 px-4 py-2 rounded-full bg-primary/5 shrink-0">
            001 / SERVICES
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* MERN Stack — large hero card */}
          <BentoCard className="md:col-span-8 group relative overflow-hidden rounded-3xl bg-surface-container border border-border-subtle hover:border-primary/50 transition-all duration-500 min-h-[380px]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="p-8 relative h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                    </svg>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-tighter px-2 py-1 bg-primary/10 rounded text-primary border border-primary/20">
                    Full Stack
                  </span>
                </div>
                <h3 className="font-jakarta font-bold text-4xl text-on-surface mb-4">
                  MERN Stack
                </h3>
                <p className="text-text-muted max-w-lg font-jakarta">
                  End-to-end web applications with MongoDB, Express.js, React, and Node.js. REST & GraphQL APIs,
                  JWT auth, real-time features via Socket.io, and production-ready CI/CD pipelines.
                </p>
              </div>

              {/* Frontend / Backend split */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white/5 border border-border-subtle rounded-2xl p-4">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-3">Frontend</p>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Next.js', 'TypeScript', 'Tailwind', 'Redux'].map((t) => (
                      <span key={t} className="font-mono text-xs px-3 py-1 border border-border-subtle rounded-full text-on-surface-variant">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-white/5 border border-border-subtle rounded-2xl p-4">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-3">Backend</p>
                  <div className="flex flex-wrap gap-2">
                    {['Node.js', 'Express', 'MongoDB', 'GraphQL', 'Socket.io'].map((t) => (
                      <span key={t} className="font-mono text-xs px-3 py-1 border border-border-subtle rounded-full text-on-surface-variant">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Orb */}
            <div className="absolute right-0 bottom-0 w-72 h-72 opacity-0 group-hover:opacity-100 transition-all duration-1000 transform translate-x-24 translate-y-24 group-hover:translate-x-0 group-hover:translate-y-0 pointer-events-none">
              <div className="w-full h-full bg-primary rounded-full blur-[100px]" />
            </div>
          </BentoCard>

          {/* Android */}
          <BentoCard className="md:col-span-4 group relative overflow-hidden rounded-3xl bg-surface-container-high border border-border-subtle hover:border-secondary/50 transition-all duration-500">
            <div className="p-8 flex flex-col h-full min-h-[380px]">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
                <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.523 15.341c-.297 0-.54-.243-.54-.54V9.196c0-.297.243-.54.54-.54.298 0 .54.243.54.54v5.605c0 .297-.242.54-.54.54zm-11.046 0c-.297 0-.54-.243-.54-.54V9.196c0-.297.243-.54.54-.54.298 0 .54.243.54.54v5.605c0 .297-.242.54-.54.54zm2.5 2.999c0 .297-.242.54-.54.54H7.9c-.297 0-.54-.243-.54-.54v-5.65c0-.297.243-.54.54-.54s.54.243.54.54v5.65zm7.069 0c0 .297-.242.54-.54.54s-.54-.243-.54-.54v-5.65c0-.297.243-.54.54-.54s.54.243.54.54v5.65zm-.93-11.43 1.24-2.149a.27.27 0 00-.467-.27l-1.256 2.175A7.6 7.6 0 0012 6c-.92 0-1.797.165-2.616.466L8.128 4.291a.27.27 0 00-.467.27l1.24 2.15A7.572 7.572 0 004.5 12.5h15c0-2.24-.975-4.248-2.514-5.59z" />
                </svg>
              </div>
              <h3 className="font-jakarta font-bold text-3xl text-on-surface mb-3">
                Android
              </h3>
              <p className="text-text-muted font-jakarta">
                Native Android apps with Jetpack Compose and Kotlin. MVVM architecture, Room DB,
                Retrofit, Firebase integration, and Play Store delivery.
              </p>
              <div className="mt-auto pt-6 space-y-3">
                {[
                  { label: 'Kotlin / Compose', value: 92 },
                  { label: 'Retrofit / Room', value: 85 },
                  { label: 'Firebase / KMM', value: 78 },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div className="w-full h-1 bg-border-subtle rounded-full overflow-hidden">
                      <div className="h-full bg-secondary rounded-full" style={{ width: `${value}%` }} />
                    </div>
                    <div className="flex justify-between mt-1 font-mono text-[10px] text-text-muted uppercase">
                      <span>{label}</span>
                      <span>{value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* iOS card */}
          <BentoCard className="md:col-span-4 glass rounded-3xl p-8 flex flex-col justify-between min-h-[280px]">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                {/* Apple-style icon */}
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
              </div>
              <h4 className="font-jakarta font-bold text-xl text-on-surface mb-2">iOS Development</h4>
              <p className="text-text-muted text-sm font-jakarta">
                SwiftUI-first apps with UIKit where precision demands it. CoreData, Combine, push notifications, and App Store publishing covered.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {['Swift', 'SwiftUI', 'UIKit', 'CoreData', 'Combine'].map((t) => (
                <span key={t} className="font-mono text-[10px] px-3 py-1 border border-white/10 rounded-full text-on-surface-variant">
                  {t}
                </span>
              ))}
            </div>
          </BentoCard>

          {/* Cross-platform card */}
          <BentoCard className="md:col-span-4 glass rounded-3xl p-8 flex flex-col justify-between min-h-[280px]">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18H12.01M8 21H16C17.1046 21 18 20.1046 18 19V5C18 3.89543 17.1046 3 16 3H8C6.89543 3 6 3.89543 6 5V19C6 20.1046 6.89543 21 8 21Z" />
                </svg>
              </div>
              <h4 className="font-jakarta font-bold text-xl text-on-surface mb-2">Cross-platform</h4>
              <p className="text-text-muted text-sm font-jakarta">
                Write once, ship everywhere. React Native and Flutter for shared business logic with a native UI feel on both iOS and Android.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {['React Native', 'Flutter', 'Expo', 'Dart'].map((t) => (
                <span key={t} className="font-mono text-[10px] px-3 py-1 border border-white/10 rounded-full text-on-surface-variant">
                  {t}
                </span>
              ))}
            </div>
          </BentoCard>

     
          {/* Databases card */}
          <BentoCard className="md:col-span-4 group relative overflow-hidden rounded-3xl bg-surface-container-high border border-border-subtle hover:border-secondary/50 transition-all duration-500">
            <div className="p-8 flex flex-col h-full min-h-[260px]">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
                <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7C4 5.34315 7.58172 4 12 4C16.4183 4 20 5.34315 20 7M4 7V17C4 18.6569 7.58172 20 12 20C16.4183 20 20 18.6569 20 17V7M4 7C4 8.65685 7.58172 10 12 10C16.4183 10 20 8.65685 20 7M20 12C20 13.6569 16.4183 15 12 15C7.58172 15 4 13.6569 4 12" />
                </svg>
              </div>
              <h3 className="font-jakarta font-bold text-2xl text-on-surface mb-3">Databases</h3>
              <p className="text-text-muted text-sm font-jakarta mb-6">
                Relational and document stores — pick the right engine for the job.
              </p>
              <div className="mt-auto space-y-4">
                <div>
                  <p className="font-mono text-[10px] uppercase text-text-muted mb-2">NoSQL</p>
                  <div className="flex gap-2">
                    {['MongoDB', 'Firebase', 'Redis'].map((t) => (
                      <span key={t} className="font-mono text-xs px-3 py-1 border border-border-subtle rounded-full text-on-surface-variant">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase text-text-muted mb-2">SQL</p>
                  <div className="flex gap-2">
                    {['PostgreSQL', 'MySQL'].map((t) => (
                      <span key={t} className="font-mono text-xs px-3 py-1 border border-border-subtle rounded-full text-on-surface-variant">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}