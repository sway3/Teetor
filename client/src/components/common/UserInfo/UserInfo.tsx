import React from 'react';

import {
  UserInfoWrapper,
  ProfileImg,
  FullName,
  UserName,
  Email,
  Role,
  EditButton,
} from './style';

interface UserInfoProps {
  user: {
    userName: string;
    fullName: string;
    email: string;
  };
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <UserInfoWrapper>
      <ProfileImg />
      <FullName>{user.fullName}</FullName>
      <UserName>{user.userName}</UserName>
      <Email>{user.email}</Email>
      <EditButton to='/edit'>Edit Profile</EditButton>
    </UserInfoWrapper>
  );
};

export default UserInfo;
