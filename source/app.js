"use strict";

var $ = global.jQuery = require('jquery');
require('jquery-ui');
var moment = require('moment');

var $date = $('.date');
var $days = $('.days');
var $country = $('.country');

$date.datepicker({
  dateFormat: 'm/d/yy',
  changeMonth: true,
  changeYear: true
});


$('.render').click(function(e) {
  e.preventDefault();

});