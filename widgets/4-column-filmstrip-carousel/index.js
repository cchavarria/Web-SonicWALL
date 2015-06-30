/**
 * Created by edoostda on 6/25/2015.
 */
$(function () {
  resizeFourColumnFilmstripCarousel();
});

addResize('resizeFourColumnFilmstripCarousel');

function resizeFourColumnFilmstripCarousel() {
  var sliderOptions = {
    list: '.images-slider-list',
    column: 4,
    row: 1,
    largeArrow: true,
    pagination: [
      {type: 'prepend', nextArrow: false, align: 'left'},
      {type: 'prepend', prevArrow: false}
    ]
  };

  if (pageWidth >= 768) {//tablet
    //sliderOptions.column = 3;
    if (pageWidth < 992) {
      sliderOptions.column = 3;
    }
    $('.images-slider').slidePagination2(sliderOptions);
  }
  else if (pageWidth < 768) {//mobile
    sliderOptions.column = 1;
    $('.images-slider').slidePagination2(sliderOptions);
    //$('.col-4-filmstrip .pagination-container > div > ul li > div').css('width',$('.col-4-filmstrip .pagination-container > div > ul').width());
  }
}