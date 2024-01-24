import { Request, Response } from 'express';

import Notification from '../models/notificationModel';

export const getNotificationsController = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const notifications = await Notification.find({ recipientId: userId });
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