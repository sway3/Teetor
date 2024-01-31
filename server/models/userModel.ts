import mongoose, { Document } from 'mongoose';

interface IUser extends Document {
  userName: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  role: 'mentee' | 'mentor'; // Assuming role can be 'mentee' or 'mentor'
  birthday: string; // Or Date if you prefer to work with Date objects
  profileImg: string;
  description: string;
  email: string;
  roleInfo: {
    discipline: string;
    role: string;
    skills: string[];
    description: string;
  }[];
  qualification: {
    university: string;
  };
  links: {
    Github: string;
    LinkedIn: string;
  };
  connections: string[]; // Array of user IDs or user objects, depending on your design
  mentoringArchive: string[]; // Replace 'any' with a more specific type if possible
  availableDays: string[];
}

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  role: { type: String, required: true },
  birthday: { type: String, required: true },
  profileImg: { type: String, required: true },
  description: { type: String, required: true },
  email: { type: String, required: true },
  roleInfo: [{
    discipline: { type: String, required: true },
    role: { type: String, required: true },
    skills: [{ type: String, required: true }],
    description: { type: String, required: true },
  }],
  qualification: {
    university: { type: String, required: true },
  },
  links: {
    Github: { type: String, required: true },
    LinkedIn: { type: String, required: true },
  },
  connections: { type: [String], required: true },
  mentoringArchive: { type: [String], required: true },
  availableDays: { type: [String], required: true },
});

const User = mongoose.model<IUser>('users', userSchema);

export default User;