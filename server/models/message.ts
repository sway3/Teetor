import mongoose, { Document } from 'mongoose';

interface Imessage extends Document {
  recipientId: string;
  senderId: string;
  message: string;
  timestamp: string;
}

const messageSchema = new mongoose.Schema({
  recipientId: { type: String, required: true },
  senderId: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: String, required: true },
});

const Message = mongoose.model<Imessage>('mentorshipChat', messageSchema, 'mentorshipChat');

export default Message;