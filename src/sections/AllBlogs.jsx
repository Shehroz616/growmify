import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Search, ArrowRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Link } from 'react-router-dom';
import SpotlightCard from '../components/SpotlightCard';
import useBlogStore from '../store/useBlogStore';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ['All', 'Engineering', 'Design', 'AI'];

export default function AllBlogs() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef(null);

  const blogs = useBlogStore((s) => s.blogs);
  const fetchBlogs = useBlogStore((s) => s.fetchBlogs);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  useEffect(() => {
    // Scroll header and controls entry animation
    gsap.fromTo(
      '.header-fade-blogs',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
    );
  }, []);

  // Filter and search logic
  const filteredPosts = blogs.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section ref={containerRef} className="relative min-h-screen bg-background pt-32 pb-24 px-6 lg:px-16 overflow-hidden">
      {/* Background glow highlights */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-y-1/2 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Navigation & Header */}
        <div className="flex flex-col gap-6 mb-16">
          <Link
            to="/"
            className="header-fade-blogs flex items-center gap-2 text-text-muted hover:text-primary font-mono text-xs uppercase tracking-wider self-start group transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Home
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-xl">
              <h1 className="header-fade-blogs font-jakarta font-extrabold text-[clamp(40px,6vw,64px)] tracking-tight text-on-surface leading-none mb-4">
                Articles & <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Insights</span>
              </h1>
              <p className="header-fade-blogs text-text-muted text-lg font-jakarta">
                Deep dives into modern compiler optimization, hardware-accelerated designs, and low-latency AI integrations.
              </p>
            </div>

            {/* Search Input */}
            <div className="header-fade-blogs relative w-full lg:w-80 group">
              <span className="absolute inset-y-0 left-4 flex items-center text-text-muted group-focus-within:text-primary transition-colors duration-300">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-surface-container border border-border-subtle rounded-full text-on-surface text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="header-fade-blogs flex flex-wrap items-center gap-3 mb-12">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            const count = category === 'All'
              ? blogs.length
              : blogs.filter((post) => post.category === category).length;

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`font-jakarta text-sm px-5 py-2.5 rounded-full border transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'bg-primary text-on-primary border-primary shadow-lg shadow-primary/20 scale-105'
                    : 'bg-surface-container border-border-subtle text-on-surface-variant hover:text-on-surface hover:border-outline-variant'
                }`}
              >
                <span>{category}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-on-primary/10 text-on-primary' : 'bg-white/5 text-text-muted'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => {
              // Resolve Lucide Icon Component dynamically
              const IconComponent = Icons[post.iconName] || Icons.BookOpen;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={post.id}
                  className="h-full"
                >
                  <Link to={`/blog/${post.id}`} className="block h-full group">
                    <SpotlightCard className="h-full flex flex-col justify-between cursor-pointer">
                      <div className="relative">
                        {/* Image cover */}
                        <div className="w-full aspect-[16/9] overflow-hidden bg-surface-container-low border-b border-border-subtle relative">
                          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60 z-10" />
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                            <span className="bg-background/90 text-on-surface text-xs font-mono px-4 py-2 rounded-full border border-primary/30 flex items-center gap-1.5 backdrop-blur-sm shadow-xl">
                              Read Article <ArrowRight className="w-3.5 h-3.5 text-primary" />
                            </span>
                          </div>
                        </div>

                        {/* Content details */}
                        <div className="p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 bg-white/5 border border-border-subtle rounded text-on-surface-variant flex items-center gap-1.5">
                              <IconComponent className="w-3 h-3 text-primary" />
                              {post.category}
                            </span>
                            <span className="text-white/30 text-xs">•</span>
                            <span className="font-mono text-[10px] text-text-muted">{post.tag}</span>
                          </div>

                          <h3 className="font-jakarta font-bold text-xl text-on-surface mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                            {post.title}
                          </h3>
                          <p className="text-text-muted text-sm font-jakarta line-clamp-3 mb-4">
                            {post.summary}
                          </p>
                        </div>
                      </div>

                      {/* Footer Info */}
                      <div className="px-6 pb-6 border-t border-border-subtle/30 pt-4 mt-auto flex items-center justify-between text-xs font-mono text-text-muted">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </SpotlightCard>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <p className="text-text-muted font-jakarta text-lg">No articles found matching your query.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-4 text-xs font-mono text-primary hover:underline"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
