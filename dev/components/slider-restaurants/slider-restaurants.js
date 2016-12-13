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