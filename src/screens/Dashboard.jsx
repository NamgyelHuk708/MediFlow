import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { useApp } from '../context/AppContext';
import { useNotification } from '../context/NotificationContext';
import './Dashboard.css';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  return 'Good Evening';
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { userName } = useApp();
  const { notify } = useNotification();
  const firstName = userName ? userName.split(' ')[0] : 'there';

  useEffect(() => {
    const greeting = getGreeting();
    const name = firstName !== 'there' ? firstName : 'there';
    notify({
      message: `${greeting}, ${name}! You have 2 medicine reminders due today.`,
      type: 'info',
      duration: 6000,
    });
  }, []);

  return (
    <div className="dashboard-container">
      <Header />

      <main className="dashboard-main">
        <div className="dashboard-content">
          {/* Greeting Section */}
          <section className="greeting-section">
            <h2>{getGreeting()}, {firstName}</h2>
            <p className="dzongkha-text"> {firstName}</p>
          </section>

          {/* Health Tip Card */}
          <section className="health-tip-card">
            <div className="health-tip-left">
              <div className="health-tip-label-row">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--secondary)" className="tip-pin-icon">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span className="health-tip-category">Health Tip of the Day</span>
              </div>
              <p className="health-tip-text">Stay hydrated! Drink plenty of water today.</p>
              <p className="dzongkha-text small-dz">ཆུ་མང་རབས་བཞེས་གནང་།</p>
            </div>
            <div className="health-tip-image">
              <div className="leaf-water-img">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                  <ellipse cx="28" cy="32" rx="22" ry="18" fill="#2d7a3a" opacity="0.85"/>
                  <ellipse cx="28" cy="30" rx="18" ry="14" fill="#3a9e4a" opacity="0.7"/>
                  <circle cx="22" cy="24" r="4" fill="#5bc8e8" opacity="0.85"/>
                  <circle cx="32" cy="20" r="3" fill="#5bc8e8" opacity="0.7"/>
                  <circle cx="36" cy="30" r="2.5" fill="#5bc8e8" opacity="0.6"/>
                </svg>
              </div>
            </div>
          </section>

          {/* Primary Actions */}
          <section className="primary-actions">
            <button
              className="action-card action-card-primary"
              onClick={() => navigate('/symptom-checker')}
            >
              <span className="action-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </span>
              <div className="action-text">
                <span className="action-title">Check My Symptoms with AI</span>
                <span className="dzongkha-text small-dz">ཨེ་ཨའེ་ཐོག་ལས་ནད་རྟགས་བརྟག་དཔྱད་གནང་།</span>
              </div>
            </button>
            <button
              className="action-card action-card-secondary"
              onClick={() => navigate('/book-appointment')}
            >
              <span className="action-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </span>
              <div className="action-text">
                <span className="action-title">Book Appointment Directly</span>
                <span className="dzongkha-text small-dz">དུས་ཚོད་མངགས་སྒྲིག་གནང་།</span>
              </div>
            </button>
          </section>

          {/* Quick Access Grid */}
          <section className="quick-access">
            <h3 className="section-title">Quick Access</h3>
            <div className="quick-access-grid">
              <div className="quick-access-card" onClick={() => navigate('/medicine-reminder')}>
                <div className="card-icon-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
                  </svg>
                </div>
                <p className="card-title">Medicine Reminder</p>
                <p className="card-subtitle">2 Due Today</p>
              </div>
              <div className="quick-access-card" onClick={() => navigate('/family-health')}>
                <div className="card-icon-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <p className="card-title">Family Health</p>
                <p className="card-subtitle">3 Profiles Linked</p>
              </div>
              <div className="quick-access-card" onClick={() => navigate('/queue-status')}>
                <div className="card-icon-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                </div>
                <p className="card-title">Queue Status</p>
                <p className="card-subtitle">JDWNRH: 4th in line</p>
              </div>
              <div className="quick-access-card" onClick={() => navigate('/telemedicine')}>
                <div className="card-icon-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </svg>
                </div>
                <p className="card-title">Telemedicine</p>
                <p className="card-subtitle">Instant Consult</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
