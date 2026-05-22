import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, Hash, User, FileText } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { usePostStore } from '@/stores/postStore';
import VerifiedBadge from '@/components/features/VerifiedBadge';
import EmptyState from '@/components/features/EmptyState';

type Tab = 'users' | 'posts' | 'hashtags';

export default function Search() {
  const navigate = useNavigate();
  const { users } = useAuthStore();
  const { posts } = usePostStore();
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<Tab>('users');

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return { users: [], posts: [], hashtags: [] };

    const filteredUsers = users.filter(u =>
      u.name.toLowerCase().includes(q) ||
      u.username.toLowerCase().includes(q) ||
      u.numericId.toString() === q ||
      u.mixChannelId === q
    );

    const filteredPosts = posts.filter(p =>
      p.caption.toLowerCase().includes(q) ||
      p.hashtags.some(h => h.toLowerCase().includes(q))
    );

    const allHashtags = posts.flatMap(p => p.hashtags);
    const uniqueHashtags = [...new Set(allHashtags)].filter(h => h.toLowerCase().includes(q));

    return { users: filteredUsers, posts: filteredPosts, hashtags: uniqueHashtags };
  }, [query, users, posts]);

  const tabs: { id: Tab; label: string; icon: React.ReactNode; count: number }[] = [
    { id: 'users', label: 'Users', icon: <User className="size-4" />, count: results.users.length },
    { id: 'posts', label: 'Posts', icon: <FileText className="size-4" />, count: results.posts.length },
    { id: 'hashtags', label: 'Tags', icon: <Hash className="size-4" />, count: results.hashtags.length },
  ];

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Search Input */}
      <div className="relative">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search users, posts, hashtags, ID..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-card"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted rounded-xl p-1">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
              tab === t.id ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground'
            }`}
          >
            {t.icon}
            {t.label}
            {query && <span className="text-[10px]">({t.count})</span>}
          </button>
        ))}
      </div>

      {/* Results */}
      {!query ? (
        <div className="space-y-3">
          <h3 className="font-bold text-sm">Suggested</h3>
          {users.slice(0, 6).map(user => (
            <button
              key={user.id}
              onClick={() => navigate(`/u/${user.username}`)}
              className="flex items-center gap-3 w-full text-left p-2 rounded-xl hover:bg-muted transition-colors"
            >
              <img src={user.avatar} alt={user.name} className="size-10 rounded-full object-cover" />
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-sm">{user.name}</span>
                  {user.verified && <VerifiedBadge size="sm" />}
                </div>
                <span className="text-xs text-muted-foreground">@{user.username}</span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div>
          {tab === 'users' && (
            results.users.length === 0 ? (
              <EmptyState icon={User} title="No users found" description="Try a different search term" />
            ) : (
              <div className="space-y-2">
                {results.users.map(user => (
                  <button
                    key={user.id}
                    onClick={() => navigate(`/u/${user.username}`)}
                    className="flex items-center gap-3 w-full text-left p-3 rounded-xl bg-white shadow-card"
                  >
                    <img src={user.avatar} alt={user.name} className="size-11 rounded-full object-cover" />
                    <div className="flex-1">
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-sm">{user.name}</span>
                        {user.verified && <VerifiedBadge size="sm" />}
                      </div>
                      <span className="text-xs text-muted-foreground">@{user.username} · ID: {user.numericId}</span>
                    </div>
                  </button>
                ))}
              </div>
            )
          )}

          {tab === 'posts' && (
            results.posts.length === 0 ? (
              <EmptyState icon={FileText} title="No posts found" description="Try different keywords" />
            ) : (
              <div className="space-y-2">
                {results.posts.map(post => (
                  <button
                    key={post.id}
                    onClick={() => navigate(`/post/${post.id}`)}
                    className="w-full text-left p-3 rounded-xl bg-white shadow-card"
                  >
                    <p className="text-sm line-clamp-2">{post.caption}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {post.likesCount} likes · {post.commentsCount} comments
                    </p>
                  </button>
                ))}
              </div>
            )
          )}

          {tab === 'hashtags' && (
            results.hashtags.length === 0 ? (
              <EmptyState icon={Hash} title="No hashtags found" description="Try a different tag" />
            ) : (
              <div className="space-y-2">
                {results.hashtags.map(tag => (
                  <div key={tag} className="p-3 rounded-xl bg-white shadow-card flex items-center gap-2">
                    <div className="size-10 rounded-full bg-yellow-50 flex items-center justify-center">
                      <Hash className="size-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">#{tag}</p>
                      <p className="text-xs text-muted-foreground">
                        {posts.filter(p => p.hashtags.includes(tag)).length} posts
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
