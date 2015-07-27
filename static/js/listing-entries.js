$(document).ready(function() {
	// Add clearfix divider to listing entries
	dynamicClearfix();
});

addResize('dynamicClearfix');

//Function fix Event listing rows with diff heights issue.

function dynamicClearfix() {
	var counter = 0,
		divider = $('.clearfix'),
		$rowContainer = $('.listing-entries .row');

	// check for desktop and Large devices
	if (pageType === 'md' || pageType === 'lg'){
		$rowContainer.find(divider).remove();

		$rowContainer	.find('> div').each(function() {
			counter++;
			if ((counter%4) == 0) {
				$(this).after('<div class="clearfix"></div>');
			}
		})
	}else if (pageType === 'sm') { // check for tablet
		$rowContainer.find(divider).remove();

		$rowContainer.find('> div').each(function () {
			counter++;
			if ((counter%3) == 0) {
				$(this).after('<div class="clearfix"></div>');
			}
		})
	}else { // mobile
		$rowContainer.find(divider).remove(); // clear previous dividers
	}
}