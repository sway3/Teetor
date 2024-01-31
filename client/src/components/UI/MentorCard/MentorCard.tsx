import React from 'react';

import { MentorCardWrapper } from './style';

interface MentorCardProps {
  children?: React.ReactNode;
}

const MentorCard: React.FC<MentorCardProps> = ({ children }) => {
  return <MentorCardWrapper to={`/mentor-info`}>{children}</MentorCardWrapper>;
};

export default MentorCard;
