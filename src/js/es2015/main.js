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
  });

  // scrollify
  $.scrollify({
    section : ".section",
    sectionName : "section-name",
    interstitialSection : "",
    easing: "easeOutExpo",
    scrollSpeed: 1100,
    offset : 0,
    scrollbars: false,
    standardScrollElements: "",
    setHeights: false,
    overflowScroll: true,
    updateHash: true,
    touchScroll:true,
    before:function(i, el) {
      console.log('current section', i);
      $('.sections-nav__dot').each(function(index, val){
        if ( $(val).data('section') == i ){
          $(val).addClass('active');
        } else{
          $(val).removeClass('active');
        }
      })
    },
    after:function() {},
    afterResize:function() {},
    afterRender:function() {}
  });

  // populate nav sections
  $('.section').each(function(i, val){
    $('.sections-nav').append('<div class="sections-nav__dot" data-section='+ i +'></div>');
    setScrollifyActiveClass();
  });

  // scrollify navigation
  $('.sections-nav').on('click', '.sections-nav__dot', function(){
    var section = $(this).data('section');
    $.scrollify.move(section);
  });

  // first screen - set active class
  function setScrollifyActiveClass(){
    var hash = window.location.hash;
    var scrollifyNumber = parseInt(hash.substring(1)) - 1;
    console.log(scrollifyNumber);
    $('.sections-nav').find('.sections-nav__dot[data-section='+ scrollifyNumber +']').addClass('active');
  }



  // Magnific Popup
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
      close: function() {
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
			preload: [0,1]
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
		}
	});

  // Masked input
  $("#date").mask("99/99/9999",{placeholder:"mm/dd/yyyy"});
  $("input[name='phone']").mask("9 (999) 999-9999");
  $("#tin").mask("99-9999999");
  $("#ssn").mask("999-99-9999");

});
