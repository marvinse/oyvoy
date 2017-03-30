'use strict';

var APP = window.APP = window.APP || {};

APP.fullModal = (function () {

    var init = function () {
        console.log('APP.fullModal');
        $('body').on('connectToAPI-loaded',function(){
            loadImage();
            bindEventsToUI();
        });
    };

    var loadImage = function(){
        var imageUrl = APP.global.connectToAPI.getFullModalBanner().HomeImageurl;
        $('.full-modal>img').attr('src',imageUrl);
    };

    var bindEventsToUI = function(){
        if(Cookies.get('modal')!='activated'){//activate modal just the first time
            $('.full-modal').css('display','block');
            setTimeout(function(){
                $('.full-modal').fadeOut();
            },5000); 
            Cookies.set('modal', 'activated');  
        }

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