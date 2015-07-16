$(document).ready(function() {
	$('form').validate({
		rules: {
			UserName: {
				email: true
			}
		},
		focusInvalid: false,
		showErrors: validateShowErrors,
		submitHandler: function (form) {
			alert('Submit');
		}
	});
});

function validateShowErrors(errorMap, errorList) {
	var form = $(this.currentForm),
		errors = this.numberOfInvalids(),
		alertContainer = form.data('alert-container');

	if (errors) {
		//Display alert container
		if (alertContainer === undefined) {
			alertContainer = $('<div class="alert"><div class="alert-warning"><h4></h4><div class="label-error-wrapper"></div></div></div>').insertBefore(form);

			form.data('alert-container', alertContainer);
		}
		else {
			alertContainer.show();
		}

		alertContainer.find('h4').text(((errors == 1) ? '1 item' : errors + ' items') + ' need attention'); //Add error title

		var alertContainerLabel = alertContainer.find('.label-error-wrapper').empty(); //Remove previous error message

		//Populate each error to the alert container
		var displayedError = 0;

		//Find all fields that are new valid that were previously invalid.
		$.each(this.successList, function (i, elem) {
			$(elem).removeClass('error').tooltip('destroy');
		});

		//Mark all invalid fields
		$.each(this.invalid, function (name, msg) {
			var fieldElem = form.find(':input[name=' + name + ']'),
				title = fieldElem.data('orig-title') ? fieldElem.data('orig-title') : fieldElem.attr('title');

			//Overwriting message for now.
			msg = 'This field is required';

			if(displayedError) {
				alertContainerLabel.append('<span>|</span>');
			}

			alertContainerLabel.append('<label for="' + fieldElem.attr('id') + '">' + title + '</label>');

			fieldElem.addClass('error');

			//Only show first error as tooltip
			if (!displayedError) {
				if (fieldElem.data('orig-title') === undefined) {
					fieldElem.data('orig-title', fieldElem.attr('title'));
				}

				//Used by tooltip
				fieldElem.attr('title', msg);

				//Do not show tooltip on IE8.
				if (!fieldElem.next().hasClass('tooltip') && !$('html').hasClass('ie8')) {
					setTimeout(function() {
						fieldElem.tooltip({
							template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner tooltip-alert"></div></div>',
							trigger: 'manual'
						})
							.tooltip('show');
					}, 100);
				}
			}

			displayedError++;
		});
	}
	else {
		if(alertContainer !== undefined) {
			alertContainer.hide();
		}

		if(!$('html').hasClass('ie8')) {
			form.find('.tooltip').tooltip('destroy');
		}

		form.find(':input').filter('.error').removeClass('error');
	}
}