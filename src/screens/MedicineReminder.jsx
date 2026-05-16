import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import './Placeholder.css';

export default function MedicineReminder() {
  const navigate = useNavigate();

  return (
    <div className="placeholder-container">
      <Header title="Medicine Reminder" showBack={true} backRoute="/dashboard" />
      
      <main className="placeholder-main">
        <div className="placeholder-content">
          <div className="placeholder-emoji">💊</div>
          <h2>Medicine Reminder</h2>
          <p>This feature is coming soon</p>
          <p className="dzongkha">སྨན་ཆེ་མཆོག་ཡིན་གདུགས་སོགས།</p>
          <button className="back-btn" onClick={() => navigate('/dashboard')}>
            ← Back to Home
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
