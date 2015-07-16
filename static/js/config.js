require.config({
  baseUrl: '/static',
  paths: {
    jquery: 'library/jQuery/jquery-1.9.1.min',
    placeholder: 'library/jQuery/jquery.placeholder',
		cookie: 'library/jQuery/jquery.cookie',
		lazyload: 'library/jQuery/lazyload.min',
		validate: 'library/jQuery/validate-mod'
  },
  shims: {
		placeholder: {
			deps: ['jquery']
		}
  }
});

var burl = location.href;

require(['jquery'], function($) {
	$(document).ready(function () {
		//Social media toolbar
		if ($('.social-media-toolbar').length) {
			socialMediaToolbar();
		}

		//Off Canvas
		offCanvas();

		//Workaround for placeholder on unsupported browser
		(function() {
			console.log('a');
			var test = document.createElement('input');
			if('placeholder' in test) {
				console.log('placeholder');
				define(['placeholder'], function(placeholder) {
					console.log(placeholder);
				});

				//$('input').placeholder();
			}
		})();

		if($('.ooyalaplayer').length) {
			//Adjust height of player
			$('.ooyalaplayer').each(function() {
				$(this).css('height', $(this).width() / 1.854);
			});
		}

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

		//Ooyala player popup
		$('body').on('click', '.ooplaylist', function (e) {
			e.preventDefault();

			var width = 642,
				config = $.parseJSON($(this).data('config').replace(/'/g, '"')),
				title = (typeof config.title != 'undefined') ? config.title:$(this).text(),
				content = '';

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

			$.fancybox({
				'autoDimensions': false,
				'autoScale': false,
				'width': width,
				'height': 'auto',
				'content': content,
				autoSize: true,
				iframe: {
					preload: false // fixes issue with iframe and IE
				},
				'onStart': function () {
					$.fancybox.center();
				}
			});
		});


		if($('.screenshot-carousel').length) {

		}

		resizeFourColumnFilmstripCarousel();
	});
});
