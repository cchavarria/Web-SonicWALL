//append off canvas content
getLocalizedContent("LabelBack").done(function (data) {
	$('.site-wrapper').after('<div id="off-canvas" class="hidden"><div class="bg-grey border-b-grey p-10"><a class="off-canvas-back"><i class="glyphicon glyphicon-menu-left"></i><span>' + data.LabelBack + '</span></a></div><div class="off-canvas-content"></div></div>');

	$('#off-canvas').on('click', '.off-canvas-back', function (e) { //off canvas back button
		e.preventDefault();

		var body = $('body'), offCanvas = $('#off-canvas'), top = offCanvas.data('top');

		/*body.css('left', -1 * pageWidth);
		offCanvas.css('left', '100%');

		$('.site-wrapper').show();

		$('html, body').scrollTop(offCanvas.data('top'));
		offCanvas.css('top', offCanvas.data('top'));

		body.animate({left: 0}, 500, function () {
			if(offCanvas.data('appendElem') !== undefined) {
				offCanvas.data('appendElem').remove().removeData('appendElem');
			}

			if(offCanvas.find('.panel-group-collapsible-xs').length) {
				offCanvas.find('.panel-group-collapsible-xs').each(function() {
					$(this).find('.panel').each(function() {
						$(this).find('.panel-title').find('> a').children().unwrap();
						$(this).find('.panel-body').unwrap();
					});
				});
			}

			$(offCanvas.data('target')).html(offCanvas.find('.off-canvas-content').children());
			body.removeClass('off-canvas-mode');

			offCanvas.css('top', 0);

			body.trigger('offcanvas.hidden');
		});*/

		//$('#off-canvas').css({top: top});
		//window.scrollTo(0, top);

		$('body').removeClass('off-canvas-mode');

		//transitionEnd('body', function() {
		setTimeout(function() {
			$('#off-canvas').addClass('hidden');

			if(offCanvas.data('appendElem') !== undefined) {
				offCanvas.data('appendElem').remove().removeData('appendElem');
			}

			if(offCanvas.find('.panel-group-collapsible-xs').length) {
				offCanvas.find('.panel-group-collapsible-xs').each(function() {
					$(this).find('.panel').each(function() {
						$(this).find('.panel-title').find('> a').children().unwrap();
						$(this).find('.panel-body').unwrap();
					});
				});
			}

			$(offCanvas.data('target')).html(offCanvas.find('.off-canvas-content').children());

			$('html, body').animate({scrollTop: $('#off-canvas').data('top')});
			//offCanvas.css('top', 0);

			body.trigger('offcanvas.hidden');
		}, 500);
		//});
	});
});

