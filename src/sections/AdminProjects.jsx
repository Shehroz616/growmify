import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, Search, Edit, Trash2, Shield, Zap, CheckCircle, FileText, Globe, Star, Cpu, Palette, Sparkles } from 'lucide-react';
import useProjectStore from '../store/useProjectStore';
import useAuthStore from '../store/useAuthStore';

export default function AdminProjects() {
  const { projects, loading, error, fetchProjects, deleteProject } = useProjectStore();
  const { token } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete the project "${title}"?`)) {
      try {
        await deleteProject(id, token);
      } catch (err) {
        alert(`Failed to delete project: ${err.message}`);
      }
    }
  };

  // Metrics
  const totalProjects = projects.length;
  const featuredProjects = projects.filter((p) => p.featured).length;
  
  // Get all unique categories dynamically
  const categories = ['All', ...new Set(projects.map((p) => p.category))];

  // Filter list
  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category) => {
    if (category.toLowerCase().includes('ai') || category.toLowerCase().includes('automation')) {
      return Sparkles;
    }
    if (category.toLowerCase().includes('creative') || category.toLowerCase().includes('ui') || category.toLowerCase().includes('ux')) {
      return Palette;
    }
    return Cpu;
  };

  return (
    <div className="space-y-8 font-jakarta">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-extrabold text-3xl tracking-tight text-on-surface">
            Portfolio Showcase
          </h1>
          <p className="text-text-muted text-sm mt-1">
            Manage your live deployments, client case studies, and performance statistics
          </p>
        </div>
        <Link
          to="/admin/dashboard/projects/new"
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-on-primary font-bold text-sm hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-primary/10"
        >
          <PlusCircle className="w-4.5 h-4.5" />
          <span>Add Project</span>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Deployments', count: totalProjects, color: 'border-white/10 text-on-surface' },
          { label: 'Featured on Landing Page', count: featuredProjects, color: 'border-secondary/20 text-secondary' },
          { label: 'Categories Tracked', count: categories.length - 1, color: 'border-primary/20 text-primary' },
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
            placeholder="Search by project name, client, details..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-surface-container-low border border-border-subtle rounded-xl text-on-surface text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
          />
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
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

      {/* Projects List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-24 bg-surface-container/50 border border-border-subtle/50 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="glass p-12 text-center rounded-2xl border border-border-subtle flex flex-col items-center justify-center gap-2">
          <Globe className="w-8 h-8 text-text-muted" />
          <p className="text-text-muted text-sm font-semibold">No portfolio projects found</p>
          <p className="text-xs text-text-muted/60">
            Create a new project case study to showcase it in your portfolio
          </p>
        </div>
      ) : (
        <div className="glass overflow-hidden border border-border-subtle/60 rounded-2xl bg-surface-container-low/40 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border-subtle font-mono text-[10px] uppercase tracking-wider text-text-muted bg-surface-container/30">
                  <th className="p-4 pl-6">Project / Client</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Key Metric</th>
                  <th className="p-4 text-center">Featured</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle/40 text-sm">
                {filteredProjects.map((project) => {
                  const CatIcon = getCategoryIcon(project.category);
                  return (
                    <tr
                      key={project._id || project.id}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      {/* Project Header */}
                      <td className="p-4 pl-6 max-w-sm">
                        <div className="flex items-center gap-4">
                          <div className="w-16 aspect-video overflow-hidden rounded bg-background shrink-0 border border-border-subtle/55 select-none">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover object-top"
                              onError={(e) => {
                                e.target.src = '/project_default.png';
                              }}
                            />
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="font-bold text-on-surface">
                              {project.title}
                            </span>
                            <span className="text-xs text-text-muted font-mono uppercase tracking-wide">
                              Client: {project.client}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category Badge */}
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-border-subtle text-xs text-on-surface-variant font-mono">
                          <CatIcon className="w-3.5 h-3.5 text-primary" />
                          {project.category}
                        </span>
                      </td>

                      {/* Key Metric */}
                      <td className="p-4 font-mono text-xs text-secondary font-bold">
                        {project.stats?.speed || 'N/A'}
                      </td>

                      {/* Featured Indicator */}
                      <td className="p-4 text-center">
                        {project.featured ? (
                          <span className="inline-flex p-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary" title="Featured on landing page">
                            <Star className="w-4 h-4 fill-secondary" />
                          </span>
                        ) : (
                          <span className="text-text-muted/40 font-mono text-xs">-</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="p-4 pr-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => navigate(`/admin/dashboard/projects/edit/${project.id}`)}
                            className="p-2 rounded-lg bg-white/5 border border-border-subtle text-on-surface-variant hover:text-primary hover:border-primary/30 transition-all duration-200"
                            title="Edit Project"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          
                          <button
                            onClick={() => handleDelete(project._id || project.id, project.title)}
                            className="p-2 rounded-lg bg-error/10 border border-error/20 text-error hover:bg-error hover:text-on-primary transition-all duration-200"
                            title="Delete Project"
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
