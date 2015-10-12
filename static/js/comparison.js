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
			if(!$(this).is(':visible')) {
				return true;
			}

			var displayAmount = 2,
				rows = $(this).find('.row'),
				total = $(rows.get(0)).find('> div').length,
				cols = $(this).find('[class^="col-"]'),
				paginationElem = $(this).find('.comparison-pagination');

			//Reset
			cols.css('width', '');
			rows.css({left: '', width: ''});
			paginationElem
				.off('click', '**')
				.find('.next').removeClass('inactive').end()
				.find('.prev').addClass('inactive').end()
				.find('.start').text(1).end()
				.find('.total').text(total);

			var width = $(rows.get(0)).find('> div').outerWidth();

			if(pageType >= 2) {
				displayAmount = 4;
			}
			else if(pageType == 1) {
				displayAmount = 3;
			}

			paginationElem.find('.end').text(displayAmount);

			if(total > displayAmount) {
				cols.css('width', width);
				rows.css('width', width * total);

				paginationElem
					.data('page', 0)
					.data('width', width)
					.data('display', displayAmount)
					.on('click', '.prev', scroll)
					.on('click', '.next', scroll);
			}

			function scroll() {
				var parent = $(this).parent(),
					page = parent.data('page'),
					width = parent.data('width'),
					displayAmount = parent.data('display');

				page += $(this).hasClass('prev') ? -1:1;

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
				paginationElem.data('page', page);

				paginationElem
					.find('.start').text(page + 1).end()
					.find('.end').text(page + displayAmount).end();
			}
		});
	}
}