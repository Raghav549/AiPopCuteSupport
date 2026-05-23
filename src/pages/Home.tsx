import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, TrendingUp, Users } from 'lucide-react';
import { useVoteStore } from '@/stores/voteStore';
import { usePostStore } from '@/stores/postStore';
import { useAuthStore } from '@/stores/authStore';
import { AI_USER } from '@/constants/mockData';
import { formatNumber, getTimeUntilMidnight } from '@/lib/utils';
import VoteButton from '@/components/features/VoteButton';
import ProgressMeter from '@/components/features/ProgressMeter';
import VerifiedBadge from '@/components/features/VerifiedBadge';
import PostCard from '@/components/features/PostCard';
import { PostSkeleton } from '@/components/features/SkeletonLoader';

export default function Home() {
  const navigate = useNavigate();
  const { totalVotes } = useVoteStore();
  const { posts } = usePostStore();
  const { currentUser } = useAuthStore();
  const [countdown, setCountdown] = useState(getTimeUntilMidnight());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getTimeUntilMidnight());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const aiPosts = posts.filter(p => p.userId === AI_USER.id).slice(0, 5);

  return (
    <div className="space-y-4 px-4 py-4">
      {/* Hero Card */}
      <section className="bg-white rounded-3xl shadow-cute overflow-hidden">
        {/* Cover */}
        <div className="relative h-28 overflow-hidden">
          <img
            src="/ai-cover.jpg"
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/60" />
        </div>

        {/* Profile */}
        <div className="px-5 -mt-10 relative">
          <button onClick={() => navigate('/ai')} className="block">
            <img
              src={AI_USER.avatar}
              alt={AI_USER.name}
              className="size-20 rounded-full object-cover border-4 border-white shadow-card"
            />
          </button>

          <div className="mt-2">
            <div className="flex items-center gap-1.5">
              <h2 className="text-xl font-extrabold">{AI_USER.name}</h2>
              <VerifiedBadge size="lg" username={AI_USER.username} />
            </div>
            <p className="text-sm text-muted-foreground">@{AI_USER.username}</p>
          </div>

          <p className="text-sm text-foreground mt-2 whitespace-pre-line leading-relaxed line-clamp-3">
            {AI_USER.bio}
          </p>

          <button
            onClick={() => navigate('/ai')}
            className="text-xs font-semibold text-yellow-600 mt-1"
          >
            Read more →
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 px-5 mt-4">
          <div className="text-center py-2 rounded-xl bg-yellow-50">
            <Star className="size-4 text-yellow-500 mx-auto mb-0.5" />
            <p className="text-lg font-extrabold tabular-nums">{formatNumber(totalVotes)}</p>
            <p className="text-[10px] text-muted-foreground">Cheer Votes</p>
          </div>
          <div className="text-center py-2 rounded-xl bg-yellow-50">
            <Users className="size-4 text-yellow-500 mx-auto mb-0.5" />
            <p className="text-lg font-extrabold tabular-nums">{formatNumber(856)}</p>
            <p className="text-[10px] text-muted-foreground">Supporters</p>
          </div>
          <div className="text-center py-2 rounded-xl bg-yellow-50">
            <TrendingUp className="size-4 text-yellow-500 mx-auto mb-0.5" />
            <p className="text-lg font-extrabold tabular-nums">{formatNumber(aiPosts.length)}</p>
            <p className="text-[10px] text-muted-foreground">Posts</p>
          </div>
        </div>

        {/* Vote Section */}
        <div className="px-5 py-5 space-y-4">
          <ProgressMeter current={totalVotes} goal={AI_USER.goalVotes!} />
          <VoteButton />

          {/* Countdown */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Next vote resets in{' '}
              <span className="font-bold tabular-nums text-foreground">
                {String(countdown.hours).padStart(2, '0')}:
                {String(countdown.minutes).padStart(2, '0')}:
                {String(countdown.seconds).padStart(2, '0')}
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Feed */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-base">Latest Posts</h3>
          <button
            onClick={() => navigate('/ai')}
            className="text-xs font-semibold text-yellow-600"
          >
            See All
          </button>
        </div>

        {loading ? (
          <div className="space-y-4">
            <PostSkeleton />
            <PostSkeleton />
          </div>
        ) : (
          <div className="space-y-4">
            {aiPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* Community Posts */}
      <section>
        <h3 className="font-bold text-base mb-3">Community</h3>
        <div className="space-y-4">
          {posts.filter(p => p.userId !== AI_USER.id).slice(0, 3).map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {!currentUser && (
        <div className="bg-white rounded-2xl p-5 shadow-card text-center space-y-3">
          <p className="font-bold">Join the community!</p>
          <p className="text-sm text-muted-foreground">Sign up to cheer for Ai and interact with posts</p>
          <button
            onClick={() => navigate('/signup')}
            className="gradient-yellow text-white font-semibold px-6 py-2.5 rounded-full text-sm"
          >
            Sign Up Free
          </button>
        </div>
      )}
    </div>
  );
}
