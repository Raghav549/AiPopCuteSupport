import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { usePostStore } from '@/stores/postStore';
import { useSocialStore } from '@/stores/socialStore';
import { useToastStore } from '@/hooks/useToast';
import { AI_USER } from '@/constants/mockData';
import VerifiedBadge from '@/components/features/VerifiedBadge';
import EmptyState from '@/components/features/EmptyState';
import { User } from 'lucide-react';

export default function UserProfile() {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const { currentUser, users } = useAuthStore();
  const { getUserPosts } = usePostStore();
  const { isFollowing, toggleFollow, getFollowersCount, getFollowingCount } = useSocialStore();
  const { addToast } = useToastStore();

  const user = users.find(u => u.username === username);

  if (!user) {
    return (
      <div className="px-4 py-4">
        <EmptyState icon={User} title="User not found" description="This user doesn't exist" action={{ label: 'Go Home', onClick: () => navigate('/home') }} />
      </div>
    );
  }

  // Redirect to Ai profile page
  if (user.id === AI_USER.id) {
    navigate('/ai');
    return null;
  }

  const userPosts = getUserPosts(user.id);
  const following = currentUser ? isFollowing(currentUser.id, user.id) : false;
  const followers = getFollowersCount(user.id);
  const followingCount = getFollowingCount(user.id);

  const handleFollow = () => {
    if (!currentUser) { navigate('/login'); return; }
    const nowFollowing = toggleFollow(currentUser.id, user.id);
    addToast(nowFollowing ? `Following ${user.name}!` : `Unfollowed ${user.name}`, 'success');
  };

  return (
    <div className="pb-4">
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-border/50 flex items-center gap-3 px-4 h-12">
        <button onClick={() => navigate(-1)} className="p-1" aria-label="Back">
          <ArrowLeft className="size-5" />
        </button>
        <span className="font-bold">{user.name}</span>
      </div>

      <div className="px-4 pt-4">
        <div className="flex items-center gap-4">
          <img src={user.avatar} alt={user.name} className="size-20 rounded-full object-cover ring-2 ring-yellow-100" />
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg font-extrabold">{user.name}</h1>
              {user.verified && <VerifiedBadge size="lg" />}
            </div>
            <p className="text-sm text-muted-foreground">@{user.username}</p>

            {currentUser && currentUser.id !== user.id && (
              <button
                onClick={handleFollow}
                className={`mt-2 px-5 py-1.5 rounded-full font-semibold text-sm ${
                  following ? 'bg-muted text-foreground border border-border' : 'gradient-yellow text-white'
                }`}
              >
                {following ? 'Following' : 'Follow'}
              </button>
            )}
          </div>
        </div>

        {user.bio && <p className="text-sm mt-3">{user.bio}</p>}

        <div className="flex gap-5 mt-3 text-sm">
          <span><strong>{userPosts.length}</strong> <span className="text-muted-foreground">posts</span></span>
          <span><strong>{followers}</strong> <span className="text-muted-foreground">followers</span></span>
          <span><strong>{followingCount}</strong> <span className="text-muted-foreground">following</span></span>
        </div>
      </div>

      {/* Posts or Private */}
      <div className="px-4 mt-6">
        {user.isPrivate && !following ? (
          <div className="text-center py-12">
            <Lock className="size-10 text-muted-foreground mx-auto mb-3" />
            <p className="font-bold">This account is private</p>
            <p className="text-sm text-muted-foreground mt-1">Follow to see their posts</p>
          </div>
        ) : userPosts.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-8">No posts yet</p>
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
                  <div className="w-full h-full flex items-center justify-center bg-yellow-50 p-1">
                    <p className="text-[10px] text-center line-clamp-3">{post.caption}</p>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
