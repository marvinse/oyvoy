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
    	});

        $('.slider-restaurants__popup__close').click(function(e){
            e.preventDefault();
            $('.popup').hide();
            $('.slider-restaurants__popup').fadeOut();
        });

        $('.slider-restaurants__popup .create-review, .slider-restaurants__popup__new-review__close').click(function(){
            $('.slider-restaurants__popup__new-review').toggle();
        });

        $('.slider-restaurants__popup__new-review__qualification img').on('mouseover click',function(){
            $(this).parent().removeClass('slider-restaurants__popup__new-review__qualification--1 slider-restaurants__popup__new-review__qualification--2 slider-restaurants__popup__new-review__qualification--3 slider-restaurants__popup__new-review__qualification--4 slider-restaurants__popup__new-review__qualification--5');
            $(this).parent().addClass($(this).data('class'));
        });

        $(document).ready(function(){
            var bannersHeight = getBannerHeight();
            $('.slider-restaurants').css('height','calc(100% - '+bannersHeight+'px)');
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