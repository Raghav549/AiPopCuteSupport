import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { useToastStore } from '@/hooks/useToast';

export default function ResetPassword() {
  const navigate = useNavigate();
  const currentUser = useAuthStore(s => s.currentUser);
  const updateUser = useAuthStore(s => s.updateUser);
  const addToast = useToastStore(s => s.addToast);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const submit = () => {
    if (password.length < 6) return addToast('Password must be at least 6 chars', 'error');
    if (password !== confirm) return addToast('Passwords do not match', 'error');
    if (!currentUser) return addToast('Login first in this demo flow', 'info');
    updateUser({ password });
    addToast('Password updated', 'success');
    navigate('/profile');
  };

  return <div className="min-h-screen px-4 py-8 bg-background"><div className="max-w-md mx-auto bg-white rounded-2xl p-5 shadow-card space-y-4"><h1 className="font-extrabold text-xl">Reset Password</h1><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="New password" className="w-full border rounded-xl p-3"/><input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="Confirm new password" className="w-full border rounded-xl p-3"/><button onClick={submit} className="w-full gradient-yellow text-white py-3 rounded-xl font-semibold">Update Password</button><p className="text-sm text-muted-foreground"><Link to="/login" className="text-yellow-600 font-semibold">Back to login</Link></p></div></div>;
}
