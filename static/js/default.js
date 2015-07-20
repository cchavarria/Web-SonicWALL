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
	$('body').on('click', '[data-toggle=show]', function () {
		var target = $($(this).data('target'));

		if (target.is(':visible')) {
			if (target.data('hidden-class')) {
				target.addClass(target.data('hidden-class'));
			}
			else {
				target.hide();
			}
		}
		else {
			if (target.hasClass('hidden')) {
				target.data('hidden-class', 'hidden');
				target.removeClass('hidden');
			}
			else {
				target.show();
			}

			var callback = $(this).data('callback');

			if(callback) {
				if(typeof window[callback] == 'function') {
					window[callback].call(this, $(this).data('target'));
				}
			}
		}
	});

//Workaround for placeholder on unsupported browser
	(function () {
		var test = document.createElement('input');
		if (!('placeholder' in test)) {
			if($.fn.placeholder) {
				$('input').placeholder();
			}
			else {
				$.getScript('/static/library/jQuery/jquery.placeholder.min.js', function () {
					$('input').placeholder();
				});
			}
		}
	})();

	if($('form').filter('.has-slide').length) {
		$.getScript('/static/js/events.min.js');
		//eventForm();
	}

//Dotdotdot
	(function() {
		if($('.dotdotdot').length) {
			if($.fn.dotdotdot) {
				init();
			}
			else {
				$.getScript('/static/library/jQuery/jquery.dotdotdot.min.js', function() {
					init();
				});
			}
		}

		function init() {
			$('.dotdotdot').each(function() {
				var oneLineHeight = 0, options = {}, content = '', proceed = false;

				//Remove empty paragraph tags.
				$(this).find('p').each(function() {
					if($(this).html() == '') {
						$(this).remove();
					}
				});

				if($(this).css('max-height') == 'none') {
					content = $(this).html();

					//Find height of one line.
					$(this).html('<p>.</p>');
					oneLineHeight = parseInt($(this).outerHeight());

					//options.tolerance = Math.ceil(oneLineHeight/4);

					//Restore original content.
					$(this).html(content);

					if($(this).data('max-line')) { //Used for all breakpoints.
						options.height = $(this).data('max-line') * oneLineHeight;
						proceed = true;
					}

					if(pageWidth >= 1200 && $(this).data('max-line-lg')) {
						options.height = $(this).data('max-line-lg') * oneLineHeight;
						proceed = true;
					}
					else if(pageWidth >= 992 && $(this).data('max-line-md')) {
						options.height = $(this).data('max-line-md') * oneLineHeight;
						proceed = true;
					}
					else if(pageWidth >= 768 && $(this).data('max-line-sm')) {
						options.height = $(this).data('max-line-sm') * oneLineHeight;
						proceed = true;
					}
					else if(pageWidth < 768 && $(this).data('max-line-xs')) {
						options.height = $(this).data('max-line-xs') * oneLineHeight;
						proceed = true;
					}
				}

				if(proceed) {
					if($(this).data('read-more')) {
						$(this).append('<a class="dotdotdot-read-more" href="javascript:void(0)">Read More <span aria-hidden="true" class="glyphicon glyphicon-triangle-bottom"></span></a>');
						options.after = '.dotdotdot-read-more';
					}

					$(this).dotdotdot(options);

					if($(this).triggerHandler('isTruncated')) {
						$(this).on('click', '.dotdotdot-read-more', function(e) {
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
	})();

//LazyLoad
	if($.fn.lazyload) {
		$('img.lazy').lazyload();
	}
	else {
		$.getScript('/static/library/jQuery/jquery.lazyload.min.js', function() {
			$('img.lazy').lazyload();
		});
	}

//Hero Banner
	if($('.hero-banner').length) {
		//Randomize banner
		var randomNumber = Math.floor((Math.random() * $('.item').length));
		$('.item').eq(randomNumber).addClass("active");
		$('.hero-banner .carousel-indicators li').eq(randomNumber).addClass("active");

		$('.hero-banner .carousel').find('.lazy').each(function () {
			$(this).attr('src', $(this).data('original')).removeClass('lazy');
		});
	}

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

	resizeFourColumnFilmstripCarousel();
	grayscaleImage();
});

addResize('offCanvasResize');
addResize('resizeFourColumnFilmstripCarousel');
addResize('toggleResize');
addResize('grayscaleImage');

function resizeFourColumnFilmstripCarousel() {
	(function() {
		if ($('.screenshot-carousel').length && !$('html').hasClass('home')) {
			if($.fn.slidePagination2) {
				init();
			}
			else {
				$.getScript('/static/library/jQuery/jquery.slidepagination.min.js', function() {
					init();
				});
			}
		}

		function init() {
			if ($('.screenshot-carousel').length) {
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

				$('.screenshot-carousel').each(function () {
					var options = sliderOptions;

					if ($(this).data('large-arrows') == 'true') {
						options.largeArrow = true;
						options.pagination = [
							{type: 'prepend', nextArrow: false, align: 'left'},
							{type: 'prepend', prevArrow: false}
						];
					}

					if($(this).data('row')) {
						options.row = $(this).data('row');
					}

					if (pageWidth >= 992) {
						options.column = $(this).data('col') ? $(this).data('col') : 4;
					}
					else if (pageWidth >= 768) { //tablet
						options.column = $(this).data('col-sm') ? $(this).data('col-sm') : 3;
					}
					else if (pageWidth < 768) { //mobile
						options.column = $(this).data('col-xs') ? $(this).data('col-xs') : 1;
					}

					$(this).slidePagination2('destroy');
					$(this).slidePagination2(options);
				});
			}
		}

	})();
}

function offCanvasResize() {
	if ($('#off-canvas').is(':visible')) {
		$('.site-wrapper').show();

		$($('#off-canvas').data('target')).html($('#off-canvas').find('.off-canvas-content').children());
		$('body').removeClass('off-canvas-mode');
	}
}

function socialMediaToolbar() {
	var bitlyURL = url = location.href;

//If protocol is https find previous page.
	if (location.protocol == 'https:') {
		var pathnameArr = location.pathname.split('/');

		if (/(.*)t/.test(pathnameArr[1])) {
			pathnameArr[1] = pathnameArr[1].replace(/(.*)t/, '$1');
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
			console.log(bitlyURL);
			console.log(url);

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

//off canvas back button
	$('#off-canvas').on('click', '.off-canvas-back', function (e) {
		e.preventDefault();

		$('body').css('left', -1 * pageWidth);
		$('#off-canvas').css('left', '100%');

		$('.site-wrapper').show();

		$('body').animate({left: 0}, 500, function () {
			$($('#off-canvas').data('target')).html($('#off-canvas').find('.off-canvas-content').children());
			$('body').removeClass('off-canvas-mode');
			$(document).scrollTop($('#off-canvas').data('top'));
		});
	});

//perform off canvas
	$('body').on('click', '[data-toggle=offcanvas]', function (e) {
		//Off canvas is only availabe on mobile device
		if (pageWidth >= 768) {
			return false;
		}

		e.preventDefault();

		var target = ($(this).data('target') === undefined) ? $(this).attr('href') : $(this).data('target'),
				top = $(document).scrollTop();

		$('#off-canvas').css('top', top).data('target', target).data('top', top).find('.off-canvas-content').html($(target).children());

		if($(target).data('no-border') && $(target).data('no-border') === true) {
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
		});
	});
}

function toggleResize() {
	$('body').find('[data-toggle=show]').each(function () {
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
}

function grayscaleImage() {
	if($('.grayscale').length) {
		init('.grayscale');
	}
	if(pageWidth >= 1200 && $('.grayscale-lg').length) {
		init('.grayscale-lg');
	}
	if(pageWidth >= 992 && $('.grayscale-md').length) {
		init('.grayscale-md');
	}
	if(pageWidth >= 768 && $('.grayscale-sm').length) {
		init('.grayscale-sm');
	}
	if($('.grayscale-xs').length) {
		init('.grayscale-xs');
	}

	function init(className) {
		if(document.readyState == 'complete') {
			execute(className);
		}
		else {
			$(window).load(function() {
				execute(className);
			});
		}
	}

	function execute(className) {
		if($.fn.gray) {
			setTimeout(function() {
				$(className + ':not(.grayscale-replaced)').gray();
			}, 200);
		}
		else {
			$('head').append('<link rel="stylesheet" href="/static/css/grayscale-image.min.css">');

			$.getScript('/static/library/jQuery/jquery.gray.min.js', function() {
				setTimeout(function() {
					$(className + ':not(.grayscale-replaced)').gray();
				}, 200);
			});
		}
	}
}

/*function eventForm() {
	$('.has-slide').each(function() {
		var wrapper = $(this).find('> div'), len = wrapper.children().length;

		if($('html').hasClass('ie9')) {
			$(this).css({width: $(this).width()});
			wrapper.css('width', $(this).width());
			wrapper.children().css('width', $(this).width()).filter(':gt(0)').hide();
		}
		else {
			wrapper.css({width: len * 100 + '%'}).find('> div').css('width', 100/len + '%');
		}

		if(!wrapper.find('> div:eq(0)').is(':visible')) {
			//TODO: Need to find a way to detect if form is in view.
		}
		else {
			//Set height to the wrapper to prevent extra white space below if other pages are not the same height;
			//wrapper.css({minHeight: wrapper.find('> div:eq(0)').outerHeight(true)});
		}

		//Only make first page visible.
		wrapper.find('> div:gt(0)').hide();

		//Bind event
		$(this).on('click', '.goto', function(e) {
			e.preventDefault();

			var newPage = $(this).data('page'),
					slidePages = $(this).parents('.slide-page').parent().find('.slide-page'),
					curPage = slidePages.index($(this).parents('.slide-page'));

			if($('html').hasClass('ie9')) {
				wrapper.children().hide().stop().filter(':eq(' + newPage + ')').show();
			}
			else {
				//Show all pages
				slidePages.show();
				wrapper.css('left', -1 * (curPage * 100) + '%');

				wrapper.animate({
					left: -1 * (newPage * 100) + '%'
				}, 500, function() {
					slidePages.hide().stop().filter(':eq(' + newPage + ')').show();
					wrapper.css('left', 0);
				});
			}
		});

		$(this).css('visibility', 'visible');
	});

	$('#event-container')
			.on('click', 'tbody > tr', function(e) {
				if(!(e.target.nodeName == 'INPUT' && e.target.type == 'checkbox')) {
					$(this).find(':input[type=checkbox]').trigger('click');
				}
			})
			.on('change', ':input[type=checkbox]', function (e) {
				var checked = 0, map = ['', 'date', 'time', 'location', 'type', 'duration'], classMap = {
					'online': 'event-online',
					'on-demand': 'event-on-demand',
					'in-person': 'event-in-person'
				}, months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

				//Clear out display detail
				$('.event-detail-container').empty();

				$('#event-container').find(':input[type=checkbox]').each(function () {
					if ($(this).is(':checked')) {
						checked++;

						var eventType = $(this).parents('tr').data('event-type'),
								code = (eventType == 'on-demand') ? $('#date-widget-on-demand-tpl').html():$('#date-widget-tpl').html(),
								date = null;

						$(this).parents('tr').find('> td').each(function(indx, elem) {
							if(map[indx] != '') {
								code = code.replace(new RegExp('\\[\\[' + map[indx] + '\\]\\]', 'g'), elem.innerHTML);
							}

							if(map[indx] == 'date') {
								date = new Date(elem.innerHTML.replace('.', ''));
							}

							if(map[indx] == 'type') {
								type = elem.innerHTML;
							}
						});

						//Apply date
						code = code.replace('[[month]]', months[date.getMonth()]);
						code = code.replace('[[day]]', date.getDate());

						//Apply date widget header color
						code = code.replace('[[headerclass]]', classMap[eventType]);

						$('.event-detail-container').append(code);
					}
				});



				$('#event-next-button').prop('disabled', checked ? false:true);
			});
}*/

