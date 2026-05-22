import { useNavigate } from 'react-router-dom';
import { BarChart3, Users, Heart, FileText, Settings, TrendingUp } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useVoteStore } from '@/stores/voteStore';
import { usePostStore } from '@/stores/postStore';
import { formatNumber } from '@/lib/utils';

export default function CreatorDashboard() {
  const navigate = useNavigate();
  const { currentUser } = useAuthStore();
  const { totalVotes, votes } = useVoteStore();
  const { getUserPosts } = usePostStore();

  if (!currentUser || currentUser.role !== 'creator') {
    navigate('/');
    return null;
  }

  const myPosts = getUserPosts(currentUser.id);
  const totalLikes = myPosts.reduce((sum, p) => sum + p.likesCount, 0);
  const totalComments = myPosts.reduce((sum, p) => sum + p.commentsCount, 0);
  const todayVotes = votes.filter(v => v.date === new Date().toISOString().split('T')[0]).length;

  const stats = [
    { icon: Heart, label: 'Total Cheer Votes', value: formatNumber(totalVotes), color: 'text-yellow-500' },
    { icon: TrendingUp, label: "Today's Votes", value: todayVotes.toString(), color: 'text-green-500' },
    { icon: Users, label: 'Unique Supporters', value: formatNumber(new Set(votes.map(v => v.userId)).size || 856), color: 'text-blue-500' },
    { icon: FileText, label: 'Total Posts', value: myPosts.length.toString(), color: 'text-purple-500' },
    { icon: Heart, label: 'Total Likes', value: formatNumber(totalLikes), color: 'text-heart' },
    { icon: BarChart3, label: 'Total Comments', value: formatNumber(totalComments), color: 'text-orange-500' },
  ];

  const actions = [
    { label: 'Edit Profile', onClick: () => navigate('/settings') },
    { label: 'Create Post', onClick: () => navigate('/studio') },
    { label: 'View Analytics', onClick: () => {} },
    { label: 'Manage Comments', onClick: () => {} },
  ];

  return (
    <div className="px-4 py-4 space-y-5">
      {/* Welcome */}
      <div className="bg-white rounded-2xl p-5 shadow-card">
        <div className="flex items-center gap-3">
          <img src={currentUser.avatar} alt="" className="size-14 rounded-full object-cover" />
          <div>
            <h2 className="font-extrabold text-lg">Creator Studio</h2>
            <p className="text-sm text-muted-foreground">Welcome back, {currentUser.name}!</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-white rounded-xl p-4 shadow-card">
            <Icon className={`size-5 ${color} mb-2`} />
            <p className="text-xl font-extrabold tabular-nums">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      {/* Goal Progress */}
      <div className="bg-white rounded-2xl p-5 shadow-card">
        <h3 className="font-bold mb-3">Vote Goal Progress</h3>
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-semibold">{formatNumber(totalVotes)}</span>
          <span className="text-muted-foreground">/ {formatNumber(currentUser.goalVotes || 10000)}</span>
        </div>
        <div className="w-full h-3 bg-yellow-100 rounded-full overflow-hidden">
          <div
            className="h-full gradient-yellow rounded-full"
            style={{ width: `${Math.min((totalVotes / (currentUser.goalVotes || 10000)) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-2">
        <h3 className="font-bold">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-2">
          {actions.map(({ label, onClick }) => (
            <button
              key={label}
              onClick={onClick}
              className="bg-white rounded-xl p-3 shadow-card text-sm font-semibold hover:bg-yellow-50 transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Posts */}
      <div className="space-y-3">
        <h3 className="font-bold">Recent Posts</h3>
        {myPosts.slice(0, 3).map(post => (
          <button
            key={post.id}
            onClick={() => navigate(`/post/${post.id}`)}
            className="w-full text-left bg-white rounded-xl p-3 shadow-card flex gap-3"
          >
            {post.media && (
              <img src={post.media} alt="" className="size-14 rounded-lg object-cover flex-shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm line-clamp-2">{post.caption}</p>
              <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                <span>❤️ {post.likesCount}</span>
                <span>💬 {post.commentsCount}</span>
                <span>👁 {post.viewsCount}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
