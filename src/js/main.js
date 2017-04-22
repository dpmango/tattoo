'use strict';

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

  $('.ico-nav-arrow').on('click', function () {
    $('.hero__slider').slick('prev');
  });
  $('.ico-nav-arrow--right').on('click', function () {
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
      close: function close() {
        $('html').removeClass('mfp-helper');
        _window.scrollTop(startWindowScroll);
      }
    }
  });

  $('.popup-with-move-anim').magnificPopup({
    type: 'inline',
    fixedContentPos: false,
    fixedBgPos: true,
    overflowY: 'auto',
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    mainClass: 'my-mfp-slide-bottom'
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

  // Masked input
  $("#date").mask("99/99/9999", { placeholder: "mm/dd/yyyy" });
  $("input[name='phone']").mask("9 (999) 999-9999");
  $("#tin").mask("99-9999999");
  $("#ssn").mask("999-99-9999");

  // scrollify
  // setTimeout(setScrollify, 300);
  setScrollify();
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
      setHeights: true,
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

  // YANDEX MAP
  ymaps.ready(init);
  var myMap, myPlacemark;

  function init() {
    myMap = new ymaps.Map("yaMap", {
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
});