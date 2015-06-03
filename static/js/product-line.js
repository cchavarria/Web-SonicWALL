$(document).ready(function () {
  //randomize banner
  randomizeBanner();

  //lazy load banner images
  $('.hero-banner .carousel').find('.lazy').each(function () {
    $(this).attr('src', $(this).data('original')).removeClass('lazy');
  });

  // brand logos section hover effect
  $('.logos  a  img').hover(function () {
    var srcOver = $(this).attr('src').replace(/-gray.png/, '-color.png');
    $(this).attr('src', srcOver);
  }, function () {
    var srcOut = $(this).attr('src').replace(/-color.png/, '-gray.png');
    $(this).attr('src', srcOut);
  });
  //read more in product line
  $('.show-more').on('click', function () {
    $(this).removeClass('visible-xs inline').addClass('hidden-xs').next().removeClass('hidden-xs');
  });
  //Kace solutions blurb
  $('.view-blurb').on('click', function () {
    $('.expanded-blurb').toggle();
  });
  $('.expanded-blurb .close').on('click', function () {
    $('.expanded-blurb').hide();
  });

  resizeProductLine();
});

addResize('resizeProductLine');

function resizeProductLine() {
  pageWidth = $('html').width();

  if (pageWidth >= 768) {//tablet
    $('.logos').slidePagination2('destroy');

    var sliderOptions = {
      list: '.images-slider-list',
      column: 3,
      row: 1,
      largeArrow: true,
      pagination: [
        {type: 'prepend', nextArrow: false, align: 'left'},
        {type: 'prepend', prevArrow: false}
      ]
    };

    if (pageWidth < 992) {
      sliderOptions.column = 2;
    }

    //solutions slider
    $('.images-slider').slidePagination2(sliderOptions);
  }
  else if (pageWidth < 768) {//mobile
    $('.logos').slidePagination2({
      list: '.logos-list',
      column: 1,
      row: 1,
      pagination: [
        {type: 'prepend', selector: '.carousel-xs'}
      ]
    });
  }
}
function randomizeBanner() {
  var randomNumber = Math.floor((Math.random() * $('.item').length));
  $('.item').eq(randomNumber).addClass("active");
  $('.hero-banner .carousel-indicators li').eq(randomNumber).addClass("active");
}

$.getScript('/static/library/jQuery/jquery.lazyload.min.js', function () {
  $(document).ready(function () {
    $("img.lazy").lazyload();
  });
});