import { create } from 'zustand';
import { Follow, Notification, Block } from '@/types';
import { generateId } from '@/lib/utils';

interface SocialState {
  follows: Follow[];
  notifications: Notification[];
  blocks: Block[];
  initialize: () => void;
  toggleFollow: (followerId: string, followingId: string) => boolean;
  isFollowing: (followerId: string, followingId: string) => boolean;
  getFollowersCount: (userId: string) => number;
  getFollowingCount: (userId: string) => number;
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void;
  markNotificationRead: (id: string) => void;
  markAllRead: (userId: string) => void;
  getUnreadCount: (userId: string) => number;
  getUserNotifications: (userId: string) => Notification[];
  blockUser: (userId: string, blockedUserId: string) => void;
  unblockUser: (userId: string, blockedUserId: string) => void;
  isBlocked: (userId: string, blockedUserId: string) => boolean;
}

export const useSocialStore = create<SocialState>((set, get) => ({
  follows: [],
  notifications: [],
  blocks: [],

  initialize: () => {
    const savedFollows = localStorage.getItem('aipop_follows');
    const savedNotifs = localStorage.getItem('aipop_notifications');
    const savedBlocks = localStorage.getItem('aipop_blocks');

    set({
      follows: savedFollows ? JSON.parse(savedFollows) : [],
      notifications: savedNotifs ? JSON.parse(savedNotifs) : [],
      blocks: savedBlocks ? JSON.parse(savedBlocks) : [],
    });
  },

  toggleFollow: (followerId, followingId) => {
    const { follows } = get();
    const existing = follows.find(f => f.followerId === followerId && f.followingId === followingId);

    let updated: Follow[];
    if (existing) {
      updated = follows.filter(f => f.id !== existing.id);
    } else {
      updated = [...follows, { id: generateId(), followerId, followingId, createdAt: new Date().toISOString() }];
    }

    localStorage.setItem('aipop_follows', JSON.stringify(updated));
    set({ follows: updated });
    return !existing;
  },

  isFollowing: (followerId, followingId) => {
    return get().follows.some(f => f.followerId === followerId && f.followingId === followingId);
  },

  getFollowersCount: (userId) => {
    return get().follows.filter(f => f.followingId === userId).length;
  },

  getFollowingCount: (userId) => {
    return get().follows.filter(f => f.followerId === userId).length;
  },

  addNotification: (notification) => {
    const { notifications } = get();
    const newNotif: Notification = {
      ...notification,
      id: generateId(),
      read: false,
      createdAt: new Date().toISOString(),
    };
    const updated = [newNotif, ...notifications];
    localStorage.setItem('aipop_notifications', JSON.stringify(updated));
    set({ notifications: updated });
  },

  markNotificationRead: (id) => {
    const { notifications } = get();
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    localStorage.setItem('aipop_notifications', JSON.stringify(updated));
    set({ notifications: updated });
  },

  markAllRead: (userId) => {
    const { notifications } = get();
    const updated = notifications.map(n => n.userId === userId ? { ...n, read: true } : n);
    localStorage.setItem('aipop_notifications', JSON.stringify(updated));
    set({ notifications: updated });
  },

  getUnreadCount: (userId) => {
    return get().notifications.filter(n => n.userId === userId && !n.read).length;
  },

  getUserNotifications: (userId) => {
    return get().notifications.filter(n => n.userId === userId);
  },

  blockUser: (userId, blockedUserId) => {
    const { blocks } = get();
    const updated = [...blocks, { id: generateId(), userId, blockedUserId, createdAt: new Date().toISOString() }];
    localStorage.setItem('aipop_blocks', JSON.stringify(updated));
    set({ blocks: updated });
  },

  unblockUser: (userId, blockedUserId) => {
    const { blocks } = get();
    const updated = blocks.filter(b => !(b.userId === userId && b.blockedUserId === blockedUserId));
    localStorage.setItem('aipop_blocks', JSON.stringify(updated));
    set({ blocks: updated });
  },

  isBlocked: (userId, blockedUserId) => {
    return get().blocks.some(b => b.userId === userId && b.blockedUserId === blockedUserId);
  },
}));
