"use strict";

// Requires.
var $ = global.jQuery = require('jquery');
require('jquery-ui');
var moment = require('moment');

// Holiday Api.
var apikey = 'fd30170a-e3fd-4a57-a028-41534dadf589';
var holiday = require('node-holidayapi');
var hapi = new holiday(apikey).v1;

// Elements.
var $date = $('.date');
var $days = $('.days');
var $country = $('.country');
console.log($country);

// Datepicker.
$date.datepicker({
  dateFormat: 'm/d/yy',
  changeMonth: true,
  changeYear: true
});


// Form handler.
$('.render').click(function(e) {
  e.preventDefault();

  var daysArray = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  var date = moment($date.datepicker('getDate'));
  var endDate = moment(date).add($days.val(), 'd');

  var $calendar = $('#calendar');

  $calendar.html('');

  // Templates.
  var $table = $('<table class="table table-bordered"><thead></thead><tbody></tbody></table>');
  var $tr = $('<tr></tr>');
  var $th = $('<th></th>');
  var $td = $('<td></td>');

  $calendar.append('<h2>' + $days.val() + ' Days Example</h2>');

  // Main loop.
  var j = 1;
  while(date < endDate) {
    var thisMonth = date.format('MM');
    var thisYear = date.format('YYYY');

    // Table.
    var $tableClone = $table.clone();
    $tableClone
      .addClass('m-' + thisMonth + '-' + thisYear);

    // Header of days.
    var $trClone = $tr.clone();
    daysArray.forEach(function(i) {
      var $thClone = $th.clone();
      $thClone
        .addClass('text-center')
        .text(i)
        .appendTo($trClone);
    });
    $tableClone.find('thead').append($trClone);

    // Table title.
    var $trClone = $tr.clone();
    $trClone
      .html($th
        .clone()
        .attr('colspan', 7)
        .addClass('text-center')
        .text(date.format('MMMM YYYY')));

    $tableClone.find('thead').append($trClone);

    // Invalid dates.
    var positionInWeek = date.format('d');
    var $trClone = $tr.clone();
    for(var i = 0; i < positionInWeek; i++) {
      $trClone
        .append($td
          .clone()
          .addClass('active')
          .html('&nbsp'));
    }

    // Valid dates.
    for(var i = positionInWeek; i < 7; i++) {
      var className = (i == 0 || i == 6) ? 'yellow' : 'green';
      $trClone
        .append($td
          .clone()
          .attr('title', j)
          .addClass(className)
          .addClass('d-' + date.format('YYYY-MM-DD'))
          .text(date.format('D')));
      date = moment(date).add(1, 'd');
      j++;
    }
    $trClone.appendTo($tableClone);

    $tableClone.appendTo($calendar);

    var lastMonthDay = moment(date).endOf('month');

    while(thisMonth == date.format('MM')) {
      var $trClone = $tr.clone();

      for(var i = 0; i < 7; i++) {
        if(date > lastMonthDay) {
          $trClone
            .append($td
              .clone()
              .addClass('active')
              .html('&nbsp'));
        } else {
          var className = (i == 0 || i == 6) ? 'yellow' : 'green';
          $trClone
            .append($td
              .clone()
              .attr('title', j)
              .addClass(className)
              .addClass('d-' + date.format('YYYY-MM-DD'))
              .text(date.format('D')));
          date = moment(date).add(1, 'd');          
          j++;
        }
      }
      $trClone.appendTo($tableClone);
    }

    // Holiday Check here.
    if(thisYear == '2008') {
      console.log($country.val());
      var parameters = {
        country: $country.val(),
        year: thisYear,
        month: thisMonth
      }

      hapi.holidays(parameters, function (err, data) {
        data.holidays.forEach(function(i) {
          $('.d-' + i.date)
            .addClass('orange')
            .attr('title', i.name);
        });
      });
    }

  }

});
