import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, X, Hash, Eye, MessageCircle, Download } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { usePostStore } from '@/stores/postStore';
import { useToastStore } from '@/hooks/useToast';
import { CSS_FILTERS } from '@/constants/mockData';

export default function Studio() {
  const navigate = useNavigate();
  const { currentUser } = useAuthStore();
  const { createPost } = usePostStore();
  const { addToast } = useToastStore();

  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('none');
  const [visibility, setVisibility] = useState<'public' | 'private' | 'followers'>('public');
  const [allowComments, setAllowComments] = useState(true);
  const [allowDownload, setAllowDownload] = useState(true);
  const [isPosting, setIsPosting] = useState(false);

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const handlePost = () => {
    if (!caption.trim()) {
      addToast('Please write a caption', 'error');
      return;
    }

    setIsPosting(true);
    setTimeout(() => {
      const tags = hashtags
        .split(/[,#\s]+/)
        .filter(t => t.trim())
        .map(t => t.trim().toLowerCase());

      createPost({
        userId: currentUser.id,
        caption: caption.trim(),
        media: imageUrl || undefined,
        mediaType: imageUrl ? 'image' : undefined,
        hashtags: tags,
        visibility,
        allowComments,
        allowDownload,
        filter: selectedFilter !== 'none' ? selectedFilter : undefined,
      });

      setIsPosting(false);
      addToast('Post published! 🎉', 'success');
      navigate('/home');
    }, 600);
  };

  return (
    <div className="px-4 py-4 space-y-5">
      {/* Image Section */}
      <div className="space-y-3">
        <label className="text-sm font-semibold">Image URL (optional)</label>
        <div className="flex gap-2">
          <input
            type="url"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            placeholder="Paste image URL..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          {imageUrl && (
            <button onClick={() => setImageUrl('')} className="p-2.5 rounded-xl bg-muted" aria-label="Clear">
              <X className="size-4" />
            </button>
          )}
        </div>

        {imageUrl && (
          <div className="rounded-2xl overflow-hidden shadow-card">
            <img
              src={imageUrl}
              alt="Preview"
              className="w-full aspect-square object-cover"
              style={{ filter: selectedFilter }}
            />
          </div>
        )}

        {!imageUrl && (
          <div className="border-2 border-dashed border-border rounded-2xl p-8 flex flex-col items-center gap-2 text-muted-foreground">
            <Image className="size-8" />
            <p className="text-sm">Paste an image URL above</p>
          </div>
        )}
      </div>

      {/* Filters */}
      {imageUrl && (
        <div className="space-y-2">
          <label className="text-sm font-semibold">Filters</label>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {CSS_FILTERS.map(f => (
              <button
                key={f.name}
                onClick={() => setSelectedFilter(f.value)}
                className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  selectedFilter === f.value
                    ? 'border-yellow-500 bg-yellow-50 text-yellow-700 font-semibold'
                    : 'border-border text-muted-foreground'
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Caption */}
      <div className="space-y-2">
        <label className="text-sm font-semibold">Caption</label>
        <textarea
          value={caption}
          onChange={e => setCaption(e.target.value)}
          placeholder="Write your caption..."
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
        />
        <p className="text-xs text-muted-foreground text-right">{caption.length}/500</p>
      </div>

      {/* Hashtags */}
      <div className="space-y-2">
        <label className="text-sm font-semibold flex items-center gap-1">
          <Hash className="size-4" /> Hashtags
        </label>
        <input
          type="text"
          value={hashtags}
          onChange={e => setHashtags(e.target.value)}
          placeholder="popandcute, ai, support (comma separated)"
          className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {/* Settings */}
      <div className="space-y-3">
        <label className="text-sm font-semibold">Settings</label>

        <div className="flex items-center justify-between bg-white p-3 rounded-xl shadow-card">
          <span className="flex items-center gap-2 text-sm">
            <Eye className="size-4 text-muted-foreground" /> Visibility
          </span>
          <select
            value={visibility}
            onChange={e => setVisibility(e.target.value as typeof visibility)}
            className="text-sm bg-muted rounded-lg px-3 py-1.5 border-none"
          >
            <option value="public">Public</option>
            <option value="followers">Followers</option>
            <option value="private">Private</option>
          </select>
        </div>

        <div className="flex items-center justify-between bg-white p-3 rounded-xl shadow-card">
          <span className="flex items-center gap-2 text-sm">
            <MessageCircle className="size-4 text-muted-foreground" /> Comments
          </span>
          <button
            onClick={() => setAllowComments(!allowComments)}
            className={`w-11 h-6 rounded-full transition-colors ${allowComments ? 'bg-yellow-500' : 'bg-gray-300'}`}
          >
            <div className={`size-5 bg-white rounded-full shadow transition-transform ${allowComments ? 'translate-x-5.5' : 'translate-x-0.5'}`} />
          </button>
        </div>

        <div className="flex items-center justify-between bg-white p-3 rounded-xl shadow-card">
          <span className="flex items-center gap-2 text-sm">
            <Download className="size-4 text-muted-foreground" /> Allow Download
          </span>
          <button
            onClick={() => setAllowDownload(!allowDownload)}
            className={`w-11 h-6 rounded-full transition-colors ${allowDownload ? 'bg-yellow-500' : 'bg-gray-300'}`}
          >
            <div className={`size-5 bg-white rounded-full shadow transition-transform ${allowDownload ? 'translate-x-5.5' : 'translate-x-0.5'}`} />
          </button>
        </div>
      </div>

      {/* Post Button */}
      <button
        onClick={handlePost}
        disabled={isPosting || !caption.trim()}
        className="w-full gradient-yellow text-white font-bold py-3.5 rounded-xl text-sm shadow-cute hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {isPosting ? 'Publishing...' : 'Publish Post'}
      </button>
    </div>
  );
}
