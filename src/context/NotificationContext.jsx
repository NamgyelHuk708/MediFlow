import { createContext, useContext, useState, useCallback, useRef } from 'react';

const NotificationContext = createContext(null);

function speak(message) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.rate = 0.92;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;
  window.speechSynthesis.speak(utterance);
}

export function NotificationProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const notify = useCallback(({ message, type = 'info', voice = true, duration = 5000 }) => {
    const id = ++idRef.current;

    setToasts(prev => {
      const next = [...prev, { id, message, type, duration }];
      return next.slice(-3); // keep at most 3 toasts
    });

    if (voice) speak(message);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration + 400);
  }, []);

  const dismiss = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ notify, toasts, dismiss }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  return useContext(NotificationContext);
}
