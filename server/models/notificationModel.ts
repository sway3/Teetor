import mongoose from 'mongoose';

interface INotification extends mongoose.Document {
  recipientId: string;
  senderId: string;
  type: string;
  status: string;
  message: string;
  timestamp: string;
}

const notificationSchema = new mongoose.Schema({
  recipientId: { type: String, required: true },
  senderId: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: String, required: true },
});

const Notification = mongoose.model<INotification>(
  'notification', notificationSchema, 'notification'
);

export default Notification;