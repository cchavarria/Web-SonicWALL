$(function () {
  //append off canvas content
  $('.site-wrapper').after('<div class="off-canvas-header"><div class="bg-grey border-b-gray p-10"><a class="off-canvas-back"><i class="glyphicon glyphicon-menu-left"></i><span>Back</span></a></div><div class="off-canvas-content"></div></div>');

  //toggle dropdown in desktop and tablet modes
  $('.view-blurb').unbind('click').bind('click', function () {
    $('.optional-dropdown').toggle();
  });

  //close button on dropdown
  $('.optional-dropdown .close').on('click', function () {
    $('.optional-dropdown').hide();
  });

  //off canvas back button
  $('body').on('click', '.off-canvas-back', function (e) {
    e.preventDefault();
    $('.off-canvas-header').hide();
    $('.site-wrapper').show();
    $('body').animate({left: 0}, {
      duration: 500,
      done: function () {
        $('.off-canvas-content').data('source').find('.collapsed').unwrap().find('collapse').unwrap();
        $($('.off-canvas-content').data('source')).html($('.off-canvas-content').find('> div')).find('> div').unwrap().hide();
        $(document).scrollTop($('.off-canvas-header').data('top'));
      }
    });
  });

  //perform off canvas
  $('body').on('click', '[data-toggle=offcanvas]', function (e) {
    e.preventDefault();

    var target = $(this).data('target'), index = 0;

    $('.optional-dropdown').removeClass('bg-grey border-tb-grey');

    if (target.charAt(0) == '#') {
      $(target).wrap('<div>');

      if ($('[data-toggle=offcanvas]').data('triggered') == 'true') {
        $(target).find('.collapsible-content').each(function () {
          $(this).wrap('<div id="toggle-content-' + index + '" class="collapse" aria-expanded="false">');
          index++;
        });

        $(target).find('h3').each(function () {
          $(this).wrap('<a class="collapsed" data-toggle="collapse" data-target="#' +
          $(this).next().attr('id') + '" aria-expanded="false">');
        });

        $('[data-toggle=offcanvas]').data('triggered', 'false');
      }
      $('.off-canvas-content').data('source', $(target).parent()).html($(target));
    }

    $('body').addClass('off-canvas-mode').animate({left: -1 * pageWidth}, {
      duration: 500,
      done: function () {
        $('.site-wrapper').hide();
        $('.off-canvas-header').css('left', pageWidth);
        //save the element position on the page to be used when returning to the canvas
        $('.off-canvas-header').show().data('top', $(document).scrollTop());
        //$('.off-canvas-content').show().find('> div').show();
        $(window).scrollTop(0);
      }
    });
  });

  resizeProductLine();
});

addResize('resizeProductLine');

function resizeProductLine() {
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

  //off canvas mode exit, reverts all the changes back
  var target = $('[data-toggle=offcanvas]').data('target');
  $('.off-canvas-header').hide();
  $('.site-wrapper').show();
  $('.optional-dropdown').addClass('bg-grey border-tb-grey');
  $('body').css('left', '0');
  $($('[data-toggle=offcanvas]').data('target')).hide();
  //remove extra elements for collapsible
  $(target).find('[data-toggle=collapse] > h3').unwrap().next().find('.collapsible-content').unwrap();
  //append off canvas target back again
  $($('.off-canvas-content').data('source')).html($('.off-canvas-content').find('> div')).find('> div').unwrap().hide();
  //adjust optional dropdown position depending on the height of the description
  $('.optional-dropdown').css('margin-top', (-170 + $('.short-description-wrapper').height()).toString() + 'px');

  if (pageWidth >= 768) {//tablet
    if (pageWidth < 992) {
      sliderOptions.column = 2;
      //adjust optional dropdown position depending on the height of the description
      $('.optional-dropdown').css('margin-top', (-166 + $('.short-description-wrapper').height()).toString() + 'px');
    }
    //solutions slider
    $('.images-slider').slidePagination2(sliderOptions);

    //optional dropdown
    $('.view-blurb').unbind('click').bind('click', function () {
      $('.optional-dropdown').toggle();
    });
  }
  else if (pageWidth < 768) {//mobile
    $('[data-toggle=offcanvas]').data('triggered','true');
    $('.optional-dropdown').css('margin-top','0');
    sliderOptions.column = 1;
    $('.images-slider').slidePagination2(sliderOptions);
  }
}
