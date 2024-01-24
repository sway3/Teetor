import { Request, Response } from 'express';
import User from '../models/userModel';
import MentoringInfo from '../models/mentoringInfo';

export const getMentoringInfoController = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const mentoringInfo = await MentoringInfo.find({ participants: { menteeId: userId } })
    res.status(200).json(mentoringInfo);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}