import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import GlobalStyles from './styles/GlobalStyles';

import DashboardPage from './pages/DasboardPage/DashboardPage';
import MatchingPage from './pages/MatchingPage/MatchingPage';
import MentoringRequestPage from './pages/MentoringRequest/MentoringRequestPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import MentorInfoPage from './pages/MentorInfoPage/MentorInfoPage';

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
            <Route path='/' element={<h1>Home Page</h1>} />
            <Route path='/dashboard' element={<DashboardPage />} />
            <Route path='/match' element={<MatchingPage />} />
            <Route
              path='/mentoring-request/:id'
              element={<MentoringRequestPage />}
            />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/mentor-info' element={<MentorInfoPage />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
};

export default App;
