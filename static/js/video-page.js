var player_handle = null;

$(document).ready(function() {
	$('.media-player-container').on('click', function () {
		var container = $(this);

		OO.ready(function () {
			player_handle = OO.Player.create('player-wrapper', container.data('code'), {
				onCreate: function (player) {
					OOCreate(player);

					var videoCTA = null, playthrough = [false, false, false, false, false];

					if(pageType != 0) {
						player.mb.subscribe(OO.EVENTS.PLAYBACK_READY, 'UITeam', function () {
							var target = $('#' + player.elementId);

							target.find('.innerWrapper').append($('#video-cta').html());

							videoCTA = $('#video-cta-content');

							target.find('.oo-replay').on('click', function () {
								$(this).parents('.innerWrapper').find('.oo_end_screen').find('.oo_replay').trigger('click');
							});

							videoCTA.find('> a:eq(0)').data('galabel', player.getTitle());
							$('#video-description-learn-more').data('galabel', player.getTitle());
							videoCTA.hide();
						});

						player.mb.subscribe(OO.EVENTS.PAUSED, 'UITeam', function () {
							videoCTA.find('> a:eq(1)').hide();
							showCTA();
						});

						player.mb.subscribe(OO.EVENTS.PLAY, 'UITeam', function () {
							videoCTA.hide();

							if(!playthrough[0]) {
								ga('send', {
									hitType: 'event',
									eventCategory: 'Video',
									eventAction: 'Video Watched %',
									eventLabel: player.getTitle(),
									eventValue: 0
								});
								playthrough[0] = true;
							}
						});

						player.mb.subscribe(OO.EVENTS.PLAYHEAD_TIME_CHANGED, "UITeam", function (eventName, currentTime, totalTime) {
							var percentPlayed = (currentTime / totalTime) * 100;

							if(percentPlayed >= 25 && !playthrough[1]) {
								ga('send', {
									hitType: 'event',
									eventCategory: 'Video',
									eventAction: 'Video Watched %',
									eventLabel: player.getTitle(),
									eventValue: 25
								});
								playthrough[1] = true;
							}
							else if(percentPlayed >= 50 && !playthrough[2]) {
								ga('send', {
									hitType: 'event',
									eventCategory: 'Video',
									eventAction: 'Video Watched %',
									eventLabel: player.getTitle(),
									eventValue: 50
								});
								playthrough[2] = true;
							}
							else if(percentPlayed >= 75 && !playthrough[3]) {
								ga('send', {
									hitType: 'event',
									eventCategory: 'Video',
									eventAction: 'Video Watched %',
									eventLabel: player.getTitle(),
									eventValue: 75
								});
								playthrough[3] = true;
							}
						});

						player.mb.subscribe(OO.EVENTS.PLAYED, 'UITeam', function () {
							if(!playthrough[4]) {
								ga('send', {
									hitType: 'event',
									eventCategory: 'Video',
									eventAction: 'Video Watched %',
									eventLabel: player.getTitle(),
									eventValue: 100
								});
								playthrough[4] = true;
							}

							videoCTA.find('> a:eq(1)').show();
							showCTA();
						});
					}

					function showCTA() {
						var buttonWidth = 0;

						videoCTA.show().find('> a').each(function () {
							if ($.inArray($(this).css('display'), ['block', 'inline-block']) > -1) {
								buttonWidth += parseInt($(this).outerWidth(true)) + parseInt($(this).css('marginLeft'));
							}
						}).end().find('> div').css('marginLeft', buttonWidth + 10);
					}
				},
				autoplay: true,
				wmode: 'transparent'
			});
		});

		$(this).off('click');
	});

	addResize(function () {
		// addResize is invoked as break points is hit when it is dragged
		// height of player-wrapper is recalculated by 16 by 9 ratio
		setTimeout(function () {
			var h = Math.floor($('#player-wrapper').width() * 9) / 16;

			$('#player-wrapper').css('height', h);
			$('.media-player-container').css('height', h);
			$('.media-player-container').find('.img-responsive').css('height', h);
		}, 650);
	}, true);
});