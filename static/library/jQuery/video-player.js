/*updated send button #433*/
var languageList = captions = [];

function OOCreate(player) {
  window['messageBus'] = player.mb;

  player.mb.subscribe(OO.EVENTS.FULLSCREEN_CHANGED, 'UITeam', function () {
    //fix full screen mode cut off in IE
    if ($('.oo_fullscreen').hasClass('oo_fullscreen_off')) {
      $('.wrapper').css({ 'width': '100%', 'height': '100%' });
      $('.round-corners').css('overflow', 'visible');
      $('#ooyalaplayer .plugins').hide();
      disableHoverToggle($('#ooyalaplayer .plugins'));
    }
    else if ($('.oo_fullscreen').hasClass('oo_fullscreen_on')) {
      $('.wrapper').css('width', '967px');
      $('.round-corners').css('overflow', 'hidden');
      enableHoverToggle($('#ooyalaplayer .plugins'));
    }
  });

  player.mb.subscribe(OO.EVENTS.INITIAL_PLAY, 'UITeam', function () {
    jQuery.ajax({
      url: "/sso/VideoIDSet",
      data: {
        videoid: ooyala_player_handle.currentItem.embed_code
      },
      contentType: "application/json; charset=utf-8"
    });
  });

  player.mb.subscribe(OO.EVENTS.PLAYBACK_READY, 'UITeam', function () {
    var plugins = $('.plugins'), title = '', toolbar;

    title = ooyala_player_handle.currentItem.title;

    addPlayerControls();

    //add top bar
    $(plugins).css('display', '').append('<div id="player-toolbar">' +
    '<p>' + title + '</p>' +
    '<ul>' +
    '<li id="info"><span></span></li>' +
    '<li id="email"><span></span></li>' +
    '<li id="share"><span></span></li>' +
    '<li id="embed"><span></span></li>' +
    '</ul>' +
    '</div>');

    toolbar = $('#ooyalaplayer .plugins');

    enableHoverToggle(toolbar);

    //show player-toolbar when player loads for one second
    toolbar.show().delay(1000).fadeOut();

    $("#player-toolbar > p").dotdotdot({ height: 20 });

    //click event handler for icons
    $('#ooyalaplayer .plugins #player-toolbar ul li').click(function () {
      disableHoverToggle(toolbar);

      var iconId = $(this).attr('id'),
          overlay = $('<div id="overlay"><div></div></div>'),
          currentItem = ooyala_player_handle.currentItem;

      //hide title
      $(' #player-toolbar >p').hide();

      //remove any active classes from the list
      $('#player-toolbar ul li span').removeClass('active');

      //stop player
      ooyala_player_handle.pause();

      //append overlay div
      if ($('#overlay').length == 0) {
        overlay.appendTo($('#ooyalaplayer .innerWrapper'));
      }

      $('#ooyalaplayer .oo_promo div.oo_start_button').hide();

      $('#player-toolbar ul').show();

      $('#ooyalaplayer .plugins').removeClass('show').show().css('background', 'none');

      $('#overlay > div').empty();

      $('#player-toolbar').find('#' + iconId + ' span').addClass('active');

      //append overlay content
      appendOverlayContent(iconId, currentItem);
    });

    $('body').on('click', '#oo-toolbar a', function (e) {
      var parent = $(this).parent(), classname = parent.attr('class'), u = '', t = $('h1').text().trim() + ' | Dell Software';

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
        window.open('http://www.facebook.com/sharer.php?u=' + encodeURIComponent(burl) + '&t=' + encodeURIComponent(t), 'facebook', 'width=480,height=240,toolbar=0,status=0,resizable=1');
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

        e.preventDefault();
        window.open('http://twitter.com/share?via=DellSoftware&url=' + encodeURIComponent(burl) + '&text=' + encodeURIComponent(t) + ',%20&counturl=' + encodeURIComponent(u), 'twitter', 'width=480,height=380,toolbar=0,status=0,resizable=1');
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
        window.open('http://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(burl) + '&title=' + encodeURIComponent(t), 'linkedin', 'width=480,height=360,toolbar=0,status=0,resizable=1');
      }
    });

    processClosedCaption();
  });
}

/*********************/

