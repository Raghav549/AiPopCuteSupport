import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Sparkles } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useToastStore } from '@/hooks/useToast';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { addToast } = useToastStore();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const result = login(emailOrUsername, password);
      setIsLoading(false);

      if (result.success) {
        addToast('Welcome back! 💛', 'success');
        navigate('/home');
      } else {
        setError(result.error || 'Login failed');
      }
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8 bg-white max-w-lg mx-auto">
      <div className="w-full space-y-6">
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2">
            <Sparkles className="size-7 text-yellow-500" />
            <span className="font-extrabold text-2xl text-gradient-yellow">Ai Pop Cute</span>
          </div>
          <p className="text-sm text-muted-foreground">Sign in to support Ai!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="login-email" className="text-sm font-medium text-foreground block mb-1.5">
              Email or Username
            </label>
            <input
              id="login-email"
              type="text"
              value={emailOrUsername}
              onChange={e => setEmailOrUsername(e.target.value)}
              placeholder="Enter email or username"
              required
              className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-shadow"
            />
          </div>

          <div>
            <label htmlFor="login-password" className="text-sm font-medium text-foreground block mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-shadow pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
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
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold text-yellow-600 hover:underline">
            Sign Up
          </Link>
        </p>

        <div className="border-t border-border pt-4">
          <p className="text-xs text-muted-foreground text-center mb-2">Demo accounts:</p>
          <div className="space-y-1.5 text-xs text-center text-muted-foreground">
            <p>Creator: <span className="font-mono">aipopgirl@demo.com</span> / <span className="font-mono">ai123456789</span></p>
            <p>User: <span className="font-mono">sakura@demo.com</span> / <span className="font-mono">pass123</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
