import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import GlobalStyles from './styles/GlobalStyles';

import DashboardPage from './pages/DasboardPage/DashboardPage';
import MatchingPage from './pages/MatchingPage/MatchingPage';
import MentoringRequestPage from './pages/MentoringRequest/MentoringRequestPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import MentorInfoPage from './pages/MentorInfoPage/MentorInfoPage';
import MessagesPage from './pages/MessagesPage/MessagesPage';
import EditProfilePage from './pages/EditProfilePage/EditProfilePage';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginLoadingPage from './pages/LoginLoadingPage/LoginLoadingPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';

interface ServerResponse {
  message: string;
}

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [message, setMessage] = useState<ServerResponse>({ message: '' });

  useEffect(() => {
    fetch('http://localhost:3001/api/test')
      .then((res) => res.json())
      .then((data) => setMessage(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <Router>
          <Routes>
            <Route
              path='/'
              element={<LandingPage />}
            />
            <Route
              path='/google/callback'
              element={<LoginLoadingPage />}
            />
            <Route
              path='/match'
              element={<MatchingPage />}
            />
            <Route
              path='/mentoring-request/:id'
              element={<MentoringRequestPage />}
            />
            <Route
              path='/profile'
              element={<ProfilePage />}
            />
            <Route
              path='/mentor-info'
              element={<MentorInfoPage />}
            />
            <Route
              path='/messages'
              element={<MessagesPage />}
            />
            <Route
              path='/edit'
              element={<EditProfilePage />}
            />
            <Route
              path='/signup'
              element={<SignUpPage />}
            />
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
};

export default App;
