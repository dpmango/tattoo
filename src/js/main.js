"use strict";

// set dalay on resize event to prevent huge memory leaks
(function ($) {
  var uniqueCntr = 0;
  $.fn.resized = function (waitTime, fn) {
    if (typeof waitTime === "function") {
      fn = waitTime;
      waitTime = 50;
    }
    var tag = "scrollTimer" + uniqueCntr++;
    this.resize(function () {
      var self = $(this);
      var timer = self.data(tag);
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(function () {
        self.removeData(tag);
        fn.call(self[0]);
      }, waitTime);
      self.data(tag, timer);
    });
  };
})(jQuery);

/////////////////
// READY FUNCTION
/////////////////

$(document).ready(function () {

  var _window = $(window);
  var _document = $(document);

  // Prevent # behavior
  $('[href="#"]').click(function (e) {
    e.preventDefault();
  });

  // Smoth scroll
  $('a[href^="#section"]').click(function () {
    var el = $(this).attr('href');
    $('body, html').animate({
      scrollTop: $(el).offset().top }, 1000);
    return false;
  });

  // Hamburger and menu
  $('.js-main-hamb').on('click', function () {
    $(this).find('.hamburger').toggleClass('is-active');
    $('.navi').toggleClass('active');
  });

  // scrolldown icon
  $('.ico-scrolldown').on('click', function () {
    $.scrollify.move(1);
  });

  // Masonry
  $('.gallery__grid').masonry({
    itemSelector: '.gallery__grid__card',
    columnWidth: 300,
    gutter: 20
  });

  // Hero slider
  $('.hero__slider').slick({
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 700,
    vertical: false,
    adaptiveHeight: false,
    dots: false,
    arrows: false,
    centerPadding: 0,
    draggable: true,
    easing: 'linear',
    infinite: false,
    lazyLoad: 'ondemand',
    swipe: true,
    touchMove: true,
    fade: false
  });

  // slider navigation
  var heroSliderTotal = $('.testimonials__slide').length;
  $('.js-heroSliderTotal').html(heroSliderTotal);

  $('.hero__slider').on('beforeChange', function (e, s, currentSlide, nextSlide) {
    $('.js-heroSliderCurrent').html(nextSlide + 1);
  });

  $('.hero .ico-nav-arrow').on('click', function () {
    $('.hero__slider').slick('prev');
  });
  $('.hero .ico-nav-arrow--right').on('click', function () {
    $('.hero__slider').slick('next');
  });

  // Testimonails slider
  $('.testimonials__slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 700,
    vertical: false,
    adaptiveHeight: false,
    dots: false,
    arrows: false,
    centerPadding: 0,
    draggable: true,
    easing: 'linear',
    infinite: false,
    lazyLoad: 'ondemand',
    swipe: true,
    touchMove: true,
    fade: false
  });

  // slider navigation
  var testimonialsSliderTotal = $('.testimonials__slide').length;
  $('.testimonials__slide').each(function (i, val) {
    $(val).find('.testimonials__nav').html(i + 1 + ' / ' + testimonialsSliderTotal);
  });

  // Modal slider
  function initModalSlider() {
    $('.modal__slider').slick({
      slidesToShow: 1,
      dots: false,
      arrows: false
    });
  }
  $('.modal__slider .ico-nav-arrow').on('click', function () {
    $('.modal__slider').slick('prev');
  });
  $('.modal__slider .ico-nav-arrow--right').on('click', function () {
    $('.modal__slider').slick('next');
  });

  // MOBILE SLIDER
  var _servicesSlickMobile = $('.services__wrapper');
  var servicesSlickMobileOptions = {
    slidesToShow: 1,
    dots: true,
    arrows: false,
    mobileFirst: true,
    responsive: [{
      breakpoint: 568,
      settings: "unslick"
    }]
  };
  _servicesSlickMobile.slick(servicesSlickMobileOptions);

  // toggle slick/unslick on manual resize (feature not implemented in original slick)
  // https://github.com/kenwheeler/slick/issues/542
  _window.resized(300, function (e) {
    if (_window.width() > 568) {
      if (_servicesSlickMobile.hasClass('slick-initialized')) {
        _servicesSlickMobile.slick('unslick');
      }
      return;
    }
    if (!_servicesSlickMobile.hasClass('slick-initialized')) {
      return _servicesSlickMobile.slick(servicesSlickMobileOptions);
    }
  });

  // BLOG TOGGLER
  $('.js-toggle-blog').on('click', function () {
    $(this).closest('.blog').addClass('expanded');
    $(this).fadeOut();
  });

  // Magnific Popup
  $('.js-magnific-fullpage').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom',
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300
    }
  });

  var startWindowScroll = 0;
  $('.popup-with-zoom-anim').magnificPopup({
    type: 'inline',
    fixedContentPos: true,
    fixedBgPos: true,
    overflowY: 'auto',
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    mainClass: 'my-mfp-zoom-in',
    callbacks: {
      beforeOpen: function beforeOpen() {
        startWindowScroll = _window.scrollTop();
        $('html').addClass('mfp-helper');
      },
      open: function open() {
        // initialize slick
        setTimeout(initModalSlider, 500);
      },
      close: function close() {
        $('html').removeClass('mfp-helper');
        _window.scrollTop(startWindowScroll);
      }
    }
  });

  $('.popup-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1]
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
    }
  });

  // scrollify
  // setTimeout(setScrollify, 300);
  function setScrollify() {
    $.scrollify({
      section: ".section",
      sectionName: "section-name",
      interstitialSection: "",
      easing: "easeOutExpo",
      scrollSpeed: 1100,
      offset: 0,
      scrollbars: true,
      standardScrollElements: ".seo, .footer, .-gallery__grid",
      setHeights: false,
      overflowScroll: true,
      updateHash: true,
      touchScroll: true,
      before: function before(i, el) {
        $('.sections-nav__dot').each(function (index, val) {
          if ($(val).data('section') == i) {
            $(val).addClass('active');
          } else {
            $(val).removeClass('active');
          }
        });

        if (i == 0) {
          $('.header').removeClass('header--no-conacts');
        } else {
          $('.header').addClass('header--no-conacts');
        }
      },
      after: function after() {},
      afterResize: function afterResize() {},
      afterRender: function afterRender() {}
    });
  }

  function checkMobileScrollify() {
    if (_window.width() < 768) {
      $.scrollify.disable();
    } else {
      $.scrollify.enable();
    }
  }

  setScrollify();
  checkMobileScrollify();

  // disable on mobile
  _window.resized(100, function () {
    checkMobileScrollify();
  });

  // populate nav sections
  $('.section').each(function (i, val) {
    var naveName = "";
    if ($(val).data('nav-name')) {
      naveName = $(val).data('nav-name');
    }
    $('.sections-nav').append('<div class="sections-nav__wrapper"><div class="sections-nav__dot" data-section=' + i + '></div><span>' + naveName + '</span></div>');
  });

  // set active class
  var hash = window.location.hash.substring(1);
  if (hash) {
    var scrollifyNumber = $('.section').index($('.section[data-section-name=' + hash + ']'));
    $('.sections-nav').find('.sections-nav__dot[data-section=' + scrollifyNumber + ']').addClass('active');
  } else {
    $('.sections-nav').find('.sections-nav__dot[data-section=' + 0 + ']').addClass('active');
  }

  // scrollify navigation
  $('.sections-nav').on('click', '.sections-nav__dot', function () {
    var section = $(this).data('section');
    $.scrollify.move(section);
  });

  ////////////////
  // UI
  ////////////////

  // file uploader
  var fileInputs = $('.ui-file input');
  fileInputs.each(function (i, input) {
    var label = $(input).parent().find('span');
    var labelVal = label.html();

    $(input).on('change', function (e) {
      var fileName = '';
      if ($(this)[0].files && $(this)[0].files.length > 1) {
        fileName = ($(this).data('multiple-caption') || '').replace('{count}', $(this)[0].files.length);
      } else {
        fileName = $(this).val().split('\\').pop();
      }

      if (fileName) {
        label.html(fileName);
      } else {
        label.html(labelVal);
      }
    });
  });

  // datepciker
  $('.js-datepciker').datepicker({
    minDate: new Date(),
    autoClose: true,
    onSelect: function onSelect(fd, date) {}
  });

  // YANDEX MAP
  ymaps.ready(initMaps);
  var myMap, myMapContact;

  function initMaps() {
    myMap = new ymaps.Map("yaMap", {
      center: [55.76, 37.64],
      zoom: 15,
      controls: []
    });

    myMapContact = new ymaps.Map("yaMapContact", {
      center: [55.76, 37.64],
      zoom: 15,
      controls: []
    });

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

  ////////////////
  // FORM VALIDATIONS
  ////////////////

  var validateErrorPlacement = function validateErrorPlacement(error, element) {
    error.addClass('ui-input__validation');
    error.appendTo(element.parent("div"));
  };
  var validateHighlight = function validateHighlight(element) {
    $(element).parent('div').addClass("has-error");
  };
  var validateUnhighlight = function validateUnhighlight(element) {
    $(element).parent('div').removeClass("has-error");
  };
  var validateSubmitHandler = function validateSubmitHandler(form) {
    $(form).addClass('loading');
    $.ajax({
      type: "POST",
      url: $(form).attr('action'),
      data: $(form).serialize(),
      success: function success(response) {
        $(form).removeClass('loading');
        var data = $.parseJSON(response);
        if (data.status == 'success') {
          // do something I can't test yet :)
        } else {
          $(form).find('[data-error]').html(data.message).show();
        }
      }
    });
  };

  var validatePhone = {
    required: true,
    normalizer: function normalizer(value) {
      var PHONE_MASK = '+X (XXX) XXX-XXXX';
      if (!value || value === PHONE_MASK) {
        return value;
      } else {
        return value.replace(/[^\d]/g, '');
      }
    },
    minlength: 11,
    digits: true
  };

  ////////
  // FORMS

  // modal entry form
  $(".js-entry-form").validate({
    errorPlacement: validateErrorPlacement,
    highlight: validateHighlight,
    unhighlight: validateUnhighlight,
    submitHandler: validateSubmitHandler,
    rules: {
      name: "required",
      email: {
        required: true,
        email: true
      },
      phone: validatePhone
    },
    messages: {
      name: "Заполните это поле",
      email: {
        required: "Заполните это поле",
        email: "Email содержит неправильный формат"
      },
      phone: {
        required: "Заполните это поле",
        minlength: "Введите корректный телефон"
      }
    }
  });

  // blog form
  $(".blog__promo__form").validate({
    errorPlacement: validateErrorPlacement,
    highlight: validateHighlight,
    unhighlight: validateUnhighlight,
    submitHandler: validateSubmitHandler,
    rules: {
      name: "required",
      email: {
        required: true,
        email: true
      },
      phone: validatePhone
    },
    messages: {
      name: "Заполните это поле",
      email: {
        required: "Заполните это поле",
        email: "Email содержит неправильный формат"
      },
      phone: {
        required: "Заполните это поле",
        minlength: "Введите корректный телефон"
      }
    }
  });
});