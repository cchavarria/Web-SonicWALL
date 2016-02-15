/*!
 * Resource Center v0.0.1
 * Copyright 2014 Dell Software, Inc.
 *
 * A jQuery plugin to display documents/events in a beautiful way with filtering options.
 *
 * @author Edward Chong
 *
 * Dependencies:
 * - jQuery >= 1.9.0
 * - Isotope v2.0.1
 * - Brightcove Token
 *
 * Examplese:
 * - http://software.dell.com/resource-center-for-sql-dba/
 */

/* Sample
 <script type="text/template" id="event-template">
 <li class="[[class]]">
 <a href="[[url]]" target="_blank">
 <div class="calendar-wrapper">
 <div>
 <span class="month">[[month]]</span>
 <span class="day">[[day]]</span>
 </div>
 </div>
 <div class="location-time [[locationTimeClass]]">[[stateCountry]]<br>[[time]]</div>
 <div class="description">[[description]]</div>
 <div class="description-hover">[[descriptionHover]]</div>
 </a>
 </li>
 </script>

 <script type="text/template" id="webcast-template">
 <li class="[[class]]">
 <a href="[[url]]" target="_blank">
 <img src="[[image]]" class="video">
 <div class="description">[[description]]</div>
 <div class="description-hover">[[descriptionHover]]</div>
 </a>
 </li>
 </script>

 <script type="text/template" id="brightcove-template">
 <li class="[[class]]">
 <a href="#" class="bcplaylist" data-config="[[config]]">
 <img src="[[image]]" class="video" id="[[imageID]]">
 <span class="play-icon"></span>
 <div class="description">[[description]]</div>
 <div class="description-hover">[[descriptionHover]]</div>
 </a>
 </li>
 </script>

 <script type="text/template" id="case-study-template">
 <li class="[[class]]">
 <a href="[[url]]" target="_blank">
 <div class="image-wrapper">
 <img src="[[logo]]">
 <span class="quote">[[quote]]</span>
 <span class="author">[[author]]</span>
 </div>
 <div class="image-wrapper-hover">
 <img src="[[image]]">
 </div>
 <div class="description-hover">[[descriptionHover]]</div>
 </a>
 </li>
 </script>
 <script type="text/template" id="generic-template">
 <li class="[[class]]">
 <a href="[[url]]" target="_blank">
 <img src="[[image]]">
 <div class="description">[[description]]</div>
 <div class="description-hover">[[descriptionHover]]</div>
 </a>
 </li>
 </script>

 $(document).ready(function() {
 $('#source').resourceCenter({
 xml: [
 {
 url: '/docs/xml/sql-server-resources.xml',
 type: ['Documents', 'Events'],
 product: '',
 dateWithin: false
 },
 {
 url: '/xml/assets/spotlight-on-sql-server-enterprise',
 product: 'spotlight on sql server enterprise',
 type: ['Events'],
 dateWithin: 7889400000 //3 months
 },
 {
 url: '/xml/assets/litespeed-for-sql-server',
 product: 'litespeed for sql server',
 type: ['Events'],
 dateWithin: 7889400000 //3 months
 },
 {
 url: '/xml/assets/toad-for-sql-server',
 product: 'toad for sql server',
 type: ['Events'],
 dateWithin: 7889400000 //3 months
 }
 ],
 listTypeOrder: [
 ['Whitepaper', 'Case Study', 'Datasheet', 'Technical Briefs'],
 ['Archived Webcasts', 'WebCast On Demand'],
 ['In Person Events', 'Online Events'],
 ['Brightcove Videos']
 ],
 sort: [
 {'type': 'date', 'format': 'date', 'sortby': 'DESC'},
 {'type': 'date', 'format': 'date', 'sortby': 'DESC'},
 {'type': 'date', 'format': 'date', 'sortby': 'ASC'},
 {'type': 'date', 'format': 'date', 'sortby': 'DESC'}
 ],
 filterTarget: '#filter',
 filter: [
 {
 'target': '#filter-type',
 'display': 'Type',
 'data': [
 {
 'display': 'Documents',
 'className': 'document',
 'testAgainst': 'type',
 'testValue': ['Whitepaper', 'Case Study', 'Datasheet', 'Technical Briefs']
 },
 {
 'display': 'Events',
 'className': 'event',
 'testAgainst': 'type',
 'testValue': ['In Person Events', 'Online Events']
 },
 {
 'display': 'On-Demand Webcast',
 'className': 'webcast',
 'testAgainst': 'type',
 'testValue': ['Archived Webcasts', 'WebCast On Demand']
 },
 {
 'display': 'Video',
 'className': 'video',
 'testAgainst': 'type',
 'testValue': ['Brightcove Videos']
 }
 ]
 },
 {
 'target': '#filter-capability',
 'display': 'Capability',
 'data': [
 {
 'display': 'Monitor &amp; Improve',
 'className': 'monitor',
 'testAgainst': 'products',
 'testValue': ['spotlight on sql server enterprise']
 },
 {
 'display': 'Protect',
 'className': 'protect',
 'testAgainst': 'products',
 'testValue': ['litespeed for sql server']
 },
 {
 'display': 'Manage',
 'className': 'manage',
 'testAgainst': 'products',
 'testValue': ['toad for sql server']
 }
 ]
 }
 ],
 noResult: '<div id="no-result" class="error text-center">No results found.</div>'
 });
 });
 */