function processClosedCaption() {
  var elementId = 'ooyalaplayer',
      captionsUrl = ooyala_player_handle.currentItem.closed_captions[0].url,
      language = 'en',
      country = 'us';

  jQuery.ajax({
    url: captionsUrl,
    type: "GET",
    dataType: "xml"
  }).done(function (xmldata) {
    captionsXml = $(xmldata);
    allCaptions = createCaptionsCollection(captionsXml.find("div"));

    if (allCaptions.length > 0) {
      var playerRoot = $("#" + elementId);
      playerRoot.find('.oo_controls').append('\
				<div id="captionsContainer">\
					<div id="captionBackground">\
						&nbsp;\
					</div>\
					<div id="caption">\
					</div>\
				</div>\
				');

      addCCButton(elementId);
      //languageList - spin through the language list and grab the current CC captions
      // first try full locale
      captions = findCurrentCC(language, country);

      if (captions.length == 0) {
        captions = findCurrentCC(language);
      }

      if ($('#off-caption').hasClass('disabled')) {
        onCaptions();
      }

      $('.oo_controls').addClass('has-cc');
    }

    window.messageBus.subscribe(OO.EVENTS.PLAYHEAD_TIME_CHANGED, "UITeam", function (eventName, currentTime, totalTime) {
      onPlayheadTimeChanged(currentTime);
    });
  }).fail(function (xmldata) {
    console.log("Did not get closed captions");
  });
}

function getTime(time) {
  var time = time.split(":");
  var hours = parseInt(time[0], 10);
  var minutes = parseInt(time[1], 10);
  var seconds = parseInt(time[2], 10);
  return ((hours * 3600) + (minutes * 60) + seconds);
};

function onPlayheadTimeChanged(currentTime) {
  var _playheadTime = currentTime;
  var currentCaption;
  // determine the language
  for (var caption in captions) {
    var caption = captions[caption];

    if (_playheadTime > caption["begin"]) {
      if (_playheadTime <= caption["end"]) {
        currentCaption = caption;
      }
    }
    else if (currentCaption) {
      break;
    }
  };

  if (currentCaption && (currentCaption != "")) {
    $("#captionsContainer").css("opacity", "1");
    $("#caption")[0].innerHTML = currentCaption["text"];

    if (currentCaption["text"].replace(' ', '') == '') {
      $("#captionsContainer").css("opacity", "0");
    }
  }
  else {
    $("#captionsContainer").css("opacity", "0");
  }

  if (lastCaption != currentCaption) {
    $("#captionsContainer").css("width", "100%");
    if (currentCaption != "") {
      resizeCaptions();
    }
  }
  lastCaption = currentCaption;
}

function changeCC(obj) {
  if ($(this).hasClass("ccLanguage-disabled") == false) {
    var _langStr = obj.target.attributes.data.nodeValue;

    captions = findCurrentCC(_langStr);

    $("#ccLanguageModal").trigger('reveal:close');
    $("#videoLanguage01").hide();
    $("#cc_icon").attr("lanHidden", "true");
  }
  window.messageBus.publish(OO.EVENTS.PLAY);
}

function offCaptions() {
  $("#off-caption").removeClass("disabled");
  $("#on-caption").addClass("disabled");
  $("#captionsContainer").hide();
  $("#listLanguages").hide();
  $(".ccLanguage").addClass("ccLanguage-disabled");
  $("#videoLanguage01").hide();
  $("#cc_icon").attr("lanHidden", "true");
  window.messageBus.publish(OO.EVENTS.PLAY);
}

function onCaptions() {
  $("#on-caption").removeClass("disabled");
  $("#off-caption").addClass("disabled");
  $("#captionsContainer").show();
  $("#listLanguages").show();
  $(".ccLanguage").removeClass("ccLanguage-disabled");
}

function createCaptionsCollection(d) {
  numCCLanguages = d.length;
  var _allCaptions = [];
  var _lastLanguage = "xx";
  var _currentLanguage = "";

  if (numCCLanguages > 0) {
    $('body').append('\
								<div id="ccLanguageModal" style="display:none;">\
										<p style="margin-bottom:10px;">Captions : \
												<a id="on-caption" href="javascript:void(0);" class="ooyala-caption" onClick="onCaptions();">On</a>\
												<a id="off-caption" href="javascript:void(0);" class="disabled ooyala-caption" onClick="offCaptions();">Off</a>\
										</p>\
										<ul id="listLanguages"></ul>\
								</div>');

  }
  // create a quick array of language codes (assumes that these are in the same order)
  for (var _z = 0; _z < numCCLanguages; _z++) {
    var divElement = $(d[_z]);
    //languages
    var _langCode = divElement.attr("xml:lang");
    var _langName = mapLanguageCodes(_langCode);
    languageList.push(_langCode);
    // populate the language list modal
    $("#listLanguages").append("<li class=\"ccLanguage\" data=\"" + _langCode + "\" >" + _langName + "</li>");

    //process the captions
    var _caption = [];
    // grab the <p> element
    var _el = divElement.find("p");
    // spin through the <p>
    for (var _y = 0; _y < _el.length; _y++) {
      // get parent language
      _currentLanguage = _langCode;
      if (_currentLanguage != _lastLanguage) {
        _caption.push({ "begin": getTime($(_el[_y]).attr("begin")), "end": getTime($(_el[_y]).attr("end")), "text": $(_el[_y]).text() });
      }
    }
    _lastLanguage = _currentLanguage;
    _allCaptions.push(_caption);
  }
  // add event handler
  $(".ccLanguage").bind("click", this, changeCC);

  return _allCaptions;
}

