'use strict';

var APP = window.APP = window.APP || {};

APP.menu = (function () {

    var init = function (element) {
    	bindEventsToUI();
    };

    var bindEventsToUI = function(){
    	$('.menu__item span').click(function(){
    		$(this).toggleClass('is-active');
            var parent = $(this).parent('li');
    		parent.find('.submenu').toggle();
            parent.siblings('li').find('.submenu').hide();
            parent.siblings('li').find('>span').removeClass('is-active');
            if( $(this).hasClass('is-active') ){
                $('.popup').show();
            }else{
                $('.popup').hide();
            }
    	});
        $('.menu__item--calendar .submenu__items a').click(function(e){
            e.preventDefault();
            var index = $(this).index();
            $(this).addClass('is-active');
            $(this).siblings().removeClass('is-active');
            var newListActive = $(this).parents('.submenu').find('>li').eq(index);
            newListActive.siblings('li').hide();
            newListActive.show();
        });
    };

    return {
        init: init
    };

}());

APP.menu.init();