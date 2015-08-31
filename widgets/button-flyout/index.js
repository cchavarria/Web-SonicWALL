$(function () {
  if ($('#button-flyout').length) {
		var flyout = $('#button-flyout');

		flyout.prependTo('body');

		addResize(function() {
			flyout.removeClass('init');

			if(flyout.find('> a.visible-md').is(':visible')) {
				flyout.css({
					bottom: 'auto'
				}).find('> a.visible-md').css({
					top: flyout.offset().top - flyout.find('> a:visible').offset().top,
					left: -1 * flyout.find('> a:visible').outerHeight()
				});
			}
			else {
				flyout.css({
					bottom: -1 * flyout.outerHeight()
				});
			}

			flyout.addClass('init');
		}, true);
		
    flyout.on('click', '> a', function (e) {
      e.preventDefault();

      if (parseInt($('#button-flyout').css('right')) != 0) {
				$('#button-flyout').addClass('open');
      }
			else {
				$('#button-flyout').removeClass('open');
      }
    });

		$('#button-flyout').on('click', '.close', function () {
			$('#button-flyout').removeClass('open');
		});
  }
});