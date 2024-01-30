import {Request, Response} from 'express';
import User from '../models/userModel';
import Notification from '../models/notificationModel';
import MentoringInfo from '../models/mentoringInfo';
import { hasDuplicates } from '../utils/userUtility';

export const getUserController = async (req: Request, res: Response) => {
  const userId = req.params.id;

  console.log('userId: ', userId)

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // find notification of this user
    const notifications = await Notification.find({ recipientId: userId });

    let mentoringInfo: any = [];
    if (user.role === 'mentor') {
      mentoringInfo = await MentoringInfo.find({ "participants.mentorId": userId });
    } else if (user.role === 'mentee') {
      mentoringInfo = await MentoringInfo.find({ "participants.menteeId": userId });
    } else {
      mentoringInfo = await MentoringInfo.find({ "participants.mentorId": userId });
      const mentoringInfoAsMentee = await MentoringInfo.find({ "participants.menteeId": userId });
      mentoringInfo = [...mentoringInfo, ...mentoringInfoAsMentee];
    }

    res.status(200).json({ user, notifications, mentoringInfo });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export const getMentorsController = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const mentors = await User.find({ role: 'mentor' });

    const menteeDiscipline = user.roleInfo?.mentee.discipline;
    const menteeNeedHelpWith = user.roleInfo?.mentee.needHelpWith || [];

    const activeSessions = await MentoringInfo.find({ 'participants.menteeId': userId });
    const activeMentors = activeSessions.map((session) => session.participants.mentorId);

    console.log('menteeDiscipline: ', menteeDiscipline);
    console.log('menteeNeedHelpWith: ', menteeNeedHelpWith);

    const filteredMentors = mentors.filter((mentor) => {
      if (activeMentors.includes(mentor._id.toString())) {
        return false;
      }

      const mentorProfession = mentor?.roleInfo?.mentor.profession || '';
      const mentorCanHelpWith = mentor?.roleInfo?.mentor.canHelpWith || [];

      console.log('mentorProfession: ', mentorProfession);
      console.log('mentorCanHelpWith: ', mentorCanHelpWith);

      if (mentorProfession === menteeDiscipline) {
        if (hasDuplicates(menteeNeedHelpWith, mentorCanHelpWith)) {
          return true;
        }
      }
      return false;
    });

    res.status(200).json(filteredMentors);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}