import mongoose from 'mongoose';

interface IMentoringInfo extends mongoose.Document {
  participants: {
    mentorId: string;
    menteeId: string;
  },
  startDate: string;
  endDate: string;
  status: string;
}

const mentoringInfoSchema = new mongoose.Schema({
  participants: {
    mentorId: { type: String, required: true },
    menteeId: { type: String, required: true },
  },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  status: { type: String, required: true },
});

const MentoringInfo = mongoose.model<IMentoringInfo>(
  'mentoringInfo', mentoringInfoSchema, 'mentoringInfo'
);

export default MentoringInfo;
