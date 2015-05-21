/* Used on Responsive New Header/Footer */

var burl = location.href;

$(document).ready(function () {
  /*var pageWidth = $('html').width();

   if(pageWidth < 768) { //XS
   moveTo('.move-to-xs');
   }
   else if(pageWidth < 992) { //SM
   moveTo('.move-to-sm');
   }
   else if(pageWidth < 1200) { //MD
   moveTo('.move-to-md');
   }
   else { //LG
   moveTo('.move-to-lg');
   }*/

  //Social media toolbar
  if ($('.social-media-toolbar').length) {
    var bitlyURL = url = location.href;

    //If protocol is https find previous page.
    if (location.protocol == 'https:') {
      var pathnameArr = location.pathname.split('/');

      if (/(.*)t/.test(pathnameArr[1])) {
        pathnameArr[1] = pathnameArr[1].replace(/(.*)t/, '$1');
        bitlyURL = url = 'http://' + location.host + pathnameArr.join('/');
      }
    }

    if ($('.g-plusone').length) {
      $('.g-plusone').attr('data-href', url);

      //Google+
      (function () {
        var po = document.createElement('script');
        po.type = 'text/javascript';
        po.async = true;
        po.src = '//apis.google.com/js/plusone.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(po, s);
      })();
    }

    //Retrieve bit.ly url
    if (window.XMLHttpRequest && !(/\-/.test(location.host))) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "/hidden/bitly.asmx/get?URI=" + encodeURIComponent(url));
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            xml = $($.parseXML(xhr.responseText));
            var obj = jQuery.parseJSON(xml.find("string").text());

            if (typeof obj.data != 'undefined') {
              bitlyURL = obj.data.url;
            }
          }
        }
      }
      xhr.send();
    }

    //Interaction when clicking on facebook, twitter and linkedin
    $('.social-media-toolbar').on('click', 'a', function (e) {
      var parent = $(this).parent(), title = document.title;

      if (parent.hasClass('facebook')) {
        if (typeof s == 'object') {
          //s.tl(this, 'o', 'Share-Facebook');
          s.events = "event13";
          s.eVar18 = "Facebook";
          s.linkTrackVars = "events,eVar18";
          s.linkTrackEvents = "event13";
          s.tl(true, 'o', 'Social Media');
        }

        //_gaq.push(['_trackSocial', 'Facebook', 'Share']);

        e.preventDefault();
        window.open('http://www.facebook.com/sharer.php?u=' + encodeURIComponent(url) + '&t=' + encodeURIComponent(title), 'facebook', 'width=480,height=240,toolbar=0,status=0,resizable=1');
      }
      else if (parent.hasClass('twitter')) {
        if (typeof s == 'object') {
          //s.tl(this, 'o', 'Share-Twitter');
          s.events = "event13";
          s.eVar18 = "Twitter";
          s.linkTrackVars = "events,eVar18";
          s.linkTrackEvents = "event13";
          s.tl(true, 'o', 'Social Media');
        }
        //_gaq.push(['_trackSocial', 'Twitter', 'Tweet']);
        console.log(bitlyURL);
        console.log(url);

        e.preventDefault();
        window.open('http://twitter.com/share?via=DellSoftware&url=' + encodeURIComponent(bitlyURL) + '&text=' + encodeURIComponent(title) + ',%20&counturl=' + encodeURIComponent(url), 'twitter', 'width=480,height=380,toolbar=0,status=0,resizable=1');
      }
      else if (parent.hasClass('linkedin')) {
        if (typeof s == 'object') {
          //s.tl(this, 'o', 'Share-LinkedIn');
          s.events = "event13";
          s.eVar18 = "LinkedIn";
          s.linkTrackVars = "events,eVar18";
          s.linkTrackEvents = "event13";
          s.tl(true, 'o', 'Social Media');
        }
        //_gaq.push(['_trackSocial', 'LinkedIn', 'Share']);

        e.preventDefault();
        window.open('http://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title), 'linkedin', 'width=480,height=360,toolbar=0,status=0,resizable=1');
      }
    });
  }

  //Workaround for select tag not having a placeholder (visual)
  $('body')
      .on('process-placeholder', 'select', function () {
        $(this).trigger('mouseenter').trigger('mouseout');
      })
      .on('change', 'select', function () {
        var ph = $(this).attr('placeholder');

        if (ph) {
          if ($(this).find(':selected').text() == ph) {
            $(this).css('color', '#999');
          }
          else {
            $(this).css('color', '');
          }
        }
      })
      .on('mouseenter', 'select', function () {
        $(this).css('color', '');
      })
      .on('mouseout', 'select', function () {
        $(this).css('color', '#999');
      });

  if ($('html').hasClass('ie')) {
    $('input').placeholder();
  }

  //randomize banner
  randomizeBanner();

  //lazy load banner images
  $('.hero-banner .carousel').find('.lazy').each(function () {
    $(this).attr('src', $(this).data('original')).removeClass('lazy');
  });

  $(window).resize(resize);

  $('.screenshot-carousel .btn-default').on('click', function () {
    $('.screenshot-carousel ul li:nth-child(3) .polaris-divider').attr('style', 'display: block !important');
    for (var i = 3; i < 9; i++) {//hide from child 4
      $('.screenshot-carousel ul li').eq(i).toggle();
    }
    $('.screenshot-carousel .btn-default').attr('style', 'display: none !important');
  });

  // case study section hover effect
  $('.logos  a  img').hover(function () {
    var srcOver = $(this).attr('src').replace(/-gray.png/, '-color.png');
    $(this).attr('src', srcOver);
  }, function () {
    var srcOut = $(this).attr('src').replace(/-color.png/, '-gray.png');
    $(this).attr('src', srcOut);
  });
});

