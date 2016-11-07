"use strict";

// Requires.
var $ = global.jQuery = require('jquery');
require('jquery-ui');
var moment = require('moment');

// Elements.
var $date = $('.date');
var $days = $('.days');
var $country = $('.country');

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
  while(date < endDate) {
    date = moment(date).add(1, 'd');

    var thisMonth = date.format('MM');
    var thisYear = date.format('YYYY');

    var $tableClone = $table.clone();
    $tableClone
      .addClass('m-' + thisMonth + '-' + thisYear);

    var $trClone = $tr.clone();
    daysArray.forEach(function(i) {
      var $tdClone = $td.clone();
      $tdClone
        .addClass('text-center')
        .text(i)
        .appendTo($trClone);
    });


    $trClone.appendTo($tableClone);
    $tableClone.appendTo($calendar);

  }

});
