'use strict';

$(document).ready(function () {
  var _window = $(window);
  var _document = $(document);

  // YANDEX MAP
  ymaps.ready(initMaps);
  var myMap, myMapContact, myContact;

  function initMaps() {
    // карта в подвале
    if ($('#yaMap').length) {
      myMap = new ymaps.Map("yaMap", {
        center: [55.76, 37.64],
        zoom: 15,
        controls: []
      });

      myMap.behaviors.disable('scrollZoom');
    }

    // карта в меню
    if ($('#yaMapContact').length) {
      myMapContact = new ymaps.Map("yaMapContact", {
        center: [55.76, 37.64],
        zoom: 15,
        controls: []
      });

      myMapContact.behaviors.disable('scrollZoom');
    }

    // карта на странице контактов
    if ($('#contactMap').length) {
      myContact = new ymaps.Map("contactMap", {
        center: [55.76, 37.64],
        zoom: 10
      });

      myContact.behaviors.disable('scrollZoom');
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