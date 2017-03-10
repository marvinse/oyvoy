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
                    $('.bxslider.top').append('<img src=\''+banner.BannerCarrousel[i].ImageUrl+'\'>');
                }else{
                    $('.bxslider.bottom').append('<img src=\''+banner.BannerCarrousel[i].ImageUrl+'\'>');
                }
            }
        });
    	$(document).ready(function(){
			$('.bxslider').bxSlider(settings);
		});
    };

    return {
        init: init
    };

}());

APP.banner.init();