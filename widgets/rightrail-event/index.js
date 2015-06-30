//Recurring Events
$(document).ready(function () {

  // fix for form-step-0 to prevent height to increase when events are selected. // Jl
  var $eventsTable = $('#form-step-1').css('display', 'none');

  $('.recurring-event').on('click', 'input[type=button]', function (e) {
    var p = $('#right-form'), w = p.width();

    if ($(this).data('page') == 1) {

      e.preventDefault();
      if (!$(this).hasClass('grey')) {
        $eventsTable.toggle();
        p.find('> div').animate({'margin-left': -1 * w}, 500);
      }
    }
    else if ($(this).data('page') == 0) {
      e.preventDefault();
      $eventsTable.toggle();
      p.find('> div').animate({'margin-left': 0}, 500);
    }
  });

  if ($('#event-container').length) {
    checkCheckbox();

    $('#event-container').on('change', ':input', function () {
      checkCheckbox();
    });
  }

  /*flyout*/
  //append off canvas content
  $('.site-wrapper').after('<div class="off-canvas-header"><div class="bg-grey border-b-gray p-10"><a class="off-canvas-back"><i class="glyphicon glyphicon-menu-left"></i><span>Back</span></a></div><div class="off-canvas-content"></div></div>');

  //off canvas back button
  $('body').on('click', '.off-canvas-back', function (e) {
    e.preventDefault();

    $('.site-wrapper').show();
    $('body').animate({left: 0}, {
      duration: 500,
      done: function () {
        $('.off-canvas-header').hide();

        $($('.off-canvas-content').data('source')).html($('.off-canvas-content').find('> div')).find('> div').unwrap().addClass('hidden-xs');
        $(document).scrollTop($('.off-canvas-header').data('top'));
      }
    });
  });

  //perform off canvas
  $('body').on('click', '[data-toggle=offcanvas]', function (e) {
    e.preventDefault();

    var target = $(this).data('target');

    if (target.charAt(0) == '#') {
      $(target).wrap('<div>');

      $('.off-canvas-content').data('source', $(target).parent()).html($(target));
      $($('[data-toggle=offcanvas]').data('target')).removeClass('hidden-xs').show();
    }

    $('body').addClass('off-canvas-mode').animate({left: -1 * pageWidth}, {
      duration: 500,
      done: function () {
        $('.site-wrapper').hide();
        $('.off-canvas-header').css('left', pageWidth);
        //save the element position on the page to be used when returning to the canvas
        $('.off-canvas-header').show().data('top', $(document).scrollTop());
        ;
        $(window).scrollTop(0);
      }
    });
  });

  resizeRightrailEvents();
});

addResize('resizeRightrailEvents');

function resizeRightrailEvents() {
//off canvas mode exit
  var target = $('[data-toggle=offcanvas]').data('target');
  $('.site-wrapper').show();
  $('body').css('left', '0');
  $('.off-canvas-header').hide();
  $($('[data-toggle=offcanvas]').data('target')).addClass('hidden-xs');
  //append off canvas target back again
  $($('.off-canvas-content').data('source')).html($('.off-canvas-content').find('> div')).find('> div').unwrap();
}

function checkCheckbox() {
  var num = 0, target = $('#event-container-selected').find('tbody');

  target.empty();

  $('#event-container').find(':input').each(function () {
    if ($(this).is(':checked')) {
      num++;

      var clone = $(this).parents('tr').clone();
      clone.find('td:eq(0)').remove();

      target.append(clone);
    }
  });

  if (num) {
    toggleFormButton(false);
    return true;
  }
  toggleFormButton(true);
  return false;

}

function toggleFormButton(disable) {
  var elem = $('#form-step-0').find('.button-container').find('input[type=button]');

  if (disable) {
    elem.removeClass('btn-active');
    elem.addClass('btn-inactive grey');
  }
  else {
    elem.removeClass('btn-inactive grey');
    elem.addClass('btn-active');
  }
}

/*
 $(document).ready(function() {
 var a = $("#form-step-1").css("display", "none");

 $(".recurring-event").on("click", "input[type=button]", function(d) {
 var c = $("#right-form"),
 b = c.width();
 if ($(this).data("page") == 1) {
 d.preventDefault();
 if (!$(this).hasClass("grey")) {
 a.toggle();

 $('#form-step-0').animate({
 width: 'toggle'
 });

 //$('#form-step-0').animate({
 //    'opacity' : 0,
 //    'width' : '0px'
 //}, 1000 || 400, function() {
 // do nothing
 //});

 // $('#form-step-1').animate({
 //     'opacity' : 1,
 //     'width' : '380px'
 // }, 1000 || 400, function() {

 // });



 //$('#form-step-1').animate({
 //    width: 'toggle'
 //});

 //$("#form-step-0").css("display", "none");
 //$("#form-step-0").animate({
 //    left: '380px'
 //}, 400, 'easeOutBack');

 //$("#form-step-1").animate({
 //    left: '0px'
 // }, 400, 'easeOutQuint');
 }
 } else {
 if ($(this).data("page") == 0) {
 d.preventDefault();
 a.toggle();

 $('#form-step-0').animate({
 width: 'toggle'
 });
 }
 }
 });
 if ($("#event-container").length) {
 checkCheckbox();
 $("#event-container").on("change", ":input", function() {
 debugger;
 console.log('change on');
 checkCheckbox();
 })
 }
 });

 function checkCheckbox() {
 debugger;
 var a = 0,
 b = $("#event-container-selected").find("tbody");
 b.empty();
 $("#event-container").find(":input").each(function() {
 if ($(this).is(":checked")) {
 a++;
 var c = $(this).parents("tr").clone();
 c.find("td:eq(0)").remove();
 b.append(c)
 }
 });
 if (a) {
 toggleFormButton(false);
 return true
 }
 toggleFormButton(true);
 return false
 }

 function toggleFormButton(a) {
 var b = $("#form-step-0").find(".button-container").find("input[type=button]");
 var btnnext = $("#form-step-1").find(".button-container").find("input[type=button]");
 if (a) {
 b.removeClass("btn-active");
 b.addClass("btn-inactive grey");

 btnnext.removeClass("btn-active");
 btnnext.addClass("btn-inactive grey");
 } else {
 b.removeClass("btn-inactive grey");
 b.addClass("btn-active");

 btnnext.removeClass("btn-inactive grey");
 btnnext.addClass("btn-active");
 }
 };
 */