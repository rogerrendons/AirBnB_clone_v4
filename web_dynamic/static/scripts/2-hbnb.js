const $ = window.$;
$(function () {
  const dict = {};

  $('input:checkbox').change(function () {
    if ($(this).is(':checked')) {
      dict[$(this).attr('data-id')] = $(this).attr('data-name');
    } else { delete dict[$(this).attr('data-id')]; }

    $('DIV.amenities h4').text(Object.values(dict).join(', '));
  });

  $.getJSON('http://localhost:5001/api/v1/status/', function(data) {
    if (data.status === 'OK') {
      $('DIV.api_status').addClass('available');
    } else {
      $('DIV.api_status').removeClass('available');
    }
  });
});
