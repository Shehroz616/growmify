import { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, PlusCircle, LogOut, ArrowLeft, Briefcase, Folder, Users } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';

export default function AdminLayout({ children }) {
  const { user, token, logout, verifyToken, isInitialized } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isInitialized) {
      verifyToken();
    }
  }, [isInitialized, verifyToken]);

  useEffect(() => {
    if (isInitialized && !token) {
      navigate('/admin/login');
    }
  }, [isInitialized, token, navigate]);

  if (!isInitialized || !token) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
        <p className="text-text-muted font-jakarta">Authenticating admin session...</p>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navLinks = [
    {
      to: '/admin/dashboard',
      label: 'Manage Blogs',
      icon: FileText,
    },
    {
      to: '/admin/dashboard/projects',
      label: 'Manage Portfolio',
      icon: Folder,
    },
    {
      to: '/admin/dashboard/careers',
      label: 'Manage Careers',
      icon: Briefcase,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col md:flex-row relative">
      {/* Background glow highlights */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/2 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/2 rounded-full blur-[100px] pointer-events-none" />

      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-surface-container-low border-b md:border-r border-border-subtle p-6 flex flex-col gap-8 shrink-0 relative z-10 md:h-screen md:sticky md:top-0">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-jakarta font-extrabold text-xl tracking-tight text-on-surface">
              Growmify<span className="text-primary font-mono text-sm ml-1 font-normal">ADMIN</span>
            </span>
          </Link>
        </div>

        {/* User Info Card */}
        <div className="p-4 rounded-2xl bg-surface-container/50 border border-border-subtle/50 flex flex-col gap-1">
          <p className="text-xs text-text-muted font-mono uppercase tracking-wider">Logged In As</p>
          <p className="font-jakarta font-bold text-on-surface">{user?.username || 'Admin'}</p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 flex-grow">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-jakarta font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-primary text-on-primary shadow-lg shadow-primary/10'
                    : 'text-on-surface-variant hover:bg-white/5 hover:text-on-surface'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}

          <div className="border-t border-border-subtle/40 my-4" />

          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-jakarta font-semibold text-on-surface-variant hover:bg-white/5 hover:text-on-surface transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go to Public Site</span>
          </Link>
        </nav>

        {/* Log out button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-jakarta font-semibold text-error/80 hover:bg-error/10 hover:text-error transition-all duration-300 mt-auto border border-error/10"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-6 md:p-12 relative z-10 overflow-x-hidden md:h-screen md:overflow-y-auto">
        <div className="max-w-5xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
