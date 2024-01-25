import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { getNotifications } from '../../../apis/notificationAPIs';

import { NotificationWrapper } from './style';
import useCloseNotification from '../../../hooks/useCloseNotification';
import { Link } from 'react-router-dom';

interface NotificationProps {
  isOpen: boolean;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ isOpen, onClose }) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  useCloseNotification(wrapperRef, onClose);

  const userID = localStorage.getItem('userID') || '';

  const { data, isPending, error } = useQuery({
    queryKey: ['getNotifications'],
    queryFn: () => getNotifications(userID),
    enabled: isOpen,
  });

  let content: React.ReactNode = null;

  if (isPending) {
    content = <div>Loading...</div>;
  }

  if (error) {
    content = <div>Error: {error.message}</div>;
  }

  if (data) {
    const notifications = data.data;
    content = notifications.map((notif: any) => {
      return (
        <div key={notif._id}>
          <Link to={`/mentoring-request/${notif._id}`}>{notif.message}</Link>
        </div>
      );
    });
  }

  return (
    <NotificationWrapper ref={wrapperRef} className={isOpen ? 'open' : ''}>
      <div>Notification</div>
      <div>{content}</div>
    </NotificationWrapper>
  );
};

export default Notification;
