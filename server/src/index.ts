import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import userRoutes from '../routes/userRoutes';
import config from './config';

const app: Express = express();
const PORT: number = 3001;

const mongoURI: string = config.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err: any) => console.log(err));

const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(userRoutes);

app.get('/api/test', (req: Request, res: Response) => {
  res.json({ message: "Success! The server is responding." });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
