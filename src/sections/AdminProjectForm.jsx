import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, PlusCircle, Trash2, Upload, FileText, Check, Star, Settings, Shield, Zap, Globe, Sparkles } from 'lucide-react';
import useProjectStore from '../store/useProjectStore';
import useBlogStore from '../store/useBlogStore'; // Import uploadImage helper
import useAuthStore from '../store/useAuthStore';

const CATEGORIES = ['AI & Automation', 'Creative UI', 'SaaS & Mobile Apps'];

export default function AdminProjectForm() {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const { token } = useAuthStore();
  const { createProject, updateProject, fetchProjectById, loading: projectApiLoading } = useProjectStore();
  const { uploadImage } = useBlogStore(); // reuse blog image upload endpoint

  const [loading, setLoading] = useState(isEditMode);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  // Form Fields State
  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [category, setCategory] = useState('AI & Automation');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [featuredDescription, setFeaturedDescription] = useState('');
  const [featured, setFeatured] = useState(false);

  // Tech tags: array of strings
  const [tech, setTech] = useState(['React', 'Node.js']);
  const [newTag, setNewTag] = useState('');

  // Performance metrics stats
  const [speed, setSpeed] = useState('+300%');
  const [uptime, setUptime] = useState('99.99%');
  const [conversion, setConversion] = useState('3.5x');

  // Detailed Case Study sections
  const [challenge, setChallenge] = useState('');
  const [solution, setSolution] = useState('');
  const [results, setResults] = useState('');

  // Load existing project details on edit
  useEffect(() => {
    if (isEditMode) {
      const loadProject = async () => {
        setLoading(true);
        try {
          const project = await fetchProjectById(id);
          if (project) {
            setTitle(project.title);
            setClient(project.client);
            setCategory(project.category);
            setImage(project.image);
            setDescription(project.description);
            setFeaturedDescription(project.featuredDescription || '');
            setFeatured(!!project.featured);
            setTech(project.tech || []);
            setSpeed(project.stats?.speed || '+300%');
            setUptime(project.stats?.uptime || '99.99%');
            setConversion(project.stats?.conversion || '3.5x');
            setChallenge(project.details?.challenge || '');
            setSolution(project.details?.solution || '');
            setResults(project.details?.results || '');
          } else {
            setError('Project not found in the database');
          }
        } catch (err) {
          setError(`Failed to retrieve project details: ${err.message}`);
        } finally {
          setLoading(false);
        }
      };
      loadProject();
    }
  }, [id, isEditMode, fetchProjectById]);

  // File uploading handler
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const url = await uploadImage(file, token);
      setImage(url);
    } catch (err) {
      setError(`Image upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  // Tech stack handlers
  const handleAddTag = (e) => {
    e.preventDefault();
    const tag = newTag.trim();
    if (!tag) return;
    if (tech.includes(tag)) {
      setNewTag('');
      return;
    }
    setTech([...tech, tag]);
    setNewTag('');
  };

  const handleRemoveTag = (tagToRemove) => {
    setTech(tech.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (tech.length === 0) {
      setError('Please add at least one technology tag for this project.');
      window.scrollTo(0, 0);
      return;
    }

    const payload = {
      title,
      client,
      category,
      image,
      description,
      featuredDescription: featuredDescription || undefined,
      label: title,
      tech,
      stats: { speed, uptime, conversion },
      details: { challenge, solution, results },
      featured,
    };

    try {
      if (isEditMode) {
        await updateProject(id, payload, token);
      } else {
        await createProject(payload, token);
      }
      navigate('/admin/dashboard/projects');
    } catch (err) {
      setError(err.message || 'Error processing request');
      window.scrollTo(0, 0);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
        <p className="text-text-muted font-jakarta">Loading project details...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-jakarta">
      {/* Header back link */}
      <div className="flex items-center gap-4">
        <Link
          to="/admin/dashboard/projects"
          className="flex items-center gap-2 text-text-muted hover:text-primary font-mono text-xs uppercase tracking-wider transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to list
        </Link>
      </div>

      <div>
        <h1 className="font-extrabold text-3xl tracking-tight text-on-surface">
          {isEditMode ? 'Edit Showcase Project' : 'Add Showcase Project'}
        </h1>
        <p className="text-text-muted text-sm mt-1">
          {isEditMode
            ? 'Modify portfolio case studies, stats benchmarks, and technology tags'
            : 'Publish a new digital deployment to the Growmify site'}
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-error/10 border border-error/20 text-error text-sm font-semibold flex items-center gap-3">
          <Trash2 className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Editor Form */}
      <form onSubmit={handleSubmit} className="space-y-8 pb-12">
        
        {/* Section 1: Basic Metadata */}
        <div className="glass p-6 md:p-8 rounded-3xl border border-border-subtle/50 bg-surface-container-low/40 grid grid-cols-1 md:grid-cols-2 gap-6">
          <h3 className="md:col-span-2 font-mono text-[10px] uppercase tracking-widest text-text-muted border-b border-border-subtle/30 pb-2 mb-2">
            1. Core Project Metadata
          </h3>

          {/* Project Title */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-on-surface">Project Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Talk Right"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container border border-border-subtle rounded-xl text-on-surface text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
            />
          </div>

          {/* Client Name */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-on-surface">Client / Brand</label>
            <input
              type="text"
              required
              placeholder="e.g. UAE Medical Group"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container border border-border-subtle rounded-xl text-on-surface text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-on-surface">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container border border-border-subtle rounded-xl text-on-surface text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Featured checkbox */}
          <div className="flex items-center gap-3 pt-6 md:pl-4">
            <input
              type="checkbox"
              id="featured"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-5 h-5 rounded border border-border-subtle bg-surface-container text-primary focus:ring-primary/20 focus:outline-none transition cursor-pointer"
            />
            <label htmlFor="featured" className="text-sm font-semibold text-on-surface cursor-pointer select-none flex items-center gap-1.5">
              <Star className={`w-4 h-4 ${featured ? 'text-secondary fill-secondary' : 'text-text-muted'}`} />
              Feature on Landing Page Card-Swap
            </label>
          </div>

          {/* Description */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-xs font-semibold text-on-surface">Short Summary / Description</label>
            <textarea
              required
              rows={2}
              placeholder="Short description displayed on project cards..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container border border-border-subtle rounded-xl text-on-surface text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
            />
          </div>

          {/* Featured Description */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-xs font-semibold text-on-surface">Featured Description (Only for Card-Swap)</label>
            <textarea
              rows={2}
              placeholder="Detailed description shown in landing page card-swap swap stacks..."
              value={featuredDescription}
              onChange={(e) => setFeaturedDescription(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container border border-border-subtle rounded-xl text-on-surface text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
            />
          </div>

          {/* Tech tags list */}
          <div className="md:col-span-2 space-y-3">
            <label className="block text-xs font-semibold text-on-surface">Tech Stack Tags</label>
            
            {/* Input tag */}
            <div className="flex gap-2 max-w-md">
              <input
                type="text"
                placeholder="e.g. FastAPI, Next.js, WebGL"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="flex-grow px-4 py-2.5 bg-surface-container border border-border-subtle rounded-xl text-on-surface text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 font-mono"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2.5 rounded-xl bg-primary/10 border border-primary/20 hover:bg-primary hover:text-on-primary hover:border-primary text-primary transition-all duration-200 text-xs font-semibold"
              >
                Add Tag
              </button>
            </div>

            {/* List tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {tech.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-border-subtle text-xs text-on-surface rounded-full font-mono font-semibold"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="p-0.5 rounded-full hover:bg-error/20 text-text-muted hover:text-error transition"
                    title="Remove tag"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Cover Image */}
          <div className="md:col-span-2 space-y-4">
            <label className="block text-xs font-semibold text-on-surface">Deployment Screenshot / Cover Image</label>
            
            <div className="flex flex-col sm:flex-row gap-4 items-stretch">
              <input
                type="text"
                required
                placeholder="Paste an image URL, or upload file..."
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="flex-grow px-4 py-3 bg-surface-container border border-border-subtle rounded-xl text-on-surface text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
              />
              
              <button
                type="button"
                disabled={uploading}
                onClick={() => fileInputRef.current?.click()}
                className="px-5 py-3 rounded-xl bg-white/5 border border-border-subtle hover:bg-white/10 active:scale-95 transition-all duration-200 text-sm font-semibold flex items-center justify-center gap-2 shrink-0"
              >
                {uploading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-primary"></div>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Upload File</span>
                  </>
                )}
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
              />
            </div>

            {image && (
              <div className="relative w-full aspect-[2.39/1] max-h-48 rounded-xl border border-border-subtle/50 overflow-hidden bg-background">
                <img
                  src={image.startsWith('/uploads') ? `http://localhost:5000${image}` : image}
                  alt="Project cover preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setImage('')}
                  className="absolute top-2 right-2 p-2 rounded-lg bg-black/60 hover:bg-black text-error border border-error/10 hover:scale-105 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Section 2: Performance Metrics */}
        <div className="glass p-6 md:p-8 rounded-3xl border border-border-subtle/50 bg-surface-container-low/40 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <h3 className="sm:col-span-3 font-mono text-[10px] uppercase tracking-widest text-text-muted border-b border-border-subtle/30 pb-2 mb-2">
            2. Performance stats (Showcase Benchmarks)
          </h3>

          {/* Speedup */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-on-surface">Load Speedup Tag</label>
            <input
              type="text"
              required
              placeholder="e.g. +340%"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container border border-border-subtle rounded-xl text-on-surface text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 font-mono"
            />
          </div>

          {/* Conversion Rate */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-on-surface">Conversion Increment</label>
            <input
              type="text"
              required
              placeholder="e.g. 4.8x"
              value={conversion}
              onChange={(e) => setConversion(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container border border-border-subtle rounded-xl text-on-surface text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 font-mono"
            />
          </div>

          {/* SLA Uptime */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-on-surface">SLA Uptime Guarantee</label>
            <input
              type="text"
              required
              placeholder="e.g. 99.99%"
              value={uptime}
              onChange={(e) => setUptime(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container border border-border-subtle rounded-xl text-on-surface text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 font-mono"
            />
          </div>
        </div>

        {/* Section 3: Case Study Details */}
        <div className="glass p-6 md:p-8 rounded-3xl border border-border-subtle/50 bg-surface-container-low/40 space-y-6">
          <h3 className="font-mono text-[10px] uppercase tracking-widest text-text-muted border-b border-border-subtle/30 pb-2">
            3. Case Study Details
          </h3>

          {/* Challenge */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-on-surface flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-error" /> The Challenge
            </label>
            <textarea
              required
              rows={4}
              placeholder="Explain the initial challenge or business problem the client faced..."
              value={challenge}
              onChange={(e) => setChallenge(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container border border-border-subtle rounded-xl text-on-surface text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
            />
          </div>

          {/* Solution */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-on-surface flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-primary" /> Our Solution
            </label>
            <textarea
              required
              rows={4}
              placeholder="Describe the solution, systems architecture, or custom AI configurations built to address the challenge..."
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container border border-border-subtle rounded-xl text-on-surface text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
            />
          </div>

          {/* Results */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-on-surface flex items-center gap-1.5">
              <Check className="w-4 h-4 text-secondary" /> The Results
            </label>
            <textarea
              required
              rows={4}
              placeholder="Present the quantitative/qualitative results, statistics, or performance feedback post-deployment..."
              value={results}
              onChange={(e) => setResults(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container border border-border-subtle rounded-xl text-on-surface text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
            />
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex gap-4 justify-end pt-6 border-t border-border-subtle/30">
          <button
            type="button"
            onClick={() => navigate('/admin/dashboard/projects')}
            className="px-6 py-3 rounded-xl bg-white/5 border border-border-subtle hover:bg-white/10 hover:text-on-surface transition-all duration-200 text-sm font-semibold text-text-muted"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={projectApiLoading}
            className="px-8 py-3 rounded-xl bg-primary text-on-primary font-bold text-sm hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-primary/20 flex items-center gap-2"
          >
            {projectApiLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-on-primary"></div>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>{isEditMode ? 'Save Project' : 'Publish Project'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
