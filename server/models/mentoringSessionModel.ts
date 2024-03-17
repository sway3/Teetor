import mongoose from 'mongoose';

interface ICalendar extends mongoose.Document {
  date: string;
  title: string;
  description: string;
}

const calendarSchema = new mongoose.Schema({
  date: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

export interface IMentoringSession extends mongoose.Document {
  participants: {
    mentorId: mongoose.Schema.Types.ObjectId;
    menteeId: mongoose.Schema.Types.ObjectId;
  };
  startDate: string;
  endDate: string;
  status: string;
  calendar: ICalendar[];
}

const mentoringSessionSchema = new mongoose.Schema({
  participants: {
    mentorId: { type: String, required: true },
    menteeId: { type: String, required: true },
  },
  startDate: { type: String, required: true },
  endDate: { type: String, required: false },
  status: { type: String, required: true },
  calendar: { type: [calendarSchema], required: false },
});

const MentoringSession = mongoose.model<IMentoringSession>(
  'mentoringSessions',
  mentoringSessionSchema,
  'mentoringSessions'
);

export default MentoringSession;
