import mongoose, { Document } from 'mongoose';

interface Imessage extends Document {
  recipientId: mongoose.Schema.Types.ObjectId;
  senderId: mongoose.Schema.Types.ObjectId;
  content: string;
  timestamp: string;
  readStatus: boolean;
}

const messageSchema = new mongoose.Schema({
  recipientId: { type: String, required: true},
  senderId: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: String, required: true },
  readStatus: { type: Boolean, required: true },
});

const Message = mongoose.model<Imessage>('Messages', messageSchema);

export default Message;