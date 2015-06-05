/* Used on Responsive/Non-Responsive New Header/Footer (push to /static/js only) */

//Initially store the width of the page.
var pageWidth = $('html').width(), resizeFn = [], resizeTimer = null;

$(document).ready(function () {
  resizeGlobal();

	//Prevent anchor tag from firing when href is set to #
  $('.main-nav-section').find('ul.tier2').on('click', 'a[href=#]', function (e) {
    if ($('html').width() >= 768) {
      e.preventDefault();
    }
  });

	//only shown in mobile
  $('#mobile-search-button').on('click', function (e) {
		$('#masthead-search').toggleClass('open');
		$('.utility').find('> li').removeClass('open');
		e.stopPropagation();
  });

	//Prevent anchor tag from firing when href is set to # on mobile
  $('.footer-top-section').on('click', 'a[href=#]', function (e) {
    if ($('html').width() < 768) {
      e.preventDefault();
    }
  });

  $('body')
		.on('touchstart', '.subLinks > a, .subLinks > span', function (e) {
			//Add functionality for when user uses touch on navigation.

			e.preventDefault();
			e.stopPropagation();

			var elem = $(this).parent();

			//Remove all "open" class that is a sibling to the currently touched element.
			elem.siblings()
				.find('.open').removeClass('open').end()
				.removeClass('open');

			if (elem.hasClass('open')) {
				//Remove all "open" class inside of the currently touched element.
				elem.find('.open').removeClass('open').end().removeClass('open');
			}
			else {
				elem.addClass('open');

				if (pageWidth < 768) { //Mobile
					//Animate background color to notify user that they have touched that element.
					var originalBG = $(this).css('background-color');

					elem.css({backgroundColor: '#007db8'});

					$('html, body').animate({scrollTop: $(this).offset().top}, function () {
						elem.animate({backgroundColor: originalBG}, 500, function () {
							elem.css('backgroundColor', '');
						});
					});
				}
			}
		})
		.on('click', '.dropdown', function () {
			//Dropdown class is being used in the utility toolbar.
			//Close all dropdown that is a sibling to the clicked element.

      $(this).siblings().removeClass('open');
      $('#masthead-search').removeClass('open');
      $(this).toggleClass('open');
    })
    .on('click', function () {
			//Close country popup when user clicks any where on the page.
      if(pageWidth > 767) {
        $('#country-popup').css('display', '');
      }
    })
    .on('click', '.navbar-toggle', function (e) {
    	//Hamburger - Mobile
			//Open & Close slide out navigation.
      if ($('html').width() < 768) {
        e.preventDefault();
        $('html').toggleClass('openNav');
        $('.utility').find('> li').removeClass('open');
        $('#masthead-search').removeClass('open');
      }
    });

  // Search
  $('#search-form').on('click', 'button', function(e) {
		e.preventDefault();
		goAllSearch3();
	});

  /* Country Dropdown */

  $('#current-country').on('click', function (e) {
    if(pageWidth > 767) {
      e.stopPropagation();
      e.preventDefault();
      $('#country-popup').toggle();
    }
  });

	//Issue with iPad Chrome where links couldn't be clicked.
	//Reason was for SiteCatalyst injecting onclick attribute to all anchor tag.
	$('footer').on('click', 'a', function(e) {
		e.preventDefault();
		e.stopImmediatePropagation();

		location.href = $(this).attr('href');
	});
});

$(window).load(function() {
	//This is only used on the new header/footer not responsive.
  $('.bootstrap').each(function() {
    //copy modernizr classes from html tag to be copied over to where .bootstrap class is defined.
    $(this).get(0).className = $.trim($(this).get(0).className) + ' ' + $.trim($('html').get(0).className);
  });

	/*$('footer').find('a').each(function() {
		$(this).removeAttr('onclick');
	});*/
});

addResize('resizeGlobal');

$(window).resize(function() {
	//Prevent resizing from firing when modifying dom structure.
	var w = $('html').width();

	if(pageWidth != w) {
		pageWidth = $('html').width();

    if(resizeTimer !== null) {
      clearTimeout(resizeTimer);
    }

    resizeTimer = setTimeout(function() {
      clearTimeout(resizeTimer);

      $.each(resizeFn, function (i, fn) {
        if (typeof window[fn] == 'function') {
          window[fn].call();
        }
      });
    });
	}
});

function addResize(fn) {
  resizeFn.push(fn);
}

function resizeGlobal() {
	var w = (pageWidth >= 768) ? '300':'auto';

  //Increase width of UL if its child doesn't have sublinks
  $('.main-nav-section').find('ul:gt(0)').each(function() {
    if(!$(this).find('> li.subLinks').length) {
      $(this).css('width', w);
    }
  });

  $('.open').removeClass('open');
  $('#country-popup').css('display', '');
}

//This is used to make a not responsive page responsive.
function makeResponsive() {
  $('.not-responsive').removeClass('not-responsive').addClass('is-responsive');
  $('#wrapper').attr('id', '').addClass('site-wrapper').wrapInner('<div class="site-canvas">');
}