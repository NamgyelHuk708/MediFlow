import './ChatBubble.css';

export default function ChatBubble({ type = 'user', message, severity, severityColor }) {
  return (
    <div className={`chat-bubble chat-bubble-${type}`}>
      {type === 'ai' && <span className="ai-avatar">🤖</span>}
      <div className={`bubble-content bubble-content-${type}`}>
        {severity && (
          <div className={`severity-badge severity-${severityColor}`}>
            {severity}
          </div>
        )}
        <p>{message}</p>
      </div>
    </div>
  );
}
