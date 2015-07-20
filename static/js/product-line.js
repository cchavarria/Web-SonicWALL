$(document).ready(function () {
  //lazy load banner images
  $('.hero-banner .carousel').find('.lazy').each(function () {
    $(this).attr('src', $(this).data('original')).removeClass('lazy');
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
	if(typeof RootPath == 'undefined') {
		RootPath = '/';
	}

  var disableEllipsis = $.inArray(RootPath, ['/jp-ja/', 'cn-zh']) > -1;

	if (!disableEllipsis) {
		initDotdotdot();
	}

  if (pageWidth >= 768) {//tablet
    $('.logos').slidePagination2('destroy');

    if (pageWidth < 992) {
      if (disableEllipsis && $.fn.dotdotdot) {
				$('.has-overlay p').trigger('destroy');
      }
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

    $('.show-more').on('click', function (e) {
      e.preventDefault();
      $(this).removeClass('visible-xs inline').hide().next().removeClass('hidden-xs');
    });
  }
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