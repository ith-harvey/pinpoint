


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

$('arrow-up').click(function () {
  console.log('clickup');

})


$('arrow-down').click(function () {
  console.log('clickdown');

})













})
