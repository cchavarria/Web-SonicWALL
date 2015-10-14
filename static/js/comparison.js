addResize(function() {
	processComparison();
}, true);

function processComparison(parentSelector) {
	if (typeof parentSelector == 'undefined') {
		parentSelector = 'body';
	}

	var elem = $(parentSelector).find('.comparison');

	if(elem.length) {
		elem.each(function() {
			//Only process if visible.
			if(!$(this).is(':visible')) {
				return true;
			}

			var displayAmount = 2, //Define how many entries should be shown
				rows = $(this).find('.row'), //All rows
				columnsInFirstRow = $(rows.get(0)).find('> div'),
				total = columnsInFirstRow.length, //Total entries
				cols = $(this).find('[class^="col-"]'), //All columns
				paginationElem = $(this).find('.comparison-pagination'); //Pagination element.

			//Reset
			reset();

			//Find maximum height for first .row.
			var maxHeight = 0;

			columnsInFirstRow
				.each(function() {
				var h = $(this).height();

				if(h > maxHeight) {
					maxHeight = h;
				}
			})
				.css('height', maxHeight);

			var width = columnsInFirstRow.outerWidth();

			//Define how many entries should be shown.
			if(pageType >= 2) {
				displayAmount = 4;
			}
			else if(pageType == 1) {
				displayAmount = 3;
			}

			paginationElem.find('.end').text(displayAmount);

			//Set all expanded collapsible columns the same height.
			$(this).on('shown.bs.collapse', '.collapse', function() {
				if(!$(this).data('comparison-processed')) {
					$(this).find('.row').each(function() {
						var rowHeight = $(this).height();

						$(this).find('> div').css('height', rowHeight);
					});

					$(this).data('comparison-processed', true);
				}
			});

			if(total > displayAmount) {
				cols.css('width', width);
				rows.css('width', width * total);

				elem
					.data('page', 0)
					.data('width', width)
					.data('display', displayAmount);

				paginationElem
					.on('click', '.prev', scroll)
					.on('click', '.next', scroll);

				if($.fn.touchSwipe) {
					initSwipe();
				}
				else {
					$.getScript('/static/library/jQuery/jquery.touchSwipe.js').done(initSwipe);
				}
			}

			function reset() {
				cols.css('width', '');
				rows.css({left: '', width: ''});
				paginationElem
					.off('click', '**')
					.find('.next').removeClass('inactive').end()
					.find('.prev').addClass('inactive').end()
					.find('.start').text(1).end()
					.find('.total').text(total);
				$(this).off('shown.bs.collapse', '**');
				$(rows.get(0)).find('> div').css('height', '');

				//Copy title for each collapsible row and place it in each column.
				elem.find('.panel-body').find('> .row:even').each(function() {
					$(this).find('> div').html($(this).find('> div:eq(0)').html());
					$(this).find('> div:gt(0)').find('> div').css('visibility', 'hidden');
				});
			}

			function scroll() {
				updateDisplay(elem.data('page') + ($(this).hasClass('prev') ? -1:1));
			}

			function initSwipe() {
				rows.touchSwipe({
					swipeStatus: function(event, phase, direction, distance, duration, fingerCount) {
						//Here we can check the:
						//phase : 'start', 'move', 'end', 'cancel'
						//direction : 'left', 'right', 'up', 'down'
						//distance : Distance finger is from initial touch point in px
						//duration : Length of swipe in MS
						//fingerCount : the number of fingers used

						var dir = '';

						if(!$(this).data('direction')) {
							if($.inArray(direction, ['left', 'right']) > -1) {
								dir = 'horizontal';
							}
							else {
								dir = 'vertical';
							}

							$(this).data('direction', dir);
						}
						else {
							dir = $(this).data('direction');
						}

						var page = elem.data('page');

						if(dir == 'horizontal') {
							if(direction == 'left') {
								rows.css('left', (-page * width) - distance);
							}
							else if(direction == 'right') {
								rows.css('left', (-page * width) + distance);
							}
						}
						else {
							if(direction == 'up') {
								window.scrollTo(0, window.scrollY + distance);
							}
							else if(direction == 'down') {
								window.scrollTo(0, window.scrollY - distance);
							}
						}

						if(phase == 'end') {
							$(this).removeData('direction');

							if($.inArray(direction, ['left', 'right']) > -1) {
								var newPage = Math.ceil(parseInt(rows.css('left')) / width);

								if(newPage >= 0) {
									newPage = 0;
								}
								else {
									newPage = Math.abs(newPage);
								}

								updateDisplay(newPage);
							}
						}
					},
					threshold: 10
				});
			}

			function updateDisplay(page) {
				paginationElem.find('button').removeClass('inactive');

				if(page <= 0) {
					paginationElem.find('.prev').addClass('inactive');
					page = 0;
				}

				if (page + displayAmount >= total) {
					paginationElem.find('.next').addClass('inactive');
					page = total - displayAmount;
				}

				rows.animate({left: -page * width}, 500);
				elem.data('page', page);

				elem.find('.panel-body').find('> .row:even').each(function() {
					$(this).find('> div').find('> div').css('visibility', 'hidden').end().filter(':eq(' + page + ')').find('> div').css('visibility', 'visible');
				});

				paginationElem
					.find('.start').text(page + 1).end()
					.find('.end').text(page + displayAmount).end();
			}
		});
	}
}