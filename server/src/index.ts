import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import userRoutes from '../routes/userRoutes';
import config from './config';
import http from 'http';
import { Server } from 'socket.io';
import Message from '../models/message';

import { registerChatHandlers } from '../controllers/socketManager';

const app: Express = express();
const PORT: number = 3001;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

const mongoURI: string = config.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err: any) => console.log(err));

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  registerChatHandlers(io, socket);
})

const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(userRoutes);

app.get('/api/test', (req: Request, res: Response) => {
  res.json({ message: "Success! The server is responding." });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
