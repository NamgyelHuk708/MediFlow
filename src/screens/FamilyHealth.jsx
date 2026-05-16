import { useState } from 'react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import Popup from '../components/Popup';
import { useApp } from '../context/AppContext';
import './FamilyHealth.css';

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const BellIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const HeartIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

/* ── Popup content components ── */

function RecordsPopup({ name, cid }) {
  return (
    <div className="detail-popup">
      <div className="detail-popup-header">
        <div className="detail-avatar karma-avatar">{name[0]}</div>
        <div>
          <h3>{name}</h3>
          {cid && <p className="detail-cid">CID: {cid}</p>}
        </div>
      </div>

      <div className="detail-section">
        <p className="detail-section-title">Last Visit</p>
        <div className="detail-row"><span className="dr-label">Date</span><span className="dr-val">Oct 10, 2024</span></div>
        <div className="detail-row"><span className="dr-label">Type</span><span className="dr-val">General Checkup</span></div>
        <div className="detail-row"><span className="dr-label">Doctor</span><span className="dr-val">Dr. Tenzin Wangchuk</span></div>
        <div className="detail-row"><span className="dr-label">Hospital</span><span className="dr-val">JDWNRH, Thimphu</span></div>
      </div>

      <div className="detail-section">
        <p className="detail-section-title">Diagnosis</p>
        <div className="diagnosis-chip warning">Mild Hypertension (Stage 1)</div>
      </div>

      <div className="detail-section">
        <p className="detail-section-title">Current Medications</p>
        <div className="med-row">
          <span className="med-name">Amlodipine 5mg</span>
          <span className="med-freq">Once daily</span>
        </div>
        <div className="med-row">
          <span className="med-name">Vitamin D 1000 IU</span>
          <span className="med-freq">Once daily</span>
        </div>
      </div>

      <div className="detail-section">
        <p className="detail-section-title">Lab Results — Oct 2024</p>
        <div className="lab-row"><span className="lab-name">Blood Sugar</span><span className="lab-val">95 mg/dL</span><span className="lab-status normal">Normal</span></div>
        <div className="lab-row"><span className="lab-name">Cholesterol</span><span className="lab-val">182 mg/dL</span><span className="lab-status normal">Normal</span></div>
        <div className="lab-row"><span className="lab-name">Hemoglobin</span><span className="lab-val">14.2 g/dL</span><span className="lab-status normal">Normal</span></div>
        <div className="lab-row"><span className="lab-name">Blood Pressure</span><span className="lab-val">120/80 mmHg</span><span className="lab-status caution">Watch</span></div>
      </div>

      <div className="detail-section">
        <p className="detail-section-title">Upcoming</p>
        <div className="upcoming-item">
          <CalendarIcon />
          <span>Annual Physical Check-up — Nov 5, 2024</span>
        </div>
      </div>
    </div>
  );
}

