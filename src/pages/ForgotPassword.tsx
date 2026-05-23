import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { useToastStore } from '@/hooks/useToast';

export default function ForgotPassword() {
  const { users } = useAuthStore();
  const addToast = useToastStore(s => s.addToast);
  const [email, setEmail] = useState('');

  const submit = () => {
    if (!email.trim()) return addToast('Enter your email', 'error');
    const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    addToast(exists ? 'Password reset link sent (demo flow)' : 'Email not found', exists ? 'success' : 'error');
  };

  return <div className="min-h-screen px-4 py-8 bg-background"><div className="max-w-md mx-auto bg-white rounded-2xl p-5 shadow-card space-y-4"><h1 className="font-extrabold text-xl">Forgot Password</h1><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" className="w-full border rounded-xl p-3"/><button onClick={submit} className="w-full gradient-yellow text-white py-3 rounded-xl font-semibold">Send Reset Link</button><p className="text-sm text-muted-foreground">Remembered? <Link to="/login" className="text-yellow-600 font-semibold">Login</Link></p></div></div>;
}
