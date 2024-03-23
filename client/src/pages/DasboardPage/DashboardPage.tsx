import React, { ReactNode, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

import NavBar from '../../components/NavBar/NavBar';
import {
  DashboardWrapper,
  DashboardTitle,
  DashboardContent,
  DashboardBrowser,
  DashboardMain,
  DashboardMainFirst,
  DashboardMainSecond,
  DashboardGoal,
  DashboardCalendar,
  DashboardEtc,
  MentoringThreadCard,
  MentoringThreadWrapper,
  MentoringThreadTitle,
} from './style';

import { useQuery } from '@tanstack/react-query';
import { getDashInfo } from '../../apis/matchingAPIs';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const handleChatButtonClick = () => {
    setIsChatOpen(!isChatOpen);
  };

  const { data, isPending, error } = useQuery<AxiosResponse>({
    queryKey: ['user'],
    queryFn: getDashInfo,
  });

  let content: ReactNode = null;

  if (isPending) {
    content = <div>Loading...</div>;
  }

  if (error) {
    content = <div>Error: {error.message}</div>;
  }

  if (data) {
    console.log(data);

    if (data.data.mentoringSessions.length === 0) {
      content = (
        <div>
          <p>
            There is no mentoring session to display on the dashboard. Would you
            like to start a new session?
          </p>
          <Link to='/match'>Start a new session</Link>
        </div>
      );
    }

    if (data.data.mentoringSessions.length > 0) {
      content = data.data.mentoringSessions.map((mentoring: any) => {
        return (
          <MentoringThreadCard key={mentoring._id}>
            {mentoring.startDate}
          </MentoringThreadCard>
        );
      });
    }
  }

  return (
    <>
      <NavBar />
      <DashboardWrapper>
        <DashboardTitle>Dashboard</DashboardTitle>
        <DashboardContent>
          <DashboardBrowser>
            <MentoringThreadTitle>Threads</MentoringThreadTitle>
            <MentoringThreadWrapper>{content}</MentoringThreadWrapper>
          </DashboardBrowser>
          <DashboardMain>
            <DashboardMainFirst>
              <DashboardGoal />
            </DashboardMainFirst>
            <DashboardMainSecond>
              <DashboardCalendar />
              <DashboardEtc />
            </DashboardMainSecond>
          </DashboardMain>
        </DashboardContent>
      </DashboardWrapper>
    </>
  );
};

export default DashboardPage;