function VitalsPopup() {
  const bpHistory = [
    { day: 'Mon', bp: '138/90' },
    { day: 'Tue', bp: '135/88' },
    { day: 'Wed', bp: '140/92' },
    { day: 'Thu', bp: '132/85' },
    { day: 'Fri', bp: '136/88' },
    { day: 'Sat', bp: '134/86' },
    { day: 'Sun', bp: '135/88' },
  ];

  return (
    <div className="detail-popup">
      <div className="detail-popup-header">
        <div className="detail-avatar sonam-avatar">S</div>
        <div>
          <h3>Sonam Dorji</h3>
          <p className="detail-cid">CID: 10101234567 · Age 67</p>
        </div>
      </div>

      <div className="detail-section">
        <p className="detail-section-title">Current Readings</p>
        <div className="vitals-grid">
          <div className="vital-card"><span className="vital-val">135/88</span><span className="vital-key">Blood Pressure</span><span className="vital-status caution">Elevated</span></div>
          <div className="vital-card"><span className="vital-val">72 bpm</span><span className="vital-key">Heart Rate</span><span className="vital-status normal">Normal</span></div>
          <div className="vital-card"><span className="vital-val">98.2°F</span><span className="vital-key">Temperature</span><span className="vital-status normal">Normal</span></div>
          <div className="vital-card"><span className="vital-val">97%</span><span className="vital-key">SpO₂</span><span className="vital-status normal">Normal</span></div>
        </div>
      </div>

      <div className="detail-section">
        <p className="detail-section-title">BP History — Last 7 Days</p>
        <div className="bp-history">
          {bpHistory.map(h => (
            <div key={h.day} className="bp-day">
              <span className="bp-day-label">{h.day}</span>
              <span className="bp-day-val">{h.bp}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="detail-section">
        <p className="detail-section-title">Medications</p>
        <div className="med-row alert-med">
          <span className="med-name">Metformin 500mg</span>
          <span className="med-refill">⚠ Refill needed</span>
        </div>
        <div className="med-row">
          <span className="med-name">Atenolol 25mg</span>
          <span className="med-freq">Once daily · BP</span>
        </div>
        <div className="med-row">
          <span className="med-name">Aspirin 81mg</span>
          <span className="med-freq">Once daily · Heart</span>
        </div>
      </div>

      <div className="detail-section">
        <p className="detail-section-title">Schedule</p>
        <div className="upcoming-item"><CalendarIcon /><span>BP Check — Today at 4:00 PM</span></div>
        <div className="upcoming-item"><CalendarIcon /><span>Cardiology Follow-up — Oct 28, 2024</span></div>
      </div>
    </div>
  );
}

function PregnancyPopup() {
  const milestones = [
    { week: 'Week 8',  event: 'First ultrasound — heartbeat confirmed', done: true },
    { week: 'Week 16', event: 'Gender reveal scan — healthy baby girl', done: true },
    { week: 'Week 20', event: 'First baby movement felt', done: true },
    { week: 'Week 22', event: 'Anatomy scan — all normal', done: true },
    { week: 'Week 28', event: 'Glucose tolerance test', done: false },
    { week: 'Week 32', event: 'Growth scan', done: false },
  ];

  return (
    <div className="detail-popup">
      <div className="detail-popup-header">
        <div className="detail-avatar pema-avatar">P</div>
        <div>
          <h3>Pema Choden</h3>
          <p className="detail-cid">CID: 10209876543 · Age 29</p>
        </div>
      </div>

      <div className="detail-section">
        <p className="detail-section-title">Pregnancy Progress</p>
        <div className="preg-progress-wrap">
          <div className="preg-progress-labels">
            <span>Week 24 of 40</span>
            <span>2nd Trimester</span>
          </div>
          <div className="pregnancy-progress-bar" style={{height: 10}}>
            <div className="pregnancy-progress-fill" style={{ width: '60%' }} />
          </div>
          <p className="preg-due">Estimated Due Date: Jan 28, 2025</p>
        </div>
      </div>

      <div className="detail-section">
        <p className="detail-section-title">Current Stats</p>
        <div className="vitals-grid">
          <div className="vital-card"><span className="vital-val">110/70</span><span className="vital-key">Blood Pressure</span><span className="vital-status normal">Normal</span></div>
          <div className="vital-card"><span className="vital-val">148 bpm</span><span className="vital-key">Baby Heart Rate</span><span className="vital-status normal">Normal</span></div>
          <div className="vital-card"><span className="vital-val">62 kg</span><span className="vital-key">Weight</span><span className="vital-status normal">+8 kg</span></div>
          <div className="vital-card"><span className="vital-val">88 bpm</span><span className="vital-key">Mother HR</span><span className="vital-status normal">Normal</span></div>
        </div>
      </div>

      <div className="detail-section">
        <p className="detail-section-title">Milestones</p>
        {milestones.map(m => (
          <div key={m.week} className={`milestone-row ${m.done ? 'done' : 'upcoming'}`}>
            <span className="milestone-dot">{m.done ? '✓' : '○'}</span>
            <div>
              <span className="milestone-week">{m.week}</span>
              <span className="milestone-event">{m.event}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="detail-section">
        <p className="detail-section-title">Upcoming Appointments</p>
        <div className="upcoming-item"><CalendarIcon /><span>Ultrasound Scan — Oct 20, 2024</span></div>
        <div className="upcoming-item"><CalendarIcon /><span>OB Checkup — Nov 3, 2024</span></div>
        <div className="upcoming-item"><CalendarIcon /><span>Glucose Test — Nov 10, 2024</span></div>
      </div>
    </div>
  );
}

/* ── Main screen ── */

export default function FamilyHealth() {
  const { userName, userCID } = useApp();
  const displayName = userName || 'You';
  const firstName   = displayName.split(' ')[0];
  const initial     = firstName[0]?.toUpperCase() ?? '?';

  const [activePopup, setActivePopup] = useState(null); // 'records' | 'vitals' | 'pregnancy'
  const [alertVisible, setAlertVisible] = useState(true);

  const open  = (type) => setActivePopup(type);
  const close = ()     => setActivePopup(null);

  return (
    <div className="family-health-container">
      <Header />

      <main className="family-main">
        <div className="family-content">

          {alertVisible && (
            <div className="alert-banner">
              <div className="alert-icon-wrap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <div className="alert-content">
                <p className="alert-title">Community Health Alert</p>
                <p className="alert-body">Flu outbreak in Paro District. Ensure vaccinations are up to date and maintain hygiene protocols.</p>
              </div>
              <button className="alert-close" onClick={() => setAlertVisible(false)}>✕</button>
            </div>
          )}

          <div className="family-section-header">
            <h2>Family Health Overview</h2>
            <p className="section-subtitle">Manage and monitor the health status of your household members.</p>
          </div>

          <div className="family-cards-grid">

            {/* ── SELF ── */}
            <div className="family-card">
              <div className="card-top">
                <div className="member-avatar karma-avatar">{initial}</div>
                <div className="member-info">
                  <h3>{displayName}</h3>
                  <span className="member-relation self-badge">Self</span>
                </div>
                <span className="status-check"><CheckIcon /></span>
              </div>
              {userCID && (
                <div className="card-meta-row">
                  <span className="meta-label">CID</span>
                  <span className="meta-value">{userCID}</span>
                </div>
              )}
              <div className="card-reminder-row">
                <BellIcon />
                <span className="reminder-label">Reminder</span>
              </div>
              <p className="reminder-text">Annual physical check-up due in 12 days.</p>
              <div className="card-stats-row">
                <div className="stat-chip"><span className="stat-val">120/80</span><span className="stat-key">Blood Pressure</span></div>
                <div className="stat-chip"><span className="stat-val">98.6°F</span><span className="stat-key">Temp</span></div>
              </div>
              <button className="member-action-btn view-btn" onClick={() => open('records')}>View Records</button>
            </div>

            {/* ── Sonam – Parent ── */}
            <div className="family-card">
              <div className="card-top">
                <div className="member-avatar sonam-avatar">S</div>
                <div className="member-info">
                  <h3>Sonam Dorji</h3>
                  <span className="member-relation parent-badge">Parent</span>
                </div>
                <div className="monitoring-top-right">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--on-surface-variant)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                </div>
              </div>
              <div className="elderly-monitoring-row">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
                <span className="elderly-label">Elderly Monitoring</span>
                <span className="active-badge">ACTIVE</span>
              </div>
              <div className="card-stats-row">
                <div className="stat-chip"><span className="stat-val">135/88</span><span className="stat-key">Blood Pressure</span></div>
                <div className="stat-chip"><span className="stat-val">72 bpm</span><span className="stat-key">Heart Rate</span></div>
              </div>
              <div className="next-check-row">
                <CalendarIcon />
                <div>
                  <p className="next-check-label">Next BP Check</p>
                  <p className="next-check-time">Today at 4:00 PM</p>
                </div>
              </div>
              <div className="medication-alert-row">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#e74c3c" stroke="none"><circle cx="12" cy="12" r="10"/></svg>
                <span className="medication-alert-text">Medication Refill Needed</span>
              </div>
              <button className="member-action-btn monitor-btn" onClick={() => open('vitals')}>Monitor Vitals</button>
            </div>

            {/* ── Pema – Spouse ── */}
            <div className="family-card">
              <div className="card-top">
                <div className="member-avatar pema-avatar">P</div>
                <div className="member-info">
                  <h3>Pema Choden</h3>
                  <span className="member-relation spouse-badge">Spouse</span>
                </div>
                <div className="monitoring-top-right"><HeartIcon /></div>
              </div>
              <div className="pregnancy-tracker-row">
                <span className="pregnancy-label">Pregnancy Tracker</span>
                <span className="week-badge">Week 24</span>
              </div>
              <div className="pregnancy-progress-bar">
                <div className="pregnancy-progress-fill" style={{ width: '60%' }} />
              </div>
              <div className="card-stats-row">
                <div className="stat-chip"><span className="stat-val">110/70</span><span className="stat-key">Blood Pressure</span></div>
                <div className="stat-chip"><span className="stat-val">148 bpm</span><span className="stat-key">Baby HR</span></div>
              </div>
              <div className="upcoming-appointment-row">
                <CalendarIcon />
                <div>
                  <p className="upcoming-label">Upcoming Appointment</p>
                  <p className="upcoming-text">Ultrasound Scan — Fri, Oct 20</p>
                </div>
              </div>
              <button className="member-action-btn view-btn" onClick={() => open('pregnancy')}>View Pregnancy Log</button>
            </div>

          </div>
        </div>
      </main>

      <button className="add-member-fab">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Add Family Member
      </button>

      {/* Records Popup */}
      <Popup isOpen={activePopup === 'records'} onClose={close}>
        <RecordsPopup name={displayName} cid={userCID} />
      </Popup>

      {/* Vitals Popup */}
      <Popup isOpen={activePopup === 'vitals'} onClose={close}>
        <VitalsPopup />
      </Popup>

      {/* Pregnancy Log Popup */}
      <Popup isOpen={activePopup === 'pregnancy'} onClose={close}>
        <PregnancyPopup />
      </Popup>

      <BottomNav />
    </div>
  );
}
