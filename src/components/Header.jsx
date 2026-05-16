import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Header.css';

function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function Header({ showBack = false, backRoute = '/' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { userName } = useApp();

  // Only show header on app screens (not welcome or admin)
  const hiddenRoutes = ['/', '/admin'];
  if (hiddenRoutes.includes(location.pathname)) return null;

  return (
    <header className="header">
      <div className="header-left">
        {showBack && (
          <button className="header-back-btn" onClick={() => navigate(backRoute)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}
        <div className="header-title-group">
          <span className="header-app-name">MediFlow</span>
          <span className="header-dzongkha">འབྲུག་གཅེས་རོགས་ཨེ་ཨའི།</span>
        </div>
      </div>
      <div className="header-right">
        <button className="icon-btn bell-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
        <div className="avatar-circle">{getInitials(userName)}</div>
      </div>
    </header>
  );
}
