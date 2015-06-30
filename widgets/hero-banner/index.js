var resizeTimer = null;
$(function() {
  $("img.lazy").lazyload();

  //randomize banner
  randomizeBanner();

  //lazy load banner images
  $('.hero-banner .carousel').find('.lazy').each(function () {
    $(this).attr('src', $(this).data('original')).removeClass('lazy');
  });
  resizeHome();
});
addResize('resizeHome');

function resizeHome() { // I have questions regarding this one
  $(window).trigger('load');
}

$(window).load(function () {
  if (pageWidth >= 768) {//desktop
    getHeighestCarouselItem('hero-banner');
    if (pageWidth < 992) {//tablet
      getHeighestCarouselItem('hero-banner');
    }
  }
  else if (pageWidth < 768) {//mobile
    getHeighestCarouselItem('hero-banner');
  }
});

function randomizeBanner() {
  var randomNumber = Math.floor((Math.random() * $('.item').length));
  $('.item').eq(randomNumber).addClass("active");
  $('.hero-banner .carousel-indicators li').eq(randomNumber).addClass("active");
}

function getHeighestCarouselItem(carouselClass) {
  $('.' + carouselClass + ' .carousel-inner .item').height('auto');
  var h = 0;
  var h_elem;  // the highest element (after the function runs)
  $('.' + carouselClass + " .carousel-inner .item").each(function () {
    $this = $(this);
    if ($this.height() > h) {
      h_elem = this;
      h = $this.height();
    }
  });
  $('.' + carouselClass + ' .carousel-inner .item').height(h);
}