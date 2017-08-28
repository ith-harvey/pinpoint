
$(document).ready(function() {
  let didScroll;
  let lastScrollTop = 0;
  let delta = 5;
  let navbarHeight = $('.header').outerHeight();

  //////////// VALIDATION FUNCTIONS ///////////////

  //not logged in header apears on add-blog && vote-arrow click
  $('.no-uid-inactive').on("click", function() {
    $('.alert-header').slideDown().css("display","block")
  })

  function alertCommentNoText () {
    $('.alert-comment-no-text').slideDown().css("display","block")
  }


  //////////// OnClick FUNCTIONS ///////////////

  $('#submitComment').on('click', function() {
    // if the text field isn't empty -> post
    if($('#commentText').val().trim()) {
      let data = {
        blog_id: $('#commentText').data('blogid'),
        text: $('#commentText').val()
      }
      //pass blog id and an object
      postComment($('#commentText').data('blogid') + '/comments/', data)
    } else {

      // fire validation -> "please provide a comment before posting"
      alertCommentNoText()
    }
  })

  $('#search-input').off('click', function() {
    $blogs.show()
  })


  //////////// AJAX CALLS ///////////////

  function postComment(url, data) {
    let opts = {
      url: url,
      method: 'POST',
      data: data
    }

    $.ajax(opts).done(response => {}).fail(error => {
      // const errorMessage = 'You must be logged in to access this feature'
      // window.alert(errorMessage)
    })
  }


  //////////// SCROLLING HEADER ///////////////
  // on scroll, let the interval function know the user has scrolled
  $(window).scroll(function(event){
    didScroll = true;
  });

  // run hasScrolled() and reset didScroll status
  setInterval(function() {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);
  function hasScrolled() {
    var st = $(window).scrollTop();

    if (Math.abs(lastScrollTop - st) <= delta) {
      return
    }
    // If current position > last position AND scrolled past navbar...
    if (st > lastScrollTop && st > navbarHeight) {
      // Scroll Down
      $('.header').removeClass('nav-down').addClass('nav-up');
    } else {
      // Scroll Up
      // If did not scroll past the document (possible on mac)...
      if(st + $(window).height() < $(document).height()) {
        $('.header').removeClass('nav-up').addClass('nav-down');
      }
    }
    lastScrollTop = st;
  }
})
