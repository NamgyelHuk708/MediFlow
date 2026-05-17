import { useEffect, useState } from 'react';
import './NotificationToast.css';

const ICONS = {
  success: '✅',
  info:    'ℹ️',
  warning: '⚠️',
  error:   '🚨',
};

export default function NotificationToast({ id, message, type, duration, onDismiss }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDismiss, 350);
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  function close() {
    setVisible(false);
    setTimeout(onDismiss, 350);
  }

  return (
    <div className={`n-toast n-toast-${type} ${visible ? 'n-toast-in' : ''}`}>
      <span className="n-toast-icon">{ICONS[type]}</span>
      <p className="n-toast-msg">{message}</p>
      <button className="n-toast-close" onClick={close} aria-label="Dismiss">×</button>
      <div className="n-toast-bar" style={{ animationDuration: `${duration}ms` }} />
    </div>
  );
}
