var resizeTimer = null;
$(document).ready(function () {
  //randomize banner
  randomizeBanner();

  //lazy load banner images
  $('.hero-banner .carousel').find('.lazy').each(function () {
    $(this).attr('src', $(this).data('original')).removeClass('lazy');
  });

  if ($('html').hasClass('ie8')) {
    $('.resources img, .icon-headline img').each(function () {
      if ($(this).hasClass('scale-32')) {
        $(this).removeClass('scale-32').css('padding', '17px 10px 0 0');
      }
      var newSource = $(this).attr('src').replace('svg', 'png');
      $(this).attr('src', newSource);
    });
  }

  // case study section hover effect
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

  //solutions slider
  $('.images-slider').slidePagination2({
    list: '.images-slider-list',
    column: 3,
    row: 1,
    largeArrow: true,
    pagination: [
      {type: 'prepend', nextArrow: false, align: 'left'},
      {type: 'prepend', prevArrow: false}
    ]
  });
});

$(window).resize(function () {
  //Workaround for IE8 always firing this function when any element on the page has been modified by javascript.
  if ($('html').hasClass('ie8')) {
    var w = $(window).width(), h = $(window).height();

    if ($('html').data('w') != w || $('html').data('h') != h) {
      $('html').data('w', w).data('h', h);
      resize();
    }
  }
  else {
    resize();
  }
});

function resize() {
  if (resizeTimer !== null) {
    clearTimeout(resizeTimer);
  }

  resizeTimer = setTimeout(function () {
    clearTimeout(resizeTimer);

    pageWidth = $('html').width();

    if (pageWidth >= 992) {//desktop
      $('.add-default-xs').addClass('btn-link').removeClass('btn-default');
      $('.logos').slidePagination2('destroy');
    }
    else if (pageWidth >= 768 && pageWidth < 992) {//tablet
      $('.add-default-xs').addClass('btn-link').removeClass('btn-default');
      $('.logos').slidePagination2('destroy');
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
      $('.add-default-xs').removeClass('btn-link').addClass('btn-default');
    }
  }, 500);
}
function randomizeBanner() {
  var randomNumber = Math.floor((Math.random() * $('.item').length));
  $('.item').eq(randomNumber).addClass("active");
  $('.hero-banner .carousel-indicators li').eq(randomNumber).addClass("active");
}

$.getScript('http://stage-software-dell-com/Static/Library/jQuery/jquery.lazyload.min.js', function () {
  $(document).ready(function () {
    $("img.lazy").lazyload();
  });
});