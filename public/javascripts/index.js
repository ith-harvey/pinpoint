// const fuse = require('fuse.js')

$(document).ready(function() {


function requestRatingUpdate(url,vote) {


  let opts = {
    url: url,
    method: 'PUT',
    data: {votevalue: vote}
  }

  $.ajax(opts).done( response => {
  }).fail( error => {
  })

}



// displays area where users can create tags
$('#tag-no-exist-btn').click(function() {
  $('#tag-show-adition-group').fadeIn()
})

// displays an aditional tag field where users can create multiple tags
$('#tag-add-another-btn').click(function() {
  $('.tag-text-input').append(
    '<div class="form-group"><div class="input-group"><label class="control-label" for="name">New tag: </label><input type="text" id="name" name="name" placeholder="" class="form-control"></div></div>'
  )
})

$('.arrow-up').click(function () {
  let target = $(event.target);
  let id = target.data('id');

  requestRatingUpdate('/blogs/rating/' + id ,'1')


})

$('.arrow-down').click(function () {
  let target = $(event.target);
  let id = target.data('id');

  requestRatingUpdate('/blogs/rating/' + id ,'-1')


})

// <script src="fuse.js"></script>
//finish linking this to the fuse file and or place this within a partial

$(document).ready(function() {
  const blogs = document.getElementsByClassName('blog')
  let searchTerm = document.getElementById('search-term')

  //tags.name references the tags array in the blogs object
  const options = {
    keys: ['title', 'tags.name'],
    id: 'id'
  }

  const fuse = new Fuse(blogs,options)

  $('#search').click(() => {
    fuse.search(searchTerm)
  })
}











})
