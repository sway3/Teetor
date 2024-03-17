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
    queryKey: ['getUserInfo', id],
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
