import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, PlusSquare, MessageCircle, User } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuthStore();

  const tabs = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/search', icon: Search, label: 'Search' },
    { path: '/studio', icon: PlusSquare, label: 'Create' },
    { path: '/messages', icon: MessageCircle, label: 'Chat' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  const isActive = (path: string) => {
    if (path === '/home') return location.pathname === '/' || location.pathname === '/home';
    return location.pathname === path;
  };

  const handleNav = (path: string) => {
    if ((path === '/studio' || path === '/messages' || path === '/profile') && !currentUser) {
      navigate('/login');
      return;
    }
    navigate(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-border/50 safe-bottom">
      <div className="flex items-center justify-around h-14 max-w-lg mx-auto">
        {tabs.map(({ path, icon: Icon, label }) => (
          <button
            key={path}
            onClick={() => handleNav(path)}
            className={`flex flex-col items-center justify-center gap-0.5 w-14 h-full transition-colors ${
              isActive(path) ? 'text-yellow-600' : 'text-muted-foreground'
            }`}
            aria-label={label}
          >
            <Icon className={`size-5.5 ${isActive(path) ? 'stroke-[2.5]' : ''}`} />
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
