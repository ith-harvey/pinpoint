
$(document).ready(function() {





console.log('attached');

// displays area where users can create tags
$('#tag-no-exist-btn').click(function() {
  $('#tag-show-adition-group').fadeIn()
})

// displays an aditional tag field where users can create multiple tags
$('#tag-add-another-btn').click(function() {
  $('.tag-text-input').append(
    '<label class="control-label"  for="name">New tag: </label><input type="text" id="name" name="name" placeholder="" class="input-xlarge"><input type="button" class="btn btn-default tag-edit-btn" value="edit">'
  )
})



socket.on('new message', function (data) {
  console.log(data + "<br>");
})



$('.arrow-up').click(function () {
  socket.emit('up vote', 1);
  console.log('clickup');

})


$('.arrow-down').click(function () {
  socket.emit('down vote', -1);
  console.log('clickdown');

})













})
