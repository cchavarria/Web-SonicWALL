$(function () {
  //mobile version
  $('.screenshot-carousel .btn-default').on('click', function () {
    $('.screenshot-carousel ul li:nth-child(3) .polaris-divider').attr('style', 'display: block !important');
    for (var i = 3; i < 9; i++) {//hide from child 4
      $('.screenshot-carousel ul li').eq(i).toggle();
    }
    $('.screenshot-carousel .btn-default').attr('style', 'display: none !important');
  });

  resizeHome();
});
addResize('resizeHome');

function resizeHome() {
  var sliderOptions = {
    list: '.screenshot-carousel-list',
    column: 3,
    row: 2,
    random: true,
    pagination: [
      {type: 'append', selector: '.features-headline'},
      {type: 'append', selector: '.screenshot-carousel-wrapper', displayTotal: true}
    ]
  };

  if (pageWidth >= 768) {//tablet
    if (pageWidth < 992) {
      sliderOptions.column = 2;
    }
    $('.featured-products').slidePagination2(sliderOptions);
  }
  else if (pageWidth < 768) {//mobile

    $('.featured-products .btn-default').attr('style', 'display: block !important');
    $('.featured-products').slidePagination2('destroy');
    $('.featured-products').find('.screenshot-carousel-list').find('li').show();
    $('.featured-products').find('.screenshot-carousel-list').find('li:gt(2)').hide();
  }
  $('.btn-link').removeClass('btn-link').addClass('btn-default');
}