import { useState } from 'react';
import { useToastStore } from '@/hooks/useToast';

export default function GroupCreate() {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const addToast = useToastStore(s => s.addToast);
  const submit = () => {
    if (!name.trim()) return addToast('Group name is required', 'error');
    addToast('Group created successfully', 'success');
    setName(''); setDesc('');
  };
  return <div className="px-4 py-4"><div className="bg-white rounded-2xl p-4 shadow-card space-y-3"><h2 className="font-bold">Create Group</h2><input value={name} onChange={e=>setName(e.target.value)} placeholder="Group name" className="w-full border rounded-xl p-2.5"/><textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description" className="w-full border rounded-xl p-2.5"/><button onClick={submit} className="w-full gradient-yellow text-white rounded-xl py-2.5 font-semibold">Create</button></div></div>;
}
