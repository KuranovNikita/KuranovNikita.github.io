// $(document).ready(function(){
//     $('.carousel__slider').slick({
//         infinite: true,
//         speed: 700,
//         slidesToShow: 1,
//         repeat: true,
//         // adaptiveHeight: true,
//         prevArrow: '<button type="button" class="slick-prev"><img src="icons/leftArrow.png"></button>',
//         nextArrow: '<button type="button" class="slick-next"><img src="icons/rightArrow.png"></button>',
//         responsive: [
//             {
//                 breakpoint: 992,
//             settings: {
//                 arrows: false,
//                 dots: true,
//                 }
//             }
//         ]
//     });
//   });
$(document).ready(function(){
  const slider = tns({
    container: '.carousel__slider',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    navPosition: "bottom",
    responsive: {
      1200: {
        nav: false,  
      },
      300: {
        nav: true,  
      },
    }
  });

  document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
  }); 
  document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
  });

  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

  
  function toggleSlide(classToggle) {
    $(classToggle).each(function(i){
      $(this).on('click', function(e){
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      });
    });
  }

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

  //modal

  $('[data-modal=consultation]').on('click', function(){
    $('.overlay, #consultation').fadeIn(400);
  });

  $('.modal__close').on('click', function(){
    $('.overlay, #consultation, #order, #thanks').fadeOut(400);
  });


  $('.button_mini').each(function(i){
    $(this).on('click', function() {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn(400);
    });
  });

  function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        phone: 'required',
        email: {
          required: true,
          email: true,
        }
      },
      messages: {
        name: {
          required: "Пожалуйста, введите свое имя",
          minlength: jQuery.validator.format("Введите {0} символа!")
        },
        phone: "Пожалуйста, введите номер телефона",
        email: {
          required: "Пожалуйста, введите email",
          email: "Указан некорректный email"
        }
      }  
    });
  }

  validateForms('#consultation-form');
  validateForms('#consultation form');
  validateForms('#order form');

  $('input[name=phone]').mask("+7(999) 999-99-99");

  $('form').submit(function(e){
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function(){
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn(400);

      $('form').trigger('reset');
    });
    return false;
  });

  // scroll and pageup

  $(window).scroll(function(){
    if ($(this).scrollTop() > 1600) {
      $('.pageup').fadeIn(400);
    } else {
      $('.pageup').fadeOut(400);
    }
  });


  $("a[href^='#']").click(function(){
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
  });



});