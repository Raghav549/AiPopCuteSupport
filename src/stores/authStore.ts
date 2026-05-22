import { create } from 'zustand';
import { User } from '@/types';
import { MOCK_USERS } from '@/constants/mockData';
import { generateId } from '@/lib/utils';

interface AuthState {
  currentUser: User | null;
  users: User[];
  isLoading: boolean;
  login: (emailOrUsername: string, password: string) => { success: boolean; error?: string };
  signup: (name: string, username: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  currentUser: null,
  users: [],
  isLoading: true,

  initialize: () => {
    const savedUsers = localStorage.getItem('aipop_users');
    const savedCurrentUser = localStorage.getItem('aipop_current_user');
    const users = savedUsers ? JSON.parse(savedUsers) : MOCK_USERS;
    const currentUser = savedCurrentUser ? JSON.parse(savedCurrentUser) : null;

    if (!savedUsers) {
      localStorage.setItem('aipop_users', JSON.stringify(MOCK_USERS));
    }

    set({ users, currentUser, isLoading: false });
  },

  login: (emailOrUsername, password) => {
    const { users } = get();
    const user = users.find(
      u => (u.email === emailOrUsername || u.username === emailOrUsername) && u.password === password
    );

    if (!user) {
      return { success: false, error: 'Invalid email/username or password' };
    }

    localStorage.setItem('aipop_current_user', JSON.stringify(user));
    set({ currentUser: user });
    return { success: true };
  },

  signup: (name, username, email, password) => {
    const { users } = get();

    if (users.find(u => u.email === email)) {
      return { success: false, error: 'Email already registered' };
    }
    if (users.find(u => u.username === username)) {
      return { success: false, error: 'Username already taken' };
    }

    const newUser: User = {
      id: generateId(),
      numericId: users.length + 1,
      name,
      username,
      email,
      password,
      role: 'user',
      verified: true,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&seed=${Date.now()}`,
      cover: '',
      bio: '',
      isPrivate: false,
      createdAt: new Date().toISOString(),
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem('aipop_users', JSON.stringify(updatedUsers));
    localStorage.setItem('aipop_current_user', JSON.stringify(newUser));
    set({ users: updatedUsers, currentUser: newUser });
    return { success: true };
  },

  logout: () => {
    localStorage.removeItem('aipop_current_user');
    set({ currentUser: null });
  },

  updateUser: (updates) => {
    const { currentUser, users } = get();
    if (!currentUser) return;

    const updatedUser = { ...currentUser, ...updates };
    const updatedUsers = users.map(u => u.id === currentUser.id ? updatedUser : u);

    localStorage.setItem('aipop_current_user', JSON.stringify(updatedUser));
    localStorage.setItem('aipop_users', JSON.stringify(updatedUsers));
    set({ currentUser: updatedUser, users: updatedUsers });
  },
}));
