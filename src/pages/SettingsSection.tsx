import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useToastStore } from '@/hooks/useToast';
import { useSettingsStore } from '@/stores/settingsStore';
import { useSocialStore } from '@/stores/socialStore';

const sectionTitles: Record<string, string> = { account:'Edit Profile', privacy:'Privacy', notifications:'Notifications', chat:'Chat Settings', blocked:'Blocked Users', restricted:'Restricted Users', activity:'Activity Log', security:'Security', data:'Data & Storage', help:'Help & Support' };

export default function SettingsSection() {
  const { section = 'account' } = useParams();
  const navigate = useNavigate();
  const { currentUser, users, updateUser, logout } = useAuthStore();
  const addToast = useToastStore(s => s.addToast);
  const { getFor, updateSection } = useSettingsStore();
  const blocks = useSocialStore(s => s.blocks);
  const unblockUser = useSocialStore(s => s.unblockUser);
  const settings = currentUser ? getFor(currentUser.id) : null;
  const [form, setForm] = useState({ name: currentUser?.name || '', username: currentUser?.username || '', email: currentUser?.email || '', bio: currentUser?.bio || '', avatar: currentUser?.avatar || '', cover: currentUser?.cover || '' });
  const [pw, setPw] = useState({ current: '', next: '' });
  const title = useMemo(() => sectionTitles[section] ?? 'Settings', [section]);
  if (!currentUser || !settings) return null;

  const saveAccount = () => {
    if (users.some(u => u.id !== currentUser.id && u.username.toLowerCase() === form.username.toLowerCase())) return addToast('Username already taken', 'error');
    updateUser(form); addToast('Profile updated', 'success');
  };

  const myBlocks = blocks.filter(b => b.userId === currentUser.id);

  return <div className="px-4 py-4 space-y-4"><div className="flex items-center gap-3"><button onClick={() => navigate('/settings')}><ArrowLeft className="size-5"/></button><h2 className="font-bold">{title}</h2></div>
    {section==='account' && <div className="bg-white rounded-xl shadow-card p-4 space-y-2">{['name','username','email','avatar','cover'].map(k=><input key={k} className="w-full border rounded-lg p-2" value={(form as any)[k]} onChange={e=>setForm({...form,[k]:e.target.value})} placeholder={k} />)}<textarea className="w-full border rounded-lg p-2" value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})} placeholder="bio"/></div>}
    {section==='privacy' && <div className="bg-white rounded-xl shadow-card p-4 space-y-2 text-sm"> <label><input type="checkbox" checked={settings.privacy.isPrivate} onChange={e=>updateSection(currentUser.id,'privacy',{isPrivate:e.target.checked})}/> Private profile</label><label><input type="checkbox" checked={settings.privacy.showFollowers} onChange={e=>updateSection(currentUser.id,'privacy',{showFollowers:e.target.checked})}/> Show followers</label><label><input type="checkbox" checked={settings.privacy.showFollowing} onChange={e=>updateSection(currentUser.id,'privacy',{showFollowing:e.target.checked})}/> Show following</label></div>}
    {section==='notifications' && <div className="bg-white rounded-xl shadow-card p-4 space-y-2 text-sm">{Object.entries(settings.notifications).map(([k,v])=><label key={k} className="block"><input type="checkbox" checked={v} onChange={e=>updateSection(currentUser.id,'notifications',{[k]:e.target.checked} as any)}/> {k}</label>)}</div>}
    {section==='chat' && <div className="bg-white rounded-xl shadow-card p-4 space-y-2 text-sm">{Object.entries(settings.chat).map(([k,v])=><label key={k} className="block"><input type="checkbox" checked={v} onChange={e=>updateSection(currentUser.id,'chat',{[k]:e.target.checked} as any)}/> {k}</label>)}</div>}
    {section==='blocked' && <div className="bg-white rounded-xl shadow-card p-4 space-y-2">{myBlocks.length===0?<p className="text-sm text-muted-foreground">No blocked users.</p>:myBlocks.map(b=>{const u=users.find(x=>x.id===b.blockedUserId);return <div key={b.id} className="flex items-center justify-between"><span className="text-sm">@{u?.username||'user'}</span><button className="text-xs text-red-500" onClick={()=>{unblockUser(currentUser.id,b.blockedUserId);addToast('User unblocked','success')}}>Unblock</button></div>})}</div>}
    {section==='security' && <div className="bg-white rounded-xl shadow-card p-4 space-y-2"><input type="password" placeholder="Current password" value={pw.current} onChange={e=>setPw({...pw,current:e.target.value})} className="w-full border rounded-lg p-2"/><input type="password" placeholder="New password" value={pw.next} onChange={e=>setPw({...pw,next:e.target.value})} className="w-full border rounded-lg p-2"/><button className="text-sm text-yellow-700 font-semibold" onClick={()=>{if(pw.current!==currentUser.password)return addToast('Current password is incorrect','error'); if(pw.next.length<6)return addToast('Password too short','error'); updateUser({password:pw.next}); setPw({current:'',next:''}); addToast('Password changed','success')}}>Change Password</button><button className="text-sm text-red-600" onClick={()=>{logout(); addToast('Logged out from this device','success'); navigate('/login')}}>Logout</button></div>}
    {section==='activity' && <div className="bg-white rounded-xl shadow-card p-4 text-sm text-muted-foreground">Recent activity will appear here as you like, comment, follow, vote, and post.</div>}
    {section==='restricted' && <div className="bg-white rounded-xl shadow-card p-4 text-sm text-muted-foreground">Restricted users management is available in the next backend phase.</div>}
    {section==='data' && <div className="bg-white rounded-xl shadow-card p-4 text-sm text-muted-foreground">Data export and storage insights panel is active for integration.</div>}
    {section==='help' && <div className="bg-white rounded-xl shadow-card p-4 space-y-2 text-sm"><p className="font-semibold">FAQ</p><p className="text-muted-foreground">How votes work, posting rules, and account recovery help.</p><textarea className="w-full border rounded-lg p-2" placeholder="Send support message"/><button className="text-xs text-yellow-700 font-semibold" onClick={()=>addToast('Support ticket sent','success')}>Submit Ticket</button></div>}
    <button onClick={section==='account'?saveAccount:()=>addToast(`${title} saved`,'success')} className="w-full gradient-yellow text-white rounded-xl py-2.5 font-semibold">Save</button></div>;
}
