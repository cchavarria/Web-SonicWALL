$(function () {
  if ($('.button-flyout').length) {
    var buttonFlyout = $('.button-flyout');

		buttonFlyout.find('> div').css({height: 'auto', width: 'auto'});
		buttonFlyout.find('> div').data('width', buttonFlyout.find('> div').outerWidth(true));
		buttonFlyout.find('> div').css('height', buttonFlyout.find('> div').outerHeight(true));
		buttonFlyout.find('> div').css({width: 0});

    $('.button-flyout').on('click', '> a', function (e) {
      e.preventDefault();

      var bodyContent = $(this).parent().find('> div');

      if (bodyContent.is(':visible')) {
				bodyContent.css({width: 0});
      }
			else {
				bodyContent.css({width: bodyContent.data('width')});
      }
    });

		$('.button-flyout').on('click', '.close', function () {
			$(this).parent().parent().css({height: 0, width: 0});
		});
  }
});

function hideButtonFlyoutContent(w) {
  if (pageType > 1) {
    $('.button-flyout').animate({
      right: -w
    }, 500);
  }
	else {
    $('.button-flyout').animate({bottom: - $('.button-flyout').outerHeight()}, 500);
  }

  $('.button-flyout').data('visible', false);
}

function showButtonFlyoutContent() {
  if (pageType > 1) {
    $('.button-flyout').animate({right: 0}, 500);
  }
	else{
    $('.button-flyout').animate({bottom: 0}, 500);
  }
  $('.button-flyout').data('visible', true);
}
