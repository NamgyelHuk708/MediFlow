import { useNotification } from '../context/NotificationContext';
import NotificationToast from './NotificationToast';
import './NotificationToast.css';

export default function NotificationContainer() {
  const { toasts, dismiss } = useNotification();

  return (
    <div className="n-toast-container">
      {toasts.map(toast => (
        <NotificationToast
          key={toast.id}
          {...toast}
          onDismiss={() => dismiss(toast.id)}
        />
      ))}
    </div>
  );
}