function ccButtonHandler() {
  if (jQuery.trim($(this).attr("lanHidden")) == "true") {
    $("#videoLanguage01").show();
    $("#cc_icon").attr("lanHidden", "false");
    window.messageBus.publish(OO.EVENTS.PAUSE);
  }
  else {
    $("#videoLanguage01").hide();
    $("#cc_icon").attr("lanHidden", "true");
    window.messageBus.publish(OO.EVENTS.PLAY);
  }
}

function findCurrentCC(_locLanguage, _locCountry) {
  for (var _a = 0; _a < languageList.length; _a++) {
    var _listLang = languageList[_a].toLowerCase();
    var _locale = (_locCountry != undefined) ? (_locLanguage + "-" + _locCountry) : _locLanguage;
    // check for special cases
    if (_locale.toLowerCase() == "zh-cn") {
      _locale = "zh-hans";
    } else if (_locale.toLowerCase() == "zh-tw") {
      _locale = "zh-hant";
    }
    if (_listLang.toLowerCase() == _locale.toLowerCase()) {
      return allCaptions[_a];
    }
  }
  return [];
}

function mapLanguageCodes(localeCode) {
  switch (localeCode.toLowerCase()) {
    case "da":
      return "Dansk";
    case "de":
      return "Deutsch";
    case "en":
      return "English";
    case "en-us":
      return "English (US)";
    case "en-uk":
      return "English (UK)";
    case "es":
      return "Español";
    case "fr":
      return "Français";
    case "hi":
      return "&#2361;&#2367;&#2344;&#2381;&#2342;&#2368;";
    case "it":
      return "Italiano";
    case "ja":
      return '&#26085;&#26412;&#35486;';
    case "ko":
      return "&#51312;&#49440;&#47568;, &#54620;&#44397;&#50612;";
    case "nl":
      return "Nederlands";
    case "pt":
    case "pt-pt":
      return "Português";
    case "pt-br":
      return "Português (Brasil)";
    case "zh-hans":
      return "&#31616;&#20307;&#20013;&#25991;";
    case "zh-hant":
      return "&#32321;&#39636;&#20013;&#25991;";
    case "ar":
      return "Arabic";
    case "cs":
      return "Czech";
    case "el":
      return "Greek";
    case "fi":
      return "Finnish";
    case "fr-ca":
      return "Français (Canada)";
    case "he":
      return "Hebrew";
    case "hu":
      return "Hungarian";
    case "no":
      return "Norweigan";
    case "pl":
      return "Polish";
    case "ro":
      return "Romanian";
    case "ru":
      return "Russian";
    case "sv":
      return "Swedish";
    case "tr":
      return "Turkish";
  }
}

