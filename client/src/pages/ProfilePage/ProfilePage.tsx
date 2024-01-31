import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../apis/userAPIs';

import { DUMMY_USER_ID } from '../../config/config';

import NavBar from '../../components/NavBar/NavBar';
import {
  ProfilePageWrapper,
  ProfilePageContent,
  PersonalInfoWrapper,
  SNSInfo,
  AvailableDayContentWrapper,
  SNSInfoWrapper,
} from './style';

import AvailableDay from '../../components/common/AvailableDay/AvailableDay';
import UserInfo from '../../components/common/UserInfo/UserInfo';
import RoleInfo from '../../components/common/RoleInfo/RoleInfo';

const ProfilePage: React.FC = () => {
  const id: string = DUMMY_USER_ID;

  const { data, isPending, error } = useQuery({
    queryKey: ['getUser', id],
    queryFn: () => getUser(id),
  });

  let content: React.ReactNode = null;

  if (isPending) {
    content = <div>Loading...</div>;
  }

  if (error) {
    content = <div>Error: {error.message}</div>;
  }

  if (data) {
    const userInfo = {
      userName: data?.data.user.userName,
      fullName: `${data?.data.user.firstName} ${data?.data.user.lastName}`,
      email: data?.data.user.email,
      role: data?.data.user.role,
    };

    // const roleInfo = {
    //   role: data?.data.user.roleInfo.role,
    //   discipline: data?.data.user.roleInfo.discipline,
    //   skills: data?.data.user.roleInfo.skills,
    //   description: data?.data.user.roleInfo.description,
    // };

    const roleInfo = data?.data.user.roleInfo;
    const availableDays = data?.data.user.availableDays;

    content = (
      <ProfilePageContent>
        <PersonalInfoWrapper>
          <UserInfo user={userInfo} />
          <SNSInfoWrapper>
            <SNSInfo />
            <SNSInfo />
            <SNSInfo />
          </SNSInfoWrapper>
          <AvailableDayContentWrapper>
            <AvailableDay availableDays={availableDays} />
          </AvailableDayContentWrapper>
        </PersonalInfoWrapper>
        {roleInfo.map((role: any, i: number) => (
          <RoleInfo key={i} roleInfo={role} />
        ))}
      </ProfilePageContent>
    );
  }

  return (
    <>
      <NavBar />
      <ProfilePageWrapper>{content}</ProfilePageWrapper>
    </>
  );
};

export default ProfilePage;
