import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import './Placeholder.css';

export default function Nutrition() {
  const navigate = useNavigate();

  return (
    <div className="placeholder-container">
      <Header title="Nutrition Guide" showBack={true} backRoute="/dashboard" />
      
      <main className="placeholder-main">
        <div className="placeholder-content">
          <div className="placeholder-emoji">🥗</div>
          <h2>Nutrition Guide</h2>
          <p>This feature is coming soon</p>
          <p className="dzongkha">གསོ་ལས་དམ་དེ་སོགས།</p>
          <button className="back-btn" onClick={() => navigate('/dashboard')}>
            ← Back to Home
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
