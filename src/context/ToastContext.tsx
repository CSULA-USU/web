// ToastContext.tsx
import {
  ReactNode,
  useContext,
  useState,
  useCallback,
  createContext,
} from 'react';
import { Toast } from 'components/Toast';

type ToastType = 'success' | 'error';

interface ToastState {
  message: string;
  type: ToastType;
  isVisible: boolean;
}

interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

// ✅ Guard so consumers always get a non-null context
export function useToast(): ToastContextType {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a <ToastProvider>');
  }
  return ctx;
}

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState>({
    message: '',
    type: 'success',
    isVisible: false,
  });

  const showToast = useCallback((message: string, type: ToastType) => {
    setToast({ message, type, isVisible: true });
    window.setTimeout(() => {
      setToast((prev) => ({ ...prev, isVisible: false }));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.isVisible && <Toast message={toast.message} type={toast.type} />}
    </ToastContext.Provider>
  );
}
