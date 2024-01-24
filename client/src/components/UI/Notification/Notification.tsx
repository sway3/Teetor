import React, { useEffect } from 'react';

import { NotificationWrapper } from './style';
import useCloseNotification from '../../../hooks/useCloseNotification';

interface NotificationProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Notification: React.FC<NotificationProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  useCloseNotification(wrapperRef, onClose);

  return (
    <NotificationWrapper isOpen={isOpen} ref={wrapperRef}>
      {children}
    </NotificationWrapper>
  );
};

export default Notification;
