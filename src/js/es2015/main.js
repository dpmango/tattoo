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
  var storeTopPostion = 0;
  var storeScrollifySection;
  var naviOpened = false
  $('.js-main-hamb').on('click', function(){
    $(this).find('.hamburger').toggleClass('is-active');
    $('.navi').toggleClass('active');

    if (naviOpened){
      naviOpened = false
    } else {
      naviOpened = true
    }

    if ( naviOpened ){
      storeTopPostion = _window.scrollTop();
      $('html').addClass('locked');
      console.log(storeScrollifySection);
      $.scrollify.disable();
      // $('body').bind('scroll', function(e){e.preventDefault()})
      console.log(storeTopPostion);
    } else {
      _window.scrollTop(storeTopPostion);
      // $('body').unbind('scroll')
      $('html').removeClass('locked');
      $.scrollify.enable();
      $.scrollify.move(storeScrollifySection);
    }
  });

  // LOGO overlay
  $('.header .ico-logo').on('mouseenter', function(){
    $('.about-logo-overlay').addClass('active')
  });
  $('.header .ico-logo').on('mouseleave', function(){
    $('.about-logo-overlay').removeClass('active')
  });

  // HEADER BG ON SCROLL
  _window.scrolled(50, function(e){
    headerMobileBg();
  });
  _window.resized(50, function(){
    headerMobileBg();
  });
  function headerMobileBg(){
    if ( $('.header').is('.header--static') ){

    } else {
      if ( _window.width() < 768 && _window.scrollTop() > 50 ){
        $('.header').addClass('header--mobile-bg');
      } else {
        $('.header').removeClass('header--mobile-bg');
      }
    }
  }
  // scrolldown icon
  $('.ico-scrolldown').on('click', function(){
    $.scrollify.move(1);
  });

  $('.scrollbar-rail').scrollbar({
    autoScrollSize: false,
    "onScroll": function(y, x){
      if ( _window.width() > 768 ){
        if (x.scroll > 190){
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
  $('.scroll-me').scrollbar();
  $('.modal__master').scrollbar();

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

  // toggle on mobile
  function setGalleryFilterDisplay(){
    if ( _window.width() < 768){
      $('.gallery__filter').addClass('gallery__filter--hidden');
      $('.gallery__grid__scrollbar').addClass('full-width');
    } else {
      $('.gallery__filter').removeClass('gallery__filter--hidden');
      $('.gallery__grid__scrollbar').removeClass('full-width');
    }
  }
  setGalleryFilterDisplay();

  _window.resized(250, function(){
    setGalleryFilterDisplay();
  });

  // Gallery filter
  $('.gallery__filter__head__selected').on('click', function(){
    $(this).closest('.gallery__filter__wrapper').addClass('active');
  });

  $('.gallery__filter').on('click', '.gallery__filter__head__dropdown span', function(){
    $(this).closest('.gallery__filter__wrapper').removeClass('active');

    $('.gallery__filter__head__selected').text($(this).text());
    var selectedEl = $(this).data('filter');
    $(this).siblings().removeClass('active');
    $(this).addClass('active');

    $(this).closest('.gallery__filter').find('.gallery__filter__content').each(function(i, val){
      if ( $(val).data('filter') == selectedEl ){
        $(val).addClass('active');
      } else {
        $(val).removeClass('active');
      }
    });

  });

  // Masonry
  var $masonryGrid = $('.gallery__grid');
  function initMasonry(){
    $masonryGrid.isotope({
      layoutMode: 'masonryHorizontal',
      itemSelector: '.gallery__grid__card',
      masonryHorizontal: {
        rowHeight: 200,
        gutter: 20
      }
    });
  }
  if ( _window.width() > 768 ){
    setTimeout(initMasonry, 250);
  } else {
    setTimeout(initMasonry, 500);
  }


  // ISITOPE FILTER
  $('.gallery__filter__item').on('click', function(){
    $(this).siblings().removeClass('active');
    $(this).addClass('active');

    var parseFilter = $(this).data('filter')
    $masonryGrid.isotope({
      filter: parseFilter,
      layoutMode: 'masonryHorizontal',
      itemSelector: '.gallery__grid__card',
      masonryHorizontal: {
        rowHeight: 200,
        gutter: 20
      }
    })
  });

  // SERVICE HOVER FUNCTiONS
  var storedServiceHover = $('.js-append-hover-services img').attr('src');

    $('.services__item').hover(
      function(){
        var bg = $(this).data('bg');
        if (bg){
          var createdServiceHoverEl = "<img src="+ bg +" class='services-bg' alt=''/>"
          $('.js-append-hover-services').append(createdServiceHoverEl);
          setTimeout(function(){
            $('.services-bg').addClass('animate');
          }, 10)


        }
      }, function(){

        $('.js-append-hover-services img').each(function(i, val){
          if ( $(val).is('.js-static') ){

          } else {
            $(val).remove();
          }
        });

      });




  // MASTERS HOVER FUNCTIONS
  var hoverIteration = 0;
  $('.masters__card').on('mouseenter', function(){
    // parse hover bg
    var bgLeft = $(this).data('bg-left');
    var bgRight = $(this).data('bg-right');

    // if present
    if (bgLeft && bgRight){
      hoverIteration = hoverIteration + 1;
      console.log(hoverIteration);
      // create element and assign global variable
      var storebgLeftEl = '<div class="masters__bg-left" data-iteration="'+hoverIteration+'" style="background-image: url(' + bgLeft + ')"></div>'
      var storebgRightEl = '<div class="masters__bg-right" data-iteration="'+hoverIteration+'" style="background-image: url(' + bgRight + ')"></div>'

      $('.js-append-master-bg').append(storebgLeftEl);
      $('.js-append-master-bg').append(storebgRightEl);

      // animate then
      setTimeout(function(){
        $('.masters__bg-left').not('.default').addClass('animate');
        $('.masters__bg-right').not('.default').addClass('animate');
      }, 10)
    }
  });


  $('.masters__card').on('mouseleave', function(){
    setTimeout(function(){
      $('.masters__bg-left').each(function(i, val){
        if ( $(val).data('iteration') && $(val).data('iteration') != hoverIteration ){
          $(val).remove();
        }
      });
    }, 1000);

    setTimeout(function(){
      $('.masters__bg-right').each(function(i, val){
        if ( $(val).data('iteration') && $(val).data('iteration') != hoverIteration ){
          $(val).remove();
        }
      });
    }, 1300);

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
    responsive: [
      {
        breakpoint: 768,
        settings: {
          infinite: true,
          autoplay: false,
          draggable: false,
          swipe: false,
          touchMove: true,
          verticalSwiping: false,
          centerMode: true
        }
      }
    ]
  });

  // slider navigation
  var heroSliderTotal = $('.testimonials__slide').length;
  $('.js-heroSliderTotal').html(heroSliderTotal);

  // store hero bg
  var defaultHeroBg = $('.hero').css('background-image');
  $('.hero__slider').on('beforeChange', function(e, s, currentSlide, nextSlide){
    $('.js-heroSliderCurrent').html(nextSlide + 1 );

    // change hero bg
    s.$slides.each(function(i, slide){
      if ( $(slide).data('slick-index') == nextSlide ){
        // if the slide have bg attr, change hero
        if ( $(slide).data('bg') ){
          var setBg = $(slide).data('bg');
          $('.hero').css('background-image', 'url(' + setBg + ')')
        } else {
          // otherwise reset to default
          $('.hero').css('background-image', defaultHeroBg )
        }
      }


    });

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
  $('.modal__slide-subject .ico-nav-arrow').on('click', function(){
    $('.modal__slider').slick('prev');
  });
  $('.modal__slide-subject .ico-nav-arrow--right').on('click', function(){
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
    adaptiveHeight: true,
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
    responsive: [
      {
        breakpoint: 768,
        settings: "unslick"
      }
    ]
  }
  _heroBenefitsSlickMobile.slick(heroBenefitsSlickMobileOptions);

  _window.resized(300, function(e){
    if ( _window.width() > 768 ) {
      if (_heroBenefitsSlickMobile.hasClass('slick-initialized')) {
        _heroBenefitsSlickMobile.slick('unslick');
      }
      return
    }
    if (!_heroBenefitsSlickMobile.hasClass('slick-initialized')) {
      return _heroBenefitsSlickMobile.slick(heroBenefitsSlickMobileOptions);
    }
  });

  // manual autoplay
  if ( _window.width() < 768 ) {
    setInterval(heroBenefitsSlickMobileAutoplay, 3000)
  }
  function heroBenefitsSlickMobileAutoplay(){
    $('.hero__slide.slick-active').find('.hero__benefits').slick('next');
  }

  _heroBenefitsSlickMobile.on('beforeChange', function(event, slick, currentSlide, nextSlide){
    event.stopPropagation();
    if ( currentSlide == slick.slideCount - 1 ){
      $('.hero__slider').slick('next');
    }
  });


  // BLOG TOGGLER
  $('.js-toggle-blog').on('click', function(){
    $(this).closest('.blog').addClass('expanded');
    $(this).fadeOut();
  });

  // TESTIMONAIALS TOGGLER
  $('.testimonials__actions').on('click', 'a', function(e){
    var selectedType = $(this).data('toggle');

    $(this).siblings().removeClass('active');
    $(this).addClass('active');

    $(this).closest('.testimonials__slide').find('.testimonials__picture img').each(function(i, val){
      if ( $(val).data('type') == selectedType ){
        $(val).fadeIn();
      } else {
        $(val).fadeOut();
      }
    });
  });

  // SEO TABS TOGGLER
  $('.seo__links').on('click', 'a', function(e){
    var selectedTab = $(this).data('tab');

    $(this).siblings().removeClass('active');
    $(this).addClass('active');

    $(this).closest('.container').find('.seo__tab').each(function(i, val){
      if ( $(val).data('tab') == selectedTab ){
        $(val).fadeIn();
      } else {
        $(val).hide();
      }
    });
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
  // INNER
  //////////////
  $('.text-slider').slick({
    slidesToShow: 1,
    dots: false,
    arrows: true
  });

  // Change slider on price row click or open modal
  $('.price-row a').on('click', function(){
    var selectedSlide = $(this).data('slide') - 1 ;
    var openImage = $(this).data('image');

    // disable slider navigation
    // if (selectedSlide && _window.width() > 768){
    //   $('.text-slider').slick('slickGoTo', selectedSlide)
    // }

    if (openImage && _window.width() < 768){
      $.magnificPopup.open({
        items: {
          src: openImage
        },
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
    }
  });

  // PANEL TOGGLER
  $('.panel__toggler').on('click', function(){
    $(this).parent().toggleClass('opened')
  });
  // collapse panel on mobile by default
  if ( _window.width() < 568 ){
    $('.panel').removeClass('opened')
  }

  // SERVICE PAGE
  if ( $('.service').length > 0 || $('.page--testimonials').length > 0 || $('.text-page--error').length > 0 ){
    $('.header').addClass('header--no-conacts')
  }

  // Masonry for inner page
  var $masonryGridImages = $('.images-masonry');
  function initMasonryInner(){
    $masonryGridImages.isotope({
      layoutMode: 'packery',
      itemSelector: '.images-masonry__card',
      percentPosition: true,
      packery: {
        gutter: '.images-masonry__gutter'
      }
    });
  }
  if ( _window.width() > 768 ){
    setTimeout(initMasonryInner, 250);
  } else {
    setTimeout(initMasonryInner, 500);
  }

  // togle images grid filter (mobile)
  if ( $('.images-filter__toggle-mobile').length > 0 ){
    hideCategoryFilter();
    _window.resize(100, function(){
      hideCategoryFilter();
    })
  }
  function hideCategoryFilter(){
    if ( _window.width() < 568 ){
      $('.images-category').addClass('hidden');
    } else {
      $('.images-category').removeClass('hidden');
    }
  }

  // filter btn on mobile
  $('.images-filter__toggle-mobile').on('click', function(){
    $(this).toggleClass('active');
    $('.images-filter').toggleClass('active');
    $('.images-category').toggleClass('active');
  });

  // filter item
  $('.images-filter__item').on('click', function(){
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
  });

  // mobile show more toggler
  $('.js-toggle-gallery-mobile').on('click', function(){
    // something here
    // ajax like ?

  });

  // PICABOUT SLIDER
  $('.images-picabout__slider').slick({
    adaptiveHeight: true,
    dots: false,
    arrows: false,
    infinite: true,
    lazyLoad: 'ondemand'
  });

  $('.images-picabout__slider .ico-nav-left').on('click', function(){
    $('.images-picabout__slider').slick('prev');
  });
  $('.images-picabout__slider .ico-nav-right').on('click', function(){
    $('.images-picabout__slider').slick('next');
  });

  // MASTER PORTFOLIO
  $('.master-portfolio__slider').slick({
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 7,
    slidesToScroll: 1,
    centerMode: false,
    variableWidth: true,
    speed: 500,
    dots: false,
    arrows: false,
    centerPadding: 20,
    draggable: true,
    easing: 'linear',
    infinite: true,
    lazyLoad: 'ondemand'
  });

  $('.master-portfolio__head__nav .ico-nav-arrow:first-child').on('click', function(){
    $('.master-portfolio__slider').slick('prev');
  });
  $('.master-portfolio__head__nav .ico-nav-arrow--right').on('click', function(){
    $('.master-portfolio__slider').slick('next');
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
  var serviceSliderTotal = $('.service-slider__slide').length
  $('.service-slider__slide').each(function(i, val){
    $(val).find('.service-slider__slide__nav span').html(i + 1 + ' / ' + testimonialsSliderTotal)
  });

  $('.service-slider__slide__nav .ico-nav-arrow').on('click', function(){
    $('.service-slider__slider').slick('prev');
  });
  $('.service-slider__slide__nav .ico-nav-arrow--right').on('click', function(){
    $('.service-slider__slider').slick('next');
  });

  // Price slider
  var _priceSlickMobile = $('.service-price__wrapper');
  var priceSlickMobileOptions = {
    slidesToShow: 3,
    slidesToScroll: 3,
    dots: true,
    arrows: false,
    mobileFirst: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 0,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 992,
        settings: "unslick"
      }
    ]
  }
  _priceSlickMobile.slick(priceSlickMobileOptions);

  _window.resized(300, function(e){
    if ( _window.width() > 992 ) {
      if (_priceSlickMobile.hasClass('slick-initialized')) {
        _priceSlickMobile.slick('unslick');
      }
      return
    }
    if (!_priceSlickMobile.hasClass('slick-initialized')) {
      return _priceSlickMobile.slick(priceSlickMobileOptions);
    }
  });


  // VIDEO PLAY
  $('.video .ico-video-play').on('click', function(){
    var videoId = $(this).closest('.video').data('video-id');
    var appendedVideo = "<iframe src='https://www.youtube.com/embed/"+ videoId +"?autoplay=1' width=100% height=100% frameborder=0 allowfullscreen></iframe>";
    $(this).closest('.video').append(appendedVideo);
  });

  // toggler school
  $('.js-toggle-shool').on('click', function(){
    $(this).closest('.service-courses__course').toggleClass('active');

  })
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
      beforeOpen: function() {
        startWindowScroll = _window.scrollTop();
        // $('html').addClass('mfp-helper');
      },
      open: function(){
        // initialize slick
        setTimeout(initModalSlider, 500)
      },
      close: function() {
        // $('html').removeClass('mfp-helper');
        // _window.scrollTop(startWindowScroll);
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
		tLoading: 'Загрузка изображений #%curr%...',
		mainClass: 'mfp-img-mobile',
    closeBtnInside: false,
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1]
		},
		image: {
			tError: '<a href="%url%">Иозбражение #%curr%</a> не неайдено.'
		}
	});

  // scrollify
  setTimeout(setScrollify, 100);
  function setScrollify(){
    $.scrollify({
      section : ".section",
      sectionName : "section-name",
      interstitialSection : "",
      easing: "easeOutExpo",
      scrollSpeed: 1100,
      offset : 0,
      scrollbars: true,
      standardScrollElements: ".seo, .footer, .gallery__grid, .gallery__filter",
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
        storeScrollifySection = i;
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

  // setScrollify();
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
  preloadImg('images/el/mainpageServicesBG_1.jpg');
  preloadImg('images/el/mainpageServicesBG_2.jpg');
  preloadImg('images/el/mainpageServicesBG_3.jpg');
  preloadImg('images/el/mainpageServicesBG_4.jpg');
  preloadImg('images/el/mainpageServicesBG_5.jpg');
  preloadImg('images/el/mainpageServicesBG_6.jpg');


});
