function PLSolutionCallback(target) {
  /*reset margin to avoid wrong measurements on second toggle*/
  $(target).css('marginTop', 0);

  var offsetTop = $(target).offset().top - $(this).offset().top - $(this).outerHeight(true) - 10;

  $(target).css('marginTop', -1 * offsetTop);
}
$(document).ready(function(){
  $('#view-all-solution .close').on('click', function(){
    $('#view-all-solution').addClass('hidden');
  })
});