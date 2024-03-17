import React from 'react';

import NavBar from '../../components/NavBar/NavBar';
import { DUMMY_USER_ID } from '../../config/config';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../apis/userAPIs';
import UserInfoForm from '../../components/common/UserInfoForm/UserInfoForm';

const EditProfilePage: React.FC = () => {
  const id = DUMMY_USER_ID;

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
    content = <UserInfoForm userInfo={data?.data} />;
  }

  return (
    <>
      <NavBar />
      {content}
    </>
  );
};

export default EditProfilePage;
