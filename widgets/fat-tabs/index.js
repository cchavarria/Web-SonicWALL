$(function () {
  //trigger tabs
  $('.fat-tabs').tabs();

  createPlayers();
  resizeAwareness();
});

addResize('resizeAwareness');

function resizeAwareness() {

  if (pageWidth < 768) {//mobile
    try {
      $('.fat-tabs').tabs('destroy');
    }
    catch(e) {

    }

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
