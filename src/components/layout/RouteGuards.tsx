import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAuthStore } from '@/stores/authStore';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const currentUser = useAuthStore(s => s.currentUser);
  const isLoading = useAuthStore(s => s.isLoading);
  const location = useLocation();

  if (isLoading) return null;
  if (!currentUser) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return <>{children}</>;
}

export function CreatorRoute({ children }: { children: ReactNode }) {
  const currentUser = useAuthStore(s => s.currentUser);
  if (!currentUser) return <Navigate to="/login" replace />;
  if (!['creator', 'admin'].includes(currentUser.role)) return <Navigate to="/home" replace />;
  return <>{children}</>;
}
