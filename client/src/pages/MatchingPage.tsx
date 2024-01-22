import React from 'react';

const DUMMY_MENTEE = {
  _id: {
    $oid: '65a5a6f35aea25931efe1918',
  },
  userName: 'sway3',
  firstName: 'Seungwoo',
  middleName: null,
  lastName: 'Kim',
  role: 'mentee',
  birthday: '2001-01-01',
  profileImg: 'image.jpg',
  description: 'Hello I am Seungwoo Kim, ...',
  qualification: {
    university: 'University of ...',
  },
  links: {
    Github: 'github link',
    LinkedIn: 'linkedin link',
  },
  discipline: 'Web Development',
  needHelpWith: ['React', 'Python', 'Java'],
  email: 'abc@email.com',
};

const MatchingPage: React.FC = () => {
  return (
    <>
      <h1>Matching Page</h1>
    </>
  );
};

export default MatchingPage;
