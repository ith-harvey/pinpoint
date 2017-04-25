const io = require('socket.io')();
const i = 0;

io.on('connection', function (socket) {
  // see this log in the server-side console
  // sockets have some noteworthy properties, such as `id` and `rooms`
  console.log(socket);

  // whenever a client emits a message with the name `self`
  // this function will fire
  socket.on('self', function (data) {

    // socket.emit just sends a message back to this one socket
    socket.emit('message', 'To just me! (' + i + ')')
    i++;
  });
})



module.exports = io;
