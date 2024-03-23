import { Request, Response } from 'express';
import User from '../models/userModel';
import Notification from '../models/notificationModel';
import MentoringInfo from '../models/mentoringSessionModel';
import { hasDuplicates } from '../utils/userUtility';
import mongoose from 'mongoose';
import { getUserInfo } from '../utils/functions';
import {
  generateAccessToken,
  generateRefreshToken,
  getUserId,
} from '../utils/authFunctions';
import RefreshToken from '../models/refreshTokenModel';

export const getUserInfoController = async (req: Request, res: Response) => {
  const accessToken = req.cookies.accessToken;
  console.log(accessToken);
  const userId = getUserId(accessToken);
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

const saveNewRefreshToken = async (id: string, token: string) => {
  try {
    const newRefreshToken = new RefreshToken({
      userId: id,
      token: token,
      expiresAt: Math.floor(Date.now()) + 30 * 24 * 60 * 1000,
      createdAt: Date.now(),
    });

    const savedToken = await newRefreshToken.save();
  } catch (error) {
    throw new Error(`error: ${error}`);
  }
};

export const userSignUpController = async (req: Request, res: Response) => {
  const userInfo = req.body;

  try {
    const newUser = await User.create(userInfo);

    const accessToken = generateAccessToken(newUser.id);
    const refreshToken = generateRefreshToken(newUser.id);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 30 * 24 * 60 * 1000,
    });

    if (refreshToken) await saveNewRefreshToken(newUser.id, refreshToken);

    res.status(200).json({ status: 'signup successful' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

export const userLogoutController = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  try {
    const removeToken = await RefreshToken.findOneAndDelete({
      token: refreshToken,
    });
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.status(200).json({ status: 'logout successful' });
  } catch (error) {
    console.log(error);
    res.status(500).send('internal server error');
  }
};
