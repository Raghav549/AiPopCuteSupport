import { useNavigate } from 'react-router-dom';
import { Settings, Grid3X3, Heart, Bookmark, LogOut } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { usePostStore } from '@/stores/postStore';
import { useVoteStore } from '@/stores/voteStore';
import { useSocialStore } from '@/stores/socialStore';
import { useToastStore } from '@/hooks/useToast';
import { formatNumber } from '@/lib/utils';
import VerifiedBadge from '@/components/features/VerifiedBadge';

export default function Profile() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuthStore();
  const { getUserPosts } = usePostStore();
  const { getVoteHistory } = useVoteStore();
  const { getFollowersCount, getFollowingCount } = useSocialStore();
  const { addToast } = useToastStore();

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const userPosts = getUserPosts(currentUser.id);
  const voteHistory = getVoteHistory(currentUser.id);
  const followers = getFollowersCount(currentUser.id);
  const following = getFollowingCount(currentUser.id);

  const handleLogout = () => {
    logout();
    addToast('Logged out successfully', 'success');
    navigate('/');
  };

  return (
    <div className="pb-4">
      {/* Header Actions */}
      <div className="flex justify-end px-4 py-2 gap-2">
        {currentUser.role === 'creator' && (
          <button
            onClick={() => navigate('/creator')}
            className="text-xs font-semibold text-yellow-600 px-3 py-1.5 rounded-full bg-yellow-50"
          >
            Creator Studio
          </button>
        )}
        <button
          onClick={() => navigate('/settings')}
          className="p-2 rounded-full hover:bg-muted transition-colors"
          aria-label="Settings"
        >
          <Settings className="size-5" />
        </button>
      </div>

      {/* Profile Card */}
      <div className="px-4">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="size-20 rounded-full object-cover ring-3 ring-yellow-100"
          />
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg font-extrabold">{currentUser.name}</h1>
              {currentUser.verified && <VerifiedBadge size="lg" />}
            </div>
            <p className="text-sm text-muted-foreground">@{currentUser.username}</p>
            <p className="text-xs text-muted-foreground mt-0.5">ID: {currentUser.numericId}</p>
          </div>
        </div>

        {currentUser.bio && (
          <p className="text-sm mt-3 whitespace-pre-line leading-relaxed">{currentUser.bio}</p>
        )}

        {/* Stats */}
        <div className="flex gap-5 mt-4 text-sm">
          <span><strong className="font-bold">{userPosts.length}</strong> <span className="text-muted-foreground">posts</span></span>
          <span><strong className="font-bold">{followers}</strong> <span className="text-muted-foreground">followers</span></span>
          <span><strong className="font-bold">{following}</strong> <span className="text-muted-foreground">following</span></span>
        </div>

        {/* Cheer Stats */}
        <div className="mt-4 bg-yellow-50 rounded-xl p-4 flex items-center gap-3">
          <Heart className="size-8 text-yellow-500 fill-yellow-200" />
          <div>
            <p className="font-bold text-sm">{voteHistory.length} Cheer Votes Sent</p>
            <p className="text-xs text-muted-foreground">Keep supporting Ai every day!</p>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="mt-6 px-4">
        <div className="flex items-center gap-6 border-b border-border pb-2 mb-4">
          <button className="flex items-center gap-1.5 text-sm font-semibold text-foreground border-b-2 border-yellow-500 pb-2 -mb-2">
            <Grid3X3 className="size-4" /> Posts
          </button>
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground pb-2 -mb-2">
            <Bookmark className="size-4" /> Saved
          </button>
        </div>

        {userPosts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">No posts yet</p>
            <button
              onClick={() => navigate('/studio')}
              className="mt-2 text-sm font-semibold text-yellow-600"
            >
              Create your first post
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-1 rounded-xl overflow-hidden">
            {userPosts.map(post => (
              <button
                key={post.id}
                onClick={() => navigate(`/post/${post.id}`)}
                className="aspect-square bg-muted"
              >
                {post.media ? (
                  <img src={post.media} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-yellow-50">
                    <p className="text-xs text-center px-1 line-clamp-3">{post.caption}</p>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Logout */}
      <div className="px-4 mt-8">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-red-200 text-red-500 font-semibold text-sm hover:bg-red-50 transition-colors"
        >
          <LogOut className="size-4" />
          Log Out
        </button>
      </div>
    </div>
  );
}
