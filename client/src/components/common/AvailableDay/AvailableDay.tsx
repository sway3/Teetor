import React from 'react';

import {
  AvailableDayContentWrapper,
  AvailableDayContent,
  Day,
  AvailableDayBox,
} from './style';

interface AvailableDayProps {
  availableDays: string[];
}

const AvailableDay: React.FC<AvailableDayProps> = ({ availableDays }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <AvailableDayContentWrapper>
      {days.map((day, index) => {
        return (
          <AvailableDayContent key={index}>
            <Day>{day}</Day>
            <AvailableDayBox $isavailable={availableDays.includes(day)} />
          </AvailableDayContent>
        );
      })}
    </AvailableDayContentWrapper>
  );
};

export default AvailableDay;
