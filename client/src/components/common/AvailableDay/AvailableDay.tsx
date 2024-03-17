import React from 'react';

import {
  AvailableDayContentWrapper,
  AvailableDayContent,
  Day,
  AvailableDayBox,
} from './style';

interface AvailableDayProps {
  availableDays: string[];
  isEditable: boolean;
}

const AvailableDay: React.FC<AvailableDayProps> = ({
  availableDays,
  isEditable,
}) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  if (isEditable) {
  }

  return (
    <AvailableDayContentWrapper>
      {days.map((day, index) => {
        return (
          <AvailableDayContent key={index}>
            <Day>{day}</Day>
            <AvailableDayBox
              key={index}
              $isavailable={availableDays.includes(day)}
            />
          </AvailableDayContent>
        );
      })}
    </AvailableDayContentWrapper>
  );
};

export default AvailableDay;
