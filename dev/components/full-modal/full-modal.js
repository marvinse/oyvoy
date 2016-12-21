'use strict';

var APP = window.APP = window.APP || {};

APP.fullModal = (function () {

    var init = function () {
        console.log('APP.fullModal');
    	bindEventsToUI();
    };

    var bindEventsToUI = function(){
    	setTimeout(function(){
            $('.full-modal').fadeOut();
        },5000);

        $('.full-modal__close').click(function(e){
            e.preventDefault();
            $('.full-modal').fadeOut();
        });
    };

    return {
        init: init
    };

}());

APP.fullModal.init();