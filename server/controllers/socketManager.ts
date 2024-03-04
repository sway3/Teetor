// socketManager.ts
import { Server, Socket } from 'socket.io';
import { saveMessage, loadMessages } from '../controllers/chatController';

export const registerChatHandlers = (io: Server, socket: Socket) => {
  socket.on('join_room', (userId) => {
    console.log(`User with ID ${userId} joining room: ${userId}`);
    socket.join(userId); // User joins a room named after their userID
  });

  socket.on('send_message', async (data) => {
    try {
      // Save the message to the database
      const savedMessage = await saveMessage(data);
      // Emit the saved message back to the sender for immediate feedback
      socket.emit('receive_message', savedMessage);
      // Also, emit the message to the recipient's room (identified by recipientId)
      io.to(data.recipientId).emit('receive_message', savedMessage);
    } catch (error) {
      socket.emit('error_saving_message', { error: error });
    }
  });
};
