import React from 'react';

import {
  UserInfoWrapper,
  ProfileImg,
  FullName,
  UserName,
  Email,
  Role,
} from './style';

interface UserInfoProps {
  user: {
    userName: string;
    fullName: string;
    email: string;
    role: string;
  };
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <UserInfoWrapper>
      <ProfileImg />
      <FullName>{user.fullName}</FullName>
      <UserName>{user.userName}</UserName>
      <Email>{user.email}</Email>
      <Role>{user.role}</Role>
    </UserInfoWrapper>
  );
};

export default UserInfo;
