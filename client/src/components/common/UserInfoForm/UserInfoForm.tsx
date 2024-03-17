import React, { useEffect, useState } from 'react';
import {
  Form,
  FormContainer,
  Label,
  Input,
  NameWrapper,
  RoleWrapper,
  RoleButton,
  MentorInfoWrapper,
  Title,
  LinksWrapper,
  Links,
  SelectLink,
  SubTitle,
  CardWrapper,
  Card,
} from './style';
import AvailableDay from '../AvailableDay/AvailableDay';
import Toggle from '../../UI/Toggle/Toggle';

interface UserInfoFormProps {
  userInfo: any;
}

interface UserData {
  firstName?: string;
  lastName?: string;
  userName?: string;
  email?: string;
  birthday?: string;
  description?: string;
  role?: string;
  availableDays?: string[];
  mentorProfession?: string[];
  mentorCanHelpWith?: string[];
  mentorDescription?: string[];
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({ userInfo }) => {
  const [userData, setUserData] = useState<UserData>({});
  const [activeRoles, setActiveRoles] = useState<string[]>([]);

  useEffect(() => {
    setUserData(userInfo);
  }, []);

  const roleButtonHandler = (role: string): void => {
    setActiveRoles((prevActive) => {
      return prevActive.includes(role)
        ? prevActive.filter((target) => target !== role) // Remove option if it exists
        : [...prevActive, role]; // Add option if it doesn't exist
    });
  };

  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const formChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {};

  return (
    <FormContainer>
      <Form onSubmit={formSubmitHandler}>
        <div>
          <NameWrapper>
            <div>
              <Label>First name</Label>
              <Input
                type='text'
                value={userData.firstName}
                width='14rem'
                margin='0 1rem 1.5rem 0'
              />
            </div>
            <div>
              <Label>Last name</Label>
              <Input
                type='text'
                value={userData.lastName}
                width='14rem'
              />
            </div>
          </NameWrapper>
          <Label>Username</Label>
          <Input
            type='text'
            value={userData.userName}
          />
          <Label>Email</Label>
          <Input
            type='text'
            value={userData.email}
          />
          <Label>Birthday</Label>
          <Input
            type='text'
            value={userData.birthday}
          />
          <Label>Description</Label>
          <Input
            type='text'
            value={userData.description}
          />
        </div>
        <LinksWrapper>
          <Links>
            <SelectLink defaultValue={'default'}>
              <option
                value='default'
                disabled
              >
                Select
              </option>
              <option value='linkedin'>Linked In</option>
              <option value='github'>Github</option>
              <option value='blog'>Blog</option>
              <option value='portfolio'>Portfolio</option>
            </SelectLink>
            <Input
              type='text'
              width='20rem'
              margin='0'
            />
          </Links>
        </LinksWrapper>
        <AvailableDay availableDays={userData.availableDays || []} />
        <RoleWrapper>
          <RoleButton
            $isActive={activeRoles.includes('Mentor')}
            onClick={() => roleButtonHandler('Mentor')}
          >
            Mentor
          </RoleButton>
          <RoleButton
            $isActive={activeRoles.includes('Mentee')}
            onClick={() => roleButtonHandler('Mentee')}
          >
            Mentee
          </RoleButton>
        </RoleWrapper>
        <MentorInfoWrapper $isActive={activeRoles.includes('Mentor')}>
          <Title>Mentor Profile</Title>
          <SubTitle>Profession</SubTitle>
          <CardWrapper>
            <Card>Web Development</Card>
          </CardWrapper>
          <SubTitle>I can help you with...</SubTitle>
          <CardWrapper>
            <Card>React</Card>
          </CardWrapper>
        </MentorInfoWrapper>
      </Form>
    </FormContainer>
  );
};

export default UserInfoForm;
