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

}());
