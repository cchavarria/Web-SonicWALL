$(document).ready(function() {
	slickResize();
});

addResize('slickResize');

function slickResize() {
	if($('.slick').length) {
		if($.fn.slick) {
			init();
		}
		else {
			$('head').append('<link rel="stylesheet" type="text/css" href="/static/css/slick.min.css">');
			$.getScript('/static/library/jQuery/slick-1.5.7/slick.min.js').done(init);
		}
	}

	function init() {
		var defaults = {
			arrows: true,
			infinite: false,
			slidesToShow: 3,
			slidesToScroll: 1
		};

		$('.slick').each(function() {
			var cfg = defaults;

			if(pageType == 0) {
				cfg.slidesToShow = 1;
			}
			else if(pageType == 1) {
				cfg.slidesToShow = 2;
			}
			else if(pageType == 2) {
				cfg.slidesToShow = 3;
			}
			else if(pageType == 3) {
				cfg.slidesToShow = 3;
			}

			if($(this).hasClass('slick-initialized')) {
				$(this).slick('destroy');
			}

			$(this).slick(cfg);
		});
	}
}