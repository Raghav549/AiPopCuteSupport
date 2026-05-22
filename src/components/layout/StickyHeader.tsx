import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, Search, Sparkles } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useSocialStore } from '@/stores/socialStore';

export default function StickyHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuthStore();
  const { getUnreadCount } = useSocialStore();

  const unread = currentUser ? getUnreadCount(currentUser.id) : 0;

  const getTitle = () => {
    switch (location.pathname) {
      case '/': case '/home': return null;
      case '/search': return 'Search';
      case '/studio': return 'Create Post';
      case '/notifications': return 'Notifications';
      case '/messages': return 'Messages';
      case '/profile': return 'Profile';
      case '/settings': return 'Settings';
      case '/creator': return 'Creator Studio';
      default: return null;
    }
  };

  const title = getTitle();
  const isHome = location.pathname === '/' || location.pathname === '/home';

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-border/50">
      <div className="flex items-center justify-between px-4 h-14">
        {isHome ? (
          <button onClick={() => navigate('/')} className="flex items-center gap-1.5">
            <Sparkles className="size-5 text-yellow-500" />
            <span className="font-extrabold text-lg text-gradient-yellow">Ai Pop Cute</span>
          </button>
        ) : (
          <h1 className="font-bold text-lg">{title}</h1>
        )}

        <div className="flex items-center gap-2">
          {isHome && (
            <button
              onClick={() => navigate('/search')}
              className="p-2.5 rounded-full hover:bg-muted transition-colors"
              aria-label="Search"
            >
              <Search className="size-5 text-foreground" />
            </button>
          )}
          <button
            onClick={() => navigate('/notifications')}
            className="relative p-2.5 rounded-full hover:bg-muted transition-colors"
            aria-label="Notifications"
          >
            <Bell className="size-5 text-foreground" />
            {unread > 0 && (
              <span className="absolute top-1.5 right-1.5 size-4 gradient-yellow rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                {unread > 9 ? '9+' : unread}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
