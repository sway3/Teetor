import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { getUser, userLogout } from '../../apis/userAPIs';

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
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ['getUserInfo'],
    queryFn: getUser,
  });

  const navigate = useNavigate();

  const logoutHandler = async () => {
    const response = await userLogout();
    if (response.status === 200) {
      navigate('/');
    }
  };

  let content: React.ReactNode = null;

  if (isPending) {
    content = <div>Loading...</div>;
  }

  if (error) {
    content = <div>Error: {error.message}</div>;
  }

  if (data) {
    const userInfo = {
      userName: data?.data.userName,
      fullName: `${data?.data.firstName} ${data?.data.lastName}`,
      email: data?.data.email,
      role: data?.data.role,
    };

    const availableDays = data?.data.availableDays;

    let roleInfo: any = null;

    if (userInfo.role !== 'mentee') {
      roleInfo = {
        profession: data?.data.mentorProfession,
        canHelpWith: data?.data.mentorCanHelpWith,
        description: data?.data.mentorDescription,
      };
    }

    content = (
      <ProfilePageContent>
        <PersonalInfoWrapper>
          <UserInfo user={userInfo} />
          <button onClick={logoutHandler}>logout</button>
          <SNSInfoWrapper>
            <SNSInfo />
            <SNSInfo />
            <SNSInfo />
          </SNSInfoWrapper>
          <AvailableDayContentWrapper>
            <AvailableDay availableDays={availableDays} />
          </AvailableDayContentWrapper>
        </PersonalInfoWrapper>
        {data?.data.role !== 'mentee' && <RoleInfo roleInfo={roleInfo} />}
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
