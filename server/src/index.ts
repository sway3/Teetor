import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import userRoutes from '../routes/userRoutes';
import config from './config';
import http from 'http';
import { Server } from 'socket.io';
import Message from '../models/messageModel';
import cookieParser from 'cookie-parser';
import { server, app } from '../socket/socket';

const PORT: number = 3001;

const mongoURI: string = config.MONGO_URI;

mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err: any) => console.log(err));

app.use(cookieParser());
require('dotenv').config();
const cors = require('cors');

app.use(
  cors({
    origin: 'http://localhost:5173', // Your frontend's origin
    credentials: true, // This is important for cookies
  })
);

app.use(express.json());
app.use(userRoutes);

app.get('/api/test', (req: Request, res: Response) => {
  res.json({ message: 'Success! The server is responding.' });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
