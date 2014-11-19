(function () {
	'use strict';

	/* Application Dependencies
	*********************************************************************/
	var $ 				 = require('jquery');
	/* angular */  		   require('angular');
	/* angular Route */	   require('angular-route');


	var app = angular.module('thePolyGlot', ['ngRoute', 'firebase']);

	app.controller('appCtrl', ['$scope', function($scope) {

	}]).directive('iconNav', function() {
	   return {
	       restrict:'ECA',
           link:function (scope, el, attrs, ctrl) {
                var $mainNav = $('.main-navigation');
                $(el).on('click', function() {
                    if(!$mainNav.hasClass('open')) {
                        $mainNav.addClass('open');
                    } else {
                        $mainNav.removeClass('open');
                    }
                });
	       }
	   }
	}).directive('header', function() {
        return {
            restrict: 'ECA',
            controller: "appCtrl",
            link: function(scope, el, attrs, ctrl) {
                var didScroll;
                var lastScrollTop = 0;
                var delta = 5;
                var navbarHeight = $('header').outerHeight();

                $(window).scroll(function(event){
                    didScroll = true;
                });

                setInterval(function() {
                    if (didScroll) {
                        hasScrolled();
                        didScroll = false;
                    }
                }, 250);

                function hasScrolled() {
                    var st = $(window).scrollTop();
                    
                    // Make sure they scroll more than delta
                    if(Math.abs(lastScrollTop - st) <= delta){
                        return;
                    }
                    
                    // If they scrolled down and are past the navbar, add class .nav-up.
                    // This is necessary so you never see what is "behind" the navbar.
                    if (st > lastScrollTop && st > navbarHeight){
                        // Scroll Down
                        $('header').removeClass('show').addClass('hide');
                    } else {
                        // Scroll Up
                        if(st + $(window).height() < $(document).height()) {
                            $('header').removeClass('hide').addClass('show');
                        }
                    }
                    
                    lastScrollTop = st;
                }
            }
        }
    }).controller('contactFormCtrl', ['$scope', '$firebase', function($scope, $firebase) {
        $scope.usersRef = new Firebase("https://thepolyglot.firebaseio.com/").child('users');
        $scope.users = $firebase($scope.usersRef).$asObject();

        $scope.user = {};
        $scope.userCreated = false;

        $scope.submitUserDetails = function() {
            $scope.usersRef.push($scope.user, function() {
                $scope.savedUser = angular.copy($scope.user);
                $scope.userCreated = true;
                $scope.setFormPristine($scope.contactForm);
                $scope.user = {};
                console.log($scope);
            });
        };

        $scope.setFormPristine = function(form){
            console.log('setformPristine', form);
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
                    console.log(input, key);
                    if (input.$pristine)
                        input.$pristine = true;
                    if (input.$dirty) {
                        input.$dirty = false;
                    }
                });
            }
        };

    }]).directive('contactForm', function() {
        return {
            restrict: 'ECA',
            controller: "contactFormCtrl",
            link: function(scope, el, attrs, ctrl) {
                
            }
        }
    }).controller('adminPanelCtrl', ['$scope', '$firebase', function($scope, $firebase) {
        $scope.usersRef = new Firebase("https://thepolyglot.firebaseio.com/").child('users');
        $scope.users = $firebase($scope.usersRef).$asObject();

        $scope.user = {};

    }]).directive('adminPanel', function() {
        return {
            restrict: 'ECA',
            controller: "adminPanelCtrl",
            link: function(scope, el, attrs, ctrl) {
                
            }
        }
    }).directive('footer', function() {
        return {
            restrict: 'ECA',
            controller: "appCtrl",
            link: function(scope, el, attrs, ctrl) {
                var didScroll;
                var lastScrollTop = 0;
                var delta = 5;
                var navbarHeight = $('footer').outerHeight();

                $(window).scroll(function(event){
                    didScroll = true;
                });

                setInterval(function() {
                    if (didScroll) {
                        hasScrolled();
                        didScroll = false;
                    }
                }, 250);

                function hasScrolled() {
                    var st = $(window).scrollTop();
                    
                    // Make sure they scroll more than delta
                    if(Math.abs(lastScrollTop - st) <= delta) {
                        return;
                    }
                    
                    // If they scrolled down and are past the navbar, add class .nav-up.
                    // This is necessary so you never see what is "behind" the navbar.
                    if (st > lastScrollTop && st > navbarHeight){
                        // Scroll Down
                        $('footer').removeClass('show').addClass('hide');
                    } else {
                        // Scroll Up
                        if(st + $(window).height() < $(document).height()) {
                            $('footer').removeClass('hide').addClass('show');
                        }
                    }
                    
                    lastScrollTop = st;
                }
            }
        }
    });

}());
