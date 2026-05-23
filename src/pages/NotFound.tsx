import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8 bg-white max-w-lg mx-auto">
      <div className="text-center space-y-4">
        <p className="text-6xl font-extrabold text-gradient-yellow">404</p>
        <h1 className="text-xl font-bold">Page Not Found</h1>
        <p className="text-sm text-muted-foreground">The page you are looking for does not exist.</p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 gradient-yellow text-white font-semibold px-6 py-3 rounded-xl text-sm"
        >
          <Home className="size-4" />
          Go Home
        </button>
      </div>
    </div>
  );
}
