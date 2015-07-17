$(document).ready(function () {
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

	if($.fn.slidePagination2) {
		resizeProductLine();
	}
  else {
		$.getScript('/static/library/jQuery/jquery.slidepagination.min.js', function() {
			resizeProductLine();
		});
	}
});

addResize('resizeProductLine');

function resizeProductLine() {
  pageWidth = $('html').width();

	if(typeof RootPath == 'undefined') {
		RootPath = '/';
	}

  var disableEllipsis = $.inArray(RootPath, ['/jp-ja/', 'cn-zh']) > -1;

	if (!disableEllipsis) {
		initDotdotdot();
	}

  if (pageWidth >= 768) {//tablet
    $('.logos').slidePagination2('destroy');

    //show color logos in mobile
    setLogosColor('desktop');

    if (pageWidth < 992) {
      if (disableEllipsis && $.fn.dotdotdot) {
				$('.has-overlay p').trigger('destroy');
      }

      //show color logos in mobile
      setLogosColor('tablet');
    }
  }
  else if (pageWidth < 768) {//mobile
    $('.logos').slidePagination2({
      list: '.logos-list',
      column: 1,
      row: 1,
      largeArrow: true,
      pagination: [
        {type: 'prepend', nextArrow: false, align: 'left'},
        {type: 'prepend', prevArrow: false}
      ]
    });

    //show color logos in mobile
    setLogosColor('mobile');

    $('.show-more').on('click', function (e) {
      e.preventDefault();
      $(this).removeClass('visible-xs inline').hide().next().removeClass('hidden-xs');
    });
  }
}

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

function initDotdotdot() {
	if($.fn.dotdotdot) {
		$('.has-overlay p').dotdotdot();
	}
	else {
		$.getScript('/static/library/jquery/jquery.dotdotdot.min.js', function() {
			$('.has-overlay p').dotdotdot();
		});
	}
}

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