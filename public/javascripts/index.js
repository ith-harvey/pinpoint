
$(document).ready(function() {
  console.log('attached');


function requestRatingUpdate(url,vote) {

  console.log("running requestRatingUpdate", typeof vote);

  let opts = {
    url: url,
    method: 'PUT',
    data: {votevalue: vote}
  }

  $.ajax(opts).done( response => {
    console.log('ajax request finnished', response);
  }).fail( error => {
    console.log(error);
  })

}



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

$('.arrow-up').click(function () {
  let target = $(event.target);
  let id = target.data('id');
  console.log(target,id);

  requestRatingUpdate('/blogs/rating/' + id ,'1')

  console.log('clicked voting mech');

})

$('.arrow-down').click(function () {
  let target = $(event.target);
  let id = target.data('id');
  console.log(target,id);

  requestRatingUpdate('/blogs/rating/' + id ,'-1')

  console.log('clicked voting mech');

})














})
