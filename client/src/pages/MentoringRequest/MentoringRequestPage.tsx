import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import {
  getMentoringRequest,
  setMentoringRequestStatus,
} from '../../apis/matchingAPIs';

import NavBar from '../../components/NavBar/NavBar';
import { RequestTitle, RequestWrapper } from './style';

const MentoringRequestPage: React.FC = () => {
  const { id: notificationId } = useParams() as any;

  const { data, isPending, error } = useQuery({
    queryKey: ['getMentoringRequest', notificationId],
    queryFn: () => getMentoringRequest(notificationId),
  });

  const navigate = useNavigate();

  const acceptRequestHandler = () => {
    setMentoringRequestStatus(notificationId, 'accepted');
    navigate('/dashboard');
  };

  const declineRequestHandler = () => {
    setMentoringRequestStatus(notificationId, 'declined');
    navigate('/dashboard');
  };

  let content: React.ReactNode = null;

  if (isPending) {
    content = <div>Loading...</div>;
  }

  if (error) {
    content = <div>Error: {error.message}</div>;
  }

  if (data) {
    const status = data.data.notification.status;
    if (status === 'pending') {
      content = (
        <div>
          <button onClick={acceptRequestHandler}>accept</button>
          <button onClick={declineRequestHandler}>decline</button>
        </div>
      );
    } else {
      content = <div>{data.data.menteeInfo.roleInfo.mentee.description}</div>;
    }
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
