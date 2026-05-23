import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle, Share2, Bookmark, Send } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { usePostStore } from '@/stores/postStore';
import { useToastStore } from '@/hooks/useToast';
import { formatNumber, formatDate } from '@/lib/utils';
import VerifiedBadge from '@/components/features/VerifiedBadge';
import EmptyState from '@/components/features/EmptyState';

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser, users } = useAuthStore();
  const { posts, toggleLike, isLiked, addComment, getPostComments, toggleSave, isSaved } = usePostStore();
  const { addToast } = useToastStore();
  const [commentText, setCommentText] = useState('');

  const post = posts.find(p => p.id === id);
  if (!post) {
    return (
      <div className="px-4 py-4">
        <EmptyState
          icon={MessageCircle}
          title="Post not found"
          description="This post may have been deleted"
          action={{ label: 'Go Home', onClick: () => navigate('/home') }}
        />
      </div>
    );
  }

  const author = users.find(u => u.id === post.userId);
  const comments = getPostComments(post.id);
  const liked = currentUser ? isLiked(currentUser.id, post.id) : false;
  const saved = currentUser ? isSaved(currentUser.id, post.id) : false;

  const handleComment = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    if (!commentText.trim()) return;

    addComment(currentUser.id, post.id, commentText.trim());
    setCommentText('');
    addToast('Comment posted! 💬', 'success');
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-border/50 flex items-center gap-3 px-4 h-12">
        <button onClick={() => navigate(-1)} className="p-1" aria-label="Back">
          <ArrowLeft className="size-5" />
        </button>
        <span className="font-bold">Post</span>
      </div>

      {/* Post Content */}
      <div className="px-4 pt-4">
        {author && (
          <div className="flex items-center gap-2.5 mb-3">
            <img src={author.avatar} alt={author.name} className="size-10 rounded-full object-cover" />
            <div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-sm">{author.name}</span>
                {author.verified && <VerifiedBadge size="sm" username={author.username} />}
              </div>
              <span className="text-xs text-muted-foreground">{formatDate(post.createdAt)}</span>
            </div>
          </div>
        )}

        <p className="text-sm whitespace-pre-line leading-relaxed mb-3">{post.caption}</p>

        {post.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.hashtags.map(tag => (
              <span key={tag} className="text-xs text-yellow-700 font-medium">#{tag}</span>
            ))}
          </div>
        )}

        {post.media && (
          <img
            src={post.media}
            alt="Post media"
            className="w-full rounded-2xl object-cover mb-3"
            style={{ filter: post.filter || 'none' }}
          />
        )}

        {/* Actions */}
        <div className="flex items-center justify-between py-3 border-y border-border">
          <div className="flex items-center gap-5">
            <button
              onClick={() => {
                if (!currentUser) { navigate('/login'); return; }
                toggleLike(currentUser.id, post.id);
              }}
              className="flex items-center gap-1.5"
            >
              <Heart className={`size-5 ${liked ? 'text-heart fill-heart' : 'text-muted-foreground'}`} />
              <span className="text-sm font-semibold tabular-nums">{formatNumber(post.likesCount)}</span>
            </button>
            <span className="flex items-center gap-1.5">
              <MessageCircle className="size-5 text-muted-foreground" />
              <span className="text-sm font-semibold tabular-nums">{comments.length}</span>
            </span>
            <button onClick={() => addToast('Link copied!', 'success')}>
              <Share2 className="size-5 text-muted-foreground" />
            </button>
          </div>
          <button
            onClick={() => {
              if (!currentUser) { navigate('/login'); return; }
              toggleSave(currentUser.id, post.id);
            }}
          >
            <Bookmark className={`size-5 ${saved ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`} />
          </button>
        </div>
      </div>

      {/* Comments */}
      <div className="px-4 py-4 space-y-4">
        <h3 className="font-bold text-sm">Comments ({comments.length})</h3>

        {comments.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">No comments yet. Be the first!</p>
        ) : (
          <div className="space-y-3">
            {comments.map(comment => {
              const commenter = users.find(u => u.id === comment.userId);
              return (
                <div key={comment.id} className={`flex gap-2.5 ${comment.parentId ? 'ml-8' : ''}`}>
                  <img
                    src={commenter?.avatar || ''}
                    alt=""
                    className="size-8 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 bg-muted/50 rounded-xl px-3 py-2">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold">{commenter?.name}</span>
                      {commenter?.verified && <VerifiedBadge size="sm" username={commenter.username} />}
                    </div>
                    <p className="text-sm mt-0.5">{comment.content}</p>
                    <span className="text-[10px] text-muted-foreground">{formatDate(comment.createdAt)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Comment Input */}
      {currentUser && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-4 py-3 max-w-lg mx-auto">
          <div className="flex items-center gap-2">
            <img src={currentUser.avatar} alt="" className="size-8 rounded-full object-cover" />
            <input
              type="text"
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 px-4 py-2 rounded-full border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              onKeyDown={e => e.key === 'Enter' && handleComment()}
            />
            <button
              onClick={handleComment}
              disabled={!commentText.trim()}
              className="p-2 rounded-full gradient-yellow text-white disabled:opacity-40"
              aria-label="Send comment"
            >
              <Send className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
