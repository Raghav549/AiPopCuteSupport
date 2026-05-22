import { create } from 'zustand';
import { Post, Comment, Like, SavedPost } from '@/types';
import { MOCK_POSTS, MOCK_COMMENTS } from '@/constants/mockData';
import { generateId } from '@/lib/utils';

interface PostState {
  posts: Post[];
  comments: Comment[];
  likes: Like[];
  savedPosts: SavedPost[];
  initialize: () => void;
  createPost: (post: Omit<Post, 'id' | 'likesCount' | 'commentsCount' | 'sharesCount' | 'viewsCount' | 'downloadsCount' | 'createdAt'>) => Post;
  deletePost: (postId: string) => void;
  toggleLike: (userId: string, postId: string) => boolean;
  isLiked: (userId: string, postId: string) => boolean;
  addComment: (userId: string, postId: string, content: string, parentId?: string) => Comment;
  getPostComments: (postId: string) => Comment[];
  toggleSave: (userId: string, postId: string) => boolean;
  isSaved: (userId: string, postId: string) => boolean;
  getUserPosts: (userId: string) => Post[];
  incrementView: (postId: string) => void;
}

export const usePostStore = create<PostState>((set, get) => ({
  posts: [],
  comments: [],
  likes: [],
  savedPosts: [],

  initialize: () => {
    const savedPosts = localStorage.getItem('aipop_posts');
    const savedComments = localStorage.getItem('aipop_comments');
    const savedLikes = localStorage.getItem('aipop_likes');
    const savedSaved = localStorage.getItem('aipop_saved');

    set({
      posts: savedPosts ? JSON.parse(savedPosts) : MOCK_POSTS,
      comments: savedComments ? JSON.parse(savedComments) : MOCK_COMMENTS,
      likes: savedLikes ? JSON.parse(savedLikes) : [],
      savedPosts: savedSaved ? JSON.parse(savedSaved) : [],
    });
  },

  createPost: (postData) => {
    const newPost: Post = {
      ...postData,
      id: generateId(),
      likesCount: 0,
      commentsCount: 0,
      sharesCount: 0,
      viewsCount: 0,
      downloadsCount: 0,
      createdAt: new Date().toISOString(),
    };

    const { posts } = get();
    const updated = [newPost, ...posts];
    localStorage.setItem('aipop_posts', JSON.stringify(updated));
    set({ posts: updated });
    return newPost;
  },

  deletePost: (postId) => {
    const { posts } = get();
    const updated = posts.filter(p => p.id !== postId);
    localStorage.setItem('aipop_posts', JSON.stringify(updated));
    set({ posts: updated });
  },

  toggleLike: (userId, postId) => {
    const { likes, posts } = get();
    const existing = likes.find(l => l.userId === userId && l.postId === postId);

    let updatedLikes: Like[];
    let updatedPosts: Post[];

    if (existing) {
      updatedLikes = likes.filter(l => l.id !== existing.id);
      updatedPosts = posts.map(p => p.id === postId ? { ...p, likesCount: Math.max(0, p.likesCount - 1) } : p);
    } else {
      updatedLikes = [...likes, { id: generateId(), userId, postId, createdAt: new Date().toISOString() }];
      updatedPosts = posts.map(p => p.id === postId ? { ...p, likesCount: p.likesCount + 1 } : p);
    }

    localStorage.setItem('aipop_likes', JSON.stringify(updatedLikes));
    localStorage.setItem('aipop_posts', JSON.stringify(updatedPosts));
    set({ likes: updatedLikes, posts: updatedPosts });
    return !existing;
  },

  isLiked: (userId, postId) => {
    return get().likes.some(l => l.userId === userId && l.postId === postId);
  },

  addComment: (userId, postId, content, parentId) => {
    const { comments, posts } = get();
    const newComment: Comment = {
      id: generateId(),
      userId,
      postId,
      parentId,
      content,
      likesCount: 0,
      createdAt: new Date().toISOString(),
    };

    const updatedComments = [...comments, newComment];
    const updatedPosts = posts.map(p => p.id === postId ? { ...p, commentsCount: p.commentsCount + 1 } : p);

    localStorage.setItem('aipop_comments', JSON.stringify(updatedComments));
    localStorage.setItem('aipop_posts', JSON.stringify(updatedPosts));
    set({ comments: updatedComments, posts: updatedPosts });
    return newComment;
  },

  getPostComments: (postId) => {
    return get().comments.filter(c => c.postId === postId);
  },

  toggleSave: (userId, postId) => {
    const { savedPosts } = get();
    const existing = savedPosts.find(s => s.userId === userId && s.postId === postId);

    let updated: SavedPost[];
    if (existing) {
      updated = savedPosts.filter(s => s.id !== existing.id);
    } else {
      updated = [...savedPosts, { id: generateId(), userId, postId, createdAt: new Date().toISOString() }];
    }

    localStorage.setItem('aipop_saved', JSON.stringify(updated));
    set({ savedPosts: updated });
    return !existing;
  },

  isSaved: (userId, postId) => {
    return get().savedPosts.some(s => s.userId === userId && s.postId === postId);
  },

  getUserPosts: (userId) => {
    return get().posts.filter(p => p.userId === userId);
  },

  incrementView: (postId) => {
    const { posts } = get();
    const updated = posts.map(p => p.id === postId ? { ...p, viewsCount: p.viewsCount + 1 } : p);
    localStorage.setItem('aipop_posts', JSON.stringify(updated));
    set({ posts: updated });
  },
}));
