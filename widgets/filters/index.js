var url = {
      '#white-papers': 1,
      '#technical-briefs': 22,
      '#datasheets': 20,
      '#case-studies': 13
    },
    selectedTab = null,
    filterMap = [
      { targetID: 'country',
        eventype: null,
        locality: null,
        url: 'http://dsg-ryan.codingbyhand.com/widgets/filters/DocumentCountryList.php/?reg=&brand='
      },
      { targetID: 'dateInterval',
        eventype: null,
        locality: null,
        url: 'http://dsg-ryan.codingbyhand.com/widgets/filters/EventDateIntervalGet.php/?brand='
      },
      { targetID: 'brand',
        eventype: null,
        locality: null,
        url: 'http://dsg-ryan.codingbyhand.com/widgets/filters/EventBrandListGet.php/?brand='
      },
      { targetID: 'product',
        eventype: null,
        locality: null,
        url: 'http://dsg-ryan.codingbyhand.com/widgets/filters/EventProductListGet.php/?brand='
      },
      { targetID: 'solution',
        eventype: null,
        locality: null,
        url: 'http://dsg-ryan.codingbyhand.com/widgets/filters/EventSolutionListGet.php/?brand='
      },
      {
        targetID: 'language',
        eventype: null,
        locality: null,
        url: 'http://dsg-ryan.codingbyhand.com/widgets/filters/EventLanguageListGet.php/?brand=',
        callback: function () {
          var initlangval = '';

          if (typeof RootPath == 'string') {
            switch (RootPath) {
              case '/br-pt/':
                initlangval = 139;
                break;
              case '/mx-es/':
                initlangval = 156;
                break;
              case '/cn-zh/':
                initlangval = 202;
                break;
              case '/jp-ja/':
                initlangval = 109;
                break;
              case '/fr-fr/':
                initlangval = 75;
                break;
              case '/de-de/':
                initlangval = 86;
                break;
              default:
                initlangval = 53;
                break;
            }

            if (location.host == 'stage-software-dell-com') {
              switch (RootPath) {
                case '/br-pt/':
                  initlangval = 139;
                  break;
                case '/mx-es/':
                  initlangval = 156;
                  break;
                case '/cn-zh/':
                  initlangval = 202;
                  break;
                case '/jp-ja/':
                  initlangval = 109;
                  break;
                case '/fr-fr/':
                  initlangval = 75;
                  break;
                case '/de-de/':
                  initlangval = 86;
                  break;
                default:
                  initlangval = 53;
                  break;
              }
            }
          }

          $(this).val(initlangval);
        }
      }
    ],
    teaserWidth = 0,
  /*
   * beforeEllipsis object collects long filter selection names that would be trimmed by ellipsis script:
   * need to keep original for Hash reuse when building. has two layers top layer for [product, solution and platform]
   * and second level for [industy] a distinction need to be done
   * as two filters can have ellipsis applied [product or solution or platform] + [industry]
   */
    beforEllipsis = {
      val: null,
      text: null,
      industry: {
        val: null,
        text: null
      }
    };


$(document).ready(function () {

  var ajaxArr = [];

  //Populate all "filter by" dropdowns
  $.each(filterMap, function (i, entry) {
    ajaxArr.push(populateDropdowns(entry.targetID, entry.url, '', entry.callback));
  });

  //When filters are loaded, execute function 'hashchange'
  $.when.apply(this, ajaxArr).done(function () {
    $(window).trigger('hashchange');
  });

});

function populateDropdowns(dropdown, url, brandId, callback) {
  $('#' + dropdown).find('option').remove();

  //if global variable RootPath is known, prepend it to the url variable
  if (typeof RootPath == 'string') {
    url = RootPath + url;
    url = url.replace('//', '/');
  }

  if (brandId == -1) {
    brandId = '';
  }

  return $.ajax({
    url: url,
    dataType: 'JSON',
    data: {'brand': brandId}
  }).done(function (dataopt) {
    var select = $('#' + dropdown);

    if ($.inArray(dropdown, ['country']) >= 0) {
      select.empty();
    }

    if (dropdown == 'country') {
      $.each(dataopt.data, function (key, val) {
        if (val.id != -1) {
          select.append('<option value="' + val.ID + '">' + val.DisplayName + '</option>');
        }
      });
    } else if (dropdown == 'language') {
      $.each(dataopt.data, function (key, val) {
        if (val.id != -1) {
          select.append('<option value="' + val.ID + '">' + val.DisplayName + '</option>');
        }
      });
    }  else if (dropdown == 'dateInterval') {
      $.each(dataopt.data, function (key, val) {
        if (val.id != -1) {
          select.append('<option value="' + val.ID + '">' + val.DisplayName + '</option>');
        }
      });
    } else if (dropdown == 'product') {
      $.each(dataopt.data, function (key, val) {
        if (val.id != -1) {
          select.append('<option value="' + val.ID + '">' + val.DisplayName + '</option>');
        }
      });
    } else if (dropdown == 'solution') {
      $.each(dataopt.data, function (key, val) {
        if (val.id != -1) {
          select.append('<option value="' + val.ID + '">' + val.DisplayName + '</option>');
        }
      });
    } else if (dropdown == 'brand') {
      $.each(dataopt.data, function (key, val) {
        if (dropdown == 'industry' || dropdown == 'region') {
          $.each(val, function (key2, val2) {
            if (val2.id != -1) {
              select.append('<option value="' + val2.ID + '">' + val2.DisplayName + '</option>');
            }
          });
        }
        else {
          if (val.id != -1) {
            select.append('<option value="' + val.ID + '">' + val.DisplayName + '</option>');
          }
        }
      });
    }
    else {
      $.each(dataopt, function (key, val) {
        if (dropdown == 'industry' || dropdown == 'region') {
          $.each(val, function (key2, val2) {
            if (val2.id != -1) {
              select.append('<option value="' + val2.ID + '">' + val2.DisplayName + '</option>');
            }
          });
        }
        else {
          if (val.id != -1) {
            select.append('<option value="' + val.ID + '">' + val.DisplayName + '</option>');
          }
        }
      });
    }

    if (typeof callback == 'function') {
      callback.call(select);
    }
  }).fail(function () {
  });
}




$(function(){
  $('.ms').multipleSelect({
    placeholder: $('.ms').data('selected'),
    minimumCountSelected: 0,
    countSelected: $('.ms').data('selected') + '&nbsp;(#)'
  });
});
