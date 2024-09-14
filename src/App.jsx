import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import FeedPage from './pages/FeedPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import UserProfilePage from './pages/UserProfilePage.jsx';
import FollowingPage from './pages/FollowingPage.jsx';
import FollowersPage from './pages/FollowersPage.jsx';
import UserFollowingPage from './pages/UserFollowingPage.jsx';
import UserFollowersPage from './pages/UserFollowersPage.jsx';
import ProfileSettingsPage from './pages/ProfileSettingsPage.jsx';
import PasswordSettingsPage from './pages/PasswordSettingsPage.jsx';
import EmailSettingsPage from './pages/EmailSettingsPage.jsx';
import Home from '@/pages/Home.jsx';


const App  = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/:id" element={<UserProfilePage />} />
        <Route path="/following" element={<FollowingPage />} />
        <Route path="/followers" element={<FollowersPage />} />
        <Route path="/profile/:id/following" element={<UserFollowingPage />} />
        <Route path="/profile/:id/followers" element={<UserFollowersPage />} />
        <Route path="/settings/profile" element={<ProfileSettingsPage />} />
        <Route path="/settings/password" element={<PasswordSettingsPage />} />
        <Route path="/settings/email" element={<EmailSettingsPage />} />
    </Routes>
  )
}

export default App