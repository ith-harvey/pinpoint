$(document).ready(function() {

  //not logged in header apears on add-blog && vote-arrow click
  $('.no-uid-inactive').on("click", function() {
    $('.alert-header').slideDown().css("display","block")
  })
})
