import { Outlet } from 'react-router-dom';
import StickyHeader from './StickyHeader';
import BottomNav from './BottomNav';
import ToastContainer from '@/components/features/ToastContainer';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] max-w-lg mx-auto relative">
      <StickyHeader />
      <main className="pb-20">
        <Outlet />
      </main>
      <BottomNav />
      <ToastContainer />
    </div>
  );
}