function addCCButton(elementId) {
  $("#" + elementId).find(".vod").append("<div id=\"cc_icon\" class=\"oo_button oo_toolbar_item oo_cc\" lanHidden=\"true\"></div>");
  $("#cc_icon").bind("click", "", ccButtonHandler);
  var playerId = elementId;
  var playerObj = $("#" + playerId);
  var vodNode = playerObj.find(".vod");
  playerObj.find('.oo_controls').attr("cc", "cc");
  var ccPopupHtml = '<div id="videoLanguage01"></div>';
  $(vodNode).append(ccPopupHtml);
  $("#videoLanguage01").append($("#ccLanguageModal"));
  $("#ccLanguageModal").show();
  $("#videoLanguage01").hide();
  $("#cc_icon").attr("lanHidden", "true");
}
function appendOverlayContent(iconId, currentItem) {
  if ($('#overlay > div').is(':empty')) {
    $('#overlay > div').append('<div class="info"><p>' + currentItem.title + '</p><p>' + currentItem.description + '</p><a href="javascript:void(0)" onclick="removeOverlay()">Close</a></div><div class="email"><h2>Email to a friend</h2><form id="sendemail"><label>Email to</label><span class="required">*</span><input id="emailfield" type="text" size="37"/><label>Message</label><textarea rows="3" cols="35"></textarea><input type="button" value="Send" id="sendbutton" class="btn btn-primary" onclick="validateForm()"/><a href="javascript:void(0)" onclick="removeOverlay()">Close</a></form><p id="errormessage">Please enter correct email addresses.<p></div><div class="share"><h2>Share this video</h2><div id="sharebuttons"><p>Share via social media</p><ul id="oo-toolbar"><li class="googleplusone"><div class="g-plusone" data-size="medium" data-annotation="none" data-callback="googlePlusOneCallback"></div></li><li class="twitter"><a href="#"><span class="icon twitter"></span></a></li><li class="linkedin"><a href="#"><span class="icon linkedin"></span></a></li><li class="facebook"><a href="#"><span class="icon facebook"></span></a></li></ul><label>Copy and paste this url to share</label><input type="text" size="37"></div><a href="javascript:void(0)" class="cancelbtn" onclick="removeOverlay()">Close</a></div><div class="embed"><h2>Add to website or blog</h2><label>Embed code</label><textarea rows="5" cols="35"><script height="384px" width="570px" src="http://player.ooyala.com/iframe.js#pbid=9eba220ad98c47cda9fdf6ba82ce607a&ec=' + ooyala_player_handle.currentItem.embed_code + '"></script></textarea><a href="javascript:void(0)" class="cancelbtn" onclick="removeOverlay()">Close</a></div>');
  }

  //Google +1
  (function () {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = '//apis.google.com/js/plusone.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();

  $('#sharebuttons input').val(burl);

  /*if(iconId == 'embed' & $('meta').attr('content').toLowerCase()!= != 'ie=edge'){
   $("#overlay > div .embed textarea").focus().select();
   }*/

  $('#overlay > div > div').each(function () {
    if (!$(this).hasClass(iconId)) {
      $(this).hide();
    }
  });
  $('#overlay > div .' + iconId).show();
}

function enableHoverToggle(toolbar) {
  //show player-toolbar
  $('#ooyalaplayer').on({
    mouseover: function () {
      //disable hover event if user clicks on any icon
      toolbar.addClass('show');
      if ($('#ooyalaplayer .plugins').hasClass('show')) {
        $('#player-toolbar > p').show();
      }
    }
    ,
    mouseout: function () {
      toolbar.removeClass('show');
    }
  });
}

function disableHoverToggle(toolbar) {
  $('#ooyalaplayer').off('mouseover mouseout');
  toolbar.removeClass('show');
}

function removeOverlay() {
  $('#overlay').remove();

  enableHoverToggle($('#ooyalaplayer .plugins'));
  //remove any active classes from the list
  $('#player-toolbar ul li span').removeClass('active');

  $('#ooyalaplayer .oo_promo div.oo_start_button').show();

  $('#ooyalaplayer .plugins').removeAttr('style');

}
function validateForm() {
  var isValid = true, str = '', email = $('#sendemail #emailfield'), emailBody = '';

  if (email.attr('type') != 'button') {
    str = (email.val() == undefined) ? '' : email.val();
    if (!str.match(/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/)) {
      isValid = false;
      email.css('border-color', '#fd5400');
    } else {
      isValid = true;
    }
  }
  if (!isValid) {
    $('#overlay > div p').show();
  }
  else {
    $('#overlay > div p').hide();
    email.css('border-color', '#ccc');
    emailBody = $('#sendemail textarea').val() + '\n\n' + location.href;
    window.location.href = 'mailto:' + $('#sendemail input').val() + '?subject=' + ooyala_player_handle.currentItem.title + ' - (video)&body='
    + encodeURIComponent(emailBody);
  }
}
function addPlayerControls() {
  var VOLUME_CONTROL = '<div class="volume-wrapper"><div class="oo_toolbar_item oo_button oo_volume oo_volume_high oo_customUI">'
      + '<div class="volume_slider"><input type="range" min="0" max="100" value="100"></div></div></div>';

  $(VOLUME_CONTROL).insertBefore($('.oo_pause')[0]);

  $('#ooyalaplayer')
      .on('mouseenter', '.volume-wrapper', function () {
        $('.volume_slider').show();
        $('.oo_controls .oo_pause,.oo_play').animate({ left: 80 }, 500);
        $('.oo_full_controls .vod .oo_scrubber').animate({ left: 120 }, 500);
        //$('.oo_scrubber_track').css('width', $('.oo_scrubber_track').width() - 38 +'px');
        $('.volume-wrapper').css({ width: 100 });
      })
      .on('mouseleave', '.volume-wrapper', function () {

        $('.volume_slider').hide();
        $('.oo_controls .oo_pause, .oo_play').animate({ left: 30 }, 500);
        $('.oo_full_controls .vod .oo_scrubber').animate({ left: 75 }, 500);
        $('.volume-wrapper').css({ width: 25 });
      })
      .find('.oo_volume input').on('change', function () {
        var volume = $(this).val() / 100;
        ooyala_player_handle.setVolume($(this).val() / 100);
      });
}