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


  $('#calendar').append('<h2>' + $days.val() + ' Days Example</h2>');

  // Main loop.
  while(date < endDate) {
    date = moment(date).add(1, 'd');
    console.log(date.format('DD MM YYYY'));
  }

});
