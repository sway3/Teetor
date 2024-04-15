import { Request, Response } from 'express';

import User from '../models/userModel';
import Notification from '../models/notificationModel';
import MentoringInfo from '../models/mentoringSessionModel';

import { getUserId } from '../utils/authFunctions';

export const getMentoringInfoController = async (
  req: Request,
  res: Response
) => {
  const userId = req.params.id;

  try {
    const mentoringInfo = await MentoringInfo.find({
      participants: { menteeId: userId },
    });
    res.status(200).json(mentoringInfo);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const mentoringRequestController = async (
  req: Request,
  res: Response
) => {
  const { mentorId, menteeInfo } = req.body;
  const accessToken = req.cookies.accessToken;
  const menteeId = getUserId(accessToken);
  const mentor = await User.findById(mentorId);

  console.log(menteeInfo);

  try {
    const notification = new Notification({
      recipientId: mentorId,
      senderId: menteeId,
      type: 'mentoring-request',
      status: 'pending',
      message: 'You have a new mentoring request',
      content: {
        mentorCanHelpWith: mentor?.mentorCanHelpWith,
        mentorDescription: mentor?.mentorDescription,
        menteeNeedHelpWith: menteeInfo.needHelpWith,
        menteeDescription: menteeInfo.description,
      },
      timestamp: new Date().toISOString(),
    });

    const savedNotification = await notification.save();
    res.status(201).json(savedNotification);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
