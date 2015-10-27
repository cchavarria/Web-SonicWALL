$(function () {
  if ($('.set-height').length) {
    addResize('heightFix', true);
    setMaxHeight();
  }
});

function heightFix() {
  if (pageType != 0) {
    setMaxHeight();
  } else {
    $('.set-height').find(' > div > div > div').css('height', 'auto');
  }
}

function setMaxHeight() {
  $('.set-height').find('.row').each(function () {
    var maxHeight = 0,
        columns = $(this).find(' > div');
    columns.each(function () {
      maxHeight = $(this).height() > maxHeight ? $(this).height() : maxHeight;
    });
    columns.find('> div').css('height', maxHeight);
  });
}
