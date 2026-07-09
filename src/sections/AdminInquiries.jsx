import { useEffect, useState } from 'react';
import { Mail, Search, Trash2, Calendar, User, Zap, Tag, Compass, Sparkles } from 'lucide-react';
import useInquiryStore from '../store/useInquiryStore';
import useAuthStore from '../store/useAuthStore';

export default function AdminInquiries() {
  const { inquiries, loading, error, fetchInquiries, deleteInquiry } = useInquiryStore();
  const { token } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProjectType, setSelectedProjectType] = useState('All');

  useEffect(() => {
    fetchInquiries(token);
  }, [fetchInquiries, token]);

  const handleDelete = async (id, senderName) => {
    if (window.confirm(`Are you sure you want to delete/dismiss the inquiry from "${senderName}"?`)) {
      try {
        await deleteInquiry(id, token);
      } catch (err) {
        alert(`Failed to dismiss inquiry: ${err.message}`);
      }
    }
  };

  // Metrics
  const totalInquiries = inquiries.length;
  const projectTypesList = ['All', ...new Set(inquiries.map((inq) => inq.projectType))];

  // Filter inquiries list
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesProjectType = selectedProjectType === 'All' || inq.projectType === selectedProjectType;
    const matchesSearch =
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProjectType && matchesSearch;
  });

  const getFormattedDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-8 font-jakarta">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-extrabold text-3xl tracking-tight text-on-surface">
            Client Inquiries Inbox
          </h1>
          <p className="text-text-muted text-sm mt-1">
            Review incoming briefs, project proposals, and direct contact submissions
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { label: 'Total Inquiries Received', count: totalInquiries, color: 'border-white/10 text-on-surface' },
          { label: 'Dynamic Project Types', count: projectTypesList.length - 1, color: 'border-secondary/20 text-secondary' },
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
            placeholder="Search sender, email, brief content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-background border border-border-subtle/50 rounded-xl text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300"
          />
        </div>

        {/* Project Type Filter buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {projectTypesList.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedProjectType(type)}
              className={`px-4.5 py-2.5 rounded-xl font-bold text-xs transition-all duration-350 cursor-pointer ${
                selectedProjectType === type
                  ? 'bg-primary/10 text-primary border border-primary/25 shadow-sm'
                  : 'bg-surface-container-low text-text-muted border border-border-subtle/40 hover:text-on-surface hover:border-border-subtle'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Messages List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-mono text-text-muted">Fetching inquiries...</span>
        </div>
      ) : error ? (
        <div className="glass p-8 rounded-2xl border border-red-500/10 bg-red-500/5 text-center space-y-3">
          <p className="text-red-400 font-bold">Failed to load inquiries: {error}</p>
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div className="glass py-24 rounded-2xl text-center border border-border-subtle/30 bg-surface-container-lowest/50">
          <Mail className="w-12 h-12 text-text-muted mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-bold text-on-surface">No inquiries found</h3>
          <p className="text-text-muted text-xs mt-1 max-w-xs mx-auto">
            Your inbox is currently empty or no messages matched the selected filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredInquiries.map((inq) => (
            <div
              key={inq._id}
              className="glass p-6 md:p-8 rounded-3xl border border-border-subtle/50 hover:border-primary/20 transition-all duration-300 flex flex-col gap-6"
            >
              {/* Card Top */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-4 border-b border-border-subtle/30">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-secondary px-2.5 py-1 rounded bg-secondary/5 border border-secondary/15">
                      {inq.projectType}
                    </span>
                    <span className="font-mono text-[10px] text-text-muted flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      <span>{getFormattedDate(inq.createdAt)}</span>
                    </span>
                  </div>
                  <h3 className="font-bold text-xl text-on-surface flex items-center gap-2">
                    <User className="w-4.5 h-4.5 text-text-muted" />
                    <span>{inq.name}</span>
                  </h3>
                  <a
                    href={`mailto:${inq.email}`}
                    className="block text-sm text-primary hover:underline font-mono"
                  >
                    {inq.email}
                  </a>
                </div>

                {/* Dismiss Action */}
                <button
                  onClick={() => handleDelete(inq._id, inq.name)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-red-500/10 bg-red-500/5 hover:bg-red-500/15 text-red-400 hover:border-red-500/30 transition-all duration-200 font-bold text-xs cursor-pointer self-start sm:self-center"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Dismiss Message</span>
                </button>
              </div>

              {/* Message Content */}
              <div className="space-y-2">
                <h4 className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                  Project Brief / Message
                </h4>
                <p className="text-on-surface-variant text-sm leading-relaxed whitespace-pre-wrap font-jakarta">
                  {inq.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
