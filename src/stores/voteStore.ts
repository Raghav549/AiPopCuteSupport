import { create } from 'zustand';
import { Vote } from '@/types';
import { generateId, getTodayKey } from '@/lib/utils';
import { INITIAL_VOTE_COUNT } from '@/constants/mockData';

interface VoteState {
  votes: Vote[];
  totalVotes: number;
  initialize: () => void;
  castVote: (userId: string) => { success: boolean; error?: string };
  hasVotedToday: (userId: string) => boolean;
  getVoteHistory: (userId: string) => Vote[];
}

export const useVoteStore = create<VoteState>((set, get) => ({
  votes: [],
  totalVotes: INITIAL_VOTE_COUNT,

  initialize: () => {
    const savedVotes = localStorage.getItem('aipop_votes');
    const savedTotal = localStorage.getItem('aipop_total_votes');
    const votes = savedVotes ? JSON.parse(savedVotes) : [];
    const totalVotes = savedTotal ? parseInt(savedTotal) : INITIAL_VOTE_COUNT;
    set({ votes, totalVotes });
  },

  castVote: (userId) => {
    const { votes, totalVotes } = get();
    const today = getTodayKey();

    const alreadyVoted = votes.some(
      v => v.userId === userId && v.date === today
    );

    if (alreadyVoted) {
      return { success: false, error: 'You already cheered today! Come back tomorrow 💛' };
    }

    const newVote: Vote = {
      id: generateId(),
      userId,
      targetUserId: 'ai-001',
      date: today,
      createdAt: new Date().toISOString(),
    };

    const updatedVotes = [...votes, newVote];
    const newTotal = totalVotes + 1;

    localStorage.setItem('aipop_votes', JSON.stringify(updatedVotes));
    localStorage.setItem('aipop_total_votes', newTotal.toString());
    set({ votes: updatedVotes, totalVotes: newTotal });
    return { success: true };
  },

  hasVotedToday: (userId) => {
    const { votes } = get();
    const today = getTodayKey();
    return votes.some(v => v.userId === userId && v.date === today);
  },

  getVoteHistory: (userId) => {
    const { votes } = get();
    return votes.filter(v => v.userId === userId);
  },
}));