function resize() {
  pageWidth = $('html').width();

  if (pageWidth > 992) {//desktop
    $('.screenshot-carousel .pagination-type1').find('ul').each(function () {
      $(this).slidePagination({interval: 6, column: 3, row: 2});
    });
  }
  if (pageWidth >= 768 && pageWidth <= 992) {//tablet
    $('.screenshot-carousel .pagination-type1').find('ul').each(function () {
      $(this).slidePagination({interval: 4, column: 2, row: 2});
    });
  }

  if (pageWidth < 768) {//mobile
    randomize.call($('.screenshot-carousel ul'));

    for (var i = 3; i <= $('.screenshot-carousel ul li').length; i++) {//hide from child 4
      $('.screenshot-carousel ul li').eq(i).toggle();
    }
    $('.logos').find('ul').each(function () {
      var column = 1, interval = 1, position = 'top';
      $(this).slidePagination({
        interval: interval,
        column: column,
        force: false,
        show: position
      });
    });
  }

}
function randomizeBanner(){
  var randomNumber = Math.floor((Math.random() * $('.item').length));
   $('.item').eq(randomNumber).addClass("active");
   $('.hero-banner .carousel-indicators li').eq(randomNumber).addClass("active");
}
function randomize() {
  var li = $(this).find('li');

  li.sort(function () {
    // Get a random number between 0 and 10
    var temp =  Math.floor((Math.random() * li.length));
    // Get 1 or 0, whether temp is odd or even
    var isOddOrEven = temp % 2;
    // Get +1 or -1, whether temp greater or smaller than 5
    var isPosOrNeg = temp > 5 ? 1 : -1;
    // Return -1, 0, or +1
    return ( isOddOrEven * isPosOrNeg );
  })
    // append list items to ul
      .appendTo($(this));
}

$.getScript('http://software.dell.com/Static/Library/jQuery/jquery.lazyload.min.js', function () {
  $(document).ready(function () {
    $("img.lazy").lazyload();
  });
});

/*
 function moveTo(selector) {
 $(selector).each(function() {
 var target = $(this).data('target'), action = $(this).data('action');
 console.log(action);
 if(action === undefined) {
 $(target).replaceWith($(this));
 }
 else if(action == 'prepend') {
 $(target).prepend($(this));
 }
 else if(action == 'append') {
 $(target).append($(this));
 }
 });
 }*/

