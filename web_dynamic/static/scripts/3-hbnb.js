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

  $.ajax({
    method: 'POST',
    url: 'http://localhost:5001/api/v1/places_search/',
    data: JSON.stringify({}),
    dataType: 'json',
    contentType: 'application/json',
    success: function (response) {
      const title = "<article><div class='title_box'><h2></h2><div class='price_by_night'></div></div>";
      const info = "<div class='information'><div class='max_guest'></div><div class='number_rooms'></div>";
      const baths = "<div class='number_bathrooms'></div></div><div class='description'></div></article>";
      const article = title + info + baths;
      response.forEach((val, index) => {
        $('section.places').append(article);
        $('.title_box h2').last().html(val.name);
        $('.price_by_night').last().html('$' + val.price_by_night);
        $('.max_guest').last().html(val.max_guest);
        $('.number_rooms').last().html(val.number_rooms);
        $('.number_bathrooms').last().html(val.number_bathrooms);
        $('.description').last().html(val.description);
      });
    }
  });
});
