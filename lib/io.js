const io = require('socket.io')();
const i = 0;

io.on('connection', function (socket) {

  // let data = { blogId, updatedRating}
  // console.log(data);
  // socket.emit('rating update', data)
  socket.emit('message','Hi from the server.')
})

function updateBlogRating(data){
  io.emit('blog rating', data)

}
function updateCommentRating(data){
  io.emit('comment rating', data)

}

function postComment(data){
  io.emit('post comment', data)

}


module.exports = {
  io,
  updateBlogRating,
  updateCommentRating,
  postComment

  }
