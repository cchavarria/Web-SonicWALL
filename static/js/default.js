/* Used on Responsive New Header/Footer */

var burl = location.href;

$(document).ready(function () {
	//Social media toolbar
	if ($('.social-media-toolbar').length) {
		socialMediaToolbar();
	}

	//Off Canvas
	offCanvas();

	//Toggle Show/Hide
	$('body').on('click', '[data-toggle=show],[data-toggle=show-offcanvas]', function () {
		var target = $($(this).data('target'));

		if (pageWidth < 768) {
			return false;
		}
		//close all open dropdowns
		$('.optional-dropdown').each(function () {
			if ($(this).is(':visible') && !target.is(':visible')) {
				$(this).hide().data('hidden-class', 'hidden');
			}
		});

		if (target.is(':visible')) {
			if (target.data('hidden-class')) {
				target.addClass(target.data('hidden-class'));
			}
			else {
				target.hide();
			}

			target.css({top: ''});
		}
		else {
			if (target.hasClass('hidden')) {
				target.data('hidden-class', 'hidden');
				target.removeClass('hidden');
			}
			else {
				target.show();
			}

			//Reset
			$(target).css('top', '').css('marginBottom', '');

			//adjust triangle position based on source element
			if ($(target).find('.triangle-top').length) {
				var top = -1 * ($(target).offset().top - $(this).offset().top - $(this).outerHeight(true) - 11);

				$(target)
					.css({
						'top': top,
						'marginBottom': top
					})
					.find('.triangle-top').css('left', $(this).offset().left + $(this).width() / 2 + 8);
			}

			processEllipsis(target);
		}
	});

	//Workaround for placeholder on unsupported browser
	(function () {
		var test = document.createElement('input');
		if (!('placeholder' in test)) {
			if ($.fn.placeholder) {
				$('input').placeholder();
			}
			else {
				$.getScript('/static/library/jQuery/jquery.placeholder.min.js', function () {
					$('input').placeholder();
				});
			}
		}
	})();

	if ($('form').filter('.has-slide').length) {
		$.getScript('/static/js/events.min.js');
	}

	//Dotdotdot
	processEllipsis();

	//LazyLoad
	if ($.fn.lazyload) {
		$('img.lazy').lazyload();
	}
	else {
		$.getScript('/static/library/jQuery/jquery.lazyload.min.js', function () {
			$('img.lazy').lazyload();
		});
	}

	//Hero Banner
	if ($('.hero-banner').length) {
		//Randomize banner
		var randomNumber = Math.floor((Math.random() * $('.item').length));
		$('.item').eq(randomNumber).addClass("active");
		$('.hero-banner .carousel-indicators li').eq(randomNumber).addClass("active");

		$('.hero-banner .carousel').find('.lazy').each(function () {
			$(this).attr('src', $(this).data('original')).removeClass('lazy');
		});
	}

	//Resizing Fat Tabs
	addResize(function () {
		if (pageWidth < 768) {//mobile
			try {
				$('.fat-tabs').tabs('destroy');
			}
			catch (e) {

			}
		}
		else {
			$('.fat-tabs').tabs({
				activate: function (event, ui) {
					ui.newPanel.trigger('tab.visible');
					ui.oldPanel.trigger('tab.hidden');

					resizeFourColumnFilmstripCarousel(ui.newPanel);
					loadOoyala(ui.newPanel);
				}
			});
		}

		$(window).load(function () {
			//Remove site catalyst on click attribute on achor tag.
			$('.fat-tabs').find('> ul').find('a').each(function () {
				$(this).prop('onclick', null);
			});
		});
	}, true);

	//Ooyala player popup
	$('body').on('click', '.ooplaylist', function (e) {
		e.preventDefault();

		var width = 642,
			title = '',
			config = $.parseJSON($(this).data('config').replace(/'/g, '"')),
			content = '';

		if (typeof config.title != 'undefined') {
			title = config.title;
		}
		else {
			title = $(this).text();
		}

		if (typeof config.description == 'undefined') {
			config.description = '';
		}

		title = encodeURIComponent(title);

		if (typeof config.playlist == 'string') {
			width = 861;

			content = '<iframe id="oo-popup-content" src="/hidden/ooyala-iframe.htm?playlist=' + config.playlist + '" width="' + width + '" height="407" frameborder="0" scrolling="no"></iframe>';
		}
		else {
			content = '<iframe id="oo-popup-content" src="/hidden/ooyala-iframe.htm?ooyala=' + config.ooyala + '&autoplay=' + config['autoplay'] + '&3Play=' + config['3Play'] + '&title=' + title + '&desc=' + encodeURIComponent(config.description) + '&url=' + config.url + '" width="' + width + '" height="407" frameborder="0" scrolling="no"></iframe>';
		}

		if ($('body').data('modal-appended') == false || $('body').data('modal-appended') == undefined) {
			var modalContent =
				'<div class="modal fade" id="oomodal" tabindex="-1" role="dialog">' +
				'<div class="modal-dialog" role="document">' +
				'<div class="modal-content">' +
				'<div class="modal-header">' +
				'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
				'<div>' +
				'<div class="modal-body">' +
				content +
				'</div>' +
				'</div>' +
				'</div>' +
				'</div>';
			$('body').append(modalContent);
			$('body').data('modal-appended', 'true');
		}
		$('.ooplaylist').modal();
	});

	$('body').on('offcanvas.visible', function () {
		var ooyalaplayer = $('.off-canvas-content').find('.ooyalaplayer');
		if (ooyalaplayer.length && !ooyalaplayer.data('loaded')) {
			OO.Player.create(ooyalaplayer.attr('id'), ooyalaplayer.data('videoid'), {
				onCreate: OOCreate,
				autoplay: false,
				wmode: 'transparent'
			});
			ooyalaplayer.data('loaded', true);
		}
	});


	//Toggle
	$('body').find('[data-toggle=show],[data-toggle=show-offcanvas]').each(function () {
		var target = $($(this).data('target'));

		if (target.is(':visible')) {
			if (target.data('hidden-class')) {
				target.addClass(target.data('hidden-class'));
			}
			else {
				target.hide();
			}
		}
	});

	//close button in optional dropdown
	$('body').on('click', '.close', function () {
		var closeTarget = $(this).parents('#' + $(this).data('target'));
		if (closeTarget.length && closeTarget != undefined) {
			closeTarget.addClass('hidden');
		}
	});

	addResize('resizeFourColumnFilmstripCarousel', true);
	addResize('grayscaleImage', true);
	loadOoyala();

	/*addResize(function() {
	 $('img').each(function(i) {
	 if($(this).data('src-' + pageTypeLabel)) {
	 $(this).data('src', $(this).attr('src')).attr('src', $(this).data('src-' + pageTypeLabel));
	 }
	 else if($(this).data('src')) {
	 $(this).attr('src', $(this).data('src'));
	 }
	 });
	 }, true);*/

	//Slick Plugin
	addResize(function () {
		if ($('.slick').length) {
			if ($.fn.slick) {
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
				slidesToShow: 4,
				slidesToScroll: 1
			};

			$('.slick').each(function () {
				var cfg = defaults;

				if ($(this).data('active') == 'xs-only' && pageType != 0) {
					if ($(this).hasClass('slick-initialized')) {
						$(this).slick('unslick');
					}

					return true;
				}

				if (pageType == 0) {
					cfg.slidesToShow = 1;
				}
				else if (pageType == 1) {
					cfg.slidesToShow = $(this).data('slide-sm') || 3;
				}
				else if (pageType == 2) {
					cfg.slidesToShow = $(this).data('slide-md') || 4;
				}
				else if (pageType == 3) {
					cfg.slidesToShow = $(this).data('slide-lg') || 4;
				}

				if ($(this).hasClass('slick-initialized')) {
					$(this).slick('destroy');
				}

				if ($(this).find('> div').length > cfg.slidesToShow) {
					$(this).on('init', function () {
						var arrowsPos = 0, firstImage = $('.slick').find('img:first');

						if (firstImage.parent().hasClass('img-crop')) {
							arrowsPos = firstImage.parent().height() / 2 - 30;
						}
						else {
							arrowsPos = firstImage.height() / 2 - 30;
						}

						$(this).find('.slick-arrow').css('top', arrowsPos);
					});

					$(this).slick(cfg);
				}
			});
		}
	}, true);

	if ($('#affix-nav').length) {
		addResize('resizeAffix', true);
	}

	//Button Flyout
	if ($('#button-flyout').length) {
		$.getScript('/static/js/button-flyout.min.js');
	}

	//Stacking containers to expose margin. bleeding.
	/*addResize(function() {
		$('.container').each(function() {
			var children = $(this).children(), lastChild = children.length - 1;

			//Start Reset
			$(this).css('marginTop', '');
			$(children[0]).css('marginTop', '');

			$(this).css('marginBottom', '');
			$(children[lastChild]).css('marginBottom', '');
			//End Reset

			var marginTop = parseInt($(children[0]).css('marginTop')),
				marginBottom = parseInt($(children[lastChild]).css('marginBottom'));

			if(marginTop) {
				$(this).css('marginTop', marginTop + parseInt($(this).css('marginTop')));
				$(children[0]).attr('style', 'margin-top: 0px !important;');
			}

			if(marginBottom) {
				$(this).css('marginBottom', marginBottom + parseInt($(this).css('marginBottom')));

				var style = (lastChild ? '':$(children[lastChild]).attr('style'));

				if(style === undefined) {
					style = '';
				}

				$(children[lastChild]).attr('style', style + 'margin-bottom: 0px !important;');
			}
		});
	}, true);*/
});

//Off canvas resize
addResize(function () {
	if ($('#off-canvas').is(':visible')) {
		$('.site-wrapper').show();

		$($('#off-canvas').data('target')).html($('#off-canvas').find('.off-canvas-content').children());
		$('body').removeClass('off-canvas-mode');
	} else {
		$('body').find('[data-toggle=show],[data-toggle=show-offcanvas]').each(function () {
			var target = $($(this).data('target'));
			target.addClass(target.data('hidden-class'));
		});
	}
});

//Flex box degradation
addResize(function () {
	if (document.readyState == 'complete') {
		processFlex();
	}
	else {
		$(window).load(function () {
			processFlex();
		});
	}
}, true);

function processFlex() {
	if ($('.vertical-center').length && !$('html').hasClass('flexbox')) {
		$('.vertical-center').each(function () {
			if (!$(this).data('flex-processed')) {
				var height = $(this).height(),
					width = $(this).outerWidth(),
					child = $(this).children(),
					centerHorizontal = $(this).hasClass('horizontal-center');

				//Should only have 1 children. Multiple children might not work.
				child.each(function () {
					if ($(this).css('display') == 'block') {
						$(this).css('display', 'inline-block');
					}

					$(this).css({
						paddingTop: Math.floor((height - $(this).height()) / 2)
					});

					if (centerHorizontal) {
						$(this).css({
							paddingLeft: Math.floor((width - $(this).outerWidth()) / 2)
						});
					}
				});

				$(this).data('flex-processed', true);
			}
		});
	}
}

function processEllipsis(parentSelector) {
	if (typeof parentSelector == 'undefined') {
		parentSelector = 'body';
	}

	//Dotdotdot
	if ($('.dotdotdot').length) {
		if ($.fn.dotdotdot) {
			init();
		}
		else {
			$.getScript('/static/library/jQuery/jquery.dotdotdot.min.js', function () {
				init();
			});
		}
	}

	function init() {
		$(parentSelector).find('.dotdotdot').filter(':visible').each(function () {
			var oneLineHeight = 0, options = {}, content = '', proceed = false;

			//Remove empty paragraph tags.
			$(this).find('p').each(function () {
				if ($(this).html() == '') {
					$(this).remove();
				}
			});

			if ($(this).css('max-height') == 'none') {
				content = $(this).html();

				//Find height of one line.
				$(this).html('<p>.</p>');
				oneLineHeight = parseInt($(this).outerHeight());

				//options.tolerance = Math.ceil(oneLineHeight/4);

				//Restore original content.
				$(this).html(content);

				if ($(this).data('max-line')) { //Used for all breakpoints.
					options.height = $(this).data('max-line') * oneLineHeight;
					proceed = true;
				}

				if (pageWidth >= 1200 && $(this).data('max-line-lg')) {
					options.height = $(this).data('max-line-lg') * oneLineHeight;
					proceed = true;
				}
				else if (pageWidth >= 992 && $(this).data('max-line-md')) {
					options.height = $(this).data('max-line-md') * oneLineHeight;
					proceed = true;
				}
				else if (pageWidth >= 768 && $(this).data('max-line-sm')) {
					options.height = $(this).data('max-line-sm') * oneLineHeight;
					proceed = true;
				}
				else if (pageWidth < 768 && $(this).data('max-line-xs')) {
					options.height = $(this).data('max-line-xs') * oneLineHeight;
					proceed = true;
				}
			}

			if (proceed) {
				if ($(this).data('read-more')) {
					$(this).append('<a class="dotdotdot-read-more" href="javascript:void(0)">Read More <span aria-hidden="true" class="glyphicon glyphicon-triangle-bottom"></span></a>');
					options.after = '.dotdotdot-read-more';
				}

				$(this).dotdotdot(options);

				if ($(this).triggerHandler('isTruncated')) {
					$(this).on('click', '.dotdotdot-read-more', function (e) {
						var p = $(this).parents('.dotdotdot');
						e.preventDefault();
						p.dotdotdot('destroy');
						p.find('.dotdotdot-read-more').remove();
					});
				}
				else {
					$(this).find('.dotdotdot-read-more').remove();
				}
			}
		});
	}
}

function loadOoyala(parentSelector) {
	if (typeof parentSelector == 'undefined') {
		parentSelector = 'body';
	}

	//var watchList = [];

	if ($(parentSelector).find('.ooyalaplayer').length) {
		if (typeof OO == 'object') {
			init();
		}
		else {
			if (typeof window['OOCreate'] == 'function') {
				loadJS();
			}
			else {
				$('head').append('<link rel="stylesheet" href="/static/css/video-player.min.css">');

				$.getScript('/static/js/video-player.min.js', function () {
					loadJS();
				});
			}
		}
	}

	function loadJS() {
		if ($('html').hasClass('ie9') || $('html').hasClass('ie8')) {
			$.getScript('//player.ooyala.com/v3/9eba220ad98c47cda9fdf6ba82ce607a?callback=receiveOoyalaP3Event', function () {
				init();
			});
		}
		else {
			$.getScript('//player.ooyala.com/v3/9eba220ad98c47cda9fdf6ba82ce607a?platform=html5&callback=receiveOoyalaP3Event',
				function () {
					init();
				});
		}
	}

	function init() {
		OO.ready(function () {

			$(parentSelector).find('.ooyalaplayer').each(function (indx) {
				var id = $(this).attr('id'),
					videoId = $(this).data('videoid');

				if (id === undefined) {
					id = getRandomString(8);
					$(this).attr('id', id);
				}

				if ($(this).is(':visible') && videoId !== undefined) {
					if (!$('#' + id).data('loaded')) {
						var videoHeight = Math.floor(($(this).width() * 9) / 16);

						if ($(this).parent().hasClass('media-player-container')) {
							$(this).css('height', videoHeight);
							$(this).parent().css('height', videoHeight);
						}

						window['ooyala_player_handle_' + indx] = OO.Player.create(id, videoId, {
							onCreate: OOCreate,
							autoplay: false,
							wmode: 'transparent'
						});

						$('#' + id).data('loaded', true);
					}
				}
				else {
					//watchList.push([id, videoId]);
				}
			});
		});
	}

	/*function loadWatch() {
	 $.each(watchList, function (indx, arr) {
	 var elem = prevElem = $('#' + arr[0]);

	 while (!elem.is(':visible')) {
	 prevElem = elem;
	 elem = elem.parent();
	 }

	 prevElem.watch('display', function () {
	 if ($(this).is(':visible') && !$('#' + arr[0]).data('loaded')) {
	 OO.Player.create(arr[0], arr[1], {
	 onCreate: OOCreate,
	 autoplay: false,
	 wmode: 'transparent'
	 });

	 $('#' + arr[0]).data('loaded', true);
	 }
	 });
	 });
	 }*/
}

function resizeFourColumnFilmstripCarousel(parentSelector) {
	if (typeof parentSelector == 'undefined') {
		parentSelector = 'body';
	}

	if ($(parentSelector).find('.screenshot-carousel').length && !$('html').hasClass('home')) {
		if ($.fn.slidePagination2) {
			init();
		}
		else {
			$.getScript('/static/library/jQuery/jquery.slidepagination.min.js', function () {
				init();
			});
		}
	}

	function init() {
		if ($(parentSelector).find('.screenshot-carousel').length) {
			var sliderOptions = {
				list: '> ul',
				column: 4,
				row: 1,
				largeArrow: true,
				pagination: [
					{type: 'prepend', nextArrow: false, align: 'left'},
					{type: 'prepend', prevArrow: false}
				]
			};

			$(parentSelector).find('.screenshot-carousel').each(function () {
				if (!$(this).is(':visible')) {
					return true;
				}

				var options = sliderOptions;

				//Only destroy slide pagination if it has already been generated.
				$(this).slidePagination2('destroy');

				if ($(this).data('large-arrows') == 'true') {
					options.largeArrow = true;
					options.pagination = [
						{type: 'prepend', nextArrow: false, align: 'left'},
						{type: 'prepend', prevArrow: false}
					];
				}

				if ($(this).data('row')) {
					options.row = $(this).data('row');
				}

				if (pageWidth >= 992) {
					if ($(this).data('carousel') === 'xs-only') {
						return true;
					}

					options.column = $(this).data('col') ? $(this).data('col') : 4;
				}
				else if (pageWidth >= 768) { //tablet
					if ($(this).data('carousel') === 'xs-only') {
						return true;
					}

					options.column = $(this).data('col-sm') ? $(this).data('col-sm') : 3;
				}
				else if (pageWidth < 768) { //mobile
					options.column = $(this).data('col-xs') ? $(this).data('col-xs') : 1;
				}

				$(this).slidePagination2(options);
			});
		}
	}
}

function socialMediaToolbar() {
	var bitlyURL = url = location.href;

//If protocol is https find previous page.
	if (location.protocol == 'https:') {
		var pathnameArr = location.pathname.split('/');

		if (/^\?param=/.test(location.search)) {
			pathnameArr[1] = pathnameArr[1].replace(/(.*)t$/, '$1');
			bitlyURL = url = 'https://' + location.host + pathnameArr.join('/');
		}
	}

	if ($('.g-plusone').length) {
		$('.g-plusone').attr('data-href', url);

		//Google+
		(function () {
			var po = document.createElement('script');
			po.type = 'text/javascript';
			po.async = true;
			po.src = '//apis.google.com/js/plusone.js';
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(po, s);
		})();
	}

//Retrieve bit.ly url
	if (window.XMLHttpRequest && !(/\-/.test(location.host))) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "/hidden/bitly.asmx/get?URI=" + encodeURIComponent(url));
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					xml = $($.parseXML(xhr.responseText));
					var obj = jQuery.parseJSON(xml.find("string").text());

					if (typeof obj.data != 'undefined') {
						bitlyURL = obj.data.url;
					}
				}
			}
		}
		xhr.send();
	}

