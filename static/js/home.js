var resizeTimer = null;
$(document).ready(function() {
	//randomize banner
	randomizeBanner();

	//lazy load banner images
	$('.hero-banner .carousel').find('.lazy').each(function () {
		$(this).attr('src', $(this).data('original')).removeClass('lazy');
	});

	if ($('html').hasClass('ie8')) {
		$('.resources img, .icon-headline img').each(function () {
			if($(this).hasClass('scale-32')){
				$(this).removeClass('scale-32').css('padding','17px 10px 0 0');
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

	// case study section hover effect
	$('.logos  a  img').hover(function () {
		var srcOver = $(this).attr('src').replace(/-gray.png/, '-color.png');
		$(this).attr('src', srcOver);
	}, function () {
		var srcOut = $(this).attr('src').replace(/-color.png/, '-gray.png');
		$(this).attr('src', srcOut);
	});
	//read more in product line
	$('.show-more').on('click',function(){
		$(this).removeClass('visible-xs inline').addClass('hidden-xs').next().removeClass('hidden-xs');
	});

	resizeHome();
});

addResize('resizeHome');

function resizeHome() {
	pageWidth = $('html').width();

	if (pageWidth >= 992) {//desktop
		$('.screenshot-carousel').each(function () {
			if ($(this).hasClass('logos')) {
				$(this).slidePagination2('destroy');
			}
			else {
				$(this).slidePagination2({
					list: '.screenshot-carousel-list',
					column: 3,
					row: 2,
					random: true,
					pagination: [
						{type: 'append', selector: '.features-headline'},
						{type: 'append', selector: '.screenshot-carousel-wrapper', displayTotal: true}
					]
				});
			}
		});
	}
	else if (pageWidth >= 768 && pageWidth < 992) {//tablet
		$('.screenshot-carousel').each(function () {
			if ($(this).hasClass('logos')) {
				$(this).slidePagination2('destroy');
			}
			else {
				$(this).slidePagination2({
					list: '.screenshot-carousel-list',
					column: 2,
					row: 2,
					random: true,
					pagination: [
						{type: 'append', selector: '.features-headline'},
						{type: 'append', selector: '.screenshot-carousel-wrapper', displayTotal: true}
					]
				});
			}
		});
	}
	else if (pageWidth < 768) {//mobile
		$('.screenshot-carousel .btn-default').attr('style', 'display: block !important');
		$('.screenshot-carousel').each(function () {
			if ($(this).hasClass('logos')) {
				$(this).slidePagination2({
					list: '.logos-list',
					column: 1,
					row: 1,
					pagination: [
						{type: 'prepend', selector: '.carousel-xs'}
					]
				});

			}
			else {
				$(this).slidePagination2('destroy');
				$(this).find('.screenshot-carousel-list').find('li').show();
				$(this).find('.screenshot-carousel-list').find('li:gt(2)').hide();
			}
		});

		$('.btn-link').removeClass('btn-link').addClass('btn-default');
	}
}
function randomizeBanner() {
	var randomNumber = Math.floor((Math.random() * $('.item').length));
	$('.item').eq(randomNumber).addClass("active");
	$('.hero-banner .carousel-indicators li').eq(randomNumber).addClass("active");
}

$.getScript('/Static/Library/jQuery/jquery.lazyload.min.js', function () {
	$(document).ready(function () {
		$("img.lazy").lazyload();
	});
});