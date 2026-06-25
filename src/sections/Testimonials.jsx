import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';
import SpotlightCard from '../components/SpotlightCard';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS_DATA = [
  {
    quote: "The platform speedup of 4.2x literally doubled our conversion rate in 3 weeks. The custom React engineering is incredibly clean.",
    author: "Sarah Jenkins",
    role: "VP of Growth",
    company: "ScaleFlow",
    avatarColor: "from-primary/30 to-primary/5",
    initials: "SJ",
    rating: 5,
  },
  {
    quote: "Our infrastructure costs dropped by 40% while capturing $3.2M in new pipeline. Their full-stack execution exceeded all expectations.",
    author: "David Chen",
    role: "Founder",
    company: "TechStart Inc.",
    avatarColor: "from-secondary/30 to-secondary/5",
    initials: "DC",
    rating: 5,
  },
  {
    quote: "Shipping native Android & iOS code concurrently saved us months of dev cycles. The performance is close to native SwiftUI/Kotlin.",
    author: "Amara Okafor",
    role: "Head of Product",
    company: "VeloMobile",
    avatarColor: "from-tertiary/30 to-tertiary/5",
    initials: "AO",
    rating: 5,
  },
];

function TestimonialCard({ review }) {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
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
          trigger: cardRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <div ref={cardRef}>
      <SpotlightCard className="p-8 h-full flex flex-col justify-between min-h-[300px]">
        <div>
          {/* Star Rating */}
          <div className="flex items-center gap-1 mb-6">
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
            ))}
          </div>

          {/* Quote Text */}
          <p className="text-on-surface-variant font-jakarta italic text-[15px] leading-relaxed mb-8">
            "{review.quote}"
          </p>
        </div>

        {/* User Info Footer */}
        <div className="flex items-center gap-4 mt-auto">
          {/* Custom Avatar with brand gradient */}
          <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${review.avatarColor} border border-border-subtle flex items-center justify-center font-mono text-sm text-on-surface font-extrabold shrink-0`}>
            {review.initials}
          </div>

          <div>
            <h4 className="font-jakarta font-bold text-sm text-on-surface">
              {review.author}
            </h4>
            <p className="font-mono text-[10px] text-text-muted uppercase tracking-wider">
              {review.role} — <span className="text-primary font-bold">{review.company}</span>
            </p>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
}

export default function Testimonials() {
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
    <section className="py-32 px-8 relative overflow-hidden bg-background">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div ref={headingRef} className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="font-jakarta font-extrabold text-[clamp(36px,5vw,56px)] tracking-tight text-on-surface leading-none">
              Client Appraisals
            </h2>
            <p className="text-text-muted text-lg max-w-md mt-4 font-jakarta">
              Real feedback from companies scaling and accelerating their products with us.
            </p>
          </div>
          <div className="font-mono text-xs text-primary border border-primary/20 px-4 py-2 rounded-full bg-primary/5 shrink-0">
            003 / PARTNERS
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((review, idx) => (
            <TestimonialCard key={idx} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
