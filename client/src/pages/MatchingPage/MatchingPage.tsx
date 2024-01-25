import React from 'react';

// react-query
import { useQuery } from '@tanstack/react-query';

// apis
import { getMentors, sendMentoringRequest } from '../../apis/matchingAPIs';

// components
import NavBar from '../../components/NavBar/NavBar';
import MentorCard from '../../components/UI/MentorCard/MentorCard';
import { MatchingPageWrapper, GridWrapper } from './style';

import { DUMMY_USER_ID } from '../../config/config';

const userID = DUMMY_USER_ID;

const MatchingPage: React.FC = () => {
  const id: string = userID;

  const { data, isPending, error } = useQuery({
    queryKey: ['getMentors', id],
    queryFn: () => getMentors(id),
  });

  let content: React.ReactNode = null;

  if (isPending) {
    content = <div>Loading...</div>;
  }

  if (error) {
    content = <div>Error: {error.message}</div>;
  }

  if (data) {
    const mentors = data.data;
    content = mentors.map((mentor: any) => {
      return (
        <MentorCard key={mentor._id}>
          <p>{mentor.userName}</p>
          <button onClick={() => sendMentoringRequest(userID, mentor._id)}>
            Mentoring request
          </button>
        </MentorCard>
      );
    });
  }

  return (
    <>
      <NavBar />
      <MatchingPageWrapper>
        <GridWrapper>{content}</GridWrapper>
      </MatchingPageWrapper>
    </>
  );
};

export default MatchingPage;
