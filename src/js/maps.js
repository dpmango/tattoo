'use strict';

$(document).ready(function () {
  var _window = $(window);
  var _document = $(document);

  // YANDEX MAP
  ymaps.ready(initMaps);
  var myMap, myMapContact;

  function initMaps() {
    if ($('#yaMap').length) {
      myMap = new ymaps.Map("yaMap", {
        center: [55.76, 37.64],
        zoom: 15,
        controls: []
      });
    }

    if ($('#yaMapContact').length) {
      myMapContact = new ymaps.Map("yaMapContact", {
        center: [55.76, 37.64],
        zoom: 15,
        controls: []
      });
    }

    // myPlacemark = new ymaps.Placemark([55.76, 37.64], {
    //     hintContent: 'Москва!',
    //     balloonContent: 'Столица России'
    // });
    //
    // myMap.geoObjects.add(myPlacemark);
  }

  // _window.resized(1000, function(){
  //   ymaps.ready(initMaps);
  // });
});