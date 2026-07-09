import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Search, Edit, Trash2, Briefcase, Tag, Compass, Sparkles } from 'lucide-react';
import useCareerStore from '../store/useCareerStore';
import useAuthStore from '../store/useAuthStore';

export default function AdminCareers() {
  const { roles, loading, error, fetchCareers, deleteCareer } = useCareerStore();
  const { token } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  useEffect(() => {
    fetchCareers();
  }, [fetchCareers]);

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete the career position "${title}"?`)) {
      try {
        await deleteCareer(id, token);
      } catch (err) {
        alert(`Failed to delete career role: ${err.message}`);
      }
    }
  };

  // Metrics
  const totalRoles = roles.length;
  const uniqueDepts = new Set(roles.map((r) => r.dept)).size;
  const remoteRoles = roles.filter((r) => r.type.toLowerCase().includes('remote')).length;

  // Filter lists
  const deptsList = ['All', ...new Set(roles.map((r) => r.dept))];

  const filteredRoles = roles.filter((role) => {
    const matchesDept = selectedDept === 'All' || role.dept === selectedDept;
    const matchesSearch =
      role.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.dept.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="space-y-8 font-jakarta">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-extrabold text-3xl tracking-tight text-on-surface">
            Careers Position Management
          </h1>
          <p className="text-text-muted text-sm mt-1">
            Publish open opportunities, edit vacancy requirements, and manage global hires
          </p>
        </div>
        <Link
          to="/admin/dashboard/careers/new"
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-on-primary font-bold text-sm hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-primary/10"
        >
          <PlusCircle className="w-4.5 h-4.5" />
          <span>Add Position</span>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Open Opportunities', count: totalRoles, color: 'border-white/10 text-on-surface' },
          { label: 'Active Departments', count: uniqueDepts, color: 'border-secondary/20 text-secondary' },
          { label: 'Remote Listings', count: remoteRoles, color: 'border-primary/20 text-primary' },
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
            placeholder="Search roles, depts, descriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-background border border-border-subtle/50 rounded-xl text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300"
          />
        </div>

        {/* Dept Filter */}
        <div className="flex flex-wrap items-center gap-2">
          {deptsList.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-4.5 py-2.5 rounded-xl font-bold text-xs transition-all duration-350 cursor-pointer ${
                selectedDept === dept
                  ? 'bg-primary/10 text-primary border border-primary/25 shadow-sm'
                  : 'bg-surface-container-low text-text-muted border border-border-subtle/40 hover:text-on-surface hover:border-border-subtle'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table / Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-mono text-text-muted">Fetching position logs...</span>
        </div>
      ) : error ? (
        <div className="glass p-8 rounded-2xl border border-red-500/10 bg-red-500/5 text-center space-y-3">
          <p className="text-red-400 font-bold">Failed to load vacancies: {error}</p>
          <button
            onClick={() => fetchCareers()}
            className="px-4 py-2 bg-red-500/10 hover:bg-red-500/25 border border-red-500/20 text-red-400 font-bold rounded-xl text-xs transition-colors"
          >
            Retry Fetch
          </button>
        </div>
      ) : filteredRoles.length === 0 ? (
        <div className="glass py-24 rounded-2xl text-center border border-border-subtle/30 bg-surface-container-lowest/50">
          <Briefcase className="w-12 h-12 text-text-muted mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-bold text-on-surface">No career positions found</h3>
          <p className="text-text-muted text-xs mt-1 max-w-xs mx-auto">
            Try resetting your search query or department filters to see matches.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredRoles.map((role) => (
            <div
              key={role._id || role.id}
              className="glass p-6 md:p-8 rounded-2xl border border-border-subtle/50 hover:border-primary/20 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-3 max-w-2xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-secondary px-2.5 py-1 rounded bg-secondary/5 border border-secondary/15">
                    {role.dept}
                  </span>
                  <span className="font-mono text-[10px] text-text-muted">
                    {role.type}
                  </span>
                </div>
                <h3 className="font-bold text-xl text-on-surface">
                  {role.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed line-clamp-2">
                  {role.desc}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1.5">
                  {role.requirements.slice(0, 3).map((req, i) => (
                    <span key={i} className="font-mono text-[9px] text-on-surface-variant bg-surface-container border border-border-subtle px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Tag className="w-2.5 h-2.5 text-primary shrink-0" />
                      <span>{req}</span>
                    </span>
                  ))}
                  {role.requirements.length > 3 && (
                    <span className="font-mono text-[9px] text-text-muted bg-surface-container px-2 py-0.5 rounded-md">
                      +{role.requirements.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
                <Link
                  to={`/admin/dashboard/careers/edit/${role._id || role.id}`}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-border-subtle bg-surface-container/50 hover:border-primary/30 hover:text-primary transition-all duration-200 font-bold text-xs"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </Link>
                <button
                  onClick={() => handleDelete(role._id || role.id, role.title)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-red-500/10 bg-red-500/5 hover:bg-red-500/15 text-red-400 hover:border-red-500/30 transition-all duration-200 font-bold text-xs cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
