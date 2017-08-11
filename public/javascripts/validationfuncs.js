$(document).ready(function() {

  $('#btn-addblog-no-uid').on("click", function() {
    console.log('funciton run');
    // $('.alert-header').attr("display", 'block').delay(8);
    $('.alert-header').slideDown().css("display","block")
  })
})
