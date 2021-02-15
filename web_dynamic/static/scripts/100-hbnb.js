$(document).ready(function () {
  const amenities = [];
  const amenitiesId = [];
  $('input').css('margin-left', '10px');
  $('.amenities input[type=checkbox]').click(function () {
    if ($(this).prop('checked')) {
      amenities.push($(this).attr('data-name'));
      amenitiesId.push($(this).attr('data-id'));
    } else {
      const index = amenities.indexOf($(this).attr('data-name'));
      amenities.splice(index, 1);
      amenitiesId.splice(index, 1);
    }
    $('.amenities h4').text(amenities.join(', ')).css({ width: '220px', height: '16px', overflow: 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' });
  });
  const states = [];
  const statesId = [];
  const cities = [];
  const citiesId = [];
  $('.locations h2 input[type=checkbox]').click(function () {
    if ($(this).prop('checked')) {
      states.push($(this).attr('data-name'));
      statesId.push($(this).attr('data-id'));
    } else {
      const index = states.indexOf($(this).attr('data-name'));
      states.splice(index, 1);
      statesId.splice(index, 1);
    }
    $('.locations h4').text(states.join(', ')).css({ width: '210px', height: '16px', overflow: 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' });
  });
  $('.locations ul ul input[type=checkbox]').click(function () {
    if ($(this).prop('checked')) {
      cities.push($(this).attr('data-name'));
      citiesId.push($(this).attr('data-id'));
    } else {
      const index = cities.indexOf($(this).attr('data-name'));
      cities.splice(index, 1);
      citiesId.splice(index, 1);
    }
    $('.locations h4').text(cities.join(', ')).css({ width: '210px', height: '16px', overflow: 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' });
  });
  function getAll (data = '{}') {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      type: 'POST',
      data: data,
      contentType: 'application/json',
      dataType: 'json',
      success: function (data) {
        for (let i = 0; i < data.length; i++) {
          $('section.places').append('<article></article>');
          $('.places article:last-child').append('<div class="title_box"></div>');
          $('.title_box:last-child').append(`<h2>${data[i].name}</h2>`);
          $('.title_box:last-child').append(`<div class="price_by_night">$${data[i].price_by_night}</div>`);
          $('article:last-child').append('<div class="information"></div>');
          if (data[i].max_guest === 1) {
            $('.information:last-child').append(`<div class="max_guest">${data[i].max_guest} Guest</div>`);
          } else { $('.information:last-child').append(`<div class="max_guest">${data[i].max_guest} Guests</div>`); }
          if (data[i].number_rooms === 1) {
            $('.information:last-child').append(`<div class="number_rooms">${data[i].number_rooms} Bedroom</div>`);
          } else { $('.information:last-child').append(`<div class="number_rooms">${data[i].number_rooms} Bedrooms</div>`); }
          if (data[i].number_bathrooms === 1) {
            $('.information:last-child').append(`<div class="number_bathrooms">${data[i].number_bathrooms} Bathroom</div>`);
          } else { $('.information:last-child').append(`<div class="number_bathrooms">${data[i].number_bathrooms} Bathrooms</div>`); }
          $('article:last-child').append('<div class="user"><b>Owner:</b> Valentina</div>');
          $('article:last-child').append(`<div class="description">${data[i].description}</div>`);
        }
      }
    });
  }
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
      getAll();
    } else {
      $('#api_status').removeClass('available');
    }
  });
  $('button').click(function () {
    $('article').remove();
    const data = {
      states: statesId,
      cities: citiesId,
      amenities: amenitiesId
    };
    getAll(JSON.stringify(data));
  });
});
