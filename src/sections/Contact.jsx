import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, Check, Copy, ArrowLeft, Clock } from 'lucide-react';
import TiltedCard from '../components/TiltedCard';
import useInquiryStore from '../store/useInquiryStore';

const PROJECT_TYPES = ['AI & Automation', 'High Performance Web', 'UI Design', 'Consulting', 'Other'];

export default function Contact() {
  const formRef = useRef(null);
  const { submitInquiry } = useInquiryStore();

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [projectType, setProjectType] = useState('AI & Automation');
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle | sending | success

  // Copy Clipboard State
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) tempErrors.message = 'Message is required';

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    setSubmitStatus('sending');
    try {
      await submitInquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        projectType,
        message: formData.message.trim()
      });
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setSubmitStatus('idle');
      alert(`Submission failed: ${err.message}`);
    }
  };

  useEffect(() => {
    gsap.fromTo(
      '.contact-fade',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
    );
  }, []);

  return (
    <section className="relative min-h-screen bg-background pt-32 pb-24 px-6 lg:px-16 overflow-hidden">
      {/* Background glow highlights */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-y-1/2 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Navigation & Header */}
        <div className="flex flex-col gap-6 mb-16">
          <Link
            to="/"
            className="contact-fade flex items-center gap-2 text-text-muted hover:text-primary font-mono text-xs uppercase tracking-wider self-start group transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Home
          </Link>

          <div className="max-w-2xl">
            <h1 className="contact-fade font-jakarta font-extrabold text-[clamp(40px,6vw,64px)] tracking-tight text-on-surface leading-none mb-4">
              Let's Build Something <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Legendary</span>
            </h1>
            <p className="contact-fade text-text-muted text-lg font-jakarta">
              Have a project in mind or looking to optimize compilation speed and scale operations? Reach out and we'll reply within 4 hours.
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & 3D Cards */}
          <div className="contact-fade lg:col-span-5 flex flex-col gap-6">
            <div className="font-mono text-xs uppercase tracking-wider text-primary border border-primary/20 px-4 py-2 rounded-full bg-primary/5 self-start mb-2">
              Direct Contact
            </div>

            {/* Email TiltedCard */}
            <TiltedCard className="p-6 cursor-pointer">
              <div
                className="flex items-start gap-4"
                onClick={() => handleCopy('info@growmify.com', 'email')}
              >
                <div className="p-3 bg-primary/10 border border-primary/20 text-primary rounded-2xl">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="flex-grow">
                  <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider block mb-1">Email us</span>
                  <a
                    href="mailto:info@growmify.com"
                    className="font-jakarta font-extrabold text-lg text-on-surface hover:text-primary transition-colors block"
                    onClick={(e) => e.stopPropagation()}
                  >
                    info@growmify.com
                  </a>
                </div>
                <button className="text-text-muted hover:text-primary transition-colors mt-1">
                  {copiedEmail ? <Check className="w-4.5 h-4.5 text-secondary" /> : <Copy className="w-4.5 h-4.5" />}
                </button>
              </div>
            </TiltedCard>

            {/* Call TiltedCard */}
            <TiltedCard className="p-6 cursor-pointer">
              <div
                className="flex items-start gap-4"
                onClick={() => handleCopy('+923041722220', 'phone')}
              >
                <div className="p-3 bg-secondary/10 border border-secondary/20 text-secondary rounded-2xl">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="flex-grow">
                  <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider block mb-1">Call us</span>
                  <a
                    href="tel:+923041722220"
                    className="font-jakarta font-extrabold text-lg text-on-surface hover:text-secondary transition-colors block"
                    onClick={(e) => e.stopPropagation()}
                  >
                    +92 304 1722220
                  </a>
                </div>
                <button className="text-text-muted hover:text-secondary transition-colors mt-1">
                  {copiedPhone ? <Check className="w-4.5 h-4.5 text-secondary" /> : <Copy className="w-4.5 h-4.5" />}
                </button>
              </div>
            </TiltedCard>

            {/* Location & Timezone Details */}
            <TiltedCard className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-tertiary/10 border border-tertiary/20 text-tertiary rounded-2xl">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider block mb-1">Headquarters</span>
                  <span className="font-jakarta font-extrabold text-lg text-on-surface block">
                    Gujranwala, Pakistan
                  </span>
                  <span className="font-jakarta text-sm text-text-muted mt-1 block">
                    Sahi Plaza 1st Floor
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border-subtle/50 flex items-center gap-2 text-xs font-mono text-text-muted">
                <Clock className="w-4 h-4 text-secondary" />
                <span>Active hours: 8:00 AM - 10:00 PM (GMT+4)</span>
              </div>
            </TiltedCard>
          </div>

          {/* Right Column: Form Panel */}
          <div className="contact-fade lg:col-span-7">
            <div className="glass rounded-3xl p-8 lg:p-10 border border-border-subtle shadow-2xl relative overflow-hidden">
              <AnimatePresence mode="wait">
                {submitStatus === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center text-center py-16"
                  >
                    {/* Success Checkmark Circle */}
                    <div className="w-20 h-20 bg-secondary/10 border border-secondary/30 text-secondary rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(134,219,90,0.2)]">
                      <Check className="w-10 h-10" />
                    </div>

                    <h3 className="font-jakarta font-extrabold text-3xl text-on-surface mb-3">
                      Message Sent!
                    </h3>
                    <p className="text-text-muted text-sm font-jakarta max-w-sm leading-relaxed mb-8">
                      Thank you for reaching out. Our engineering team has received your brief and will contact you within the next 4 hours.
                    </p>

                    <button
                      onClick={() => setSubmitStatus('idle')}
                      className="bg-primary text-on-primary font-jakarta font-bold text-sm px-6 py-3 rounded-full hover:scale-105 active:scale-95 transition-all duration-200"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Project Type Selection */}
                    <div>
                      <label className="font-mono text-xs uppercase tracking-wider text-text-muted block mb-3">
                        What project are you looking to build?
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {PROJECT_TYPES.map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setProjectType(type)}
                            className={`px-4 py-2 rounded-full font-jakarta text-xs font-semibold border transition-all duration-200 ${projectType === type
                              ? 'bg-primary border-primary text-on-primary shadow-[0_0_15px_rgba(7,168,197,0.25)]'
                              : 'bg-surface-container/40 border-border-subtle text-text-muted hover:text-on-surface hover:bg-surface-container-high'
                              }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name input */}
                    <div className="relative">
                      <label className="font-mono text-xs uppercase tracking-wider text-text-muted block mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your name"
                        className={`w-full bg-surface-container/30 border rounded-2xl px-5 py-4 text-on-surface font-jakarta placeholder:text-text-muted/40 focus:outline-none focus:border-primary/50 focus:bg-surface-container/50 focus:shadow-[0_0_15px_rgba(7,168,197,0.1)] transition-all duration-200 ${errors.name ? 'border-error/45 bg-error/5' : 'border-border-subtle'
                          }`}
                      />
                      {errors.name && (
                        <span className="text-error text-xs font-jakarta mt-1 block pl-2">{errors.name}</span>
                      )}
                    </div>

                    {/* Email input */}
                    <div className="relative">
                      <label className="font-mono text-xs uppercase tracking-wider text-text-muted block mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@example.com"
                        className={`w-full bg-surface-container/30 border rounded-2xl px-5 py-4 text-on-surface font-jakarta placeholder:text-text-muted/40 focus:outline-none focus:border-primary/50 focus:bg-surface-container/50 focus:shadow-[0_0_15px_rgba(7,168,197,0.1)] transition-all duration-200 ${errors.email ? 'border-error/45 bg-error/5' : 'border-border-subtle'
                          }`}
                      />
                      {errors.email && (
                        <span className="text-error text-xs font-jakarta mt-1 block pl-2">{errors.email}</span>
                      )}
                    </div>

                    {/* Message input */}
                    <div className="relative">
                      <label className="font-mono text-xs uppercase tracking-wider text-text-muted block mb-2">
                        Project Brief
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your project, performance bottlenecks, or scaling challenges..."
                        rows={4}
                        className={`w-full bg-surface-container/30 border rounded-2xl px-5 py-4 text-on-surface font-jakarta placeholder:text-text-muted/40 focus:outline-none focus:border-primary/50 focus:bg-surface-container/50 focus:shadow-[0_0_15px_rgba(7,168,197,0.1)] transition-all duration-200 resize-none ${errors.message ? 'border-error/45 bg-error/5' : 'border-border-subtle'
                          }`}
                      />
                      {errors.message && (
                        <span className="text-error text-xs font-jakarta mt-1 block pl-2">{errors.message}</span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submitStatus === 'sending'}
                      className="w-full bg-secondary text-on-secondary font-jakarta font-bold text-sm py-4 rounded-2xl hover:scale-[1.01] active:scale-[0.99] disabled:opacity-75 disabled:scale-100 transition-all duration-200 shadow-[0_4px_20px_rgba(134,219,90,0.25)] flex items-center justify-center gap-2 group"
                    >
                      {submitStatus === 'sending' ? (
                        <>
                          <div className="w-5 h-5 border-2 border-on-secondary border-t-transparent rounded-full animate-spin" />
                          <span>Sending Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Request</span>
                          <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
