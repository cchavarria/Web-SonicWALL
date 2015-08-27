$(function () {
  if ($('.button-flyout').length) {
    var buttonFlyout = $('.button-flyout'),
        flyoutWidth = buttonFlyout.width() + parseInt(buttonFlyout.css('border-left'))
            + parseInt(buttonFlyout.css('border-right')) + 4;//4 is the box shadow

    buttonFlyout.data('width', flyoutWidth);

    $('body').on('click', '.button-flyout > a ,.button-flyout-small', function (e) {
      e.preventDefault();

      var buttonFlyout = $('.button-flyout');

      if (!buttonFlyout.data('visible')) {
        //to attach button to the flyout box(bypassing the box shadow)
        buttonFlyout.find('> a').css('left','-87px');
        showButtonFlyoutContent();
      } else {
        hideButtonFlyoutContent(buttonFlyout.data('width'));
        //reset button position
        buttonFlyout.css('right', - buttonFlyout.data('width') + 'px').find('> a').css('left','-92px');
      }

      $('body').on('click', '.button-flyout .close', function () {
        hideButtonFlyoutContent(buttonFlyout.data('width'));
        buttonFlyout.css('right', - buttonFlyout.data('width') + 'px').find('> a').css('left','-92px');
      });
    });
  }
});

function hideButtonFlyoutContent(w) {
  if (pageType > 1) {
    $('.button-flyout').animate({
      right: -w
    }, 500);
  } else {
    $('.button-flyout').animate({bottom: - $('.button-flyout').outerHeight()}, 500);
  }
  $('.button-flyout').data('visible', false);
}

function showButtonFlyoutContent() {
  if (pageType > 1) {
    $('.button-flyout').animate({right: 0}, 500);
  }else{
    $('.button-flyout').animate({bottom: 0}, 500);
  }
  $('.button-flyout').data('visible', true);
}
