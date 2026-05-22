import { useNavigate } from 'react-router-dom';
import { MapPin, Link as LinkIcon, Calendar, ExternalLink } from 'lucide-react';
import { AI_USER } from '@/constants/mockData';
import { useVoteStore } from '@/stores/voteStore';
import { usePostStore } from '@/stores/postStore';
import { useSocialStore } from '@/stores/socialStore';
import { useAuthStore } from '@/stores/authStore';
import { useToastStore } from '@/hooks/useToast';
import { formatNumber } from '@/lib/utils';
import VerifiedBadge from '@/components/features/VerifiedBadge';
import ProgressMeter from '@/components/features/ProgressMeter';
import VoteButton from '@/components/features/VoteButton';
import PostCard from '@/components/features/PostCard';

export default function AiProfile() {
  const navigate = useNavigate();
  const { totalVotes } = useVoteStore();
  const { posts } = usePostStore();
  const { isFollowing, toggleFollow, getFollowersCount } = useSocialStore();
  const { currentUser } = useAuthStore();
  const { addToast } = useToastStore();

  const aiPosts = posts.filter(p => p.userId === AI_USER.id);
  const following = currentUser ? isFollowing(currentUser.id, AI_USER.id) : false;
  const followers = getFollowersCount(AI_USER.id) + 856;

  const handleFollow = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    const nowFollowing = toggleFollow(currentUser.id, AI_USER.id);
    addToast(nowFollowing ? 'Following Ai! 💛' : 'Unfollowed Ai', 'success');
  };

  return (
    <div className="pb-4">
      {/* Cover */}
      <div className="relative h-36">
        <img src="/ai-cover.jpg" alt="Cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
      </div>

      {/* Profile Info */}
      <div className="px-4 -mt-12 relative">
        <div className="flex items-end justify-between">
          <img
            src={AI_USER.avatar}
            alt={AI_USER.name}
            className="size-24 rounded-full object-cover border-4 border-white shadow-card"
          />
          <div className="flex gap-2 mb-2">
            <button
              onClick={handleFollow}
              className={`px-5 py-2 rounded-full font-semibold text-sm transition-all ${
                following
                  ? 'bg-muted text-foreground border border-border'
                  : 'gradient-yellow text-white shadow-cute'
              }`}
            >
              {following ? 'Following' : 'Follow'}
            </button>
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-center gap-1.5">
            <h1 className="text-xl font-extrabold">{AI_USER.name}</h1>
            <VerifiedBadge size="lg" />
          </div>
          <p className="text-sm text-muted-foreground">@{AI_USER.username}</p>
        </div>

        <p className="text-sm mt-3 whitespace-pre-line leading-relaxed">{AI_USER.bio}</p>

        <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <LinkIcon className="size-3.5" />
            MixChannel ID: {AI_USER.mixChannelId}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="size-3.5" />
            Joined Jan 2024
          </span>
        </div>

        {/* Stats Row */}
        <div className="flex gap-5 mt-4 text-sm">
          <span><strong className="font-bold">{formatNumber(aiPosts.length)}</strong> <span className="text-muted-foreground">posts</span></span>
          <span><strong className="font-bold">{formatNumber(followers)}</strong> <span className="text-muted-foreground">followers</span></span>
          <span><strong className="font-bold">{formatNumber(totalVotes)}</strong> <span className="text-muted-foreground">cheer votes</span></span>
        </div>
      </div>

      {/* Vote Section */}
      <div className="px-4 mt-5 space-y-4">
        <div className="bg-white rounded-2xl p-5 shadow-card space-y-4">
          <h3 className="font-bold text-center">Support Ai with a Cheer Vote!</h3>
          <p className="text-xs text-muted-foreground text-center">
            These are support votes on this website only — not official contest votes.
          </p>
          <ProgressMeter current={totalVotes} goal={AI_USER.goalVotes!} />
          <VoteButton />
        </div>
      </div>

      {/* Posts */}
      <div className="px-4 mt-5 space-y-4">
        <h3 className="font-bold">Posts by Ai</h3>
        {aiPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
