$(document).ready(function() {

  //not logged in header apears on add-blog && vote-arrow click
  $('#btn-addblog-no-uid, .arrow-up-no-uid, .arrow-down-no-uid').on("click", function() {
    $('.alert-header').slideDown().css("display","block")
  })
})
