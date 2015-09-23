$(function(){
  $('nav').on('click', '.tier1 > li > a', function () {
    $(this).parent().find('div.tier2 .col-sm-3').removeClass('active');
    $(this).parent().find('div.tier2 .col-sm-3').first().addClass('active');
  });
});