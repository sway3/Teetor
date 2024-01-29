import React, { ReactNode } from 'react';
import styled from 'styled-components';
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
import { getUser } from '../../apis/matchingAPIs';
import { Link } from 'react-router-dom';

import { DUMMY_USER_ID } from '../../config/config';

const userID = DUMMY_USER_ID;

const DashboardPage: React.FC = () => {
  const id: string = userID;

  localStorage.setItem('userID', id);

  const { data, isPending, error } = useQuery<AxiosResponse>({
    queryKey: ['user', id],
    queryFn: () => getUser(id),
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

    if (data.data.mentoringInfo.length === 0) {
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

    if (data.data.mentoringInfo.length > 0) {
      content = data.data.mentoringInfo.map((mentoring: any) => {
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
