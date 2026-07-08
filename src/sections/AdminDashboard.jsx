import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, Search, Edit, Trash2, Calendar, FileText, Cpu, Palette, Sparkles, AlertTriangle } from 'lucide-react';
import useBlogStore from '../store/useBlogStore';
import useAuthStore from '../store/useAuthStore';

export default function AdminDashboard() {
  const { blogs, loading, error, fetchBlogs, deleteBlog } = useBlogStore();
  const { token } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteBlog(id, token);
      } catch (err) {
        alert(`Failed to delete blog: ${err.message}`);
      }
    }
  };

  // Metrics counts
  const totalBlogs = blogs.length;
  const engineeringCount = blogs.filter((b) => b.category === 'Engineering').length;
  const designCount = blogs.filter((b) => b.category === 'Design').length;
  const aiCount = blogs.filter((b) => b.category === 'AI').length;

  // Filter list
  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Engineering':
        return Cpu;
      case 'Design':
        return Palette;
      case 'AI':
        return Sparkles;
      default:
        return FileText;
    }
  };

  return (
    <div className="space-y-8 font-jakarta">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-extrabold text-3xl tracking-tight text-on-surface">
            Dashboard
          </h1>
          <p className="text-text-muted text-sm mt-1">
            Manage your articles, insights, and publications
          </p>
        </div>
        <Link
          to="/admin/dashboard/new"
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-on-primary font-bold text-sm hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-primary/10"
        >
          <PlusCircle className="w-4.5 h-4.5" />
          <span>Write Article</span>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Posts', count: totalBlogs, color: 'border-white/10 text-on-surface' },
          { label: 'Engineering', count: engineeringCount, color: 'border-primary/20 text-primary' },
          { label: 'Design', count: designCount, color: 'border-secondary/20 text-secondary' },
          { label: 'AI Products', count: aiCount, color: 'border-primary/20 text-[#bf86ff]' },
        ].map((stat, i) => (
          <div
            key={i}
            className={`glass p-6 rounded-2xl border ${stat.color} flex flex-col gap-1`}
          >
            <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
              {stat.label}
            </span>
            <span className="font-extrabold text-3xl">{stat.count}</span>
          </div>
        ))}
      </div>

      {/* Controls Row */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-surface-container/30 p-4 rounded-2xl border border-border-subtle/50">
        {/* Search */}
        <div className="relative flex-grow max-w-md group">
          <span className="absolute inset-y-0 left-4 flex items-center text-text-muted group-focus-within:text-primary transition-colors duration-300">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-surface-container-low border border-border-subtle rounded-xl text-on-surface text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
          />
        </div>

        {/* Filter Categories */}
        <div className="flex gap-2">
          {['All', 'Engineering', 'Design', 'AI'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-primary/10 border-primary text-primary'
                  : 'bg-surface-container-low border-border-subtle text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Blogs List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-20 bg-surface-container/50 border border-border-subtle/50 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="glass p-12 text-center rounded-2xl border border-border-subtle flex flex-col items-center justify-center gap-2">
          <FileText className="w-8 h-8 text-text-muted" />
          <p className="text-text-muted text-sm font-semibold">No articles found</p>
          <p className="text-xs text-text-muted/60">
            Try resetting your search query or categories, or write a new article
          </p>
        </div>
      ) : (
        <div className="glass overflow-hidden border border-border-subtle/60 rounded-2xl bg-surface-container-low/40 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border-subtle font-mono text-[10px] uppercase tracking-wider text-text-muted bg-surface-container/30">
                  <th className="p-4 pl-6">Article</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Published Date</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle/40 text-sm">
                {filteredBlogs.map((blog) => {
                  const CatIcon = getCategoryIcon(blog.category);
                  const isMongoDBId = blog._id && blog._id.length === 24;
                  return (
                    <tr
                      key={blog._id || blog.id}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      {/* Blog Header & summary */}
                      <td className="p-4 pl-6 max-w-sm">
                        <div className="flex flex-col gap-1">
                          <Link
                            to={`/blog/${blog.id}`}
                            target="_blank"
                            className="font-bold text-on-surface hover:text-primary transition-colors"
                          >
                            {blog.title}
                          </Link>
                          <span className="text-xs text-text-muted line-clamp-1">
                            {blog.summary}
                          </span>
                        </div>
                      </td>

                      {/* Category Badge */}
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-border-subtle text-xs text-on-surface-variant font-mono">
                          <CatIcon className="w-3.5 h-3.5 text-primary" />
                          {blog.category}
                        </span>
                      </td>

                      {/* Publish Date */}
                      <td className="p-4 font-mono text-xs text-text-muted">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {blog.date}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-4 pr-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => navigate(`/admin/dashboard/edit/${blog.id}`)}
                            className="p-2 rounded-lg bg-white/5 border border-border-subtle text-on-surface-variant hover:text-primary hover:border-primary/30 transition-all duration-200"
                            title="Edit Post"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          
                          <button
                            onClick={() => handleDelete(blog._id || blog.id, blog.title)}
                            className="p-2 rounded-lg bg-error/10 border border-error/20 text-error hover:bg-error hover:text-on-primary transition-all duration-200"
                            title="Delete Post"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
