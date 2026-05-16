import { useState } from 'react';
import './AdminPortal.css';

const DashboardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);

const PatientsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const QueueIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);

const AnalyticsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);

const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

const navItems = [
  { label: 'Dashboard', icon: <DashboardIcon /> },
  { label: 'Patients', icon: <PatientsIcon /> },
  { label: 'Queue', icon: <QueueIcon />, active: true },
  { label: 'Analytics', icon: <AnalyticsIcon /> },
];

const avatarColors = {
  'PT': '#e74c3c',
  'SK': '#27ae60',
  'DW': '#3498db',
  'TJ': '#9b59b6',
};

export default function AdminPortal() {
  const [queue] = useState([
    { id: 1, token: '#TK-442', initials: 'PT', name: 'Pema Tshering', department: 'General Med', time: '10:42 AM', priority: 'emergency' },
    { id: 2, token: '#TK-445', initials: 'SK', name: 'Sonam Kezang', department: 'Cardiology', time: '10:55 AM', priority: 'elderly' },
    { id: 3, token: '#TK-448', initials: 'DW', name: 'Dorji Wangmo', department: 'Pediatrics', time: '11:05 AM', priority: 'regular' },
    { id: 4, token: '#TK-449', initials: 'TJ', name: 'Tenzin Jigme', department: 'Dermatology', time: '11:10 AM', priority: 'regular' },
  ]);

  const priorityConfig = {
    emergency: { label: 'EMERGENCY', bg: '#ba1a1a', color: 'white' },
    elderly: { label: 'ELDERLY', bg: '#d97706', color: 'white' },
    regular: { label: 'REGULAR', bg: '#006d37', color: 'white' },
  };

  return (
    <div className="admin-portal-container">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-left">
          <button className="admin-hamburger">
            <span></span><span></span><span></span>
          </button>
          <div className="admin-title-group">
            <span className="admin-app-name">MediFlow</span>
            <span className="admin-dzongkha">འབྲུག་གཅེས་རོགས་ཨེ་ཨའི།</span>
          </div>
        </div>
        <div className="admin-header-right">
          <div className="lang-toggle">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span>English / རྫོང་ཁ།</span>
          </div>
          <div className="admin-avatar">KW</div>
        </div>
      </header>

      <div className="admin-layout">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <nav className="sidebar-nav">
            {navItems.map(item => (
              <a key={item.label} className={`sidebar-nav-item ${item.active ? 'active' : ''}`}>
                <span className="sidebar-icon">{item.icon}</span>
                <span>{item.label}</span>
              </a>
            ))}
            <div className="sidebar-divider"></div>
            <a className="sidebar-nav-item">
              <span className="sidebar-icon"><SettingsIcon /></span>
              <span>Settings</span>
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="admin-main">
          <div className="admin-content">
            {/* Content Header */}
            <div className="content-header">
              <div>
                <h2>Live Patient Queue</h2>
                <p>Managing Jigme Dorji Wangchuck Referral Hospital Cluster</p>
              </div>
              <div className="header-actions">
                <button className="action-btn outline-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Mark as Served
                </button>
                <button className="action-btn primary">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                  Call Next Patient
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon-wrap">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div>
                  <p className="stat-label">Total Patients</p>
                  <p className="stat-value">142</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon-wrap">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div>
                  <p className="stat-label">Avg Wait Time</p>
                  <p className="stat-value">18m</p>
                </div>
              </div>
              <div className="stat-card busy-dept-card">
                <div className="busy-asterisk">*</div>
                <div>
                  <p className="stat-label">Busy Dept</p>
                  <p className="stat-value busy-dept-value">General Med</p>
                </div>
              </div>
            </div>

            {/* Queue Table */}
            <div className="queue-table-section">
              <div className="table-header">
                <h3>Current Queue</h3>
                <div className="search-wrapper">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--on-surface-variant)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <input type="text" placeholder="Filter by name or token..." className="search-input" />
                </div>
              </div>

              <div className="table-wrapper">
                <table className="queue-table">
                  <thead>
                    <tr>
                      <th>TOKEN #</th>
                      <th>PATIENT NAME</th>
                      <th>DEPARTMENT</th>
                      <th>TIME CHECKED IN</th>
                      <th>PRIORITY</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {queue.map(patient => (
                      <tr key={patient.id}>
                        <td className="token-cell">{patient.token}</td>
                        <td>
                          <div className="patient-cell">
                            <div
                              className="patient-avatar"
                              style={{ background: avatarColors[patient.initials] || '#3a5f94' }}
                            >
                              {patient.initials}
                            </div>
                            <span>{patient.name}</span>
                          </div>
                        </td>
                        <td>{patient.department}</td>
                        <td>{patient.time}</td>
                        <td>
                          <span
                            className="priority-badge"
                            style={{
                              backgroundColor: priorityConfig[patient.priority].bg,
                              color: priorityConfig[patient.priority].color,
                            }}
                          >
                            {priorityConfig[patient.priority].label}
                          </span>
                        </td>
                        <td>
                          <button className="details-link">Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="table-footer">
                  <span>Showing 4 of 28 patients in current queue</span>
                  <div className="pagination">
                    <button className="page-btn">‹</button>
                    <button className="page-btn">›</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
