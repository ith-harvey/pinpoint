$(document).ready(function() {

  function requestRatingUpdate(url, vote) {
    let opts = {
      url: url,
      method: 'PUT',
      data: {
        votevalue: vote
      }
    }
    $.ajax(opts).done(response => {}).fail(error => {
      const errorMessage = 'You must be logged in to access this feature'
    })
  }

  // displays area where users can create tags
  $('#tag-no-exist-btn').click(function() {
    $('#tag-show-adition-group').fadeIn()
  })

  // displays aditional tag field
    // - allows user to add multiple tags
  $('#tag-add-another-btn').click(function() {
    $('.tag-text-input').append(
      '<div class="form-group"><div class="input-group"><label class="control-label" for="name">New tag: </label><input type="text" id="name" name="name" placeholder="" class="form-control"></div></div>'
    )
  })

  // fires upvote action on blog rating
  $('.arrow-up').click(function() {
    let target = $(event.target);
    let id = target.data('id');
    requestRatingUpdate('/blogs/rating/' + id, '1')
  })

  // fires downvote action on blog rating
  $('.arrow-down').click(function() {
    let target = $(event.target);
    let id = target.data('id');
    requestRatingUpdate('/blogs/rating/' + id, '-1')
  })

  // fires upvote action on comment rating
  $('.comment-section').on('click', '.arrow-up-comment', function() {
    let target = $(event.target);
    let id = target.data('id');
    requestRatingUpdate('/blogs/comments/' + id, '1')
  })

  // fires downvote action on comment rating
  $('.comment-section').on('click', '.arrow-down-comment', function() {
    let target = $(event.target);
    let id = target.data('id');
    requestRatingUpdate('/blogs/comments/' + id, '-1')
  })


  //tags.name references the tags array in the blogs object
  const $blogs = $('.single-blog')

  $('#search').click( () => {
    const url = '/blogs/api'
    const searchOptions = {
      keys: ['title', 'tags.name'],
      shouldSort: true
    }

    const APIOptions = {
      url: url,
      method: 'GET'
    }

    return $.ajax(APIOptions)
      .done(response => {
        // Utilizing Fuse search library (http://fusejs.io/)
        const fuse = new Fuse(response, searchOptions)
        let searchTerm = document.getElementById('search-input').value
        let containsSearchTerm = []

        fuse.search(searchTerm).forEach(item => {
          containsSearchTerm.push(item.id)
        })

        $blogs.each((i, element) => {
          const id = $(element).data().id
          $(element).filter(item => {
            if (containsSearchTerm.indexOf(id) === -1) {
              $(element).hide()
            }
          })
        })
      })
      .fail(error => {
        console.error(error)
      })
  })
})
