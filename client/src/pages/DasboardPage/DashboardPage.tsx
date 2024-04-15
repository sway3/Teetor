import React, { ReactNode, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import dayjs from 'dayjs';

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
import { DateCalendar } from '@mui/x-date-pickers';
import useAuth from '../../hooks/useAuth';

const DashboardPage: React.FC = () => {
  const isAuthed = useAuth();
  const [activeThread, setActiveThread] = useState<any>(null);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const handleChatButtonClick = () => {
    setIsChatOpen(!isChatOpen);
  };

  const threadClickHandler = (thread: any) => {
    setActiveThread(thread);
  };

  const { data, isPending, error, refetch } = useQuery<AxiosResponse>({
    queryKey: ['user'],
    queryFn: getDashInfo,
    enabled: true,
  });

  useEffect(() => {
    if (data) {
      const mentoringSessions = data?.data.mentoringSessions;
      if (mentoringSessions.length > 0 && !activeThread) {
        setActiveThread(mentoringSessions[0]);
      }
    }
  }, [data, activeThread]);

  let content: ReactNode = null;

  if (isPending) {
    content = <div>Loading...</div>;
  }

  if (error) {
    location.reload();
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
        const isActive = mentoring._id === activeThread?._id;
        return (
          <MentoringThreadCard
            key={mentoring._id}
            $isActive={isActive}
            onClick={() => threadClickHandler(mentoring)}
          >
            {mentoring.title}
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
              <DashboardGoal>
                <DateCalendar defaultValue={dayjs('2022-04-17')} />
              </DashboardGoal>
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
