(function () {
	'use strict';

	/* Application Dependencies
	*********************************************************************/
	var $ 				 = require('jquery');
	/* angular */  		   require('angular');
	/* angular Route */	   require('angular-route');


	var app = angular.module('thePolyGlot', ['ngRoute']);

	app.controller('appCtrl', ['$scope', function($scope) {
		console.log('appCtrl', $scope);
	}]);

	app.directive('iconNav', function() {
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
	});

    app.directive('header', function() {
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
                    if(Math.abs(lastScrollTop - st) <= delta)
                        return;
                    
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
    });

    app.directive('footer', function() {
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
                        if(Math.abs(lastScrollTop - st) <= delta)
                            return;
                        
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
