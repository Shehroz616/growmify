import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, PlusCircle, Trash2, Check, Shield, Briefcase, Plus } from 'lucide-react';
import useCareerStore from '../store/useCareerStore';
import useAuthStore from '../store/useAuthStore';

const DEPTS = ['Engineering', 'Design', 'Automation', 'Operations', 'Marketing'];

export default function AdminCareerForm() {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();

  const { token } = useAuthStore();
  const { createCareer, updateCareer, fetchCareerById } = useCareerStore();

  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Form Fields State
  const [title, setTitle] = useState('');
  const [dept, setDept] = useState('Engineering');
  const [type, setType] = useState('Full-Time / Remote');
  const [desc, setDesc] = useState('');
  const [requirements, setRequirements] = useState(['React proficiency', 'Team player']);
  const [newRequirement, setNewRequirement] = useState('');

  // Load existing career role details on edit
  useEffect(() => {
    if (isEditMode) {
      const loadRole = async () => {
        setLoading(true);
        try {
          const role = await fetchCareerById(id);
          if (role) {
            setTitle(role.title);
            setDept(role.dept);
            setType(role.type);
            setDesc(role.desc);
            setRequirements(role.requirements || []);
          } else {
            setError('Career position not found in the database');
          }
        } catch (err) {
          setError(`Failed to retrieve career details: ${err.message}`);
        } finally {
          setLoading(false);
        }
      };
      loadRole();
    }
  }, [id, isEditMode, fetchCareerById]);

  // Requirements stack handlers
  const handleAddRequirement = (e) => {
    e.preventDefault();
    if (newRequirement.trim() && !requirements.includes(newRequirement.trim())) {
      setRequirements([...requirements, newRequirement.trim()]);
      setNewRequirement('');
    }
  };

  const handleRemoveRequirement = (reqToRemove) => {
    setRequirements(requirements.filter((r) => r !== reqToRemove));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !desc.trim() || requirements.length === 0) {
      setError('Please fill in all required fields and add at least one job requirement.');
      return;
    }

    setSaving(true);
    const careerData = {
      title: title.trim(),
      dept,
      type: type.trim(),
      desc: desc.trim(),
      requirements,
    };

    try {
      if (isEditMode) {
        await updateCareer(id, careerData, token);
      } else {
        await createCareer(careerData, token);
      }
      navigate('/admin/dashboard/careers');
    } catch (err) {
      setError(`Operation failed: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-mono text-text-muted">Loading role details...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-jakarta">
      {/* Back button */}
      <Link
        to="/admin/dashboard/careers"
        className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors text-xs font-mono uppercase tracking-wider group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Back to List</span>
      </Link>

      {/* Header Title */}
      <div>
        <h1 className="font-extrabold text-3xl tracking-tight text-on-surface">
          {isEditMode ? 'Edit Career Position' : 'Create Open Position'}
        </h1>
        <p className="text-text-muted text-sm mt-1">
          {isEditMode
            ? 'Modify position departments, details, and dynamic bullet points requirements'
            : 'Add a new career vacancy slot to the public job application index'}
        </p>
      </div>

      {/* Main Form container */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="glass p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 font-bold text-xs">
            {error}
          </div>
        )}

        <div className="glass p-6 md:p-8 rounded-2xl border border-border-subtle/50 space-y-6">
          <div className="flex items-center gap-3 border-b border-border-subtle pb-4">
            <Briefcase className="w-5 h-5 text-primary" />
            <h2 className="font-bold text-base text-on-surface uppercase tracking-wider text-xs font-mono">
              Job Position Specifications
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-on-surface-variant font-mono uppercase tracking-wider">
                Position Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Senior Full-Stack Engineer"
                className="w-full px-4 py-3 bg-background border border-border-subtle/50 rounded-xl text-sm focus:outline-none focus:border-primary transition-all duration-300"
                required
              />
            </div>

            {/* Department */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-on-surface-variant font-mono uppercase tracking-wider">
                Department *
              </label>
              <select
                value={dept}
                onChange={(e) => setDept(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border-subtle/50 rounded-xl text-sm focus:outline-none focus:border-primary transition-all duration-300 cursor-pointer"
              >
                {DEPTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Job Type */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-on-surface-variant font-mono uppercase tracking-wider">
                Job Type / Schedule *
              </label>
              <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="e.g. Full-Time / Remote"
                className="w-full px-4 py-3 bg-background border border-border-subtle/50 rounded-xl text-sm focus:outline-none focus:border-primary transition-all duration-300"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-on-surface-variant font-mono uppercase tracking-wider">
              Short Description / Summary *
            </label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Provide a concise breakdown of the job description, targets, and expectations..."
              rows={4}
              className="w-full px-4 py-3 bg-background border border-border-subtle/50 rounded-xl text-sm focus:outline-none focus:border-primary transition-all duration-300 resize-none"
              required
            />
          </div>
        </div>

        {/* Requirements tagging block */}
        <div className="glass p-6 md:p-8 rounded-2xl border border-border-subtle/50 space-y-6">
          <div className="flex items-center gap-3 border-b border-border-subtle pb-4">
            <Shield className="w-5 h-5 text-secondary" />
            <h2 className="font-bold text-base text-on-surface uppercase tracking-wider text-xs font-mono">
              Job Requirements *
            </h2>
          </div>

          <p className="text-xs text-text-muted leading-relaxed">
            Specify the list of requirements for this position. Applicants will review these bullet points before applying. Add at least one requirement.
          </p>

          {/* Tag List */}
          <div className="flex flex-wrap gap-2">
            {requirements.map((req, i) => (
              <span
                key={i}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-container border border-border-subtle text-sm text-on-surface font-mono"
              >
                <span>{req}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveRequirement(req)}
                  className="text-text-muted hover:text-red-400 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>

          {/* Add tag form input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newRequirement}
              onChange={(e) => setNewRequirement(e.target.value)}
              placeholder="e.g. Experience with GSAP / Canvas animations"
              className="flex-grow px-4 py-3 bg-background border border-border-subtle/50 rounded-xl text-sm focus:outline-none focus:border-primary transition-all duration-300"
            />
            <button
              type="button"
              onClick={handleAddRequirement}
              className="px-5 py-3 rounded-xl bg-secondary/10 hover:bg-secondary hover:text-on-secondary text-secondary font-bold text-sm transition-all duration-300 flex items-center gap-1 cursor-pointer shrink-0 border border-secondary/20"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>
        </div>

        {/* Actions bar */}
        <div className="flex items-center justify-end gap-4">
          <Link
            to="/admin/dashboard/careers"
            className="px-6 py-3 rounded-xl border border-border-subtle bg-surface-container/50 text-text-muted hover:text-on-surface hover:border-border-subtle transition-all duration-200 font-bold text-sm"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-bold text-sm hover:scale-105 active:scale-95 disabled:opacity-60 transition-all duration-250 cursor-pointer shadow-lg shadow-primary/10"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Check className="w-4.5 h-4.5" />
                <span>{isEditMode ? 'Update Position' : 'Publish Position'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
