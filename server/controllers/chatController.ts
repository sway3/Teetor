// controllers/chatController.ts
import Message from '../models/message';

// TypeScript interface for message data
interface IMessageData {
  recipientId: string;
  senderId: string;
  message: string;
  timestamp: string;
}

export const saveMessage = async (data: IMessageData): Promise<void> => {
  try {
    await Message.create(data);
  } catch (error) {
    console.error('Error saving message:', error);
    throw new Error('Error saving message');
  }
};

export const loadMessages = async (recipientId: string, senderId: string): Promise<IMessageData[]> => {
  try {
    const messages = await Message.find({
      $or: [
        { recipientId, senderId },
        { recipientId: senderId, senderId: recipientId }
      ]
    }).sort('timestamp');
    return messages;
  } catch (error) {
    console.error('Error loading messages:', error);
    throw new Error('Error loading messages');
  }
};
