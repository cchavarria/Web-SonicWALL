$(function () {
  if ($('.set-height').length) {
    addResize('heightFix', true);
    if(pageType != 0){
      setMaxHeight();
    }
  }
});

function heightFix() {
  if (pageType != 0) {
    $('.collapse-xs').removeClass('collapse').css('height','');
    setMaxHeight();
  } else {
    $('.set-height').find(' > div > div > div').css('height', 'auto');
    $('.collapse-xs').addClass('collapse');
  }
}

function setMaxHeight() {
  $('.set-height').find('.row').each(function () {
    var maxHeight = 0,
        columns = $(this).find(' > div');
    columns.each(function () {
      maxHeight = $(this).height() > maxHeight ? $(this).height() : maxHeight;
    });

    if(pageType == 1){
      columns.find('> div').each(function(){
        if(!$(this).hasClass('height-auto-sm')){
          $(this).css('height',maxHeight);
        }
      });
    }else{
      columns.find('> div').css('height',maxHeight);
    }

  });
}
