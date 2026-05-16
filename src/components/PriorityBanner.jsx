import './PriorityBanner.css';

export default function PriorityBanner({ mode }) {
  if (!mode) return null;

  if (mode === 'referred') {
    return (
      <div className="priority-banner priority-banner-referred">
        <span className="banner-icon">📌</span>
        <div>
          <h3>Priority Set</h3>
          <p>Your priority has been automatically set based on your AI diagnosis.</p>
        </div>
      </div>
    );
  }

  if (mode === 'emergency') {
    return (
      <div className="priority-banner priority-banner-emergency">
        <span className="banner-icon">🚨</span>
        <div>
          <h3>Emergency Priority</h3>
          <p>Emergency Priority has been set. You will be seen urgently.</p>
        </div>
      </div>
    );
  }

  return null;
}
