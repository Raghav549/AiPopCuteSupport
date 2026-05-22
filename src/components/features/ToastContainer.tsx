import { useToastStore } from '@/hooks/useToast';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  const iconMap = {
    success: <CheckCircle className="size-5 text-green-500" />,
    error: <XCircle className="size-5 text-red-500" />,
    info: <Info className="size-5 text-blue-500" />,
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-[90vw] max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-slide-up bg-white rounded-2xl shadow-cute px-4 py-3 flex items-center gap-3 border border-border"
        >
          {iconMap[toast.type]}
          <span className="flex-1 text-sm font-medium text-foreground">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 rounded-full hover:bg-muted transition-colors"
            aria-label="Dismiss"
          >
            <X className="size-4 text-muted-foreground" />
          </button>
        </div>
      ))}
    </div>
  );
}
