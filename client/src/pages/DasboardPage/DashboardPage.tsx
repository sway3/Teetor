import React from 'react';
import styled from 'styled-components';
import axios, { AxiosResponse } from 'axios';

import NavBar from '../../components/NavBar/NavBar';
import { DashboardWrapper, DashboardTitle, DashboardContent } from './style';

import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../apis/matchingAPIs';

const userID = '65ae47e985aee463b6aa49f0';

const DashboardPage: React.FC = () => {
  const id = userID;

  const { data, isLoading, error } = useQuery<AxiosResponse>({
    queryKey: ['user', id],
    queryFn: () => getUser(id),
  });

  console.log(data);

  return (
    <>
      <NavBar />
      <DashboardWrapper>
        <DashboardTitle>Dashboard</DashboardTitle>
        <DashboardContent></DashboardContent>
      </DashboardWrapper>
    </>
  );
};

export default DashboardPage;
