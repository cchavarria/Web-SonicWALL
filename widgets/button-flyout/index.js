$(function () {
  if ($('#button-flyout').length) {
    var buttonFlyout = $('#button-flyout');

		buttonFlyout.find('> div').css({height: 'auto', width: 'auto'});
		buttonFlyout.data('width', buttonFlyout.find('> div').outerWidth(true));
		//buttonFlyout.find('> div').css('height', buttonFlyout.find('> div').outerHeight(true));
		buttonFlyout.css({'right': -1 * buttonFlyout.find('> div').outerWidth(true)});

    buttonFlyout.on('click', '> a', function (e) {
      e.preventDefault();

      if (parseInt($('#button-flyout').css('right')) != 0) {
				$('#button-flyout').css('right', 0);
      }
			else {
				//bodyContent.css({width: bodyContent.data('width')});
				$('#button-flyout').css('right', -1 * $('#button-flyout').data('width'));
      }
    });

		$('#button-flyout').on('click', '.close', function () {
			$('#button-flyout').css('right', -1 * $('#button-flyout').data('width'));
		});
  }
});

function hideButtonFlyoutContent(w) {
  if (pageType > 1) {
    $('#button-flyout').animate({
      right: -w
    }, 500);
  }
	else {
    $('#button-flyout').animate({bottom: - $('#button-flyout').outerHeight()}, 500);
  }

  $('#button-flyout').data('visible', false);
}

function showButtonFlyoutContent() {
  if (pageType > 1) {
    $('#button-flyout').animate({right: 0}, 500);
  }
	else{
    $('#button-flyout').animate({bottom: 0}, 500);
  }
  $('#button-flyout').data('visible', true);
}
