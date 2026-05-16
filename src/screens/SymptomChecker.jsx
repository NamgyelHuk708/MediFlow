import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import ChatBubble from '../components/ChatBubble';
import Popup from '../components/Popup';
import { symptomResponses } from '../data/symptomResponses';
import './SymptomChecker.css';

export default function SymptomChecker() {
  const navigate = useNavigate();
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [chatVisible, setChatVisible] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [showEmergencyPopup, setShowEmergencyPopup] = useState(false);

  const handleChipClick = (response) => {
    setSelectedResponse(response);
    setChatVisible(false);
    setShowActions(false);
    setShowEmergencyPopup(false);

    // Show user message immediately
    setTimeout(() => setChatVisible(true), 0);
    
    // Show AI response after delay
    setTimeout(() => setChatVisible(true), 1000);
    
    // Show action buttons after another delay
    setTimeout(() => setShowActions(true), 1500);
  };

  const handleAction = (action) => {
    if (action.emergency) {
      setShowEmergencyPopup(true);
      return;
    }
    
    const state = {};
    if (action.referred) state.referred = true;
    if (action.priority) state.priority = action.priority;
    
    navigate(action.route, { state });
  };

  return (
    <div className="symptom-checker-container">
      <Header title="Symptom Checker" showBack={true} backRoute="/dashboard" />
      
      <main className="symptom-main">
        <div className="symptom-content">
          {/* Initial AI Message */}
          <ChatBubble 
            type="ai" 
            message="How are you feeling today? ཁྱེད་རང་ད་རེས་ག་འདྲ་སྦེ་ཡོད?"
          />

          {/* Symptom Chips */}
          <div className="chips-section">
            {symptomResponses.map((response) => (
              <button
                key={response.id}
                className="chip"
                onClick={() => handleChipClick(response)}
              >
                <span className="chip-emoji">{response.emoji}</span>
                <span className="chip-text">{response.chip}</span>
              </button>
            ))}
          </div>

          {/* User Message */}
          {selectedResponse && chatVisible && (
            <ChatBubble 
              type="user" 
              message={selectedResponse.userMessage}
            />
          )}

          {/* AI Response */}
          {selectedResponse && chatVisible && (
            <ChatBubble 
              type="ai" 
              message={selectedResponse.message}
              severity={selectedResponse.severity}
              severityColor={selectedResponse.severityColor}
            />
          )}

          {/* Action Buttons */}
          {selectedResponse && showActions && (
            <div className="actions-section">
              {selectedResponse.actions.map((action, idx) => (
                <button
                  key={idx}
                  className="action-button"
                  onClick={() => handleAction(action)}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Chat Input */}
      <div className="chat-input-bar">
        <input 
          type="text" 
          placeholder="Type symptoms or record audio..."
          className="chat-input"
        />
        <button className="send-btn">📤</button>
        <button className="mic-btn">🎤</button>
      </div>

      {/* Emergency Popup */}
      <Popup 
        isOpen={showEmergencyPopup} 
        onClose={() => setShowEmergencyPopup(false)}
      >
        <div className="emergency-popup">
          <div className="emergency-emoji">🚨</div>
          <h3>Emergency Contact</h3>
          <p>Please call 112 immediately</p>
          <button 
            className="emergency-btn"
            onClick={() => {
              setShowEmergencyPopup(false);
              // In real app, would open phone dialer
            }}
          >
            📞 Call Now
          </button>
        </div>
      </Popup>

      <BottomNav />
    </div>
  );
}
