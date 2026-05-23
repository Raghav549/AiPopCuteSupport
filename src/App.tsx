import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { useVoteStore } from '@/stores/voteStore';
import { usePostStore } from '@/stores/postStore';
import { useSocialStore } from '@/stores/socialStore';
import AppLayout from '@/components/layout/AppLayout';
import { PostSkeleton } from '@/components/features/SkeletonLoader';
import ToastContainer from '@/components/features/ToastContainer';
import { CreatorRoute, ProtectedRoute } from '@/components/layout/RouteGuards';

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
const PlaceholderPage = lazy(() => import('@/pages/PlaceholderPage'));
const SettingsSection = lazy(() => import('@/pages/SettingsSection'));

function LoadingFallback() {
  return <div className="px-4 py-4 space-y-4"><PostSkeleton /></div>;
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
          <Route path="/forgot-password" element={<PlaceholderPage />} />
          <Route path="/reset-password" element={<PlaceholderPage />} />
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/ai" element={<AiProfile />} />
            <Route path="/ai/support" element={<AiProfile />} />
            <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
            <Route path="/studio" element={<ProtectedRoute><Studio /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
            <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
            <Route path="/messages/:conversationId" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
            <Route path="/groups/create" element={<ProtectedRoute><PlaceholderPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/profile/edit" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/settings/:section" element={<ProtectedRoute><SettingsSection /></ProtectedRoute>} />
            <Route path="/creator" element={<CreatorRoute><CreatorDashboard /></CreatorRoute>} />
            <Route path="/creator/:section" element={<CreatorRoute><PlaceholderPage /></CreatorRoute>} />
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
