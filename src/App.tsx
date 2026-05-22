import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { useVoteStore } from '@/stores/voteStore';
import { usePostStore } from '@/stores/postStore';
import { useSocialStore } from '@/stores/socialStore';
import AppLayout from '@/components/layout/AppLayout';
import { PostSkeleton } from '@/components/features/SkeletonLoader';
import ToastContainer from '@/components/features/ToastContainer';

const Home = lazy(() => import('@/pages/Home'));
const Login = lazy(() => import('@/pages/Login'));
const Signup = lazy(() => import('@/pages/Signup'));
const AiProfile = lazy(() => import('@/pages/AiProfile'));
const Search = lazy(() => import('@/pages/Search'));
const Studio = lazy(() => import('@/pages/Studio'));
const Notifications = lazy(() => import('@/pages/Notifications'));
const Messages = lazy(() => import('@/pages/Messages'));
const Profile = lazy(() => import('@/pages/Profile'));
const Settings = lazy(() => import('@/pages/Settings'));
const CreatorDashboard = lazy(() => import('@/pages/CreatorDashboard'));
const PostDetail = lazy(() => import('@/pages/PostDetail'));
const UserProfile = lazy(() => import('@/pages/UserProfile'));

function LoadingFallback() {
  return (
    <div className="px-4 py-4 space-y-4">
      <PostSkeleton />
    </div>
  );
}

export default function App() {
  const initAuth = useAuthStore(s => s.initialize);
  const initVotes = useVoteStore(s => s.initialize);
  const initPosts = usePostStore(s => s.initialize);
  const initSocial = useSocialStore(s => s.initialize);

  useEffect(() => {
    initAuth();
    initVotes();
    initPosts();
    initSocial();
  }, [initAuth, initVotes, initPosts, initSocial]);

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/ai" element={<AiProfile />} />
            <Route path="/search" element={<Search />} />
            <Route path="/studio" element={<Studio />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/creator" element={<CreatorDashboard />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/u/:username" element={<UserProfile />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <ToastContainer />
    </BrowserRouter>
  );
}
