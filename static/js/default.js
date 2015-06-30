/* Used on Responsive New Header/Footer */

/*
* We are using placeholder.js to support ie8 and ie9 placeholder - Jl 6/3/2015
*
* */

var burl = location.href, resizeTimer = null;

$(document).ready(function () {
	//Social media toolbar
	if ($('.social-media-toolbar').length) {
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
			}
		});
	}

	//append off canvas content
	$('.site-wrapper').after('<div id="off-canvas"><div class="bg-grey border-b-gray p-10"><a class="off-canvas-back"><i class="glyphicon glyphicon-menu-left"></i><span>Back</span></a></div><div class="off-canvas-content"></div></div>');

	//off canvas back button
	$('body').on('click', '.off-canvas-back', function (e) {
		e.preventDefault();

		$('.site-wrapper').show();

		$('body').animate({left: 0}, 500, function() {
			$($('#off-canvas').data('target')).html($('#off-canvas').find('.off-canvas-content').children());
			$('body').removeClass('off-canvas-mode');
			$(document).scrollTop($('#off-canvas').data('top'));
		});
	});

	//perform off canvas
	$('body').on('click', '[data-toggle=offcanvas]', function (e) {
		//Off canvas is only availabe on mobile device
		if(pageWidth >= 768) {
			return false;
		}

		e.preventDefault();

		var target = ($(this).data('target') === undefined) ? $(this).attr('href'):$(this).data('target'),
			top = $(document).scrollTop();

		$('#off-canvas').css('top', top).data('target', target).data('top', top).find('.off-canvas-content').html($(target).children());

		$('body').addClass('off-canvas-mode').animate({left: -1 * pageWidth}, 500, function() {
			$('.site-wrapper').hide();
			$('#off-canvas').css('top', 0);
		});
	});

	//Workaround for placeholder on unsupported browser
	(function() {
		var test = document.createElement('input');
		if('placeholder' in test) {
			$('input').placeholder();
		}
	})();


	//Workaround for select tag not having a placeholder (visual)
	/*        $('body')
	 .on('process-placeholder', 'select', function () {
	 $(this).trigger('mouseenter').trigger('mouseout');
	 })
	 .on('change', 'select', function () {
	 var ph = $(this).attr('placeholder');

	 if (ph) {
	 if ($(this).find(':selected').text() == ph) {
	 $(this).css('color', '#999');
	 }
	 else {
	 $(this).css('color', '');
	 }
	 }
	 })
	 .on('mouseenter', 'select', function () {
	 $(this).css('color', '');
	 })
	 .on('mouseout', 'select', function () {
	 $(this).css('color', '#999');
	 });*/

});

