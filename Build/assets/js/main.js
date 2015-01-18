(function () {
	'use strict';

	/* Application Dependencies
	*********************************************************************/
	/* angular */  		   require('angular');
	/* angular Route */	   require('angular-route');


	var app = angular.module('thePolyGlot', ['ngRoute', 'firebase']);

	app.controller('appCtrl', ['$scope', function($scope) {

	}]).controller('contactFormCtrl', ['$scope', '$firebase', 'contactService', function($scope, $firebase, contactService) {
        $scope.usersRef = new Firebase("https://thepolyglot.firebaseio.com/").child('users');
        $scope.users = $firebase($scope.usersRef).$asObject();

        $scope.user = {};
        $scope.userCreated = false;

        $scope.submitUserDetails = function() {
            console.log('submitDetails');
            contactService.submitUserDetails($scope.user);
            $scope.usersRef.push($scope.user, function() {
                $scope.savedUser = angular.copy($scope.user);
                $scope.userCreated = true;
                $scope.setFormPristine($scope.contactForm);
                console.log($scope.user);
                $scope.user = {};
            });
        };

        $scope.setFormPristine = function(form){
            if(form.$setValidity) {
                form.$setValidity();
            }
            if(form.$setUntouched) {
                form.$setUntouched();
            }
            if(form.$setPristine){
                form.$setPristine();
            } else {
                form.$pristine = true;
                form.$dirty = false;
                angular.forEach(form, function (input, key) {
                    if (input.$pristine) {
                        input.$pristine = true;
                    }
                    if (input.$dirty) {
                        input.$dirty = false;
                    }
                });
            }
        };

    }]).service('contactService', function($http) {
        
        var submitUserDetails = function(user) {

            if(user) {
                $http.post('http://localhost:3000/api/emailUser', user).
                    success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                        console.log('success', arguments);
                    }).
                    error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                        console.log('error', arguments);
                    });    
            }
            
        }

        return {
            submitUserDetails: submitUserDetails
        }
    })
    .directive('contactForm', function() {
        return {
            restrict: 'ECA',
            controller: "contactFormCtrl"
        }
    }).controller('adminPanelCtrl', ['$scope', '$firebase', function($scope, $firebase) {
        $scope.usersRef = new Firebase("https://thepolyglot.firebaseio.com/").child('users');
        $scope.users = $firebase($scope.usersRef).$asObject();

        $scope.user = {};

    }]).directive('adminPanel', function() {
        return {
            restrict: 'ECA',
            controller: "adminPanelCtrl"
        }
    }).directive('carousel', function() {
        return {
            restrict: 'ECA',
            link: function(scope, elem, attrs) {
                var $carousel = $('.slider');
                var isVideoPlaying = false;

                $carousel.slick({
                    centerMode: true,
                    centerPadding: '60px',
                    slidesToShow: 3,
                    arrows: false,
                    variableWidth: true,
                    onBeforeChange: function() {
                        $('.carousel .slick-slide').find('video').each(function() {
                            this.pause();
                        }); 
                    },
                    onAfterChange: function() {
                        if($('.carousel .slick-slide').not('.slick-center').find('video')){
                            $('.carousel .slick-slide').not('.slick-center').find('video').each(function(){
                                $(this).siblings('.video').fadeIn(500);
                                this.pause();
                                this.currentTime = 0;
                            });
                        }
                    }
                });  
                

                $carousel.find('.video').on('click', function() {
                    if(!(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()))) {
                        $(this).fadeOut(1000);    
                    }
                });

                $carousel.find('.slick-slide').on('click', function() {
                    $('.carousel .slick-slide').find('video').each(function(){
                        this.pause();
                        this.currentTime = 0;
                    });

                    var rawVideo = $(this).find('video').get(0);

                    if (isVideoPlaying) {
                        rawVideo.pause();
                        isVideoPlaying = false;
                    } else {
                        rawVideo.play();
                        isVideoPlaying = true;
                    }
                });
            }
        }
    });

    

}());