//Interaction when clicking on facebook, twitter and linkedin
	$('.social-media-toolbar').on('click', 'a', function (e) {
		var parent = $(this).parent(), title = document.title;

		if (parent.hasClass('facebook')) {
			if (typeof s == 'object') {
				//s.tl(this, 'o', 'Share-Facebook');
				s.events = "event13";
				s.eVar18 = "Facebook";
				s.linkTrackVars = "events,eVar18";
				s.linkTrackEvents = "event13";
				s.tl(true, 'o', 'Social Media');
			}

			//_gaq.push(['_trackSocial', 'Facebook', 'Share']);

			e.preventDefault();
			window.open('http://www.facebook.com/sharer.php?u=' + encodeURIComponent(url) + '&t=' + encodeURIComponent(title), 'facebook', 'width=480,height=240,toolbar=0,status=0,resizable=1');
		}
		else if (parent.hasClass('twitter')) {
			if (typeof s == 'object') {
				//s.tl(this, 'o', 'Share-Twitter');
				s.events = "event13";
				s.eVar18 = "Twitter";
				s.linkTrackVars = "events,eVar18";
				s.linkTrackEvents = "event13";
				s.tl(true, 'o', 'Social Media');
			}
			//_gaq.push(['_trackSocial', 'Twitter', 'Tweet']);
			//console.log(bitlyURL);
			//console.log(url);

			e.preventDefault();
			window.open('http://twitter.com/share?via=DellSoftware&url=' + encodeURIComponent(bitlyURL) + '&text=' + encodeURIComponent(title) + ',%20&counturl=' + encodeURIComponent(url), 'twitter', 'width=480,height=380,toolbar=0,status=0,resizable=1');
		}
		else if (parent.hasClass('linkedin')) {
			if (typeof s == 'object') {
				//s.tl(this, 'o', 'Share-LinkedIn');
				s.events = "event13";
				s.eVar18 = "LinkedIn";
				s.linkTrackVars = "events,eVar18";
				s.linkTrackEvents = "event13";
				s.tl(true, 'o', 'Social Media');
			}
			//_gaq.push(['_trackSocial', 'LinkedIn', 'Share']);

			e.preventDefault();
			window.open('http://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title), 'linkedin', 'width=480,height=360,toolbar=0,status=0,resizable=1');
		} else if (parent.hasClass('googleshare')) {
			e.preventDefault();
			window.open('https://plus.google.com/share?url=' + encodeURIComponent(location.href), '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
			return false;
		}
	});
}

function offCanvas() {
//append off canvas content
	$('.site-wrapper').after('<div id="off-canvas"><div class="bg-grey border-b-gray p-10"><a class="off-canvas-back"><i class="glyphicon glyphicon-menu-left"></i><span>Back</span></a></div><div class="off-canvas-content"></div></div>');

	$('#off-canvas').on('click', '.off-canvas-back', function (e) { //off canvas back button
		e.preventDefault();

		$('body').css('left', -1 * pageWidth);
		$('#off-canvas').css('left', '100%');

		$('.site-wrapper').show();

		$('body').animate({left: 0}, 500, function () {
			$($('#off-canvas').data('target')).html($('#off-canvas').find('.off-canvas-content').children());
			$('body').removeClass('off-canvas-mode');
			$(document).scrollTop($('#off-canvas').data('top'));

			$('body').trigger('offcanvas.hidden');
		});
	});

	$('body').on('click', '[data-toggle=offcanvas],[data-toggle=show-offcanvas]', function (e) { //perform off canvas, Off canvas is only available on mobile device
		if (pageWidth >= 768) {
			return false;
		}

		e.preventDefault();

		var target = ($(this).data('target') === undefined) ? $(this).attr('href') : $(this).data('target'),
			top = $(document).scrollTop();

		$('#off-canvas').css('top', top).data('target', target).data('top', top).find('.off-canvas-content').html($(target).children());

		$('body').trigger('offcanvas.visible');

		if ($(target).data('no-border') && $(target).data('no-border') === true) {
			$('#off-canvas').find('.off-canvas-content').addClass('p-0');
		}
		else {
			$('#off-canvas').find('.off-canvas-content').removeClass('p-0');
		}

		$('body').addClass('off-canvas-mode').animate({left: -1 * pageWidth}, 500, function () {
			$('.site-wrapper').hide();
			$('#off-canvas').css('top', 0);
			$(document).scrollTop(0);

			$('body').css('left', 0);
			$('#off-canvas').css('left', 0);

			$(target).trigger('offcanvas-show');

			setTimeout(function () {
				resizeFourColumnFilmstripCarousel('#off-canvas');
			}, 100);
		});
	});
}

function grayscaleImage() {
	if ($('.grayscale').length) {
		init('.grayscale');
	}
	if (pageWidth >= 1200 && $('.grayscale-lg').length) {
		init('.grayscale-lg');
	}
	if (pageWidth >= 992 && $('.grayscale-md').length) {
		init('.grayscale-md');
	}
	if (pageWidth >= 768 && $('.grayscale-sm').length) {
		init('.grayscale-sm');
	}
	if ($('.grayscale-xs').length) {
		init('.grayscale-xs');
	}

	function init(className) {
		if (document.readyState == 'complete') {
			execute(className);
		}
		else {
			$(window).load(function () {
				execute(className);
			});
		}
	}

	function execute(className) {
		if ($.fn.gray) {
			setTimeout(function () {
				$(className + ':not(.grayscale-replaced)').gray();
			}, 200);
		}
		else {
			$('head').append('<link rel="stylesheet" href="/static/css/grayscale-image.min.css">');

			$.getScript('/static/library/jQuery/jquery.gray.min.js', function () {
				setTimeout(function () {
					$(className + ':not(.grayscale-replaced)').gray();
				}, 200);
			});
		}
	}
}

function getRandomString(len) {
	var ranString = '',
		alphaLower = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
		alphaUpper = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
		digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
		r, n, ranString;

	for (i = 0; i < len; i++) {
		r = Math.random() * 8;

		if (r >= 0 && r <= 2) {
			n = Math.floor(Math.random() * 25);
			ranString += alphaLower[n];
		}
		else if (r >= 3 && r <= 5) {
			n = Math.floor(Math.random() * 25);
			ranString += alphaUpper[n];
		}
		else if (r >= 6) {
			n = Math.floor(Math.random() * 9);
			ranString += digits[n];
		}
	}

	return ranString;
}

function resizeAffix() {
	var affixID = '#affix-nav',
		affixElem = $(affixID),
		siteWrapper = $('.site-wrapper'),
		body = $('body'),
		affixHeight = affixElem.height();

	if (pageType > 0) {
		//fix for adjusting height of all tabs if we have multiple lines
		affixElem.find('a').each(function () {
			var parentHeight = $(this).parent().outerHeight();

			if (parentHeight < affixHeight) {
				$(this).css('padding-bottom', (affixHeight - parentHeight + parseInt($(this).css('padding-top'))));
			}
		});

		//fix to keep first affix item active when on top of the page
		if (!siteWrapper.attr('id')) {
			var id = affixElem.find('a:first-child').attr('href').substr(1);

			$('#' + id).attr('id', id + '_old');

			siteWrapper.attr('id', affixElem.find('a:first-child').attr('href').substr(1));
		}

		//fix for affix width changing when floating on the page
		affixElem.css("width", affixElem.parents('.container').width());

		//prepend div to fix affix position on bookmarked section
		if (!$('.affix-fix').length) {
			affixElem.find('a:gt(0)').each(function () {
				body.find($(this).attr('href'))
					.prepend('<div class="affix-fix" style="padding-top:' + (affixElem.height() + 10) + 'px; margin-top:'
						+ -(affixElem.height() + 10) + 'px">');
			});
		}

		//trigger scrollspy if it hasn't been triggered already
		if (!body.data('bs.scrollspy')) {
			/*set offset to activate tab based on position*/
			body.scrollspy({target: affixID, offset: affixElem.outerHeight(true) + 10});
		}

		//trigger affix if it hasn't been triggered already
		if (!affixElem.data('bs.affix')) {
			affixElem.affix({
				offset: {
					top: affixElem.offset().top
				}
			});

			//Prevent page jumpiness when using the scrollbar when passing the first bookmark area.
			affixElem.on('affixed.bs.affix', function () {
				$('<div class="affix-dummy">').css('height', $(this).outerHeight(true)).insertAfter(this);
			}).on('affixed-top.bs.affix', function () {
				$(this).next().remove();
			});
		}
	}
	else {
		$('.affix-fix').remove();

		//destroy scrollspy
		body.scrollspy({target: ''});
		affixElem.removeData('bs.scrollspy');

		//destroy affix
		$(window).off('.affix');
		affixElem.removeData('bs.affix').off('affixed.bs.affix').off('affixed-top.bs.affix');

		affixElem.removeClass('affix').removeClass('affix-top');
	}
}
