import React from 'react';

import {
  RoleInfoWrapper,
  RoleInfoTitle,
  RoleInfoContent,
  RoleInfoContentTitle,
  SkillsWrapper,
  Skills,
  Description,
} from '../../../pages/ProfilePage/style';

interface RoleInfoProps {
  roleInfo: {
    role: string;
    discipline: string;
    skills: string[];
    description: string;
  };
}

const RoleInfo: React.FC<RoleInfoProps> = ({ roleInfo }) => {
  let title: string = '';

  if (roleInfo.role === 'mentor') {
    title = 'I can help with...';
  } else if (roleInfo.role === 'mentee') {
    title = 'I need help with...';
  }

  return (
    <RoleInfoWrapper>
      <RoleInfoTitle>{title}</RoleInfoTitle>
      <SkillsWrapper>
        {roleInfo.skills.map((skill, index) => {
          return <Skills key={index}>{skill}</Skills>;
        })}
      </SkillsWrapper>
      <Description>{roleInfo.description}</Description>
    </RoleInfoWrapper>
  );
};

export default RoleInfo;
