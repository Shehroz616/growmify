import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Link } from 'react-router-dom';
import SpotlightCard from '../components/SpotlightCard';
import useBlogStore from '../store/useBlogStore';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ['All', 'Engineering', 'Design', 'AI'];

export default function Blogs() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const headingRef = useRef(null);
  const cardsContainerRef = useRef(null);

  const blogs = useBlogStore((s) => s.blogs);
  const fetchBlogs = useBlogStore((s) => s.fetchBlogs);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Filter posts based on category
  const filteredPosts = selectedCategory === 'All'
    ? blogs
    : blogs.filter(post => post.category === selectedCategory);

  // GSAP animation on scroll
  useEffect(() => {
    const heading = headingRef.current;

    gsap.fromTo(
      heading,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: heading,
          start: 'top 85%',
        }
      }
    );
  }, []);

  return (
    <section className="w-full py-32 px-8 relative z-10 overflow-hidden border-t border-border-subtle bg-background">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/2 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/2 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div ref={headingRef} className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="font-jakarta font-extrabold text-[clamp(36px,5vw,56px)] tracking-tight text-on-surface leading-none">
              Latest Insights
            </h2>
            <p className="text-text-muted text-lg max-w-md mt-4 font-jakarta">
              Engineering breakthroughs, immersive interface design patterns, and low-latency AI implementations.
            </p>
          </div>
          <div className="font-mono text-xs text-primary border border-primary/20 px-4 py-2 rounded-full bg-primary/5 shrink-0">
            005 / BLOGS
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            const count = category === 'All'
              ? blogs.length
              : blogs.filter(post => post.category === category).length;

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`font-jakarta text-sm px-5 py-2.5 rounded-full border transition-all duration-300 flex items-center gap-2 ${isActive
                    ? 'bg-primary text-on-primary border-primary shadow-lg shadow-primary/20 scale-105'
                    : 'bg-surface-container border-border-subtle text-on-surface-variant hover:text-on-surface hover:border-outline-variant'
                  }`}
              >
                <span>{category}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${isActive ? 'bg-on-primary/10 text-on-primary' : 'bg-white/5 text-text-muted'
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
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => {
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

        {/* View All Articles Button */}
        <div className="mt-16 flex justify-center">
          <Link
            to="/blogs"
            className="flex items-center gap-2 px-8 py-3.5 rounded-full border border-primary/20 bg-primary/5 font-jakarta font-bold text-sm text-primary hover:bg-primary hover:text-on-primary hover:border-primary transition-all duration-300 shadow-lg shadow-primary/5 hover:scale-105 active:scale-95 group"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

      </div>
    </section>
  );
}
