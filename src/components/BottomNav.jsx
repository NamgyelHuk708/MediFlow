import { useLocation, useNavigate } from 'react-router-dom';
import './BottomNav.css';

const HomeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6l-8-4z" opacity="0.15"/>
    <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6l-8-4z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const FamilyIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === '/admin') {
    return null;
  }

  const navItems = [
    { route: '/dashboard', icon: <HomeIcon />, label: 'Home' },
    { route: '/symptom-checker', icon: <ShieldIcon />, label: 'AI Check', isAI: true },
    { route: '/book-appointment', icon: <CalendarIcon />, label: 'Calendar' },
    { route: '/family-health', icon: <FamilyIcon />, label: 'Family' },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const active = location.pathname === item.route;
        return (
          <button
            key={item.route}
            className={`nav-item ${active ? 'active' : ''} ${item.isAI ? 'nav-ai' : ''}`}
            onClick={() => navigate(item.route)}
          >
            <span className={`nav-icon-wrap ${active && item.isAI ? 'ai-active' : ''}`}>
              {item.icon}
            </span>
            <span className="nav-label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
