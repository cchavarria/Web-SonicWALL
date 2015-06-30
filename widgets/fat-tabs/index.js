$(function () {

  resizeProductLine();
});

addResize('resizeProductLine');

function resizeProductLine() {
  if (pageWidth >= 768) {//desktop
    $(".fat-tabs").tabs({});

    if (pageWidth < 992) {//tablet

    }
  }
  else if (pageWidth < 768) {//mobile
    //initialize tabs to fix error
    $(".fat-tabs").tabs({});
    $(".fat-tabs").tabs('destroy');
  }
}
