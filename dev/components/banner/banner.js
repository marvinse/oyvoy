'use strict';

var APP = window.APP = window.APP || {};

APP.banner = (function () {

    var init = function () {
        console.log('APP.banner');
    	bindEventsToUI();
    };

    var settings = {
                    speed: 4000,
                    controls: false,
                    pager: false,
                    auto: true
    };

    var bindEventsToUI = function(){
    	$(document).ready(function(){
			$('.bxslider').bxSlider(settings);
		});
    };

    return {
        init: init
    };

}());

APP.banner.init();