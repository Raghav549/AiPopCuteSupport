import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Sparkles } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useToastStore } from '@/hooks/useToast';

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuthStore();
  const { addToast } = useToastStore();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const result = signup(name, username.toLowerCase(), email, password);
      setIsLoading(false);

      if (result.success) {
        addToast('Welcome to Ai Pop Cute! 🎉💛', 'success');
        navigate('/home');
      } else {
        setError(result.error || 'Signup failed');
      }
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8 bg-white max-w-lg mx-auto">
      <div className="w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2">
            <Sparkles className="size-7 text-yellow-500" />
            <span className="font-extrabold text-2xl text-gradient-yellow">Ai Pop Cute</span>
          </div>
          <p className="text-sm text-muted-foreground">Create an account to support Ai!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="signup-name" className="text-sm font-medium block mb-1.5">Name</label>
            <input
              id="signup-name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your display name"
              required
              className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label htmlFor="signup-username" className="text-sm font-medium block mb-1.5">Username</label>
            <input
              id="signup-username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value.replace(/[^a-z0-9_]/gi, '').toLowerCase())}
              placeholder="Choose a username"
              required
              className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label htmlFor="signup-email" className="text-sm font-medium block mb-1.5">Email</label>
            <input
              id="signup-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label htmlFor="signup-password" className="text-sm font-medium block mb-1.5">Password</label>
            <div className="relative">
              <input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Min 6 characters"
                required
                className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground"
                aria-label={showPassword ? 'Hide' : 'Show'}
              >
                {showPassword ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full gradient-yellow text-white font-bold py-3.5 rounded-xl text-sm shadow-cute hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-yellow-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
