$(function () {
  resizeProductLine();
});

addResize('resizeProductLine');

function resizeProductLine() {
  if (pageWidth < 768) {//mobile
    //$('.show-more').addClass('visible-xs inline').show().next().addClass('hidden-xs');
    $('.show-more').on('click', function (e) {
      e.preventDefault();
      $(this).removeClass('visible-xs inline').hide().next().removeClass('hidden-xs');
    });
  }
}
