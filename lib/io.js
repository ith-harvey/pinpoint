const io = require('socket.io')();
const i = 0;

io.on('connection', function (socket) {

  // let data = { blogId, updatedRating}
  // console.log(data);
  // socket.emit('rating update', data)
  socket.emit('message','Hi from the server.')
})

function updateAllRatings(data){
  io.emit('message', data)

}

module.exports = {
  io,
  updateAllRatings

  }
