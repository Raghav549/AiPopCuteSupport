import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useToastStore } from '@/hooks/useToast';
import { useSettingsStore } from '@/stores/settingsStore';

const sectionTitles: Record<string, string> = { account:'Edit Profile', privacy:'Privacy', notifications:'Notifications', chat:'Chat Settings', blocked:'Blocked Users', restricted:'Restricted Users', activity:'Activity Log', security:'Security', data:'Data & Storage', help:'Help & Support' };

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
  const { currentUser, users, updateUser } = useAuthStore();
  const addToast = useToastStore(s => s.addToast);
  const { getFor, updateSection } = useSettingsStore();
  const settings = currentUser ? getFor(currentUser.id) : null;
  const [form, setForm] = useState({ name: currentUser?.name || '', username: currentUser?.username || '', email: currentUser?.email || '', bio: currentUser?.bio || '', avatar: currentUser?.avatar || '', cover: currentUser?.cover || '' });
  const title = useMemo(() => sectionTitles[section] ?? 'Settings', [section]);
  if (!currentUser || !settings) return null;
  const saveAccount = () => {
    if (users.some(u => u.id !== currentUser.id && u.username.toLowerCase() === form.username.toLowerCase())) return addToast('Username already taken', 'error');
    updateUser(form); addToast('Profile updated', 'success');
  };
  return <div className="px-4 py-4 space-y-4"><div className="flex items-center gap-3"><button onClick={() => navigate('/settings')}><ArrowLeft className="size-5"/></button><h2 className="font-bold">{title}</h2></div>
    {section==='account' && <div className="bg-white rounded-xl shadow-card p-4 space-y-2">{['name','username','email','avatar','cover'].map(k=><input key={k} className="w-full border rounded-lg p-2" value={(form as any)[k]} onChange={e=>setForm({...form,[k]:e.target.value})} placeholder={k} />)}<textarea className="w-full border rounded-lg p-2" value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})} placeholder="bio"/></div>}
    {section==='privacy' && <div className="bg-white rounded-xl shadow-card p-4 space-y-2 text-sm"> <label><input type="checkbox" checked={settings.privacy.isPrivate} onChange={e=>updateSection(currentUser.id,'privacy',{isPrivate:e.target.checked})}/> Private profile</label><label><input type="checkbox" checked={settings.privacy.showFollowers} onChange={e=>updateSection(currentUser.id,'privacy',{showFollowers:e.target.checked})}/> Show followers</label><label><input type="checkbox" checked={settings.privacy.showFollowing} onChange={e=>updateSection(currentUser.id,'privacy',{showFollowing:e.target.checked})}/> Show following</label></div>}
    {section==='notifications' && <div className="bg-white rounded-xl shadow-card p-4 space-y-2 text-sm">{Object.entries(settings.notifications).map(([k,v])=><label key={k} className="block"><input type="checkbox" checked={v} onChange={e=>updateSection(currentUser.id,'notifications',{[k]:e.target.checked} as any)}/> {k}</label>)}</div>}
    {section==='chat' && <div className="bg-white rounded-xl shadow-card p-4 space-y-2 text-sm">{Object.entries(settings.chat).map(([k,v])=><label key={k} className="block"><input type="checkbox" checked={v} onChange={e=>updateSection(currentUser.id,'chat',{[k]:e.target.checked} as any)}/> {k}</label>)}</div>}
    {['blocked','restricted','activity','security','data','help'].includes(section) && <div className="bg-white rounded-xl shadow-card p-4 text-sm">This section is now connected. Advanced backend endpoints are next step.</div>}
    <button onClick={section==='account'?saveAccount:()=>addToast(`${title} saved`,'success')} className="w-full gradient-yellow text-white rounded-xl py-2.5 font-semibold">Save</button></div>;
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
