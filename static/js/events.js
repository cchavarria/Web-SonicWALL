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

		$('.event-detail-container').find('.details-list').each(function() {
			$(this).find('li').each(function() {
				if(!$(this).find('span:eq(1)').text().length) {
					$(this).remove();
				}
			});
		});

		$('#event-next-button').prop('disabled', checked ? false:true);
	});