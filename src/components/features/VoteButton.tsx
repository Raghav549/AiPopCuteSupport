import { useState } from 'react';
import { Heart } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useVoteStore } from '@/stores/voteStore';
import { useToastStore } from '@/hooks/useToast';
import HeartBurst from './HeartBurst';
import { useNavigate } from 'react-router-dom';

export default function VoteButton() {
  const navigate = useNavigate();
  const { currentUser } = useAuthStore();
  const { castVote, hasVotedToday } = useVoteStore();
  const { addToast } = useToastStore();
  const [burst, setBurst] = useState(false);
  const [pressing, setPressing] = useState(false);

  const voted = currentUser ? hasVotedToday(currentUser.id) : false;

  const handleVote = () => {
    if (!currentUser) {
      addToast('Please login to cheer for Ai! 💛', 'info');
      navigate('/login');
      return;
    }

    if (voted) {
      addToast('You already cheered today! Come back tomorrow 💛', 'info');
      return;
    }

    const result = castVote(currentUser.id);
    if (result.success) {
      setBurst(true);
      addToast('Cheer vote sent! Thank you! 🎉💛', 'success');
    } else {
      addToast(result.error || 'Could not vote', 'error');
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      <button
        onClick={handleVote}
        onMouseDown={() => setPressing(true)}
        onMouseUp={() => setPressing(false)}
        onTouchStart={() => setPressing(true)}
        onTouchEnd={() => setPressing(false)}
        disabled={voted}
        className={`
          relative flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base
          transition-all duration-200
          ${voted
            ? 'bg-yellow-100 text-yellow-700 cursor-default'
            : 'gradient-yellow text-white shadow-cute animate-pulse-glow hover:shadow-lg active:scale-95'
          }
          ${pressing && !voted ? 'scale-95' : ''}
        `}
        aria-label={voted ? 'Already cheered today' : 'Send cheer vote'}
      >
        <Heart className={`size-5 ${voted ? 'fill-yellow-500' : 'fill-white'}`} />
        <span>{voted ? 'Cheered Today! 💛' : 'Cheer Vote!'}</span>
      </button>

      <HeartBurst trigger={burst} onComplete={() => setBurst(false)} />

      {voted && (
        <p className="text-xs text-muted-foreground mt-2">
          Come back tomorrow to cheer again!
        </p>
      )}
    </div>
  );
}
