
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


function requestBlogData(){
  const url = '/blogs/api'

  const opts = {
    url: url,
    method: 'GET'
  }

  $.ajax(opts)
    .done(response => {
      console.log(response)
      return response
    })
    .fail(error => {
    })
}

//tags.name references the tags array in the blogs object
const options = {
  keys: ['title', 'tags.name'],
  shouldSort: true
}

const blogs = document.getElementsByClassName('blog')
const fuse = new Fuse(requestBlogData(),options)

$('#search').click(() => {
  const searchTerm = document.getElementById('search-input').value

  fuse.search(searchTerm)


  console.log(fuse.search(searchTerm))
})





})
