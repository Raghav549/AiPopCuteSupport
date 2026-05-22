import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface HeartBurstProps {
  trigger: boolean;
  onComplete?: () => void;
}

export default function HeartBurst({ trigger, onComplete }: HeartBurstProps) {
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number; delay: number }[]>([]);

  useEffect(() => {
    if (trigger) {
      const newHearts = Array.from({ length: 12 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 120 - 60,
        y: Math.random() * -80 - 20,
        delay: Math.random() * 0.3,
      }));
      setHearts(newHearts);
      setTimeout(() => {
        setHearts([]);
        onComplete?.();
      }, 1500);
    }
  }, [trigger, onComplete]);

  if (hearts.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float-up"
          style={{
            left: `calc(50% + ${heart.x}px)`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          <Heart
            className="text-heart fill-heart"
            size={Math.random() * 16 + 12}
          />
        </div>
      ))}
    </div>
  );
}
