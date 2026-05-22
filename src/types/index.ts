export interface User {
  id: string;
  numericId: number;
  name: string;
  username: string;
  email: string;
  password: string;
  role: 'user' | 'creator';
  verified: boolean;
  avatar: string;
  cover: string;
  bio: string;
  mixChannelId?: string;
  goalVotes?: number;
  isPrivate: boolean;
  createdAt: string;
}

export interface Profile {
  userId: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  votesReceived: number;
}

export interface Post {
  id: string;
  userId: string;
  caption: string;
  media?: string;
  mediaType?: 'image' | 'video';
  hashtags: string[];
  visibility: 'public' | 'private' | 'followers';
  allowComments: boolean;
  allowDownload: boolean;
  filter?: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  viewsCount: number;
  downloadsCount: number;
  createdAt: string;
}

export interface Vote {
  id: string;
  userId: string;
  targetUserId: string;
  date: string;
  createdAt: string;
}

export interface Like {
  id: string;
  userId: string;
  postId: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  postId: string;
  parentId?: string;
  content: string;
  likesCount: number;
  createdAt: string;
}

export interface Follow {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  fromUserId: string;
  type: 'vote' | 'follow' | 'like' | 'comment' | 'message' | 'mention' | 'share' | 'ai_post';
  postId?: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  encryptedContent?: string;
  read: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  members: string[];
  lastMessage?: Message;
  updatedAt: string;
}

export interface SavedPost {
  id: string;
  userId: string;
  postId: string;
  createdAt: string;
}

export interface Block {
  id: string;
  userId: string;
  blockedUserId: string;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  details?: string;
  createdAt: string;
}
