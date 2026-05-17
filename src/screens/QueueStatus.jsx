import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import Popup from '../components/Popup';
import { useApp } from '../context/AppContext';
import { useNotification } from '../context/NotificationContext';
import './QueueStatus.css';

export default function QueueStatus() {
  const { userName } = useApp();
  const location = useLocation();

  const booking = location.state || {};
  const hospital   = booking.hospital   || 'Jigme Dorji Wangchuck National Referral Hospital';
  const department = booking.department || 'General';
  const time       = booking.time       || '09:00 AM';

  const displayName = userName || 'Karma Wangdi';

  const { notify } = useNotification();
  const [appNotification, setAppNotification] = useState(true);
  const [smsNotification, setSmsNotification] = useState(true);
  const [showQRPopup, setShowQRPopup] = useState(false);

  useEffect(() => {
    notify({
      message: `Alert! Your appointment is at ${time}. Your turn is coming up — 20 minutes to go.`,
      type: 'warning',
      duration: 6000,
    });
  }, []);

  return (
    <div className="queue-status-container">
      <Header />
      
      <main className="queue-main">
        <div className="queue-content">
          {/* Patient Header */}
          <section className="patient-header">
            <h2>{displayName}</h2>
            <p className="hospital-name">📍 {hospital}</p>
            <p className="appointment-meta">🏥 {department} &nbsp;·&nbsp; 🕐 {time}</p>
          </section>

          {/* Token Display */}
          <div className="token-display">
            <div className="token-circle">
              <p className="token-label">YOUR TOKEN</p>
              <div className="token-number">A045</div>
            </div>
          </div>

          {/* Live Status Card */}
          <section className="status-card">
            <div className="status-header">
              <div>
                <p className="status-label">Estimated Wait Time</p>
                <p className="wait-time">20 minutes</p>
              </div>
              <div className="on-track-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                <span>On Track</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="progress-info">
              <div className="progress-header">
                <p className="people-ahead">5 people ahead of you</p>
                <p className="queue-ratio">Queue: 40/75</p>
              </div>
              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>
              <div className="progress-labels">
                <span>Entry</span>
                <span>Waiting Room</span>
                <span>Consultation</span>
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button
              className="action-btn qr-btn"
              onClick={() => setShowQRPopup(true)}
            >
              <span className="btn-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                  <rect x="14" y="14" width="3" height="3"/><rect x="18" y="14" width="3" height="3"/><rect x="14" y="18" width="3" height="3"/><rect x="18" y="18" width="3" height="3"/>
                </svg>
              </span>
              <span>Hospital Check-in</span>
            </button>
            <button className="action-btn sms-btn">
              <span className="btn-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                  <circle cx="18" cy="6" r="3" fill="var(--secondary)" stroke="none"/>
                </svg>
              </span>
              <span>SMS Alerts On</span>
            </button>
          </div>

          {/* Notification Toggles */}
          <section className="notifications-section">
            <div className="notification-row">
              <div>
                <p className="notification-label">App Notifications</p>
                <p className="notification-desc">Get updates on status changes</p>
              </div>
              <button 
                className={`toggle ${appNotification ? 'active' : ''}`}
                onClick={() => setAppNotification(!appNotification)}
              >
                {appNotification ? 'ON' : 'OFF'}
              </button>
            </div>
            <div className="notification-row">
              <div>
                <p className="notification-label">SMS Notifications</p>
                <p className="notification-desc">Get updates via text message</p>
              </div>
              <button 
                className={`toggle ${smsNotification ? 'active' : ''}`}
                onClick={() => setSmsNotification(!smsNotification)}
              >
                {smsNotification ? 'ON' : 'OFF'}
              </button>
            </div>
          </section>

          {/* Help Text */}
          <p className="help-text">
            Please remain in the waiting area. We will notify you via SMS and app notification when your turn is near.
          </p>
        </div>
      </main>

      {/* QR Code Popup */}
      <Popup 
        isOpen={showQRPopup} 
        onClose={() => setShowQRPopup(false)}
      >
        <div className="qr-popup">
          <h3>Hospital Check-in</h3>
          <p>Scan this QR code at the hospital reception desk</p>
          <div className="qr-placeholder">
            <div className="qr-box">█████████████████</div>
          </div>
          <p className="qr-instruction">
            Your token <strong>A045</strong> will be registered
          </p>
        </div>
      </Popup>

      <BottomNav />
    </div>
  );
}
