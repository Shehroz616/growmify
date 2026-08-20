import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Zap, Sparkles, Laptop, BookOpen, Heart, Send, Check, Briefcase, ChevronRight } from 'lucide-react';
import SpotlightCard from '../components/SpotlightCard';
import useCareerStore from '../store/useCareerStore';
import SEO from '../components/SEO';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PERKS = [
  {
    title: 'Remote-First',
    desc: 'Work from anywhere in the world. We focus on velocity and asynchronous communication over timezone presence.',
    icon: Laptop,
    color: '#07a8c5'
  },
  {
    title: 'Workstation Budget',
    desc: 'Get fully equipped with an annual budget for high-end monitors, keyboards, software, and comfortable setups.',
    icon: Zap,
    color: '#86db5a'
  },
  {
    title: 'Continuous Evolution',
    desc: 'Paid courses, books, developer conference tickets, and designated learning days to ensure you devoured every detail.',
    icon: BookOpen,
    color: '#b7c8e1'
  },
  {
    title: 'Unlimited Time Off',
    desc: 'Take the time you need to rest and recharge. We measure results, not the hours logged at a desk.',
    icon: Heart,
    color: '#a855f7'
  }
];

export default function Careers() {
  const containerRef = useRef(null);
  const formSectionRef = useRef(null);

  const ROLES = useCareerStore((s) => s.roles);
  const fetchCareers = useCareerStore((s) => s.fetchCareers);

  useEffect(() => {
    fetchCareers();
  }, [fetchCareers]);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    portfolio: '',
    message: ''
  });

  // Select first role dynamically once fetched
  useEffect(() => {
    if (ROLES.length > 0 && !formData.role) {
      setFormData((prev) => ({ ...prev, role: ROLES[0].id || ROLES[0]._id }));
    }
  }, [ROLES, formData.role]);

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle | sending | success

  useGSAP(() => {
    // Fade-in entry animations
    gsap.fromTo(
      '.careers-fade',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
    );

    // Staggered perk cards
    gsap.fromTo(
      '.perk-card',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.perks-grid-root',
          start: 'top 85%',
        }
      }
    );

    // Staggered role items
    gsap.fromTo(
      '.role-item',
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.roles-list-root',
          start: 'top 85%',
        }
      }
    );
  }, { scope: containerRef });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleApplyClick = (roleId) => {
    setFormData((prev) => ({ ...prev, role: roleId }));
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {};

    if (!formData.name.trim()) tempErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email';
    }
    if (!formData.portfolio.trim()) {
      tempErrors.portfolio = 'Portfolio or Resume link is required';
    } else if (!/^https?:\/\/.+/.test(formData.portfolio)) {
      tempErrors.portfolio = 'Please enter a valid URL (starting with http:// or https://)';
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    setSubmitStatus('sending');
    // Simulate submission delay
    setTimeout(() => {
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        role: 'ui-eng',
        portfolio: '',
        message: ''
      });
    }, 2000);
  };

  return (
    <section ref={containerRef} className="relative min-h-screen bg-background pt-32 pb-24 px-6 lg:px-16 overflow-hidden">
      <SEO
        title="Careers - Join the Engineering & Design Team"
        description="Explore career opportunities at Growmify. Work with cutting-edge technologies like React, custom AI engines, and immersive interfaces to shape the future of tech."
        keywords="growmify careers, developer jobs, react engineer jobs, remote tech jobs, UI engineer careers"
        canonical="https://growmify.com/careers"
      />
      {/* Ambient glowing blobs */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 translate-y-1/2 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Navigation & Header */}
        <div className="flex flex-col gap-6 mb-20">
          <Link
            to="/"
            className="careers-fade flex items-center gap-2 text-text-muted hover:text-primary font-mono text-xs uppercase tracking-wider self-start group transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Home
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <span className="careers-fade font-mono text-xs text-primary mb-3 tracking-[0.3em] uppercase block">
                CAREERS
              </span>
              <h1 className="careers-fade font-jakarta font-black text-[clamp(40px,6vw,72px)] tracking-tight text-on-surface-variant leading-none mb-6">
                Join The <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Velocity</span>
              </h1>
              <p className="careers-fade text-text-muted text-lg font-jakarta leading-relaxed">
                We are searching for detail-oriented, high-performance individuals who want to redefine what is possible in design, engineering, and digital automation. Devour details with us.
              </p>
            </div>

            {/* Total roles counter display */}
            <div className="careers-fade flex items-center gap-6 border border-border-subtle bg-surface-container/30 backdrop-blur-md rounded-2xl px-6 py-4 self-start lg:self-end">
              <div className="flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-primary" />
                <div>
                  <span className="block font-jakarta font-extrabold text-lg text-on-surface">{ROLES.length}</span>
                  <span className="block font-mono text-[9px] text-text-muted uppercase">Open Positions</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: Perks / Benefits */}
        <div className="mb-32">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <h2 className="font-jakarta font-extrabold text-3xl sm:text-4xl text-on-surface-variant tracking-tight">
                Our Work Ecosystem
              </h2>
              <p className="text-text-muted text-sm mt-2 font-jakarta max-w-md">
                We design environments that enable extreme creativity and technical mastery.
              </p>
            </div>

          </div>

          <div className="perks-grid-root grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PERKS.map((perk, idx) => {
              const IconComp = perk.icon;
              return (
                <div key={idx} className="perk-card">
                  <SpotlightCard className="p-8 h-full flex flex-col" spotlightColor={`rgba(134, 219, 90, 0.06)`}>
                    <div className="p-4 bg-primary/5 border border-border-subtle text-primary rounded-2xl w-fit mb-6">
                      <IconComp className="w-6 h-6" style={{ color: perk.color }} />
                    </div>
                    <h3 className="font-jakarta font-bold text-lg text-on-surface mb-3">
                      {perk.title}
                    </h3>
                    <p className="text-text-muted text-xs sm:text-sm font-jakarta leading-relaxed">
                      {perk.desc}
                    </p>
                  </SpotlightCard>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Open Roles */}
        <div className="mb-32">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <div>
              <h2 className="font-jakarta font-extrabold text-3xl sm:text-4xl text-on-surface-variant tracking-tight">
                Open Opportunities
              </h2>
              <p className="text-text-muted text-sm mt-2 text-on-surface-variant font-jakarta max-w-md">
                Explore our vacancies and find where your passion aligns with our velocity.
              </p>
            </div>

          </div>

          <div className="roles-list-root flex flex-col gap-6 max-w-4xl mx-auto">
            {ROLES.map((role) => (
              <div
                key={role.id}
                className="role-item glass rounded-3xl p-6 md:p-8 hover:border-primary/20 hover:shadow-[0_15px_35px_rgba(7,168,197,0.08)] transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-secondary px-2.5 py-1 rounded bg-secondary/5 border border-secondary/15">
                      {role.dept}
                    </span>
                    <span className="font-mono text-[10px] text-text-muted">
                      {role.type}
                    </span>
                  </div>
                  <h3 className="font-jakarta font-extrabold text-xl sm:text-2xl text-on-surface-variant mb-3">
                    {role.title}
                  </h3>
                  <p className="text-text-muted text-xs sm:text-sm font-jakarta leading-relaxed mb-4">
                    {role.desc}
                  </p>

                  {/* Requirements sub-list */}
                  <div className="flex flex-col gap-1.5 mt-2">
                    {role.requirements.map((req, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] sm:text-xs text-on-surface-variant font-mono">
                        <ChevronRight className="w-3 h-3 text-primary shrink-0" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleApplyClick(role.id)}
                  className="bg-primary/10 border border-primary/20 hover:bg-primary hover:text-on-primary text-primary px-6 py-3 rounded-2xl font-jakarta font-bold text-xs sm:text-sm transition-all duration-300 self-start md:self-center shrink-0 flex items-center gap-1"
                >
                  <span>Apply Now</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Application Form */}
        <div ref={formSectionRef} className="max-w-xl mx-auto border border-border-subtle rounded-3xl bg-surface-container p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-50 pointer-events-none" />

          <AnimatePresence mode="wait">
            {submitStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8 flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-secondary/10 border border-secondary/20 text-secondary flex items-center justify-center mb-2 animate-bounce">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-jakarta font-extrabold text-2xl text-on-surface">
                  Submission Transmitted
                </h3>
                <p className="text-text-muted text-sm font-jakarta max-w-sm">
                  We have successfully parsed and processed your data. Our design/engineering team will respond within 48 hours.
                </p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="mt-6 font-mono text-xs text-primary hover:text-on-surface transition-colors"
                >
                  Submit another application
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-center mb-8">
                  <h3 className="font-jakarta font-extrabold text-2xl sm:text-3xl text-on-surface mb-2">
                    Transmit Application
                  </h3>
                  <p className="text-text-muted text-xs sm:text-sm font-jakarta">
                    Submit your credentials to enter the queue.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Name field */}
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-text-muted mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. John Doe"
                      className={`w-full bg-background border rounded-2xl px-4 py-3.5 text-sm font-jakarta text-on-surface focus:outline-none transition-all duration-300 ${errors.name ? 'border-red-400 focus:border-red-400' : 'border-border-subtle focus:border-primary'
                        }`}
                    />
                    {errors.name && (
                      <span className="block font-mono text-[10px] text-red-400 mt-1.5">{errors.name}</span>
                    )}
                  </div>

                  {/* Email field */}
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-text-muted mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. john@example.com"
                      className={`w-full bg-background border rounded-2xl px-4 py-3.5 text-sm font-jakarta text-on-surface focus:outline-none transition-all duration-300 ${errors.email ? 'border-red-400 focus:border-red-400' : 'border-border-subtle focus:border-primary'
                        }`}
                    />
                    {errors.email && (
                      <span className="block font-mono text-[10px] text-red-400 mt-1.5">{errors.email}</span>
                    )}
                  </div>

                  {/* Role selection dropdown */}
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-text-muted mb-2">
                      Target Position
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full bg-background border border-border-subtle rounded-2xl px-4 py-3.5 text-sm font-jakarta text-on-surface focus:outline-none focus:border-primary cursor-pointer transition-all duration-300"
                    >
                      {ROLES.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Resume / Portfolio Link */}
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-text-muted mb-2">
                      Portfolio or Resume Link
                    </label>
                    <input
                      type="text"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleInputChange}
                      placeholder="https://..."
                      className={`w-full bg-background border rounded-2xl px-4 py-3.5 text-sm font-jakarta text-on-surface focus:outline-none transition-all duration-300 ${errors.portfolio ? 'border-red-400 focus:border-red-400' : 'border-border-subtle focus:border-primary'
                        }`}
                    />
                    {errors.portfolio && (
                      <span className="block font-mono text-[10px] text-red-400 mt-1.5">{errors.portfolio}</span>
                    )}
                  </div>

                  {/* Message field */}
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-text-muted mb-2">
                      Comments / Message (Optional)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Tell us what digital details you've devoured recently..."
                      className="w-full bg-background border border-border-subtle rounded-2xl px-4 py-3.5 text-sm font-jakarta text-on-surface focus:outline-none focus:border-primary resize-none transition-all duration-300"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitStatus === 'sending'}
                    className="w-full bg-primary text-on-primary font-jakarta font-bold text-center py-4 rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 shadow-lg shadow-primary/10 cursor-pointer disabled:opacity-55"
                  >
                    {submitStatus === 'sending' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
