$(document).ready(function(){

  const _window = $(window);
  const _document = $(document);

 	// Prevent # behavior
	$('[href="#"]').click( function(e) {
		e.preventDefault();
	});

	// Smoth scroll
	$('a[href^="#section"]').click( function() {
        var el = $(this).attr('href');
        $('body, html').animate({
            scrollTop: $(el).offset().top}, 1000);
        return false;
	});

  // Hamburger and menu
  $('.js-main-hamb').on('click', function(){
    $(this).find('.hamburger').toggleClass('is-active');
    $('.navi').toggleClass('active');
  });

  // scrolldown icon
  $('.ico-scrolldown').on('click', function(){
    $.scrollify.move(1);
  });

  // Masonry

  $('.gallery__grid').isotope({
    layoutMode: 'masonryHorizontal',
    itemSelector: '.gallery__grid__card',
    masonryHorizontal: {
      rowHeight: 200,
      gutter: 20
    }
  });

  // listen horizontal scroll
  $('.gallery__grid').scroll(function() {
    var $el = $('.gallery__grid');
    var $elAttr = $('.gallery__grid').attr('style');

    var currPos = $el.scrollLeft();
    var scrolledPercent = Math.abs(100 * currPos / ( _window.width() - parseInt($elAttr.match(/\d+/))) );
    var setScrollPos = scrolledPercent * ((_window.width() - 70) / 100);

    if (currPos > 190){
      $('.gallery__filter').addClass('gallery__filter--hidden');
      $('.gallery__grid__scrollbar').addClass('full-width');
    } else {
      $('.gallery__filter').removeClass('gallery__filter--hidden');
      $('.gallery__grid__scrollbar').removeClass('full-width');
    }

    // update scrollbar
    $('.gallery__grid__scrollbar__dot').css(
      'transform', 'translate3d('+setScrollPos+'px, 0,0)'
    )
  });

  // togglers
  $('.gallery').on('click', '.gallery__filter--hidden', function(){
    if ( $(this).is('.show') ){
    } else {
      $(this).addClass('show');
    }
  });

  $('.gallery').on('click', '.gallery__filter--hidden.show .ico-filter-toggle', function(e){
    $(this).closest('.gallery__filter').removeClass('show');
    e.stopPropagation();
  });

  // GAllery filter
  $('.gallery__filter__head__selected').on('click', function(){
    $(this).closest('.gallery__filter__wrapper').addClass('active');
  });

  $('.gallery__filter').on('click', '.gallery__filter__head__dropdown span', function(){
    $(this).closest('.gallery__filter__wrapper').removeClass('active');
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

  $('.hero__slider').on('beforeChange', function(e, s, currentSlide, nextSlide){
    $('.js-heroSliderCurrent').html(nextSlide + 1 );
  });

  $('.hero .ico-nav-arrow').on('click', function(){
    $('.hero__slider').slick('prev');
  });
  $('.hero .ico-nav-arrow--right').on('click', function(){
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
    fade: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: true
        }
      }
    ]
  });

  // slider navigation
  var testimonialsSliderTotal = $('.testimonials__slide').length
  $('.testimonials__slide').each(function(i, val){
    $(val).find('.testimonials__nav').html(i + 1 + ' / ' + testimonialsSliderTotal)
  });

  // Modal slider
  function initModalSlider(){
    $('.modal__slider').slick({
      slidesToShow: 1,
      dots: false,
      arrows: false
    });
  }
  $('.modal__slider .ico-nav-arrow').on('click', function(){
    $('.modal__slider').slick('prev');
  });
  $('.modal__slider .ico-nav-arrow--right').on('click', function(){
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
    responsive: [
      {
        breakpoint: 568,
        settings: "unslick"
      }
    ]
  }
  _servicesSlickMobile.slick(servicesSlickMobileOptions);

  // toggle slick/unslick on manual resize (feature not implemented in original slick)
  // https://github.com/kenwheeler/slick/issues/542
  _window.resized(300, function(e){
    if ( _window.width() > 568 ) {
      if (_servicesSlickMobile.hasClass('slick-initialized')) {
        _servicesSlickMobile.slick('unslick');
      }
      return
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
    responsive: [
      {
        breakpoint: 768,
        settings: "unslick"
      }
    ]
  }
  _mastersSlickMobile.slick(mastersSlickMobileOptions);

  _window.resized(300, function(e){
    if ( _window.width() > 768 ) {
      if (_mastersSlickMobile.hasClass('slick-initialized')) {
        _mastersSlickMobile.slick('unslick');
      }
      return
    }
    if (!_mastersSlickMobile.hasClass('slick-initialized')) {
      return _mastersSlickMobile.slick(mastersSlickMobileOptions);
    }
  });


  // BLOG TOGGLER
  $('.js-toggle-blog').on('click', function(){
    $(this).closest('.blog').addClass('expanded');
    $(this).fadeOut();
  });

  // prevent modal on mobile masters click
  // -- refactor ???
  $('.masters__card').on('click', function(e){
    return false;
    e.stopPropagation();
    e.preventDefault();

  });

  // creates pseudo links
  $('span[data-link]').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();

    window.location.href = $(this).data('link');
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
      beforeOpen: function() {
        startWindowScroll = _window.scrollTop();
        $('html').addClass('mfp-helper');
      },
      open: function(){
        // initialize slick
        setTimeout(initModalSlider, 500)
      },
      close: function() {
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
      beforeOpen: function() {

      },
      open: function(){
        $('body').addClass('popup-enabled');
        $.scrollify.disable();
      },
      close: function() {
        $.scrollify.enable();
        $('body').removeClass('popup-enabled');
      }
    }
  });

  $('.js-close-modal').on('click', function(){
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
			preload: [0,1]
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
		}
	});

  // scrollify
  // setTimeout(setScrollify, 300);
  function setScrollify(){
    $.scrollify({
      section : ".section",
      sectionName : "section-name",
      interstitialSection : "",
      easing: "easeOutExpo",
      scrollSpeed: 1100,
      offset : 0,
      scrollbars: true,
      standardScrollElements: ".seo, .footer, .gallery__grid",
      setHeights: false,
      overflowScroll: true,
      updateHash: true,
      touchScroll: true,
      before:function(i, el) {
        $('.sections-nav__dot').each(function(index, val){
          if ( $(val).data('section') == i ){
            $(val).addClass('active');
          } else{
            $(val).removeClass('active');
          }
        });

        if (i == 0){
          $('.header').removeClass('header--no-conacts')
        } else {
          $('.header').addClass('header--no-conacts')
        }
      },
      after:function() {},
      afterResize:function() {},
      afterRender:function() {}
    });
  }

  function checkMobileScrollify(){
    if ( _window.width() < 768 ){
      $.scrollify.disable();
    } else {
      $.scrollify.enable();
    }
  }

  setScrollify();
  checkMobileScrollify();

  // disable on mobile
  _window.resized(100, function(){
    checkMobileScrollify();
  });

  // populate nav sections
  $('.section').each(function(i, val){
    var naveName = ""
    if ( $(val).data('nav-name') ){
      naveName = $(val).data('nav-name');
    }
    $('.sections-nav').append('<div class="sections-nav__wrapper"><div class="sections-nav__dot" data-section='+ i +'></div><span>'+naveName+'</span></div>');
  });

  // set active class
  var hash = window.location.hash.substring(1);
  if (hash) {
    var scrollifyNumber = $('.section').index( $('.section[data-section-name='+ hash +']') );
    $('.sections-nav').find('.sections-nav__dot[data-section='+ scrollifyNumber +']').addClass('active');
  } else {
    $('.sections-nav').find('.sections-nav__dot[data-section='+ 0 +']').addClass('active');
  }

  // scrollify navigation
  $('.sections-nav').on('click', '.sections-nav__dot', function(){
    var section = $(this).data('section');
    $.scrollify.move(section);
  });

});
