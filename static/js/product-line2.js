//puting this for testing
var RootPath = '\\';
$(document).ready(function () {
  //randomize banner
  //randomizeBanner();

  //lazy load banner images
  //$('.hero-banner .carousel').find('.lazy').each(function () {
  //  $(this).attr('src', $(this).data('original')).removeClass('lazy');
  //});

  // brand logos section hover effect
  $('.logos  a  img').hover(function () {
    var srcOver = $(this).attr('src').replace(/-gray.png/, '-color.png');
    $(this).attr('src', srcOver);
  }, function () {
    var srcOut = $(this).attr('src').replace(/-color.png/, '-gray.png');
    $(this).attr('src', srcOut);
  });
  //read more in product line
  //$('.show-more').on('click', function () {
  //  $(this).removeClass('visible-xs inline').addClass('hidden-xs').next().removeClass('hidden-xs');
  //});
  //Kace solutions blurb
  //$('.view-blurb').unbind('click').bind('click', function () {
  //  $('.optional-dropdown').toggle();
  //});
  //$('.optional-dropdown .close').on('click', function () {
  //  $('.optional-dropdown').hide();
  //});

  //$('body').on('click', '.off-canvas-back', function(e) {
  //  e.preventDefault();
  //
  //  $('.site-wrapper').show();
  //  $('body').animate({left: 0}, {
  //    duration: 500,
  //    done: function() {
  //      $('.off-canvas-header').hide();
  //      $($('.off-canvas-content').data('source')).html($('.off-canvas-content').find('> div')).find('> div').unwrap().hide();
  //      $(document).scrollTop($('.off-canvas-header').data('top'));
  //    }
  //  });
  //});
  //
  //$('body').on('click', '[data-toggle=offcanvas]', function(e) {
  //  e.preventDefault();
  //
  //  var target = $(this).data('target');
  //
  //  if(target.charAt(0) == '#') {
  //    $(target).wrap('<div>');
  //
  //    $('.off-canvas-content').data('source', $(target).parent()).html($(target));
  //  }
  //
  //  $('.off-canvas-content').show().find('> div').show();
  //
  //  //save the element position on the page
  //  $('.off-canvas-header').show().data('top', $(document).scrollTop());
  //  $('body').addClass('off-canvas-mode').animate({left: -1 * pageWidth}, {
  //    duration: 500,
  //    done: function() {
  //      $('.site-wrapper').hide();
  //      $('.off-canvas-header').css('left',pageWidth);
  //      $(window).scrollTop(0);
  //    }
  //  });
  //});

  resizeProductLine();
});

addResize('resizeProductLine');

function resizeProductLine() {
  pageWidth = $('html').width();

  var disableEllipsis = !($.inArray(RootPath, ['/jp-ja/', 'cn-zh']) > -1);
  //var sliderOptions = {
  //  list: '.images-slider-list',
  //  column: 3,
  //  row: 1,
  //  largeArrow: true,
  //  pagination: [
  //    {type: 'prepend', nextArrow: false, align: 'left'},
  //    {type: 'prepend', prevArrow: false}
  //  ]
  //};

  //remove fixed height added in mobile view for jumping issue
  //$('.hero-banner .carousel-inner .item').css('height', 'auto');

  ////off canvas mode exit
  //$('.site-wrapper').show();
  //$('body').css('left','0');
  //$('.off-canvas-header').hide();
  //$($('[data-toggle=offcanvas]').data('target')).hide();
  ////append off canvas target back again
  //$($('.off-canvas-content').data('source')).html($('.off-canvas-content').find('> div')).find('> div').unwrap().hide();


  if (pageWidth >= 768) {//tablet
    $('.logos').slidePagination2('destroy');
    if (disableEllipsis) {
      $('.has-overlay p').dotdotdot();
    }
    //show color logos in mobile
    setLogosColor('desktop');

    if (pageWidth < 992) {
      //sliderOptions.column = 2;
      if (disableEllipsis) {
        $('.has-overlay p').trigger('destroy');
      }
      //show color logos in mobile
      setLogosColor('tablet');
    }

    //solutions slider
    //$('.images-slider').slidePagination2(sliderOptions);

    //Kace solutions blurb
    //$('.view-blurb').unbind('click').bind('click', function () {
    //  $('.optional-dropdown').toggle();
    //});

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
    //sliderOptions.column = 1;
    //$('.images-slider').slidePagination2(sliderOptions);

    //fix jumping issue for carousel
    $(window).load(function () {
      getHighestCarouselItem('hero-banner');
    });

  }
}
//function randomizeBanner() {
//  var randomNumber = Math.floor((Math.random() * $('.item').length));
//  $('.item').eq(randomNumber).addClass("active");
//  $('.hero-banner .carousel-indicators li').eq(randomNumber).addClass("active");
//}

//$.getScript('/static/library/jQuery/jquery.lazyload.min.js', function () {
//  $(document).ready(function () {
//    $("img.lazy").lazyload();
//  });
//});
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
//
//function getHighestCarouselItem(carouselClass) {
//  var h = 0;
//  var h_elem;  // the highest element (after the function runs)
//  $('.' + carouselClass + " .carousel-inner .item").each(function () {
//    $this = $(this);
//    if ($this.height() > h) {
//      h_elem = this;
//      h = $this.height();
//    }
//  });
//  $('.' + carouselClass + ' .carousel-inner .item').height(h);
//}


