import { Request, Response } from 'express';

import Notification from '../models/notificationModel';
import MentoringInfo from '../models/mentoringSessionModel';
import User from '../models/userModel';

export const getNotificationsController = async (req: Request, res: Response) => {
  const userId = req.params.id;
  console.log('userId: ', userId)

  try {
    const notifications = await Notification.find({ 'recipientId': userId });
    res.status(200).json(notifications);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const mentoringRequestController = async (req: Request, res: Response) => {
  const { mentorId, menteeId } = req.body;

  try {
    const notification = new Notification({
      recipientId: mentorId,
      senderId: menteeId,
      type: 'mentoring-request',
      status: 'pending',
      message: 'You have a new mentoring request',
      timestamp: new Date().toISOString()
    })

    const savedNotification = await notification.save();
    res.status(201).json(savedNotification);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMentoringRequestController = async (req: Request, res: Response) => {
  const notificationRequestId = req.params.id;

  try {
    const notification = await Notification.findById(notificationRequestId);

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    const menteeInfo = await User.findById(notification.senderId);

    return res.status(200).json({ notification, menteeInfo });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export const controlMentoringRequestController = async (req: Request, res: Response) => {
  const notificationId = req.params.id;
  const { status } = req.body;
  
  try {
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    if (status === 'accepted') {
      const mentoringSession = new MentoringInfo({
        participants: {
          mentorId: notification.recipientId,
          menteeId: notification.senderId
        },
        status: 'inProgress',
        startDate: new Date().toISOString(),
        endDate: null
      });

      const savedMentoringSession = await mentoringSession.save();

      const resultNotification = new Notification({
        recipientId: notification.senderId,
        senderId: notification.recipientId,
        type: 'mentoring-request-result',
        status: 'accepted',
        message: `Your mentoring request to ${notification.recipientId} has been accepted. Start off your session by chatting to your mentor!`,
        timestamp: new Date().toISOString()
      });

      const savedResultNotification = await resultNotification.save();
    }

    return res.status(200).json(notification);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}