'use strict';

var APP = window.APP = window.APP || {};

APP.sliderRestaurants = (function () {

    var sliderRestaurantDesktopActive = 0;
    var sliderRestaurantMobileActive = 0;

    var init = function (element) {
    	console.log('APP.sliderRestaurants');
        $('body').on('handlebar-templates-loaded',setSliders);
    };

    var setSliders = function(){
        var slidersCategories = APP.global.connectToAPI.getCategories(null);
        setSliderFor('desktop',slidersCategories);
        setSliderFor('mobile',slidersCategories);
        setImagesForSliders('desktop');
        setImagesForSliders('mobile');
        bindEventsToUI();
    };

    var setImagesForSliders = function(slider){
        var HTMLTemplate = $('#handlebars-slider-image').html();
        var templateScript = Handlebars.compile(HTMLTemplate);
        var categoriesContainers = $('.slider-restaurants.slider-restaurants--'+slider+' .slider-restaurants__container[data-category]');
        categoriesContainers.each(function(index, element){//append all images related with current category
            var self = $(this);
            var slidersPerCategory;
            if( $('.slider-restaurants-by-day').length ){//if we are in the events by day page
                slidersPerCategory = APP.global.connectToAPI.getOffersByDateType('Day');
            }else if( $('.slider-restaurants-by-week').length ){
                slidersPerCategory = APP.global.connectToAPI.getOffersByDateType('Week');
            }else if( $('.slider-restaurants-by-month').length ){
                slidersPerCategory = APP.global.connectToAPI.getOffersByDateType('Month');
            }else{ //default option is all the offers
                slidersPerCategory = APP.global.connectToAPI.getOffersByCategory( self.data('category') );
            }
            if(slider=='mobile'){
                $.each(slidersPerCategory,function(i,slider){
                    slider.Banner = slider.BannerMobile;
                    if(slider.CategoryId == self.data('category')){
                        var html = templateScript(slider);
                        if(i%4 == 0){ //make a div each 4 elements
                            self.append('<div class="each-4-elements"></div>');
                        }
                        self.find('.each-4-elements').last().append(html)    
                    }
                });
            }else{
                $.each(slidersPerCategory,function(i,slider){
                    if(slider.CategoryId == self.data('category')){
                        slider.Banner = slider.BannerDesktop;
                        var html = templateScript(slider);
                        self.append(html);
                    }  
                });
            }
        });
    };

    var setSliderFor = function(slider,slidersCategories){
        var HTMLTemplate = $('#handlebars-slider-restaurants').html();
        var templateScript = Handlebars.compile(HTMLTemplate);
        $.each(slidersCategories,function(i,category){
            slidersCategories[i].type = slider=='desktop'?'desktop':'mobile';
            var html = templateScript(slidersCategories[i]);
            $('.slider-restaurants__wrapper--'+slider+' div.replace-with-ajax').after(html);
        });
        $('.slider-restaurants__wrapper--'+slider+' div.replace-with-ajax').remove();
        $('.slider-restaurants--'+slider).first().addClass('active');
    };

    var changePopupContent = function(offerId){
        var offer = APP.global.connectToAPI.getOffers(offerId);
        $('.slider-restaurants__popup__header__main-image h1').html(offer[0].Name);
        $('.slider-restaurants__popup__general-info-description').html(offer[0].Description);
        $('.slider-restaurants__popup__score img').attr('src','images/'+offer[0].Rating+'-stars.png');
        $('.slider-restaurants__popup__header figure img').attr('src',document.location.origin+'/'+offer[0].Thumbnail);
        $('.slider-restaurants__popup__header__main-image > img').attr('src',document.location.origin+'/'+offer[0].FullSize);
        $('.slider-restaurants__popup__how-to-get__long-direction p, .slider-restaurants__popup__full-direction p').html(offer[0].HotoGetThere);
        shortDirection = (offer[0].HotoGetThere).slice(0, 10);
        $('.slider-restaurants__popup__how-to-get__short-direction p').html(shortDirection+'...');
        $('.slider-restaurants__popup__directions .google').attr('href',offer[0].Googlemap);
        $('.slider-restaurants__popup__directions .waze').attr('href',offer[0].Waze);
        $('.slider-restaurants__popup__schedule p').html(offer[0].Schedule);
        $('.slider-restaurants__popup__facilities .parking').removeClass().addClass('parking').addClass(offer[0].ParkingAllowed==true?'available':'no-available');
        $('.slider-restaurants__popup__facilities .kids').removeClass().addClass('kids').addClass(offer[0].ChildrenZone==true?'available':'no-available');
        $('.slider-restaurants__popup__general-info__site').html(offer[0].WebSiteUrl);
        $('.slider-restaurants__popup__general-info__site').attr('src',offer[0].WebSiteUrl);
        APP.slidebox.setImagesForSlidebox(offer[0].Carrousel);
        setReviewsByOffer(offerId);
    };

    var setReviewsByOffer = function(offerId){
        var reviews = APP.global.connectToAPI.getReviewsByOffer(offerId);
        var HTMLTemplate = $('#handlebars-review').html();
        var HTMLTemplateMobile = $('#handlebars-review-mobile').html();
        var templateScript = Handlebars.compile(HTMLTemplate);
        var templateScriptMobile = Handlebars.compile(HTMLTemplateMobile);
        $.each(reviews,function(i,review){
            var author = APP.global.connectToAPI.getUserById(review.UserId);
            review.Author = author.UserName;
            var html = templateScript(review);
            var htmlMobile = templateScriptMobile(review);
            $('.slider-restaurants__popup__reviews .replace-with-ajax').after(html);
            $('.slider-restaurants__popup__reviews--mobile .replace-with-ajax').after(htmlMobile);
        });
        shortReview = (reviews[0].Message).slice(0, 30);
        $('.slider-restaurants__popup__reviews__short-description p').html(shortReview+'...');
        $('.slider-restaurants__popup__reviews__quantity').html('('+reviews.length+')');
    };

    var removeReviews = function(){
        $('.slider-restaurants__popup__reviews .replace-with-ajax').siblings('.slider-restaurants__popup__review--desktop').remove();
        $('.slider-restaurants__popup__reviews--mobile .replace-with-ajax').siblings('.slider-restaurants__popup__review').remove();
    };

    var bindEventsToUI = function(){
        $('.slider-restaurants').on('click','.slider-restaurants__restaurant > img',function(){
            //change content of popup then show the popup
            changePopupContent( $(this).data('id') );
            $('.popup').show();
            var isMobile = $(this).parents('.slider-restaurants').hasClass('slider-restaurants--mobile');
            $('.slider-restaurants__popup').fadeIn('slow',function(){
                if(isMobile){
                    $('body').trigger('initMobileSlider');
                }
            });
        });

        $('.slider-restaurants__popup__close').click(function(e){
            e.preventDefault();
            $('.popup').hide();
            $('.slider-restaurants__popup').fadeOut();
            removeReviews(); 
        });

        $('.slider-restaurants--mobile .slider-restaurants__popup__close').click(function(){
            $('body').trigger('removeMobileSlider');
        });

        $('.create-review').click(function(){
            $('.slider-restaurants__popup__new-review').toggle();
        });

        $('.slider-restaurants__popup__popup-red__close').click(function(){
            $(this).closest('.slider-restaurants__popup__popup-red').toggle();
        });

        $('.slider-restaurants__popup__reviews .full-reviews').click(function(e){
            e.preventDefault();
            $('.slider-restaurants__popup__reviews--mobile').toggle();
        });

        $('.slider-restaurants__popup__how-to-get .full-direction').click(function(e){
            e.preventDefault();
            $('.slider-restaurants__popup__full-direction').toggle();
        });

        $('.slider-restaurants__popup__new-review__qualification img').on('mouseover click',function(){
            $(this).parent().removeClass('slider-restaurants__popup__new-review__qualification--1 slider-restaurants__popup__new-review__qualification--2 slider-restaurants__popup__new-review__qualification--3 slider-restaurants__popup__new-review__qualification--4 slider-restaurants__popup__new-review__qualification--5');
            $(this).parent().addClass($(this).data('class'));
        });

        $('.slider-restaurants__popup .slider-restaurants__add-to-favorites').click(function(e){
            e.preventDefault();
            var self = $(this);
            $(this).toggleClass('slider-restaurants__add-to-favorites--on');
            if( $(this).hasClass('slider-restaurants__add-to-favorites--on') ){
                $(this).find('img.added').fadeIn('1000',function(){
                    $(this).delay(2000).fadeOut('1000'); 
                });
            }else{
                $(this).find('img.removed').fadeIn('1000',function(){
                    $(this).delay(2000).fadeOut('1000'); 
                });
            }
        });

        $('.slider-restaurants__share').click(function(){
            FB.ui({
              method: 'share',
              href: 'http://www.example.com/',
            }, function(response){});
        });

        $('.slider-restaurants__controllers__up, .slider-restaurants__controllers__down').click(function(){
            var sliderToMove;
            var isDesktop = false;
            if( $(this).parent().hasClass('slider-restaurants__wrapper--desktop') ){
                sliderToMove = '.slider-restaurants--desktop';
                isDesktop = true;
            }else{
                sliderToMove = '.slider-restaurants--mobile';
            }
            if( $(this).hasClass('slider-restaurants__controllers__up') ){
                moveUp(sliderToMove,isDesktop);
            }else{
                moveDown(sliderToMove,isDesktop);
            }
            translateSlider(sliderToMove, isDesktop);
        });

        $(window).load(function(){

            var sliderDesktop = $('.slider-restaurants--desktop .slider-restaurants__container').each(function(index){
                var id = 'slider-restaurants--desktop'+index;
                $(this).parent().attr('id',id);
                $(this).bxSlider({
                    slideWidth: 9999,
                    minSlides: 4,
                    maxSlides: 4,
                    moveSlides: 2,
                    pager: false,
                    nextSelector: '#'+id+' .slider-restaurants__controllers__right',
                    prevSelector: '#'+id+' .slider-restaurants__controllers__left',
                    nextText: '',
                    prevText: ''
                });
            });

            var sliderMobile = $('.slider-restaurants--mobile .slider-restaurants__container').each(function(index){
                var id = 'slider-restaurants--mobile'+index;
                $(this).parent().attr('id',id);
                $(this).bxSlider({
                    slideWidth: 9999,
                    minSlides: 1,
                    maxSlides: 1,
                    moveSlides: 1,
                    pager: false,
                    nextSelector: '#'+id+' .slider-restaurants__controllers__right',
                    prevSelector: '#'+id+' .slider-restaurants__controllers__left',
                    nextText: '',
                    prevText: ''
                });
            });
        });
    };

    var moveUp = function(slider,isDesktop){
        if($(slider+'.active').prev('.slider-restaurants').length > 0 ){ //get prev slider
            $(slider+'.active').toggleClass('active').prev('.slider-restaurants').addClass('active');
            if(isDesktop){
                sliderRestaurantDesktopActive = sliderRestaurantDesktopActive - 1;
            }else{
                sliderRestaurantMobileActive = sliderRestaurantMobileActive - 1;
            }
        }else{
            $(slider+'.active').toggleClass('active');
            $(slider).last().addClass('active');
            if(isDesktop){
                sliderRestaurantDesktopActive = $(slider).last().index() - 1;
            }else{
                sliderRestaurantMobileActive = $(slider).last().index() - 1;
            }
        }
    };

    var moveDown = function(slider,isDesktop){
        if($(slider+'.active').next('.slider-restaurants').length > 0 ){ //get next slider
            $(slider+'.active').toggleClass('active').next('.slider-restaurants').addClass('active');
            if(isDesktop){
                sliderRestaurantDesktopActive = sliderRestaurantDesktopActive + 1;
            }else{
                sliderRestaurantMobileActive = sliderRestaurantMobileActive + 1;
            }
        }else{
            $(slider+'.active').toggleClass('active');
            $(slider).first().addClass('active');
            if(isDesktop){
                sliderRestaurantDesktopActive = 0;
            }else{
                sliderRestaurantMobileActive = 0;
            }
        }
    };

    var translateSlider = function(slider, isDesktop){
        var selectSlider;
        var sliderActive = isDesktop ? sliderRestaurantDesktopActive : sliderRestaurantMobileActive;
        if(sliderActive == 0){
            selectSlider = '0px';
        }else{
            if(isDesktop){
                selectSlider = 'calc(-'+sliderActive*100+'% - 30px)';
            }else{
                selectSlider = 'calc(-'+sliderActive*100+'% - 60px)';
            }
        }
        $(slider).transition({ y: selectSlider });
    };

    return {
        init: init,
        changePopupContent: changePopupContent
    };

}());

APP.sliderRestaurants.init();