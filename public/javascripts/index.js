


$(document).ready(function() {
console.log('attached');


$('#tag-no-exist-btn').click(function() {
  $('#tag-show-adition-group').fadeIn()
})

$('#tag-add-another-btn').click(function() {
  console.log('clicking!');
  $('.tag-text-input').append(
    '<label class="control-label"  for="name">New tag: </label><input type="text" id="name" name="name" placeholder="" class="input-xlarge"><input type="button" class="btn btn-default tag-edit-btn" value="edit">'
  )
})














})
