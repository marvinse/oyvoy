'use strict';

var APP = window.APP = window.APP || {};

APP.global = (function () {

	var init = function () {
		console.log('APP.global');
		$.get('pages/handlebar-templates.html', function(data) {
			$('body').append(data);
		}).done(function(){
			$('body').trigger('handlebar-templates-loaded');
		});
		connectToAPI.login();
	};

	var connectToAPI = {
		rootPath: 'http://www.oyvoy.com/webapi',
        userRegistrationInfo : {
            Email: 'admin@offershore.com',
            Password: 'Pass0123&',
            ConfirmPassword: 'Pass0123&'
        },
        userLogin: {
            grant_type: 'password',
            username: '99a9abe5-c29c-407a-bbff-6c4dc470f6f1',
            password: '2~>%-ePM',
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
		login: function() {
	        $.ajax({
                type: "POST",
                url: this.rootPath + '/TOKEN',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: this.userLogin,
                success: function (data) {
                    sessionStorage.setItem('userName', data.userName);
                    sessionStorage.setItem('accessToken', data.access_token);
                    sessionStorage.setItem('refreshToken', data.refresh_token);
                },
                error: function (error) {
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
            $.ajax({
                type: "GET",
                url: this.rootPath + '/api/FavoritesApi/GetByuser/' + val,
                headers: this.requestToken(),
                success: function (data) {
                },
                error: function (error) {
                }
            });
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
                type: "Delete",
                url: this.rootPath + '/api/FavoritesApi/DeleteById/' + pFavId,
                headers: this.requestToken(),
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
        postReview: function(pOfferVal, pUserVal, pRate, pMessage) {
            var ReviewsModel = new Object();
            ReviewsModel.OfferId = pOfferVal;
            ReviewsModel.UserId = pUserVal;
            ReviewsModel.Rate = pRate;
            ReviewsModel.Message = pMessage;
            $.ajax({
                url: this.rootPath + '/api/ReviewsApi/PostReview',
                type: 'POST',
                dataType: 'json',
                data: ReviewsModel,
                headers: this.requestToken(),
                success: function (data, textStatus, xhr) {
                },
                error: function (xhr, textStatus, errorThrown) {
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
        }
	};

	return {
        init: init,
        connectToAPI: connectToAPI
    };

}());

APP.global.init();
$('body').trigger('connectToAPI-loaded');