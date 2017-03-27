'use strict';

var APP = window.APP = window.APP || {};

APP.global = (function () {

	var init = function () {
		console.log('APP.global');
		$.get('pages/handlebar-templates.html', function(data) {
			$('body').append(data);
		}).done(function(){
            window.handlebartemplatesloaded = true;
			$('body').trigger('handlebar-templates-loaded');
		});
		connectToAPI.appLogin();
	};

	var connectToAPI = {
		rootPath: 'http://' + window.location.hostname+'/webapi',
        userLogin: {
            grant_type: 'password',
            username: '00216445-5bf0-4ac5-9be2-402c76f861ee',
            password: '2017Offerstore&',
            scope: "useClientId"
        },
        requestToken: function(){
        	var accesstoken = sessionStorage.getItem('accessToken');
            var authHeaders = {};
            if (accesstoken) {
                return authHeaders.Authorization = 'Bearer ' + accesstoken;
            }
            return authHeaders;
        },
		appLogin: function() {
	        $.ajax({
                type: "POST",
                url: this.rootPath + '/TOKEN',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: this.userLogin,
                success: function (data) {
                    sessionStorage.setItem('userRole',APP.global.connectToAPI.getUserByUserName(data.userName).RoleId);
                    sessionStorage.setItem('accessToken', data.access_token);
                },
                error: function (error) {
                    
                }
            });
    	},
        login: function(user){
            $.ajax({
                type: "POST",
                url: this.rootPath + '/TOKEN',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: user,
                success: function (data) {
                    sessionStorage.setItem('userName', data.userName);
                    sessionStorage.setItem('userId',APP.global.connectToAPI.getUserByUserName(data.userName).Id);
                    alert('Usuario logueado, redirigiendo...');
                    location.reload();
                },
                error: function (error) {
                    alert( $.parseJSON(error.responseText).error_description );
                }
            });
        },
        logout: function() {
            $.ajax({
                type: "POST",
                url: this.rootPath + '/api/Account/Logout',
                headers: this.requestToken(),
                success: function (data) {
                    sessionStorage.removeItem('userName');
                    sessionStorage.removeItem('userId');
                    sessionStorage.removeItem('accessToken');
                    sessionStorage.removeItem('refreshToken');
                },
                error: function (error) {
                }
            });
        },
        register: function(registerInfo) {
            $.ajax({
                type: "POST",
                url: this.rootPath + '/api/Account/Register',
                data: registerInfo,
                success: function (data) {
                    alert('Usuario registrado con exito');
                },
                error: function (error) {
                    alert('Hubo un error, intente con un password más fuerte');
                }
            });
        },
    	getOffers: function(val) {
            var response;
            $.ajax({
                type: "GET",
                async: false,
                url: this.rootPath + '/api/OffersApi/GetAll',
                headers: this.requestToken(),
                data: { value : val },
                success: function (data) {
                    response = data;
                },
                error: function (error) {
                }
            });
            return response;
        },
        getBanners: function(val) {
        	var response;
            $.ajax({
                type: "GET",
                async: false,
                url: this.rootPath + '/api/BannersApi/GetAll',
                headers: this.requestToken(),
                data: { value: val },
                success: function (data) {
                	response = data
                },
                error: function (error) {
                }
            });
            return response;
        },
		getFavorites: function(val) {
            $.ajax({
                type: "GET",
                url: this.rootPath + '/api/FavoritesApi/GetAll',
                headers: this.requestToken(),
                data: { value: val },
                success: function (data) {

                },
                error: function (error) {
                }
            });
        },
		getFavoritesByUser: function(val) {
            var response;
            $.ajax({
                type: "GET",
                async: false,
                url: this.rootPath + '/api/FavoritesApi/GetByuser/' + val,
                headers: this.requestToken(),
                success: function (data) {
                    response = data;
                },
                error: function (error) {
                }
            });
            return response;
        },
		postFavorite: function(pOfferVal, pUserVal) {
            var FavoritesModel = new Object();
            FavoritesModel.OfferId = pOfferVal;
            FavoritesModel.UserId = pUserVal;
            $.ajax({
                url: this.rootPath + '/api/FavoritesApi/PostFav',
                type: 'POST',
                dataType: 'json',
                data: FavoritesModel,
                headers: this.requestToken(),
                success: function (data, textStatus, xhr) {
                },
                error: function (xhr, textStatus, errorThrown) {
                }
            });
        },
        deleteByFavId: function(pFavId) {
            $.ajax({
                type: "POST",
                url: this.rootPath + '/api/FavoritesApi/DeleteById/' + pFavId,
                headers: this.requestToken(),
                dataType: 'json',
                success: function (data) {

                },
                error: function (error) {

                }
            });
        },
		deleteByUserId: function(pUserId) {
            $.ajax({
                type: "Delete",
                url: this.rootPath + '/api/FavoritesApi/DeleteByUser/' + pUserId,
                headers: this.requestToken(),
                success: function (data) {
                },
                error: function (error) {
                }
            });
        },
        getReviewsByUser: function(val) {
            $.ajax({
                type: "GET",
                url: this.rootPath + '/api/ReviewsApi/GetReviewsByUser/' + val,
                headers: this.requestToken(),
                success: function (data) {
                },
                error: function (error) {
                }
            });
        },
        getReviewsByOffer: function(val) {
            var response
            $.ajax({
                type: "GET",
                async: false,
                url: this.rootPath + '/api/ReviewsApi/GetReviewsByOffer/' + val,
                headers: this.requestToken(),
                success: function (data) {
                    response = data;
                },
                error: function (error) {
                }
            });
            return response;
        },
        postReview: function(pOfferVal, pUserVal, pRate, pMessage, pTitle) {
            var ReviewsModel = new Object();
            ReviewsModel.OfferId = pOfferVal;
            ReviewsModel.UserId = pUserVal;
            ReviewsModel.Rate = pRate;
            ReviewsModel.Message = pMessage;
            ReviewsModel.Title = pTitle;

            $.ajax({
                url: this.rootPath + '/api/ReviewsApi/PostReview',
                type: 'POST',
                dataType: 'json',
                data: ReviewsModel,
                headers: this.requestToken(),
                success: function (data, textStatus, xhr) {
                    alert('Gracias por tu comentario');
                },
                error: function (xhr, textStatus, errorThrown) {
                    alert('Ha ocurrido un error, intente de nuevo');
                }
            });
        },
        deleteByReviewId: function(pReviewId) {
            $.ajax({
                type: "Delete",
                url: this.rootPath + '/api/ReviewsApi/DeleteByReviewId/' + pReviewId,
                headers: this.requestToken(),
                success: function (data) {
                },
                error: function (error) {
                }
            });
        },
        getCategories: function(val) {
            var response;
            $.ajax({
                type: "GET",
                async: false,
                url: this.rootPath + '/api/CategoriesApi/GetAll',
                headers: this.requestToken(),
                data: { value: val },
                success: function (data) {
                    response = data;
                },
                error: function (error) {
                }
            });
            return response;
        },
        getUserById: function(val) {
            var response;
            $.ajax({
                type: "GET",
                async: false,
                url: this.rootPath + '/api/UserApi/GetById/' + val,
                headers: this.requestToken(),
                success: function (data) {
                    response = data;
                },
                error: function (error) {
                }
            });
            return response;
        },
        updatetUser: function(pName, pId, pLastName, pFirstName) {
            var UsersModel = new Object();
            UsersModel.Name = pName;
            UsersModel.Id = pId;
            UsersModel.LastName = pLastName;
            UsersModel.FirstName = pFirstName;
            $.ajax({
                url: this.rootPath + '/api/UserApi/PostUser',
                type: 'POST',
                dataType: 'json',
                data: UsersModel,
                headers: this.requestToken(),
                success: function (data, textStatus, xhr) {
                },
                error: function (xhr, textStatus, errorThrown) {
                   
                }
            });
        },
        getOffersByCategory: function(val) {
            var response;
            $.ajax({
                type: "GET",
                async: false,
                url: this.rootPath + '/api/OffersApi/GetByCategory/' + val,
                headers: this.requestToken(),
                success: function (data) {
                    response = data;
                },
                error: function (error) {
                }
            });
            return response;
        },
        getOffersBySubCategory: function(val) {
            $.ajax({
                type: "GET",
                url: this.rootPath + '/api/OffersApi/GetBySuCategory/' + val,
                headers: this.requestToken(),
                success: function (data) {
                },
                error: function (error) {
                }
            });
        },
        getOffersByDateType: function(val) {
            var response;
            $.ajax({
                type: "GET",
                async: false,
                url: this.rootPath + '/api/OffersApi/GetByDateType',
                headers: this.requestToken(),
                data: { value: val },
                success: function (data) {
                    response = data;
                },
                error: function (error) {

                }
            });
            return response;
        },
        sendEmail: function(pUserName, pSub, pBody) {
            var EmailModel = new Object();
            EmailModel.UserName = pUserName;
            EmailModel.Subject = pSub;
            EmailModel.Body = pBody;

            $.ajax({
                url: this.rootPath + '/api/UtilitiesApi/SendEmail',
                type: 'POST',
                dataType: 'json',
                data: EmailModel,
                headers: this.requestToken(),
                success: function (data, textStatus, xhr) {
                    alert('Message sent');
                },
                error: function (xhr, textStatus, errorThrown) {
                    alert('Error in Operation');
                }
            });
        },
        getUserByUserName: function(val) {
            var response;
            $.ajax({
                type: "GET",
                async: false,
                url: this.rootPath + '/api/UserApi/GetByuserName/',
                headers: this.requestToken(),
                data: { value: val },
                success: function (data) {
                    response = data;
                },
                error: function (error) {
                }
            });
            return response;
        }
	};

	return {
        init: init,
        connectToAPI: connectToAPI
    };

}());

APP.global.init();
$('body').trigger('connectToAPI-loaded');