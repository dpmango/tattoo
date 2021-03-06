$(document).ready(function(){
  const _window = $(window);
  const _document = $(document);

  // check devise
  var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };

  // YANDEX MAP
  ymaps.ready(initMaps);
  var myMap, myMapContact, myContact;

  function initMaps(){
    // карта в подвале
    if ( $('#yaMap').length ){
      myMap = new ymaps.Map("yaMap", {
          center: [55.76, 37.64],
          zoom: 15,
          controls: []
      });

      myMap.behaviors.disable('scrollZoom');
      myMap.behaviors.disable('multiTouch');

      if(isMobile.any()){
        myMap.behaviors.disable('drag');
      }
    }

    // карта в меню
    if ( $('#yaMapContact').length ){
      myMapContact = new ymaps.Map("yaMapContact", {
          center: [55.76, 37.64],
          zoom: 15,
          controls: []
      });

      myMapContact.behaviors.disable('scrollZoom');
    }

    // карта на странице контактов
    if ( $('#contactMap').length ){
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
