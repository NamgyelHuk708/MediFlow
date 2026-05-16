import { useLocation, useNavigate } from 'react-router-dom';
import './SideNav.css';

const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const FamilyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const QueueIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

const MedicineIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
    <line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
  </svg>
);

const navItems = [
  { route: '/dashboard',        icon: <HomeIcon />,     label: 'Home' },
  { route: '/symptom-checker',  icon: <ShieldIcon />,   label: 'AI Check' },
  { route: '/book-appointment', icon: <CalendarIcon />, label: 'Calendar' },
  { route: '/family-health',    icon: <FamilyIcon />,   label: 'Family' },
  { route: '/queue-status',     icon: <QueueIcon />,    label: 'Queue Status' },
  { route: '/medicine-reminder',icon: <MedicineIcon />, label: 'Medicine' },
];

export default function SideNav() {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === '/admin') return null;

  return (
    <aside className="side-nav">
      {/* Branding */}
      <div className="side-nav-brand">
        <div className="brand-logo">
          <svg width="28" height="28" viewBox="0 0 120 120" fill="none">
            <rect x="46" y="10" width="28" height="80" rx="6" fill="#003366" />
            <rect x="20" y="36" width="80" height="28" rx="6" fill="#003366" />
            <circle cx="60" cy="55" r="8" fill="#006d37" />
          </svg>
        </div>
        <div>
          <p className="brand-name">MediFlow</p>
          <p className="brand-dz">འབྲུག་གཅེས་རོགས་</p>
        </div>
      </div>

      <div className="side-nav-divider" />

      {/* Nav Items */}
      <nav className="side-nav-items">
        {navItems.map(item => {
          const active = location.pathname === item.route;
          return (
            <button
              key={item.route}
              className={`side-nav-item ${active ? 'active' : ''}`}
              onClick={() => navigate(item.route)}
            >
              <span className="side-nav-icon">{item.icon}</span>
              <span className="side-nav-label">{item.label}</span>
              {active && <span className="active-indicator" />}
            </button>
          );
        })}
      </nav>

      <div className="side-nav-divider" />

      {/* Admin Link */}
      <button
        className="side-nav-item admin-link"
        onClick={() => navigate('/admin')}
      >
        <span className="side-nav-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </span>
        <span className="side-nav-label">Admin Portal</span>
      </button>
    </aside>
  );
}
