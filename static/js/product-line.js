//puting this for testing
var RootPath = '\\';
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
  $('.view-blurb').unbind('click').bind('click', function () {
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

  var disableEllipsis = !($.inArray(RootPath, ['/jp-ja/', 'cn-zh']) > -1);
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

  //remove fixed height added in mobile view for jumping issue
  $('.hero-banner .carousel-inner .item').css('height', 'auto');

  if (pageWidth >= 768) {//tablet
    $('.logos').slidePagination2('destroy');
    if (disableEllipsis) {
      $('.has-overlay p').dotdotdot();
    }
    //show color logos in mobile
    setLogosColor('desktop');

    if (pageWidth < 992) {
      sliderOptions.column = 2;
      if (disableEllipsis) {
        $('.has-overlay p').trigger('destroy');
      }
      //show color logos in mobile
      setLogosColor('tablet');
    }

    //solutions slider
    $('.images-slider').slidePagination2(sliderOptions);

    //Kace solutions blurb
    $('.view-blurb').unbind('click').bind('click', function () {
      $('.expanded-blurb').toggle();
    });

  }
  else if (pageWidth < 768) {//mobile
    if (disableEllipsis) {
      $('.has-overlay p').dotdotdot();
    }

    $('.logos').slidePagination2({
      list: '.logos-list',
      column: 1,
      row: 1,
      pagination: [
        {type: 'prepend', selector: '.carousel-xs'}
      ]
    });
    //show color logos in mobile
    setLogosColor('mobile');
    sliderOptions.column = 1;
    $('.images-slider').slidePagination2(sliderOptions);

    //off canvas blurb
    $('.view-blurb').unbind('click').bind('click', function () {
      showOffCanvas('expanded-blurb');
    });
    $('.back').on('click', function () {
      hideOffCanvas('expanded-blurb');
    });

    //fix jumping issue for carousel
    $(window).load(function () {
      getHeighestCarouselItem('hero-banner');
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
function setLogosColor(device) {
  var outputSrc = '';
  $('.logos  a  img').each(function () {
    if (device == 'mobile' || device == 'tablet') {
      outputSrc = $(this).attr('src').replace(/-gray.png/, '-color.png');
    } else {
      outputSrc = $(this).attr('src').replace(/-color.png/, '-gray.png');
    }
    $(this).attr('src', outputSrc);
  });
}

function getHeighestCarouselItem(carouselClass) {
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

function showOffCanvas(className) {
  $('.off-canvas-header').show();
  $('.' + className).removeClass('hidden-xs').show();
  //hide everything on canvas except the element with class name
  $('.site-canvas > div').each(function () { //what if it is not div only
    if (!$(this).hasClass('off-canvas-header') && !$(this).hasClass(className)) {
      $(this).hide();
      $('header,footer').hide();
    }
  });
  $("html, body").animate({
    scrollTop: 0
  }, "slow");
}

function hideOffCanvas(className) {
  $('.' + className).addClass('hidden-xs').css('display', 'none');

  //show everything on canvas
  $('.site-canvas > div').each(function () {
    if (!$(this).hasClass('hidden-xs')) {
      $(this).show();
      $('header,footer').show();
    }
  });
  $('.off-canvas-header').hide();
}
