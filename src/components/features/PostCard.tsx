import { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, Eye, MoreHorizontal } from 'lucide-react';
import { Post } from '@/types';
import { useAuthStore } from '@/stores/authStore';
import { usePostStore } from '@/stores/postStore';
import { useToastStore } from '@/hooks/useToast';
import { formatNumber, formatDate } from '@/lib/utils';
import VerifiedBadge from './VerifiedBadge';
import { useNavigate } from 'react-router-dom';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const navigate = useNavigate();
  const { currentUser, users } = useAuthStore();
  const { toggleLike, isLiked, toggleSave, isSaved } = usePostStore();
  const { addToast } = useToastStore();
  const [animateLike, setAnimateLike] = useState(false);

  const author = users.find(u => u.id === post.userId);
  if (!author) return null;

  const liked = currentUser ? isLiked(currentUser.id, post.id) : false;
  const saved = currentUser ? isSaved(currentUser.id, post.id) : false;

  const handleLike = () => {
    if (!currentUser) {
      addToast('Please login to like posts', 'info');
      navigate('/login');
      return;
    }
    toggleLike(currentUser.id, post.id);
    if (!liked) {
      setAnimateLike(true);
      setTimeout(() => setAnimateLike(false), 300);
    }
  };

  const handleSave = () => {
    if (!currentUser) {
      addToast('Please login to save posts', 'info');
      navigate('/login');
      return;
    }
    const nowSaved = toggleSave(currentUser.id, post.id);
    addToast(nowSaved ? 'Post saved! 💛' : 'Post unsaved', 'success');
  };

  const handleShare = () => {
    addToast('Link copied! 🔗', 'success');
  };

  return (
    <article className="bg-white rounded-2xl shadow-card overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <button
          onClick={() => navigate(`/u/${author.username}`)}
          className="flex items-center gap-2.5"
        >
          <img
            src={author.avatar}
            alt={author.name}
            className="size-10 rounded-full object-cover ring-2 ring-yellow-100"
          />
          <div className="text-left">
            <div className="flex items-center gap-1">
              <span className="font-bold text-sm">{author.name}</span>
              {author.verified && <VerifiedBadge size="sm" username={author.username} />}
            </div>
            <span className="text-xs text-muted-foreground">
              {formatDate(post.createdAt)}
            </span>
          </div>
        </button>
        <button className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="More options">
          <MoreHorizontal className="size-5 text-muted-foreground" />
        </button>
      </div>

      {/* Caption */}
      <div className="px-4 pb-3">
        <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
          {post.caption}
        </p>
        {post.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {post.hashtags.map(tag => (
              <span key={tag} className="text-xs text-yellow-700 font-medium">#{tag}</span>
            ))}
          </div>
        )}
      </div>

      {/* Media */}
      {post.media && (
        <button
          onClick={() => navigate(`/post/${post.id}`)}
          className="w-full"
        >
          <img
            src={post.media}
            alt="Post"
            className="w-full aspect-square object-cover"
            loading="lazy"
            style={{ filter: post.filter || 'none' }}
          />
        </button>
      )}

      {/* Actions */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 transition-transform ${animateLike ? 'animate-wiggle' : ''}`}
            aria-label={liked ? 'Unlike' : 'Like'}
          >
            <Heart
              className={`size-5 transition-colors ${liked ? 'text-heart fill-heart' : 'text-muted-foreground'}`}
            />
            <span className="text-xs font-semibold tabular-nums">{formatNumber(post.likesCount)}</span>
          </button>

          <button
            onClick={() => navigate(`/post/${post.id}`)}
            className="flex items-center gap-1.5"
            aria-label="Comments"
          >
            <MessageCircle className="size-5 text-muted-foreground" />
            <span className="text-xs font-semibold tabular-nums">{formatNumber(post.commentsCount)}</span>
          </button>

          <button onClick={handleShare} className="flex items-center gap-1.5" aria-label="Share">
            <Share2 className="size-4.5 text-muted-foreground" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Eye className="size-3.5" />
            <span className="tabular-nums">{formatNumber(post.viewsCount)}</span>
          </span>
          <button onClick={handleSave} aria-label={saved ? 'Unsave' : 'Save'}>
            <Bookmark
              className={`size-5 transition-colors ${saved ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`}
            />
          </button>
        </div>
      </div>
    </article>
  );
}
