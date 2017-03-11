'use strict';

var APP = window.APP = window.APP || {};

APP.banner = (function () {

    var init = function () {
        console.log('APP.banner');
        $('body').on('connectToAPI-loaded',function(){
            bindEventsToUI();
        });
    };

    var settings = {
        speed: 4000,
        controls: false,
        pager: false,
        auto: true
    };

    var bindEventsToUI = function(){
        var banners = APP.global.connectToAPI.getBanners(null);
        $.each(banners,function(i,banner){
            for (var i = 0; i < banner.BannerCarrousel.length; i++) {
                if(banner.Name == 'Banner Top'){
                    $('.bxslider.top').append('<img src=\''+document.location.origin+'/'+banner.BannerCarrousel[i].ImageUrl+'\'>');
                }else{
                    $('.bxslider.bottom').append('<img src=\''+document.location.origin+'/'+banner.BannerCarrousel[i].ImageUrl+'\'>');
                }
            }
        });
    	$(window).load(function(){
            $('.bxslider').bxSlider(settings);
            bannersHeight = parseInt($('.banner').css('height')) * 2;
            $('.slider-restaurants__wrapper, .slider-restaurants__popup').css('height','calc(100% - '+bannersHeight+'px)');
        });
    };

    return {
        init: init
    };

}());

APP.banner.init();