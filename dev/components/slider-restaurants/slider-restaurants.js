'use strict';

var APP = window.APP = window.APP || {};

APP.sliderRestaurants = (function () {

    var init = function (element) {
    	console.log('APP.sliderRestaurants');
    	bindEventsToUI();
    };

    var bindEventsToUI = function(){
    	$('.slider-restaurants__restaurant > img').click(function(){
    		$('.popup').show();
    		$('.slider-restaurants__popup').fadeIn();
            $('body').trigger('initMobileSlider');
    	});

        $('.slider-restaurants__popup__close').click(function(e){
            e.preventDefault();
            $('.popup').hide();
            $('.slider-restaurants__popup').fadeOut();
            $('body').trigger('removeMobileSlider');
        });

        $('.slider-restaurants__popup .create-review, .slider-restaurants__popup__new-review__close').click(function(){
            $('.slider-restaurants__popup__new-review').toggle();
        });

        $('.slider-restaurants__popup__new-review__qualification img').on('mouseover click',function(){
            $(this).parent().removeClass('slider-restaurants__popup__new-review__qualification--1 slider-restaurants__popup__new-review__qualification--2 slider-restaurants__popup__new-review__qualification--3 slider-restaurants__popup__new-review__qualification--4 slider-restaurants__popup__new-review__qualification--5');
            $(this).parent().addClass($(this).data('class'));
        });

        $('.slider-restaurants__popup .slider-restaurants__add-to-favorites').click(function(e){
            e.preventDefault();
            var self = $(this);
            $(this).toggleClass('slider-restaurants__add-to-favorites--on');
            if( $(this).hasClass('slider-restaurants__add-to-favorites--on') ){
                $(this).find('img.added').fadeIn('1000',function(){
                    $(this).delay(2000).fadeOut('1000'); 
                });
            }else{
                $(this).find('img.removed').fadeIn('1000',function(){
                    $(this).delay(2000).fadeOut('1000'); 
                });
            }
        });

        $('.slider-restaurants__share').click(function(){
            FB.ui({
              method: 'share',
              href: 'http://www.example.com/',
            }, function(response){});
        });

        $(document).ready(function(){
            var bannersHeight = getBannerHeight();
            $('.slider-restaurants').css('height','calc(100% - '+bannersHeight+'px)');

            var slider = $('.slider-restaurants__container').bxSlider({
                slideWidth: 9999,
                minSlides: 4,
                maxSlides: 4,
                moveSlides: 2,
                pager: false,
                nextSelector: '.slider-restaurants__controllers__right',
                prevSelector: '.slider-restaurants__controllers__left',
                nextText: '',
                prevText: ''
            });
        })
    };

    var getBannerHeight = function(){
        return parseInt($('.banner').css('height')) * 2;
    }

    return {
        init: init
    };

}());

APP.sliderRestaurants.init();