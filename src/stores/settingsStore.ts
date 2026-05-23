import { create } from 'zustand';

export interface UserSettings {
  privacy: { isPrivate: boolean; showFollowers: boolean; showFollowing: boolean; messagePermission: 'everyone'|'followers'; commentPermission: 'everyone'|'followers'|'none' };
  notifications: { likes: boolean; comments: boolean; follows: boolean; votes: boolean; messages: boolean };
  chat: { readReceipts: boolean; typingIndicator: boolean; messageRequests: boolean; onlineStatus: boolean };
}

interface SettingsState {
  byUser: Record<string, UserSettings>;
  init: () => void;
  getFor: (userId: string) => UserSettings;
  updateSection: (userId: string, section: keyof UserSettings, patch: Partial<UserSettings[keyof UserSettings]>) => void;
}

const defaults: UserSettings = {
  privacy: { isPrivate: false, showFollowers: true, showFollowing: true, messagePermission: 'everyone', commentPermission: 'everyone' },
  notifications: { likes: true, comments: true, follows: true, votes: true, messages: true },
  chat: { readReceipts: true, typingIndicator: true, messageRequests: true, onlineStatus: true },
};

export const useSettingsStore = create<SettingsState>((set, get) => ({
  byUser: {},
  init: () => {
    const raw = localStorage.getItem('aipop_settings');
    set({ byUser: raw ? JSON.parse(raw) : {} });
  },
  getFor: (userId) => get().byUser[userId] ?? defaults,
  updateSection: (userId, section, patch) => {
    const current = get().getFor(userId);
    const next = { ...get().byUser, [userId]: { ...current, [section]: { ...current[section], ...patch } } };
    localStorage.setItem('aipop_settings', JSON.stringify(next));
    set({ byUser: next });
  },
}));
