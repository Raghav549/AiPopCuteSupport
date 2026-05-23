import { useNavigate } from 'react-router-dom';
import { MessageCircle, Send } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import VerifiedBadge from '@/components/features/VerifiedBadge';
import EmptyState from '@/components/features/EmptyState';

export default function Messages() {
  const navigate = useNavigate();
  const { currentUser, users } = useAuthStore();

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  // Show suggested conversations with other users
  const otherUsers = users.filter(u => u.id !== currentUser.id).slice(0, 5);

  return (
    <div className="px-4 py-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold">Messages</h2>
        <button className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="New message">
          <Send className="size-5 text-foreground" />
        </button>
      </div>

      {otherUsers.length === 0 ? (
        <EmptyState
          icon={MessageCircle}
          title="No messages yet"
          description="Start a conversation with other supporters!"
        />
      ) : (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-medium">Start a conversation</p>
          {otherUsers.map(user => (
            <div
              key={user.id}
              className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-card"
            >
              <div className="relative">
                <img src={user.avatar} alt={user.name} className="size-12 rounded-full object-cover" />
                <div className="absolute bottom-0 right-0 size-3 rounded-full bg-green-400 border-2 border-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-sm">{user.name}</span>
                  {user.verified && <VerifiedBadge size="sm" username={user.username} />}
                </div>
                <p className="text-xs text-muted-foreground truncate">@{user.username}</p>
              </div>
              <button onClick={() => navigate(`/messages/${user.id}`)} className="gradient-yellow text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                Chat
              </button>
            </div>
          ))}
          <p className="text-xs text-center text-muted-foreground pt-2">
            Real-time messaging ready for WebSocket integration
          </p>
        </div>
      )}
    </div>
  );
}
