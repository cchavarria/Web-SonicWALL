$(function () {
  if($('.collapse-xs').length){
    addResize('toggleCollapse', true);
  }
});

function toggleCollapse(){
  if (pageType != 0) {
    $('.collapse-xs').removeClass('collapse').css('height','');
  }else{
    $('.collapse-xs').addClass('collapse');
  }
}

