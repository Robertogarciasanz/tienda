import { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  duration?: number;
  onDismiss?: () => void;
}

export function Toast({ message, type = 'success', duration = 3000, onDismiss }: ToastProps) {
  const [visible, setVisible] = useState(true);
  const [dismissing, setDismissing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDismissing(true);
      setTimeout(() => {
        setVisible(false);
        onDismiss?.();
      }, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  if (!visible) return null;

  const bgColor = type === 'success' ? 'bg-[#4ADE80]' : 'bg-[#EF4444]';
  const textColor = type === 'success' ? 'text-black' : 'text-white';
  const Icon = type === 'success' ? CheckCircle : AlertCircle;

  return (
    <div
      className={`
        absolute top-4 left-1/2 -translate-x-1/2 z-50
        flex items-center gap-2 px-5 py-2.5 rounded-md
        ${bgColor} ${textColor}
        shadow-lg
        ${dismissing ? 'animate-toast-out' : 'animate-toast-in'}
      `}
    >
      <Icon size={16} />
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={() => {
          setDismissing(true);
          setTimeout(() => {
            setVisible(false);
            onDismiss?.();
          }, 300);
        }}
        className="ml-2 opacity-70 hover:opacity-100 transition-opacity"
      >
        <X size={14} />
      </button>
    </div>
  );
}
