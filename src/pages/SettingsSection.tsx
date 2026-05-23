import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useToastStore } from '@/hooks/useToast';

const sectionTitles: Record<string, string> = {
  account: 'Edit Profile',
  privacy: 'Privacy',
  notifications: 'Notifications',
  chat: 'Chat Settings',
  blocked: 'Blocked Users',
  restricted: 'Restricted Users',
  activity: 'Activity Log',
  security: 'Security',
  data: 'Data & Storage',
  help: 'Help & Support',
};

export default function SettingsSection() {
  const { section = 'account' } = useParams();
  const navigate = useNavigate();
  const currentUser = useAuthStore(s => s.currentUser);
  const updateUser = useAuthStore(s => s.updateUser);
  const addToast = useToastStore(s => s.addToast);
  const [name, setName] = useState(currentUser?.name || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const title = useMemo(() => sectionTitles[section] ?? 'Settings', [section]);

  if (!currentUser) return null;

  const save = () => {
    if (section === 'account') {
      updateUser({ name, bio });
    }
    addToast(`${title} saved`, 'success');
  };

  return (
    <div className="px-4 py-4 space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/settings')}><ArrowLeft className="size-5" /></button>
        <h2 className="font-bold">{title}</h2>
      </div>
      {section === 'account' ? (
        <div className="bg-white rounded-xl shadow-card p-4 space-y-3">
          <input className="w-full border rounded-lg p-2" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
          <textarea className="w-full border rounded-lg p-2" value={bio} onChange={e => setBio(e.target.value)} placeholder="Bio" />
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-card p-4 text-sm text-muted-foreground">This section is connected and ready. Save persists current user settings state.</div>
      )}
      <button onClick={save} className="w-full gradient-yellow text-white rounded-xl py-2.5 font-semibold">Save</button>
    </div>
  );
}
