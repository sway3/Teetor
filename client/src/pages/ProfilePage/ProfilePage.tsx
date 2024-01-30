import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../apis/userAPIs';

import { DUMMY_USER_ID } from '../../config/config';

import NavBar from '../../components/NavBar/NavBar';
import {
  ProfilePageWrapper,
  ProfilePageContent,
  PageContentLeft,
  PageContentRight,
  PersonalInfoWrapper,
  UserName,
  ProfileImg,
  FullName,
  Email,
  SNSWrapper,
  SNSInfo,
  RoleInfo,
  RoleInfoTitle,
  RoleInfoWrapper,
  RoleInfoContent,
  RoleInfoContentTitle,
  SkillsWrapper,
  Skills,
  Description,
  AvailableDayWrapper,
  AvailableDayTitle,
  AvailableDayContentWrapper,
  AvailableDayContent,
  AvailableDay,
  AvailableDayBox,
  SNSTitle,
  SNSInfoWrapper,
} from './style';

const ProfilePage: React.FC = () => {
  const id: string = DUMMY_USER_ID;

  const { data, isPending, error } = useQuery({
    queryKey: ['getUser', id],
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
    content = (
      <ProfilePageContent>
        <PageContentLeft>
          <PersonalInfoWrapper>
            <ProfileImg />
            <FullName>{`${data?.data.user.firstName} ${data?.data.user.lastName}`}</FullName>
            <UserName>{`@${data?.data.user.userName}`}</UserName>
          </PersonalInfoWrapper>
          <RoleInfoWrapper>
            <RoleInfoContentTitle>I can help you with...</RoleInfoContentTitle>
            <SkillsWrapper>
              <Skills>Java</Skills>
              <Skills>Object-Oriented Programming</Skills>
              <Skills>MySQL</Skills>
            </SkillsWrapper>
            <Description>
              I can help you with Java, Object-Oriented Programming, and MySQL.
            </Description>
          </RoleInfoWrapper>
          <RoleInfoWrapper>
            <RoleInfoContentTitle>I need help with...</RoleInfoContentTitle>
            <SkillsWrapper>
              <Skills>Java</Skills>
              <Skills>Object-Oriented Programming</Skills>
              <Skills>MySQL</Skills>
            </SkillsWrapper>
            <Description>
              I can help you with Java, Object-Oriented Programming, and MySQL.
            </Description>
          </RoleInfoWrapper>
        </PageContentLeft>
        <PageContentRight>
          <SNSWrapper>
            <SNSTitle>Links</SNSTitle>
            <SNSInfoWrapper>
              <SNSInfo />
              <SNSInfo />
              <SNSInfo />
            </SNSInfoWrapper>
          </SNSWrapper>
          <AvailableDayWrapper>
            <AvailableDayTitle>Available Days</AvailableDayTitle>
            <AvailableDayContentWrapper>
              <AvailableDayContent>
                <AvailableDay>Mon</AvailableDay>
                <AvailableDayBox />
              </AvailableDayContent>
              <AvailableDayContent>
                <AvailableDay>Tue</AvailableDay>
                <AvailableDayBox />
              </AvailableDayContent>
              <AvailableDayContent>
                <AvailableDay>Wed</AvailableDay>
                <AvailableDayBox />
              </AvailableDayContent>
              <AvailableDayContent>
                <AvailableDay>Thu</AvailableDay>
                <AvailableDayBox />
              </AvailableDayContent>
              <AvailableDayContent>
                <AvailableDay>Fri</AvailableDay>
                <AvailableDayBox />
              </AvailableDayContent>
              <AvailableDayContent>
                <AvailableDay>Sat</AvailableDay>
                <AvailableDayBox />
              </AvailableDayContent>
              <AvailableDayContent>
                <AvailableDay>Sun</AvailableDay>
                <AvailableDayBox />
              </AvailableDayContent>
            </AvailableDayContentWrapper>
          </AvailableDayWrapper>
        </PageContentRight>
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
