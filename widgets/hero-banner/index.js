$(function() {
  $("img.lazy").lazyload();

  //randomize banner
  randomizeBanner();

  //lazy load banner images
  $('.hero-banner').find('.carousel').find('.lazy').each(function () {
    $(this).attr('src', $(this).data('original')).removeClass('lazy');
  });

  resizeHome();
});

addResize('resizeHome');

function resizeHome() { // I have questions regarding this one
	var captionHeight = '';

	if(pageWidth < 768) {
		captionHeight = 0;

		$('.hero-banner').find('.caption-wrapper').each(function() {
			var isHidden = false, tmpHeight = 0;

			if($(this).is(':hidden')) {
				isHidden = true;
				$(this).parents('.item').css('display', 'block');
			}

			tmpHeight = $(this).outerHeight(true);

			if(captionHeight < tmpHeight) {
				captionHeight = tmpHeight;
			}

			if(isHidden) {
				$(this).parents('.item').css('display', '');
			}
		});
	}

	$('.hero-banner').find('.caption-wrapper').css('height', captionHeight);
}

function randomizeBanner() {
  var randomNumber = Math.floor((Math.random() * $('.item').length));
  $('.item').eq(randomNumber).addClass("active");
  $('.hero-banner .carousel-indicators li').eq(randomNumber).addClass("active");
}