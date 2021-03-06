'use strict';

var APP = window.APP = window.APP || {};

APP.slidebox = (function () {

    var sizeOfEachSlide = 510;
    var eventsAlreadyBinded = false;

    var init = function (element) {
        console.log('APP.slidebox');
    };

    var setImagesForSlidebox = function(slideboxImages){
        //empty the slidebox and then fill it
        $('.slidebox__container .slidebox').html('');
        $.each(slideboxImages,function(i,slideboxImage){
            $('.slidebox__container .slidebox').append('<img data-popup="'+document.location.origin+'/'+slideboxImage.ImageUrl+'" src="'+document.location.origin+'/'+slideboxImage.ImageUrl+'" />');
        });
        if(!eventsAlreadyBinded){
            bindEventsToUI();
            eventsAlreadyBinded = true;
        }
    };

    var bindEventsToUI = function(){

        $('.slidebox').on('click','img',function(){
            removeSlideBoxContainer();
            createSlideBoxContainer( $(this).parent('.slidebox'), $(this).index() );
            $('.slidebox__sliders').fadeIn();
        });

        $('body').on('click','.slidebox__sliders__close',function(){
        	$('.slidebox__sliders').fadeOut();
        });

        $('body').on('click','.slidebox__sliders__control-left, .slidebox__sliders__control-right',function(){
            var currentLeft = parseInt($('.slidebox__sliders__image-container').css('left'));
            var containerSize = parseInt($('.slidebox__sliders__image-container').css('width'));
            if( $(this).hasClass('slidebox__sliders__control-left') ){
                currentLeft = (currentLeft == 0) ? parseInt(0 - containerSize + sizeOfEachSlide) : (currentLeft + sizeOfEachSlide);
            }else{//right
                currentLeft = (currentLeft - sizeOfEachSlide + containerSize == 0) ? 0 : currentLeft - sizeOfEachSlide;
            }
            $('.slidebox__sliders__image-container').css('left',currentLeft);
        });

        $('body').on('click','.slidebox__controllers__left a',function(){
            window.slideboxmobile.goToPrevSlide();
        });

        $('body').on('click','.slidebox__controllers__right a',function(){
            window.slideboxmobile.goToNextSlide();
        });

        $('body').on('initMobileSlider',function(){
            $('.slider-restaurants--desktop').remove();
            $('.slidebox').off('click', 'img');
            window.slideboxmobile = $('.slidebox--mobile').bxSlider({
                slideWidth: 9999,
                minSlides: 4,
                maxSlides: 4,
                moveSlides: 2,
                pager: false,
                nextText: '',
                prevText: '',
                auto: false
            });
        });

        $('body').on('removeMobileSlider',function(){
            $('.slidebox__controllers .slidebox__controllers__left a, .slidebox__controllers .slidebox__controllers__right a').remove();
            window.slideboxmobile.destroySlider();
        });
        
    };

    var removeSlideBoxContainer = function(){
        $('.slidebox__sliders').remove();
    };

    var createSlideBoxContainer = function( slideboxParent, startIndex ){
        var containerSize = 0;
    	$('body').append('<div class=\"slidebox__sliders\">\
    		<div class=\"slidebox__sliders__container\">\
                <div class=\"slidebox__sliders__controls\">\
                    <img class=\"slidebox__sliders__close\" src=\"images/slidebox-close.png\">\
                    <img class=\"slidebox__sliders__control-left\" src=\"images/slidebox-control-left.png\" />\
                    <img class=\"slidebox__sliders__control-right\" src=\"images/slidebox-control-right.png\" />\
                </div>\
    			<div class=\"slidebox__sliders__image-container\"></div>\
    		</div>\
    	</div>');

        slideboxParent.find('img').each(function(){
            $('.slidebox__sliders__image-container').append('<img src=\"'+$(this).data('popup')+' \">');
            containerSize = containerSize + sizeOfEachSlide;
        });

        $('.slidebox__sliders__image-container').css('width',containerSize);
        $('.slidebox__sliders__image-container').css('left', (startIndex != 0) ? parseInt(startIndex * -sizeOfEachSlide) : 0 );
    };

    return {
        init: init,
        setImagesForSlidebox: setImagesForSlidebox
    };

}());

APP.slidebox.init();