'use strict';

var APP = window.APP = window.APP || {};

APP.slidebox = (function () {

    var sizeOfEachSlide = 510;

    var init = function (element) {
        console.log('APP.slidebox');
    	bindEventsToUI();
    };

    var bindEventsToUI = function(){
    	$('.slidebox img').click(function(){
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
        init: init
    };

}());

APP.slidebox.init();