import mongoose, { Document } from 'mongoose';

interface IChat extends Document {
  senderId: mongoose.Schema.Types.ObjectId;
  content: string;
  timestamp: string;
  readStatus: boolean;
};

const chatSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: String, required: true },
  readStatus: { type: Boolean, required: true },
});

const Chat = mongoose.model<IChat>('Chats', chatSchema);

export default Chat;