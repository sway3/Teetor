import { Request, Response } from 'express';
import {
  getUserInfo,
  getNotification,
  getMentoringSessions,
} from '../utils/functions';

export const getDashInfoController = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const [userInfo, notification, mentoringSessions] = await Promise.all([
      getUserInfo(userId),
      getNotification(userId),
      getMentoringSessions(userId),
    ]);

    res.json({ userInfo, notification, mentoringSessions });
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .send(
        'Error occurred when fetching dashboard information from the database'
      );
  }
};
