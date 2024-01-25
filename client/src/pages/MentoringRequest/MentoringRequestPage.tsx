import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getMentoringRequest } from '../../apis/matchingAPIs';

import NavBar from '../../components/NavBar/NavBar';
import { RequestTitle, RequestWrapper } from './style';

const MentoringRequestPage: React.FC = () => {
  const { id: notificationId } = useParams() as any;

  const { data, isPending, error } = useQuery({
    queryKey: ['getMentoringRequest', notificationId],
    queryFn: () => getMentoringRequest(notificationId),
  });

  let content: React.ReactNode = null;

  if (isPending) {
    content = <div>Loading...</div>;
  }

  if (error) {
    content = <div>Error: {error.message}</div>;
  }

  if (data) {
    content = <div>{data.data.menteeInfo.roleInfo.mentee.description}</div>;
  }

  return (
    <>
      <NavBar />
      <RequestWrapper>
        <RequestTitle>Mentoring Request</RequestTitle>
        <div>{content}</div>
      </RequestWrapper>
    </>
  );
};

export default MentoringRequestPage;