$('body').on('click', '[data-toggle=offcanvas],[data-toggle=show-offcanvas]', function (e) {
	//perform off canvas, Off canvas is only available on mobile device
	if (pageWidth >= 768) {
		return true;
	}

	e.preventDefault();

	var target = ($(this).data('target') === undefined) ? $(this).attr('href') : $(this).data('target'), top = window.scrollY;

	//Detect changes that was made by Affix. Should be removed later.
	if($(target + '_old').length) {
		target += '_old';
	}

	$('#off-canvas')
		//.css('top', top)
		.data('target', target)
		.data('top', top)
		.find('.off-canvas-content')
		.html($(target).children());

	if($(this).data('offcanvas-append')) {
		var appendElem = $($(this).data('offcanvas-append')).clone().children();

		appendElem.insertAfter($('#off-canvas').find('.off-canvas-content'));
		$('#off-canvas').data('appendElem', appendElem);
	}

	$('body').trigger('offcanvas.visible');

	var offCanvasContent = $('#off-canvas').find('.off-canvas-content');

	if ($(target).data('no-border') && $(target).data('no-border') === true) {
		offCanvasContent.addClass('p-0');
	}
	else {
		offCanvasContent.removeClass('p-0');
	}

	//console.log(top);

	var offCanvasHeight = $('#off-canvas').removeClass('hidden').height(), siteWrapperHeight = $('.site-wrapper').height();

	if(offCanvasHeight < siteWrapperHeight) {
		$('#off-canvas').css('height', siteWrapperHeight);
	}

	$('#off-canvas').removeClass('hidden');
	//$('#off-canvas').css({top: top});
	//window.scrollTo(0, top);

	$('body').addClass('off-canvas-mode');

	//transitionEnd('body', function() {
	setTimeout(function() {
		$('#off-canvas').css({top: 0, height: ''});
		window.scrollTo(0, 0);
		$(target).trigger('offcanvas-show');

		setTimeout(function () {
			resizeFourColumnFilmstripCarousel('#off-canvas');
			slickPlugin('#off-canvas');
			loadOoyala('#off-canvas');
			processComparison('#off-canvas');

			if($('#off-canvas').find('.panel-group-collapsible-xs').length) {
				var parentID = getRandomString(8);

				if($('#off-canvas').find('.panel-group-collapsible-xs').attr('id') === undefined) {
					$('#off-canvas').find('.panel-group-collapsible-xs').attr('id', parentID);
				}
				else {
					parentID = $('#off-canvas').find('.panel-group-collapsible-xs').attr('id');
				}

				$('#off-canvas').find('.panel-group-collapsible-xs').each(function() {
					$(this).find('.panel').each(function() {
						var id = getRandomString(8);

						$(this).find('.panel-title').wrapInner('<a data-toggle="collapse" data-parent="#' + parentID + '" href="#' + id + '" aria-expanded="false" class="collapsed">');
						$(this).find('.panel-body').wrap('<div id="' + id + '" class="collapse" aria-expanded="false">');
					});
				});

				//$('#off-canvas').find('.panel').find('.collapse').collapse();
				$('#off-canvas').find('.collapse').collapse({parent: '#'+parentID}).collapse('hide');
			}
		}, 250);
	}, 500);
	//});

	//$('#off-canvas').css({left: pageWidth}).animate({left: 0}, 500);

	/*$('body').addClass('off-canvas-mode').animate({left: -1 * pageWidth}, 500, function () {
		$('.site-wrapper').hide();
		$('#off-canvas').css('top', 0);
		$(document).scrollTop(0);

		$('body').css('left', 0);
		$('#off-canvas').css('left', 0);

		$(target).trigger('offcanvas-show');

		setTimeout(function () {
			resizeFourColumnFilmstripCarousel('#off-canvas');
			slickPlugin('#off-canvas');
			loadOoyala('#off-canvas');

			if($('#off-canvas').find('.panel-group-collapsible-xs').length) {
				var parentID = getRandomString(8);

				if($('#off-canvas').find('.panel-group-collapsible-xs').attr('id') === undefined) {
					$('#off-canvas').find('.panel-group-collapsible-xs').attr('id', parentID);
				}
				else {
					parentID = $('#off-canvas').find('.panel-group-collapsible-xs').attr('id');
				}

				$('#off-canvas').find('.panel-group-collapsible-xs').each(function() {
					$(this).find('.panel').each(function() {
						var id = getRandomString(8);

						$(this).find('.panel-title').wrapInner('<a data-toggle="collapse" data-parent="#' + parentID + '" href="#' + id + '" aria-expanded="false" class="collapsed">');
						$(this).find('.panel-body').wrap('<div id="' + id + '" class="collapse" aria-expanded="false">');
					});
				});

				//$('#off-canvas').find('.panel').find('.collapse').collapse();
				$('#off-canvas').find('.collapse').collapse({parent: '#'+parentID}).collapse('hide');
			}
		}, 100);
	});*/
});

//Off canvas resize
addResize(function () {
	var offCanvas = $('#off-canvas');

	if (offCanvas.is(':visible')) {
		if(offCanvas.data('appendElem') !== undefined) {
			offCanvas.data('appendElem').remove().removeData('appendElem');
		}

		offCanvas.removeData('appendElem');

		$(offCanvas.data('target')).html(offCanvas.find('.off-canvas-content').children());
		$('body').removeClass('off-canvas-mode');
	}
	else {
		$('body').find('[data-toggle=show],[data-toggle=show-offcanvas]').each(function () {
			var target = $($(this).data('target'));

			target.addClass(target.data('hidden-class'));
		});
	}
});