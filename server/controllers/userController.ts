import {Request, Response} from 'express';
import User from '../models/userModel';

export const getUserController = async (req: Request, res: Response) => {
  const userId = req.params.id;

  console.log('userId: ', userId)

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}