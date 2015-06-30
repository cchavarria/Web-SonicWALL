$(function () {
  //trigger tabs
  $('.fat-tabs').tabs({});

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

	createPlayers();
  resizeAwareness();
});

addResize('resizeAwareness');

function resizeAwareness() {

  if (pageWidth < 768) {//mobile
    //initialize tabs to fix error
		try {
			$('.fat-tabs').tabs('destroy');
		}
    catch(e) {

		}

    $('.site-canvas .fat-tabs > div').addClass('hidden-xs');
  }
	else {
    //off canvas mode exit, reverts all the changes back
		if($('#off-canvas').is(':visible')) {
			$('.site-wrapper').show();
			$('body').css('left', '0').removeClass('off-canvas-mode');

			$('.site-wrapper').show();

			//append off canvas target back again
			$($('#off-canvas').data('target')).html($('#off-canvas').find('.off-canvas-content').children());
		}

		$('.fat-tabs').tabs();
  }
}

function createPlayers() {
  OO.ready(function () {
    var players = ['NS-player','IAM-player','DP-player','IM-player','WSM-player','EM-player','PM-player'],
        videoIds = ['lxbnlyazqgUTIEW_AQ1nIauBYIXwkHAr','w5MzA4dDpIw3uJL24fS8LaS3COFbYq-Z','R2cjA2dDpLyvaZ29i3XwVTsdqpfUX6MA',
          'R0d3lyazpKNe0EN0f5dZlkgtBQhAUJZx','15Z2Fjcjo4neK1tNi60T490aBCPARlZh','AxNW54cjpyQY8Xg_DuI3-6ZegHP15DwC',
          'AxNW54cjpyQY8Xg_DuI3-6ZegHP15DwC']

    $.each(players, function (index, value) {
      var value = OO.Player.create( value ,videoIds[index] , {
        onCreate: OOCreate,
        autoplay: false,
        wmode: 'transparent'
      });
    });
  });
}
