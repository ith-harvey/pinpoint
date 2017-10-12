
// Socket.io implementation
const io = require('socket.io')();
const i = 0;

io.on('connection', function (socket) {
  socket.emit('message','Hi from the server.')
})

// emits data to all users when a blog is up or down voted
function updateBlogRating(data){
  io.emit('blog rating', data)
}

// emits data to all users when a comment is up or down voted
function updateCommentRating(data){
  io.emit('comment rating', data)
}

// emits data to all users when a comment posted
function postComment(data){
  io.emit('post comment', data)

}


module.exports = {
  io,
  updateBlogRating,
  updateCommentRating,
  postComment
  }
