'use strict';

var APP = window.APP = window.APP || {};

APP.menu = (function () {

    var init = function (element) {
        console.log('APP.menu');
    	bindEventsToUI();
    };

    var bindEventsToUI = function(){
    	$('.menu__item > span').click(function(){
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

        $('.menu__item--hamburger .submenu-favorites__delete').click(function(e){
            e.preventDefault();
            $(this).hide();
            $(this).parent('li').addClass('active');
            $(this).parent('li').find('.submenu-favorites__event').hide();
            $(this).siblings('.submenu-favorites__confirmation').show();
        });   

        $('.menu__item--hamburger .submenu-favorites__confirmation__no').click(function(e){
            e.preventDefault();
            $(this).parent('.submenu-favorites__confirmation').hide();
            $(this).closest('li').removeClass('active');
            $(this).closest('li').find('.submenu-favorites__event').show();
            $(this).closest('li').find('.submenu-favorites__delete').show();     
        });

        $('.menu__item--hamburger .submenu-favorites__confirmation__yes').click(function(e){
            e.preventDefault();
            $(this).closest('li').remove();
        });

        $('.menu__item--hamburger .submenu-today .submenu-today__parent-menu span').click(function(){
            $(this).parent().find('>ul').toggle();
            if($(this).parent().find('>ul').length > 0){
                $(this).toggleClass('is-active');
            }
        });

    };

    return {
        init: init
    };

}());

APP.menu.init();