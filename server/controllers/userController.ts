import { Request, Response } from 'express';
import User from '../models/userModel';
import Notification from '../models/notificationModel';
import MentoringInfo from '../models/mentoringSessionModel';
import { hasDuplicates } from '../utils/userUtility';
import mongoose from 'mongoose';
import { getUserInfo } from '../utils/functions';

export const getUserInfoController = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const userInfo = await getUserInfo(userId);

  return res.json(userInfo);
};

export const getMentorsController = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const mentors = await User.find({ role: 'mentor' });

    console.log(mentors);

    const activeSessions = await MentoringInfo.find({
      'participants.menteeId': userId,
    });
    const activeMentors = activeSessions.map(
      (session) => session.participants.mentorId
    );

    const filteredMentors = mentors.filter((mentor) => {
      if (activeMentors.includes(mentor._id.toString())) {
        return false;
      }

      let mentorCanHelpWith = mentor.mentorCanHelpWith;

      console.log('mentorCanHelpWith: ', mentorCanHelpWith);

      const mentorAvailableDays = mentor.availableDays;
      const menteeAvailableDays = user.availableDays;

      // if (
      //   hasDuplicates(menteeNeedHelpWith, mentorCanHelpWith) &&
      //   hasDuplicates(mentorAvailableDays, menteeAvailableDays)
      // ) {
      //   return true;
      // }

      return false;
    });

    res.status(200).json(filteredMentors);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
