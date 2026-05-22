import { useNavigate } from 'react-router-dom';
import { Heart, UserPlus, MessageCircle, AtSign, Share2, Star, Bell } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useSocialStore } from '@/stores/socialStore';
import { formatDate } from '@/lib/utils';
import EmptyState from '@/components/features/EmptyState';

export default function Notifications() {
  const navigate = useNavigate();
  const { currentUser, users } = useAuthStore();
  const { getUserNotifications, markNotificationRead, markAllRead } = useSocialStore();

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const notifications = getUserNotifications(currentUser.id);

  const iconMap = {
    vote: <Star className="size-4 text-yellow-500" />,
    follow: <UserPlus className="size-4 text-blue-500" />,
    like: <Heart className="size-4 text-heart" />,
    comment: <MessageCircle className="size-4 text-green-500" />,
    message: <MessageCircle className="size-4 text-purple-500" />,
    mention: <AtSign className="size-4 text-orange-500" />,
    share: <Share2 className="size-4 text-teal-500" />,
    ai_post: <Star className="size-4 text-yellow-500" />,
  };

  if (notifications.length === 0) {
    return (
      <div className="px-4 py-4">
        <EmptyState
          icon={Bell}
          title="No notifications yet"
          description="When someone interacts with you, you'll see it here"
        />
      </div>
    );
  }

  return (
    <div className="px-4 py-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{notifications.length} notifications</span>
        <button
          onClick={() => markAllRead(currentUser.id)}
          className="text-xs font-semibold text-yellow-600"
        >
          Mark all read
        </button>
      </div>

      <div className="space-y-2">
        {notifications.map(notif => {
          const fromUser = users.find(u => u.id === notif.fromUserId);
          return (
            <button
              key={notif.id}
              onClick={() => markNotificationRead(notif.id)}
              className={`w-full text-left p-3 rounded-xl flex items-start gap-3 transition-colors ${
                notif.read ? 'bg-white' : 'bg-yellow-50'
              } shadow-card`}
            >
              <div className="size-9 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                {iconMap[notif.type]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  {fromUser && <span className="font-semibold">{fromUser.name}</span>}{' '}
                  {notif.message}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{formatDate(notif.createdAt)}</p>
              </div>
              {!notif.read && <div className="size-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