(function ($) {
	var resources = [],
		today = new Date(),
		months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		ajaxsCounter = 0,
		methods = {},
		defaults = {
			templateMap: {
				'Whitepaper': 'generic-template',
				'eBook': 'generic-template',
				'Case Study': 'case-study-template',
				'Datasheet': 'generic-template',
				'Technical Briefs': 'generic-template',
				'Archived Webcasts': 'webcast-template',
				'WebCast On Demand': 'webcast-template',
				'In Person Events': 'event-template',
				'Online Events': 'event-template',
				'Ooyala Videos': 'ooyala-template',
				'Brightcove Videos': 'brightcove-template'
			},
			templates: {}
		},
		opt = {};

	$.fn.resourceCenter = function (options) {
		if (methods[options]) {
			return methods[options].apply(this, Array.prototype.slice.call(arguments, 1));
		}
		else {
			//$(this).css('visibility', 'hidden');

			opt = $.extend({}, defaults, options);
			opt.target = $(this);

			for (var i = 0; i < opt.listTypeOrder.length; i++) {
				resources.push([]);
			}

			loadTemplate();

			$(opt.xml).each(function (i) {
				//if (typeof this.urlType != 'undefined' && this.urlType == 'document library') {
				//	getDocumentLibraryAssets(this);
				//}
				//else {
					getXML(this);
				//}
			});

			return this;
		}
	};

	function loadTemplate() {
		//Store template to templates variable
		for (var type in opt.templateMap) {
			var id = opt.templateMap[type];

			opt.templates[id] = $('#' + id).html();
		}
	}

	function getDocumentLibraryAssets(obj) {
		$.ajax({
				url: obj.url,
				type: 'POST',
				dataType: 'JSON',
				data: obj.data
			})
			.done(function (data) {
				parseDocumentLibraryDataset(obj.type, data.data, obj.product);

				ajaxsCounter++;

				//Check if all ajax has been complete
				if (ajaxsCounter == opt.xml.length) {
					processAllItems();
				}
			})
			.fail(function () {
				console.log('getXML() failed');
				console.log(arguments);
			});
	}

	function getXML(obj) {
		//Retrieve XML
		$.ajax({
				url: obj.url,
				dataType: 'xml'
			})
			.done(function (data) {
				parseDataset(obj.type, $(data).find('Product'), obj.product, obj.dateWithin);

				ajaxsCounter++;

				//Check if all ajax has been complete
				if (ajaxsCounter == opt.xml.length) {
					processAllItems();
				}
			})
			.fail(function () {
				console.log('getXML() failed');
				console.log(arguments);
			});
	}

	function processAllItems() {
		//Remove duplicate
		$(resources).each(function (indx) {
			var newDataset = [];

			$(resources[indx]).each(function () {
				var add = true;

				if (newDataset.length) {
					for (var cntr in newDataset) {
						if (newDataset[cntr].url == this.url) {
							add = false;

							for (var indx2 in resources[indx]) {
								for (var productIndx in resources[indx][indx2].products) {
									if ($.inArray(resources[indx][indx2].products[productIndx], newDataset[cntr].products) == -1) {
										newDataset[cntr].products.push(resources[indx][indx2].products[productIndx]);
									}
								}
							}

							break;
						}
					}
				}

				if (add) {
					newDataset.push(this);
				}
			});

			//Sorting
			newDataset = sort(indx, newDataset);

			resources[indx] = newDataset;
		});

		renderItems();
		displayFilters();
		bindFilter();

		opt.target.find('.description').dotdotdot();

		opt.target.isotope({
			itemSelector: 'li'
		});

		//console.log('visible');
		//opt.target.css('visibility', 'visible');
	}

	function bindFilter() {
		var lis = opt.target.find('li');

		$(opt.filterTarget).on('click', 'a', function (e) {
			e.preventDefault();
			//opt.target.css('visibility', 'hidden').parent().addClass('loading');

			$(this).parents('ul').find('a').removeClass('active');
			$(this).addClass('active');

			var filterClass = [];

			$(opt.filterTarget).find('.active').each(function () {
				var filterVal = $(this).data('filter');

				if (filterVal != '') {
					filterClass.push(filterVal);
				}
			});

			filterClass = '.' + filterClass.join('.');

			if (filterClass != '.' && !lis.filter(filterClass).length) {
				if (typeof opt.noResult == 'string') {
					opt.noResult = $(opt.noResult);
					opt.noResult.insertBefore(opt.target);
				}

				opt.noResult.show();
			}
			else if (typeof opt.noResult != 'string') {
				opt.noResult.hide();
			}

			opt.target.isotope({
				filter: (filterClass == '.') ? '*' : filterClass
			});

			//Set filter display text to show current selection.
			$(this).parents('.dropdown').find('.display').text($(this).text());

			//opt.target.css('visibility', 'visible').parent().removeClass('loading');
		});

		//Remove sitecatalyst onclick event.
		$(window).load(function () {
			setTimeout(function () {
				$(opt.filterTarget).find('a').each(function () {
					$(this).attr('onclick', '');
				});
			}, 100);
		});
	}

	function displayFilters() {
		//Display filters.
		for (var indx in opt.filter) {
			$(opt.filter[indx].data).each(function () {
				if (this.show === true) {
					$(opt.filter[indx].target).append('<li role="presentation"><a role="menuitem" tabindex="-1" href="#" data-filter="' + this.className + '">' + this.display + '</a></li>');
				}
			});
		}
	}

	function sort(indx, data) {
		if (opt.sort[indx].format == 'date') {
			if (opt.sort[indx].sortby == 'DESC') {
				data = data.sort(function (a, b) {
					a = new Date(a.date);
					b = new Date(b.date);
					return a > b ? -1 : a < b ? 1 : 0;
				});
			}
			else if (opt.sort[indx].sortby == 'ASC') {
				data = data.sort(function (a, b) {
					a = new Date(a.date);
					b = new Date(b.date);
					return a < b ? -1 : a > b ? 1 : 0;
				});
			}
		}

		return data;
	}

	function renderItems() {
		var cntr = 0,
			group = 0,
			prev = '',
			complete = [];

		//Set complete status for each resources to false.
		for (var i = 0; i < resources.length; i++) {
			complete.push(false);
		}

		//Go through each resource item and arrange items by listTypeOrder
		while (true) {
			var classes = [],
				entry = {},
				isComplete = true,
				code = '';

			//Check to make sure that resources group/cntr is valid.
			if (typeof resources[group][cntr] == 'undefined') {
				complete[group] = true;

				//Check if all resources are complete.
				for (var i in complete) {
					if (!complete[i]) {
						//Not all are complete
						isComplete = false;
						break;
					}
				}

				if (isComplete) {
					break;
				}

				if (group == opt.listTypeOrder.length - 1) {
					group = 0;
					cntr++;
				}
				else {
					group++;
				}

				continue;
			}

			entry = resources[group][cntr];

			//Map filter types
			for (var indx in opt.filter) {
				$(opt.filter[indx].data).each(function (dataIndx) {
					if (typeof entry[this.testAgainst] == 'string') {
						if ($.inArray(entry[this.testAgainst], this.testValue) > -1) {
							classes.push(this.className);
							opt.filter[indx].data[dataIndx].show = true;
						}
					}
					else {
						for (var item in entry[this.testAgainst]) {
							if ($.inArray(entry[this.testAgainst][item], this.testValue) > -1) {
								classes.push(this.className);
								opt.filter[indx].data[dataIndx].show = true;
							}
						}
					}
				});
			}

			classes.push(entry.type.replace(/\s/g, '-').toLowerCase());

			var templateMap = {
				url: entry.url,
				'class': classes.join(' '),
				description: entry.name
			};

			if ($.inArray(entry.type, ['In Person Events', 'Online Events']) > -1) {
				var eventDate = new Date(entry.date);

				templateMap.month = months[eventDate.getMonth()];
				templateMap.day = eventDate.getDate();
				templateMap.descriptionHover = 'Register Now &#155;';
				templateMap.stateCountry = entry.stateCountry;
				templateMap.time = entry.time;
				templateMap.locationTimeClass = '';
			}
			else if (entry.type == 'Brightcove Videos') {
				templateMap.image = entry.image;
				templateMap.descriptionHover = 'Watch Video &#155;';
				templateMap.config = "{'videoID': " + entry.brightcoveID + ", 'title': '" + entry.name.replace(/\'/g, "&amp;#39;") + "'}";
				templateMap.imageID = 'BC' + cntr;

				getBrightcoveImage(entry.brightcoveID, templateMap.imageID);
			}
			else if (entry.type == 'Ooyala Videos') { //jl
				templateMap.image = entry.image;
				templateMap.descriptionHover = 'Watch Video &#155;';
				templateMap.config = "{'ooyala': '" + entry.ooyalaID + "', '3Play': '', 'description':'" + entry.description.replace(/\'/g, "&amp;#39;") + "', 'url':'/video/" + entry.url + "', 'title': '" + entry.name.replace(/\'/g, "&amp;#39;") + "'}";
				templateMap.imageID = 'OY' + cntr;

			}
			else if ($.inArray(entry.type, ['Archived Webcasts', 'WebCast On Demand']) > -1) {
				templateMap.image = '/images/shared/icon-video.jpg';
				templateMap.descriptionHover = 'Watch On-Demand Webcast &#155;';
			}
			else if (entry.type == 'Case Study') {
				templateMap.descriptionHover = 'Read the Case Study &#155;';
				templateMap.image = entry.image;

				if ((typeof entry.quote == 'undefined' || typeof entry.author == 'undefined' || typeof entry.logo == 'undefined') || (entry.quote == '' || entry.author == '' || entry.logo == '')) {
					//Force to use generic template
					code = opt.templates['generic-template'];
				}
				else {
					templateMap.logo = entry.logo;
					templateMap.quote = entry.quote;
					templateMap.author = entry.author;
				}
			}
			else {
				templateMap.image = entry.image;

				if (entry.type == 'Technical Briefs') {
					templateMap.descriptionHover = 'Read the Technical Brief &#155;';
				}
				else if (entry.type == 'Whitepaper') {
					templateMap.descriptionHover = 'Read the White Paper &#155;';
				}
				else if (entry.type == 'Datasheet') {
					templateMap.descriptionHover = 'Read the Datasheet &#155;';
				}
				else if (entry.type == 'eBook') {
					templateMap.descriptionHover = 'Read the eBook &#155;';
				}
			}

			//If template hasn't been overridden.
			code = (code == '') ? opt.templates[opt.templateMap[entry.type]] : code;

			for (var tm in templateMap) {
				code = code.replace('[[' + tm + ']]', templateMap[tm]).replace('<img src="">', '');
			}

			opt.target.append(code);

			if (group == opt.listTypeOrder.length - 1) {
				group = 0;
				cntr++;
			}
			else {
				group++;
			}
		}
	}

	function getBrightcoveImage(brightcoveID, imageID) {
		$.ajax({
				url: 'http://api.brightcove.com/services/library?command=find_video_by_id&token=Hauwo3UUsIHcsRjweLYhdfuzx8S2LN1UVLWmmDQseDev33WmXR_kKg..&video_id=' + brightcoveID,
				dataType: 'jsonp'
			})
			.done(function (data) {
				$('#' + imageID).attr('src', data.videoStillURL);
			});
	}

	//Not done. Found out that document library does not have all the necessary information.
	function parseDocumentLibraryDataset(pullType, dataset, associatedProduct) {
		for (var typeName in pullType) {
			dateWithin = pullType[typeName];

			dataset.each(function () {
				var publishDate = today,
					products = [],
					obj = {
						name: stripText(obj.title),
						type: this.documenttype,
						date: obj.date,
						url: obj.url
					};

				if ($(this).find('product').length == 0) {
					products.push(associatedProduct);
				}
				else {
					$(this).find('product').each(function () {
						var productName = $(this).text();

						products.push(productName.toLowerCase());
					});
				}

				obj.products = [associatedProduct];

				if (obj.type == 'Brightcove Videos') {
					obj.brightcoveID = $(this).find('brightcoveID').text();
					obj.image = '';
					obj.url = obj.brightcoveID;
				}
				else if (obj.type == 'Ooyala Videos') { //jl
					obj.ooyalaID = $(this).find('ooyalaID').text();
					obj.image = $(this).find('image').text();
					obj.url = $(this).find('url').text();
					obj.description = $(this).find('description').text();
				}
				else if (obj.type == 'Case Study') {
					obj.image = $(this).find('documentimage').text();
					obj.quote = stripText($(this).find('quotetext').text());
					obj.author = stripText($(this).find('quoteauthor').text());
					obj.logo = stripText($(this).find('logo').text());
				}
				else if (obj.type == 'WebCast On Demand') {
					obj.date = publishDate = $(this).find('recordeddate').text();
				}
				else if (obj.type == 'Online Events' || obj.type == 'In Person Events') {
					obj.date = publishDate = $(this).find('eventdate').text();
					obj.state = stripText($(this).find('eventstate').text());
					obj.country = $(this).find('country').text();
					obj.stateCountry = ((obj.state != '') ? obj.state + ', ' : '') + obj.country;
					obj.time = stripText($(this).find('eventstarttime').text()) + ' ' + stripText($(this).find('eventtimezone').text());
				}
				else if (obj.type == 'Case Study') {
					obj.quote = stripText($(this).find('quotetext').text());
					obj.author = stripText($(this).find('quoteauthor').text());
					obj.logo = stripText($(this).find('logo').text());
				}
				else {
					obj.date = publishDate = $(this).find('publishdate').text();
					obj.image = $(this).find('documentimage').text();
				}

				if (publishDate.length) {
					publishDate = new Date(publishDate);
				}

				if (dateWithin === false || (today.getTime() <= publishDate.getTime() + dateWithin)) { //If publishDate is within 8 weeks.
					for (var i in opt.listTypeOrder) {
						if ($.inArray(obj.type, opt.listTypeOrder[i]) > -1) {
							resources[i].push(obj);
							break;
						}
					}
				}
			});
		}
	}

	function parseDataset(pullType, dataset, associatedProduct, dateWithin) {
		for (var pullTypeIndx in pullType) {
			var typeName = '';

			if (isNaN(pullTypeIndx)) {
				typeName = pullTypeIndx;
				dateWithin = pullType[pullTypeIndx];
			}
			else {
				typeName = pullType[pullTypeIndx];
			}

			dataset.find(typeName).find('Item').each(function () {
				if ($(this).find('language').text() == 'English') {
					var publishDate = today,
						products = [],
						obj = {
							name: stripText($(this).find('name').text()),
							type: $(this).find('type').text(),
							date: $(this).find('publishdate').text(),
							url: $(this).find('url').text()
						};

					if ($(this).find('product').length == 0) {
						products.push(associatedProduct);
					}
					else {
						$(this).find('product').each(function () {
							var productName = $(this).text();

							products.push(productName.toLowerCase());
						});
					}

					obj.products = products;

					if (obj.type == 'Brightcove Videos') {
						obj.brightcoveID = $(this).find('brightcoveID').text();
						obj.image = '';
						obj.url = obj.brightcoveID;
					}
					else if (obj.type == 'Ooyala Videos') { //jl
						obj.ooyalaID = $(this).find('ooyalaID').text();
						obj.image = $(this).find('image').text();
						obj.url = $(this).find('url').text();
						obj.description = $(this).find('description').text();
					}
					else if (obj.type == 'Case Study') {
						obj.image = $(this).find('documentimage').text();
						obj.quote = stripText($(this).find('quotetext').text());
						obj.author = stripText($(this).find('quoteauthor').text());
						obj.logo = stripText($(this).find('logo').text());
					}
					else if (obj.type == 'WebCast On Demand') {
						obj.date = publishDate = $(this).find('recordeddate').text();
					}
					else if (obj.type == 'Online Events' || obj.type == 'In Person Events') {
						obj.date = publishDate = $(this).find('eventdate').text();
						obj.state = stripText($(this).find('eventstate').text());
						obj.country = $(this).find('country').text();
						obj.stateCountry = ((obj.state != '') ? obj.state + ', ' : '') + obj.country;
						obj.time = stripText($(this).find('eventstarttime').text()) + ' ' + stripText($(this).find('eventtimezone').text());
					}
					else if (obj.type == 'Case Study') {
						obj.quote = stripText($(this).find('quotetext').text());
						obj.author = stripText($(this).find('quoteauthor').text());
						obj.logo = stripText($(this).find('logo').text());
					}
					else if (obj.type == 'Datasheet') {
						obj.date = publishDate = $(this).find('publishdate').text();
						obj.image = $(this).find('documentimage').text();

						if(obj.image == '') {
							obj.image = '/images/asset/datasheet.jpg';
						}
					}
					else {
						obj.date = publishDate = $(this).find('publishdate').text();
						obj.image = $(this).find('documentimage').text();
					}

					if (publishDate.length) {
						publishDate = new Date(publishDate);
					}

					if (dateWithin === false || (today.getTime() <= publishDate.getTime() + dateWithin)) { //If publishDate is within 8 weeks.
						for (var i in opt.listTypeOrder) {
							if ($.inArray(obj.type, opt.listTypeOrder[i]) > -1) {
								resources[i].push(obj);
								break;
							}
						}
					}
				}
			});
		}
	}

	function stripText(value) {
		var matchValue = value.match(/<!\[CDATA\[(.*?)\]\]>/);

		if (matchValue === null) { //If test has CDATA, remove it.
			return value;
		}
		else {
			return matchValue[1];
		}
	}
})(jQuery);