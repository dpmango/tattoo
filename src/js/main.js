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

  // LOGO overlay
  $('.header .ico-logo').on('mouseenter', function () {
    $('.about-logo-overlay').addClass('active');
  });
  $('.header .ico-logo').on('mouseleave', function () {
    $('.about-logo-overlay').removeClass('active');
  });

  // HEADER BG ON SCROLL
  _window.scrolled(50, function (e) {
    headerMobileBg();
  });
  _window.resized(50, function () {
    headerMobileBg();
  });
  function headerMobileBg() {
    if ($('.header').is('.header--static')) {} else {
      if (_window.width() < 768 && _window.scrollTop() > 50) {
        $('.header').addClass('header--mobile-bg');
      } else {
        $('.header').removeClass('header--mobile-bg');
      }
    }
  }
  // scrolldown icon
  $('.ico-scrolldown').on('click', function () {
    $.scrollify.move(1);
  });

  // listen horizontal scroll
  // $('.gallery__grid').scroll(function() {
  //   var $el = $('.gallery__grid');
  //   var $elAttr = $('.gallery__grid').attr('style');
  //
  //   var currPos = $el.scrollLeft();
  //   var scrolledPercent = Math.abs(100 * currPos / ( _window.width() - parseInt($elAttr.match(/\d+/))) );
  //   var setScrollPos = scrolledPercent * ((_window.width() - 70) / 100);
  //
  //   // if ( _window.width() > 768 ){
  //   //   if (currPos > 190){
  //   //     $('.gallery__filter').addClass('gallery__filter--hidden');
  //   //     $('.gallery__grid__scrollbar').addClass('full-width');
  //   //   } else {
  //   //     $('.gallery__filter').removeClass('gallery__filter--hidden');
  //   //     $('.gallery__grid__scrollbar').removeClass('full-width');
  //   //   }
  //   // }
  //   // update scrollbar
  //   $('.gallery__grid__scrollbar__dot').css(
  //     'transform', 'translate3d('+setScrollPos+'px, 0,0)'
  //   )
  // });

  $('.scrollbar-rail').scrollbar({
    autoScrollSize: false,
    "onScroll": function onScroll(y, x) {
      if (_window.width() > 768) {
        if (x.scroll > 190) {
          $('.gallery__filter').addClass('gallery__filter--hidden');
          $('.gallery__grid__scrollbar').addClass('full-width');
        } else {
          $('.gallery__filter').removeClass('gallery__filter--hidden');
          $('.gallery__grid__scrollbar').removeClass('full-width');
        }
      }
    }
  });

  $('.scrollbar-macosx').scrollbar();
  $('.images-category').scrollbar();

  // togglers
  $('.gallery').on('click', '.gallery__filter--hidden', function () {
    if ($(this).is('.show')) {} else {
      $(this).addClass('show');
    }
  });

  $('.gallery').on('click', '.gallery__filter--hidden.show .ico-filter-toggle', function (e) {
    $(this).closest('.gallery__filter').removeClass('show');
    e.stopPropagation();
  });

  // toggle on mobile
  function setGalleryFilterDisplay() {
    if (_window.width() < 768) {
      $('.gallery__filter').addClass('gallery__filter--hidden');
      $('.gallery__grid__scrollbar').addClass('full-width');
    } else {
      $('.gallery__filter').removeClass('gallery__filter--hidden');
      $('.gallery__grid__scrollbar').removeClass('full-width');
    }
  }
  setGalleryFilterDisplay();

  _window.resized(250, function () {
    setGalleryFilterDisplay();
  });

  // Gallery filter
  $('.gallery__filter__head__selected').on('click', function () {
    $(this).closest('.gallery__filter__wrapper').addClass('active');
  });

  $('.gallery__filter').on('click', '.gallery__filter__head__dropdown span', function () {
    $(this).closest('.gallery__filter__wrapper').removeClass('active');

    $('.gallery__filter__head__selected').text($(this).text());
    var selectedEl = $(this).data('filter');
    $(this).siblings().removeClass('active');
    $(this).addClass('active');

    $(this).closest('.gallery__filter').find('.gallery__filter__content').each(function (i, val) {
      if ($(val).data('filter') == selectedEl) {
        $(val).addClass('active');
      } else {
        $(val).removeClass('active');
      }
    });
  });

  // Masonry
  var $masonryGrid = $('.gallery__grid');
  function initMasonry() {
    $masonryGrid.isotope({
      layoutMode: 'masonryHorizontal',
      itemSelector: '.gallery__grid__card',
      masonryHorizontal: {
        rowHeight: 200,
        gutter: 20
      }
    });
  }
  if (_window.width() > 768) {
    setTimeout(initMasonry, 250);
  } else {
    setTimeout(initMasonry, 500);
  }

  // ISITOPE FILTER
  $('.gallery__filter__item').on('click', function () {
    $(this).siblings().removeClass('active');
    $(this).addClass('active');

    var parseFilter = $(this).data('filter');
    $masonryGrid.isotope({
      filter: parseFilter,
      layoutMode: 'masonryHorizontal',
      itemSelector: '.gallery__grid__card',
      masonryHorizontal: {
        rowHeight: 200,
        gutter: 20
      }
    });
  });

  // MASTERS HOVER FUNCTIONS
  $('.masters__card').on('mouseenter', function () {
    var bgLeft = $(this).data('bg-left');
    var bgRight = $(this).data('bg-right');

    if (bgLeft && bgRight) {
      $('.masters__bg-left').css('background-image', 'url(' + bgLeft + ')');
      $('.masters__bg-right').css('background-image', 'url(' + bgRight + ')');
    }
  });

  $('.masters__card').on('mouseleave', function () {
    $('.masters__bg-left').css('background-image', 'url(images/el/mainpageMastersBgLeft.png)');
    $('.masters__bg-right').css('background-image', 'url(images/el/mainpageMastersBgRight.png)');
  });

  // Hero slider
  $('.hero__slider').slick({
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 700,
    vertical: false,
    adaptiveHeight: false,
    dots: false,
    arrows: true,
    appendArrows: $('.hero__bottom__nav'),
    centerPadding: 0,
    draggable: true,
    easing: 'linear',
    infinite: true,
    lazyLoad: 'ondemand',
    swipe: true,
    touchMove: true,
    fade: false,
    responsive: [{
      breakpoint: 768,
      settings: {
        infinite: true,
        autoplay: false,
        draggable: false,
        swipe: false,
        touchMove: true,
        verticalSwiping: false
      }
    }]
  });

  // slider navigation
  var heroSliderTotal = $('.testimonials__slide').length;
  $('.js-heroSliderTotal').html(heroSliderTotal);

  $('.hero__slider').on('beforeChange', function (e, s, currentSlide, nextSlide) {
    $('.js-heroSliderCurrent').html(nextSlide + 1);
  });

  // $('.hero .ico-nav-arrow').on('click', function(){
  //   $('.hero__slider').slick('prev');
  // });
  // $('.hero .ico-nav-arrow--right').on('click', function(){
  //   $('.hero__slider').slick('next');
  // });

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
    fade: false,
    responsive: [{
      breakpoint: 768,
      settings: {
        dots: true
      }
    }]
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
  $('.modal__slide-subject .ico-nav-arrow').on('click', function () {
    $('.modal__slider').slick('prev');
  });
  $('.modal__slide-subject .ico-nav-arrow--right').on('click', function () {
    $('.modal__slider').slick('next');
  });

  // MOBILE SLIDERS
  // Services
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

  // MASTERS
  var _mastersSlickMobile = $('.masters__wrapper');
  var mastersSlickMobileOptions = {
    slidesToShow: 1,
    dots: true,
    arrows: false,
    mobileFirst: true,
    responsive: [{
      breakpoint: 768,
      settings: "unslick"
    }]
  };
  _mastersSlickMobile.slick(mastersSlickMobileOptions);

  _window.resized(300, function (e) {
    if (_window.width() > 768) {
      if (_mastersSlickMobile.hasClass('slick-initialized')) {
        _mastersSlickMobile.slick('unslick');
      }
      return;
    }
    if (!_mastersSlickMobile.hasClass('slick-initialized')) {
      return _mastersSlickMobile.slick(mastersSlickMobileOptions);
    }
  });

  // HERO BENEFITS
  var _heroBenefitsSlickMobile = $('.hero__benefits');
  var heroBenefitsSlickMobileOptions = {
    autoplay: false,
    autoplaySpeed: 3000,
    fade: false,
    slidesToShow: 1,
    dots: false,
    arrows: false,
    mobileFirst: true,
    pauseOnHover: false,
    responsive: [{
      breakpoint: 768,
      settings: "unslick"
    }]
  };
  _heroBenefitsSlickMobile.slick(heroBenefitsSlickMobileOptions);

  _window.resized(300, function (e) {
    if (_window.width() > 768) {
      if (_heroBenefitsSlickMobile.hasClass('slick-initialized')) {
        _heroBenefitsSlickMobile.slick('unslick');
      }
      return;
    }
    if (!_heroBenefitsSlickMobile.hasClass('slick-initialized')) {
      return _heroBenefitsSlickMobile.slick(heroBenefitsSlickMobileOptions);
    }
  });

  // manual autoplay
  if (_window.width() < 768) {
    setInterval(heroBenefitsSlickMobileAutoplay, 3000);
  }
  function heroBenefitsSlickMobileAutoplay() {
    $('.hero__slide.slick-active').find('.hero__benefits').slick('next');
  }

  _heroBenefitsSlickMobile.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    event.stopPropagation();
    if (currentSlide == slick.slideCount - 1) {
      $('.hero__slider').slick('next');
    }
  });

  // BLOG TOGGLER
  $('.js-toggle-blog').on('click', function () {
    $(this).closest('.blog').addClass('expanded');
    $(this).fadeOut();
  });

  // TESTIMONAIALS TOGGLER
  $('.testimonials__actions').on('click', 'a', function (e) {
    var selectedType = $(this).data('toggle');

    $(this).siblings().removeClass('active');
    $(this).addClass('active');

    $(this).closest('.testimonials__slide').find('.testimonials__picture img').each(function (i, val) {
      if ($(val).data('type') == selectedType) {
        $(val).fadeIn();
      } else {
        $(val).fadeOut();
      }
    });
  });

  // SEO TABS TOGGLER
  $('.seo__links').on('click', 'a', function (e) {
    var selectedTab = $(this).data('tab');

    $(this).siblings().removeClass('active');
    $(this).addClass('active');

    $(this).closest('.container').find('.seo__tab').each(function (i, val) {
      if ($(val).data('tab') == selectedTab) {
        $(val).fadeIn();
      } else {
        $(val).hide();
      }
    });
  });

  // prevent modal on mobile masters click
  // -- refactor ???
  $('.masters__card').on('click', function (e) {
    return false;
    e.stopPropagation();
    e.preventDefault();
  });

  // creates pseudo links
  $('span[data-link]').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    window.location.href = $(this).data('link');
  });

  //////////////
  // INNER
  //////////////
  $('.text-slider').slick({
    slidesToShow: 1,
    dots: false,
    arrows: true
  });

  // PANEL TOGGLER
  $('.panel__toggler').on('click', function () {
    $(this).parent().toggleClass('opened');
  });
  // collapse panel on mobile by default
  if (_window.width() < 568) {
    $('.panel').removeClass('opened');
  }

  // SERVICE PAGE
  if ($('.service').length > 0 || $('.page--testimonials').length > 0 || $('.text-page--error').length > 0) {
    $('.header').addClass('header--no-conacts');
  }

  // Masonry for inner page
  var $masonryGridImages = $('.images-masonry');
  function initMasonryInner() {
    $masonryGridImages.isotope({
      layoutMode: 'packery',
      itemSelector: '.images-masonry__card',
      percentPosition: true,
      packery: {
        gutter: '.images-masonry__gutter'
      }
    });
  }
  if (_window.width() > 768) {
    setTimeout(initMasonryInner, 250);
  } else {
    setTimeout(initMasonryInner, 500);
  }

  // togle images grid filter (mobile)
  $('.images-filter__toggle-mobile').on('click', function () {
    $(this).toggleClass('active');
    $(this).next().toggleClass('active');
  });

  // MASTER PORTFOLIO
  $('.master-portfolio__slider').slick({
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: false,
    variableWidth: true,
    speed: 700,
    dots: false,
    arrows: false,
    centerPadding: 20,
    draggable: true,
    easing: 'linear',
    infinite: false,
    lazyLoad: 'ondemand'

  });

  // Service fullwith slider
  $('.service-slider__slider').slick({
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
    fade: false,
    responsive: [{
      breakpoint: 768,
      settings: {
        dots: true
      }
    }]
  });

  // slider navigation
  var serviceSliderTotal = $('.service-slider__slide').length;
  $('.service-slider__slide').each(function (i, val) {
    $(val).find('.service-slider__slide__nav span').html(i + 1 + ' / ' + testimonialsSliderTotal);
  });

  $('.service-slider__slide__nav .ico-nav-arrow').on('click', function () {
    $('.service-slider__slider').slick('prev');
  });
  $('.service-slider__slide__nav .ico-nav-arrow--right').on('click', function () {
    $('.service-slider__slider').slick('next');
  });

  //////////////
  // MODALS
  //////////////

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
      enabled: false,
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

  $('.popup-master').magnificPopup({
    type: 'inline',
    fixedContentPos: true,
    fixedBgPos: true,
    overflowY: 'auto',
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    mainClass: 'my-mfp-slide',
    callbacks: {
      beforeOpen: function beforeOpen() {},
      open: function open() {
        $('body').addClass('popup-enabled');
        $.scrollify.disable();
      },
      close: function close() {
        $.scrollify.enable();
        $('body').removeClass('popup-enabled');
      }
    }
  });

  $('.js-close-modal').on('click', function () {
    $.magnificPopup.close();
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
  setTimeout(setScrollify, 100);
  function setScrollify() {
    $.scrollify({
      section: ".section",
      sectionName: "section-name",
      interstitialSection: "",
      easing: "easeOutExpo",
      scrollSpeed: 1100,
      offset: 0,
      scrollbars: true,
      standardScrollElements: ".seo, .footer, .gallery__grid, .gallery__filter",
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

  // setScrollify();
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

  // PRELOAD IMAGES
  function preloadImg(src) {
    $('<img/>')[0].src = src;
  }
  preloadImg('images/masters/mainpageMastersBgLeft_1.jpg');
  preloadImg('images/masters/mainpageMastersBgLeft_2.jpg');
  preloadImg('images/masters/mainpageMastersBgLeft_3.jpg');
  preloadImg('images/masters/mainpageMastersBgRight_1.jpg');
  preloadImg('images/masters/mainpageMastersBgRight_2.jpg');
  preloadImg('images/masters/mainpageMastersBgRight_3.jpg');
});