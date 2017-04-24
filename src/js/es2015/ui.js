$(document).ready(function(){
  const _window = $(window);
  const _document = $(document);
  ////////////////
  // UI
  ////////////////

  // file uploader
  var fileInputs = $( '.ui-file input' );
  fileInputs.each(function(i, input){
    var label	 = $(input).parent().find('span');
    var labelVal = label.html();

    $(input).on('change', function( e ){
      var fileName = '';
      if( $(this)[0].files && $(this)[0].files.length > 1 ){
        fileName = ( $(this).data('multiple-caption' ) || '' ).replace( '{count}', $(this)[0].files.length );
      } else{
        fileName = $(this).val().split( '\\' ).pop();
      }

      if( fileName ){
        label.html(fileName);
      } else{
        label.html(labelVal);
      }

    });
  });

  // datepciker
  $('.js-datepciker').datepicker({
    minDate: new Date(),
    autoClose: true,
    onSelect: function onSelect(fd, date) {

    }
  })


  ////////////////
  // FORM VALIDATIONS
  ////////////////

  var validateErrorPlacement = function(error, element) {
    error.addClass('ui-input__validation');
    error.appendTo(element.parent("div"));
  }
  var validateHighlight = function(element) {
    $(element).parent('div').addClass("has-error");
  }
  var validateUnhighlight = function(element) {
    $(element).parent('div').removeClass("has-error");
  }
  var validateSubmitHandler = function(form) {
    $(form).addClass('loading');
    $.ajax({
      type: "POST",
      url: $(form).attr('action'),
      data: $(form).serialize(),
      success: function(response) {
        $(form).removeClass('loading');
        var data = $.parseJSON(response);
        if (data.status == 'success') {
          // do something I can't test yet :)
        } else {
            $(form).find('[data-error]').html(data.message).show();
        }
      }
    });
  }

  var validatePhone = {
    required: true,
    normalizer: function(value) {
        var PHONE_MASK = '+X (XXX) XXX-XXXX';
        if (!value || value === PHONE_MASK) {
            return value;
        } else {
            return value.replace(/[^\d]/g, '');
        }
    },
    minlength: 11,
    digits: true
  }

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

  // Get price (эскизы) form
  $(".js-getprice-form").validate({
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
