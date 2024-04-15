import { Server } from 'socket.io';
import http from 'http';
import express from 'express';
import { getUserId } from '../utils/authFunctions';

const app = express();
const PORT = 3001;

const cookie = require('cookie');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

export const getRecicipientSocketId = (receiverId: string) => {
  console.log(userSocketMap);
  return userSocketMap[receiverId];
};

const userSocketMap: { [key: string]: string } = {};

io.on('connection', (socket) => {
  console.log('a user connected ', socket.id);

  let userId: null | string;

  const cookieHeader = socket.handshake.headers.cookie;

  if (cookieHeader) {
    const cookies = cookie.parse(cookieHeader);
    const accessToken = cookies.accessToken;
    userId = getUserId(accessToken);

    if (userId != 'undefined') userSocketMap[userId] = socket.id;
    console.log(userSocketMap);
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  }

  socket.on('disconnect', () => {
    console.log('user disconnected ', socket.id);
    if (userId) {
      delete userSocketMap[userId];
      io.emit('getOnlineUsers', Object.keys(userSocketMap));
    }
  });
});

export { app, server, io };
