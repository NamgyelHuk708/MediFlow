import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import PriorityBanner from '../components/PriorityBanner';
import { useNotification } from '../context/NotificationContext';
import './BookAppointment.css';

const hospitals = [
  'Imtrat Hospital',
  'Jigme Dorji Wangchuck National Referral Hospital',
  'Gyaltsuen Jetsun Pema Wangchuck Mother and Child Hospital',
  'Dechenchholing Hospital',
];

const departments = [
  { id: 'General',  icon: '🏥', label: 'General' },
  { id: 'Dental',   icon: '🦷', label: 'Dental' },
  { id: 'Children', icon: '👶', label: 'Children' },
  { id: 'Heart',    icon: '❤️', label: 'Heart' },
  { id: 'Women',    icon: '🌸', label: "Women's" },
  { id: 'Pharmacy', icon: '💊', label: 'Pharmacy' },
];

const dateOptions = [
  { day: 'OCT', date: 24, dayName: 'Thu' },
  { day: 'OCT', date: 25, dayName: 'Fri' },
  { day: 'OCT', date: 26, dayName: 'Sat' },
];

const timeSlots = [
  { time: '09:00 AM', crowd: 'Low Crowd', crowdColor: 'green' },
  { time: '10:30 AM', crowd: 'High Crowd', crowdColor: 'red' },
  { time: '11:00 AM', crowd: 'Med Crowd', crowdColor: 'yellow' },
  { time: '03:30 PM', crowd: 'Low Crowd', crowdColor: 'green' },
];

export default function BookAppointment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { notify } = useNotification();
  const [selectedHospital, setSelectedHospital] = useState(hospitals[0]);
  const [selectedDepartment, setSelectedDepartment] = useState('General');
  const [selectedDate, setSelectedDate] = useState(25);
  const [selectedTime, setSelectedTime] = useState('09:00 AM');
  const [priorityMode, setPriorityMode] = useState(null);

  useEffect(() => {
    if (location.state?.referred) {
      setPriorityMode('referred');
    } else if (location.state?.priority === 'emergency') {
      setPriorityMode('emergency');
      setSelectedDepartment('General');
    }
  }, [location.state]);

  return (
    <div className="book-appointment-container">
      <Header />

      <main className="book-main">
        <div className="book-content">
          <PriorityBanner mode={priorityMode} />

          {/* Progress Indicator — full width */}
          <div className="progress-indicator">
            <div className="progress-step active">
              <div className="step-number">1</div>
              <span>Hospital</span>
            </div>
            <div className="progress-line active-line"></div>
            <div className="progress-step active">
              <div className="step-number">2</div>
              <span>Department</span>
            </div>
            <div className="progress-line"></div>
            <div className="progress-step">
              <div className="step-number">3</div>
              <span>Schedule</span>
            </div>
          </div>

          {/* Two-column layout on desktop */}
          <div className="book-cols">

            {/* Left — form */}
            <div className="book-form-col">
              <h2 className="book-title">Book Your Visit</h2>

              <div className="form-section">
                <label className="section-label">Which hospital?</label>
                <div className="hospital-selector">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
                    <rect x="3" y="9" width="18" height="13" rx="2"/><path d="M8 9V7a4 4 0 0 1 8 0v2"/><line x1="12" y1="12" x2="12" y2="17"/><line x1="9.5" y1="14.5" x2="14.5" y2="14.5"/>
                  </svg>
                  <select
                    className="hospital-select"
                    value={selectedHospital}
                    onChange={e => setSelectedHospital(e.target.value)}
                  >
                    {hospitals.map(h => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-section">
                <label className="section-label">What kind of doctor do you need?</label>
                <div className="department-grid">
                  {departments.map(dept => (
                    <button
                      key={dept.id}
                      className={`dept-button ${selectedDepartment === dept.id ? 'active' : ''}`}
                      onClick={() => setSelectedDepartment(dept.id)}
                    >
                      <span className="dept-icon">{dept.icon}</span>
                      <span>{dept.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-section">
                <label className="section-label">When do you want to come?</label>
                <div className="date-pills">
                  {dateOptions.map(d => (
                    <button
                      key={d.date}
                      className={`date-pill ${selectedDate === d.date ? 'active' : ''}`}
                      onClick={() => setSelectedDate(d.date)}
                    >
                      <span className="date-month">{d.day}</span>
                      <span className="date-num">{d.date}</span>
                    </button>
                  ))}
                </div>
                <div className="time-slots">
                  {timeSlots.map(slot => (
                    <button
                      key={slot.time}
                      className={`time-slot ${selectedTime === slot.time ? 'active' : ''}`}
                      onClick={() => slot.crowdColor !== 'red' && setSelectedTime(slot.time)}
                      disabled={slot.crowdColor === 'red'}
                    >
                      <span className="time-text">{slot.time}</span>
                      <span className={`crowd-tag crowd-${slot.crowdColor}`}>{slot.crowd}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                className="confirm-button"
                onClick={() => {
                  notify({
                    message: 'Appointment booked successfully!',
                    type: 'success',
                    duration: 4000,
                  });
                  navigate('/queue-status', {
                    state: {
                      hospital: selectedHospital,
                      department: selectedDepartment,
                      date: selectedDate,
                      time: selectedTime,
                    }
                  });
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Confirm Booking
              </button>

              <div className="info-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--on-surface-variant)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0,marginTop:1}}>
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <p>Note: <strong>Priority is automatically set</strong> if referred by AI. Your symptoms indicate an urgent follow-up is recommended.</p>
              </div>
            </div>

            {/* Right — sidebar */}
            <div className="book-side-col">
              <div className="ai-context-card">
                <div className="ai-context-header">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  <span className="ai-context-label">AI Health Context</span>
                </div>
                <p className="ai-context-body">Based on your recent AI check for "Frequent Headaches", we've pre-selected General Medicine at JDWNRH for the earliest available specialist slot.</p>
                <div className="ai-recommendation-badge">
                  <span>AI RECOMMENDATION</span>
                  <span className="recommendation-id">Urgent Referral Priority #742</span>
                </div>
              </div>

              <div className="hospital-map-card">
                <div className="hospital-image-placeholder">
                  <div className="hospital-img-overlay">
                    <div className="mountain-silhouette">
                      <svg viewBox="0 0 300 120" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
                        <rect width="300" height="120" fill="#4a7c59"/>
                        <polygon points="0,120 80,40 160,120" fill="#2d5a3d"/>
                        <polygon points="60,120 150,30 240,120" fill="#3a6b48"/>
                        <polygon points="140,120 220,55 300,120" fill="#2d5a3d"/>
                        <rect x="110" y="70" width="80" height="50" fill="#c8d8e8"/>
                        <rect x="125" y="60" width="50" height="60" fill="#d4e4f4"/>
                        <rect x="130" y="65" width="15" height="20" fill="#8ab0cc"/>
                        <rect x="155" y="65" width="15" height="20" fill="#8ab0cc"/>
                        <rect x="138" y="90" width="24" height="30" fill="#9ab8d0"/>
                        <rect x="125" y="52" width="50" height="8" fill="#b0c4d8"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="hospital-map-info">
                  <p className="hospital-map-name">JDWNRH Main Campus</p>
                  <p className="hospital-map-sub">Gongphel Lam, Thimphu, Bhutan</p>
                  <button className="directions-btn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="3 11 22 2 13 21 11 13 3 11"/>
                    </svg>
                    Get Directions
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
