import React from 'react';

import { GridWrapper, MatchingPageWrapper } from '../MatchingPage/style';
import MentorCard from '../../components/UI/MentorCard/MentorCard';

import { useLocation, useParams } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { Link } from 'react-router-dom';

const MatchResultPage: React.FC = () => {
  const location = useLocation();
  const mentors = location.state.mentors;
  const menteeInfo = location.state.menteeInfo;

  return (
    <>
      <NavBar />
      <MatchingPageWrapper>
        <GridWrapper>
          {mentors.map((mentor: any, index: number) => {
            return (
              <Link
                to={`/match-result/${index}`}
                key={mentor._id}
                state={{ mentor: mentors[index], menteeInfo: menteeInfo }}
              >
                <MentorCard>
                  <p>{mentor.userName}</p>
                </MentorCard>
              </Link>
            );
          })}
        </GridWrapper>
      </MatchingPageWrapper>
    </>
  );
};

export default MatchResultPage;
