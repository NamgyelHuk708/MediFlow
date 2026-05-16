import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import './Placeholder.css';

export default function HomeRemedy() {
  const navigate = useNavigate();

  return (
    <div className="placeholder-container">
      <Header title="Home Remedies" showBack={true} backRoute="/dashboard" />
      
      <main className="placeholder-main">
        <div className="placeholder-content">
          <div className="placeholder-emoji">🌿</div>
          <h2>Home Remedies</h2>
          <p>This feature is coming soon</p>
          <p className="dzongkha">ཁང་གི་སྨན་ལ་སོགས།</p>
          <button className="back-btn" onClick={() => navigate('/dashboard')}>
            ← Back to Home
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
