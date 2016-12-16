'use strict';

var APP = window.APP = window.APP || {};

APP.menu = (function () {

    var init = function (element) {
        console.log('APP.menu');
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
                if( !$('.slider-restaurants__popup').is(':visible') ){
                    $('.popup').hide();
                }
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

        $('.menu__item--hamburger .submenu > li').click(function(){
            $('.menu__item--hamburger .submenu > li').hide();
            var submenuToShow = $(this).data('submenu');
            $('.'+submenuToShow).show();
        });

        $('.menu__item--hamburger .submenu .submenu-level2 > li h3.back').click(function(){
            $(this).parent('li').hide();
            $('.menu__item--hamburger .submenu > li').show();
        });       
    };

    return {
        init: init
    };

}());

APP.menu.init();