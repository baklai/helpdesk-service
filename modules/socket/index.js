const socketIO = require('socket.io');

const users = require('./users')();

export default function () {
  this.nuxt.hook('listen', (server, { host, port }) => {
    consola.info('Socket server success is running');
    const io = socketIO(server, {
      allowEIO3: true,
      cors: {
        origin: '*'
      },
      path: '/helper'
    });

    const msg = (name, text, id) => ({ name, text, id, date: Date.now() });

    io.of('/helper').on('connection', (socket) => {
      socket.on('userJoined', (data, callback) => {
        if (!data.name || !data.room) {
          return callback('Данные некорректны');
        }
        socket.join(data.room);
        users.remove(socket.id);
        users.add({
          id: socket.id,
          name: data.name,
          room: data.room
        });
        callback({ userId: socket.id });
        io.of('/helper')
          .to(data.room)
          .emit('updateUsers', users.getByRoom(data.room));
        socket.emit('newMessage', msg('info', `Добро пожаловать ${data.name}`));
        // socket.broadcast
        //   .to(data.room)
        //   .emit('newMessage', msg('info', `Пользователь ${data.name} зашел.`));
      });

      socket.on('createMessage', (data, callback) => {
        if (!data.text) {
          return callback('Текст не может быть пустым');
        }
        const user = users.get(data.id);
        if (user) {
          io.of('/helper')
            .to(user.room)
            .emit('newMessage', msg(user.name, data.text, data.id));
        }
        callback();
      });

      socket.on('userLeft', (id, callback) => {
        const user = users.remove(id);
        if (user) {
          io.of('/helper')
            .to(user.room)
            .emit('updateUsers', users.getByRoom(user.room));
          // io.of('/helper')
          //   .to(user.room)
          //   .emit(
          //     'newMessage',
          //     msg('info', `Пользователь ${user.name} вышел.`)
          //   );
        }
        callback();
      });

      socket.on('disconnect', () => {
        const user = users.remove(socket.id);
        if (user) {
          io.of('/helper')
            .to(user.room)
            .emit('updateUsers', users.getByRoom(user.room));
          // io.of('/helper')
          //   .to(user.room)
          //   .emit(
          //     'newMessage',
          //     msg('info', `Пользователь ${user.name} вышел.`)
          //   );
        }
      });

      socket.on('isMaintenance', (data, callback) => {
        process.env.MODE_MAINTENANCE = data.isMaintenance || false;

        callback({
          message: process.env.MODE_MAINTENANCE
            ? 'Maintenance mode is enabled'
            : 'Maintenance mode is disabled'
        });

        socket.broadcast.emit('isMaintenance', {
          isMaintenance: process.env.MODE_MAINTENANCE,
          message: process.env.MODE_MAINTENANCE
            ? 'Maintenance mode is enabled'
            : 'Maintenance mode is disabled'
        });

        socket.emit('isMaintenance', {
          message: 'Service mode status sent to all clients'
        });
      });
    });
  });
}
