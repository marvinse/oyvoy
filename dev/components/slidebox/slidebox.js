'use strict';

var APP = window.APP = window.APP || {};

APP.slidebox = (function () {

    var init = function (element) {
        console.log('APP.slidebox');
        createSlideBoxContainer();
    	bindEventsToUI();
    };

    var bindEventsToUI = function(){
    	$('.slidebox img').click(function(){
            $('.slidebox__sliders .placeholder').attr('src',$(this).data('popup'))
            $('.slidebox__sliders').fadeIn();
        });

        $('body').on('click','.slidebox__sliders__close',function(){
        	$('.slidebox__sliders').fadeOut();
        });
    };

    var createSlideBoxContainer = function(){
    	$('body').append('<div class=\"slidebox__sliders\">\
    		<div class=\"slidebox__sliders__container\">\
    			<a href=\"#\" class=\"slidebox__sliders__close\"><img src=\"images/close-card-button.png\"></a>\
    			<img class=\"placeholder\" src=\"\" \>\
    		</div>\
    	</div>');
    };

    return {
        init: init
    };

}());

APP.slidebox.init();