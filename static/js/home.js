$(document).ready(function () {
	if ($('html').hasClass('ie8')) {
		$('.resources img, .icon-headline img').each(function () {
			if ($(this).hasClass('scale-32')) {
				$(this).removeClass('scale-32').css('padding', '17px 10px 0 0');
			}
			var newSource = $(this).attr('src').replace('svg', 'png');
			$(this).attr('src', newSource);
		});
	}

	$('.screenshot-carousel .btn-default').on('click', function () {
		$('.screenshot-carousel ul li:nth-child(3) .polaris-divider').attr('style', 'display: block !important');

		for (var i = 3; i < 9; i++) {//hide from child 4
			$('.screenshot-carousel ul li').eq(i).toggle();
		}

		$('.screenshot-carousel .btn-default').attr('style', 'display: none !important');
	});


	//read more in product line
	$('.show-more').on('click', function () {
		$(this).removeClass('visible-xs inline').addClass('hidden-xs').next().removeClass('hidden-xs');
	});

	if($.fn.slidePagination2) {
		resizeHome();
	}
	else {
		$.getScript('/static/library/jQuery/jquery.slidepagination.min.js', function() {
			resizeHome();
		});
	}
});

addResize('resizeHome');

function resizeHome() {
	if (pageWidth >= 992) {//desktop
		$('.screenshot-carousel').each(function () {
			if (!$(this).hasClass('logos')) {
				$(this).slidePagination2({
					list: '.screenshot-carousel-list',
					column: 3,
					row: 2,
					random: true,
					pagination: [
						{ type: 'append', selector: '.features-headline' },
						{ type: 'append', selector: '.screenshot-carousel-wrapper', displayTotal: true }
					]
				});
			}
		});
		// case study section hover effect
		$('.logos  a  img').hover(function () {
			var srcOver = $(this).attr('src').replace(/-gray.png/, '-color.png');
			$(this).attr('src', srcOver);
		}, function () {
			var srcOut = $(this).attr('src').replace(/-color.png/, '-gray.png');
			$(this).attr('src', srcOut);
		});
		//show color logos in mobile
		setLogosColor('desktop');
	}
	else if (pageWidth >= 768 && pageWidth < 992) {//tablet
		$('.screenshot-carousel').each(function () {
			if (!$(this).hasClass('logos')) {
				$(this).slidePagination2({
					list: '.screenshot-carousel-list',
					column: 2,
					row: 2,
					random: true,
					pagination: [
						{ type: 'append', selector: '.features-headline' },
						{ type: 'append', selector: '.screenshot-carousel-wrapper', displayTotal: true }
					]
				});
			}
		});
		//show color logos in mobile
		setLogosColor('tablet');
	}
	else if (pageWidth < 768) {//mobile
		$('.screenshot-carousel .btn-default').attr('style', 'display: block !important');
		$('.screenshot-carousel').each(function () {
			if (!$(this).hasClass('logos')) {
				$(this).slidePagination2('destroy');
				$(this).find('.screenshot-carousel-list').find('li').show();
				$(this).find('.screenshot-carousel-list').find('li:gt(2)').hide();
			}
		});

		$('.btn-link').removeClass('btn-link').addClass('btn-default');
		//show color logos in mobile
		setLogosColor('mobile');
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