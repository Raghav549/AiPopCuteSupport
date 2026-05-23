import { useNavigate } from 'react-router-dom';
import { User, Lock, Bell, MessageCircle, Shield, Activity, Database, HelpCircle, ChevronRight } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';

export default function Settings() {
  const navigate = useNavigate();
  const { currentUser } = useAuthStore();

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const sections = [
    { icon: User, label: 'Edit Profile', desc: 'Name, bio, avatar, cover', path: '/settings/account' },
    { icon: Lock, label: 'Privacy', desc: 'Private account, activity status', path: '/settings/privacy' },
    { icon: Bell, label: 'Notifications', desc: 'Push, email, in-app', path: '/settings/notifications' },
    { icon: MessageCircle, label: 'Chat Settings', desc: 'Message requests, read receipts', path: '/settings/chat' },
    { icon: Shield, label: 'Blocked Users', desc: 'Manage blocked accounts', path: '/settings/blocked' },
    { icon: Shield, label: 'Restricted Users', desc: 'Manage restricted accounts', path: '/settings/restricted' },
    { icon: Activity, label: 'Activity Log', desc: 'Your actions and history', path: '/settings/activity' },
    { icon: Lock, label: 'Security', desc: 'Password, sessions', path: '/settings/security' },
    { icon: Database, label: 'Data & Storage', desc: 'Download data, cache', path: '/settings/data' },
    { icon: HelpCircle, label: 'Help & Support', desc: 'FAQ, contact us', path: '/settings/help' },
  ];

  return (
    <div className="px-4 py-4 space-y-2">
      {/* User Card */}
      <div className="bg-white rounded-2xl p-4 shadow-card flex items-center gap-3 mb-4">
        <img src={currentUser.avatar} alt={currentUser.name} className="size-12 rounded-full object-cover" />
        <div>
          <p className="font-bold text-sm">{currentUser.name}</p>
          <p className="text-xs text-muted-foreground">@{currentUser.username} · ID: {currentUser.numericId}</p>
        </div>
      </div>

      {/* Settings List */}
      {sections.map(({ icon: Icon, label, desc, path }) => (
        <button
          key={label}
          className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-white shadow-card hover:bg-muted/30 transition-colors text-left"
          onClick={() => navigate(path)}
        >
          <div className="size-9 rounded-full bg-yellow-50 flex items-center justify-center flex-shrink-0">
            <Icon className="size-4.5 text-yellow-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm">{label}</p>
            <p className="text-xs text-muted-foreground">{desc}</p>
          </div>
          <ChevronRight className="size-4 text-muted-foreground flex-shrink-0" />
        </button>
      ))}
    </div>
  );
}
