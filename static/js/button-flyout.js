(function () {
	//Cannot dynamically load CSS because of IE 8 issue along with Respond.js.
	//$('head').append('<link rel="stylesheet" type="text/css" href="/static/css/button-flyout.min.css">');

	var flyout = $('#button-flyout');

	//Move flyout position in the DOM structure.
	flyout.prependTo('body');

	if($('#button-flyout').data('prevent-init') === undefined || $('#button-flyout').data('prevent-init') == false) {
		addResize(function () {
			flyout.removeClass('init');

			if (flyout.find('> a.visible-sm').is(':visible')) {
				flyout.find('> a:visible').css('top', 'auto');

				flyout.css({
					bottom: 'auto'
				});

				if ($('html').hasClass('ie8')) {
					flyout.find('> a.visible-sm').css({
						top: flyout.offset().top - flyout.find('> a:visible').offset().top,
						left: -1 * flyout.find('> a:visible').outerWidth()
					});
				}
				else {
					flyout.find('> a.visible-sm').css({
						top: flyout.offset().top - flyout.find('> a:visible').offset().top,
						left: -1 * flyout.find('> a:visible').outerHeight()
					});
				}
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

		flyout.on('click', '.close', function () {
			$('#button-flyout').removeClass('open');
		});
	}

})();