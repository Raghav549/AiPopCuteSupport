import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Construction } from 'lucide-react';

export default function PlaceholderPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const pageName = pathname.split('/').filter(Boolean).pop() || 'Page';
  const title = pageName.charAt(0).toUpperCase() + pageName.slice(1).replace(/-/g, ' ');

  return (
    <div className="px-4 py-4">
      <div className="bg-white rounded-2xl shadow-card p-6 space-y-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1.5 rounded-full hover:bg-muted transition-colors">
            <ArrowLeft className="size-5" />
          </button>
          <h1 className="font-bold text-lg">{title}</h1>
        </div>

        <div className="flex flex-col items-center py-8 space-y-3">
          <div className="size-14 rounded-full bg-yellow-50 flex items-center justify-center">
            <Construction className="size-7 text-yellow-500" />
          </div>
          <p className="font-semibold text-sm">Coming Soon</p>
          <p className="text-xs text-muted-foreground text-center max-w-xs">
            This page is connected and ready for backend integration.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => navigate('/home')}
            className="flex-1 gradient-yellow text-white font-semibold py-2.5 rounded-xl text-sm"
          >
            Go Home
          </button>
          <button
            onClick={() => navigate('/settings')}
            className="flex-1 bg-muted text-foreground font-semibold py-2.5 rounded-xl text-sm"
          >
            Settings
          </button>
        </div>
      </div>
    </div>
  );
}
