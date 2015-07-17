$(document).ready(function () {
  $('.featured-products .btn-default').on('click', function () {
    $('.featured-products ul li:nth-child(3) .polaris-divider').attr('style', 'display: block !important');

    for (var i = 3; i < 9; i++) {//hide from child 4
      $('.featured-products ul li').eq(i).toggle();
    }

    $('.featured-products .btn-default').attr('style', 'display: none !important');
  });

  if ($.fn.slidePagination2) {
    resizeHome();
  }
  else {
    $.getScript('/static/library/jQuery/jquery.slidepagination.min.js', function () {
      resizeHome();
    });
  }
});

addResize('resizeHome');

function resizeHome() {
  if (pageWidth >= 992) {//desktop
    $('.featured-products').slidePagination2({
      list: '.screenshot-carousel-list',
      column: 3,
      row: 2,
      random: true,
      pagination: [
        {type: 'append', selector: '.features-headline'},
        {type: 'append', selector: '.screenshot-carousel-wrapper', displayTotal: true}
      ]
    });
    // case study section hover effect
    $('.logos  a  img').hover(function () {
      var srcOver = $(this).attr('src').replace(/-gray.png/, '-color.png');
      $(this).attr('src', srcOver);
    }, function () {
      var srcOut = $(this).attr('src').replace(/-color.png/, '-gray.png');
      $(this).attr('src', srcOut);
    });
    //show color logos in mobile
    setLogosColor('desktop');
  }
  else if (pageWidth >= 768 && pageWidth < 992) {//tablet
    $('.featured-products').slidePagination2({
      list: '.screenshot-carousel-list',
      column: 2,
      row: 2,
      random: true,
      pagination: [
        {type: 'append', selector: '.features-headline'},
        {type: 'append', selector: '.screenshot-carousel-wrapper', displayTotal: true}
      ]
    });
    //show color logos in mobile
    setLogosColor('tablet');
  }
  else if (pageWidth < 768) {//mobile
		var featuredProduct = $('.featured-products');

		featuredProduct.find('.btn-default').attr('style', 'display: block !important');
		featuredProduct.slidePagination2('destroy');
		featuredProduct.find('.screenshot-carousel-list').find('li').show();
		featuredProduct.find('.screenshot-carousel-list').find('li:gt(2)').hide();

    $('.btn-link').removeClass('btn-link').addClass('btn-default');

    //show color logos in mobile
    setLogosColor('mobile');
  }
}

function setLogosColor(device) {
  var outputSrc = '';

	$('.logos').find('img').each(function () {
    if (device == 'mobile' || device == 'tablet') {
      outputSrc = $(this).attr('src').replace(/-gray.png/, '-color.png');
    } else {
      outputSrc = $(this).attr('src').replace(/-color.png/, '-gray.png');
    }
    $(this).attr('src', outputSrc);
  });
}