'use strict';

var APP = window.APP = window.APP || {};

APP.menu = (function () {

    var userIsLogged = true;
    var favoritesByUserExample = [{"Id":5,"UserId":2,"OfferId":8},{"Id":6,"UserId":2,"OfferId":9}]
    
    var init = function (element) {
        console.log('APP.menu');
    	bindEventsToUI();
        $('body').on('handlebar-templates-loaded',setFavorites);
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

        $('.menu__item--hamburger .submenu > li').click(function(){
            $('.menu__item--hamburger .submenu > li').hide();
            var submenuToShow = $(this).data('submenu');
            $('.'+submenuToShow).show();
        });

        $('.menu__item--hamburger .submenu .submenu-level2 > li > h3.back').click(function(){
            $(this).parent('li').hide();
            $('.menu__item--hamburger .submenu > li').show();
        }); 

        $('.menu').on('click','.menu__item--hamburger .submenu-favorites__delete',function(e){
            e.preventDefault();
            $(this).hide();
            $(this).parent('li').addClass('active');
            $(this).parent('li').find('.submenu-favorites__event').hide();
            $(this).siblings('.submenu-favorites__confirmation').show();
        });

        $('.menu').on('click','.menu__item--hamburger .submenu-favorites__confirmation__no',function(e){
            e.preventDefault();
            $(this).parent('.submenu-favorites__confirmation').hide();
            $(this).closest('li').removeClass('active');
            $(this).closest('li').find('.submenu-favorites__event').show();
            $(this).closest('li').find('.submenu-favorites__delete').show();
        });

        $('.menu').on('click','.menu__item--hamburger .submenu-favorites__confirmation__yes',function(e){
            e.preventDefault();
            $(this).closest('li').remove();
        });

        $('.menu__item--hamburger .submenu-today .submenu-today__parent-menu span').click(function(){
            $(this).parent().find('>ul').toggle();
            if($(this).parent().find('>ul').length > 0){
                $(this).toggleClass('is-active');
            }
        });

        $('.menu__item--hamburger .submenu-login__create-account span, .menu__item--hamburger .submenu-login__new-account h3.back').click(function(){
            $('.submenu-login > h3').toggle();
            $('.submenu-login__main-container').toggle();
            $('.submenu-login__new-account').toggle();
        });
    };

    var setFavorites = function(){
        if(userIsLogged){
            var favoriteHTMLTemplate = $('#handlebars-favorites').html();
            var templateScript = Handlebars.compile(favoriteHTMLTemplate);
            var html = templateScript(favoritesByUserExample);
            $('.menu .submenu-favorites ul').append(html);
        }else{
            $('.menu li[data-submenu=submenu-favorites]').remove();
        }
    };

    return {
        init: init
    };

}());

APP.menu.init();