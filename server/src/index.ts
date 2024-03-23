import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import userRoutes from '../routes/userRoutes';
import config from './config';
import http from 'http';
import { Server } from 'socket.io';
import Message from '../models/messageModel';
import cookieParser from 'cookie-parser';

import { registerChatHandlers } from '../controllers/socketManager';

const app: Express = express();
const PORT: number = 3001;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const mongoURI: string = config.MONGO_URI;

mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err: any) => console.log(err));

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Load existing messages and emit to the newly connected client
  Message.find()
    .sort({ timestamp: 1 })
    .then((messages) => {
      socket.emit('initial_messages', messages);
    });

  socket.on('send_message', (data) => {
    if (!data.content.trim()) {
      // Prevent sending empty messages
      return;
    }

    const newMessage = new Message({
      senderId: data.senderId,
      recipientId: data.recipientId,
      content: data.content,
      timestamp: new Date(), // Ensure the timestamp is set when creating a message
    });

    newMessage
      .save()
      .then((savedMessage) => {
        io.emit('new_message', savedMessage); // Broadcast to all clients
      })
      .catch((err) => console.error('Error saving message:', err));
  });
});

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
