import { create } from 'zustand';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

interface ToastState {
  toasts: Toast[];
  addToast: (message: string, type?: 'success' | 'error' | 'info', duration?: number) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],
  addToast: (message, type = 'success', duration = 3000) => {
    const id = Date.now().toString();
    set({ toasts: [...get().toasts, { id, message, type, duration }] });
    setTimeout(() => {
      set({ toasts: get().toasts.filter(t => t.id !== id) });
    }, duration);
  },
  removeToast: (id) => {
    set({ toasts: get().toasts.filter(t => t.id !== id) });
  },
}));
