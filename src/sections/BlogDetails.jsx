import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Share2, CheckCircle2, ArrowRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import useBlogStore from '../store/useBlogStore';
import SpotlightCard from '../components/SpotlightCard';

export default function BlogDetails() {
  const { id } = useParams();
  const [isCopied, setIsCopied] = useState(false);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlogById = useBlogStore((s) => s.fetchBlogById);
  const blogs = useBlogStore((s) => s.blogs);

  // Load post when ID changes
  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      const data = await fetchBlogById(id);
      setPost(data);
      setLoading(false);
    };
    loadPost();
  }, [id, fetchBlogById]);

  // Auto-scroll to top on mount / id change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <section className="min-h-screen bg-background flex flex-col items-center justify-center py-20 px-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
        <p className="text-text-muted font-jakarta">Loading article details...</p>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="min-h-screen bg-background flex flex-col items-center justify-center py-20 px-8 text-center">
        <h2 className="font-jakarta font-extrabold text-3xl text-on-surface mb-4">Article Not Found</h2>
        <p className="text-text-muted mb-8 max-w-sm">The article you are trying to view does not exist or has been moved.</p>
        <Link
          to="/blogs"
          className="bg-primary text-on-primary px-6 py-3 rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-all duration-200"
        >
          Back to Articles
        </Link>
      </section>
    );
  }

  // Get related/other posts (excluding the current one)
  const relatedPosts = blogs
    .filter((p) => p._id !== post._id && p.id?.toString() !== post.id?.toString())
    .slice(0, 2);

  // Copy share link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const IconComponent = Icons[post.iconName] || Icons.BookOpen;

  return (
    <section className="relative min-h-screen bg-background pt-32 pb-24 px-6 lg:px-16 overflow-hidden">
      {/* Background glow highlights */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/2 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/2 blur-[120px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto z-10">
        
        {/* Back and Share actions */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/blogs"
            className="flex items-center gap-2 text-text-muted hover:text-primary font-mono text-xs uppercase tracking-wider group transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Articles
          </Link>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-border-subtle bg-surface-container/50 text-xs font-mono text-text-muted hover:text-primary hover:border-primary/30 transition-all duration-300"
          >
            {isCopied ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Article</span>
              </>
            )}
          </button>
        </div>

        {/* Hero banner */}
        <div className="w-full aspect-[21/9] md:aspect-[2.39/1] relative overflow-hidden bg-surface-container-low border border-border-subtle rounded-3xl mb-10 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60 z-10" />
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-6 left-8 right-8 z-20">
            <span className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 bg-primary text-on-primary rounded font-bold">
              {post.category}
            </span>
          </div>
        </div>

        {/* Article Meta Header */}
        <div className="mb-8">
          <h1 className="font-jakarta font-extrabold text-3xl md:text-5xl text-on-surface leading-tight tracking-tight mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-text-muted pb-6 border-b border-border-subtle/30">
            <span className="font-semibold text-on-surface-variant">{post.author}</span>
            <span className="text-white/20">•</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary/70" />
              <span>{post.date}</span>
            </div>
            <span className="text-white/20">•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-primary/70" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        {/* Body content rendering dynamically */}
        <div className="prose prose-invert max-w-none text-on-surface-variant font-jakarta space-y-6 text-base md:text-lg leading-relaxed mb-16">
          <p className="text-xl text-text-muted font-medium italic mb-8">
            {post.summary}
          </p>

          {post.body.map((block, idx) => {
            if (block.type === 'paragraph') {
              return <p key={idx}>{block.text}</p>;
            }
            if (block.type === 'heading') {
              return (
                <h3 key={idx} className="text-2xl font-bold text-on-surface pt-6 pb-2 font-jakarta">
                  {block.text}
                </h3>
              );
            }
            if (block.type === 'code') {
              return (
                <pre key={idx} className="bg-background-deep p-5 rounded-2xl border border-border-subtle font-mono text-sm overflow-x-auto text-primary shadow-inner my-6 leading-relaxed">
                  <code>{block.text}</code>
                </pre>
              );
            }
            if (block.type === 'list') {
              return (
                <ul key={idx} className="list-disc pl-6 space-y-3 my-6">
                  {block.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="text-on-surface-variant">
                      {item}
                    </li>
                  ))}
                </ul>
              );
            }
            return null;
          })}
        </div>

        {/* CTA Footer card */}
        <div className="p-8 rounded-3xl bg-surface-container border border-border-subtle/50 flex flex-col md:flex-row items-center justify-between gap-6 mb-20 shadow-xl">
          <div>
            <h4 className="font-jakarta font-bold text-lg text-on-surface mb-1">
              Want high performance integrations like this?
            </h4>
            <p className="text-text-muted text-sm font-jakarta">
              Let's optimize your platforms, systems, and AI models for scale.
            </p>
          </div>
          <Link
            to="/contact"
            className="bg-primary text-on-primary px-6 py-3 rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-all duration-200 shrink-0 flex items-center gap-2 shadow-lg shadow-primary/20"
          >
            <span>Let's talk</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="border-t border-border-subtle/30 pt-16">
            <h3 className="font-jakarta font-extrabold text-2xl text-on-surface mb-8">
              Related Articles
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost) => {
                const RelatedIcon = Icons[relatedPost.iconName] || Icons.BookOpen;
                return (
                  <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`} className="group">
                    <SpotlightCard className="h-full flex flex-col justify-between cursor-pointer">
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 bg-white/5 border border-border-subtle rounded text-on-surface-variant flex items-center gap-1">
                            <RelatedIcon className="w-2.5 h-2.5 text-primary" />
                            {relatedPost.category}
                          </span>
                        </div>
                        <h4 className="font-jakarta font-bold text-lg text-on-surface line-clamp-2 group-hover:text-primary transition-colors duration-300">
                          {relatedPost.title}
                        </h4>
                      </div>
                      <div className="px-6 pb-6 pt-2 flex items-center justify-between text-[10px] font-mono text-text-muted">
                        <span>{relatedPost.date}</span>
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </SpotlightCard>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
