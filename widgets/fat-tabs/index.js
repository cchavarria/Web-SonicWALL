$(function () {
	createPlayers();
	resizeAwareness();
});

addResize('resizeAwareness');

function resizeAwareness() {
	if (pageWidth >= 768) {
		//off canvas mode exit, reverts all the changes back
		if($('#off-canvas').is(':visible')) {
			$('.site-wrapper').show();
			$('body').css('left', '0').removeClass('off-canvas-mode');

			$('.site-wrapper').show();

			//append off canvas target back again
			$($('#off-canvas').data('target')).html($('#off-canvas').find('.off-canvas-content').children());
		}
	}
}

function createPlayers() {
	$.getScript('/static/library/jQuery/jquery.watch.min.js', function() {
		OO.ready(function () {
			$('.ooyalaplayer').each(function () {
				var id = $(this).attr('id'),
						videoId = $(this).data('videoid');

				if($(this).is(':visible')) {
					OO.Player.create( id , videoId , {
						onCreate: OOCreate,
						autoplay: false,
						wmode: 'transparent'
					});
				}
				else {
					onVisibleLoadVideo(id , videoId);
				}
			});
		});
	});
}

function onVisibleLoadVideo(id, videoID) {
	var elem = prevElem = $('#' + id);

	while(!elem.is(':visible')) {
		prevElem = elem;
		elem = elem.parent();
	}

	prevElem.watch('display', function() {
		if($(this).is(':visible') && !$('#' + id).data('loaded')) {
			OO.Player.create(id ,videoID , {
				onCreate: OOCreate,
				autoplay: false,
				wmode: 'transparent'
			});

			$('#' + id).data('loaded', true);
		}
	});
}