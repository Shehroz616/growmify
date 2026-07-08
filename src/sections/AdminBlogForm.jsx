import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, PlusCircle, Trash2, ArrowUp, ArrowDown, Upload, FileText, Image as ImageIcon, Sparkles, Code, Heading as HeadingIcon, List as ListIcon, Check } from 'lucide-react';
import useBlogStore from '../store/useBlogStore';
import useAuthStore from '../store/useAuthStore';

const CATEGORIES = ['Engineering', 'Design', 'AI'];
const ICONS = ['Cpu', 'Palette', 'Sparkles', 'BookOpen', 'Code', 'Terminal', 'LineChart', 'Layers'];
const COLORS = [
  { class: 'text-primary', label: 'Primary (Teal)' },
  { class: 'text-secondary', label: 'Secondary (Lime)' },
  { class: 'text-tertiary', label: 'Tertiary (Gray)' },
  { class: 'text-[#bf86ff]', label: 'Purple' },
];

export default function AdminBlogForm() {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const { token } = useAuthStore();
  const { createBlog, updateBlog, fetchBlogById, uploadImage, loading: apiLoading } = useBlogStore();

  const [loading, setLoading] = useState(isEditMode);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  // Form Fields State
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState('Engineering');
  const [tag, setTag] = useState('');
  const [image, setImage] = useState('');
  const [author, setAuthor] = useState('Shehroz, Lead Engineer');
  const [readTime, setReadTime] = useState('5 min read');
  const [iconName, setIconName] = useState('Cpu');
  const [color, setColor] = useState('text-primary');
  
  // Body blocks state: [{ type: 'paragraph', text: '' }, { type: 'list', items: [''] }]
  const [body, setBody] = useState([
    { type: 'paragraph', text: '' }
  ]);

  // Load existing data if edit mode
  useEffect(() => {
    if (isEditMode) {
      const loadBlog = async () => {
        setLoading(true);
        try {
          const blog = await fetchBlogById(id);
          if (blog) {
            setTitle(blog.title);
            setSummary(blog.summary);
            setCategory(blog.category);
            setTag(blog.tag);
            setImage(blog.image);
            setAuthor(blog.author);
            setReadTime(blog.readTime);
            setIconName(blog.iconName || 'Cpu');
            setColor(blog.color || 'text-primary');
            setBody(blog.body || [{ type: 'paragraph', text: '' }]);
          } else {
            setError('Blog post not found in DB');
          }
        } catch (err) {
          setError(`Failed to retrieve post details: ${err.message}`);
        } finally {
          setLoading(false);
        }
      };
      loadBlog();
    }
  }, [id, isEditMode, fetchBlogById]);

  // File upload trigger
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const url = await uploadImage(file, token);
      setImage(url);
    } catch (err) {
      setError(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  // Block management
  const addBlock = (type) => {
    const newBlock = type === 'list'
      ? { type, items: [''] }
      : { type, text: '' };
    setBody([...body, newBlock]);
  };

  const deleteBlock = (index) => {
    if (body.length === 1) {
      alert('Your blog needs at least one content block!');
      return;
    }
    setBody(body.filter((_, idx) => idx !== index));
  };

  const moveBlock = (index, direction) => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === body.length - 1) return;

    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const updated = [...body];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setBody(updated);
  };

  const updateBlockText = (index, text) => {
    const updated = body.map((block, idx) => {
      if (idx === index) {
        return { ...block, text };
      }
      return block;
    });
    setBody(updated);
  };

  // List items management
  const addListItem = (blockIndex) => {
    const updated = body.map((block, idx) => {
      if (idx === blockIndex) {
        return { ...block, items: [...(block.items || []), ''] };
      }
      return block;
    });
    setBody(updated);
  };

  const removeListItem = (blockIndex, itemIndex) => {
    const updated = body.map((block, idx) => {
      if (idx === blockIndex) {
        const filtered = (block.items || []).filter((_, i) => i !== itemIndex);
        return { ...block, items: filtered.length === 0 ? [''] : filtered };
      }
      return block;
    });
    setBody(updated);
  };

  const updateListItemText = (blockIndex, itemIndex, text) => {
    const updated = body.map((block, idx) => {
      if (idx === blockIndex) {
        const items = [...(block.items || [])];
        items[itemIndex] = text;
        return { ...block, items };
      }
      return block;
    });
    setBody(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate body blocks are not empty
    const isBodyValid = body.every(block => {
      if (block.type === 'list') {
        return block.items && block.items.length > 0 && block.items.every(item => item.trim() !== '');
      }
      return block.text && block.text.trim() !== '';
    });

    if (!isBodyValid) {
      setError('Please fill in or remove any empty content blocks or list items.');
      window.scrollTo(0, 0);
      return;
    }

    const payload = {
      title,
      summary,
      category,
      tag,
      image,
      author,
      date: isEditMode ? undefined : new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime,
      iconName,
      color,
      body,
    };

    try {
      if (isEditMode) {
        await updateBlog(id, payload, token);
      } else {
        await createBlog(payload, token);
      }
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Error processing request');
      window.scrollTo(0, 0);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
        <p className="text-text-muted font-jakarta">Loading details...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-jakarta">
      {/* Header Back navigation */}
      <div className="flex items-center gap-4">
        <Link
          to="/admin/dashboard"
          className="flex items-center gap-2 text-text-muted hover:text-primary font-mono text-xs uppercase tracking-wider transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to list
        </Link>
      </div>

      <div>
        <h1 className="font-extrabold text-3xl tracking-tight text-on-surface">
          {isEditMode ? 'Edit Article' : 'Write New Article'}
        </h1>
        <p className="text-text-muted text-sm mt-1">
          {isEditMode
            ? 'Modify existing content blocks and metadata details'
            : 'Publish insights and compile design breakthroughs'}
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
        {/* Core Metadata Grid */}
        <div className="glass p-6 md:p-8 rounded-3xl border border-border-subtle/50 bg-surface-container-low/40 grid grid-cols-1 md:grid-cols-2 gap-6">
          <h3 className="md:col-span-2 font-mono text-[10px] uppercase tracking-widest text-text-muted border-b border-border-subtle/30 pb-2 mb-2">
            Metadata Details
          </h3>

          {/* Title */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-xs font-semibold text-on-surface">Title</label>
            <input
              type="text"
              required
              placeholder="e.g. React Compiler: De-mystifying Memoization & Auto-tuning"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container border border-border-subtle rounded-xl text-on-surface text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
            />
          </div>

          {/* Summary */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-xs font-semibold text-on-surface">Summary / Subtitle</label>
            <textarea
              required
              rows={3}
              placeholder="Provide a brief summary of the article..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
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

          {/* Tag */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-on-surface">Tag / Label</label>
            <input
              type="text"
              required
              placeholder="e.g. React 19 / Compiler"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container border border-border-subtle rounded-xl text-on-surface text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
            />
          </div>

          {/* Author */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-on-surface">Author</label>
            <input
              type="text"
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container border border-border-subtle rounded-xl text-on-surface text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
            />
          </div>

          {/* Read Time */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-on-surface">Read Time</label>
            <input
              type="text"
              required
              placeholder="e.g. 5 min read"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container border border-border-subtle rounded-xl text-on-surface text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
            />
          </div>

          {/* Icon */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-on-surface">Icon Component</label>
            <select
              value={iconName}
              onChange={(e) => setIconName(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container border border-border-subtle rounded-xl text-on-surface text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
            >
              {ICONS.map((ico) => (
                <option key={ico} value={ico}>
                  {ico}
                </option>
              ))}
            </select>
          </div>

          {/* Theme Color */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-on-surface">Theme Color Accent</label>
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container border border-border-subtle rounded-xl text-on-surface text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
            >
              {COLORS.map((clr) => (
                <option key={clr.class} value={clr.class}>
                  {clr.label}
                </option>
              ))}
            </select>
          </div>

          {/* Cover Image */}
          <div className="md:col-span-2 space-y-4">
            <label className="block text-xs font-semibold text-on-surface">Cover Image URL / Upload</label>
            
            <div className="flex flex-col sm:flex-row gap-4 items-stretch">
              <input
                type="text"
                required
                placeholder="Paste an image URL, or upload below..."
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
                  alt="Cover preview"
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

        {/* Dynamic Blocks Body Editor */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border-subtle/30 pb-3">
            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                Blog Article Body Blocks
              </h3>
              <p className="text-xs text-text-muted mt-1 font-jakarta">
                Compose your article sequentially using modular blocks.
              </p>
            </div>
            
            {/* Add block dropdown trigger */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => addBlock('paragraph')}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-primary/20 bg-primary/5 text-xs text-primary hover:bg-primary hover:text-on-primary hover:border-primary transition-all duration-300"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>+ Paragraph</span>
              </button>
              
              <button
                type="button"
                onClick={() => addBlock('heading')}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#bf86ff]/20 bg-[#bf86ff]/5 text-xs text-[#bf86ff] hover:bg-[#bf86ff] hover:text-on-primary hover:border-[#bf86ff] transition-all duration-300"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>+ Heading</span>
              </button>

              <button
                type="button"
                onClick={() => addBlock('code')}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-secondary/20 bg-secondary/5 text-xs text-secondary hover:bg-secondary hover:text-on-primary hover:border-secondary transition-all duration-300"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>+ Code Block</span>
              </button>

              <button
                type="button"
                onClick={() => addBlock('list')}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-tertiary/20 bg-tertiary/5 text-xs text-tertiary hover:bg-tertiary hover:text-on-primary hover:border-tertiary transition-all duration-300"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>+ List Block</span>
              </button>
            </div>
          </div>

          {/* Blocks Render List */}
          <div className="space-y-4">
            {body.map((block, index) => {
              return (
                <div
                  key={index}
                  className="glass p-5 rounded-2xl border border-border-subtle/50 bg-surface-container-low/30 flex items-start gap-4"
                >
                  {/* Block Actions Menu (Left side) */}
                  <div className="flex flex-col items-center gap-1.5 pt-1.5">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => moveBlock(index, 'up')}
                      className="p-1 rounded bg-white/5 border border-border-subtle/30 text-text-muted hover:text-on-surface disabled:opacity-30 disabled:pointer-events-none transition"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[10px] font-mono font-bold bg-white/5 px-1.5 py-0.5 rounded border border-border-subtle/20">
                      {index + 1}
                    </span>
                    <button
                      type="button"
                      disabled={index === body.length - 1}
                      onClick={() => moveBlock(index, 'down')}
                      className="p-1 rounded bg-white/5 border border-border-subtle/30 text-text-muted hover:text-on-surface disabled:opacity-30 disabled:pointer-events-none transition"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Block Content (Middle) */}
                  <div className="flex-grow space-y-3">
                    {/* Header */}
                    <div className="flex items-center gap-2">
                      {block.type === 'paragraph' && (
                        <>
                          <FileText className="w-4 h-4 text-primary" />
                          <span className="font-mono text-[10px] uppercase text-primary font-bold">Paragraph</span>
                        </>
                      )}
                      {block.type === 'heading' && (
                        <>
                          <HeadingIcon className="w-4 h-4 text-[#bf86ff]" />
                          <span className="font-mono text-[10px] uppercase text-[#bf86ff] font-bold">Heading</span>
                        </>
                      )}
                      {block.type === 'code' && (
                        <>
                          <Code className="w-4 h-4 text-secondary" />
                          <span className="font-mono text-[10px] uppercase text-secondary font-bold">Code Block</span>
                        </>
                      )}
                      {block.type === 'list' && (
                        <>
                          <ListIcon className="w-4 h-4 text-tertiary" />
                          <span className="font-mono text-[10px] uppercase text-tertiary font-bold">Bulleted List</span>
                        </>
                      )}
                    </div>

                    {/* Inputs */}
                    {block.type !== 'list' ? (
                      <textarea
                        required
                        rows={block.type === 'code' ? 5 : 3}
                        value={block.text}
                        onChange={(e) => updateBlockText(index, e.target.value)}
                        placeholder={
                          block.type === 'code'
                            ? `const express = require('express');\nconst app = express();`
                            : block.type === 'heading'
                            ? 'Enter section heading title...'
                            : 'Enter paragraph content text here...'
                        }
                        className={`w-full px-4 py-3 border border-border-subtle rounded-xl text-sm focus:outline-none focus:ring-1 transition-all duration-300 ${
                          block.type === 'code'
                            ? 'bg-background-deep text-primary font-mono'
                            : 'bg-surface-container text-on-surface'
                        } ${
                          block.type === 'heading'
                            ? 'focus:border-[#bf86ff]/50 focus:ring-[#bf86ff]/20 font-bold text-base'
                            : 'focus:border-primary/50 focus:ring-primary/20'
                        }`}
                      />
                    ) : (
                      <div className="space-y-2">
                        {block.items.map((item, itemIdx) => (
                          <div key={itemIdx} className="flex gap-2 items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                            <input
                              type="text"
                              required
                              placeholder="Enter list item..."
                              value={item}
                              onChange={(e) => updateListItemText(index, itemIdx, e.target.value)}
                              className="flex-grow px-3 py-2 bg-surface-container border border-border-subtle rounded-lg text-on-surface text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                            />
                            <button
                              type="button"
                              onClick={() => removeListItem(index, itemIdx)}
                              className="p-2 text-error/80 hover:text-error hover:bg-error/10 rounded-lg transition"
                              title="Delete Item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addListItem(index)}
                          className="mt-2 text-xs font-mono text-primary hover:underline flex items-center gap-1"
                        >
                          <span>+ Add Bullet Item</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Block Delete Button (Right) */}
                  <button
                    type="button"
                    onClick={() => deleteBlock(index)}
                    className="p-2 text-error/80 hover:text-error hover:bg-error/10 border border-transparent hover:border-error/20 rounded-xl transition self-start mt-1.5"
                    title="Delete Block"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action controls */}
        <div className="flex gap-4 justify-end pt-6 border-t border-border-subtle/30">
          <button
            type="button"
            onClick={() => navigate('/admin/dashboard')}
            className="px-6 py-3 rounded-xl bg-white/5 border border-border-subtle hover:bg-white/10 hover:text-on-surface transition-all duration-200 text-sm font-semibold text-text-muted"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={apiLoading}
            className="px-8 py-3 rounded-xl bg-primary text-on-primary font-bold text-sm hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-primary/20 flex items-center gap-2"
          >
            {apiLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-on-primary"></div>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>{isEditMode ? 'Save Changes' : 'Publish Post'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
