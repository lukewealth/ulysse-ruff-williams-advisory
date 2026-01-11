import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

interface ToastProps {
  message: ToastMessage;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true);
      setTimeout(() => onClose(message.id), 300);
    }, message.duration || 3000);

    return () => clearTimeout(timer);
  }, [message.id, message.duration, onClose]);

  const getIcon = () => {
    switch (message.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 flex-shrink-0" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 flex-shrink-0" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 flex-shrink-0" />;
      case 'info':
        return <Info className="w-5 h-5 flex-shrink-0" />;
      default:
        return null;
    }
  };

  const getColors = () => {
    switch (message.type) {
      case 'success':
        return {
          bg: 'bg-emerald-500/90',
          text: 'text-white',
          icon: 'text-emerald-200'
        };
      case 'error':
        return {
          bg: 'bg-red-500/90',
          text: 'text-white',
          icon: 'text-red-200'
        };
      case 'warning':
        return {
          bg: 'bg-amber-500/90',
          text: 'text-white',
          icon: 'text-amber-200'
        };
      case 'info':
        return {
          bg: 'bg-blue-500/90',
          text: 'text-white',
          icon: 'text-blue-200'
        };
      default:
        return { bg: 'bg-gray-500/90', text: 'text-white', icon: 'text-gray-200' };
    }
  };

  const colors = getColors();

  return (
    <div
      className={`
        fixed bottom-4 right-4 max-w-sm backdrop-blur-md rounded-lg p-4 flex items-center space-x-3
        ${colors.bg} ${colors.text}
        transition-all duration-300 ease-out
        ${isClosing ? 'translate-x-96 opacity-0' : 'translate-x-0 opacity-100'}
        shadow-2xl border border-white/20
        animate-slide-up
      `}
    >
      <span className={colors.icon}>{getIcon()}</span>
      <p className="text-sm font-medium flex-1">{message.message}</p>
      <button
        onClick={() => {
          setIsClosing(true);
          setTimeout(() => onClose(message.id), 300);
        }}
        className="text-white/70 hover:text-white transition-colors ml-2"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;
