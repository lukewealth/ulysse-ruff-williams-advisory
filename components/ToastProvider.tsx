import React, { createContext, useContext, useState, useCallback } from 'react';
import Toast, { ToastMessage } from './Toast';

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning', duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', duration = 3000) => {
    const id = Date.now().toString();
    console.log(`📢 Toast [${type.toUpperCase()}]:`, message);
    
    setToasts(prev => [...prev, { id, message, type, duration }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute bottom-4 right-4 space-y-2 pointer-events-auto">
          {toasts.map(toast => (
            <Toast
              key={toast.id}
              message={toast}
              onClose={removeToast}
            />
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
