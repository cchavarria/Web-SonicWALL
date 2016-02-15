/*Creator: Elnaz Doostdar 6/25/14*/
/*xml feed for Sonicwall Distributors and Contacts*/
/* Modified by Edward Chong: Migrate over to responsive */

var populateContacts = {
  init: false,
  queue: [],
  dataset: null,
  url: '',
  jquery: $,
  initialize: function ($) {
    //Download the XML and store it in the varaible "dataset".
    //If there are any pending actions in the "queue", execute it.
    var elem = this;
    $.ajax({
      url: this.url,
      dataType: 'xml',
      success: function (data, status, xhr) {
				if($(data).find('DSGSaleContact').length) {
					elem.dataset = $(data).find('DSGSaleContact')[0];
				}
				else {//Store it in a variable for future use.
					elem.dataset = $(data).find('SNWLContact')[0];
				}

        elem.init = true;
        elem.busy = false;
        for (var i in elem.queue) {
          elem.get(elem.queue[i][0]); //Execute any request that was in the queue.
        }
      }
    });
  },
  get: function (options) {
    //Checks to make sure that the XML has been loaded fully before executing this.
    if (!this.init) {
      if (this.busy) {
        this.queue.push([options]);
      }
      else {
        this.busy = true;
        this.queue.push([options]);
        this.initialize(this.jquery);
      }
      return;
    }
    var $ = this.jquery;
    var template = $(options.template).html(), //Create a copy of the template.
        variables = template.match(/\[\[(.+?)\]\]/g), //Find all variables inside {{repeat}}.
        replaceWith = [],
        code = '';

    //Parse optional variables and replace it.
    if (typeof options.vars !== 'undefined') {
      for (var i in options.vars) {
        template = template.replace('[[' + options.vars[i][0] + ']]', options.vars[i][1]);
      }
    }
    //Find replace text variable.
    for (var i = 0; i < variables.length; i++) {
      replaceWith.push(variables[i].match(/\[\[(.+?)\]\]/)[1]);
    }
    if (location.href.indexOf('contact') > 0) {
      $(this.dataset).find('> Contacts').find('> Item').each(function () {
        //Make sure that the type and language matches the criteria before proceeding.
        if ($(this).find('> region').text() == options.region && $(this).find('> language').text() == options.language) {
          var html = template;
          for (var x = 0; x < variables.length; x++) {
            var value = $(this).find('> ' + replaceWith[x]).text();
            var matchValue = value.match(/<!\[CDATA\[(.*?)\]\]>/);
            if (matchValue === null) { //If test has CDATA, remove it.
              if (variables[x] == '[[phone]]' && $(this).find('> region').text() == 'North America') {//add style for phone in North America
                value = '<strong>T ' + value + '</strong> <em>Toll-Free</em>';
              }
              if (variables[x] == '[[phone]]' && $(this).find('> region').text() != 'North America' && value != '') {
                value = 'T ' + value;
              }
              if (variables[x] == '[[fax]]' && value != '') {
                value = 'F ' + value;
              }
              if (variables[x] == '[[imageurl]]' && value != '') {
                value = '<img src="' + value + '" width="34" height="18" class="pull-left">';
              }
              html = html.replace(variables[x], value);
            }
            else {
              html = html.replace(variables[x], matchValue[1]);
            }
          }
          code += html;
        }
      });
    }
		else if (location.href.indexOf('distributors') > 0) {
      $(this.dataset).find('> Distributors').find('> Item').each(function () {
        //Make sure that the type and language matches the criteria before proceeding.
        if ($(this).find('> country').text() == options.country && $(this).find('> language').text() == options.language) {
          var html = template;
          for (var x = 0; x < variables.length; x++) {
            var value = $(this).find('> ' + replaceWith[x]).text();
            var matchValue = value.match(/<!\[CDATA\[(.*?)\]\]>/);
            if (matchValue === null) { //If test has CDATA, remove it.
              if (variables[x] == '[[phone]]' && value != '') {
                value = '<strong>T</strong> ' + value;
              }
              if (variables[x] == '[[fax]]' && value != '') {
                value = '<strong>F</strong> ' + value;
              }
              if (variables[x] == '[[imageurl]]' && value != '') {
                value = '<img src="' + value + '" class="img-responsive center-block">';
              }
              html = html.replace(variables[x], value);
            }
            else {
              html = html.replace(variables[x], matchValue[1]);
            }
          }
          code += html;
        }
      });
    }

		$(options.target).append(code).find('a[href=""]').remove();
  }
};

$(function () {
	$.getScript("/static/library/jQuery/jquery.multiple.select.js", function () {
		init();
	});
});

function init() {
	//create template for contacts or distributors depending on href
	if (location.href.indexOf('contact') > 0) {
		$('#contactselect').multipleSelect({
			multiple: false,
			selectAll: false,
			single: true
		});
		setSelectedOption('contact');
	}
	else if (location.href.indexOf('distributors') > 0) {
		$('#distributorselect').multipleSelect({
			multiple: false,
			selectAll: false,
			single: true
		});
		setSelectedOption('distributors');
	}

	populateContacts.url = $('#xml-html-output').data('src');

	if (location.href.indexOf('contact') > 0) {
		getXML($('#contactselect').val() , 'contactselect', 'English');
	}
	else if (location.href.indexOf('distributors') > 0) {
		getXML($('#distributorselect').val() , 'distributorselect', 'English');
	}

	$('#contactselect , #distributorselect').on('change', function () {
		$('#xml-html-output').empty();
		getXML($(this).val(), $(this).attr('id'), 'English');
	});

	//clear filter and set to default listing
	$('#resetfilter').on('click', function () {
		if (location.href.indexOf('contact') > 0) {
			setSelectedOption('contact');
		}
		else if (location.href.indexOf('distributors') > 0) {
			setSelectedOption('distributors');
		}
	});
}

function getXML(selectedOption, dropDownId, lan) {
  var template = '#xml-to-html-template', target = '#xml-html-output';
  if (dropDownId == 'contactselect') {
    populateContacts.get({
      region: selectedOption,
      template: template,
      target: target,
      language: lan,
      vars: [
        ['region', selectedOption],
        ['language', lan]
      ]
    });
  } else {
    populateContacts.get({
      country: selectedOption,
      template: template,
      target: target,
      language: lan,
      vars: [
        ['region', selectedOption],
        ['language', lan]
      ]
    });
  }
}

function setSelectedOption(page) {
	var val = '';

	if (page == 'distributors') {
		switch (RootPath) {
			case '/':
				val = 'United States';
				break;
			case '/br-pt/':
				val = 'Brazil';
				break;
			case '/fr-fr/':
				val = 'France';
				break;
			case '/de-de/':
				val = 'Germany';
				break;
			case '/mx-es/':
				val = 'Mexico';
				break;
			case '/jp-ja/':
				val = 'Japan';
				break;
			case '/cn-zh/':
				val = 'China';
				break;
		}

		$('#distributorselect').multipleSelect('setSelects', [val]);
	}
	else {
		switch (RootPath) {
			case '/':
				val = 'North America';
				break;
			case '/br-pt/':
				val = 'Latin America';
				break;
			case '/fr-fr/':
				val = 'Europe, Middle East & Africa';
				break;
			case '/de-de/':
				val = 'Europe, Middle East & Africa';
				break;
			case '/mx-es/':
				val = 'Latin America';
				break;
			case '/jp-ja/':
				val = 'Asia Pacific';
				break;
			case '/cn-zh/':
				val = 'Asia Pacific';
				break;
		}

		$('#contactselect').multipleSelect('setSelects', [val]);
	}
}
