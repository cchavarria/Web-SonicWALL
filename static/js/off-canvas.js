//append off canvas content
getLocalizedContent("LabelBack").done(function (data) {
	$('.site-wrapper').after('<div id="off-canvas" class="hidden"><div class="bg-grey border-b-grey p-10"><a class="off-canvas-back"><i class="glyphicon glyphicon-menu-left"></i><span>' + data.LabelBack + '</span></a></div><div class="off-canvas-content"></div></div>');

	$('#off-canvas').on('click', '.off-canvas-back', function (e) { //off canvas back button
		e.preventDefault();
		$('.site-wrapper').removeClass('hidden');
		var body = $('body'), offCanvas = $('#off-canvas'), top = offCanvas.data('top');

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

			body.trigger('offcanvas.hidden');
		}, 500);

		$('.site-wrapper').css('height','');
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
		.data('target', target)
		.data('top', top)
		.find('.off-canvas-content')
		.html($(target).children());

	//Append additional element at the end of the offcanvas element.
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

	$('#off-canvas').removeClass('hidden');
	$('.site-wrapper').addClass('hidden'); // Fix to prevent white space at the bottom of off-canvas sections

	$('body').addClass('off-canvas-mode');

	setTimeout(function() {
		$('#off-canvas').css({top: 0, height: ''});
		window.scrollTo(0, 0);

		$(target).trigger('offcanvas-show');

		setTimeout(function () {
			resizeFourColumnFilmstripCarousel('#off-canvas');
			slickPlugin('#off-canvas');
			loadOoyala('#off-canvas');

			if($('.comparison').length){
				if(typeof processComparison == 'function') {
					processComparison('#off-canvas');
				}
				else {
					$.getScript('/static/js/comparison.min.js');
				}
			}

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

						var panelTitleAnchorElem = $(this).find('.panel-title').find('a');

						if(panelTitleAnchorElem.length && !panelTitleAnchorElem.hasClass('hidden-xs')) {
							panelTitleAnchorElem.addClass('hidden-xs');
							$('<span class="visible-xs-inline">' + panelTitleAnchorElem.text() + '</span>').insertAfter(panelTitleAnchorElem);
						}

						$(this).find('.panel-title').wrapInner('<a data-toggle="collapse" data-parent="#' + parentID + '" href="#' + id + '" aria-expanded="false" class="collapsed">');
						$(this).find('.panel-body').wrap('<div id="' + id + '" class="collapse" aria-expanded="false">');
					});
				});

				//$('#off-canvas').find('.panel').find('.collapse').collapse();
				$('#off-canvas').find('.collapse').collapse({parent: '#'+parentID}).collapse('hide');
			}

			matchHeight();
		}, 450);
	}, 500);
});

//Off canvas resize
addResize(function () {
	var offCanvas = $('#off-canvas');

	if (offCanvas.is(':visible')) {
		if (pageWidth >= 768) {
			offCanvas.find('.off-canvas-back').trigger('click');
		}
	}
	else {
		//Note: Not sure what this actually does. Need to find out.
		$('body').find('[data-toggle=show],[data-toggle=show-offcanvas]').each(function () {
			var target = $($(this).data('target'));

			target.addClass(target.data('hidden-class'));
		});
	}
});