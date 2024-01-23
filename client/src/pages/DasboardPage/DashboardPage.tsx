import React, { ReactNode } from 'react';
import styled from 'styled-components';
import axios, { AxiosResponse } from 'axios';

import NavBar from '../../components/NavBar/NavBar';
import { DashboardWrapper, DashboardTitle, DashboardContent } from './style';

import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../apis/matchingAPIs';
import { Link } from 'react-router-dom';

const userID: string = '65ad934a85aee463b6aa49df';

const DashboardPage: React.FC = () => {
  const id: string = userID;

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

    if (data.data.mentoringArchive.length === 0) {
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
  }

  return (
    <>
      <NavBar />
      <DashboardWrapper>
        <DashboardTitle>Dashboard</DashboardTitle>
        <DashboardContent>{content}</DashboardContent>
      </DashboardWrapper>
    </>
  );
};

export default DashboardPage;