'use strict';

var APP = window.APP = window.APP || {};

APP.menu = (function () {

    var init = function (element) {
    	bindEventsToUI();
    };

    var bindEventsToUI = function(){
    	$('.menu__item span').click(function(){
    		$(this).toggleClass('is-active');
    		$(this).parent('li').find('.submenu').toggle();
    	});
    };

    return {
        init: init
    };

}());

APP.menu.init();