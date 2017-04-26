const io = require('socket.io')();
const i = 0;

io.on('connection', function (socket) {
  socket.on('send message', function (data) {
    console.log(data);
    socket.emit('new message', data)
    socket.emit('new message', "server responding back")
  });
})



module.exports = io;
